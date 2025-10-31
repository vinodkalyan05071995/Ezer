# NETBRAHMA Credit Score Dashboard

A modern, responsive credit score dashboard application built with esBuild, Bootstrap 5, and custom web components. This project provides a comprehensive interface for displaying credit scores, account information, and financial analytics.

## 🚀 Features

- **Interactive Credit Score Gauge**: Animated circular gauge displaying credit scores with customizable segments and colors
- **Account Management**: Visual representation of open/closed credit cards and loans with interactive charts
- **Score History**: Trended view of credit score changes over time with line charts
- **Responsive Design**: Mobile-first approach with Bootstrap 5 grid system
- **Modern UI Components**: Custom web components for enhanced functionality
- **Real-time Updates**: Live score refresh capabilities

## 🛠️ Built With

- **esBuild** (^0.25.2) - Fast JavaScript bundler and minifier
- **Bootstrap 5.3.8** - CSS framework for responsive design
- **Sass/SCSS** - CSS preprocessor for enhanced styling
- **Custom Web Components** - Reusable credit score components
- **Chart.js** - Data visualization library
- **Swiper** (^11.2.6) - Touch slider component

## 📋 Prerequisites

- Node.js (v14 or higher)
- npm or yarn package manager

## 🚀 Getting Started

### Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/esBuild-dev-kit.git
cd esBuild-dev-kit
```

2. Install dependencies:
```bash
npm install
```

### Development

Start the development server with file watching:

```bash
npm run dev
```

This command will:
- Watch for changes in JavaScript and SCSS files
- Automatically rebuild assets using esBuild
- Output compiled files to the `Assets/` directory

### Available Scripts

- `npm run watch` - Start esBuild in watch mode
- `npm run dev` - Run development build with file watching
- `npm run serve-dev` - Serve with Shopify theme development (if applicable)

## 📁 Project Structure

```
esBuild-dev-kit/
├── Assets/                 # Compiled output files
│   ├── base.css           # Main stylesheet
│   ├── base.js            # Main JavaScript bundle
│   └── *.js               # Individual component bundles
├── src/
│   ├── js/                # JavaScript source files
│   │   ├── base.js        # Main application logic
│   │   ├── common/        # Shared utilities
│   │   └── sections/      # Page-specific components
│   └── scss/              # SCSS source files
│       ├── common/        # Shared styles
│       └── sections/      # Component-specific styles
├── img/                   # Image assets
├── index.html             # Main HTML file
├── esbuild.config.js      # esBuild configuration
└── package.json           # Project dependencies
```

## ⚙️ Configuration

### esBuild Configuration

The project uses a custom esBuild configuration (`esbuild.config.js`) with the following features:

- **Entry Points**: Automatically discovers JS and SCSS files
- **Sass Plugin**: Compiles SCSS to CSS
- **Source Maps**: Enabled for debugging
- **Tree Shaking**: Removes unused code
- **IIFE Format**: Bundles for browser compatibility
- **Watch Mode**: Automatic rebuilding on file changes

### Custom Components

The project includes several custom web components:

- `<credit-score-component>`: Interactive credit score gauge
- Doughnut charts for account distribution
- Line charts for score history
- Responsive navigation and sidebar

## 🎨 Styling

The project uses a modular SCSS architecture:

- **Base styles**: Reset, typography, and global styles
- **Component styles**: Individual component styling
- **Bootstrap integration**: Custom Bootstrap theme
- **Responsive design**: Mobile-first approach

## 🚀 Building for Production

To build optimized production assets:

1. Update `esbuild.config.js`:
```javascript
minify: true, // Enable minification
```

2. Run the build:
```bash
npm run watch
```

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Contact the development team

## 🔄 Version History

- **v1.0.0** - Initial release with core dashboard functionality

---

**Note**: This project is configured for development with esBuild's watch mode. For production deployment, ensure to enable minification and optimize assets accordingly.