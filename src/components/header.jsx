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
        top: "16px",
        left: "16px",
        right: "16px",
        zIndex: 1000,
        transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
        background: scrolled
          ? "rgba(10, 15, 30, 0.55)"
          : "rgba(10, 15, 30, 0.35)",
        backdropFilter: "blur(28px)",
        WebkitBackdropFilter: "blur(28px)",
        border: "1px solid rgba(255, 255, 255, 0.08)",
        borderRadius: isMenuOpen ? "24px" : "999px",
        boxShadow: "0 25px 50px rgba(0, 0, 0, 0.45)",
        maxWidth: "1280px",
        margin: "0 auto",
        overflow: "hidden",
      }}
    >
      <nav style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px 24px",
      }}>
        {/* Logo */}
        <a href="#home" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={{
            width: "36px",
            height: "36px",
            borderRadius: "50%",
            background: "linear-gradient(135deg, var(--clr-primary), var(--clr-cyan))",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            fontWeight: 800,
            fontSize: "0.9rem",
            boxShadow: "0 4px 20px rgba(139,92,246,0.45)",
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
              background: "linear-gradient(135deg, var(--clr-primary-dim), var(--clr-cyan))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>Debajyoti</span>
            <span style={{
              fontSize: "0.55rem",
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
                  borderRadius: "999px",
                  transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                  letterSpacing: "0.01em",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "white";
                  e.currentTarget.style.background = "rgba(255, 255, 255, 0.08)";
                  e.currentTarget.style.boxShadow = "inset 0 1px 1px rgba(255,255,255,0.1)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "var(--text-secondary)";
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.boxShadow = "none";
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
            style={{ fontSize: "0.8rem", padding: "8px 18px" }}
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
              borderRadius: "50%",
              padding: "8px",
              cursor: "pointer",
              color: "var(--text-primary)",
              fontSize: "1.25rem",
              display: "none",
              alignItems: "center",
              justifyContent: "center",
              width: "36px",
              height: "36px",
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
          background: "rgba(10, 15, 30, 0.55)",
          backdropFilter: "blur(28px)",
          borderTop: "1px solid rgba(255,255,255,0.08)",
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
                    borderRadius: "999px",
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "white";
                    e.currentTarget.style.background = "rgba(255, 255, 255, 0.08)";
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