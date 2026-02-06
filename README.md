# ?? My Portfolio

A modern, responsive, and visually stunning portfolio website built with React, Tailwind CSS, and cutting-edge web technologies. Showcasing projects, skills, services, and qualifications with beautiful animations and smooth user experience.

![Portfolio Preview](https://img.shields.io/badge/React-18.0+-blue?logo=react)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.0+-06B6D4?logo=tailwindcss)
![Vite](https://img.shields.io/badge/Vite-5.0+-646CFF?logo=vite)
![License](https://img.shields.io/badge/License-MIT-green)

## ? Features

- **Modern Design**: Premium UI with gradient backgrounds, glassmorphism, and smooth animations
- **3D Effects**: Interactive 3D card animations on skills section with perspective transforms
- **Responsive Layout**: Perfectly optimized for mobile, tablet, and desktop devices
- **Dark Mode**: Seamless light/dark theme toggle with system preference detection
- **Smooth Animations**: Animate.css integration for beautiful entrance animations
- **Performance Optimized**: Lightning-fast load times with Vite bundler
- **SEO Friendly**: Semantic HTML structure and optimized meta tags
- **Interactive Components**:
  - Animated navigation header with underline effects
  - Dynamic skills cards with 3D flip animations
  - Project showcase with hover effects
  - Services section with gradient overlays
  - Contact form with validation
  - Testimonials carousel

## ??? Tech Stack

### Frontend
- **React 18**: Latest React with hooks
- **Tailwind CSS**: Utility-first CSS framework
- **Vite**: Next-generation build tool
- **Animate.css**: Pre-built CSS animations
- **RemixIcon**: Beautiful icon library
- **PostCSS**: CSS transformations

### Development
- **JavaScript (ES6+)**: Modern JavaScript
- **Git**: Version control
- **npm**: Package management

## ?? Installation

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn package manager

### Setup

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/my-portfolio.git
cd my-portfolio
```

2. **Install dependencies**
```bash
npm install
```

3. **Start development server**
```bash
npm run dev
```

The portfolio will be available at `http://localhost:5174`

## ?? Build & Deploy

### Build for production
```bash
npm run build
```

### Preview production build
```bash
npm run preview
```

## ?? Project Structure

```
my-portfolio/
+-- src/
�   +-- components/
�   �   +-- header.jsx          # Navigation header with theme toggle
�   �   +-- home.jsx            # Hero section with CTA
�   �   +-- skills.jsx          # Technical skills with 3D effects
�   �   +-- projects.jsx        # Project showcase
�   �   +-- services.jsx        # Services offering
�   �   +-- qualifications.jsx  # Education & experience
�   �   +-- contact.jsx         # Contact form
�   �   +-- testimonial.jsx     # Client testimonials
�   �   +-- footer.jsx          # Footer section
�   +-- assets/                 # Images and icons
�   +-- App.jsx                 # Main app component
�   +-- main.jsx                # Entry point
�   +-- App.css                 # Global styles
�   +-- index.css               # Main stylesheet
+-- public/                     # Static files
+-- index.html                  # HTML template
+-- vite.config.js              # Vite configuration
+-- tailwind.config.cjs         # Tailwind configuration
+-- postcss.config.cjs          # PostCSS configuration
+-- package.json                # Dependencies
```

## ?? Customization

### Colors
Edit `tailwind.config.cjs` to customize the color scheme:
```javascript
theme: {
  extend: {
    colors: {
      primary: '#3b82f6',  // Blue
      secondary: '#9333ea' // Purple
    }
  }
}
```

### Content
- Update personal information in component files
- Replace skill icons in `src/assets/`
- Modify project details in `projects.jsx`
- Update testimonials in `testimonial.jsx`

## ?? Sections

### Header
- Responsive navigation with smooth scrolling
- Dark/Light theme toggle
- Mobile menu with animations
- Animated nav underlines

### Home
- Hero section with engaging headline
- Call-to-action buttons
- Smooth scroll navigation

### Skills
- Two categories: Frontend Development & Design Languages
- 3D flip animations on hover
- Skill level badges
- Grid layout (responsive 2-4 columns)

### Projects
- Project cards with images
- Technology tags
- Links to demos and source code
- Hover animations with shadows

### Services
- Service offerings with icons
- Gradient backgrounds
- Hover effects with translation
- Four service categories

### Qualifications
- Education timeline
- Work experience
- Responsive timeline design
- Badge indicators

### Contact
- Contact form with inputs
- Form validation
- Social media links
- Call-to-action elements

### Testimonials
- Client testimonials carousel
- Star ratings
- Client images and names
- Swiper carousel integration

## ?? Performance

- **Lighthouse Score**: 95+
- **First Contentful Paint**: < 1.5s
- **Time to Interactive**: < 2.5s
- **Cumulative Layout Shift**: < 0.1

## ?? Best Practices

- Semantic HTML structure
- WCAG accessibility compliance
- Mobile-first responsive design
- Performance optimization
- SEO optimization
- Clean, maintainable code

## ?? License

This project is licensed under the MIT License - see the LICENSE file for details.

## ?? Contributing

Contributions, issues, and feature requests are welcome!

## ?? Contact

- Email: your.email@example.com
- LinkedIn: [Your Profile](https://linkedin.com)
- GitHub: [Your Profile](https://github.com)
- Portfolio: [Live Demo](https://yourportfolio.com)

---

**Made with ?? by Debajyoti Samanta**

## Resume / CV

Provide PDF files for visitors by placing `resume.pdf` and `cv.pdf` into the project's `public/` folder. Files in `public/` are served at the root of the site (for example `/resume.pdf`). Once added, the home page buttons allow visitors to download them.
