export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socials = [
    { href: "https://www.linkedin.com/in/debajyoti-samanta-b49b292b5/", icon: "ri-linkedin-box-fill",   color: "#0A66C2", label: "LinkedIn"  },
    { href: "https://github.com/debajyotiSamanta",                       icon: "ri-github-fill",          color: "#6e5494", label: "GitHub"    },
    { href: "https://www.instagram.com/unique_engineer_07/",              icon: "ri-instagram-fill",       color: "#E1306C", label: "Instagram" },
    { href: "https://www.facebook.com/debajyoti.samanta.588680",          icon: "ri-facebook-circle-fill", color: "#1877F2", label: "Facebook"  },
  ];

  const nav = [
    { href: "#home",          label: "Home"          },
    { href: "#skills",        label: "Skills"        },
    { href: "#qualification", label: "Journey"       },
    { href: "#services",      label: "Services"      },
    { href: "#projects",      label: "Projects"      },
    { href: "#contact",       label: "Contact"       },
  ];

  const services = [
    "Web Development",
    "UI/UX Design",
    "React Applications",
    "Full-Stack Solutions",
    "API Integration",
  ];

  const contact = [
    { icon: "ri-mail-line",      value: "debajyotisamanta2003@gmail.com", href: "mailto:debajyotisamanta2003@gmail.com" },
    { icon: "ri-whatsapp-line",  value: "+91 9564555918",                  href: "https://api.whatsapp.com/send?phone=919564555918" },
    { icon: "ri-map-pin-line",   value: "West Bengal, India",              href: null },
  ];

  return (
    <footer style={{
      position: "relative",
      background: "var(--bg-base)",
      borderTop: "1px solid rgba(255,255,255,0.05)",
      overflow: "hidden",
    }}>
      {/* Orb glows */}
      <div style={{
        position: "absolute", top: 0, right: "-5%",
        width: "400px", height: "300px",
        background: "radial-gradient(circle, rgba(124,58,237,0.08) 0%, transparent 70%)",
        borderRadius: "50%", pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", bottom: 0, left: "-5%",
        width: "350px", height: "300px",
        background: "radial-gradient(circle, rgba(76,215,246,0.06) 0%, transparent 70%)",
        borderRadius: "50%", pointerEvents: "none",
      }} />

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px", position: "relative", zIndex: 1 }}>

        {/* CTA Banner */}
        <div style={{
          margin: "64px 0 56px",
          background: "rgba(27,31,44,0.80)",
          border: "1px solid rgba(124,58,237,0.20)",
          borderRadius: "20px",
          padding: "48px 40px",
          textAlign: "center",
          backdropFilter: "blur(12px)",
          boxShadow: "0 0 60px rgba(124,58,237,0.08)",
        }}>
          <h3 style={{
            fontSize: "clamp(1.6rem, 3vw, 2.4rem)",
            fontWeight: 800, letterSpacing: "-0.03em",
            color: "var(--text-primary)", marginBottom: "12px",
          }}>
            Ready to Create Something{" "}
            <span className="gradient-text">Extraordinary?</span>
          </h3>
          <p style={{ color: "var(--text-secondary)", marginBottom: "28px", fontSize: "0.95rem" }}>
            Let's collaborate and bring your digital vision to life with creativity and innovation.
          </p>
          <a href="#contact" className="btn-primary" style={{ fontSize: "0.95rem" }}>
            Start Your Project <i className="ri-arrow-right-line"></i>
          </a>
        </div>

        {/* Divider */}
        <div style={{ height: "1px", background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.07), transparent)", marginBottom: "48px" }} />

        {/* 4-column grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1.4fr 1fr 1fr 1.3fr",
          gap: "40px",
          marginBottom: "48px",
        }} className="footer-grid">

          {/* Brand */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
              <div style={{
                width: "40px", height: "40px", borderRadius: "10px",
                background: "linear-gradient(135deg, #7C3AED, #4cd7f6)",
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "white", fontWeight: 800, fontSize: "0.9rem",
                boxShadow: "0 4px 16px rgba(124,58,237,0.45)",
              }}>DS</div>
              <div>
                <p style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.15em", color: "var(--text-primary)", textTransform: "uppercase" }}>Debajyoti Samanta</p>
                <p style={{ fontSize: "0.6rem", color: "var(--text-muted)", letterSpacing: "0.18em", textTransform: "uppercase" }}>Full Stack Developer</p>
              </div>
            </div>
            <p style={{ fontSize: "0.83rem", color: "var(--text-secondary)", lineHeight: 1.7, marginBottom: "20px" }}>
              Crafting beautiful, responsive digital experiences with modern technologies and creative vision.
            </p>
            <div style={{ display: "flex", gap: "8px" }}>
              {socials.map((s, i) => (
                <a
                  key={i}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  title={s.label}
                  style={{
                    width: "36px", height: "36px", borderRadius: "50%",
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.07)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: "var(--text-muted)", fontSize: "1rem",
                    textDecoration: "none", transition: "all 0.25s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "white";
                    e.currentTarget.style.background = s.color + "25";
                    e.currentTarget.style.borderColor = s.color + "55";
                    e.currentTarget.style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "var(--text-muted)";
                    e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  <i className={s.icon}></i>
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--text-primary)", marginBottom: "16px" }}>
              Navigation
            </h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "10px" }}>
              {nav.map((link, i) => (
                <li key={i}>
                  <a
                    href={link.href}
                    style={{ fontSize: "0.85rem", color: "var(--text-secondary)", textDecoration: "none", transition: "all 0.2s ease", display: "inline-block" }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = "var(--clr-primary-dim)"; e.currentTarget.style.transform = "translateX(4px)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = "var(--text-secondary)";  e.currentTarget.style.transform = "translateX(0)"; }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--text-primary)", marginBottom: "16px" }}>
              Services
            </h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "10px" }}>
              {services.map((s, i) => (
                <li key={i} style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>{s}</li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--text-primary)", marginBottom: "16px" }}>
              Get in Touch
            </h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "14px" }}>
              {contact.map((item, i) => {
                const inner = (
                  <>
                    <i className={item.icon} style={{ color: "var(--clr-primary-dim)", flexShrink: 0, marginTop: "1px" }}></i>
                    <span style={{ fontSize: "0.82rem", color: "var(--text-secondary)", wordBreak: "break-all" }}>{item.value}</span>
                  </>
                );
                return item.href ? (
                  <li key={i}>
                    <a
                      href={item.href}
                      target={item.href.startsWith("mailto") ? undefined : "_blank"}
                      rel="noreferrer"
                      style={{ display: "flex", gap: "10px", alignItems: "flex-start", textDecoration: "none", transition: "color 0.2s ease" }}
                      onMouseEnter={(e) => { e.currentTarget.querySelectorAll("span, i").forEach(el => el.style.color = "var(--clr-cyan)"); }}
                      onMouseLeave={(e) => { e.currentTarget.querySelector("i").style.color = "var(--clr-primary-dim)"; e.currentTarget.querySelector("span").style.color = "var(--text-secondary)"; }}
                    >
                      {inner}
                    </a>
                  </li>
                ) : (
                  <li key={i} style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>{inner}</li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: "1px", background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.07), transparent)", marginBottom: "28px" }} />

        {/* Bottom bar */}
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "12px",
          paddingBottom: "32px",
          fontSize: "0.78rem",
          color: "var(--text-muted)",
        }} className="footer-bottom">
          <span>© {currentYear} Debajyoti Samanta. All rights reserved.</span>
          <span>
            Built with{" "}
            <span style={{ color: "#f87171", animation: "pulse-glow 1.5s ease-in-out infinite" }}>❤</span>
            {" "}& passion
          </span>
          <span>Designed & developed by Debajyoti Samanta</span>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .footer-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 540px) {
          .footer-grid   { grid-template-columns: 1fr !important; }
          .footer-bottom { flex-direction: column; text-align: center; }
        }
      `}</style>
    </footer>
  );
}