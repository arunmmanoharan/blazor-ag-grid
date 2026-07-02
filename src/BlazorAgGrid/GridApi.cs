using Microsoft.JSInterop;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace BlazorAgGrid
{
    /// <summary>
    /// Strongly-typed access to the ag-Grid Grid API:
    ///   https://www.ag-grid.com/javascript-data-grid/grid-api/
    /// As of ag-Grid v31 the former Column API is unified into this Grid API,
    /// so column operations (e.g. auto-sizing) live here too.
    /// </summary>
    public class GridApi
    {
        private readonly IJSObjectReference _module;
        private readonly string _id;

        internal GridApi(IJSObjectReference module, string id)
        {
            _module = module;
            _id = id;
        }

        public Task SizeColumnsToFit()
        {
            return CallApi("sizeColumnsToFit");
        }

        public Task AutoSizeColumn(string colKey)
        {
            return CallApi("autoSizeColumn", colKey);
        }

        public Task AutoSizeColumns(string[] colKeys)
        {
            // Cast to make sure the array arg is not unwound into separate args
            return CallApi("autoSizeColumns", (object)colKeys);
        }

        public Task RefreshCells(RefreshCellsParams @params = null)
        {
            if (@params == null)
                return CallApi("refreshCells");
            else
                return CallApi("refreshCells", @params);
        }

        public Task RedrawRows(RedrawRowsParams @params = null)
        {
            if (@params == null)
                return CallApi("redrawRows");
            else
                return CallApi("redrawRows", @params);
        }

        public Task RefreshInfiniteCache()
        {
            return CallApi("refreshInfiniteCache");
        }

        public Task PurgeInfiniteCache()
        {
            return CallApi("purgeInfiniteCache");
        }

        /// <summary>Exports the grid data as CSV, triggering a browser download.</summary>
        public Task ExportDataAsCsv(object @params = null)
        {
            if (@params == null)
                return CallApi("exportDataAsCsv");
            else
                return CallApi("exportDataAsCsv", @params);
        }

        /// <summary>Exports the grid data as Excel (Enterprise), triggering a browser download.</summary>
        public Task ExportDataAsExcel(object @params = null)
        {
            if (@params == null)
                return CallApi("exportDataAsExcel");
            else
                return CallApi("exportDataAsExcel", @params);
        }

        public Task SetDatasource(IGridDatasource ds = null)
        {
            if (ds == null)
                return _module.InvokeVoidAsync("setDatasource", _id, (object)null).AsTask();

            var proxy = DotNetObjectReference.Create(
                new GridOptions.InteropDatasourceProxy(_module, ds));
            return _module.InvokeVoidAsync("setDatasource", _id, proxy).AsTask();
        }

        private Task CallApi(string name, params object[] args)
        {
            return _module.InvokeVoidAsync("callGridApi", _id, name, args).AsTask();
        }

        public class RefreshCellsParams
        {
            /// specify rows, or all rows by default
            public RowNode[] RowNodes { get; set; }
            /// specify columns, or all columns by default
            public string[] Columns { get; set; }
            /// skips change detection, refresh everything
            public bool Force { get; set; }
        }

        public class RedrawRowsParams
        {
            /// the row nodes to redraw
            public RowNode[] RowNodes { get; set; }
        }
    }
}
