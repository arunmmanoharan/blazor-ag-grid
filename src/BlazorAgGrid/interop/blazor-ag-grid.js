// Blazor <-> ag-Grid v36 interop (ESM module).
//
// This module is bundled by esbuild together with ag-grid-community and
// ag-grid-enterprise into wwwroot/blazor-ag-grid.js. Blazor imports it once via
// IJSRuntime "import" and calls the exported functions through an
// IJSObjectReference. ES modules are singletons per URL, so the per-grid state
// below (grids, getRowsParamsMap) is shared across every import of this module.

import {
  createGrid,
  ModuleRegistry,
  themeQuartz,
  themeBalham,
  themeAlpine,
  themeMaterial,
} from 'ag-grid-community';
import { AllEnterpriseModule, LicenseManager } from 'ag-grid-enterprise';

// AllEnterpriseModule is a superset that also registers every community
// feature, so a single registration covers both editions.
ModuleRegistry.registerModules([AllEnterpriseModule]);

const grids = {};            // grid id -> GridApi
const getRowsParamsMap = {}; // datasource callback id -> IGetRowsParams
let licenseSet = false;

const THEMES = {
  quartz: themeQuartz,
  balham: themeBalham,
  alpine: themeAlpine,
  material: themeMaterial,
};

export function setLicenseKey(key) {
  if (key && !licenseSet) {
    LicenseManager.setLicenseKey(key);
    licenseSet = true;
  }
}

export function createGridInterop(gridDiv, interopOptions, configScript, themeName) {
  const id = interopOptions.CallbackId;
  const op = interopOptions.Options;
  const cb = interopOptions.Callbacks;
  const ev = interopOptions.Events;

  op.theme = THEMES[(themeName || 'quartz').toLowerCase()] || themeQuartz;

  if (cb) wrapCallbacks(op, cb);
  if (ev) wrapEvents(op, ev, id);
  if (op.datasource) op.datasource = wrapDatasource(op.datasource);

  if (configScript) {
    if (window[configScript]) {
      window[configScript].call(null, op);
    } else {
      console.error(`configScript "${configScript}" was specified but could not be resolved; ABORTING`);
      return;
    }
  }

  // v31+: createGrid returns the GridApi (column API is unified into it).
  grids[id] = createGrid(gridDiv, op);
}

export function callGridApi(id, name, args) {
  const api = grids[id];
  if (!api || typeof api[name] !== 'function') return undefined;
  return api[name].apply(api, args || []);
}

export function setDatasource(id, ds) {
  const api = grids[id];
  if (!api) return;
  if (ds) {
    api.setGridOption('datasource', wrapDatasource(ds));
  } else {
    // Reset with the currently configured datasource to force a refresh.
    api.setGridOption('datasource', api.getGridOption('datasource'));
  }
}

export function destroyGrid(id) {
  const api = grids[id];
  if (api) {
    api.destroy();
    delete grids[id];
  }
}

// Invoked from .NET (via the datasource proxy) to satisfy a pending getRows.
export function datasourceSuccess(callbackId, rowsThisBlock, lastRow) {
  const p = getRowsParamsMap[callbackId];
  if (!p) return;
  if (typeof p.success === 'function') {
    // v29+ shape: rowCount omitted (undefined) while the last row is unknown.
    p.success({ rowData: rowsThisBlock, rowCount: lastRow == null ? undefined : lastRow });
  } else {
    p.successCallback(rowsThisBlock, lastRow);
  }
  delete getRowsParamsMap[callbackId];
}

export function datasourceFail(callbackId) {
  const p = getRowsParamsMap[callbackId];
  if (!p) return;
  if (typeof p.fail === 'function') p.fail();
  else p.failCallback();
  delete getRowsParamsMap[callbackId];
}

function wrapCallbacks(op, cb) {
  if (cb.handlers.GetRowId) {
    op.getRowId = (p) => cb.handlers.GetRowId.jsRef.invokeMethod('Invoke', p.data);
  }
  if (cb.handlers.GetDataPath) {
    op.getDataPath = (data) => cb.handlers.GetDataPath.jsRef.invokeMethod('Invoke', data);
  }
}

function wrapEvents(op, ev, id) {
  if (ev.handlers.SelectionChanged) {
    op.onSelectionChanged = () => {
      const api = grids[id];
      if (!api) return;
      const nodes = api.getSelectedNodes().map(mapRowNode);
      ev.handlers.SelectionChanged.jsRef.invokeMethodAsync('Invoke', nodes);
    };
  }
  if (ev.handlers.CellValueChanged) {
    op.onCellValueChanged = (d) => {
      ev.handlers.CellValueChanged.jsRef.invokeMethodAsync('Invoke', {
        rowNodeId: d.node.id,
        field: d.colDef.field,
        columnId: d.column.getColId(),
        rowIndex: d.rowIndex,
        oldValue: d.oldValue,
        newValue: d.newValue,
      });
    };
  }
}

function wrapDatasource(ds) {
  return {
    getRows(params) {
      const callbackId = genId();
      getRowsParamsMap[callbackId] = params;
      params.callbackId = callbackId;
      ds.invokeMethodAsync('GetRows', {
        startRow: params.startRow,
        endRow: params.endRow,
        sortModel: params.sortModel,
        filterModel: params.filterModel,
        context: params.context,
        callbackId,
      });
    },
    destroy() {
      ds.invokeMethodAsync('Destroy');
    },
  };
}

// Maps a raw ag-Grid RowNode to a plain object safe to pass back to .NET.
function mapRowNode(n) {
  return {
    id: n.id,
    data: n.data,
    level: n.level,
    uiLevel: n.uiLevel,
    group: n.group,
    rowPinned: n.rowPinned,
    rowIndex: n.rowIndex,
    selected: n.selected,
    expanded: n.expanded,
    master: n.master,
    allChildrenCount: n.allChildrenCount,
    rowHeight: n.rowHeight,
  };
}

function genId() {
  return Math.random().toString(36).slice(2);
}
