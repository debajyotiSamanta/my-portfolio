import { useEffect } from "react";
import Cursor from "./components/cursor";
import Particles from "./components/particles";

// Components
import Contact from "./components/contact";
import Footer from "./components/footer";
import Header from "./components/header";
import Home from "./components/home";
import Projects from "./components/projects";
import Qualification from "./components/qualifications";
import Services from "./components/services";
import Skills from "./components/skills";
import Testimonial from "./components/testimonial";

function App() {
  useEffect(() => {
    // Global Scroll Reveal logic for the new redesign
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.15, // Trigger when 15% of the element is visible
    };

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
          // Optional: Stop observing after it animates once
          // obs.unobserve(entry.target); 
        }
      });
    }, observerOptions);

    // Grab elements we want to animate
    const revealElements = document.querySelectorAll(
      ".glass-card, .section-overline, .stats-grid > div, .projects-grid > div, .featured-card, .qual-grid > div, .testimonial-grid > div"
    );

    revealElements.forEach((el, index) => {
      el.classList.add("reveal-on-scroll");
      // Add a slight staggered delay to grid items
      el.style.transitionDelay = `${(index % 4) * 0.1}s`;
      observer.observe(el);
    });

    // 1. Interactive 3D Tilt Effect for All Cards
    const tiltCards = document.querySelectorAll(".glass-card, .featured-card, .projects-grid > div, .services-grid > div");
    tiltCards.forEach(card => {
      card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left; 
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const maxTilt = 8; // Degrees
        const rotateX = ((y - centerY) / centerY) * -maxTilt;
        const rotateY = ((x - centerX) / centerX) * maxTilt;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
        // Increase shine on hover direction
        if (card.classList.contains("glass-card")) {
          card.style.boxShadow = `0 16px 32px rgba(0,0,0,0.4), 0 0 30px rgba(124,58,237,0.25)`;
        }
      });
      
      card.addEventListener("mouseleave", () => {
        // Reset immediately smoothly when mouse leaves
        card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)`;
        card.style.boxShadow = "";
      });
    });

    // 2. Parallax effect for Background Orbs based on Mouse movement
    const orbs = document.querySelectorAll("section > div[style*='radial-gradient']");
    const handleParallax = (e) => {
      const mouseX = e.clientX / window.innerWidth;
      const mouseY = e.clientY / window.innerHeight;
      
      orbs.forEach((orb, i) => {
        const factor = (i % 2 === 0) ? 40 : -40; // Alternate direction
        // Ensure transition is smooth for parallax
        orb.style.transition = "transform 1.5s cubic-bezier(0.23, 1, 0.32, 1)";
        orb.style.transform = `translate(${mouseX * factor}px, ${mouseY * factor}px)`;
      });
    };
    
    // Only apply heavy mouse events on desktop
    if (window.innerWidth > 768) {
      window.addEventListener("mousemove", handleParallax);
    }

    return () => {
      observer.disconnect();
      window.removeEventListener("mousemove", handleParallax);
    };
  }, []);

  return (
    <>
      <Cursor />
      <Particles />
      <Header />
      <main className="main" style={{ minHeight: "100vh" }}>
        <Home />
        <Skills />
        <Qualification />
        <Services />
        <Projects />
        <Testimonial />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
export default App;

