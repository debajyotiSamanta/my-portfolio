import { useState } from "react";

export default function Services() {
  const [activeService, setActiveService] = useState(0);

  const services = [
    {
      icon: "ri-layout-4-line",
      title: "UI/UX Design",
      desc: "Creating intuitive, beautiful interfaces that users love. Focused on user-centered design principles and premium modern aesthetics, ensuring consistency across interactive user flows.",
      accent: "var(--clr-primary-dim)",
      glow: "rgba(139, 92, 246, 0.25)",
      bg: "rgba(139, 92, 246, 0.08)",
      border: "rgba(139, 92, 246, 0.20)",
      features: [
        "Wireframing & interactive prototyping",
        "Figma components & variables setup",
        "Design system token architectures",
        "Aesthetic visual asset guidelines"
      ]
    },
    {
      icon: "ri-code-s-slash-line",
      title: "Full-Stack Development",
      desc: "Building responsive, performant websites using modern technologies. From concept to deployment with clean, scalable code and secure hosting structures.",
      accent: "var(--clr-cyan)",
      glow: "rgba(0, 210, 253, 0.20)",
      bg: "rgba(0, 210, 253, 0.06)",
      border: "rgba(0, 210, 253, 0.18)",
      features: [
        "Responsive React applications",
        "Robust Node.js & Express REST APIs",
        "MongoDB databases & ODM schemas",
        "Optimized build systems & cloud deployments"
      ]
    },
    {
      icon: "ri-palette-line",
      title: "Brand Design",
      desc: "Developing cohesive visual identities that represent your brand — logo design, color systems, and comprehensive brand guidelines tailored to fit target audiences.",
      accent: "var(--clr-pink)",
      glow: "rgba(255,176,205,0.20)",
      bg: "rgba(255,176,205,0.06)",
      border: "rgba(255,176,205,0.18)",
      features: [
        "Vector logomarks & visual style guidelines",
        "Curated typography systems & pairings",
        "Custom digital brand templates & components",
        "Consistency audits & styling standards"
      ]
    },
    {
      icon: "ri-computer-line",
      title: "Software Developer",
      desc: "Developing robust, scalable software solutions with clean architecture. Expertise spanning the full product stack from databases to interactive user interfaces.",
      accent: "#6ee7b7",
      glow: "rgba(52,211,153,0.20)",
      bg: "rgba(52,211,153,0.06)",
      border: "rgba(52,211,153,0.18)",
      features: [
        "Modular backend architecture & APIs",
        "Secure authentication & data shielding",
        "High-performance queries & search indexes",
        "WebRTC, WebSockets & real-time networking"
      ]
    },
  ];

  return (
    <section
      id="services"
      className="dot-grid section-kv"
      style={{ background: "var(--bg-container)", position: "relative", overflow: "hidden" }}
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

        {/* Console layout */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "280px 1fr",
          gap: "40px",
          alignItems: "stretch"
        }} className="services-console">
          
          {/* Left Selector Tab Dock */}
          <div style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            background: "rgba(10, 15, 30, 0.35)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            borderRadius: "24px",
            padding: "16px",
            boxShadow: "0 15px 35px rgba(0,0,0,0.25)"
          }} className="services-tabs">
            {services.map((svc, i) => (
              <button
                key={i}
                onClick={() => setActiveService(i)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "14px",
                  padding: "14px 20px",
                  background: activeService === i ? "rgba(255, 255, 255, 0.08)" : "transparent",
                  border: "1px solid",
                  borderColor: activeService === i ? "rgba(255, 255, 255, 0.15)" : "transparent",
                  borderRadius: "9999px",
                  color: activeService === i ? "white" : "var(--text-secondary)",
                  cursor: "pointer",
                  textAlign: "left",
                  fontSize: "0.85rem",
                  fontWeight: 600,
                  transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
                  boxShadow: activeService === i ? `0 0 15px ${svc.glow}` : "none",
                  outline: "none",
                }}
                onMouseEnter={(e) => {
                  if (activeService !== i) {
                    e.currentTarget.style.background = "rgba(255, 255, 255, 0.04)";
                    e.currentTarget.style.color = "white";
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeService !== i) {
                    e.currentTarget.style.background = "transparent";
                    e.currentTarget.style.color = "var(--text-secondary)";
                  }
                }}
              >
                <div style={{
                  width: "32px", height: "32px",
                  borderRadius: "50%",
                  background: activeService === i ? svc.bg : "rgba(255,255,255,0.05)",
                  border: `1px solid ${activeService === i ? svc.border : "rgba(255,255,255,0.08)"}`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "1rem", color: activeService === i ? svc.accent : "var(--text-muted)",
                  transition: "all 0.4s ease",
                  flexShrink: 0,
                }}>
                  <i className={svc.icon}></i>
                </div>
                <span>{svc.title}</span>
              </button>
            ))}
          </div>

          {/* Right Details Panel */}
          <div className="glass-card" style={{
            padding: "48px 40px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            position: "relative",
            overflow: "hidden",
            boxShadow: "0 30px 60px rgba(0, 0, 0, 0.45)",
          }}>
            {/* Glowing Orb Accent */}
            <div style={{
              position: "absolute",
              top: "-20%",
              right: "-10%",
              width: "250px",
              height: "250px",
              background: `radial-gradient(circle, ${services[activeService].glow} 0%, transparent 70%)`,
              borderRadius: "50%",
              pointerEvents: "none",
              transition: "background 0.5s ease"
            }} />

            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "24px" }}>
                <div style={{
                  width: "56px", height: "56px",
                  borderRadius: "50%",
                  background: services[activeService].bg,
                  border: `1px solid ${services[activeService].border}`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "1.7rem", color: services[activeService].accent,
                  boxShadow: `0 0 24px ${services[activeService].glow}`,
                  flexShrink: 0,
                }}>
                  <i className={services[activeService].icon}></i>
                </div>
                <h3 style={{ fontWeight: 800, fontSize: "1.6rem", color: "var(--text-primary)", margin: 0, letterSpacing: "-0.02em" }}>
                  {services[activeService].title}
                </h3>
              </div>

              <p style={{
                fontSize: "1.05rem", color: "var(--text-secondary)",
                lineHeight: 1.75, marginBottom: "32px", maxWidth: "680px"
              }}>
                {services[activeService].desc}
              </p>

              <h4 style={{
                fontSize: "0.75rem", fontWeight: 800, textTransform: "uppercase",
                letterSpacing: "0.15em", color: services[activeService].accent,
                marginBottom: "16px"
              }}>
                What I Deliver ✦
              </h4>

              <ul style={{
                listStyle: "none",
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "16px 24px",
                padding: 0,
                margin: "0 0 40px 0"
              }} className="services-features-list">
                {services[activeService].features.map((feat, idx) => (
                  <li key={idx} style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    fontSize: "0.9rem",
                    color: "var(--text-secondary)"
                  }}>
                    <i className="ri-checkbox-circle-line" style={{ color: services[activeService].accent, fontSize: "1.1rem", flexShrink: 0 }}></i>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Bottom Status bar */}
            <div style={{
              height: "3px",
              background: `linear-gradient(90deg, ${services[activeService].accent}, transparent)`,
              borderRadius: "3px",
              width: "100%",
              boxShadow: `0 0 8px ${services[activeService].glow}`,
              transition: "all 0.5s ease"
            }} />
          </div>

        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .services-console { grid-template-columns: 1fr !important; gap: 24px !important; }
          .services-tabs { flex-direction: row !important; flex-wrap: wrap; }
          .services-tabs button { flex: 1 1 200px; justify-content: center; }
          .services-features-list { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}