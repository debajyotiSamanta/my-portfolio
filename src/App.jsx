import { useEffect } from "react";
import { PortfolioProvider } from "./context/PortfolioContext";
import Cursor      from "./components/cursor";
import Particles   from "./components/particles";
import Header      from "./components/header";
import Home        from "./components/home";
import Skills      from "./components/skills";
import Qualification from "./components/qualifications";
import Services    from "./components/services";
import Projects    from "./components/projects";
import Testimonial from "./components/testimonial";
import Contact     from "./components/contact";
import Footer      from "./components/footer";
import AdminPanel  from "./components/AdminPanel";

function PortfolioMain() {
  useEffect(() => {
    // ── Scroll Reveal Observer ──
    const revealOptions = { root: null, rootMargin: "0px", threshold: 0.10 };

    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
        }
      });
    }, revealOptions);

    const revealEls = document.querySelectorAll(
      ".glass-card, .section-overline, .stats-grid > div, .testimonial-grid > div"
    );
    revealEls.forEach((el, i) => {
      el.classList.add("reveal-on-scroll");
      el.style.transitionDelay = `${(i % 5) * 0.08}s`;
      revealObserver.observe(el);
    });

    // ── 3D Tilt on Desktop Only ──
    const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    const tiltHandlers = new Map();

    if (!isTouchDevice && window.innerWidth > 900) {
      const tiltCards = document.querySelectorAll(".glass-card");
      tiltCards.forEach((card) => {
        const onMove = (e) => {
          const rect = card.getBoundingClientRect();
          const x    = e.clientX - rect.left;
          const y    = e.clientY - rect.top;
          const cx   = rect.width  / 2;
          const cy   = rect.height / 2;
          const maxT = 5;
          const rotX = ((y - cy) / cy) * -maxT;
          const rotY = ((x - cx) / cx) *  maxT;
          card.style.transform = `perspective(1200px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-3px) scale(1.01)`;
        };
        const onLeave = () => {
          card.style.transform = "perspective(1200px) rotateX(0deg) rotateY(0deg) translateY(0px) scale(1)";
        };
        card.addEventListener("mousemove", onMove);
        card.addEventListener("mouseleave", onLeave);
        tiltHandlers.set(card, { onMove, onLeave });
      });
    }

    // ── Parallax Orbs (Desktop Only) ──
    const orbs = document.querySelectorAll("section > div[style*='radial-gradient']");
    const onParallax = (e) => {
      const mx = e.clientX / window.innerWidth;
      const my = e.clientY / window.innerHeight;
      orbs.forEach((orb, i) => {
        const f = i % 2 === 0 ? 30 : -30;
        orb.style.transition = "transform 1.8s cubic-bezier(0.23, 1, 0.32, 1)";
        orb.style.transform  = `translate(${mx * f}px, ${my * f}px)`;
      });
    };
    if (window.innerWidth > 900) {
      window.addEventListener("mousemove", onParallax, { passive: true });
    }

    return () => {
      revealObserver.disconnect();
      tiltHandlers.forEach(({ onMove, onLeave }, card) => {
        card.removeEventListener("mousemove", onMove);
        card.removeEventListener("mouseleave", onLeave);
      });
      window.removeEventListener("mousemove", onParallax);
    };
  }, []);

  return (
    <>
      <Cursor />
      <Particles />
      <Header />
      <main style={{ position: "relative", zIndex: 2 }}>
        <Home />
        <Skills />
        <Qualification />
        <Services />
        <Projects />
        <Testimonial />
        <Contact />
      </main>
      <Footer />
      <AdminPanel />
    </>
  );
}

function App() {
  return (
    <PortfolioProvider>
      <PortfolioMain />
    </PortfolioProvider>
  );
}

export default App;
