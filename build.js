import * as esbuild from 'esbuild';
import { sassPlugin } from 'esbuild-sass-plugin';
import { copyFileSync, mkdirSync, readdirSync, statSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Recursive function to copy directory
function copyDir(src, dest) {
    if (!existsSync(dest)) {
        mkdirSync(dest, { recursive: true });
    }

    const entries = readdirSync(src, { withFileTypes: true });

    for (const entry of entries) {
        const srcPath = join(src, entry.name);
        const destPath = join(dest, entry.name);

        if (entry.isDirectory()) {
            copyDir(srcPath, destPath);
        } else {
            copyFileSync(srcPath, destPath);
        }
    }
}

(async () => {
    const entryPoints = [
        'src/js/*.js',
        'src/**/base.js',
        'src/**/base.scss',
        'src/**/sections/*.scss'
    ];

    const isBuild = process.argv.includes('--build');

    const buildOptions = {
        entryPoints,
        bundle: true,
        sourcemap: true,
        allowOverwrite: true,
        treeShaking: true,
        entryNames: '[name]',
        outdir: isBuild ? 'dist/Assets' : 'Assets', // Output to dist/Assets for production
        format: 'iife',
        globalName: 'App',
        minify: isBuild,
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
    };

    if (isBuild) {
        // Production build
        console.log('🔨 Building assets...');
        await esbuild.build(buildOptions);
        console.log('✅ Assets built successfully!');

        // Copy static files to dist
        console.log('📦 Copying static files to dist...');

        // Copy HTML files
        const htmlFiles = ['index.html', 'blogs.html', 'chatbot.html', 'faq.html', 'insights.html', 'pricing.html', 'reach.html', 'dms-management.html', 'website-management.html'];
        htmlFiles.forEach(file => {
            const src = join(__dirname, file);
            const dest = join(__dirname, 'dist', file);
            if (existsSync(src)) {
                copyFileSync(src, dest);
                console.log(`  ✓ Copied ${file}`);
            }
        });

        // Copy img directory
        if (existsSync('img')) {
            copyDir('img', 'dist/img');
            console.log('  ✓ Copied img directory');
        }

        // Copy fonts directory
        if (existsSync('fonts')) {
            copyDir('fonts', 'dist/fonts');
            console.log('  ✓ Copied fonts directory');
        }

        console.log('✅ Production build completed successfully!');
    } else {
        // Development mode - watch for changes
        let ctx = await esbuild.context(buildOptions);
        await ctx.watch();
        console.log("👀 Watching for changes...");
        console.log('✅ Build completed successfully!');
    }
})();
