import { useState, useEffect } from "react"
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
import musicHub from "../assets/Music Hub.png"
import localFix from "../assets/LocalFix1.png"

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeIndex, setActiveIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const categories = ["All", "Full-Stack", "Game", "Web", "React"];

  const allProjects = [
    {
      img: mentorship,
      title: "MentorSpace — Mentorship Platform",
      tag: "Full-Stack",
      tagColor: "chip-cyan",
      desc: "A one-on-one mentorship platform with real-time WebRTC video/audio, collaborative multilingual code editor, and secure role-based authentication. Built for seamless mentor-student connections.",
      tech: ["React", "Node.js", "WebRTC", "MongoDB", "Express"],
      link: "https://mentorship-platform-frontend-delta.vercel.app/",
    },
    {
      img: musicHub,
      title: "Music Hub — Premium Streaming Platform",
      tag: "Full-Stack",
      tagColor: "chip-cyan",
      desc: "A full-stack music streaming platform with user accounts, custom playlists, secure MongoDB database integration, and premium audio playback queue management.",
      tech: ["React", "Node.js", "Express", "MongoDB", "Tailwind CSS"],
      link: "https://my-music-hub-ashen.vercel.app/",
    },
    {
      img: localFix,
      title: "LocalFix — Local Service Provider Platform",
      tag: "Full-Stack",
      tagColor: "chip-cyan",
      desc: "A comprehensive platform connecting local service providers with customers. Features include service listings, user reviews, secure messaging, and geo-location-based search to facilitate seamless local service discovery and bookings.",
      tech: ["React", "Node.js", "MongoDB", "Express", "Tailwind CSS"],
      link: "https://locallie.vercel.app/",
    },
    {
      img: pfm,
      title: "Personal Finance Manager",
      tag: "Full-Stack",
      tagColor: "chip-cyan",
      desc: "Track income, expenses, set budgets and monitor spending habits through an intuitive dashboard interface with custom reports.",
      tech: ["React", "Node.js", "MongoDB", "Express", "Tailwind CSS"],
      link: "https://personal-finance-manager-orcin.vercel.app/",
    },
    {
      img: ludo,
      title: "Ludo Multiplayer Game",
      tag: "Game",
      tagColor: "chip-pink",
      desc: "Fun and interactive multiplayer Ludo game with smooth gameplay and engaging real-time visuals utilizing WebSockets.",
      tech: ["HTML5", "CSS3", "JavaScript", "Socket.io", "Node.js"],
      link: "https://playludoroom.hackerspacemsit.in/",
    },
    {
      img: solarSystem,
      title: "3D Solar System",
      tag: "Web",
      tagColor: "chip-violet",
      desc: "Visually stunning 3D solar system simulation — explore planets and celestial bodies interactively utilizing WebGL shaders.",
      tech: ["HTML5", "CSS3", "JavaScript", "Three.js", "WebGL"],
      link: "https://solar-system-five-rho.vercel.app/",
    },
    {
      img: project4,
      title: "Fitness Tracker Dashboard",
      tag: "Web",
      tagColor: "chip-violet",
      desc: "Monitor fitness goals, track workouts and visualize progress through interactive graphs and custom routines.",
      tech: ["HTML5", "CSS3", "JavaScript", "Chart.js", "LocalStorage"],
      link: "https://fitness-tracker-dashboard-gray.vercel.app/",
    },
    {
      img: todo,
      title: "To-Do List App",
      tag: "React",
      tagColor: "chip-cyan",
      desc: "Clean and efficient React task manager with intuitive UI and category filters for managing daily to-dos.",
      tech: ["React", "Vite", "CSS3 Modules", "LocalStorage", "JavaScript"],
      link: "https://todo-sigma-snowy.vercel.app/",
    },
    {
      img: personalLib,
      title: "Personal Book Library",
      tag: "Web",
      tagColor: "chip-violet",
      desc: "Manage your book collection, add new entries, rate titles, and track reading progress through a sleek responsive interface.",
      tech: ["HTML5", "CSS3", "JavaScript", "JSON Store", "Responsive"],
      link: "https://debajyotisamanta.github.io/Personal-Book-Library/",
    },
    {
      img: project1,
      title: "Responsive Web Page Design",
      tag: "Web",
      tagColor: "chip-violet",
      desc: "Visually stunning responsive web page showcasing modern design principles, fluid typography, and premium sections.",
      tech: ["HTML5", "CSS3", "Responsive", "UI/UX", "Vanilla JS"],
      link: "https://debajyotisamanta.github.io/CODECANVAS/",
    },
    {
      img: project2,
      title: "Responsive Landing Page",
      tag: "Web",
      tagColor: "chip-violet",
      desc: "Sleek landing page with modern aesthetics, clean grids, and smooth scrolling animations for an engaging experience.",
      tech: ["HTML5", "CSS3", "Animations", "UI/UX", "Mobile First"],
      link: "https://debajyotisamanta.github.io/CodeClauseInternship_ResponsiveLandingPage/",
    },
    {
      img: project3,
      title: "Age Calculator Studio",
      tag: "Web",
      tagColor: "chip-violet",
      desc: "Intuitive age calculator web app — precise time calculation results with a clean, glassmorphic layout.",
      tech: ["HTML5", "CSS3", "JavaScript", "DateTime API", "Glassmorphism"],
      link: "https://code-alpha-project-age-calculator-tau.vercel.app/",
    },
    {
      img: project5,
      title: "Event Management System",
      tag: "Web",
      tagColor: "chip-violet",
      desc: "Comprehensive event management system — create, manage and track events with detailed client listings.",
      tech: ["HTML5", "CSS3", "JavaScript", "LocalDB", "Event Planning"],
      link: "https://debajyotisamanta.github.io/CodeClauseInternship_Event_management_System/",
    },
  ];

  // Filter projects by category
  const filteredProjects = activeCategory === "All"
    ? allProjects
    : allProjects.filter(p => p.tag === activeCategory);

  // Trigger brief fade-out transition when active index changes
  useEffect(() => {
    setIsTransitioning(true);
    const timer = setTimeout(() => setIsTransitioning(false), 300);
    return () => clearTimeout(timer);
  }, [activeIndex]);

  const selectCategory = (cat) => {
    setActiveCategory(cat);
    setActiveIndex(0);
  };

  const activeProject = filteredProjects[activeIndex] || filteredProjects[0] || allProjects[0];

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % filteredProjects.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + filteredProjects.length) % filteredProjects.length);
  };

  return (
    <section
      id="projects"
      className="dot-grid section-kv"
      style={{ background: "var(--bg-surface)", position: "relative", overflow: "hidden" }}
    >
      {/* Background Glow */}
      <div style={{
        position: "absolute", top: "10%", right: "-5%",
        width: "500px", height: "500px",
        background: "radial-gradient(circle, rgba(139,92,246,0.06) 0%, transparent 70%)",
        borderRadius: "50%", pointerEvents: "none",
      }} />

      <div style={{ maxWidth: "1200px", margin: "0 auto", position: "relative", zIndex: 1 }}>

        {/* Section Header */}
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <span className="section-overline">Featured Work</span>
          <h2 style={{
            fontSize: "clamp(2.4rem, 5vw, 3.8rem)",
            fontWeight: 800, letterSpacing: "-0.04em",
            color: "var(--text-primary)", marginTop: "12px", marginBottom: "16px", lineHeight: 1.1,
          }}>
            Projects Showcase
          </h2>
          <p style={{ color: "var(--text-secondary)", fontSize: "1rem", maxWidth: "520px", margin: "0 auto" }}>
            Explore an interactive cinematic gallery of my web and full-stack creations
          </p>
        </div>

        {/* Floating Category Filter Dock */}
        <div style={{
          display: "flex",
          justifyContent: "center",
          gap: "8px",
          marginBottom: "40px",
          background: "rgba(10, 15, 30, 0.35)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(255, 255, 255, 0.08)",
          borderRadius: "9999px",
          padding: "8px",
          width: "fit-content",
          margin: "0 auto 40px auto",
          boxShadow: "0 15px 35px rgba(0,0,0,0.25)"
        }}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => selectCategory(cat)}
              style={{
                padding: "8px 20px",
                background: activeCategory === cat ? "rgba(255, 255, 255, 0.08)" : "transparent",
                border: "1px solid",
                borderColor: activeCategory === cat ? "rgba(255, 255, 255, 0.15)" : "transparent",
                borderRadius: "9999px",
                color: activeCategory === cat ? "white" : "var(--text-secondary)",
                cursor: "pointer",
                fontSize: "0.85rem",
                fontWeight: 600,
                transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
                outline: "none",
                boxShadow: activeCategory === cat ? "0 0 12px rgba(255,255,255,0.08)" : "none"
              }}
              onMouseEnter={(e) => {
                if (activeCategory !== cat) {
                  e.currentTarget.style.background = "rgba(255, 255, 255, 0.04)";
                  e.currentTarget.style.color = "white";
                }
              }}
              onMouseLeave={(e) => {
                if (activeCategory !== cat) {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.color = "var(--text-secondary)";
                }
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Master Cinema Showcase Console */}
        <div className="glass-card" style={{
          display: "grid",
          gridTemplateColumns: "1.1fr 0.9fr",
          gap: "48px",
          padding: "48px",
          borderRadius: "32px",
          boxShadow: "0 40px 80px rgba(0, 0, 0, 0.55)",
          marginBottom: "40px",
          position: "relative",
          overflow: "hidden",
          alignItems: "center",
          border: "1px solid rgba(255, 255, 255, 0.1)"
        }}>
          {/* Dynamic Radial glow based on active category */}
          <div style={{
            position: "absolute",
            top: "-30%",
            left: "-20%",
            width: "500px",
            height: "500px",
            background: "radial-gradient(circle, rgba(139,92,246,0.15) 0%, transparent 70%)",
            borderRadius: "50%",
            pointerEvents: "none",
            zIndex: 0
          }} />

          {/* Left Visual Column */}
          <div style={{
            position: "relative",
            borderRadius: "24px",
            overflow: "hidden",
            boxShadow: "0 25px 50px rgba(0, 0, 0, 0.5)",
            border: "1px solid rgba(255, 255, 255, 0.12)",
            height: "360px",
            zIndex: 1,
            opacity: isTransitioning ? 0 : 1,
            transform: isTransitioning ? "scale(0.97)" : "scale(1)",
            transition: "opacity 0.3s ease, transform 0.3s ease",
          }}>
            <img
              src={activeProject.img}
              alt={activeProject.title}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                transition: "transform 8s ease",
              }}
              className="showcase-img"
            />
            {/* Dark glassmorphic gradient overlay */}
            <div style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(to top, rgba(10, 15, 30, 0.7) 0%, transparent 60%)",
            }} />
            {/* Category tag */}
            <span style={{
              position: "absolute",
              top: "20px",
              left: "20px",
              padding: "6px 14px",
              background: "rgba(10, 15, 30, 0.65)",
              border: "1px solid rgba(255,255,255,0.15)",
              backdropFilter: "blur(10px)",
              borderRadius: "9999px",
              fontSize: "0.72rem",
              fontWeight: 700,
              color: "white",
              letterSpacing: "0.05em",
              textTransform: "uppercase"
            }}>
              ✦ {activeProject.tag}
            </span>
          </div>

          {/* Right Details Column */}
          <div style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            zIndex: 1,
            opacity: isTransitioning ? 0 : 1,
            transform: isTransitioning ? "translateY(10px)" : "translateY(0)",
            transition: "opacity 0.3s ease, transform 0.3s ease",
          }}>
            <h3 style={{
              fontSize: "2rem",
              fontWeight: 800,
              color: "var(--text-primary)",
              marginBottom: "20px",
              letterSpacing: "-0.03em",
              lineHeight: 1.15
            }}>
              {activeProject.title}
            </h3>
            
            <p style={{
              fontSize: "0.98rem",
              color: "var(--text-secondary)",
              lineHeight: 1.7,
              marginBottom: "32px",
            }}>
              {activeProject.desc}
            </p>

            <h4 style={{
              fontSize: "0.72rem",
              fontWeight: 800,
              textTransform: "uppercase",
              letterSpacing: "0.15em",
              color: "var(--text-muted)",
              marginBottom: "16px"
            }}>
              Technologies Utilized ✦
            </h4>

            {/* Tech badges */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "40px" }}>
              {activeProject.tech?.map((t, idx) => (
                <span key={idx} style={{
                  padding: "6px 16px",
                  background: "rgba(255, 255, 255, 0.05)",
                  border: "1px solid rgba(255, 255, 255, 0.10)",
                  borderRadius: "9999px",
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  color: "white",
                  letterSpacing: "0.02em",
                  boxShadow: "0 4px 10px rgba(0,0,0,0.15)"
                }}>
                  {t}
                </span>
              ))}
            </div>

            {/* View Live button */}
            <a
              href={activeProject.link}
              target="_blank"
              rel="noreferrer"
              className="btn-primary"
              style={{
                alignSelf: "flex-start",
                padding: "14px 32px",
                fontSize: "0.95rem",
                boxShadow: "0 10px 30px rgba(139,92,246,0.4)"
              }}
            >
              Launch App <i className="ri-arrow-right-up-line"></i>
            </a>
          </div>
        </div>

        {/* Bottom Floating Selector Dock */}
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "16px",
          background: "rgba(10, 15, 30, 0.25)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(255, 255, 255, 0.08)",
          borderRadius: "28px",
          padding: "14px 20px",
          boxShadow: "0 20px 40px rgba(0,0,0,0.3)"
        }}>
          {/* Prev project */}
          <button
            onClick={handlePrev}
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              color: "white",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "1.2rem",
              transition: "all 0.3s ease",
              outline: "none",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.08)";
              e.currentTarget.style.transform = "scale(1.05)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.04)";
              e.currentTarget.style.transform = "scale(1)";
            }}
          >
            <i className="ri-arrow-left-s-line"></i>
          </button>

          {/* Thumbnail list container */}
          <div style={{
            display: "flex",
            gap: "12px",
            flex: 1,
            overflowX: "auto",
            padding: "4px 0",
            scrollbarWidth: "none", // Firefox
            msOverflowStyle: "none", // IE
          }} className="dock-scrollbar">
            {filteredProjects.map((p, idx) => {
              const isActive = activeIndex === idx;
              return (
                <div
                  key={idx}
                  onClick={() => setActiveIndex(idx)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    padding: "8px 16px",
                    background: isActive ? "rgba(255, 255, 255, 0.08)" : "transparent",
                    border: "1px solid",
                    borderColor: isActive ? "rgba(255, 255, 255, 0.16)" : "transparent",
                    borderRadius: "16px",
                    cursor: "pointer",
                    transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
                    flexShrink: 0,
                    boxShadow: isActive ? "0 8px 24px rgba(0,0,0,0.3)" : "none",
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.background = "rgba(255, 255, 255, 0.03)";
                      e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.06)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.background = "transparent";
                      e.currentTarget.style.borderColor = "transparent";
                    }
                  }}
                >
                  <img
                    src={p.img}
                    alt={p.title}
                    style={{
                      width: "40px",
                      height: "28px",
                      objectFit: "cover",
                      borderRadius: "8px",
                      border: "1px solid rgba(255,255,255,0.08)",
                      opacity: isActive ? 1 : 0.7,
                      transition: "opacity 0.3s ease"
                    }}
                  />
                  <span style={{
                    fontSize: "0.78rem",
                    fontWeight: 600,
                    color: isActive ? "white" : "var(--text-secondary)",
                    whiteSpace: "nowrap"
                  }}>
                    {p.title.split("—")[0].split("-")[0].trim()}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Next project */}
          <button
            onClick={handleNext}
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              color: "white",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "1.2rem",
              transition: "all 0.3s ease",
              outline: "none",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.08)";
              e.currentTarget.style.transform = "scale(1.05)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.04)";
              e.currentTarget.style.transform = "scale(1)";
            }}
          >
            <i className="ri-arrow-right-s-line"></i>
          </button>
        </div>

      </div>

      <style>{`
        .dock-scrollbar::-webkit-scrollbar {
          display: none;
        }
        @media (max-width: 900px) {
          .glass-card { grid-template-columns: 1fr !important; gap: 24px !important; padding: 28px !important; }
          .showcase-img { height: 260px !important; }
        }
      `}</style>
    </section>
  )
}