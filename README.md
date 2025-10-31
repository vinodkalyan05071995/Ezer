# DealerAI - Multi-Agent AI for Car Dealerships

A modern, responsive website showcasing DealerAI's Multi-Agent Generative System (MAGS) for car dealerships. Built with a fast, efficient development workflow using esBuild and modern web technologies.

## 🚀 Overview

DealerAI empowers car dealerships with specialized AI agents for Sales, Service, Parts, and Finance. This website provides an intuitive interface to explore our multi-agent AI solutions and connect with potential customers.

## ✨ Features

- **Modern Tech Stack**: Lightning-fast builds with esBuild
- **Responsive Design**: Mobile-first approach using Bootstrap 5.3.8
- **Modular Architecture**: Organized SCSS and JavaScript structure
- **Fast Development**: Hot-reload watch mode for instant feedback
- **Production Ready**: Optimized build pipeline for deployment

## 🛠️ Tech Stack

- **esBuild** (≥0.25.2) - Ultra-fast JavaScript bundler and minifier
- **Bootstrap 5.3.8** - Modern CSS framework for responsive layouts
- **Sass/SCSS** - Powerful CSS preprocessor with modular architecture
- **Swiper.js** (≥11.2.6) - Touch-enabled sliders and carousels
- **npm-run-all** - Run multiple npm scripts in parallel

## 📋 Prerequisites

- **Node.js** (v14 or higher)
- **npm** or **yarn** package manager

## 🚀 Getting Started

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd DearAI
```

2. Install dependencies:
```bash
npm install
```

### Development

Start the development server with watch mode:

```bash
npm run dev
```

This command:
- Watches for changes in `src/js/` and `src/scss/` files
- Automatically rebuilds assets on file changes
- Outputs compiled files to the `Assets/` directory
- Generates source maps for debugging

### Available Scripts

- `npm run watch` - Run esBuild in watch mode (automatic rebuilds)
- `npm run dev` - Development build with file watching
- `npm run serve-dev` - Serve with Shopify theme dev tools (optional)

## 📁 Project Structure

```
DearAI/
├── Assets/                  # Compiled output (generated)
│   ├── base.css            # Main stylesheet
│   ├── base.css.map        # Source maps
│   ├── base.js             # Main JavaScript bundle
│   ├── base.js.map         # Source maps
│   └── *.js                # Additional bundles
│
├── src/                     # Source files
│   ├── js/                 # JavaScript source
│   │   ├── base.js         # Main entry point
│   │   ├── common/         # Shared utilities
│   │   │   └── index.js
│   │   ├── sections/       # Section-specific scripts
│   │   └── vender.js       # Third-party dependencies
│   │
│   └── scss/               # SCSS source
│       ├── common/         # Shared styles
│       │   ├── _banner.scss
│       │   ├── _common.scss
│       │   ├── _dealers.scss
│       │   ├── _normalize.scss
│       │   ├── base.scss
│       │   ├── credit-score.scss
│       │   ├── footer.scss
│       │   └── header.scss
│       └── sections/       # Section-specific styles
│           ├── demo.scss
│           └── demo2.scss
│
├── fonts/                   # Font files
├── img/                     # Image assets
├── index.html              # Main HTML file
├── esbuild.config.js       # Build configuration
└── package.json            # Dependencies and scripts
```

## ⚙️ Build Configuration

The project uses esBuild with the following features:

- **Automatic Entry Detection**: Finds all `.js` and `.scss` files in source directories
- **Sass Plugin**: Integrated SCSS compilation
- **Source Maps**: Enabled for debugging (`sourcemap: true`)
- **Tree Shaking**: Removes unused code automatically
- **IIFE Format**: Browser-compatible bundle format
- **Watch Mode**: Automatic rebuilds on file changes
- **Font Support**: Handles `.otf`, `.ttf`, `.woff`, `.woff2`, `.eot` files

### Build Settings

Current configuration in `esbuild.config.js`:
- **Minify**: `false` (set to `true` for production)
- **Target**: `es2020`
- **Format**: `iife` (Immediately Invoked Function Expression)
- **Output**: `Assets/` directory

## 🏗️ Production Build

To build for production:

1. Edit `esbuild.config.js` and set `minify: true`:
```javascript
minify: true, // Set to true for production
```

2. Run the build:
```bash
npm run watch
```

This will generate optimized, minified files in the `Assets/` directory.

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🎨 Styling Guidelines

- **Modular SCSS**: Each component has its own `.scss` file
- **BEM Methodology**: Follow Block-Element-Modifier naming convention
- **Mobile-First**: Styles should be written mobile-first, then enhanced for larger screens
- **Global Styles**: Common styles live in `src/scss/common/`

## 📝 Development Workflow

1. **Make Changes**: Edit files in `src/js/` or `src/scss/`
2. **Auto-Rebuild**: esBuild watches and rebuilds automatically
3. **Refresh Browser**: See changes instantly (no manual build step needed)
4. **Debug**: Use source maps to debug original source files

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/your-feature-name`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add some feature'`)
5. Push to the branch (`git push origin feature/your-feature-name`)
6. Open a Pull Request

## 📄 License

This project is licensed under the ISC License.

## 🆘 Support

Need help or have questions?
- Open an issue in the repository
- Contact the development team

## 📌 Notes

- The `Assets/` directory is generated automatically - don't commit compiled files
- Always run `npm run dev` or `npm run watch` before development
- For production deployments, ensure `minify: true` is set in `esbuild.config.js`
- Source maps are included for easier debugging during development

---

**Built with ❤️ using esBuild and modern web technologies**
