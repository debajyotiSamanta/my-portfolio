import ludo from "../assets/ludo.png"
import personalLib from "../assets/personal book library.png"
import project1 from "../assets/project1.png"
import project2 from "../assets/project2.png"
import project3 from "../assets/project3.png"
import project4 from "../assets/project4.png"
import project5 from "../assets/project5.png"
import solarSystem from "../assets/solar_system.png"
import todo from "../assets/todo.png"
import pfm from "../assets/pfm.png"
import mentorship from "../assets/mentorship.png"

export default function Projects() {
  const featured = {
    img: mentorship,
    title: "MentorSpace — Mentorship Platform",
    tag: "Full-Stack",
    tagColor: "chip-cyan",
    description: "A one-on-one mentorship platform with real-time WebRTC video/audio, collaborative multilingual code editor, and secure role-based authentication. Built for seamless mentor-student connections.",
    tech: ["React", "Node.js", "WebRTC", "MongoDB", "Express"],
    link: "https://mentorship-platform-frontend-delta.vercel.app/",
  }

  const projects = [
    {
      img: pfm, title: "Personal Finance Manager",
      tag: "Full-Stack", tagColor: "chip-cyan",
      desc: "Track income, expenses, set budgets and monitor spending habits through an intuitive dashboard interface.",
      link: "https://personal-finance-manager-orcin.vercel.app/",
    },
    {
      img: ludo, title: "Ludo Multiplayer Game",
      tag: "Game", tagColor: "chip-pink",
      desc: "Fun and interactive multiplayer Ludo game with smooth gameplay and engaging real-time visuals.",
      link: "https://playludoroom.hackerspacemsit.in/",
    },
    {
      img: solarSystem, title: "3D Solar System",
      tag: "Web", tagColor: "chip-violet",
      desc: "Visually stunning 3D solar system simulation — explore planets and celestial bodies interactively.",
      link: "https://solar-system-five-rho.vercel.app/",
    },
    {
      img: project4, title: "Fitness Tracker Dashboard",
      tag: "Web", tagColor: "chip-violet",
      desc: "Monitor fitness goals, track workouts and visualize progress through interactive charts.",
      link: "https://fitness-tracker-dashboard-gray.vercel.app/",
    },
    {
      img: todo, title: "To-Do List App",
      tag: "React", tagColor: "chip-cyan",
      desc: "Clean and efficient React task manager with intuitive UI for managing daily to-dos.",
      link: "https://todo-sigma-snowy.vercel.app/",
    },
    {
      img: personalLib, title: "Personal Book Library",
      tag: "Web", tagColor: "chip-violet",
      desc: "Manage your book collection, add new entries, and track reading progress through a sleek interface.",
      link: "https://debajyotisamanta.github.io/Personal-Book-Library/",
    },
    {
      img: project1, title: "Responsive Web Page Design",
      tag: "Web", tagColor: "chip-violet",
      desc: "Visually stunning responsive web page showcasing modern design principles across all devices.",
      link: "https://debajyotisamanta.github.io/CODECANVAS/",
    },
    {
      img: project2, title: "Responsive Landing Page",
      tag: "Web", tagColor: "chip-violet",
      desc: "Sleek landing page with modern aesthetics and smooth interactions for an engaging user experience.",
      link: "https://debajyotisamanta.github.io/CodeClauseInternship_ResponsiveLandingPage/",
    },
    {
      img: project3, title: "Age Calculator",
      tag: "Web", tagColor: "chip-violet",
      desc: "Intuitive age calculator web app — accurate results with a clean, user-friendly interface.",
      link: "https://code-alpha-project-age-calculator-tau.vercel.app/",
    },
    {
      img: project5, title: "Event Management System",
      tag: "Web", tagColor: "chip-violet",
      desc: "Comprehensive event management system — create, manage and track events with registration support.",
      link: "https://debajyotisamanta.github.io/CodeClauseInternship_Event_management_System/",
    },
  ]

  return (
    <section
      id="projects"
      className="dot-grid section-kv"
      style={{ background: "var(--bg-surface)" }}
    >
      <div style={{
        position: "absolute", top: "5%", right: "-5%",
        width: "450px", height: "450px",
        background: "radial-gradient(circle, rgba(124,58,237,0.08) 0%, transparent 70%)",
        borderRadius: "50%", pointerEvents: "none",
      }} />

      <div style={{ maxWidth: "1200px", margin: "0 auto", position: "relative", zIndex: 1 }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "56px" }}>
          <span className="section-overline">Featured Work</span>
          <h2 style={{
            fontSize: "clamp(2.4rem, 5vw, 3.8rem)",
            fontWeight: 800, letterSpacing: "-0.04em",
            color: "var(--text-primary)", marginTop: "12px", marginBottom: "16px", lineHeight: 1.1,
          }}>
            Projects &{" "}
            <span className="gradient-text">Creations</span>
          </h2>
          <p style={{ color: "var(--text-secondary)", fontSize: "1rem", maxWidth: "520px", margin: "0 auto" }}>
            A curated showcase of my best work — from full-stack platforms to interactive web experiences
          </p>
        </div>

        {/* Featured Card */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "0",
          background: "rgba(27,31,44,0.85)",
          border: "1px solid rgba(124,58,237,0.22)",
          borderRadius: "20px",
          overflow: "hidden",
          marginBottom: "28px",
          boxShadow: "0 8px 48px rgba(0,0,0,0.5), 0 0 40px rgba(124,58,237,0.10)",
          transition: "all 0.35s ease",
        }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = "0 16px 64px rgba(0,0,0,0.6), 0 0 60px rgba(124,58,237,0.20)";
            e.currentTarget.style.borderColor = "rgba(124,58,237,0.40)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = "0 8px 48px rgba(0,0,0,0.5), 0 0 40px rgba(124,58,237,0.10)";
            e.currentTarget.style.borderColor = "rgba(124,58,237,0.22)";
          }}
          className="featured-card"
        >
          {/* Image */}
          <div style={{ position: "relative", overflow: "hidden", minHeight: "320px" }}>
            <img
              src={featured.img}
              alt={featured.title}
              style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s ease" }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
            />
            <div style={{
              position: "absolute", inset: 0,
              background: "linear-gradient(135deg, rgba(124,58,237,0.25) 0%, transparent 60%)",
            }} />
            <span style={{
              position: "absolute", top: "16px", left: "16px",
            }} className={`chip ${featured.tagColor}`}>
              ✦ {featured.tag}
            </span>
          </div>

          {/* Content */}
          <div style={{ padding: "40px 36px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <h3 style={{
              fontSize: "1.5rem", fontWeight: 800,
              color: "var(--text-primary)", marginBottom: "16px",
              letterSpacing: "-0.02em", lineHeight: 1.2,
            }}>
              {featured.title}
            </h3>
            <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)", lineHeight: 1.75, marginBottom: "24px" }}>
              {featured.description}
            </p>

            {/* Tech tags */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "28px" }}>
              {featured.tech.map((t, i) => (
                <span key={i} style={{
                  padding: "4px 12px",
                  background: "rgba(124,58,237,0.12)",
                  border: "1px solid rgba(124,58,237,0.22)",
                  borderRadius: "6px",
                  fontSize: "0.72rem", fontWeight: 700,
                  color: "var(--clr-primary-dim)",
                  letterSpacing: "0.03em",
                }}>
                  {t}
                </span>
              ))}
            </div>

            <a
              href={featured.link}
              target="_blank"
              rel="noreferrer"
              className="btn-primary"
              style={{ alignSelf: "flex-start" }}
            >
              View Live <i className="ri-arrow-right-up-line"></i>
            </a>
          </div>
        </div>

        {/* Projects Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "20px",
        }} className="projects-grid">
          {projects.map((p, i) => (
            <div
              key={i}
              style={{
                background: "rgba(27,31,44,0.80)",
                border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: "14px",
                overflow: "hidden",
                transition: "all 0.3s ease",
                position: "relative",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-5px)";
                e.currentTarget.style.borderColor = "rgba(124,58,237,0.30)";
                e.currentTarget.style.boxShadow = "0 12px 40px rgba(0,0,0,0.5), 0 0 24px rgba(124,58,237,0.12)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              {/* Image */}
              <div style={{ position: "relative", height: "180px", overflow: "hidden" }}>
                <img
                  src={p.img}
                  alt={p.title}
                  style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s ease" }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.08)")}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                />
                <div style={{
                  position: "absolute", inset: 0,
                  background: "linear-gradient(to top, rgba(27,31,44,0.85) 0%, transparent 60%)",
                }} />
                <span style={{ position: "absolute", top: "10px", right: "10px" }} className={`chip ${p.tagColor}`}>
                  {p.tag}
                </span>
              </div>

              {/* Content */}
              <div style={{ padding: "18px 18px 20px" }}>
                <h3 style={{ fontWeight: 700, fontSize: "0.95rem", color: "var(--text-primary)", marginBottom: "8px", lineHeight: 1.3 }}>
                  {p.title}
                </h3>
                <p style={{ fontSize: "0.8rem", color: "var(--text-secondary)", lineHeight: 1.65, marginBottom: "14px" }}>
                  {p.desc}
                </p>
                <a
                  href={p.link}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    display: "inline-flex", alignItems: "center", gap: "4px",
                    fontSize: "0.8rem", fontWeight: 700,
                    color: "var(--clr-cyan)", textDecoration: "none",
                    transition: "gap 0.2s ease",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.gap = "8px")}
                  onMouseLeave={(e) => (e.currentTarget.style.gap = "4px")}
                >
                  View Project <i className="ri-arrow-right-line"></i>
                </a>
              </div>

              {/* Bottom bar */}
              <div style={{
                height: "2px",
                background: "linear-gradient(90deg, var(--clr-primary), var(--clr-cyan))",
                width: "0",
                transition: "width 0.35s ease",
              }}
                onMouseEnter={(e) => (e.currentTarget.style.width = "100%")}
                onMouseLeave={(e) => (e.currentTarget.style.width = "0")}
              />
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .featured-card { grid-template-columns: 1fr !important; }
          .projects-grid  { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 580px) {
          .projects-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}