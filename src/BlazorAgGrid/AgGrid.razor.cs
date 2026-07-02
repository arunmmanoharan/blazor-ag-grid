using Microsoft.AspNetCore.Components;
using Microsoft.JSInterop;
using System;
using System.Collections.Generic;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace BlazorAgGrid
{
    public partial class AgGrid : IAsyncDisposable
    {
        private static readonly JsonSerializerOptions AgGridJsonSerOptions = new JsonSerializerOptions
        {
            DefaultIgnoreCondition = System.Text.Json.Serialization.JsonIgnoreCondition.WhenWritingNull,
            PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
        };

#pragma warning disable CS0649 // Field 'field' is never assigned to, and will always have its default value 'value'
        // These are referenced by nested components as cascading parameters
        private List<ColumnDefinition> _columnDefinitions = new List<ColumnDefinition>();
        //private RowData _rowData = new RowData();
        private List<object> _rowData = new List<object>();
        // This will be populated by the component @ref
        private ElementReference _gridDiv;
#pragma warning restore CS0649

        // A unique ID is assigned to the Grid for Grid API references
        private string _id = Guid.NewGuid().ToString();
        private bool _isRendered = false;

        // Reference to the imported interop JS module
        private IJSObjectReference _module;

        [Parameter] public RenderFragment ChildContent { get; set; }
        [Parameter] public string HeightStyle { get; set; } = "500px";
        [Parameter] public string WidthStyle { get; set; } = "500px";
        [Parameter] public GridOptions Options { get; set; }
        [Parameter] public GridEvents Events { get; set; }
        [Parameter] public GridCallbacks Callbacks { get; set; }
        [Parameter] public string ConfigureScript { get; set; }

        /// <summary>ag-Grid Theming API theme to apply (default Quartz).</summary>
        [Parameter] public GridTheme Theme { get; set; } = GridTheme.Quartz;

        /// <summary>
        /// ag-Grid Enterprise license key. Overrides any DI-provided default.
        /// Supply at runtime from configuration; never hardcode a key.
        /// </summary>
        [Parameter] public string LicenseKey { get; set; }

        [Inject] private IJSRuntime JS { get; set; }

        // Resolved lazily and optionally — the library works without AddBlazorAgGrid().
        [Inject] private IServiceProvider Services { get; set; }

        public GridApi Api { get; private set; }

        [Obsolete("The Column API is merged into the Grid API (ag-Grid v31+). Use Api instead.")]
        public GridColumnApi ColumnApi { get; private set; }

        protected override async Task OnAfterRenderAsync(bool firstRender)
        {
            if (!_isRendered)
            {
                _isRendered = true;

                _module = await JS.InvokeAsync<IJSObjectReference>(
                    "import", "./_content/BlazorAgGrid/blazor-ag-grid.js");

                var options = Services?.GetService(typeof(BlazorAgGridOptions)) as BlazorAgGridOptions;
                var key = !string.IsNullOrEmpty(LicenseKey) ? LicenseKey : options?.LicenseKey;
                if (!string.IsNullOrEmpty(key))
                    await _module.InvokeVoidAsync("setLicenseKey", key);

                await CreateGrid();
                Api = new GridApi(_module, _id);
#pragma warning disable CS0618 // ColumnApi is an intentional obsolete compatibility shim
                ColumnApi = new GridColumnApi(Api);
#pragma warning restore CS0618
            }
        }

        private async Task CreateGrid()
        {
            if (Options == null)
                Options = new GridOptions();

            if (_columnDefinitions?.Count > 0)
                Options.InternalColumnDefinitions = _columnDefinitions;

            if (_rowData?.Count > 0)
                Options.InternalRowData = _rowData;

            // Execute any needed adjustments or tranformations
            // before handing off the options for JS interop. The interop module
            // reference is provided so proxies (e.g. the datasource) can call
            // back into the same module instance that owns the grid state.
            Options.FirePrepareForInterop(JS, _module);

            // ag-Grid treats null values differently from undefined values in its
            // inputs which means we can't just set (or leave) values as null to
            // _not provide a value_ for them. We wrap the options in a class that
            // declares a custom converter serializing its parts with our preferred
            // (null-ignoring) serialization options.
            var interopOptions = new InteropGridOptions
            {
                CallbackId = _id,
                Options = Options,
                Callbacks = Callbacks,
                Events = Events,
            };

            await _module.InvokeVoidAsync("createGridInterop", _gridDiv,
                interopOptions, ConfigureScript, Theme.ToString());
        }

        public async ValueTask DisposeAsync()
        {
            if (_module == null)
                return;

            try
            {
                await _module.InvokeVoidAsync("destroyGrid", _id);
                await _module.DisposeAsync();
            }
            catch (Exception ex)
            {
                // Circuit already torn down (common on Blazor Server) — nothing to clean up.
                Console.WriteLine("WARNING: failure during clean up: " + ex);
            }
        }
    }
}
