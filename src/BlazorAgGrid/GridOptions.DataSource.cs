using Microsoft.JSInterop;
using System;
using System.Collections.Generic;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace BlazorAgGrid
{
    // We define the Datasource property to allow clients to
    // register a custom data source, and also add the needed
    // plumbing to make access to the DS work through JS interop
    public partial class GridOptions
    {
        private IGridDatasource _Dataource;

        [JsonIgnore]
        public IGridDatasource Datasource
        {
            get => _Dataource;
            set
            {
                if (_Dataource != value)
                {
                    if (value != null)
                        PrepareForInterop += PrepareDatasource;
                    else
                        PrepareForInterop -= PrepareDatasource;
                }
                _Dataource = value;
            }
        }

        [JsonPropertyName("datasource")]
        public DotNetObjectReference<InteropDatasourceProxy> InteropDatasource { get; set; }

        private void PrepareDatasource(object source, PrepareForInteropEventArgs ev)
        {
            InteropDatasource = DotNetObjectReference.Create(
                new InteropDatasourceProxy(ev.Module, Datasource));
        }

        // Wrapper DS around user-provided DS with proper JS-interop handling
        public class InteropDatasourceProxy
        {
            private IJSObjectReference _module;
            private IGridDatasource _inner;

            public InteropDatasourceProxy(IJSObjectReference module, IGridDatasource inner)
            {
                _module = module;
                _inner = inner;
            }

            [JSInvokable]
            public Task GetRows(InteropGetRowsParams getParams)
            {
                var proxy = new GetRowsParamsProxy(_module, getParams);
                return _inner.GetRows(proxy);
            }

            [JSInvokable]
            public Task Destroy() => _inner.Destroy();
        }

        // Substitute for ag-Grid-provided param for DS.GetRows(...) with JS-interop handling
        public class InteropGetRowsParams : IGetRowsParams
        {
            public int StartRow { get; set; }

            public int EndRow { get; set; }

            public SortModel[] SortModel { get; set; }

            public object FilterModel { get; set; }

            public object Context { get; set; }

            public string CallbackId { get; set; }

            public Task FailCallback() =>
                throw new NotImplementedException();

            public Task SuccessCallback(object[] rowsThisBlock, int? lastRow = null) =>
                throw new NotImplementedException();
        }

        public class GetRowsParamsProxy : IGetRowsParams
        {
            private IJSObjectReference _module;
            private IGetRowsParams _inner;

            public GetRowsParamsProxy(IJSObjectReference module, IGetRowsParams inner)
            {
                _module = module;
                _inner = inner;
            }

            // The first row index to get.
            public int StartRow => _inner.StartRow;

            // The first row index to NOT get.
            public int EndRow => _inner.EndRow;

            // If doing Server-side sorting, contains the sort model
            public SortModel[] SortModel => _inner.SortModel;

            // If doing Server-side filtering, contains the filter model
            public object FilterModel => _inner.FilterModel;

            // The grid context object
            public object Context => _inner.Context;

            public string CallbackId => _inner.CallbackId;

            // Callback to call when the request is successful.
            public Task SuccessCallback(object[] rowsThisBlock, int? lastRow = null)
            {
                return _module.InvokeVoidAsync("datasourceSuccess",
                    CallbackId, rowsThisBlock, lastRow).AsTask();
            }

            // Callback to call when the request fails.
            public Task FailCallback()
            {
                return _module.InvokeVoidAsync("datasourceFail", CallbackId).AsTask();
            }
        }
    }
}
