# Piyush Modi - 3D Interactive Portfolio 🚀

A mind-blowing 3D interactive portfolio built with React and Three.js, featuring revolutionary animations, particle effects, and immersive 3D visualizations that push the boundaries of web design.

## 🚀 Features

### 🎨 Revolutionary 3D Visualizations
- **Interactive 3D Hero Section** with morphing liquid spheres and floating elements
- **3D Skills Visualization** with quantum particles and holographic effects
- **3D Project Cards** with neon glow and portal animations
- **3D Timeline** with energy beams and cosmic effects
- **3D Contact Form** with rainbow particles and sound waves

### 🌟 Mind-Blowing Effects
- **Morphing Liquid Shapes** with custom shaders and real-time deformation
- **Holographic Effects** with scanlines, glitch, and neon glow
- **Mouse Trail Particles** that follow cursor movement in 3D space
- **Matrix Rain** with falling code and cyberpunk aesthetics
- **Sound Wave Visualization** with real-time audio analysis
- **Rainbow Color Shifting** with dynamic hue animations
- **Quantum Effects** with uncertainty and field distortions
- **Portal Effects** with vortex animations and energy fields
- **Cosmic Background** with nebulas, stars, and cosmic dust
- **Cyberpunk UI** with data streams and HUD elements

### 🎯 Modern Design
- **Responsive Design** that works on all devices
- **Smooth Animations** powered by Framer Motion
- **Particle Systems** with 2000+ animated particles
- **Custom Shaders** for unique visual effects
- **Interactive Hover States** throughout the interface
- **Audio Visualization** with microphone input
- **Real-time Effects** that respond to user interaction

### Technical Stack
- **React 18** with modern hooks and functional components
- **Three.js** for 3D graphics and animations
- **@react-three/fiber** for React integration with Three.js
- **@react-three/drei** for additional 3D utilities
- **Framer Motion** for smooth animations
- **Styled Components** for component styling
- **Post-processing effects** for visual enhancements

## 🛠️ Installation & Setup

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm start
   ```

3. **Build for Production**
   ```bash
   npm run build
   ```

## 📁 Project Structure

```
src/
├── components/
│   ├── LoadingScreen.js      # 3D loading animation
│   ├── Navigation.js         # Responsive navigation with animations
│   ├── HeroSection.js        # 3D hero with animated elements
│   ├── AboutSection.js       # About section with floating cards
│   ├── SkillsSection.js      # 3D skills visualization
│   ├── ProjectsSection.js    # Interactive project cards
│   ├── ExperienceSection.js  # 3D timeline experience
│   ├── ContactSection.js     # 3D contact form
│   ├── ParticleField.js      # Background particle system
│   └── FloatingElements.js   # 3D floating geometric shapes
├── App.js                    # Main app component
├── index.js                  # React entry point
└── index.css                 # Global styles
```

## 🎨 Customization

### Colors & Themes
The portfolio uses a consistent color scheme defined in the styled components:
- Primary: `#667eea` (Blue)
- Secondary: `#764ba2` (Purple)
- Accent: `#fbbf24` (Gold)
- Background: Dark gradient from `#0a0a0a` to `#16213e`

### Content Updates
1. **Personal Information**: Update the content in each component
2. **Projects**: Modify the `projects` array in `ProjectsSection.js`
3. **Skills**: Update the `skillCategories` array in `SkillsSection.js`
4. **Experience**: Modify the `experiences` array in `ExperienceSection.js`
5. **Contact**: Update contact information in `ContactSection.js`

### 3D Elements
- Modify 3D geometries in the Canvas components
- Adjust animations in the `useFrame` hooks
- Change particle systems in `ParticleField.js`

## 📱 Responsive Design

The portfolio is fully responsive with breakpoints at:
- **Desktop**: 1200px and above
- **Tablet**: 768px - 1199px
- **Mobile**: Below 768px

## ⚡ Performance

- **Lazy Loading**: Components load as needed
- **Optimized 3D**: Efficient Three.js rendering
- **Smooth Animations**: 60fps animations with Framer Motion
- **Code Splitting**: Automatic code splitting with React

## 🎯 Key Features

### Interactive Elements
- **Hover Effects**: All cards and buttons have smooth hover animations
- **3D Rotations**: Geometric elements rotate and animate continuously
- **Particle Systems**: Background particles create depth and movement
- **Modal Interactions**: Project cards open detailed modals

### Animations
- **Page Transitions**: Smooth transitions between sections
- **Scroll Animations**: Elements animate as they come into view
- **Loading Screen**: 3D loading animation with progress indication
- **Micro-interactions**: Subtle animations on user interactions

## 🔧 Development

### Adding New Sections
1. Create a new component in the `components/` folder
2. Add it to the `App.js` navigation
3. Style with Styled Components
4. Add 3D elements with Three.js if needed

### Customizing 3D Elements
- Use `@react-three/fiber` for React integration
- Add `@react-three/drei` utilities for common 3D objects
- Implement animations with `useFrame` hooks
- Add post-processing effects for visual enhancements

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Contact

**Piyush Modi**
- Email: piyushmodi2118@gmail.com
- LinkedIn: [linkedin.com/in/piyushmodi2118](https://linkedin.com/in/piyushmodi2118)
- GitHub: [github.com/piyush2118](https://github.com/piyush2118)

---

Built with ❤️ using React, Three.js, and modern web technologies.
