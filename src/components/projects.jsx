import { useState, useRef } from "react";
import { usePortfolio } from "../context/PortfolioContext";

export default function Projects() {
  const { portfolioData, resolveImage } = usePortfolio();
  const allProjects = portfolioData?.projects || [];
  const categories  = portfolioData?.projectsCategories || ["All", "Full-Stack", "Game", "Web", "React"];

  const [activeCat, setActiveCat] = useState("All");
  const [activeIdx, setActiveIdx] = useState(0);
  const [fading, setFading]       = useState(false);
  const dockRef = useRef(null);

  const filtered = activeCat === "All"
    ? allProjects
    : allProjects.filter((p) => p.tag === activeCat);

  const activeProject = filtered[activeIdx] || filtered[0] || {
    title: "Project Showcase",
    subtitle: "Web Application",
    tag: "Web",
    desc: "Explore my interactive development portfolio.",
    tech: ["React", "JavaScript"],
    link: "#",
    accentColor: "#22d3ee",
  };

  const selectCat = (cat) => {
    setActiveCat(cat);
    setActiveIdx(0);
  };

  const selectIdx = (idx) => {
    if (idx === activeIdx) return;
    setFading(true);
    setTimeout(() => {
      setActiveIdx(idx);
      setFading(false);
    }, 180);
  };

  const handlePrev = () => {
    const next = (activeIdx - 1 + filtered.length) % filtered.length;
    selectIdx(next);
  };

  const handleNext = () => {
    const next = (activeIdx + 1) % filtered.length;
    selectIdx(next);
  };

  const activeImgSrc = resolveImage(activeProject.imgKey, activeProject.img, activeProject);

  return (
    <section
      id="projects"
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
        position: "absolute", top: "15%", left: "-8%",
        width: "550px", height: "550px",
        background: "radial-gradient(circle, rgba(124,58,237,0.08) 0%, transparent 65%)",
        borderRadius: "50%", pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", bottom: "15%", right: "-8%",
        width: "550px", height: "550px",
        background: "radial-gradient(circle, rgba(6,182,212,0.07) 0%, transparent 65%)",
        borderRadius: "50%", pointerEvents: "none",
      }} />

      <div style={{ maxWidth: "1140px", margin: "0 auto", position: "relative", zIndex: 1 }}>

        {/* Section Header */}
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <span className="section-overline">Portfolio Works</span>
          <h2 className="section-title">
            Featured Projects
          </h2>
          <p className="section-subtitle">
            An interactive gallery of my full-stack web applications, architectures, and games
          </p>
        </div>

        {/* Category Filter Pills (Responsive wrapping) */}
        <div style={{
          display: "flex", justifyContent: "center",
          flexWrap: "wrap",
          gap: "8px", marginBottom: "40px",
          background: "rgba(7, 10, 22, 0.45)",
          backdropFilter: "blur(24px)",
          border: "1px solid var(--border-ghost)",
          borderRadius: "999px", padding: "6px",
          width: "fit-content", margin: "0 auto 44px auto",
          boxShadow: "var(--shadow-sm)",
          maxWidth: "100%",
        }}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => selectCat(cat)}
              style={{
                padding: "8px 18px",
                background: activeCat === cat
                  ? "rgba(124,58,237,0.22)"
                  : "transparent",
                border: "1px solid",
                borderColor: activeCat === cat ? "rgba(124,58,237,0.4)" : "transparent",
                borderRadius: "999px",
                color: activeCat === cat ? "white" : "var(--text-secondary)",
                cursor: "pointer", fontSize: "0.82rem", fontWeight: 600,
                transition: "all 0.25s ease", outline: "none",
                boxShadow: activeCat === cat ? "0 0 14px rgba(124,58,237,0.25)" : "none",
                fontFamily: "var(--font-body)",
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* ── Cinema Showcase ── */}
        <div className="glass-card showcase-card" style={{
          display: "grid",
          gridTemplateColumns: "1.15fr 0.85fr",
          gap: "44px", padding: "40px",
          borderRadius: "30px",
          boxShadow: "0 40px 90px rgba(0,0,0,0.60)",
          marginBottom: "28px",
          border: "1px solid rgba(255,255,255,0.08)",
          alignItems: "center",
          position: "relative",
          overflow: "hidden",
        }}>
          {/* Dynamic ambient glow */}
          <div style={{
            position: "absolute", top: "-20%", left: "-15%",
            width: "450px", height: "450px",
            background: `radial-gradient(circle, ${activeProject.accentColor || "#22d3ee"}15 0%, transparent 70%)`,
            borderRadius: "50%", pointerEvents: "none", zIndex: 0,
            transition: "background 0.5s ease",
          }} />

          {/* ── Image Column ── */}
          <div style={{
            position: "relative", borderRadius: "20px", overflow: "hidden",
            boxShadow: `0 24px 60px rgba(0,0,0,0.55), 0 0 30px ${activeProject.accentColor || "#22d3ee"}15`,
            border: "1px solid rgba(255,255,255,0.10)",
            height: "330px", zIndex: 1,
            opacity: fading ? 0 : 1,
            transform: fading ? "scale(0.97)" : "scale(1)",
            transition: "opacity 0.2s ease, transform 0.2s ease",
          }} className="showcase-img-box">
            <img
              src={activeImgSrc}
              alt={activeProject.title}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
            {/* Overlay gradient */}
            <div style={{
              position: "absolute", inset: 0,
              background: `linear-gradient(to top, rgba(5,8,18,0.7) 0%, transparent 60%)`,
            }} />
            {/* Category badge */}
            <div style={{
              position: "absolute", top: "16px", left: "16px",
              display: "flex", alignItems: "center", gap: "8px",
            }}>
              <span style={{
                padding: "5px 12px",
                background: "rgba(5,8,18,0.75)",
                backdropFilter: "blur(12px)",
                border: "1px solid rgba(255,255,255,0.15)",
                borderRadius: "999px",
                fontSize: "0.72rem", fontWeight: 700,
                color: activeProject.accentColor || "var(--clr-cyan-bright)",
                fontFamily: "var(--font-mono)",
                letterSpacing: "0.06em",
              }}>
                {activeProject.tag}
              </span>
            </div>
          </div>

          {/* ── Info Column ── */}
          <div style={{
            display: "flex", flexDirection: "column", gap: "20px",
            zIndex: 1,
            opacity: fading ? 0 : 1,
            transition: "opacity 0.2s ease",
          }}>
            <div>
              <span style={{
                fontSize: "0.74rem", fontWeight: 700,
                color: activeProject.accentColor || "var(--clr-cyan-bright)",
                fontFamily: "var(--font-mono)",
                letterSpacing: "0.12em", textTransform: "uppercase",
                display: "block", marginBottom: "6px",
              }}>
                {activeProject.subtitle}
              </span>
              <h3 style={{
                fontSize: "clamp(1.6rem, 3.2vw, 2.2rem)",
                fontWeight: 800, color: "var(--text-primary)",
                fontFamily: "var(--font-display)", letterSpacing: "-0.03em",
                margin: 0,
              }}>
                {activeProject.title}
              </h3>
            </div>

            <p style={{
              fontSize: "0.92rem", color: "var(--text-secondary)",
              lineHeight: 1.7, margin: 0,
            }}>
              {activeProject.desc}
            </p>

            {/* Tech stack */}
            <div>
              <span style={{
                fontSize: "0.70rem", color: "var(--text-muted)",
                fontFamily: "var(--font-mono)", letterSpacing: "0.12em",
                textTransform: "uppercase", display: "block", marginBottom: "10px",
              }}>
                Tech Stack
              </span>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                {activeProject.tech?.map((t, i) => (
                  <span
                    key={i}
                    style={{
                      padding: "5px 12px",
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid var(--border-ghost)",
                      borderRadius: "8px",
                      fontSize: "0.75rem", fontWeight: 600,
                      color: "var(--text-secondary)",
                      fontFamily: "var(--font-mono)",
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Action buttons */}
            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginTop: "6px" }}>
              {activeProject.link && (
                <a
                  href={activeProject.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                  style={{
                    padding: "10px 22px", fontSize: "0.85rem", gap: "8px",
                    background: `linear-gradient(135deg, ${activeProject.accentColor || "var(--clr-primary)"}, var(--clr-primary))`,
                  }}
                >
                  <span>Live Demo</span>
                  <i className="ri-external-link-line" />
                </a>
              )}
            </div>
          </div>
        </div>

        {/* ── Carousel Dock / Thumbnails ── */}
        <div style={{
          display: "flex", alignItems: "center", gap: "12px",
          maxWidth: "100%", width: "100%",
        }}>
          {/* Prev */}
          <button
            onClick={handlePrev}
            style={{
              width: "38px", height: "38px", borderRadius: "50%",
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.10)",
              color: "white", cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "1.1rem", transition: "all 0.25s ease", outline: "none",
              flexShrink: 0,
            }}
            aria-label="Previous project"
          >
            <i className="ri-arrow-left-s-line" />
          </button>

          {/* Thumbnails Row */}
          <div
            ref={dockRef}
            style={{
              display: "flex", gap: "10px",
              overflowX: "auto", padding: "6px 2px",
              flex: 1, scrollBehavior: "smooth",
            }}
            className="dock-scrollbar"
          >
            {filtered.map((p, idx) => {
              const isActive = activeIdx === idx;
              const thumbImg = resolveImage(p.imgKey, p.img, p);
              return (
                <div
                  key={p.id || idx}
                  onClick={() => selectIdx(idx)}
                  style={{
                    display: "flex", alignItems: "center", gap: "9px",
                    padding: "7px 14px",
                    background: isActive ? "rgba(124,58,237,0.18)" : "rgba(255,255,255,0.03)",
                    border: "1px solid",
                    borderColor: isActive ? "rgba(124,58,237,0.35)" : "var(--border-ghost)",
                    borderRadius: "12px", cursor: "pointer",
                    transition: "all 0.25s ease",
                    flexShrink: 0,
                    boxShadow: isActive ? "0 6px 20px rgba(124,58,237,0.25)" : "none",
                  }}
                >
                  <img
                    src={thumbImg}
                    alt={p.title}
                    style={{
                      width: "36px", height: "24px", objectFit: "cover",
                      borderRadius: "6px",
                      opacity: isActive ? 1 : 0.65,
                    }}
                  />
                  <span style={{
                    fontSize: "0.78rem", fontWeight: isActive ? 700 : 500,
                    color: isActive ? "white" : "var(--text-secondary)",
                    whiteSpace: "nowrap", fontFamily: "var(--font-body)",
                  }}>
                    {p.title}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Next */}
          <button
            onClick={handleNext}
            style={{
              width: "38px", height: "38px", borderRadius: "50%",
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.10)",
              color: "white", cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "1.1rem", transition: "all 0.25s ease", outline: "none",
              flexShrink: 0,
            }}
            aria-label="Next project"
          >
            <i className="ri-arrow-right-s-line" />
          </button>
        </div>

        {/* Project count */}
        <div style={{ textAlign: "center", marginTop: "18px" }}>
          <span style={{
            fontSize: "0.72rem", color: "var(--text-muted)",
            fontFamily: "var(--font-mono)", letterSpacing: "0.10em",
          }}>
            {activeIdx + 1} / {filtered.length} projects
          </span>
        </div>
      </div>

      <style>{`
        .dock-scrollbar::-webkit-scrollbar { display: none; }
        @media (max-width: 900px) {
          .showcase-card {
            grid-template-columns: 1fr !important;
            gap: 24px !important;
            padding: 24px !important;
          }
          .showcase-img-box {
            height: 230px !important;
          }
        }
      `}</style>
    </section>
  );
}