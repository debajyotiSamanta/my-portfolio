import myImage from "../assets/my_image.png";
import myResume from "../assets/my_resume.pdf";
import myCV from "../assets/my_CV.pdf";

export default function Home() {
  const socials = [
    { href: "https://www.linkedin.com/in/debajyoti-samanta-b49b292b5/", icon: "ri-linkedin-box-fill", label: "LinkedIn", color: "#0A66C2" },
    { href: "https://github.com/debajyotiSamanta", icon: "ri-github-fill", label: "GitHub", color: "#6e5494" },
    { href: "https://www.instagram.com/unique_engineer_07/", icon: "ri-instagram-fill", label: "Instagram", color: "#E1306C" },
    { href: "https://www.facebook.com/debajyoti.samanta.588680", icon: "ri-facebook-circle-fill", label: "Facebook", color: "#1877F2" },
  ];

  return (
    <section
      id="home"
      className="dot-grid"
      style={{
        minHeight: "100vh",
        background: "radial-gradient(ellipse 80% 60% at 70% 10%, rgba(124,58,237,0.12) 0%, transparent 60%), radial-gradient(ellipse 60% 50% at 10% 90%, rgba(76,215,246,0.08) 0%, transparent 60%), var(--bg-base)",
        display: "flex",
        alignItems: "center",
        padding: "120px 24px 80px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Orb glows */}
      <div style={{
        position: "absolute", top: "-10%", right: "-5%",
        width: "600px", height: "600px",
        background: "radial-gradient(circle, rgba(124,58,237,0.15) 0%, transparent 70%)",
        borderRadius: "50%", pointerEvents: "none", zIndex: 0,
      }} />
      <div style={{
        position: "absolute", bottom: "-15%", left: "-10%",
        width: "500px", height: "500px",
        background: "radial-gradient(circle, rgba(76,215,246,0.10) 0%, transparent 70%)",
        borderRadius: "50%", pointerEvents: "none", zIndex: 0,
      }} />

      <div style={{ maxWidth: "1280px", width: "100%", margin: "0 auto", position: "relative", zIndex: 2 }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "48px",
          alignItems: "center",
        }} className="hero-grid">

          {/* ── LEFT COLUMN ── */}
          <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>

            {/* Available badge */}
            <div style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
              <span style={{
                display: "inline-flex", alignItems: "center", gap: "8px",
                padding: "6px 16px",
                background: "rgba(52,211,153,0.10)",
                border: "1px solid rgba(52,211,153,0.25)",
                borderRadius: "999px",
                fontSize: "0.78rem", fontWeight: 600, color: "#6ee7b7",
                letterSpacing: "0.03em",
              }}>
                <span style={{
                  width: "7px", height: "7px", borderRadius: "50%",
                  background: "#34d399",
                  boxShadow: "0 0 8px #34d399",
                  animation: "pulse-glow 2s ease-in-out infinite",
                }} />
                ✦ Available for Work
              </span>
            </div>

            {/* Name */}
            <div style={{ lineHeight: 1.05 }}>
              <p style={{ color: "var(--text-muted)", fontSize: "1.1rem", marginBottom: "6px", fontWeight: 500 }}>
                Hi, I'm
              </p>
              <h1 style={{
                fontSize: "clamp(3rem, 7vw, 5.5rem)",
                fontWeight: 800,
                letterSpacing: "-0.04em",
                color: "var(--text-primary)",
                margin: 0,
              }}>
                Debajyoti
              </h1>
              <h1 style={{
                fontSize: "clamp(3rem, 7vw, 5.5rem)",
                fontWeight: 800,
                letterSpacing: "-0.04em",
                margin: 0,
                background: "linear-gradient(135deg, #d2bbff 0%, #4cd7f6 50%, #ffb0cd 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}>
                Samanta
              </h1>
            </div>

            {/* Subtitle */}
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <div style={{ width: "32px", height: "2px", background: "var(--clr-cyan)", borderRadius: "999px" }} />
              <p style={{
                fontSize: "1.15rem", fontWeight: 600, color: "var(--clr-cyan)",
                letterSpacing: "0.01em",
              }}>
                Full-Stack Developer
                <span style={{ animation: "blink-cursor 1s step-end infinite", marginLeft: "2px" }}>|</span>
              </p>
            </div>

            {/* Bio */}
            <p style={{
              fontSize: "1rem",
              color: "var(--text-secondary)",
              lineHeight: 1.75,
              maxWidth: "520px",
            }}>
              I craft beautiful, responsive digital experiences with modern web technologies.
              Transforming ideas into pixel-perfect, interactive realities that matter.
            </p>

            {/* CTA Buttons */}
            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
              <a href="#projects" className="btn-primary">
                View My Work <i className="ri-arrow-right-line"></i>
              </a>
              <a href="#contact" className="btn-ghost">
                Start a Project <i className="ri-mail-line"></i>
              </a>
              <a href={myResume} download="Debajyoti_Samanta_Resume.pdf" className="btn-glass" style={{ borderColor: "var(--clr-cyan)", color: "var(--clr-cyan)" }}>
                Resume <i className="ri-download-line"></i>
              </a>
              <a href={myCV} download="Debajyoti_Samanta_CV.pdf" className="btn-glass" style={{ borderColor: "var(--clr-cyan)", color: "var(--clr-cyan)" }}>
                Download CV <i className="ri-download-cloud-2-line"></i>
              </a>
            </div>

            {/* Socials */}
            <div style={{ display: "flex", gap: "12px", paddingTop: "4px" }}>
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  title={s.label}
                  style={{
                    width: "44px", height: "44px",
                    borderRadius: "50%",
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: "var(--text-secondary)",
                    fontSize: "1.2rem",
                    textDecoration: "none",
                    transition: "all 0.25s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "white";
                    e.currentTarget.style.background = s.color + "33";
                    e.currentTarget.style.borderColor = s.color + "66";
                    e.currentTarget.style.boxShadow = `0 0 16px ${s.color}44`;
                    e.currentTarget.style.transform = "translateY(-3px) scale(1.1)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "var(--text-secondary)";
                    e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
                    e.currentTarget.style.boxShadow = "none";
                    e.currentTarget.style.transform = "translateY(0) scale(1)";
                  }}
                >
                  <i className={s.icon}></i>
                </a>
              ))}
            </div>
          </div>

          {/* ── RIGHT COLUMN — Image ── */}
          <div style={{ position: "relative", display: "flex", justifyContent: "center" }}>
            {/* Background violet orb */}
            <div style={{
              position: "absolute",
              width: "380px", height: "380px",
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(124,58,237,0.30) 0%, rgba(124,58,237,0) 70%)",
              filter: "blur(40px)",
              zIndex: 0,
            }} />

            {/* Rotating outer ring */}
            <div className="animate-float" style={{
              position: "relative", width: "320px", height: "320px",
              borderRadius: "50%", zIndex: 1,
            }}>
              <div style={{
                position: "absolute", inset: "-8px",
                borderRadius: "50%",
                background: "conic-gradient(from 0deg, #7C3AED, #4cd7f6, #ffb0cd, #7C3AED)",
                animation: "rotate-ring 5s linear infinite",
                zIndex: 1,
              }} />
              <div style={{
                position: "absolute", inset: "-4px",
                borderRadius: "50%",
                background: "var(--bg-base)",
                zIndex: 2,
              }} />
              <div style={{
                position: "absolute", inset: "4px",
                borderRadius: "50%",
                overflow: "hidden",
                zIndex: 3,
              }}>
                <img
                  src={myImage}
                  alt="Debajyoti Samanta"
                  style={{
                    width: "100%", height: "100%",
                    objectFit: "cover",
                    transition: "transform 0.5s ease",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.06)")}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                />
              </div>
            </div>

            {/* Floating Stat Cards */}
            <div style={{
              position: "absolute",
              bottom: "-16px", left: "-24px",
              background: "rgba(27,31,44,0.90)",
              backdropFilter: "blur(12px)",
              border: "1px solid rgba(124,58,237,0.25)",
              borderRadius: "12px",
              padding: "14px 20px",
              boxShadow: "0 8px 32px rgba(0,0,0,0.5), 0 0 20px rgba(124,58,237,0.15)",
              zIndex: 4,
              animation: "float 4s ease-in-out infinite",
            }}>
              <div style={{ fontSize: "1.6rem", fontWeight: 800, color: "var(--clr-primary-dim)", lineHeight: 1 }}>15+</div>
              <div style={{ fontSize: "0.72rem", color: "var(--text-muted)", fontWeight: 600, marginTop: "2px", letterSpacing: "0.05em" }}>PROJECTS</div>
            </div>

            <div style={{
              position: "absolute",
              top: "-16px", right: "-24px",
              background: "rgba(27,31,44,0.90)",
              backdropFilter: "blur(12px)",
              border: "1px solid rgba(76,215,246,0.25)",
              borderRadius: "12px",
              padding: "14px 20px",
              boxShadow: "0 8px 32px rgba(0,0,0,0.5), 0 0 20px rgba(76,215,246,0.15)",
              zIndex: 4,
              animation: "float 4s ease-in-out infinite 2s",
            }}>
              <div style={{ fontSize: "1.6rem", fontWeight: 800, color: "var(--clr-cyan)", lineHeight: 1 }}>3+</div>
              <div style={{ fontSize: "0.72rem", color: "var(--text-muted)", fontWeight: 600, marginTop: "2px", letterSpacing: "0.05em" }}>YRS EXP</div>
            </div>
          </div>
        </div>

        {/* ── Info Cards ── */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "20px",
          marginTop: "72px",
        }} className="info-cards-grid">
          {[
            {
              icon: "ri-user-heart-line",
              title: "About Me",
              color: "var(--clr-primary)",
              glow: "rgba(124,58,237,0.25)",
              bg: "rgba(124,58,237,0.08)",
              text: "Passionate IT student at Meghnad Saha Institute of Technology. I craft elegant solutions to complex problems with modern web technologies.",
            },
            {
              icon: "ri-mail-send-line",
              title: "Get in Touch",
              color: "var(--clr-cyan)",
              glow: "rgba(76,215,246,0.20)",
              bg: "rgba(76,215,246,0.06)",
              text: null,
              email: "debajyotisamanta2003@gmail.com",
            },
            {
              icon: "ri-lightbulb-flash-line",
              title: "Expertise",
              color: "var(--clr-pink)",
              glow: "rgba(255,176,205,0.20)",
              bg: "rgba(255,176,205,0.06)",
              list: ["React & Modern JavaScript", "Responsive Web Design", "UI/UX Development", "Full-Stack Development"],
            },
          ].map((card, i) => (
            <div
              key={i}
              className="glass-card"
              style={{ padding: "28px 24px" }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "14px" }}>
                <div style={{
                  width: "44px", height: "44px",
                  borderRadius: "10px",
                  background: card.bg,
                  border: `1px solid ${card.glow}`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "1.3rem", color: card.color,
                  boxShadow: `0 0 16px ${card.glow}`,
                }}>
                  <i className={card.icon}></i>
                </div>
                <h3 style={{ fontWeight: 700, fontSize: "1rem", color: "var(--text-primary)" }}>
                  {card.title}
                </h3>
              </div>
              {card.text && (
                <p style={{ fontSize: "0.875rem", color: "var(--text-secondary)", lineHeight: 1.65 }}>
                  {card.text}
                </p>
              )}
              {card.email && (
                <a href={`mailto:${card.email}`} style={{
                  fontSize: "0.85rem", color: "var(--clr-cyan)",
                  textDecoration: "none", wordBreak: "break-all", fontWeight: 500,
                }}>
                  {card.email}
                </a>
              )}
              {card.list && (
                <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "8px" }}>
                  {card.list.map((item, j) => (
                    <li key={j} style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.85rem", color: "var(--text-secondary)" }}>
                      <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: "var(--clr-pink)", flexShrink: 0 }} />
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>

        {/* Scroll indicator */}
        <div style={{ textAlign: "center", marginTop: "64px", opacity: 0.6 }}>
          <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginBottom: "12px", letterSpacing: "0.15em", textTransform: "uppercase" }}>
            Scroll to Explore
          </p>
          <div style={{
            width: "24px", height: "40px",
            border: "1.5px solid rgba(255,255,255,0.15)",
            borderRadius: "12px",
            margin: "0 auto",
            display: "flex",
            justifyContent: "center",
            paddingTop: "6px",
          }}>
            <div style={{
              width: "3px", height: "8px",
              borderRadius: "2px",
              background: "linear-gradient(to bottom, var(--clr-primary), var(--clr-cyan))",
              animation: "float 1.5s ease-in-out infinite",
            }} />
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .hero-grid { grid-template-columns: 1fr !important; }
          .info-cards-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 640px) {
          .info-cards-grid { grid-template-columns: 1fr !important; }
        }
        @keyframes blink-cursor {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0; }
        }
      `}</style>
    </section>
  );
}