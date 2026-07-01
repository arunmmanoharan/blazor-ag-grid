using System;
using System.Threading.Tasks;

namespace BlazorAgGrid
{
    /// <summary>
    /// Obsolete: as of ag-Grid v31 the Column API is merged into the Grid API.
    /// This type remains as a thin shim that delegates to <see cref="GridApi"/>
    /// so existing callers keep compiling. Use <c>AgGrid.Api</c> instead.
    /// </summary>
    [Obsolete("The Column API is merged into the Grid API (ag-Grid v31+). Use AgGrid.Api.")]
    public class GridColumnApi
    {
        private readonly GridApi _api;

        internal GridColumnApi(GridApi api)
        {
            _api = api;
        }

        // The former Column API SizeColumnsToFit(width) has no v36 equivalent that
        // takes a width; delegate to the parameterless Grid API method.
        public Task SizeColumnsToFit(int width)
        {
            return _api.SizeColumnsToFit();
        }

        public Task AutoSizeColumn(string colKey)
        {
            return _api.AutoSizeColumn(colKey);
        }

        public Task AutoSizeColumns(string[] colKeys)
        {
            return _api.AutoSizeColumns(colKeys);
        }
    }
}
