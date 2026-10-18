import { useEffect, useRef, useState } from "react";
import { usePortfolio } from "../context/PortfolioContext";

function useTypewriter(words, { typingSpeed = 80, erasingSpeed = 45, pauseTime = 2200 } = {}) {
  const [display, setDisplay] = useState("");
  const [wordIdx, setWordIdx] = useState(0);
  const [typing, setTyping]   = useState(true);
  const timerRef = useRef(null);

  useEffect(() => {
    if (!words || words.length === 0) return;
    const currentWord = words[wordIdx % words.length] || "";

    if (typing) {
      if (display.length < currentWord.length) {
        timerRef.current = setTimeout(() => setDisplay(currentWord.slice(0, display.length + 1)), typingSpeed);
      } else {
        timerRef.current = setTimeout(() => setTyping(false), pauseTime);
      }
    } else {
      if (display.length > 0) {
        timerRef.current = setTimeout(() => setDisplay(display.slice(0, -1)), erasingSpeed);
      } else {
        setWordIdx((i) => (i + 1) % words.length);
        setTyping(true);
      }
    }
    return () => clearTimeout(timerRef.current);
  }, [display, typing, wordIdx, words, typingSpeed, erasingSpeed, pauseTime]);

  return display;
}

export default function Home() {
  const { portfolioData, resolveImage, resolveAssetUrl } = usePortfolio();
  const personal = portfolioData?.personal || {};
  const stats    = portfolioData?.stats || [];
  const socials  = portfolioData?.socials || [];

  const roles = personal.roles?.length ? personal.roles : ["Full-Stack Developer", "UI/UX Designer"];
  const role = useTypewriter(roles);
  const [imgLoaded, setImgLoaded] = useState(false);

  const avatarSrc = resolveImage(personal.avatarKey, personal.avatar);

  return (
    <section
      id="home"
      className="dot-grid"
      style={{
        minHeight: "100vh",
        background: "var(--bg-void)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "120px 20px 80px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* ── Background Aurora Orbs ── */}
      <div style={{
        position: "absolute", top: "10%", left: "-8%",
        width: "550px", height: "550px",
        background: "radial-gradient(circle, rgba(124, 58, 237, 0.16) 0%, transparent 65%)",
        borderRadius: "50%", pointerEvents: "none", zIndex: 0,
        filter: "blur(20px)",
      }} />
      <div style={{
        position: "absolute", top: "25%", right: "-8%",
        width: "500px", height: "500px",
        background: "radial-gradient(circle, rgba(6, 182, 212, 0.14) 0%, transparent 65%)",
        borderRadius: "50%", pointerEvents: "none", zIndex: 0,
        filter: "blur(20px)",
      }} />
      <div style={{
        position: "absolute", bottom: "5%", left: "30%",
        width: "400px", height: "400px",
        background: "radial-gradient(circle, rgba(236, 72, 153, 0.10) 0%, transparent 65%)",
        borderRadius: "50%", pointerEvents: "none", zIndex: 0,
      }} />

      {/* ── Main Content Container ── */}
      <div style={{
        maxWidth: "1140px",
        width: "100%",
        margin: "0 auto",
        position: "relative",
        zIndex: 1,
      }}>
        <div
          className="hero-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1.15fr 0.85fr",
            gap: "56px",
            alignItems: "center",
          }}
        >
          {/* ── LEFT COLUMN: Bio & CTAs ── */}
          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>

            {/* Status Chip */}
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div className="chip-cyan" style={{ display: "inline-flex", alignItems: "center", gap: "7px", padding: "6px 14px", borderRadius: "999px" }}>
                <span className="live-dot" />
                <span style={{ fontSize: "0.76rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" }}>
                  {personal.status || "Available for work"}
                </span>
              </div>
              <span style={{ fontSize: "0.80rem", color: "var(--text-muted)" }}>•</span>
              <span style={{ fontSize: "0.80rem", color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>
                {personal.location || "West Bengal, India"}
              </span>
            </div>

            {/* Main Headline */}
            <div>
              <p style={{
                fontSize: "1rem", fontWeight: 600, color: "var(--text-secondary)",
                letterSpacing: "0.04em", marginBottom: "8px",
              }}>
                Hello, I'm
              </p>
              <h1 style={{
                fontSize: "clamp(2.6rem, 5.5vw, 4.4rem)",
                fontWeight: 800,
                letterSpacing: "-0.04em",
                lineHeight: 1.05,
                margin: "0 0 12px 0",
              }}>
                <span style={{
                  background: "linear-gradient(135deg, #ffffff 40%, var(--clr-primary-dim) 80%, var(--clr-cyan-bright) 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}>
                  {personal.name || "Debajyoti Samanta"}
                </span>
              </h1>

              {/* Dynamic Typewriter */}
              <div style={{ display: "flex", alignItems: "center", gap: "8px", minHeight: "2.4rem" }}>
                <span style={{
                  fontSize: "clamp(1.2rem, 2.5vw, 1.85rem)",
                  fontWeight: 700,
                  fontFamily: "var(--font-display)",
                  letterSpacing: "-0.02em",
                  color: "var(--clr-cyan-bright)",
                }}>
                  {role}
                </span>
                <span style={{
                  display: "inline-block", width: "2.5px", height: "1.4em",
                  backgroundColor: "var(--clr-primary-mid)",
                  animation: "blink-cursor 0.9s infinite",
                  verticalAlign: "middle",
                }} />
              </div>
            </div>

            {/* Intro Description */}
            <p style={{
              fontSize: "1.05rem", color: "var(--text-secondary)",
              lineHeight: 1.7, maxWidth: "520px", margin: 0,
            }}>
              {personal.bioIntro || "Crafting beautiful, robust digital experiences with modern web technologies, fluid animations, and high-performance architectures."}
            </p>

            {/* Action Buttons */}
            <div style={{ display: "flex", gap: "14px", flexWrap: "wrap", alignItems: "center", marginTop: "4px" }}>
              <a
                href="#projects"
                className="btn-primary"
                style={{ padding: "12px 26px", fontSize: "0.9rem", gap: "8px" }}
              >
                <span>Explore Work</span>
                <i className="ri-arrow-down-line" />
              </a>

              {personal.resumeUrl && (
                <a
                  href={resolveAssetUrl ? resolveAssetUrl(personal.resumeUrl) : personal.resumeUrl}
                  download={personal.resumeName || "Debajyoti_Samanta_Resume.pdf"}
                  className="btn-ghost"
                  style={{ padding: "12px 22px", fontSize: "0.9rem", gap: "8px" }}
                >
                  <i className="ri-file-download-line" style={{ color: "var(--clr-cyan-bright)" }} />
                  <span>Resume</span>
                </a>
              )}

              {personal.cvUrl && (
                <a
                  href={resolveAssetUrl ? resolveAssetUrl(personal.cvUrl) : personal.cvUrl}
                  download={personal.cvName || "Debajyoti_Samanta_CV.pdf"}
                  className="btn-ghost"
                  style={{ padding: "12px 22px", fontSize: "0.9rem", gap: "8px" }}
                >
                  <i className="ri-article-line" style={{ color: "var(--clr-primary-dim)" }} />
                  <span>Curriculum Vitae</span>
                </a>
              )}
            </div>

            {/* Socials Row */}
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginTop: "8px" }}>
              <span style={{ fontSize: "0.72rem", color: "var(--text-muted)", fontFamily: "var(--font-mono)", textTransform: "uppercase", letterSpacing: "0.12em" }}>
                Connect
              </span>
              <div style={{ height: "1px", width: "32px", background: "var(--border-subtle)" }} />
              <div style={{ display: "flex", gap: "10px" }}>
                {socials.map((s, i) => (
                  <a
                    key={s.id || i}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.name}
                    style={{
                      width: "38px", height: "38px", borderRadius: "10px",
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid var(--border-ghost)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      color: "var(--text-muted)", fontSize: "1.1rem",
                      textDecoration: "none", transition: "all 0.25s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = s.color;
                      e.currentTarget.style.background = `${s.color}15`;
                      e.currentTarget.style.borderColor = `${s.color}40`;
                      e.currentTarget.style.boxShadow = `0 0 16px ${s.color}30`;
                      e.currentTarget.style.transform = "translateY(-3px)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = "var(--text-muted)";
                      e.currentTarget.style.background = "rgba(255,255,255,0.04)";
                      e.currentTarget.style.borderColor = "var(--border-ghost)";
                      e.currentTarget.style.boxShadow = "none";
                      e.currentTarget.style.transform = "translateY(0)";
                    }}
                  >
                    <i className={s.icon} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* ── RIGHT COLUMN: Responsive Avatar + Accent Rings ── */}
          <div className="hero-avatar-wrapper" style={{
            position: "relative",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
          }}>
            {/* Outer rotating ring */}
            <div className="hero-ring-outer" style={{
              position: "absolute",
              width: "360px", height: "360px", borderRadius: "50%",
              background: "conic-gradient(from 0deg, transparent 70%, rgba(124,58,237,0.45) 80%, rgba(6,182,212,0.45) 90%, transparent 100%)",
              animation: "rotate-ring 9s linear infinite",
              zIndex: 0,
            }} />

            {/* Inner counter-ring */}
            <div className="hero-ring-inner" style={{
              position: "absolute",
              width: "330px", height: "330px", borderRadius: "50%",
              background: "conic-gradient(from 180deg, transparent 60%, rgba(236,72,153,0.35) 75%, transparent 90%)",
              animation: "rotate-ring-reverse 12s linear infinite",
              zIndex: 0,
            }} />

            {/* Glow orb */}
            <div style={{
              position: "absolute",
              width: "300px", height: "300px", borderRadius: "50%",
              background: "radial-gradient(circle, rgba(124,58,237,0.22) 0%, transparent 70%)",
              filter: "blur(28px)", zIndex: 0,
            }} />

            {/* Profile image container */}
            <div
              className="animate-float hero-avatar-box"
              style={{
                position: "relative",
                width: "280px", height: "280px",
                zIndex: 1,
              }}
            >
              {/* Image border ring */}
              <div style={{
                position: "absolute", inset: "-3px", borderRadius: "50%",
                background: "linear-gradient(135deg, var(--clr-primary), var(--clr-cyan), var(--clr-pink), var(--clr-primary))",
                backgroundSize: "300% 300%",
                animation: "aurora-shift 6s ease-in-out infinite",
                zIndex: 1,
              }} />
              <div style={{
                position: "absolute", inset: "0",
                borderRadius: "50%",
                background: "var(--bg-void)",
                zIndex: 2,
              }} />
              <div style={{
                position: "absolute", inset: "5px",
                borderRadius: "50%", overflow: "hidden", zIndex: 3,
              }}>
                <img
                  src={avatarSrc}
                  alt={personal.name || "Debajyoti Samanta"}
                  onLoad={() => setImgLoaded(true)}
                  style={{
                    width: "100%", height: "100%",
                    objectFit: "cover", objectPosition: "top",
                    transition: "transform 0.6s ease",
                    opacity: imgLoaded ? 1 : 0,
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.06)")}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                />
              </div>
            </div>

            {/* Floating Stat Badges - Desktop/Tablet */}
            <div className="hero-floating-badges">
              {stats.slice(0, 3).map((st, i) => {
                const positions = [
                  { bottom: "-12px", left: "-20px", delay: "0s" },
                  { top: "-12px", right: "-16px", delay: "1.4s" },
                  { bottom: "35px", right: "-28px", delay: "0.7s" },
                ];
                const pos = positions[i] || positions[0];
                return (
                  <div
                    key={st.id || i}
                    style={{
                      position: "absolute",
                      bottom: pos.bottom, top: pos.top,
                      left: pos.left, right: pos.right,
                      background: "rgba(10, 14, 28, 0.85)",
                      backdropFilter: "blur(24px)",
                      WebkitBackdropFilter: "blur(24px)",
                      border: "1px solid rgba(255, 255, 255, 0.12)",
                      borderRadius: "16px",
                      padding: "10px 16px",
                      boxShadow: "0 16px 36px rgba(0,0,0,0.50), 0 0 20px rgba(124,92,246,0.12)",
                      zIndex: 4,
                      animation: `float 4.5s ease-in-out infinite ${pos.delay}`,
                      textAlign: "center",
                      minWidth: "75px",
                    }}
                  >
                    <div style={{
                      fontSize: "1.35rem", fontWeight: 800, color: st.color,
                      lineHeight: 1, fontFamily: "var(--font-display)",
                      letterSpacing: "-0.04em",
                    }}>
                      {st.value}
                    </div>
                    <div style={{
                      fontSize: "0.62rem", color: "var(--text-muted)",
                      fontWeight: 600, marginTop: "4px",
                      letterSpacing: "0.08em", textTransform: "uppercase",
                      fontFamily: "var(--font-mono)",
                    }}>
                      {st.label}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ── Stats Grid Row (No internship, completely responsive) ── */}
        <div className="hero-stats" style={{
          display: "grid",
          gridTemplateColumns: `repeat(${stats.length || 4}, 1fr)`,
          gap: "16px",
          marginTop: "70px",
        }}>
          {stats.map((s, i) => (
            <div
              key={s.id || i}
              className="glass-card"
              style={{ padding: "22px 18px", textAlign: "center" }}
            >
              <div style={{
                fontSize: "clamp(1.8rem, 3vw, 2.3rem)",
                fontWeight: 800,
                color: s.color,
                textShadow: `0 0 24px ${s.glow}`,
                letterSpacing: "-0.05em",
                fontFamily: "var(--font-display)",
                lineHeight: 1,
              }}>
                {s.value}
              </div>
              <div style={{
                fontSize: "0.68rem", color: "var(--text-muted)",
                fontWeight: 600, marginTop: "6px",
                letterSpacing: "0.12em", textTransform: "uppercase",
                fontFamily: "var(--font-mono)",
              }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>

        {/* ── Scroll Indicator ── */}
        <div style={{ textAlign: "center", marginTop: "50px" }}>
          <div
            style={{
              display: "inline-flex", flexDirection: "column",
              alignItems: "center", gap: "8px", opacity: 0.6,
              cursor: "pointer",
            }}
            onClick={() => document.getElementById("skills")?.scrollIntoView({ behavior: "smooth" })}
          >
            <p style={{
              fontSize: "0.65rem", color: "var(--text-muted)",
              letterSpacing: "0.22em", textTransform: "uppercase",
              fontFamily: "var(--font-mono)", margin: 0,
            }}>
              Scroll to explore
            </p>
            <div style={{
              width: "20px", height: "34px",
              border: "1.5px solid rgba(255,255,255,0.14)",
              borderRadius: "10px",
              display: "flex", justifyContent: "center",
              paddingTop: "5px",
            }}>
              <div style={{
                width: "3px", height: "7px", borderRadius: "2px",
                background: "linear-gradient(to bottom, var(--clr-primary), var(--clr-cyan))",
                animation: "float 1.6s ease-in-out infinite",
              }} />
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .hero-grid  { grid-template-columns: 1fr !important; gap: 40px !important; text-align: center; }
          .hero-grid > div:first-child { align-items: center; }
          .hero-grid > div:last-child { order: -1; }
          .hero-stats { grid-template-columns: repeat(2, 1fr) !important; gap: 12px !important; }
        }
        @media (max-width: 600px) {
          .hero-avatar-box { width: 220px !important; height: 220px !important; }
          .hero-ring-outer { width: 270px !important; height: 270px !important; }
          .hero-ring-inner { width: 250px !important; height: 250px !important; }
          .hero-floating-badges { display: none !important; }
          .hero-stats { grid-template-columns: repeat(2, 1fr) !important; gap: 10px !important; }
        }
        @keyframes blink-cursor { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
        @keyframes aurora-shift {
          0%, 100% { background-position: 0% 50%; }
          50%       { background-position: 100% 50%; }
        }
      `}</style>
    </section>
  );
}