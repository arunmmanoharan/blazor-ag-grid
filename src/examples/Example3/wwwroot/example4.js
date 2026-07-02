// This file is to show how a library package may provide JavaScript interop features
// wrapped in a .NET API.
//
// ag-Grid v27+ renamed getRowNodeId(data) to getRowId(params); the row data is
// now on params.data.

window.example4_fetchData4_configure = function (gridOptions) {
    gridOptions.getRowId = function (params) {
        var id = params.data.id;

        return "ID#" + id;
    }
};

window.example4_fetchData5_albums_configure = function (gridOptions) {
    gridOptions.getRowId = function (params) {
        return "" + params.data.id;
    }
};
window.example4_fetchData5_photos_configure = function (gridOptions) {
    gridOptions.getRowId = function (params) {
        return "ID#" + params.data.id;
    }
};
