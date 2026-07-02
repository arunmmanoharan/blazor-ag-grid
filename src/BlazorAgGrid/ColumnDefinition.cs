using System;
using System.Collections.Generic;
using System.Text;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace BlazorAgGrid
{
    /// <summary>
    /// Strongly-typed representation of:
    ///   https://www.ag-grid.com/javascript-grid-column-properties/
    /// </summary>
    public partial class ColumnDefinition
    {
        public string Field { get; set; }

        public string HeaderName { get; set; }

        [JsonPropertyName("resizable")]
        public bool IsResizable { get; set; }

        [JsonPropertyName("sortable")]
        public bool IsSortable { get; set; }

        [JsonPropertyName("filter")]
        public bool IsFiltered { get; set; }

        [JsonPropertyName("editable")]
        public bool IsEditable { get; set; }

        // ----- v36 feature column options (nullable so they are only emitted when set) -----

        [JsonPropertyName("floatingFilter")]
        public bool? FloatingFilter { get; set; }

        [JsonPropertyName("rowGroup")]
        public bool? RowGroup { get; set; }

        [JsonPropertyName("aggFunc")]
        public string AggFunc { get; set; }

        [JsonPropertyName("enableValue")]
        public bool? EnableValue { get; set; }

        [JsonPropertyName("pivot")]
        public bool? Pivot { get; set; }

        [JsonPropertyName("hide")]
        public bool? Hide { get; set; }

        [JsonPropertyName("width")]
        public int? Width { get; set; }
    }
}
