export default function Qualification() {
  const qualifications = {
    education: [
      {
        title: "B-Tech (Information Technology)",
        institution: "Meghnad Saha Institute of Technology",
        period: "2023 – 2027",
        score: "Pursuing",
        icon: "ri-graduation-cap-line",
        accent: "var(--clr-primary-dim)",
        glow: "rgba(124,58,237,0.25)",
        bg: "rgba(124,58,237,0.08)",
      },
      {
        title: "Higher Secondary Education",
        institution: "Raghunath Bari Ramtarak High School",
        period: "2020 – 2022",
        score: "83.8%",
        icon: "ri-book-open-line",
        accent: "var(--clr-cyan)",
        glow: "rgba(76,215,246,0.20)",
        bg: "rgba(76,215,246,0.06)",
      },
      {
        title: "Secondary Education",
        institution: "Kaminachak Sasibhusan Kanailal Vidyayatan",
        period: "2018 – 2020",
        score: "85%",
        icon: "ri-pencil-ruler-2-line",
        accent: "var(--clr-pink)",
        glow: "rgba(255,176,205,0.20)",
        bg: "rgba(255,176,205,0.06)",
      },
    ],
    experience: [
      {
        title: "Frontend Developer",
        institution: "Hackerspace — MSIT Official Coding Club",
        period: "Current",
        description: "Building responsive web interfaces and mentoring juniors in modern frontend practices.",
        icon: "ri-code-line",
        accent: "var(--clr-primary-dim)",
        glow: "rgba(124,58,237,0.25)",
        bg: "rgba(124,58,237,0.08)",
      },
      {
        title: "CDP Lead",
        institution: "Hackerspace — MSIT Official Coding Club",
        period: "Current",
        description: "Leading coding development program initiatives and workshops for community growth.",
        icon: "ri-team-line",
        accent: "var(--clr-cyan)",
        glow: "rgba(76,215,246,0.20)",
        bg: "rgba(76,215,246,0.06)",
      },
      {
        title: "Frontend Developer Intern",
        institution: "CodeAlpha & CodeClause",
        period: "2024",
        description: "Worked on real-world production projects under mentorship, delivering polished UIs.",
        icon: "ri-briefcase-line",
        accent: "var(--clr-pink)",
        glow: "rgba(255,176,205,0.20)",
        bg: "rgba(255,176,205,0.06)",
      },
    ],
  }

  const TimelineColumn = ({ items, lineColor }) => (
    <div style={{ position: "relative" }}>
      {/* Vertical line */}
      <div style={{
        position: "absolute",
        left: "19px",
        top: "28px",
        bottom: "28px",
        width: "2px",
        background: `linear-gradient(to bottom, ${lineColor}, transparent)`,
        borderRadius: "2px",
      }} />

      <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
        {items.map((item, i) => (
          <div key={i} style={{ display: "flex", gap: "20px", alignItems: "flex-start" }}>
            {/* Timeline dot / icon */}
            <div style={{
              width: "40px", height: "40px",
              borderRadius: "50%",
              background: item.bg,
              border: `2px solid ${item.glow}`,
              display: "flex", alignItems: "center", justifyContent: "center",
              color: item.accent, fontSize: "1rem",
              flexShrink: 0,
              boxShadow: `0 0 16px ${item.glow}`,
              zIndex: 1,
            }}>
              <i className={item.icon}></i>
            </div>

            {/* Card */}
            <div
              className="glass-card"
              style={{ flex: 1, padding: "20px 22px" }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "6px", gap: "12px", flexWrap: "wrap" }}>
                <h4 style={{ fontWeight: 700, fontSize: "0.95rem", color: "var(--text-primary)", margin: 0 }}>
                  {item.title}
                </h4>
                <span style={{
                  fontSize: "0.7rem", fontWeight: 700,
                  color: item.accent,
                  background: item.bg,
                  border: `1px solid ${item.glow}`,
                  borderRadius: "999px",
                  padding: "2px 10px",
                  whiteSpace: "nowrap",
                  letterSpacing: "0.03em",
                }}>
                  {item.score || item.period}
                </span>
              </div>
              <p style={{ fontSize: "0.82rem", color: "var(--text-muted)", marginBottom: item.description ? "8px" : 0, fontWeight: 500 }}>
                {item.institution}
              </p>
              {item.description && (
                <p style={{ fontSize: "0.8rem", color: "var(--text-secondary)", lineHeight: 1.6, fontStyle: "italic" }}>
                  {item.description}
                </p>
              )}
              {item.score && (
                <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "6px", letterSpacing: "0.08em", textTransform: "uppercase", fontWeight: 600 }}>
                  {item.period}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  return (
    <section
      id="qualification"
      className="dot-grid section-kv"
      style={{ background: "var(--bg-base)" }}
    >
      <div style={{
        position: "absolute", bottom: "5%", left: "-5%",
        width: "350px", height: "350px",
        background: "radial-gradient(circle, rgba(124,58,237,0.08) 0%, transparent 70%)",
        borderRadius: "50%", pointerEvents: "none",
      }} />

      <div style={{ maxWidth: "1200px", margin: "0 auto", position: "relative", zIndex: 1 }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "56px" }}>
          <span className="section-overline">Background</span>
          <h2 style={{
            fontSize: "clamp(2.4rem, 5vw, 3.8rem)",
            fontWeight: 800, letterSpacing: "-0.04em",
            color: "var(--text-primary)", marginTop: "12px", marginBottom: "16px", lineHeight: 1.1,
          }}>
            My <span className="gradient-text-violet">Journey</span>
          </h2>
          <p style={{ color: "var(--text-secondary)", fontSize: "1rem", maxWidth: "480px", margin: "0 auto" }}>
            Education and professional experience that shaped my craft
          </p>
        </div>

        {/* 2-column grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "48px" }} className="qual-grid">
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "28px" }}>
              <div style={{
                width: "36px", height: "36px", borderRadius: "9px",
                background: "rgba(124,58,237,0.12)", border: "1px solid rgba(124,58,237,0.25)",
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "var(--clr-primary-dim)", fontSize: "1rem",
              }}><i className="ri-book-open-line"></i></div>
              <h3 style={{ fontWeight: 700, fontSize: "1.05rem", color: "var(--text-primary)" }}>Education</h3>
            </div>
            <TimelineColumn items={qualifications.education} lineColor="rgba(124,58,237,0.5)" />
          </div>

          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "28px" }}>
              <div style={{
                width: "36px", height: "36px", borderRadius: "9px",
                background: "rgba(76,215,246,0.10)", border: "1px solid rgba(76,215,246,0.25)",
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "var(--clr-cyan)", fontSize: "1rem",
              }}><i className="ri-briefcase-line"></i></div>
              <h3 style={{ fontWeight: 700, fontSize: "1.05rem", color: "var(--text-primary)" }}>Experience</h3>
            </div>
            <TimelineColumn items={qualifications.experience} lineColor="rgba(76,215,246,0.5)" />
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .qual-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
        }
      `}</style>
    </section>
  )
}
