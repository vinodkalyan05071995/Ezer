import * as esbuild from 'esbuild';
import { sassPlugin } from 'esbuild-sass-plugin';
import { copyFileSync, mkdirSync, readdirSync, readFileSync, writeFileSync, statSync, existsSync } from 'fs';
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

// Transform HTML for subfolder deployment (us/ or au/)
function transformHtmlForRegion(html, region) {
    let out = html
        .replace(/href="\/"/g, 'href="index.html"')
        .replace(/href="\/([a-zA-Z0-9_-]+\.html)"/g, 'href="$1"')
        .replace(/href="\/([a-zA-Z0-9_-]+\/[^"]+)"/g, 'href="$1"')
        .replace(/href="\/#([^"]+)"/g, 'href="index.html#$1"')
        .replace(/(href|src)="Assets\//g, '$1="../Assets/')
        .replace(/(href|src)="img\//g, '$1="../img/')
        .replace(/(href|src)="fonts\//g, '$1="../fonts/');
    // Inject data-region on <html>
    out = out.replace(/<html([^>]*)>/i, (m, attrs) => {
        return `<html${attrs} data-region="${region}">`;
    });
    // Inject region switcher before </body>
    const switcher = `
        <script>
        (function(){
            var path=(location.pathname.replace(/^\\/(us|au)\\/?/,'')||'index.html').replace(/^\\//,'');
            var region=document.documentElement.getAttribute('data-region')||'US';
            var other=region==='US'?'au':'us';
            var url='/'+other+'/'+path;
            var label=other==='us'?'United States':'Australia';
            var el=document.querySelector('.menu-list');
            if(el){var li=document.createElement('li');li.className='m-0 p-0 ms-lg-3';li.innerHTML='<a class="menu-link link" href="'+url+'">'+label+'</a>';el.appendChild(li);}
        })();
        <\/script>`;
    out = out.replace('</body>', switcher + '\n    </body>');
    return out;
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

        // Create us/ and au/ subfolders with transformed HTML
        const htmlFiles = ['index.html', 'blogs.html', 'chatbot.html', 'faq.html', 'insights.html', 'pricing.html', 'reach.html', 'dms-management.html', 'website-management.html', 'photo-studio-360.html'];
        ['us', 'au'].forEach(region => {
            const regionDir = join(__dirname, 'dist', region);
            if (!existsSync(regionDir)) mkdirSync(regionDir, { recursive: true });
            htmlFiles.forEach(file => {
                const src = join(__dirname, file);
                const dest = join(regionDir, file);
                if (existsSync(src)) {
                    const content = readFileSync(src, 'utf8');
                    const transformed = transformHtmlForRegion(content, region === 'us' ? 'US' : 'AU');
                    writeFileSync(dest, transformed);
                    console.log(`  ✓ ${region}/${file}`);
                }
            });
        });

        // Root index.html = geo redirect page
        copyFileSync(join(__dirname, 'index-redirect.html'), join(__dirname, 'dist', 'index.html'));
        console.log('  ✓ index.html (redirect)');

        // Netlify redirects for /us and /au
        if (existsSync(join(__dirname, '_redirects'))) {
            copyFileSync(join(__dirname, '_redirects'), join(__dirname, 'dist', '_redirects'));
            console.log('  ✓ _redirects');
        }

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
