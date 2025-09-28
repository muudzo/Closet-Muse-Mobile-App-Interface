# Closet Muse - Deployment Guide

## Production-Ready Features

✅ **Security**: All dependencies updated, no vulnerabilities  
✅ **Performance**: Optimized build with code splitting and minification  
✅ **PWA Support**: Progressive Web App capabilities  
✅ **SEO**: Meta tags and Open Graph support  
✅ **TypeScript**: Full type safety  
✅ **Build Optimization**: Terser minification, chunk splitting  

## Quick Start

### Prerequisites
- Node.js >= 18.0.0
- npm >= 8.0.0

### Installation
```bash
npm install
```

### Development
```bash
npm run dev
```

### Production Build
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## Deployment Options

### 1. Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### 2. Netlify
```bash
# Build the project
npm run build

# Deploy dist/ folder to Netlify
```

### 3. GitHub Pages
```bash
# Add to package.json scripts
"deploy": "npm run build && gh-pages -d dist"

# Deploy
npm run deploy
```

### 4. Docker
```dockerfile
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

## Environment Variables

Create a `.env` file for production:

```env
VITE_APP_NAME=Closet Muse
VITE_APP_VERSION=1.0.0
VITE_API_BASE_URL=https://api.closetmuse.app
VITE_WEATHER_API_KEY=your_weather_api_key
VITE_OPENAI_API_KEY=your_openai_api_key
VITE_ENABLE_ANALYTICS=true
VITE_ENABLE_DEBUG=false
```

## Performance Optimizations

- **Code Splitting**: Automatic vendor and UI library splitting
- **Tree Shaking**: Unused code elimination
- **Minification**: Terser with console removal
- **Gzip Compression**: Enabled for static assets
- **Caching**: Long-term caching for static assets

## Security Features

- **CSP Headers**: Content Security Policy
- **XSS Protection**: X-XSS-Protection headers
- **Frame Options**: X-Frame-Options: DENY
- **Content Type**: X-Content-Type-Options: nosniff

## Monitoring & Analytics

The app is ready for:
- Google Analytics
- Sentry error tracking
- Performance monitoring
- User analytics

## PWA Features

- **Offline Support**: Service worker caching
- **Install Prompt**: Add to home screen
- **App Manifest**: Native app-like experience
- **Push Notifications**: Ready for implementation

## Build Output

The production build creates:
- `dist/index.html` - Main HTML file
- `dist/assets/` - Optimized JS/CSS bundles
- `dist/sw.js` - Service worker
- `dist/workbox-*.js` - PWA runtime

## Bundle Analysis

```bash
# Analyze bundle size
npm run build -- --analyze
```

## Performance Metrics

- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1
- **Time to Interactive**: < 3.5s

## Troubleshooting

### Build Issues
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Import Errors
```bash
# Fix versioned imports
./fix-all-imports.sh
```

### TypeScript Errors
```bash
# Type check
npm run type-check
```

## Support

For deployment issues, check:
1. Node.js version compatibility
2. Environment variables
3. Build logs
4. Network connectivity
