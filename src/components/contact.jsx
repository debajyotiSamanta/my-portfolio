import { useRef, useState } from "react";
import { usePortfolio } from "../context/PortfolioContext";

export default function Contact() {
  const { portfolioData, addMessage } = usePortfolio();
  const personal = portfolioData?.personal || {};
  const socials  = portfolioData?.socials || [];
  const contactConfig = portfolioData?.contact || {};

  const nameRef    = useRef();
  const emailRef   = useRef();
  const subjectRef = useRef();
  const msgBodyRef = useRef();
  const statusRef  = useRef();
  const [sending, setSending] = useState(false);

  const infoCards = [
    {
      icon: "ri-mail-line",
      label: "Email Me",
      value: personal.email || "debajyotisamanta2003@gmail.com",
      href: `mailto:${personal.email || "debajyotisamanta2003@gmail.com"}`,
      accent: "var(--clr-primary-dim)",
      glow: "rgba(124,58,237,0.25)",
      bg: "rgba(124,58,237,0.08)",
      border: "rgba(124,58,237,0.20)",
    },
    {
      icon: "ri-whatsapp-line",
      label: "WhatsApp",
      value: personal.whatsapp || "+91 9564 555 918",
      href: personal.whatsappUrl || "https://api.whatsapp.com/send?phone=919564555918&text=Hello!",
      accent: "var(--clr-green-dim)",
      glow: "rgba(16,185,129,0.22)",
      bg: "rgba(16,185,129,0.06)",
      border: "rgba(16,185,129,0.18)",
    },
    {
      icon: "ri-map-pin-2-line",
      label: "Location",
      value: personal.location || "West Bengal, India",
      href: null,
      accent: "var(--clr-cyan-bright)",
      glow: "rgba(6,182,212,0.20)",
      bg: "rgba(6,182,212,0.06)",
      border: "rgba(6,182,212,0.18)",
    },
  ];

  const availability = contactConfig.availability || [
    "Freelance Projects",
    "Full-time Roles",
    "Open Source",
    "Collaborations"
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    const name    = nameRef.current?.value?.trim();
    const email   = emailRef.current?.value?.trim();
    const subject = subjectRef.current?.value?.trim();
    const message = msgBodyRef.current?.value?.trim();

    if (!name || !email || !subject) {
      if (statusRef.current) {
        statusRef.current.textContent = "⚠ Please fill all required fields.";
        statusRef.current.style.color = "#f87171";
      }
      return;
    }

    setSending(true);

    // Save message directly to owner's inbox in real-time
    addMessage({ name, email, subject, message });

    setTimeout(() => {
      setSending(false);
      if (statusRef.current) {
        statusRef.current.textContent = "✓ Message successfully sent and stored in inbox! I'll reply within 24 hours.";
        statusRef.current.style.color = "var(--clr-green-dim)";
      }
      if (nameRef.current)    nameRef.current.value = "";
      if (emailRef.current)   emailRef.current.value = "";
      if (subjectRef.current) subjectRef.current.value = "";
      if (msgBodyRef.current) msgBodyRef.current.value = "";
      setTimeout(() => {
        if (statusRef.current) statusRef.current.textContent = "";
      }, 6000);
    }, 700);
  };

  return (
    <section
      id="contact"
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
        position: "absolute", top: "10%", left: "-8%",
        width: "550px", height: "550px",
        background: "radial-gradient(circle, rgba(124,58,237,0.10) 0%, transparent 65%)",
        borderRadius: "50%", pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", bottom: "10%", right: "-8%",
        width: "500px", height: "500px",
        background: "radial-gradient(circle, rgba(6,182,212,0.08) 0%, transparent 65%)",
        borderRadius: "50%", pointerEvents: "none",
      }} />

      <div style={{ maxWidth: "1140px", margin: "0 auto", position: "relative", zIndex: 1 }}>

        {/* Section Header */}
        <div style={{ textAlign: "center", marginBottom: "64px" }}>
          <span className="section-overline">Initiate Dialogue</span>
          <h2 className="section-title">
            Get In Touch
          </h2>
          <p className="section-subtitle">
            {contactConfig.subheading || "Have a project in mind, need a full-stack engineer, or want to collaborate? My inbox is always open."}
          </p>
        </div>

        {/* Two-Column Grid */}
        <div
          className="contact-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1.3fr",
            gap: "48px",
            alignItems: "start",
          }}
        >
          {/* ── Left Column: Contact Cards ── */}
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>

            {/* Availability pill */}
            <div
              className="glass-card"
              style={{ padding: "20px 22px", borderRadius: "18px" }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
                <span className="live-dot" />
                <span style={{
                  fontSize: "0.74rem", fontWeight: 700,
                  color: "var(--clr-cyan-bright)", fontFamily: "var(--font-mono)",
                  letterSpacing: "0.10em", textTransform: "uppercase",
                }}>
                  Current Availability
                </span>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                {availability.map((tag, i) => (
                  <span
                    key={i}
                    style={{
                      padding: "4px 12px",
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid var(--border-ghost)",
                      borderRadius: "999px",
                      fontSize: "0.74rem", color: "var(--text-secondary)",
                      fontFamily: "var(--font-mono)",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Direct Cards */}
            {infoCards.map((c, i) => (
              <div
                key={i}
                className="glass-card"
                style={{
                  padding: "20px 22px",
                  borderRadius: "18px",
                  display: "flex", alignItems: "center", gap: "16px",
                  transition: "all 0.3s ease",
                  cursor: c.href ? "pointer" : "default",
                }}
                onClick={() => { if (c.href) window.open(c.href, "_blank"); }}
              >
                <div style={{
                  width: "48px", height: "48px", borderRadius: "14px",
                  background: c.bg, border: `1px solid ${c.border}`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: c.accent, fontSize: "1.25rem",
                  boxShadow: `0 0 20px ${c.glow}`,
                  flexShrink: 0,
                }}>
                  <i className={c.icon} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <span style={{
                    fontSize: "0.72rem", color: "var(--text-muted)",
                    fontFamily: "var(--font-mono)", textTransform: "uppercase",
                    letterSpacing: "0.08em", display: "block",
                  }}>
                    {c.label}
                  </span>
                  <span style={{
                    fontSize: "0.90rem", fontWeight: 600, color: "var(--text-primary)",
                    whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
                    display: "block", marginTop: "2px",
                  }}>
                    {c.value}
                  </span>
                </div>
                {c.href && (
                  <i className="ri-arrow-right-up-line" style={{ color: "var(--text-muted)", fontSize: "1.1rem" }} />
                )}
              </div>
            ))}

            {/* Socials Link Row */}
            <div
              className="glass-card"
              style={{
                padding: "20px 22px",
                borderRadius: "18px",
                display: "flex", alignItems: "center", justifyContent: "space-between",
              }}
            >
              <span style={{ fontSize: "0.80rem", color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>
                Social Channels
              </span>
              <div style={{ display: "flex", gap: "8px" }}>
                {socials.map((s, i) => (
                  <a
                    key={s.id || i}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.name}
                    style={{
                      width: "36px", height: "36px", borderRadius: "10px",
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid var(--border-ghost)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      color: "var(--text-muted)", fontSize: "1.05rem",
                      textDecoration: "none", transition: "all 0.25s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = s.color;
                      e.currentTarget.style.background = `${s.color}15`;
                      e.currentTarget.style.borderColor = `${s.color}40`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = "var(--text-muted)";
                      e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                      e.currentTarget.style.borderColor = "var(--border-ghost)";
                    }}
                  >
                    <i className={s.icon} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* ── Right Column: Message Form ── */}
          <div
            className="glass-card"
            style={{ padding: "36px 32px", borderRadius: "24px" }}
          >
            <h3 style={{
              fontSize: "1.25rem", fontWeight: 700, color: "var(--text-primary)",
              fontFamily: "var(--font-display)", marginBottom: "8px",
            }}>
              Send a Message
            </h3>
            <p style={{
              fontSize: "0.85rem", color: "var(--text-muted)",
              marginBottom: "26px", lineHeight: 1.6,
            }}>
              Fill out this form and I will get back to your email within 24 hours.
            </p>

            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }} className="form-two-col">
                <div>
                  <label style={{ fontSize: "0.75rem", color: "var(--text-muted)", display: "block", marginBottom: "6px" }}>
                    Your Name *
                  </label>
                  <input
                    ref={nameRef}
                    type="text"
                    placeholder="John Doe"
                    required
                    style={formInputStyle}
                  />
                </div>
                <div>
                  <label style={{ fontSize: "0.75rem", color: "var(--text-muted)", display: "block", marginBottom: "6px" }}>
                    Email Address *
                  </label>
                  <input
                    ref={emailRef}
                    type="email"
                    placeholder="john@example.com"
                    required
                    style={formInputStyle}
                  />
                </div>
              </div>

              <div>
                <label style={{ fontSize: "0.75rem", color: "var(--text-muted)", display: "block", marginBottom: "6px" }}>
                  Subject *
                </label>
                <input
                  ref={subjectRef}
                  type="text"
                  placeholder="Project Collaboration / Opportunity"
                  required
                  style={formInputStyle}
                />
              </div>

              <div>
                <label style={{ fontSize: "0.75rem", color: "var(--text-muted)", display: "block", marginBottom: "6px" }}>
                  Message *
                </label>
                <textarea
                  ref={msgBodyRef}
                  rows={4}
                  placeholder="Tell me about your project, timeline, or idea..."
                  required
                  style={{ ...formInputStyle, resize: "vertical" }}
                />
              </div>

              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "12px", marginTop: "4px" }}>
                <button
                  type="submit"
                  disabled={sending}
                  className="btn-primary"
                  style={{ padding: "12px 28px", fontSize: "0.88rem", gap: "8px" }}
                >
                  {sending ? (
                    <>
                      <i className="ri-loader-4-line animate-spin" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <span>Transmit Message</span>
                      <i className="ri-send-plane-fill" />
                    </>
                  )}
                </button>

                <div
                  ref={statusRef}
                  style={{ fontSize: "0.80rem", fontWeight: 600, minHeight: "20px" }}
                />
              </div>
            </form>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .contact-grid {
            grid-template-columns: 1fr !important;
            gap: 36px !important;
          }
          .form-two-col {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}

const formInputStyle = {
  width: "100%",
  padding: "12px 16px",
  background: "rgba(255,255,255,0.04)",
  border: "1px solid var(--border-subtle)",
  borderRadius: "12px",
  color: "white",
  fontSize: "0.88rem",
  fontFamily: "var(--font-body)",
  outline: "none",
  boxSizing: "border-box",
  transition: "all 0.25s ease",
};
