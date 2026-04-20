export default function Testimonial() {
  const testimonials = [
    {
      quote: "Debajyoti's attention to detail and modern design approach transformed our vision into reality. Highly professional and excellent communication throughout the project.",
      name: "Sarah Johnson",
      subtitle: "Startup Founder",
      avatar: "SJ",
      rating: 5,
      accent: "var(--clr-primary-dim)",
      glow: "rgba(124,58,237,0.20)",
      bg: "rgba(124,58,237,0.08)",
    },
    {
      quote: "I believe in building secure, scalable applications that protect user data. Authentication and security are crucial for earning trust and delivering great experiences.",
      name: "Debajyoti Samanta",
      subtitle: "Full Stack Developer",
      avatar: "DS",
      rating: 5,
      accent: "var(--clr-cyan)",
      glow: "rgba(76,215,246,0.16)",
      bg: "rgba(76,215,246,0.06)",
    },
  ];

  return (
    <section
      className="dot-grid section-kv"
      style={{ background: "var(--bg-container)" }}
    >
      <div style={{
        position: "absolute", top: "10%", left: "-5%",
        width: "400px", height: "400px",
        background: "radial-gradient(circle, rgba(124,58,237,0.07) 0%, transparent 70%)",
        borderRadius: "50%", pointerEvents: "none",
      }} />

      <div style={{ maxWidth: "900px", margin: "0 auto", position: "relative", zIndex: 1 }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "56px" }}>
          <span className="section-overline">Testimonials</span>
          <h2 style={{
            fontSize: "clamp(2rem, 4vw, 3.2rem)",
            fontWeight: 800, letterSpacing: "-0.04em",
            color: "var(--text-primary)", marginTop: "12px", marginBottom: "16px",
          }}>
            Words of{" "}
            <span className="gradient-text-violet">Trust</span>
          </h2>
          <p style={{ color: "var(--text-secondary)", fontSize: "1rem" }}>
            Feedback from clients and collaborators
          </p>
        </div>

        {/* Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }} className="testimonial-grid">
          {testimonials.map((t, i) => (
            <div key={i} className="glass-card" style={{ padding: "32px 28px" }}>
              {/* Stars */}
              <div style={{ display: "flex", gap: "4px", marginBottom: "20px" }}>
                {[...Array(t.rating)].map((_, j) => (
                  <i key={j} className="ri-star-fill" style={{ color: "#fbbf24", fontSize: "0.9rem" }}></i>
                ))}
              </div>

              {/* Quote */}
              <p style={{
                fontSize: "0.9rem", color: "var(--text-secondary)",
                lineHeight: 1.75, fontStyle: "italic", marginBottom: "28px",
              }}>
                "{t.quote}"
              </p>

              {/* Author */}
              <div style={{ display: "flex", alignItems: "center", gap: "12px", paddingTop: "20px", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                <div style={{
                  width: "44px", height: "44px", borderRadius: "50%",
                  background: t.bg,
                  border: `2px solid ${t.glow}`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: t.accent, fontWeight: 800, fontSize: "0.85rem",
                  boxShadow: `0 0 12px ${t.glow}`,
                  flexShrink: 0,
                }}>
                  {t.avatar}
                </div>
                <div>
                  <p style={{ fontWeight: 700, fontSize: "0.9rem", color: "var(--text-primary)" }}>{t.name}</p>
                  <p style={{ fontSize: "0.78rem", color: t.accent, fontWeight: 600 }}>{t.subtitle}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .testimonial-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
