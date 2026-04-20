import { useRef } from "react";

export default function Contact() {
  const nameRef    = useRef();
  const emailRef   = useRef();
  const subjectRef = useRef();
  const projectRef = useRef();
  const msgRef     = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    const name    = nameRef.current?.value;
    const email   = emailRef.current?.value;
    const subject = subjectRef.current?.value;

    if (!name || !email || !subject) {
      if (msgRef.current) {
        msgRef.current.textContent = "Please fill all required fields.";
        msgRef.current.style.color = "#f87171";
      }
    } else {
      if (msgRef.current) {
        msgRef.current.textContent = "✦ Message sent successfully!";
        msgRef.current.style.color = "#6ee7b7";
      }
      setTimeout(() => {
        if (msgRef.current) msgRef.current.textContent = "";
        if (nameRef.current) nameRef.current.value = "";
        if (emailRef.current) emailRef.current.value = "";
        if (subjectRef.current) subjectRef.current.value = "";
        if (projectRef.current) projectRef.current.value = "";
      }, 4000);
    }
  };

  const infoCards = [
    {
      icon: "ri-mail-line",
      label: "Email Me",
      value: "debajyotisamanta2003@gmail.com",
      href: "mailto:debajyotisamanta2003@gmail.com",
      accent: "var(--clr-primary-dim)",
      glow: "rgba(124,58,237,0.25)",
      bg: "rgba(124,58,237,0.08)",
    },
    {
      icon: "ri-whatsapp-line",
      label: "WhatsApp",
      value: "+91 9564555918",
      href: "https://api.whatsapp.com/send?phone=919564555918&text=Hello!",
      accent: "#6ee7b7",
      glow: "rgba(52,211,153,0.20)",
      bg: "rgba(52,211,153,0.06)",
    },
    {
      icon: "ri-map-pin-line",
      label: "Based In",
      value: "West Bengal, India 🇮🇳",
      href: null,
      accent: "var(--clr-cyan)",
      glow: "rgba(76,215,246,0.20)",
      bg: "rgba(76,215,246,0.06)",
    },
  ];

  const socials = [
    { href: "https://www.linkedin.com/in/debajyoti-samanta-b49b292b5/", icon: "ri-linkedin-box-fill", color: "#0A66C2" },
    { href: "https://github.com/debajyotiSamanta",                       icon: "ri-github-fill",           color: "#6e5494" },
    { href: "https://www.instagram.com/unique_engineer_07/",              icon: "ri-instagram-fill",        color: "#E1306C" },
    { href: "https://www.facebook.com/debajyoti.samanta.588680",          icon: "ri-facebook-circle-fill",  color: "#1877F2" },
  ];

  const availability = ["Freelance Projects", "Full-time Roles", "Collaborations"];

  return (
    <section
      id="contact"
      className="dot-grid section-kv"
      style={{ background: "var(--bg-base)" }}
    >
      <div style={{
        position: "absolute", top: "0", right: "-10%",
        width: "500px", height: "500px",
        background: "radial-gradient(circle, rgba(124,58,237,0.10) 0%, transparent 70%)",
        borderRadius: "50%", pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", bottom: "0", left: "-10%",
        width: "400px", height: "400px",
        background: "radial-gradient(circle, rgba(76,215,246,0.07) 0%, transparent 70%)",
        borderRadius: "50%", pointerEvents: "none",
      }} />

      <div style={{ maxWidth: "1200px", margin: "0 auto", position: "relative", zIndex: 1 }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "64px" }}>
          <span className="section-overline">Say Hello</span>
          <h2 style={{
            fontSize: "clamp(2.2rem, 5vw, 3.8rem)",
            fontWeight: 800, letterSpacing: "-0.04em",
            color: "var(--text-primary)", marginTop: "12px", marginBottom: "16px", lineHeight: 1.1,
          }}>
            Let's Build Something{" "}
            <span className="gradient-text">Extraordinary</span>
          </h2>
          <p style={{ color: "var(--text-secondary)", fontSize: "1rem", maxWidth: "480px", margin: "0 auto" }}>
            Ready to transform your ideas into exceptional digital experiences? Let's connect.
          </p>
        </div>

        {/* 60/40 Split */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.1fr", gap: "40px" }} className="contact-grid">

          {/* LEFT — Contact Info */}
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>

            {/* Info Cards */}
            {infoCards.map((card, i) => {
              const inner = (
                <>
                  <div style={{
                    width: "44px", height: "44px", borderRadius: "10px",
                    background: card.bg, border: `1px solid ${card.glow}`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: card.accent, fontSize: "1.2rem", flexShrink: 0,
                    boxShadow: `0 0 16px ${card.glow}`,
                  }}>
                    <i className={card.icon}></i>
                  </div>
                  <div>
                    <p style={{ fontSize: "0.7rem", color: "var(--text-muted)", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "4px" }}>
                      {card.label}
                    </p>
                    <p style={{ fontSize: "0.9rem", color: card.href ? card.accent : "var(--text-secondary)", fontWeight: 500, wordBreak: "break-all" }}>
                      {card.value}
                    </p>
                  </div>
                </>
              );

              return card.href ? (
                <a
                  key={i}
                  href={card.href}
                  target={card.href.startsWith("mailto") ? undefined : "_blank"}
                  rel="noreferrer"
                  className="glass-card"
                  style={{ display: "flex", alignItems: "center", gap: "16px", padding: "20px 22px", textDecoration: "none" }}
                >
                  {inner}
                </a>
              ) : (
                <div key={i} className="glass-card" style={{ display: "flex", alignItems: "center", gap: "16px", padding: "20px 22px" }}>
                  {inner}
                </div>
              );
            })}

            {/* Socials */}
            <div style={{ display: "flex", gap: "10px", paddingTop: "4px" }}>
              {socials.map((s, i) => (
                <a
                  key={i}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    width: "44px", height: "44px", borderRadius: "50%",
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: "var(--text-secondary)", fontSize: "1.2rem",
                    textDecoration: "none", transition: "all 0.25s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "white";
                    e.currentTarget.style.background = s.color + "28";
                    e.currentTarget.style.borderColor = s.color + "60";
                    e.currentTarget.style.transform = "translateY(-3px)";
                    e.currentTarget.style.boxShadow = `0 0 16px ${s.color}44`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "var(--text-secondary)";
                    e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  <i className={s.icon}></i>
                </a>
              ))}
            </div>

            {/* Availability */}
            <div style={{ paddingTop: "4px" }}>
              <p style={{ fontSize: "0.72rem", color: "var(--text-muted)", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "10px" }}>
                Currently available for
              </p>
              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                {availability.map((a, i) => (
                  <span key={i} className="chip chip-violet">{a}</span>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT — Form */}
          <div
            style={{
              background: "rgba(27,31,44,0.75)",
              border: "1px solid rgba(124,58,237,0.18)",
              borderRadius: "20px",
              padding: "36px 32px",
              backdropFilter: "blur(12px)",
              boxShadow: "0 8px 40px rgba(0,0,0,0.4), 0 0 30px rgba(124,58,237,0.08)",
            }}
          >
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }} className="form-row">
                <div>
                  <label style={{ display: "block", fontSize: "0.78rem", fontWeight: 600, color: "var(--text-secondary)", marginBottom: "8px", letterSpacing: "0.05em" }}>
                    Your Name *
                  </label>
                  <input ref={nameRef} type="text" className="kv-input" placeholder="John Doe" />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "0.78rem", fontWeight: 600, color: "var(--text-secondary)", marginBottom: "8px", letterSpacing: "0.05em" }}>
                    Your Email *
                  </label>
                  <input ref={emailRef} type="email" className="kv-input" placeholder="john@example.com" />
                </div>
              </div>

              <div>
                <label style={{ display: "block", fontSize: "0.78rem", fontWeight: 600, color: "var(--text-secondary)", marginBottom: "8px", letterSpacing: "0.05em" }}>
                  Subject *
                </label>
                <input ref={subjectRef} type="text" id="contact-project" className="kv-input" placeholder="Project inquiry..." />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "0.78rem", fontWeight: 600, color: "var(--text-secondary)", marginBottom: "8px", letterSpacing: "0.05em" }}>
                  Your Message
                </label>
                <textarea
                  ref={projectRef}
                  id="contact-name"
                  rows={5}
                  className="kv-input"
                  placeholder="Tell me about your project, timelines, and goals..."
                  style={{ resize: "vertical", fontFamily: "inherit" }}
                />
              </div>

              <p ref={msgRef} id="contact-message" style={{ minHeight: "1.4rem", fontSize: "0.85rem", fontWeight: 600, textAlign: "center" }} />

              <button type="submit" className="btn-primary" style={{ justifyContent: "center", fontSize: "1rem", padding: "14px 28px" }}>
                Send Message <i className="ri-send-plane-2-line"></i>
              </button>

              <p style={{ textAlign: "center", fontSize: "0.75rem", color: "var(--text-muted)" }}>
                I'll respond within 24 hours ✦
              </p>
            </form>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .contact-grid { grid-template-columns: 1fr !important; }
          .form-row { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
