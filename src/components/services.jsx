import { useState } from "react";
import { usePortfolio } from "../context/PortfolioContext";

export default function Services() {
  const { portfolioData } = usePortfolio();
  const services = portfolioData?.services || [];
  const [activeModal, setActiveModal] = useState(null);

  const svc = services.find((s) => s.id === activeModal);

  return (
    <section
      id="services"
      className="dot-grid section-kv"
      style={{
        background: "var(--bg-surface)",
        position: "relative",
        overflow: "hidden",
        padding: "100px 20px",
      }}
    >
      {/* Background orbs */}
      <div style={{
        position: "absolute", top: "10%", left: "-8%",
        width: "500px", height: "500px",
        background: "radial-gradient(circle, rgba(124,58,237,0.08) 0%, transparent 65%)",
        borderRadius: "50%", pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", bottom: "10%", right: "-8%",
        width: "500px", height: "500px",
        background: "radial-gradient(circle, rgba(6,182,212,0.07) 0%, transparent 65%)",
        borderRadius: "50%", pointerEvents: "none",
      }} />

      <div style={{ maxWidth: "1140px", margin: "0 auto", position: "relative", zIndex: 1 }}>

        {/* Section Header */}
        <div style={{ textAlign: "center", marginBottom: "64px" }}>
          <span className="section-overline">What I Offer</span>
          <h2 className="section-title">
            Specialized Services
          </h2>
          <p className="section-subtitle">
            Crafting tailored web solutions, modern design systems, and robust software architectures
          </p>
        </div>

        {/* Services Grid */}
        <div
          className="services-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "28px",
          }}
        >
          {services.map((s, idx) => (
            <div
              key={s.id || idx}
              className="glass-card"
              style={{
                padding: "36px 32px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                borderRadius: "24px",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Corner accent glow */}
              <div style={{
                position: "absolute", top: "-30px", right: "-30px",
                width: "120px", height: "120px",
                background: s.glow || "rgba(124,58,237,0.2)",
                borderRadius: "50%", filter: "blur(40px)",
                pointerEvents: "none",
              }} />

              <div>
                {/* Icon + Chip */}
                <div style={{
                  display: "flex", justifyContent: "space-between",
                  alignItems: "center", marginBottom: "26px",
                }}>
                  <div style={{
                    width: "54px", height: "54px", borderRadius: "16px",
                    background: s.bg || "rgba(124,58,237,0.08)",
                    border: `1px solid ${s.border || "rgba(124,58,237,0.22)"}`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: s.accent || "var(--clr-primary-dim)", fontSize: "1.45rem",
                    boxShadow: `0 0 24px ${s.glow || "rgba(124,58,237,0.2)"}`,
                  }}>
                    <i className={s.icon || "ri-code-line"} />
                  </div>
                  <span className={s.chip || "chip-violet"} style={{ fontSize: "0.70rem", padding: "4px 12px", borderRadius: "999px" }}>
                    {s.tagline}
                  </span>
                </div>

                {/* Title */}
                <h3 style={{
                  fontSize: "1.25rem", fontWeight: 700,
                  color: "var(--text-primary)", fontFamily: "var(--font-display)",
                  marginBottom: "12px",
                }}>
                  {s.title}
                </h3>

                {/* Description */}
                <p style={{
                  fontSize: "0.90rem", color: "var(--text-secondary)",
                  lineHeight: 1.65, marginBottom: "24px",
                }}>
                  {s.desc}
                </p>

                {/* Features list */}
                <ul style={{ listStyle: "none", padding: 0, margin: "0 0 28px 0", display: "flex", flexDirection: "column", gap: "9px" }}>
                  {s.features?.slice(0, 3).map((f, i) => (
                    <li key={i} style={{
                      display: "flex", alignItems: "center", gap: "10px",
                      fontSize: "0.82rem", color: "var(--text-secondary)",
                    }}>
                      <i className="ri-check-line" style={{ color: s.accent || "var(--clr-primary-dim)", fontSize: "0.95rem" }} />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action */}
              <button
                onClick={() => setActiveModal(s.id)}
                style={{
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  fontSize: "0.85rem",
                  fontWeight: 600,
                  color: s.accent || "var(--clr-primary-dim)",
                  padding: 0,
                  fontFamily: "var(--font-body)",
                }}
              >
                <span>View Full Scope</span>
                <i className="ri-arrow-right-line" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* ── Details Modal ── */}
      {svc && (
        <div
          style={{
            position: "fixed", inset: 0,
            background: "rgba(3, 4, 12, 0.85)",
            backdropFilter: "blur(24px)",
            zIndex: 10005,
            display: "flex", alignItems: "center", justifyContent: "center",
            padding: "20px",
          }}
          onClick={() => setActiveModal(null)}
        >
          <div
            style={{
              background: "var(--bg-card)",
              border: `1px solid ${svc.border || "var(--border-subtle)"}`,
              borderRadius: "28px",
              padding: "40px",
              maxWidth: "600px",
              width: "100%",
              maxHeight: "90vh",
              overflowY: "auto",
              boxShadow: `0 30px 80px rgba(0,0,0,0.8), 0 0 50px ${svc.glow || "rgba(124,58,237,0.2)"}`,
              position: "relative",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setActiveModal(null)}
              style={{
                position: "absolute", top: "20px", right: "20px",
                width: "36px", height: "36px", borderRadius: "50%",
                background: "rgba(255,255,255,0.06)",
                border: "1px solid var(--border-ghost)",
                color: "var(--text-secondary)",
                cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "1.2rem",
              }}
            >
              <i className="ri-close-line" />
            </button>

            {/* Icon + Title */}
            <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "20px" }}>
              <div style={{
                width: "56px", height: "56px", borderRadius: "16px",
                background: svc.bg || "rgba(124,58,237,0.1)",
                border: `1px solid ${svc.border || "rgba(124,58,237,0.25)"}`,
                display: "flex", alignItems: "center", justifyContent: "center",
                color: svc.accent || "var(--clr-primary-dim)", fontSize: "1.6rem",
              }}>
                <i className={svc.icon || "ri-code-line"} />
              </div>
              <div>
                <h3 style={{ fontSize: "1.35rem", fontWeight: 700, margin: 0, fontFamily: "var(--font-display)" }}>
                  {svc.title}
                </h3>
                <span style={{ fontSize: "0.78rem", color: svc.accent || "var(--clr-cyan-bright)", fontFamily: "var(--font-mono)" }}>
                  {svc.tagline}
                </span>
              </div>
            </div>

            <p style={{ fontSize: "0.92rem", color: "var(--text-secondary)", lineHeight: 1.7, marginBottom: "24px" }}>
              {svc.desc}
            </p>

            <div style={{ marginBottom: "12px" }}>
              <span style={{
                fontSize: "0.70rem", fontWeight: 700,
                textTransform: "uppercase", letterSpacing: "0.15em",
                color: svc.accent || "var(--clr-primary-dim)", fontFamily: "var(--font-mono)",
              }}>
                What I Deliver
              </span>
            </div>

            <ul style={{ listStyle: "none", padding: 0, margin: "0 0 28px 0", display: "flex", flexDirection: "column", gap: "12px" }}>
              {svc.features?.map((f, i) => (
                <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: "10px", fontSize: "0.88rem", color: "var(--text-secondary)" }}>
                  <i className="ri-checkbox-circle-fill" style={{ color: svc.accent || "var(--clr-primary-dim)", fontSize: "1.1rem", marginTop: "1px", flexShrink: 0 }} />
                  <span>{f}</span>
                </li>
              ))}
            </ul>

            <a
              href="#contact"
              onClick={() => setActiveModal(null)}
              className="btn-primary"
              style={{ width: "100%", justifyContent: "center", padding: "12px" }}
            >
              Discuss a Project <i className="ri-arrow-right-line" />
            </a>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 820px) {
          .services-grid {
            grid-template-columns: 1fr !important;
            gap: 20px !important;
          }
        }
      `}</style>
    </section>
  );
}