// Central content for the landing page. Kept in sync with the repo README so the
// site stays truthful about what the library actually supports.

export const REPO_URL = 'https://github.com/arunmmanoharan/blazor-ag-grid';
export const UPSTREAM_URL = 'https://github.com/ebekker/blazor-ag-grid';
export const AG_GRID_URL = 'https://www.ag-grid.com/';
export const NUGET_URL = 'https://github.com/arunmmanoharan/blazor-ag-grid/packages';

export const features = [
  {
    title: 'Client-side & Infinite row models',
    body: 'Bind in-memory data or stream pages on demand via a custom IDatasource — including custom row-id resolution.',
    icon: 'Storage',
  },
  {
    title: 'Sorting, filtering & quick filter',
    body: 'Column sorting, per-column and floating filters, and a grid-wide quick filter out of the box.',
    icon: 'FilterAlt',
  },
  {
    title: 'Pagination',
    body: 'Page size control, auto page-size to fit height, and the built-in ag-Grid pagination panel.',
    icon: 'ViewList',
  },
  {
    title: 'Selection + notifications',
    body: 'Single and multi-row selection with change events surfaced back to your .NET code.',
    icon: 'CheckBox',
  },
  {
    title: 'Theming API',
    body: 'ag-Grid v33+ Theming API with a Theme parameter: Quartz (default), Balham, Alpine, or Material.',
    icon: 'Palette',
  },
  {
    title: 'Enterprise features',
    body: 'Row grouping & aggregation, master/detail, the tool-panel sidebar, and CSV/Excel export (license required).',
    icon: 'WorkspacePremium',
  },
];

export const examples = [
  {
    name: 'Example1',
    kind: 'Hosted WebAssembly',
    body: 'Blazor WASM client hosted by an ASP.NET Core server (net10), sharing a project and a server API.',
    href: 'https://github.com/arunmmanoharan/blazor-ag-grid/tree/master/src/examples/Example1',
  },
  {
    name: 'Example2',
    kind: 'Standalone WebAssembly',
    body: 'Pure client-side WASM app — the one embedded live below and published to GitHub Pages.',
    href: 'https://github.com/arunmmanoharan/blazor-ag-grid/tree/master/src/examples/Example2',
  },
  {
    name: 'Example3',
    kind: 'Blazor Server',
    body: 'Server hosting over SignalR. Uses ConfigureScript instead of GridCallbacks (which are WASM-only).',
    href: 'https://github.com/arunmmanoharan/blazor-ag-grid/tree/master/src/examples/Example3',
  },
];

export const quickStartImports = `@using BlazorAgGrid`;

export const quickStartPage = `@page "/grid-demo"

<AgGrid HeightStyle="300px" WidthStyle="100%">
    <GridColumn Header="Make"  Field="make"  IsSortable="true" IsFiltered="true" />
    <GridColumn Header="Model" Field="model" IsSortable="true" />
    <GridColumn Header="Price" Field="price" IsSortable="true" />

    <GridRow Data="@(new { make = "Toyota",  model = "Celica",  price = 35000 })" />
    <GridRow Data="@(new { make = "Ford",    model = "Mondeo",  price = 32000 })" />
    <GridRow Data="@(new { make = "Porsche", model = "Boxster", price = 72000 })" />
</AgGrid>`;
