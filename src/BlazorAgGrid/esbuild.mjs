import { build } from 'esbuild';

await build({
  entryPoints: ['interop/blazor-ag-grid.js'],
  bundle: true,
  format: 'esm',
  minify: true,
  sourcemap: true,
  outfile: 'wwwroot/blazor-ag-grid.js',
  logLevel: 'info',
});
