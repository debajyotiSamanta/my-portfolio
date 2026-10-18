import { useEffect, useRef } from "react";
import { usePortfolio } from "../context/PortfolioContext";

function SkillBar({ name, level, color }) {
  const fillRef = useRef(null);

  useEffect(() => {
    const el = fillRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        el.style.width = `${level}%`;
        obs.disconnect();
      }
    }, { threshold: 0.2 });
    el.style.width = "0%";
    obs.observe(el);
    return () => obs.disconnect();
  }, [level]);

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px", alignItems: "center" }}>
        <span style={{ fontSize: "0.86rem", fontWeight: 600, color: "var(--text-secondary)", fontFamily: "var(--font-body)" }}>
          {name}
        </span>
        <span style={{
          fontSize: "0.72rem", fontWeight: 700, color: "var(--text-muted)",
          fontFamily: "var(--font-mono)",
        }}>
          {level}%
        </span>
      </div>
      <div style={{
        height: "5px", width: "100%",
        backgroundColor: "rgba(255,255,255,0.06)",
        borderRadius: "999px", overflow: "hidden",
      }}>
        <div
          ref={fillRef}
          style={{
            height: "100%", borderRadius: "999px",
            background: color || "var(--clr-primary-dim)",
            transition: "width 1.2s cubic-bezier(0.16, 1, 0.3, 1)",
            width: "0%",
          }}
        />
      </div>
    </div>
  );
}

export default function Skills() {
  const { portfolioData, resolveImage } = usePortfolio();
  const categories = portfolioData?.skillsCategories || [];
  const frameworksAndTools = portfolioData?.frameworksAndTools || [];

  return (
    <section
      id="skills"
      className="dot-grid section-kv"
      style={{
        background: "var(--bg-base)",
        position: "relative",
        overflow: "hidden",
        padding: "100px 20px",
      }}
    >
      {/* Background orbs */}
      <div style={{
        position: "absolute", top: "20%", left: "-6%",
        width: "480px", height: "480px",
        background: "radial-gradient(circle, rgba(124,58,237,0.09) 0%, transparent 65%)",
        borderRadius: "50%", pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", bottom: "10%", right: "-6%",
        width: "450px", height: "450px",
        background: "radial-gradient(circle, rgba(6,182,212,0.08) 0%, transparent 65%)",
        borderRadius: "50%", pointerEvents: "none",
      }} />

      <div style={{ maxWidth: "1140px", margin: "0 auto", position: "relative", zIndex: 1 }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "60px" }}>
          <span className="section-overline">Core Capabilities</span>
          <h2 className="section-title">
            Technical Proficiency
          </h2>
          <p className="section-subtitle">
            A specialized toolkit spanning modern frontend architectures, backend APIs, and UI/UX design
          </p>
        </div>

        {/* Skills Cards Grid */}
        <div
          className="skills-columns"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "24px",
            marginBottom: "64px",
          }}
        >
          {categories.map((cat, i) => (
            <div
              key={cat.id || i}
              className="glass-card"
              style={{
                padding: "32px 26px",
                display: "flex",
                flexDirection: "column",
                borderRadius: "24px",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "26px" }}>
                <div style={{
                  width: "42px", height: "42px", borderRadius: "12px",
                  background: cat.bg || "rgba(124,58,237,0.10)",
                  border: `1px solid ${cat.border || "rgba(124,58,237,0.22)"}`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: cat.color || "var(--clr-primary-dim)", fontSize: "1.15rem",
                  boxShadow: `0 0 18px ${cat.glow || "rgba(124,58,237,0.2)"}`,
                  flexShrink: 0,
                }}>
                  <i className={cat.icon || "ri-code-box-line"} />
                </div>
                <div>
                  <h3 style={{
                    fontWeight: 700, fontSize: "1.05rem",
                    color: "var(--text-primary)", fontFamily: "var(--font-display)",
                    margin: 0,
                  }}>
                    {cat.label}
                  </h3>
                  <span style={{ fontSize: "0.72rem", color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>
                    {cat.skills?.length || 0} Specializations
                  </span>
                </div>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
                {cat.skills?.map((sk, skIdx) => (
                  <SkillBar
                    key={skIdx}
                    name={sk.name}
                    level={sk.level}
                    color={cat.color || "var(--clr-primary-dim)"}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Tech Icon Grid (Dynamic Frameworks & Tools) */}
        <div style={{ textAlign: "center", marginBottom: "24px" }}>
          <span className="section-overline">Frameworks & Tools</span>
        </div>
        <div style={{
          display: "flex", flexWrap: "wrap",
          gap: "10px", justifyContent: "center",
          maxWidth: "900px", margin: "0 auto",
        }}>
          {frameworksAndTools.map((t, i) => {
            const iconImg = resolveImage(t.imgKey, t.img);
            const hue = t.hue || "#06b6d4";

            return (
              <div
                key={t.id || i}
                className="tech-badge animate-float"
                style={{ animationDelay: `${(i % 5) * 0.15}s`, cursor: "default" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = hue + "55";
                  e.currentTarget.style.background  = hue + "12";
                  e.currentTarget.style.color = "white";
                  e.currentTarget.style.boxShadow   = `0 8px 24px rgba(0,0,0,0.35), 0 0 16px ${hue}33`;
                  e.currentTarget.style.transform    = "scale(1.08) translateY(-3px)";
                  e.currentTarget.style.animationPlayState = "paused";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "var(--border-ghost)";
                  e.currentTarget.style.background  = "rgba(255,255,255,0.04)";
                  e.currentTarget.style.color = "var(--text-secondary)";
                  e.currentTarget.style.boxShadow   = "none";
                  e.currentTarget.style.transform    = "scale(1) translateY(0)";
                  e.currentTarget.style.animationPlayState = "running";
                }}
              >
                {iconImg ? (
                  <img
                    src={iconImg}
                    alt={t.name}
                    style={{ width: "17px", height: "17px", objectFit: "contain" }}
                  />
                ) : (
                  <i className={t.icon || "ri-code-line"} style={{ color: hue, fontSize: "1rem" }} />
                )}
                <span>{t.name}</span>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .skills-columns { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}