import { usePortfolio } from "../context/PortfolioContext";

export default function Qualification() {
  const { portfolioData } = usePortfolio();
  const education  = portfolioData?.education || [];
  const experience = portfolioData?.experience || [];

  const TimelineItem = ({ item, isLast }) => (
    <div style={{ display: "flex", gap: "16px", alignItems: "flex-start", position: "relative" }}>
      {/* Icon + line */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
        <div style={{
          width: "42px", height: "42px", borderRadius: "12px",
          background: item.bg || "rgba(124,58,237,0.08)",
          border: `1px solid ${item.border || "rgba(124,58,237,0.22)"}`,
          display: "flex", alignItems: "center", justifyContent: "center",
          color: item.accent || "var(--clr-primary-dim)", fontSize: "1.05rem",
          boxShadow: `0 0 18px ${item.glow || "rgba(124,58,237,0.25)"}`,
          zIndex: 1, flexShrink: 0,
        }}>
          <i className={item.icon || "ri-briefcase-line"} />
        </div>
        {!isLast && (
          <div style={{
            width: "2px", flex: 1, minHeight: "28px",
            background: `linear-gradient(to bottom, ${item.border || "rgba(255,255,255,0.15)"}, transparent)`,
            borderRadius: "2px", marginTop: "4px",
          }} />
        )}
      </div>

      {/* Content Card */}
      <div style={{
        flex: 1,
        paddingBottom: isLast ? "0" : "28px",
      }}>
        <div
          className="glass-card"
          style={{
            padding: "20px 22px",
            borderRadius: "18px",
            transition: "all 0.3s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = item.border || "rgba(255,255,255,0.2)";
            e.currentTarget.style.boxShadow = `0 12px 32px rgba(0,0,0,0.4), 0 0 20px ${item.glow || "rgba(124,58,237,0.15)"}`;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "var(--border-ghost)";
            e.currentTarget.style.boxShadow = "var(--shadow-xs)";
          }}
        >
          {/* Top row */}
          <div style={{
            display: "flex", justifyContent: "space-between",
            alignItems: "flex-start", flexWrap: "wrap", gap: "8px",
            marginBottom: "8px",
          }}>
            <h4 style={{
              fontSize: "0.98rem", fontWeight: 700,
              color: "var(--text-primary)", fontFamily: "var(--font-display)",
              margin: 0,
            }}>
              {item.title}
            </h4>
            <span className={item.chip || "chip-violet"} style={{ fontSize: "0.68rem", padding: "3px 10px", borderRadius: "999px" }}>
              {item.period}
            </span>
          </div>

          {/* Institution */}
          <div style={{
            display: "flex", alignItems: "center", gap: "6px",
            color: item.accent || "var(--clr-cyan-bright)", fontSize: "0.82rem",
            fontWeight: 500, marginBottom: item.description ? "10px" : "8px",
          }}>
            <i className="ri-building-line" style={{ fontSize: "0.85rem", opacity: 0.8 }} />
            <span>{item.institution}</span>
          </div>

          {/* Description or Score */}
          {item.description && (
            <p style={{
              fontSize: "0.83rem", color: "var(--text-secondary)",
              lineHeight: 1.6, margin: 0,
            }}>
              {item.description}
            </p>
          )}

          {item.score && (
            <div style={{
              display: "inline-flex", alignItems: "center", gap: "6px",
              padding: "4px 12px", borderRadius: "8px",
              background: "rgba(255,255,255,0.04)", border: "1px solid var(--border-ghost)",
              fontSize: "0.75rem", color: "var(--text-muted)",
              fontFamily: "var(--font-mono)", marginTop: "4px",
            }}>
              <i className="ri-award-line" style={{ color: item.accent }} />
              <span>Score: <strong style={{ color: "white" }}>{item.score}</strong></span>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <section
      id="qualification"
      className="dot-grid section-kv"
      style={{ background: "var(--bg-void)", position: "relative", overflow: "hidden", padding: "100px 20px" }}
    >
      {/* Background orbs */}
      <div style={{
        position: "absolute", top: "15%", right: "-8%",
        width: "500px", height: "500px",
        background: "radial-gradient(circle, rgba(124,58,237,0.08) 0%, transparent 65%)",
        borderRadius: "50%", pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", bottom: "10%", left: "-8%",
        width: "450px", height: "450px",
        background: "radial-gradient(circle, rgba(6,182,212,0.07) 0%, transparent 65%)",
        borderRadius: "50%", pointerEvents: "none",
      }} />

      <div style={{ maxWidth: "1140px", margin: "0 auto", position: "relative", zIndex: 1 }}>

        {/* Section Header */}
        <div style={{ textAlign: "center", marginBottom: "64px" }}>
          <span className="section-overline">Track Record</span>
          <h2 className="section-title">
            Journey & Experience
          </h2>
          <p className="section-subtitle">
            My educational background and leadership in student software development
          </p>
        </div>

        {/* Two Columns Grid */}
        <div
          className="journey-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "48px",
            alignItems: "start",
          }}
        >
          {/* ── Education Column ── */}
          <div>
            <div style={{
              display: "flex", alignItems: "center", gap: "12px",
              marginBottom: "32px", paddingBottom: "16px",
              borderBottom: "1px solid var(--border-ghost)",
            }}>
              <div style={{
                width: "40px", height: "40px", borderRadius: "10px",
                background: "rgba(124,58,237,0.12)",
                border: "1px solid rgba(124,58,237,0.25)",
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "var(--clr-primary-dim)", fontSize: "1.1rem",
              }}>
                <i className="ri-graduation-cap-line" />
              </div>
              <div>
                <h3 style={{
                  fontWeight: 700, fontSize: "1.15rem",
                  color: "var(--text-primary)", fontFamily: "var(--font-display)",
                  margin: 0,
                }}>
                  Education
                </h3>
                <span style={{ fontSize: "0.72rem", color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>
                  Academic Foundation
                </span>
              </div>
            </div>

            <div>
              {education.map((item, idx) => (
                <TimelineItem
                  key={item.id || idx}
                  item={item}
                  isLast={idx === education.length - 1}
                />
              ))}
            </div>
          </div>

          {/* ── Experience Column ── */}
          <div>
            <div style={{
              display: "flex", alignItems: "center", gap: "12px",
              marginBottom: "32px", paddingBottom: "16px",
              borderBottom: "1px solid var(--border-ghost)",
            }}>
              <div style={{
                width: "40px", height: "40px", borderRadius: "10px",
                background: "rgba(6,182,212,0.12)",
                border: "1px solid rgba(6,182,212,0.25)",
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "var(--clr-cyan-bright)", fontSize: "1.1rem",
              }}>
                <i className="ri-briefcase-line" />
              </div>
              <div>
                <h3 style={{
                  fontWeight: 700, fontSize: "1.15rem",
                  color: "var(--text-primary)", fontFamily: "var(--font-display)",
                  margin: 0,
                }}>
                  Leadership & Experience
                </h3>
                <span style={{ fontSize: "0.72rem", color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>
                  Engineering Leadership
                </span>
              </div>
            </div>

            <div>
              {experience.map((item, idx) => (
                <TimelineItem
                  key={item.id || idx}
                  item={item}
                  isLast={idx === experience.length - 1}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .journey-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
        }
      `}</style>
    </section>
  );
}
