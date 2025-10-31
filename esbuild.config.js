import * as esbuild from 'esbuild';
import { sassPlugin } from 'esbuild-sass-plugin';

(async () => {
  const entryPoints = [
    'src/js/*.js',
    'src/**/base.js',
    // 'src/**/sections/*.js',
    'src/**/base.scss',
    'src/**/sections/*.scss'
  ];

  let ctx = await esbuild.context({
    entryPoints,
    bundle: true,
    sourcemap: true,
    allowOverwrite: true,
    treeShaking: true,
    entryNames: '[name]',
    outdir: 'Assets',
    format: 'iife', // Immediately Invoked Function Expression for non-modular
    globalName: 'App', // Global namespace for the bundled code
    minify: false, // Set to true for production
    plugins: [sassPlugin()],
    loader: {
      '.js': 'js',
      '.scss': 'css',
      '.otf': 'file',
      '.ttf': 'file',
      '.woff': 'file',
      '.woff2': 'file',
      '.eot': 'file'
    },
    target: 'es2020',
    logLevel: 'info'
  });

  await ctx.watch();
  console.log("👀 Watching for changes...");
  console.log('✅ Build completed successfully!');
})();
