import { usePortfolio } from "../context/PortfolioContext";

const NAV = [
  { href: "#home",          label: "Home"     },
  { href: "#skills",        label: "Skills"   },
  { href: "#qualification", label: "Journey"  },
  { href: "#services",      label: "Services" },
  { href: "#projects",      label: "Work"     },
  { href: "#contact",       label: "Contact"  },
];

const SERVICES_LIST = [
  "Web Development",
  "UI/UX Design",
  "React Applications",
  "Full-Stack Solutions",
  "REST APIs & WebSockets",
  "Brand Identity Design",
];

export default function Footer() {
  const { portfolioData } = usePortfolio();
  const personal = portfolioData?.personal || {};
  const socials  = portfolioData?.socials || [];
  const year     = new Date().getFullYear();

  const contactList = [
    { icon: "ri-mail-line",     value: personal.email || "debajyotisamanta2003@gmail.com", href: `mailto:${personal.email || "debajyotisamanta2003@gmail.com"}` },
    { icon: "ri-whatsapp-line", value: personal.whatsapp || "+91 9564 555 918",              href: personal.whatsappUrl || "https://api.whatsapp.com/send?phone=919564555918" },
    { icon: "ri-map-pin-line",  value: personal.location || "West Bengal, India",            href: null },
  ];

  return (
    <footer style={{
      position: "relative",
      background: "var(--bg-void)",
      borderTop: "1px solid rgba(255,255,255,0.06)",
      overflow: "hidden",
    }}>
      {/* Background orbs */}
      <div style={{
        position: "absolute", top: 0, right: "-5%",
        width: "400px", height: "300px",
        background: "radial-gradient(circle, rgba(124,58,237,0.07) 0%, transparent 70%)",
        borderRadius: "50%", pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", bottom: 0, left: "-5%",
        width: "350px", height: "300px",
        background: "radial-gradient(circle, rgba(6,182,212,0.05) 0%, transparent 70%)",
        borderRadius: "50%", pointerEvents: "none",
      }} />

      <div style={{
        maxWidth: "1140px", margin: "0 auto",
        padding: "0 20px",
        position: "relative", zIndex: 1,
      }}>

        {/* ── CTA Banner ── */}
        <div style={{
          margin: "64px 0 56px",
          background: "linear-gradient(135deg, rgba(18,22,40,0.85) 0%, rgba(10,14,28,0.92) 100%)",
          border: "1px solid rgba(124,58,237,0.20)",
          borderRadius: "26px", padding: "48px 32px",
          textAlign: "center",
          backdropFilter: "blur(20px)",
          boxShadow: "0 0 80px rgba(124,58,237,0.08), 0 40px 80px rgba(0,0,0,0.40)",
          position: "relative", overflow: "hidden",
        }} className="footer-cta-banner">
          {/* Top gradient line */}
          <div style={{
            position: "absolute", top: 0, left: "15%", right: "15%", height: "2px",
            background: "linear-gradient(90deg, transparent, var(--clr-primary-mid), var(--clr-cyan), transparent)",
            borderRadius: "1px",
          }} />

          <span className="section-overline" style={{ display: "inline-block", marginBottom: "12px" }}>
            Collaboration
          </span>
          <h2 style={{
            fontSize: "clamp(1.9rem, 4vw, 3rem)",
            fontWeight: 800, color: "var(--text-primary)",
            fontFamily: "var(--font-display)", letterSpacing: "-0.03em",
            marginBottom: "14px", lineHeight: 1.15,
          }}>
            Ready to Build Your Next Product?
          </h2>
          <p style={{
            fontSize: "1rem", color: "var(--text-secondary)",
            maxWidth: "520px", margin: "0 auto 32px auto", lineHeight: 1.65,
          }}>
            Whether you need a full-stack engineer, interactive web experience, or design system — let's connect and make it happen.
          </p>

          <div style={{ display: "flex", gap: "14px", justifyContent: "center", flexWrap: "wrap" }}>
            <a
              href="#contact"
              className="btn-primary"
              style={{ padding: "13px 28px", fontSize: "0.9rem", gap: "8px" }}
            >
              <span>Start a Project</span>
              <i className="ri-arrow-right-line" />
            </a>
            {personal.resumeUrl && (
              <a
                href={personal.resumeUrl}
                download={personal.resumeName || "Debajyoti_Samanta_Resume.pdf"}
                className="btn-ghost"
                style={{ padding: "13px 24px", fontSize: "0.9rem", gap: "8px" }}
              >
                <i className="ri-file-download-line" style={{ color: "var(--clr-cyan-bright)" }} />
                <span>Resume</span>
              </a>
            )}
            {personal.cvUrl && (
              <a
                href={personal.cvUrl}
                download={personal.cvName || "Debajyoti_Samanta_CV.pdf"}
                className="btn-ghost"
                style={{ padding: "13px 24px", fontSize: "0.9rem", gap: "8px" }}
              >
                <i className="ri-article-line" style={{ color: "var(--clr-primary-dim)" }} />
                <span>Curriculum Vitae</span>
              </a>
            )}
          </div>
        </div>

        {/* ── 4-Column Grid ── */}
        <div
          className="footer-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1.4fr 1fr 1fr 1.2fr",
            gap: "40px",
            paddingBottom: "56px",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          {/* Col 1: Brand info */}
          <div>
            <a
              href="#home"
              style={{
                textDecoration: "none", display: "inline-flex",
                alignItems: "center", gap: "10px", marginBottom: "16px",
              }}
            >
              <div style={{
                width: "36px", height: "36px", borderRadius: "10px",
                background: "linear-gradient(135deg, var(--clr-primary), var(--clr-cyan))",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontWeight: 800, fontSize: "0.95rem", color: "white",
              }}>
                {(personal.name || "DS").split(" ").map(w => w[0]).join("").slice(0, 2) || "DS"}
              </div>
              <span style={{
                fontWeight: 700, fontSize: "1.1rem", color: "white",
                fontFamily: "var(--font-display)", letterSpacing: "-0.02em",
              }}>
                {personal.name || "Debajyoti Samanta"}
              </span>
            </a>
            <p style={{
              fontSize: "0.85rem", color: "var(--text-muted)",
              lineHeight: 1.7, marginBottom: "20px", maxWidth: "280px",
            }}>
              {personal.bioIntro || "Full-Stack Developer & UI/UX Designer crafting high-performance, pixel-perfect digital experiences."}
            </p>
            {/* Social icons */}
            <div style={{ display: "flex", gap: "8px" }}>
              {socials.map((s, i) => (
                <a
                  key={s.id || i}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.name}
                  style={{
                    width: "36px", height: "36px", borderRadius: "10px",
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid var(--border-ghost)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: "var(--text-muted)", fontSize: "1rem",
                    textDecoration: "none", transition: "all 0.25s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = s.color;
                    e.currentTarget.style.borderColor = `${s.color}50`;
                    e.currentTarget.style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "var(--text-muted)";
                    e.currentTarget.style.borderColor = "var(--border-ghost)";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  <i className={s.icon} />
                </a>
              ))}
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div>
            <h4 style={{
              fontSize: "0.78rem", fontWeight: 700, textTransform: "uppercase",
              letterSpacing: "0.14em", color: "var(--text-primary)",
              fontFamily: "var(--font-mono)", marginBottom: "18px",
            }}>
              Navigation
            </h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "10px" }}>
              {NAV.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    style={{
                      fontSize: "0.85rem", color: "var(--text-secondary)",
                      textDecoration: "none", transition: "color 0.2s ease",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "white")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-secondary)")}
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Services */}
          <div>
            <h4 style={{
              fontSize: "0.78rem", fontWeight: 700, textTransform: "uppercase",
              letterSpacing: "0.14em", color: "var(--text-primary)",
              fontFamily: "var(--font-mono)", marginBottom: "18px",
            }}>
              Capabilities
            </h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "10px" }}>
              {SERVICES_LIST.map((srv, i) => (
                <li key={i} style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>
                  {srv}
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Contact */}
          <div>
            <h4 style={{
              fontSize: "0.78rem", fontWeight: 700, textTransform: "uppercase",
              letterSpacing: "0.14em", color: "var(--text-primary)",
              fontFamily: "var(--font-mono)", marginBottom: "18px",
            }}>
              Contact Info
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {contactList.map((c, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <i className={c.icon} style={{ color: "var(--clr-primary-dim)", fontSize: "1rem" }} />
                  {c.href ? (
                    <a
                      href={c.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        fontSize: "0.82rem", color: "var(--text-secondary)",
                        textDecoration: "none", wordBreak: "break-all",
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = "white")}
                      onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-secondary)")}
                    >
                      {c.value}
                    </a>
                  ) : (
                    <span style={{ fontSize: "0.82rem", color: "var(--text-secondary)" }}>
                      {c.value}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Bottom Bar ── */}
        <div style={{
          padding: "24px 0 32px",
          display: "flex", justifyContent: "space-between", alignItems: "center",
          flexWrap: "wrap", gap: "16px",
        }} className="footer-bottom-bar">
          <p style={{
            fontSize: "0.78rem", color: "var(--text-muted)",
            margin: 0, fontFamily: "var(--font-mono)",
          }}>
            © {year} {personal.name || "Debajyoti Samanta"}. All rights reserved.
          </p>

          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            style={{
              padding: "7px 16px",
              background: "rgba(255,255,255,0.04)",
              border: "1px solid var(--border-ghost)",
              borderRadius: "999px",
              color: "var(--text-secondary)",
              fontSize: "0.76rem",
              fontFamily: "var(--font-mono)",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "6px",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "white";
              e.currentTarget.style.background = "rgba(255,255,255,0.08)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "var(--text-secondary)";
              e.currentTarget.style.background = "rgba(255,255,255,0.04)";
            }}
          >
            <span>Back to top</span>
            <i className="ri-arrow-up-line" />
          </button>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr !important;
            gap: 32px !important;
          }
        }
        @media (max-width: 560px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
            gap: 28px !important;
          }
          .footer-cta-banner {
            padding: 32px 20px !important;
          }
          .footer-bottom-bar {
            flex-direction: column !important;
            text-align: center !important;
          }
        }
      `}</style>
    </footer>
  );
}