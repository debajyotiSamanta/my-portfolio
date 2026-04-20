export default function Services() {
  const services = [
    {
      icon: "ri-layout-4-line",
      title: "UI/UX Design",
      desc: "Creating intuitive, beautiful interfaces that users love. Focused on user-centered design principles and premium modern aesthetics.",
      accent: "var(--clr-primary-dim)",
      glow: "rgba(124,58,237,0.25)",
      bg: "rgba(124,58,237,0.08)",
      border: "rgba(124,58,237,0.20)",
    },
    {
      icon: "ri-code-s-slash-line",
      title: "Web Development",
      desc: "Building responsive, performant websites using modern technologies. From concept to deployment with clean, scalable code.",
      accent: "var(--clr-cyan)",
      glow: "rgba(76,215,246,0.20)",
      bg: "rgba(76,215,246,0.06)",
      border: "rgba(76,215,246,0.18)",
    },
    {
      icon: "ri-palette-line",
      title: "Brand Design",
      desc: "Developing cohesive visual identities that represent your brand — logo design, color systems, and comprehensive brand guidelines.",
      accent: "var(--clr-pink)",
      glow: "rgba(255,176,205,0.20)",
      bg: "rgba(255,176,205,0.06)",
      border: "rgba(255,176,205,0.18)",
    },
    {
      icon: "ri-computer-line",
      title: "Full-Stack Engineering",
      desc: "Developing robust, scalable software solutions with clean architecture. Expertise spanning the full product stack from API to UI.",
      accent: "#6ee7b7",
      glow: "rgba(52,211,153,0.20)",
      bg: "rgba(52,211,153,0.06)",
      border: "rgba(52,211,153,0.18)",
    },
  ]

  return (
    <section
      id="services"
      className="dot-grid section-kv"
      style={{ background: "var(--bg-container)" }}
    >
      <div style={{
        position: "absolute", top: "10%", left: "-5%",
        width: "350px", height: "350px",
        background: "radial-gradient(circle, rgba(255,176,205,0.06) 0%, transparent 70%)",
        borderRadius: "50%", pointerEvents: "none",
      }} />

      <div style={{ maxWidth: "1200px", margin: "0 auto", position: "relative", zIndex: 1 }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "56px" }}>
          <span className="section-overline">What I Offer</span>
          <h2 style={{
            fontSize: "clamp(2.4rem, 5vw, 3.8rem)",
            fontWeight: 800, letterSpacing: "-0.04em",
            color: "var(--text-primary)", marginTop: "12px", marginBottom: "16px", lineHeight: 1.1,
          }}>
            My <span className="gradient-text-cyan">Services</span>
          </h2>
          <p style={{ color: "var(--text-secondary)", fontSize: "1rem", maxWidth: "480px", margin: "0 auto" }}>
            Comprehensive solutions to bring your digital vision to life
          </p>
        </div>

        {/* Cards grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "20px",
        }} className="services-grid">
          {services.map((svc, i) => (
            <div
              key={i}
              style={{
                position: "relative",
                background: "rgba(27,31,44,0.80)",
                backdropFilter: "blur(12px)",
                border: `1px solid ${svc.border}`,
                borderRadius: "16px",
                padding: "32px 24px",
                transition: "all 0.3s ease",
                overflow: "hidden",
                cursor: "default",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-6px)";
                e.currentTarget.style.boxShadow = `0 16px 48px rgba(0,0,0,0.4), 0 0 30px ${svc.glow}`;
                e.currentTarget.style.background = "rgba(53,57,71,0.60)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
                e.currentTarget.style.background = "rgba(27,31,44,0.80)";
              }}
            >
              {/* Icon */}
              <div style={{
                width: "52px", height: "52px",
                borderRadius: "12px",
                background: svc.bg,
                border: `1px solid ${svc.border}`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "1.5rem", color: svc.accent,
                marginBottom: "20px",
                boxShadow: `0 0 20px ${svc.glow}`,
              }}>
                <i className={svc.icon}></i>
              </div>

              {/* Title */}
              <h3 style={{
                fontWeight: 700, fontSize: "1.05rem",
                color: "var(--text-primary)", marginBottom: "12px",
              }}>
                {svc.title}
              </h3>

              {/* Desc */}
              <p style={{
                fontSize: "0.85rem", color: "var(--text-secondary)",
                lineHeight: 1.7, marginBottom: "20px",
              }}>
                {svc.desc}
              </p>

              {/* Bottom neon line */}
              <div style={{
                height: "2px",
                background: `linear-gradient(90deg, ${svc.accent}, transparent)`,
                borderRadius: "2px",
              }} />
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .services-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 540px) {
          .services-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}