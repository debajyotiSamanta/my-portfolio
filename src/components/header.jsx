import { useEffect, useState } from "react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenu = () => setIsMenuOpen(false);

  const navLinks = [
    { href: "#home",          label: "Home" },
    { href: "#skills",        label: "Skills" },
    { href: "#qualification", label: "Journey" },
    { href: "#services",      label: "Services" },
    { href: "#projects",      label: "Projects" },
    { href: "#contact",       label: "Contact" },
  ];

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        transition: "all 0.35s ease",
        background: scrolled
          ? "rgba(10, 14, 26, 0.88)"
          : "rgba(10, 14, 26, 0.60)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderBottom: scrolled
          ? "1px solid rgba(124, 58, 237, 0.20)"
          : "1px solid rgba(255,255,255,0.04)",
        boxShadow: scrolled ? "0 4px 40px rgba(0,0,0,0.5)" : "none",
      }}
    >
      <nav style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "14px 32px",
        maxWidth: "1280px",
        margin: "0 auto",
      }}>
        {/* Logo */}
        <a href="#home" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={{
            width: "40px",
            height: "40px",
            borderRadius: "10px",
            background: "linear-gradient(135deg, #7C3AED, #4cd7f6)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            fontWeight: 800,
            fontSize: "1rem",
            boxShadow: "0 4px 20px rgba(124,58,237,0.45)",
            letterSpacing: "-0.02em",
          }}>
            DS
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{
              fontSize: "0.75rem",
              fontWeight: 700,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              background: "linear-gradient(135deg, #d2bbff, #4cd7f6)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>Debajyoti</span>
            <span style={{
              fontSize: "0.6rem",
              fontWeight: 500,
              color: "var(--text-muted)",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
            }}>Developer</span>
          </div>
        </a>

        {/* Desktop Nav */}
        <ul style={{
          display: "flex",
          gap: "4px",
          listStyle: "none",
          alignItems: "center",
        }} className="desktop-nav">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                style={{
                  position: "relative",
                  display: "inline-flex",
                  alignItems: "center",
                  padding: "8px 16px",
                  color: "var(--text-secondary)",
                  textDecoration: "none",
                  fontSize: "0.875rem",
                  fontWeight: 500,
                  borderRadius: "8px",
                  transition: "all 0.25s ease",
                  letterSpacing: "0.01em",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "var(--clr-primary-dim)";
                  e.currentTarget.style.background = "rgba(124,58,237,0.10)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "var(--text-secondary)";
                  e.currentTarget.style.background = "transparent";
                }}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA Button (desktop) + Hamburger (mobile) */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <a
            href="#contact"
            className="btn-primary desktop-cta"
            style={{ fontSize: "0.8rem", padding: "9px 20px" }}
          >
            Hire Me ✦
          </a>

          {/* Mobile hamburger */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="mobile-menu-btn"
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "8px",
              padding: "8px",
              cursor: "pointer",
              color: "var(--text-primary)",
              fontSize: "1.25rem",
              display: "none",
              alignItems: "center",
              justifyContent: "center",
              width: "40px",
              height: "40px",
              transition: "all 0.25s ease",
            }}
            aria-label="Toggle menu"
          >
            <i className={`ri-${isMenuOpen ? "close" : "menu-4"}-line`}></i>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div style={{
          background: "rgba(10, 14, 26, 0.97)",
          backdropFilter: "blur(20px)",
          borderTop: "1px solid rgba(255,255,255,0.06)",
          padding: "16px 24px 24px",
        }}>
          <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "4px" }}>
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={closeMenu}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    padding: "12px 16px",
                    color: "var(--text-secondary)",
                    textDecoration: "none",
                    fontSize: "0.95rem",
                    fontWeight: 500,
                    borderRadius: "10px",
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "var(--clr-primary-dim)";
                    e.currentTarget.style.background = "rgba(124,58,237,0.10)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "var(--text-secondary)";
                    e.currentTarget.style.background = "transparent";
                  }}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .desktop-cta { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
      `}</style>
    </header>
  );
}