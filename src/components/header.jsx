import { useEffect, useRef, useState } from "react";
import { usePortfolio } from "../context/PortfolioContext";

const navLinks = [
  { href: "#home",          label: "Home",     icon: "ri-home-4-line" },
  { href: "#skills",        label: "Skills",   icon: "ri-code-s-slash-line" },
  { href: "#qualification", label: "Journey",  icon: "ri-map-2-line" },
  { href: "#services",      label: "Services", icon: "ri-service-line" },
  { href: "#projects",      label: "Work",     icon: "ri-layout-grid-line" },
  { href: "#contact",       label: "Contact",  icon: "ri-mail-send-line" },
];

export default function Header() {
  const { portfolioData } = usePortfolio();
  const personal = portfolioData?.personal || {};

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled]     = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [scrollProgress, setScrollProgress] = useState(0);
  const menuRef = useRef(null);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 30);
      const totalHeight = document.body.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress(Math.min((window.scrollY / totalHeight) * 100, 100));
      }

      // Active section detection
      const sectionIds = ["home", "skills", "qualification", "services", "projects", "contact"];
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el && window.scrollY >= el.offsetTop - 130) {
          setActiveSection(sectionIds[i]);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menu on outside click
  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsMenuOpen(false);
      }
    };
    if (isMenuOpen) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [isMenuOpen]);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <>
      {/* Scroll Progress Bar */}
      <div style={{
        position: "fixed", top: 0, left: 0,
        height: "2px", zIndex: 1100,
        background: "linear-gradient(90deg, var(--clr-primary), var(--clr-cyan))",
        width: `${scrollProgress}%`,
        transition: "width 0.1s linear",
      }} />

      {/* Main Header Container */}
      <header
        ref={menuRef}
        style={{
          position: "fixed",
          top: 0, left: 0, right: 0,
          zIndex: 1000,
          transition: "all 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
          padding: scrolled ? "10px 16px" : "18px 20px",
        }}
      >
        <nav
          style={{
            maxWidth: "1140px",
            margin: "0 auto",
            borderRadius: scrolled ? "20px" : "24px",
            padding: scrolled ? "8px 16px" : "10px 20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            background: scrolled
              ? "rgba(5, 8, 18, 0.82)"
              : "rgba(7, 10, 22, 0.55)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            border: scrolled
              ? "1px solid rgba(255, 255, 255, 0.12)"
              : "1px solid rgba(255, 255, 255, 0.07)",
            boxShadow: scrolled
              ? "0 16px 40px rgba(0, 0, 0, 0.6), 0 0 20px rgba(124, 58, 237, 0.08)"
              : "0 8px 24px rgba(0, 0, 0, 0.35)",
            transition: "all 0.35s ease",
          }}
        >
          {/* ── Logo ── */}
          <a
            href="#home"
            style={{
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <div style={{
              width: "36px", height: "36px",
              borderRadius: "10px",
              background: "linear-gradient(135deg, var(--clr-primary), var(--clr-cyan))",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontWeight: 800, fontSize: "0.95rem", color: "white",
              letterSpacing: "-0.04em",
              boxShadow: "0 0 16px var(--clr-primary-glow)",
              flexShrink: 0,
            }}>
              {(personal.name || "DS").split(" ").map(w => w[0]).join("").slice(0, 2) || "DS"}
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{
                fontWeight: 700, fontSize: "0.92rem", color: "white",
                letterSpacing: "-0.02em", lineHeight: 1.15,
                fontFamily: "var(--font-display)",
              }}>
                {personal.name || "Debajyoti Samanta"}
              </span>
              <span style={{
                fontSize: "0.68rem", color: "var(--clr-cyan-bright)",
                fontFamily: "var(--font-mono)", letterSpacing: "0.06em",
              }}>
                Full-Stack Engineer
              </span>
            </div>
          </a>

          {/* ── Desktop Nav Links ── */}
          <ul
            className="desktop-nav"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "4px",
              listStyle: "none",
              margin: 0, padding: 0,
            }}
          >
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.slice(1);
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    style={{
                      padding: "8px 14px",
                      borderRadius: "12px",
                      textDecoration: "none",
                      fontSize: "0.82rem",
                      fontWeight: isActive ? 700 : 500,
                      color: isActive ? "white" : "var(--text-secondary)",
                      background: isActive ? "rgba(124, 58, 237, 0.15)" : "transparent",
                      border: "1px solid",
                      borderColor: isActive ? "rgba(124, 58, 237, 0.35)" : "transparent",
                      boxShadow: isActive ? "0 0 14px rgba(124, 58, 237, 0.2)" : "none",
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      transition: "all 0.25s ease",
                      letterSpacing: "0.01em",
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.color = "white";
                        e.currentTarget.style.background = "rgba(255, 255, 255, 0.05)";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.color = "var(--text-secondary)";
                        e.currentTarget.style.background = "transparent";
                      }
                    }}
                  >
                    <i className={link.icon} style={{ fontSize: "0.85rem", opacity: 0.7 }} />
                    {link.label}
                  </a>
                </li>
              );
            })}
          </ul>

          {/* ── CTA + Hamburger ── */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px", flexShrink: 0 }}>
            <a
              href="#contact"
              className="btn-primary desktop-cta"
              style={{ fontSize: "0.78rem", padding: "8px 18px", gap: "6px" }}
            >
              Hire Me <i className="ri-arrow-right-up-line" />
            </a>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="mobile-menu-btn"
              style={{
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.10)",
                borderRadius: "50%",
                padding: "0",
                cursor: "pointer",
                color: "var(--text-primary)",
                fontSize: "1.15rem",
                display: "none",
                alignItems: "center",
                justifyContent: "center",
                width: "38px", height: "38px",
                transition: "all 0.25s ease",
                flexShrink: 0,
              }}
              aria-label="Toggle navigation menu"
            >
              <i className={`ri-${isMenuOpen ? "close" : "menu-3"}-line`} />
            </button>
          </div>
        </nav>

        {/* ── Mobile Menu Dropdown ── */}
        {isMenuOpen && (
          <div style={{
            maxWidth: "1140px",
            margin: "8px auto 0",
            background: "rgba(5, 8, 18, 0.95)",
            backdropFilter: "blur(28px)",
            WebkitBackdropFilter: "blur(28px)",
            border: "1px solid rgba(255,255,255,0.10)",
            borderRadius: "20px",
            padding: "14px 16px 18px",
            boxShadow: "0 20px 50px rgba(0,0,0,0.8)",
          }}>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "4px", margin: 0, padding: 0 }}>
              {navLinks.map((link) => {
                const isActive = activeSection === link.href.slice(1);
                return (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      onClick={closeMenu}
                      style={{
                        display: "flex", alignItems: "center", gap: "12px",
                        padding: "11px 16px",
                        color: isActive ? "white" : "var(--text-secondary)",
                        textDecoration: "none",
                        fontSize: "0.9rem", fontWeight: isActive ? 700 : 500,
                        borderRadius: "12px",
                        transition: "all 0.2s ease",
                        background: isActive ? "rgba(124,58,237,0.15)" : "transparent",
                      }}
                    >
                      <i className={link.icon} style={{ color: isActive ? "var(--clr-primary-dim)" : "var(--text-muted)", fontSize: "1rem" }} />
                      {link.label}
                    </a>
                  </li>
                );
              })}
            </ul>
            <a
              href="#contact"
              onClick={closeMenu}
              className="btn-primary"
              style={{ width: "100%", justifyContent: "center", marginTop: "14px", fontSize: "0.9rem", padding: "10px" }}
            >
              Hire Me <i className="ri-arrow-right-up-line" />
            </a>
          </div>
        )}

        <style>{`
          @media (max-width: 860px) {
            .desktop-nav { display: none !important; }
            .desktop-cta { display: none !important; }
            .mobile-menu-btn { display: flex !important; }
          }
        `}</style>
      </header>
    </>
  );
}