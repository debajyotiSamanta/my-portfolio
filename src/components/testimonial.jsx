import { usePortfolio } from "../context/PortfolioContext";

export default function Testimonial() {
  const { portfolioData } = usePortfolio();
  const testimonials = portfolioData?.testimonials || [];

  return (
    <section
      id="testimonials"
      className="dot-grid section-kv"
      style={{ background: "var(--bg-container)", position: "relative", overflow: "hidden", padding: "100px 20px" }}
    >
      <div style={{
        position: "absolute", top: "5%", left: "-6%",
        width: "450px", height: "450px",
        background: "radial-gradient(circle, rgba(124,58,237,0.06) 0%, transparent 70%)",
        borderRadius: "50%", pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", bottom: "5%", right: "-6%",
        width: "350px", height: "350px",
        background: "radial-gradient(circle, rgba(6,182,212,0.05) 0%, transparent 70%)",
        borderRadius: "50%", pointerEvents: "none",
      }} />

      <div style={{ maxWidth: "1140px", margin: "0 auto", position: "relative", zIndex: 1 }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "64px" }}>
          <span className="section-overline">Peer Endorsements</span>
          <h2 className="section-title">
            What People Say
          </h2>
          <p className="section-subtitle">
            Feedback from team collaborators, campus peers, and project partners
          </p>
        </div>

        {/* Testimonials Grid */}
        <div
          className="testimonial-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "24px",
          }}
        >
          {testimonials.map((t, i) => (
            <div
              key={t.id || i}
              className="glass-card"
              style={{
                padding: "32px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                borderRadius: "22px",
                position: "relative",
              }}
            >
              {/* Quote marks */}
              <div style={{
                position: "absolute", top: "20px", right: "24px",
                color: t.accent || "var(--clr-primary-dim)", opacity: 0.18,
                fontSize: "3rem", fontFamily: "Georgia, serif", lineHeight: 1,
                pointerEvents: "none",
              }}>
                "
              </div>

              {/* Star Rating */}
              <div style={{ display: "flex", gap: "4px", marginBottom: "16px" }}>
                {[...Array(t.rating || 5)].map((_, s) => (
                  <i
                    key={s}
                    className="ri-star-fill"
                    style={{ color: "#f59e0b", fontSize: "0.95rem" }}
                  />
                ))}
              </div>

              {/* Quote Text */}
              <p style={{
                fontSize: "0.92rem", color: "var(--text-secondary)",
                lineHeight: 1.7, margin: "0 0 24px 0",
                fontStyle: "italic",
              }}>
                "{t.quote}"
              </p>

              {/* Author */}
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <div style={{
                  width: "42px", height: "42px", borderRadius: "50%",
                  background: t.bg || "rgba(124,58,237,0.12)",
                  border: `1px solid ${t.border || "rgba(124,58,237,0.3)"}`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: t.accent || "var(--clr-primary-dim)", fontWeight: 700,
                  fontSize: "0.85rem", flexShrink: 0,
                  fontFamily: "var(--font-mono)",
                }}>
                  {t.avatar}
                </div>
                <div>
                  <h4 style={{
                    fontSize: "0.95rem", fontWeight: 700,
                    color: "var(--text-primary)", fontFamily: "var(--font-display)",
                    margin: 0,
                  }}>
                    {t.name}
                  </h4>
                  <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>
                    {t.role}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .testimonial-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
