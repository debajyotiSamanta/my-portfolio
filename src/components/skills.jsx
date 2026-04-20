import cpp from "../assets/c++.svg"
import c from "../assets/c-1.svg"
import css from "../assets/css-3.svg"
import figma from "../assets/figma-1.svg"
import git from "../assets/git-icon.svg"
import github from "../assets/github.png"
import html from "../assets/html-1.svg"
import java from "../assets/java.png"
import js from "../assets/logo-javascript.svg"
import nodejs from "../assets/nodejs-1.svg"
import python from "../assets/python-5.svg"
import react from "../assets/react-2.svg"
import tailwind from "../assets/Tailwind_CSS.png"
import sql from "../assets/sql.png"

export default function Skills() {
  const frontendSkills = [
    { name: "HTML5 & CSS3",    pct: 95, color: "violet" },
    { name: "React.js",         pct: 90, color: "violet" },
    { name: "JavaScript ES6+",  pct: 88, color: "violet" },
    { name: "Tailwind CSS",     pct: 85, color: "cyan"   },
    { name: "Responsive Design",pct: 92, color: "pink"   },
  ]

  const backendSkills = [
    { name: "Node.js & Express", pct: 80, color: "cyan"   },
    { name: "MongoDB",           pct: 78, color: "cyan"   },
    { name: "Python",            pct: 72, color: "pink"   },
    { name: "Git & GitHub",      pct: 90, color: "pink"   },
    { name: "REST APIs",         pct: 85, color: "violet" },
    { name: "WebRTC",            pct: 70, color: "violet" },
  ]

  const techIcons = [
    { img: html,     name: "HTML" },
    { img: css,      name: "CSS" },
    { img: js,       name: "JavaScript" },
    { img: react,    name: "React" },
    { img: tailwind, name: "Tailwind" },
    { img: nodejs,   name: "Node.js" },
    { img: python,   name: "Python" },
    { img: git,      name: "Git" },
    { img: github,   name: "GitHub" },
    { img: figma,    name: "Figma" },
    { img: sql,      name: "SQL" },
    { img: java,     name: "Java" },
    { img: c,        name: "C" },
    { img: cpp,      name: "C++" },
  ]

  const stats = [
    { value: "15+",  label: "Projects",     color: "var(--clr-primary-dim)", glow: "var(--clr-primary-glow)" },
    { value: "3+",   label: "Years Exp",    color: "var(--clr-cyan)",        glow: "var(--clr-cyan-glow)"   },
    { value: "14+",  label: "Technologies", color: "var(--clr-pink)",        glow: "var(--clr-pink-glow)"   },
    { value: "100%", label: "Dedication",   color: "var(--clr-primary-dim)", glow: "var(--clr-primary-glow)" },
  ]

  const barColor = { violet: "skill-bar-violet", cyan: "skill-bar-cyan", pink: "skill-bar-pink" }

  return (
    <section
      id="skills"
      className="dot-grid section-kv"
      style={{ background: "var(--bg-surface)" }}
    >
      {/* Orb accent */}
      <div style={{
        position: "absolute", top: "10%", right: "-5%",
        width: "400px", height: "400px",
        background: "radial-gradient(circle, rgba(76,215,246,0.08) 0%, transparent 70%)",
        borderRadius: "50%", pointerEvents: "none",
      }} />

      <div style={{ maxWidth: "1200px", margin: "0 auto", position: "relative", zIndex: 1 }}>

        {/* Section Header */}
        <div style={{ textAlign: "center", marginBottom: "56px" }}>
          <span className="section-overline">Technical Arsenal</span>
          <h2 style={{
            fontSize: "clamp(2.4rem, 5vw, 3.8rem)",
            fontWeight: 800,
            letterSpacing: "-0.04em",
            marginTop: "12px",
            marginBottom: "16px",
            color: "var(--text-primary)",
            lineHeight: 1.1,
          }}>
            Skills &{" "}
            <span className="gradient-text">Expertise</span>
          </h2>
          <p style={{ color: "var(--text-secondary)", fontSize: "1rem", maxWidth: "520px", margin: "0 auto" }}>
            Technologies and tools I use to craft world-class digital experiences
          </p>
        </div>

        {/* Stats row */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "16px",
          marginBottom: "56px",
        }} className="stats-grid">
          {stats.map((s, i) => (
            <div key={i} className="glass-card" style={{
              padding: "24px 20px",
              textAlign: "center",
              borderColor: "rgba(255,255,255,0.07)",
            }}>
              <div style={{
                fontSize: "2rem", fontWeight: 800, color: s.color,
                textShadow: `0 0 20px ${s.glow}`,
                letterSpacing: "-0.04em",
              }}>{s.value}</div>
              <div style={{ fontSize: "0.72rem", color: "var(--text-muted)", fontWeight: 600, marginTop: "4px", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>

        {/* Skill bars — 2 columns */}
        <div style={{
          display: "grid", gridTemplateColumns: "1fr 1fr", gap: "32px", marginBottom: "56px",
        }} className="skills-columns">

          {/* Frontend */}
          <div className="glass-card" style={{ padding: "32px 28px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "28px" }}>
              <div style={{
                width: "40px", height: "40px", borderRadius: "10px",
                background: "rgba(124,58,237,0.15)", border: "1px solid rgba(124,58,237,0.3)",
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "var(--clr-primary-dim)", fontSize: "1.1rem",
              }}>
                <i className="ri-braces-line"></i>
              </div>
              <h3 style={{ fontWeight: 700, fontSize: "1rem", color: "var(--text-primary)" }}>
                Frontend Development
              </h3>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              {frontendSkills.map((sk, i) => (
                <div key={i}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                    <span style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--text-secondary)" }}>{sk.name}</span>
                    <span style={{ fontSize: "0.8rem", fontWeight: 700, color: "var(--text-muted)" }}>{sk.pct}%</span>
                  </div>
                  <div className="skill-bar-track">
                    <div
                      className={`skill-bar-fill ${barColor[sk.color]}`}
                      style={{ width: `${sk.pct}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Backend */}
          <div className="glass-card" style={{ padding: "32px 28px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "28px" }}>
              <div style={{
                width: "40px", height: "40px", borderRadius: "10px",
                background: "rgba(76,215,246,0.10)", border: "1px solid rgba(76,215,246,0.25)",
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "var(--clr-cyan)", fontSize: "1.1rem",
              }}>
                <i className="ri-server-line"></i>
              </div>
              <h3 style={{ fontWeight: 700, fontSize: "1rem", color: "var(--text-primary)" }}>
                Backend & Tools
              </h3>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              {backendSkills.map((sk, i) => (
                <div key={i}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                    <span style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--text-secondary)" }}>{sk.name}</span>
                    <span style={{ fontSize: "0.8rem", fontWeight: 700, color: "var(--text-muted)" }}>{sk.pct}%</span>
                  </div>
                  <div className="skill-bar-track">
                    <div
                      className={`skill-bar-fill ${barColor[sk.color]}`}
                      style={{ width: `${sk.pct}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tech Icon Grid */}
        <div style={{ textAlign: "center", marginBottom: "24px" }}>
          <span className="section-overline">Tech Stack</span>
        </div>
        <div style={{
          display: "flex", flexWrap: "wrap", gap: "12px", justifyContent: "center",
        }}>
          {techIcons.map((t, i) => (
            <div
              key={i}
              className="animate-float"
              style={{
                display: "flex", alignItems: "center", gap: "8px",
                padding: "8px 16px",
                background: "rgba(30,36,51,0.70)",
                border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: "999px",
                backdropFilter: "blur(8px)",
                transition: "border-color 0.25s ease, box-shadow 0.25s ease",
                cursor: "default",
                animationDelay: `${i * 0.15}s`, // Dynamic stagger delay
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(124,58,237,0.40)";
                e.currentTarget.style.boxShadow = "0 0 16px rgba(124,58,237,0.20)";
                e.currentTarget.style.animationPlayState = "paused";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)";
                e.currentTarget.style.boxShadow = "none";
                e.currentTarget.style.animationPlayState = "running";
              }}
            >
              <img src={t.img} alt={t.name} style={{ width: "20px", height: "20px", objectFit: "contain" }} />
              <span style={{ fontSize: "0.8rem", fontWeight: 600, color: "var(--text-secondary)" }}>{t.name}</span>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .skills-columns { grid-template-columns: 1fr !important; }
          .stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </section>
  )
}