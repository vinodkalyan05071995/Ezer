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

// Transform HTML for subfolder deployment (us/ or ca/)
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
    // Inject region dropdown before </body>
    const switcher = `
        <script>
        (function(){
            var path=(location.pathname.replace(/^\\/(us|ca)\\/?/,'')||'index.html').replace(/^\\//,'');
            var region=document.documentElement.getAttribute('data-region')||'US';
            var urlUS='/us/'+path;
            var urlCA='/ca/'+path;
            var labelUS='United States';
            var labelCA='Canada';
            var currentLabel=region==='US'?labelUS:labelCA;
            var svg='<svg width="14" height="12" viewBox="0 0 14 12" xmlns="http://www.w3.org/2000/svg"><polyline points="2,4 7,9 12,4" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>';
            var html='<li class="m-0 p-0 ms-lg-3 dropdown dropdown-locale"><button class="dropdown-btn btn-transparent menu-link link d-flex align-items-center" type="button" id="localeDropdown" data-bs-toggle="dropdown" aria-expanded="false"><span class="locale-current">'+currentLabel+'</span><span class="dropdown-btn-icon ms-1 d-flex align-items-center">'+svg+'</span></button><ul class="dropdown-menu reach-dropdown-menu dropdown-menu-locale" aria-labelledby="localeDropdown"><li><a class="dropdown-item" href="'+urlUS+'">'+labelUS+'</a></li><li><a class="dropdown-item" href="'+urlCA+'">'+labelCA+'</a></li></ul></li>';
            var el=document.querySelector('.menu-list');
            if(el){el.insertAdjacentHTML('beforeend',html);}
        })();
        <\/script>
        <script type="text/javascript">window.$crisp=[];window.CRISP_WEBSITE_ID="3d4b2e0b-225e-43af-8412-66d82cf45cc6";(function(){d=document;s=d.createElement("script");s.src="https://client.crisp.chat/l.js";s.async=1;d.getElementsByTagName("head")[0].appendChild(s);})();<\/script>`;
    out = out.replace('</body>', switcher + '\n    </body>');
    return out;
}

(async () => {
    const entryPoints = [
        'src/**/base.js',
        'src/**/base.scss'
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

        // Create us/ and ca/ subfolders with transformed HTML
        const otherHtmlFiles = ['blogs.html', 'chatbot.html', 'faq.html', 'insights.html', 'reach.html', 'dms-management.html', 'website-management.html', 'photo-studio-360.html'];
        const regionSources = {
            index: { us: 'index-us.html', ca: 'index-ca.html' },
            pricing: { us: 'pricing-us.html', ca: 'pricing-ca.html' }
        };
        ['us', 'ca'].forEach(region => {
            const regionDir = join(__dirname, 'dist', region);
            if (!existsSync(regionDir)) mkdirSync(regionDir, { recursive: true });
            // Index: use index-us.html for us/, index-ca.html for ca/
            const indexSrc = join(__dirname, regionSources.index[region]);
            if (existsSync(indexSrc)) {
                const content = readFileSync(indexSrc, 'utf8');
                const transformed = transformHtmlForRegion(content, region === 'us' ? 'US' : 'CA');
                writeFileSync(join(regionDir, 'index.html'), transformed);
                console.log(`  ✓ ${region}/index.html (from ${regionSources.index[region]})`);
            }
            // Pricing: use pricing-us.html for us/, pricing-ca.html for ca/
            const pricingSrc = join(__dirname, regionSources.pricing[region]);
            if (existsSync(pricingSrc)) {
                const content = readFileSync(pricingSrc, 'utf8');
                const transformed = transformHtmlForRegion(content, region === 'us' ? 'US' : 'CA');
                writeFileSync(join(regionDir, 'pricing.html'), transformed);
                console.log(`  ✓ ${region}/pricing.html (from ${regionSources.pricing[region]})`);
            }
            // Other pages: shared source for both regions
            otherHtmlFiles.forEach(file => {
                const src = join(__dirname, file);
                const dest = join(regionDir, file);
                if (existsSync(src)) {
                    const content = readFileSync(src, 'utf8');
                    const transformed = transformHtmlForRegion(content, region === 'us' ? 'US' : 'CA');
                    writeFileSync(dest, transformed);
                    console.log(`  ✓ ${region}/${file}`);
                }
            });
        });

        // Root index.html = geo redirect page
        copyFileSync(join(__dirname, 'index-redirect.html'), join(__dirname, 'dist', 'index.html'));
        console.log('  ✓ index.html (redirect)');

        // Netlify redirects for /us and /ca
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
