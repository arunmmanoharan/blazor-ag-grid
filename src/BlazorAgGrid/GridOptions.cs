using Microsoft.JSInterop;
using System;
using System.Collections.Generic;
using System.Text;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace BlazorAgGrid
{
    /// <summary>
    /// Strongly-typed representation of:
    ///   https://www.ag-grid.com/javascript-grid-properties/
    /// </summary>
    public partial class GridOptions
    {
        public RowModelType? RowModelType { get; set; }

        // Pagination
        //    https://www.ag-grid.com/javascript-grid-properties/#pagination

        /// True - Pagination is enabled. False (Default) - Pagination is disabled.
        [JsonPropertyName("pagination")]
        public bool? EnablePagination { get; set; }
        /// Number. How many rows to load per page. Default value = 100.
        /// If paginationAutoPageSize is specified, this property is ignored.
        /// See example Customising Pagination.
        public int? PaginationPageSize { get; set; }
        /// True - The number of rows to load per page is automatically adjusted
        /// by ag-Grid so each page shows enough rows to just fill the area
        /// designated for the grid. False (Default) - paginationPageSize is used.
        /// See example Auto Page Size.
        [JsonPropertyName("paginationAutoPageSize")]
        public bool? EnablePaginationAutoPageSize { get; set; }
        /// True - The out of the box ag-Grid controls for navigation are hidden.
        /// This is useful if pagination=true and you want to provide your own
        /// pagination controls. False (Default) - when pagination=true It automatically
        /// shows at the bottom the necessary controls so that the user can navigate through
        /// the different pages. See example Custom Pagination Controls.
        public bool? SuppressPaginationPanel { get; set; }
        /// Set to true to have pages split children of groups when Row Grouping or
        /// detail rows with Master Detail. Pagination & Child Rows
        [JsonPropertyName("paginateChildRows")]
        public bool? EnablePaginateChildRows { get; set; }

        // Row Block Loading: Infinite & Enterprise Row Models
        //    https://www.ag-grid.com/javascript-grid-properties/#row-block-loading-infinite-enterprise-row-models

        /// How many concurrent data requests are allowed.Default is 2,
        /// so server is only ever hit with 2 concurrent requests.
        public int? MaxConcurrentDatasourceRequests { get; set; }
        /// How many pages to hold in the cache.
        public int? MaxBlocksInCache { get; set; }
        /// How many rows to seek ahead when unknown data size.
        public int? CacheOverflowSize { get; set; }
        /// How many rows to initially allow scrolling to in the grid.
        public int? InfiniteInitialRowCount { get; set; }

        // Selection
        //    https://www.ag-grid.com/javascript-grid-properties/#selection

        /// Type of Row Selection, set to either Single or Multiple. Serialized as
        /// the ag-Grid v32.2+ object shape: { mode: 'singleRow' | 'multiRow' }.
        [JsonIgnore]
        public RowSelection? RowSelection { get; set; }

        /// Computed interop representation of <see cref="RowSelection"/>.
        [JsonPropertyName("rowSelection")]
        public object RowSelectionInterop =>
            RowSelection == null
                ? null
                : new { mode = RowSelection == BlazorAgGrid.RowSelection.Single ? "singleRow" : "multiRow" };

        /// Set to true to allow multiple rows to be selected
        /// using single click.See Multi Select Single Click.
        [JsonPropertyName("rowMultiSelectWithClick")]
        public bool? EnableRowMultiSelectWithClick { get; set; }
        /// If true, row selection won't happen when rows are clicked.
        /// Use when you want checkbox selection exclusively.
        public bool? SuppressRowClickSelection { get; set; }
        /// If true, cells won't get keyboard focus when clicked.
        /// (ag-Grid v27+ renamed suppressCellSelection to suppressCellFocus.)
        [JsonPropertyName("suppressCellFocus")]
        public bool? SuppressCellFocus { get; set; }
        /// Enterprise. Enables cell selection/ranges.
        /// (ag-Grid v32.2+ renamed enableRangeSelection to cellSelection.)
        [JsonPropertyName("cellSelection")]
        public bool? CellSelection { get; set; }

        /// <summary>Obsolete: row deselection is the default from ag-Grid v32.2+
        /// and this option is no longer emitted.</summary>
        [Obsolete("Deselection is default in ag-Grid v32.2+; this option is no longer emitted.")]
        [JsonIgnore]
        public bool? EnableRowDeselection { get; set; }

        [JsonPropertyName("editType")]
        public EditType? EditType { get; set; }

        /// Enables Tree Data:
        ///   https://www.ag-grid.com/javascript-grid-tree-data/
        public bool? TreeData { get; set; }

        // ----- v36 feature options -----

        /// Text to filter across all columns (Quick Filter).
        public string QuickFilterText { get; set; }

        /// Set to true to enable row animations.
        public bool? AnimateRows { get; set; }

        /// Default column definition applied to every column.
        public DefaultColDef DefaultColDef { get; set; }

        /// Enterprise. Controls the Row Group Panel visibility.
        public RowGroupPanelShow? RowGroupPanelShow { get; set; }

        /// Enterprise. Set to true to show the tool-panel sidebar
        /// (columns + filters panels).
        public bool? SideBar { get; set; }

        /// Enterprise. Enables the Master / Detail feature.
        public bool? MasterDetail { get; set; }

        /// Enterprise. Passthrough configuration object for the detail grid
        /// when <see cref="MasterDetail"/> is enabled.
        public object DetailCellRendererParams { get; set; }
    }

    /// <summary>Default column definition (applied to all columns).</summary>
    public class DefaultColDef
    {
        public bool? Sortable { get; set; }
        public bool? Resizable { get; set; }
        public bool? Filter { get; set; }
        public bool? FloatingFilter { get; set; }
        public bool? Editable { get; set; }
        public int? Flex { get; set; }
        public int? MinWidth { get; set; }
    }

    [JsonConverter(typeof(EnumConverter))]
    public enum RowGroupPanelShow
    {
        Never = 0,
        Always = 1,
        OnlyWhenGrouping = 2,
    }

    [JsonConverter(typeof(EnumConverter))]
    public enum RowModelType
    {
        ClientSide = 0,
        Infinite = 1,
    }

    [JsonConverter(typeof(EnumConverter))]
    public enum RowSelection
    {
        Single = 0,
        Multiple = 1,
    }

    [JsonConverter(typeof(EnumConverter))]
    public enum EditType
    {
        FullRow = 1,
    }

    internal class EnumConverter : JsonConverterFactory
    {
        private JsonConverterFactory _inner = new JsonStringEnumConverter(
            JsonNamingPolicy.CamelCase, false);

        public override bool CanConvert(Type typeToConvert) => _inner.CanConvert(typeToConvert);

        public override JsonConverter CreateConverter(Type typeToConvert,
            JsonSerializerOptions options) => _inner.CreateConverter(typeToConvert, options);
    }
}
