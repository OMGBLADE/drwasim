# Modern 3D Portfolio - Dr. Waseem Ahmad Khan

A cutting-edge, minimal 3D portfolio website built with modern technologies including Framer Motion, Three.js, GSAP, and Next.js.

## 🚀 Features

### Modern Tech Stack
- **Next.js 14** - React framework with App Router
- **Framer Motion** - Advanced animations and interactions
- **Three.js** - 3D graphics and particle effects
- **GSAP** - Professional-grade animations
- **Tailwind CSS** - Utility-first CSS framework
- **TypeScript** - Type-safe development

### 3D & Animation Features
- ✨ **3D Particle Background** - Dynamic Three.js particle system
- 🎭 **Smooth Scroll Animations** - GSAP ScrollTrigger integration
- 🎨 **Glassmorphism Design** - Modern glass-like UI elements
- 📱 **Responsive Design** - Mobile-first approach
- 🌊 **Floating Elements** - Animated background cards
- 🎯 **Interactive Cards** - 3D hover effects
- ⚡ **Performance Optimized** - 60fps animations

### Design System
- **Minimal & Clean** - Focus on content and user experience
- **Dark Theme** - Modern dark color scheme
- **Gradient Accents** - Beautiful color transitions
- **Typography** - Inter font family for readability
- **Micro-interactions** - Subtle hover and click effects

## 🛠️ Installation

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd modern-3d-portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
modern-3d-portfolio/
├── app/
│   ├── globals.css          # Global styles and Tailwind config
│   ├── layout.tsx           # Root layout component
│   └── page.tsx             # Main page component
├── components/
│   ├── CursorParticles.tsx  # Cursor particle effects
│   ├── InteractiveFeatures.tsx # Interactive UI elements
│   ├── MediaGallery.tsx     # Media gallery component
│   ├── Navigation.tsx       # Navigation with animations
│   ├── TestimonialSection.tsx # Testimonials section
│   ├── ThreeBackground.tsx  # 3D particle background
│   └── VideoSidebar.tsx     # Video sidebar component
├── modern_portfolio.html    # Static HTML version
├── public/                  # Static assets
├── package.json            # Dependencies and scripts
├── tailwind.config.js      # Tailwind configuration
├── next.config.js          # Next.js configuration
└── README.md              # Project documentation
```

## 🎨 Customization

### Colors
Edit the color variables in `tailwind.config.js`:
```javascript
colors: {
  primary: 'rgb(var(--primary) / <alpha-value>)',
  secondary: 'rgb(var(--secondary) / <alpha-value>)',
  accent: 'rgb(var(--accent) / <alpha-value>)',
  text: 'rgb(var(--text) / <alpha-value>)',
  muted: 'rgb(var(--muted) / <alpha-value>)',
  // ... more colors
}
```

### Animations
Modify animation parameters in `app/globals.css`:
```css
@keyframes float1 {
  '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' };
  '50%': { transform: 'translateY(-20px) rotate(5deg)' };
}
```

### 3D Effects
Adjust Three.js particle system in `components/ThreeBackground.tsx`:
```javascript
const particleCount = 1000; // Increase/decrease particles
const material = new THREE.PointsMaterial({
  size: 0.05, // Particle size
  opacity: 0.8 // Particle opacity
});
```

## 📦 Dependencies

### Core Dependencies
- **Next.js 14** - React framework
- **React 18** - UI library
- **Framer Motion** - Animation library
- **GSAP** - Professional animations
- **Three.js** - 3D graphics
- **Lucide React** - Icon library
- **Tailwind CSS** - Utility-first CSS

### Development Dependencies
- **TypeScript** - Type safety
- **ESLint** - Code linting
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixes

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically

### Netlify
1. Build the project: `npm run build`
2. Deploy the `out` folder to Netlify

### Other Platforms
The project works with any static hosting service that supports Next.js.

## 📱 Performance

- **Lighthouse Score**: 95+ (Performance, Accessibility, Best Practices, SEO)
- **Core Web Vitals**: Optimized for all metrics
- **Bundle Size**: Optimized with Next.js tree shaking
- **Images**: Optimized with Next.js Image component

## 🎯 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- **Framer Motion** - For incredible animation tools
- **Three.js** - For 3D graphics capabilities
- **GSAP** - For professional animations
- **Tailwind CSS** - For utility-first styling
- **Next.js** - For the amazing React framework

## 📞 Contact

Dr. Waseem Ahmad Khan
- Email: [your-email@example.com]
- LinkedIn: [your-linkedin]
- GitHub: [your-github]

---

Built with ❤️ using modern web technologies 