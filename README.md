# 👗 Closet Muse

<div align="center">

**AI-Powered Fashion Assistant**

A modern, intelligent mobile app interface for smart wardrobe management and personalized outfit recommendations.

[![CI](https://github.com/muudzo/Closet-Muse-Mobile-App-Interface/actions/workflows/ci.yml/badge.svg)](https://github.com/muudzo/Closet-Muse-Mobile-App-Interface/actions/workflows/ci.yml)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18.3-61dafb.svg)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-6.3-646cff.svg)](https://vitejs.dev/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

[Live Demo](#) • [Features](#-features) • [Tech Stack](#-tech-stack) • [Getting Started](#-getting-started)

</div>

---

## ✨ Features

### 🎨 Smart Wardrobe Management

- **Digital Closet**: Organize your entire wardrobe with categories, colors, and seasons
- **Visual Catalog**: Browse your items with beautiful card-based layouts
- **Smart Filters**: Find items quickly by category, color, season, or occasion
- **Wear Tracking**: Monitor how often you wear each item

### 🤖 AI-Powered Recommendations

- **Weather-Based Suggestions**: Get outfit recommendations based on real-time weather
- **Occasion Matching**: Find perfect outfits for work, dates, parties, and more
- **Style Learning**: AI learns your preferences over time
- **Mix & Match**: Discover new combinations from your existing wardrobe

### 📅 Outfit Planning

- **Calendar View**: Plan your outfits for the week or month
- **Quick Schedule**: Drag and drop outfits onto calendar dates
- **Outfit History**: Track what you've worn and when
- **Favorites**: Save your best outfit combinations

### 📊 Analytics & Insights

- **Wardrobe Analytics**: Understand your clothing distribution
- **Wear Frequency**: Identify underutilized items
- **Color Palette**: Visualize your wardrobe color scheme
- **Value Tracking**: Monitor your wardrobe investment

### 🎯 User Experience

- **Responsive Design**: Beautiful UI that works on all devices
- **Dark Mode Ready**: Comfortable viewing in any lighting
- **Smooth Animations**: Delightful micro-interactions
- **PWA Support**: Install as a native app

---

## 🛠️ Tech Stack

### Core

- **React 18.3** - Modern UI library with hooks
- **TypeScript 5.7** - Type-safe development
- **Vite 6.3** - Lightning-fast build tool

### UI & Styling

- **Radix UI** - Accessible component primitives
- **Tailwind CSS** - Utility-first styling
- **Lucide React** - Beautiful icon library
- **Recharts** - Data visualization

### State & Data

- **React Context** - Global state management
- **Local Storage** - Persistent data storage
- **Custom Hooks** - Reusable logic

### Development Tools

- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Husky** - Git hooks
- **Vitest** - Unit testing
- **GitHub Actions** - CI/CD pipeline

---

## 🚀 Getting Started

### Prerequisites

- Node.js >= 18.0.0
- npm >= 8.0.0

### Installation

```bash
# Clone the repository
git clone https://github.com/muudzo/Closet-Muse-Mobile-App-Interface.git

# Navigate to project directory
cd Closet-Muse-Mobile-App-Interface

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Start development server
npm run dev
```

The app will be available at `http://localhost:3002`

### Environment Variables

Create a `.env` file in the root directory:

```env
# Required
VITE_APP_NAME=Closet Muse
VITE_APP_VERSION=1.0.0

# Optional - for weather features
VITE_WEATHER_API_KEY=your_openweather_api_key

# Optional - for AI recommendations
VITE_OPENAI_API_KEY=your_openai_api_key

# Feature flags
VITE_ENABLE_ANALYTICS=false
VITE_ENABLE_DEBUG=true
VITE_ENABLE_PWA=true
```

---

## 📜 Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build

# Code Quality
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint errors
npm run format       # Format code with Prettier
npm run type-check   # Run TypeScript compiler

# Testing
npm run test         # Run tests
npm run test:ui      # Run tests with UI
npm run test:coverage # Generate coverage report

# Analysis
npm run analyze      # Analyze bundle size
npm run validate     # Run all checks (type, lint, format)
```

---

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── ui/             # Reusable UI components
│   └── ...             # Feature components
├── contexts/           # React contexts
├── services/           # API and business logic
├── shared/             # Shared utilities
│   ├── components/     # Shared components
│   ├── constants/      # App constants
│   ├── types/          # TypeScript types
│   └── utils/          # Utility functions
├── config/             # Configuration files
├── styles/             # Global styles
└── App.tsx             # Main app component
```

---

## 🎨 Design Philosophy

### Modern & Elegant

- Clean, minimalist interface
- Smooth animations and transitions
- Consistent design language
- Attention to micro-interactions

### Accessible

- WCAG 2.1 compliant
- Keyboard navigation
- Screen reader support
- High contrast modes

### Performance

- Code splitting
- Lazy loading
- Optimized bundles
- Fast initial load

---

## 🧪 Testing

```bash
# Run all tests
npm run test

# Run tests in watch mode
npm run test -- --watch

# Generate coverage report
npm run test:coverage
```

Tests are written using Vitest and React Testing Library.

---

## 📦 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### Other Platforms

- **Netlify**: Deploy the `dist/` folder
- **GitHub Pages**: Use `gh-pages` package
- **Docker**: See `DEPLOYMENT.md` for Dockerfile

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed deployment instructions.

---

## 🤝 Contributing

Contributions are welcome! Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👤 Author

**Michael Nyemudzo**

- GitHub: [@muudzo](https://github.com/muudzo)
- Portfolio: [Your Portfolio URL]

---

## 🙏 Acknowledgments

- Design inspiration from [Figma Community](https://www.figma.com/design/7kArcl8JgSWFvCZzXc3QXz/Closet-Muse-Mobile-App-Interface)
- Icons by [Lucide](https://lucide.dev/)
- UI components by [Radix UI](https://www.radix-ui.com/)

---

## 📸 Screenshots

> Add screenshots of your app here

---

<div align="center">

**Made with ❤️ by Michael Nyemudzo**

⭐ Star this repo if you find it helpful!

</div>
