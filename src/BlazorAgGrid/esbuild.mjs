import { build } from 'esbuild';

// Source maps are opt-in: the bundle is minified vendor code (ag-Grid) plus a
// small interop shim, and a ~7 MB map should not ship to consumers. Set
// AGGRID_SOURCEMAP=1 locally when you need to debug the interop.
const sourcemap = process.env.AGGRID_SOURCEMAP === '1';

await build({
  entryPoints: ['interop/blazor-ag-grid.js'],
  bundle: true,
  format: 'esm',
  minify: true,
  sourcemap,
  outfile: 'wwwroot/blazor-ag-grid.js',
  logLevel: 'info',
});
