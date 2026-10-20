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
  const [statusState, setStatusState] = useState(null); // { text, type: 'success' | 'error' }

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

  const triggerStatus = (text, type = "error") => {
    setStatusState({ text, type });
    if (statusRef.current) {
      statusRef.current.textContent = text;
      statusRef.current.style.color = type === "success" ? "var(--clr-green-dim)" : "#f87171";
    }
  };

  const clearStatus = () => {
    setStatusState(null);
    if (statusRef.current) {
      statusRef.current.textContent = "";
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const name    = nameRef.current?.value?.trim();
    const email   = emailRef.current?.value?.trim();
    const subject = subjectRef.current?.value?.trim();
    const message = msgBodyRef.current?.value?.trim();

    if (!name || !email || !subject) {
      triggerStatus("⚠ Please fill all required fields.", "error");
      return;
    }

    setSending(true);
    clearStatus();

    // Save message directly to owner's inbox in real-time
    addMessage({ name, email, subject, message });

    setTimeout(() => {
      setSending(false);
      triggerStatus("✓ Message transmitted successfully! I will reply within 24 hours.", "success");

      if (nameRef.current)    nameRef.current.value = "";
      if (emailRef.current)   emailRef.current.value = "";
      if (subjectRef.current) subjectRef.current.value = "";
      if (msgBodyRef.current) msgBodyRef.current.value = "";

      setTimeout(() => {
        clearStatus();
      }, 6000);
    }, 700);
  };

  return (
    <section
      id="contact"
      className="dot-grid section-kv contact-section"
    >
      {/* Background orbs */}
      <div className="contact-bg-orb orb-violet" />
      <div className="contact-bg-orb orb-cyan" />

      <div className="contact-container">

        {/* Section Header */}
        <div className="contact-header">
          <span className="section-overline">Initiate Dialogue</span>
          <h2 className="section-title">
            Get In Touch
          </h2>
          <p className="section-subtitle">
            {contactConfig.subheading || "Have a project in mind, need a full-stack engineer, or want to collaborate? My inbox is always open."}
          </p>
        </div>

        {/* Two-Column / Single-Column Responsive Grid */}
        <div className="contact-grid">
          {/* ── Left Column: Contact Cards ── */}
          <div className="contact-info-col">

            {/* Availability card */}
            <div className="glass-card contact-avail-card">
              <div className="contact-avail-header">
                <span className="live-dot" />
                <span className="contact-avail-title">
                  Current Availability
                </span>
              </div>
              <div className="contact-avail-tags">
                {availability.map((tag, i) => (
                  <span key={i} className="contact-avail-tag">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Direct Info Cards */}
            {infoCards.map((c, i) => (
              <div
                key={i}
                className={`glass-card contact-info-card ${c.href ? "is-clickable" : ""}`}
                role={c.href ? "button" : undefined}
                tabIndex={c.href ? 0 : undefined}
                onClick={() => {
                  if (c.href) {
                    if (c.href.startsWith("mailto:")) {
                      window.location.href = c.href;
                    } else {
                      window.open(c.href, "_blank", "noopener,noreferrer");
                    }
                  }
                }}
                onKeyDown={(e) => {
                  if (c.href && (e.key === "Enter" || e.key === " ")) {
                    e.preventDefault();
                    if (c.href.startsWith("mailto:")) {
                      window.location.href = c.href;
                    } else {
                      window.open(c.href, "_blank", "noopener,noreferrer");
                    }
                  }
                }}
              >
                <div
                  className="card-icon-wrap"
                  style={{
                    background: c.bg,
                    border: `1px solid ${c.border}`,
                    color: c.accent,
                    boxShadow: `0 0 20px ${c.glow}`,
                  }}
                >
                  <i className={c.icon} />
                </div>
                <div className="card-content-wrap">
                  <span className="card-label">
                    {c.label}
                  </span>
                  <span className="card-value">
                    {c.value}
                  </span>
                </div>
                {c.href && (
                  <i className="ri-arrow-right-up-line card-arrow-icon" />
                )}
              </div>
            ))}

            {/* Social Channels Link Row */}
            <div className="glass-card contact-socials-card">
              <span className="contact-socials-title">
                Social Channels
              </span>
              <div className="contact-socials-list">
                {socials.map((s, i) => (
                  <a
                    key={s.id || i}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.name}
                    className="contact-social-btn"
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = s.color;
                      e.currentTarget.style.background = `${s.color}18`;
                      e.currentTarget.style.borderColor = `${s.color}50`;
                      e.currentTarget.style.boxShadow = `0 0 16px ${s.color}35`;
                      e.currentTarget.style.transform = "translateY(-2px)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = "var(--text-muted)";
                      e.currentTarget.style.background = "rgba(255,255,255,0.05)";
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

          {/* ── Right Column: Message Form ── */}
          <div className="glass-card contact-form-card">
            <div className="contact-form-intro">
              <h3 className="contact-form-title">
                Send a Message
              </h3>
              <p className="contact-form-desc">
                Fill out this form and I will get back to your email within 24 hours.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="contact-form">
              <div className="contact-form-grid">
                <div className="contact-form-group">
                  <label htmlFor="contact-name" className="contact-form-label">
                    Your Name <span className="req-star">*</span>
                  </label>
                  <input
                    id="contact-name"
                    ref={nameRef}
                    type="text"
                    placeholder="John Doe"
                    required
                    className="contact-form-input"
                    autoComplete="name"
                  />
                </div>
                <div className="contact-form-group">
                  <label htmlFor="contact-email" className="contact-form-label">
                    Email Address <span className="req-star">*</span>
                  </label>
                  <input
                    id="contact-email"
                    ref={emailRef}
                    type="email"
                    placeholder="john@example.com"
                    required
                    className="contact-form-input"
                    autoComplete="email"
                  />
                </div>
              </div>

              <div className="contact-form-group">
                <label htmlFor="contact-subject" className="contact-form-label">
                  Subject <span className="req-star">*</span>
                </label>
                <input
                  id="contact-subject"
                  ref={subjectRef}
                  type="text"
                  placeholder="Project Collaboration / Opportunity"
                  required
                  className="contact-form-input"
                />
              </div>

              <div className="contact-form-group">
                <label htmlFor="contact-message" className="contact-form-label">
                  Message <span className="req-star">*</span>
                </label>
                <textarea
                  id="contact-message"
                  ref={msgBodyRef}
                  rows={4}
                  placeholder="Tell me about your project, timeline, or idea..."
                  required
                  className="contact-form-input contact-form-textarea"
                />
              </div>

              {/* Action Row: Transmit Button + Status */}
              <div className="contact-actions-wrap">
                <button
                  type="submit"
                  disabled={sending}
                  className="btn-primary contact-submit-btn"
                  id="contact-submit-btn"
                >
                  {sending ? (
                    <>
                      <i className="ri-loader-4-line animate-spin" />
                      <span>Transmitting...</span>
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
                  className={`contact-status-badge ${statusState ? `status-${statusState.type}` : ""}`}
                  role={statusState ? "status" : undefined}
                  aria-live="polite"
                >
                  {statusState && (
                    <>
                      <i className={statusState.type === "success" ? "ri-checkbox-circle-fill" : "ri-error-warning-fill"} />
                      <span>{statusState.text}</span>
                    </>
                  )}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      <style>{`
        /* Contact Section Styling */
        .contact-section {
          background: var(--bg-base);
          position: relative;
          overflow: hidden;
          padding: 100px 24px;
        }

        .contact-bg-orb {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
        }
        .orb-violet {
          top: 10%;
          left: -8%;
          width: 550px;
          height: 550px;
          background: radial-gradient(circle, rgba(124,58,237,0.10) 0%, transparent 65%);
        }
        .orb-cyan {
          bottom: 10%;
          right: -8%;
          width: 500px;
          height: 500px;
          background: radial-gradient(circle, rgba(6,182,212,0.08) 0%, transparent 65%);
        }

        .contact-container {
          max-width: 1140px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }

        .contact-header {
          text-align: center;
          margin-bottom: 56px;
        }

        .contact-grid {
          display: grid;
          grid-template-columns: 1fr 1.3fr;
          gap: 40px;
          align-items: start;
        }

        .contact-info-col {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        /* Availability Card */
        .contact-avail-card {
          padding: 20px 22px;
          border-radius: 18px;
        }
        .contact-avail-header {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 12px;
        }
        .contact-avail-title {
          font-size: 0.74rem;
          font-weight: 700;
          color: var(--clr-cyan-bright);
          font-family: var(--font-mono);
          letter-spacing: 0.10em;
          text-transform: uppercase;
        }
        .contact-avail-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }
        .contact-avail-tag {
          padding: 4px 12px;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid var(--border-ghost);
          border-radius: 999px;
          font-size: 0.74rem;
          color: var(--text-secondary);
          font-family: var(--font-mono);
          letter-spacing: 0.02em;
        }

        /* Direct Info Cards */
        .contact-info-card {
          padding: 20px 22px;
          border-radius: 18px;
          display: flex;
          align-items: center;
          gap: 16px;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          user-select: none;
        }
        .contact-info-card.is-clickable {
          cursor: pointer;
        }
        .contact-info-card.is-clickable:hover {
          transform: translateY(-2px);
          border-color: rgba(255, 255, 255, 0.16);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.35);
        }
        .card-icon-wrap {
          width: 48px;
          height: 48px;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.25rem;
          flex-shrink: 0;
          transition: transform 0.25s ease;
        }
        .contact-info-card:hover .card-icon-wrap {
          transform: scale(1.06);
        }
        .card-content-wrap {
          flex: 1;
          min-width: 0;
        }
        .card-label {
          font-size: 0.72rem;
          color: var(--text-muted);
          font-family: var(--font-mono);
          text-transform: uppercase;
          letter-spacing: 0.08em;
          display: block;
        }
        .card-value {
          font-size: 0.90rem;
          font-weight: 600;
          color: var(--text-primary);
          display: block;
          margin-top: 2px;
          word-break: break-word;
          overflow-wrap: anywhere;
        }
        .card-arrow-icon {
          color: var(--text-muted);
          font-size: 1.15rem;
          flex-shrink: 0;
          transition: all 0.25s ease;
        }
        .contact-info-card:hover .card-arrow-icon {
          color: var(--text-primary);
          transform: translate(2px, -2px);
        }

        /* Social Channels Card */
        .contact-socials-card {
          padding: 20px 22px;
          border-radius: 18px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 12px;
        }
        .contact-socials-title {
          font-size: 0.80rem;
          color: var(--text-muted);
          font-family: var(--font-mono);
          letter-spacing: 0.05em;
          text-transform: uppercase;
        }
        .contact-socials-list {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
          align-items: center;
        }
        .contact-social-btn {
          width: 38px;
          height: 38px;
          border-radius: 10px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid var(--border-ghost);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-muted);
          font-size: 1.05rem;
          text-decoration: none;
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }

        /* Right Column: Form */
        .contact-form-card {
          padding: 36px 32px;
          border-radius: 24px;
        }
        .contact-form-title {
          font-size: 1.30rem;
          font-weight: 700;
          color: var(--text-primary);
          font-family: var(--font-display);
          margin-bottom: 6px;
          letter-spacing: -0.01em;
        }
        .contact-form-desc {
          font-size: 0.86rem;
          color: var(--text-muted);
          margin-bottom: 24px;
          line-height: 1.55;
        }
        .contact-form {
          display: flex;
          flex-direction: column;
          gap: 18px;
        }
        .contact-form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px;
        }
        .contact-form-group {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .contact-form-label {
          font-size: 0.75rem;
          color: var(--text-secondary);
          font-family: var(--font-mono);
          letter-spacing: 0.03em;
          display: flex;
          align-items: center;
          gap: 4px;
        }
        .req-star {
          color: var(--clr-primary-dim);
          font-weight: 700;
        }

        /* Input Controls (16px base font to prevent iOS Safari auto-zoom!) */
        .contact-form-input {
          width: 100%;
          padding: 13px 16px;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid var(--border-subtle);
          border-radius: 12px;
          color: #ffffff;
          font-size: 16px;
          font-family: var(--font-body);
          outline: none;
          box-sizing: border-box;
          transition: border-color 0.25s ease, background-color 0.25s ease, box-shadow 0.25s ease;
          -webkit-appearance: none;
          appearance: none;
        }
        .contact-form-input:focus {
          border-color: var(--clr-primary-dim);
          background: rgba(124, 58, 237, 0.06);
          box-shadow: 0 0 0 3px rgba(124, 58, 237, 0.22), 0 4px 16px rgba(0, 0, 0, 0.35);
        }
        .contact-form-input::placeholder {
          color: var(--text-muted);
          opacity: 0.75;
          font-size: 0.88rem;
        }
        .contact-form-textarea {
          resize: vertical;
          min-height: 110px;
          line-height: 1.5;
        }

        /* Actions Row & Transmit Button */
        .contact-actions-wrap {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 14px;
          margin-top: 6px;
        }

        .btn-primary.contact-submit-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          padding: 13px 30px !important;
          min-height: 48px;
          background: linear-gradient(135deg, var(--clr-primary) 0%, #5b21b6 100%);
          color: #ffffff;
          font-family: var(--font-body);
          font-weight: 700;
          font-size: 0.92rem !important;
          letter-spacing: 0.02em;
          border: none;
          border-radius: var(--r-full);
          cursor: pointer;
          position: relative;
          overflow: hidden;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          box-shadow: 0 4px 24px var(--clr-primary-glow), inset 0 1px 0 rgba(255, 255, 255, 0.2);
          touch-action: manipulation;
          -webkit-tap-highlight-color: transparent;
        }
        .btn-primary.contact-submit-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 10px 30px var(--clr-primary-glow), 0 0 20px rgba(139, 92, 246, 0.4);
          background: linear-gradient(135deg, #8b5cf6 0%, var(--clr-primary) 100%);
        }
        .btn-primary.contact-submit-btn:active:not(:disabled) {
          transform: scale(0.98);
        }
        .btn-primary.contact-submit-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        /* Status Badge */
        .contact-status-badge {
          font-size: 0.82rem;
          font-weight: 600;
          min-height: 20px;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          transition: all 0.3s ease;
        }
        .contact-status-badge.status-success {
          color: var(--clr-green-dim);
          background: rgba(16, 185, 129, 0.12);
          border: 1px solid rgba(16, 185, 129, 0.28);
          padding: 8px 14px;
          border-radius: 10px;
          box-shadow: 0 0 16px rgba(16, 185, 129, 0.15);
        }
        .contact-status-badge.status-error {
          color: #f87171;
          background: rgba(239, 68, 68, 0.12);
          border: 1px solid rgba(239, 68, 68, 0.28);
          padding: 8px 14px;
          border-radius: 10px;
        }

        /* ── RESPONSIVE MEDIA QUERIES ── */
        @media (max-width: 900px) {
          .contact-section {
            padding: 75px 20px !important;
          }
          .contact-header {
            margin-bottom: 44px !important;
          }
          .contact-grid {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
          }
          .contact-form-grid {
            grid-template-columns: 1fr !important;
          }
        }

        @media (max-width: 640px) {
          .contact-section {
            padding: 55px 16px !important;
          }
          .contact-header {
            margin-bottom: 32px !important;
          }
          .contact-grid {
            gap: 20px !important;
          }
          .contact-form-card {
            padding: 24px 18px !important;
            border-radius: 20px !important;
          }
          .contact-actions-wrap {
            flex-direction: column !important;
            align-items: stretch !important;
            width: 100% !important;
            gap: 12px !important;
            margin-top: 8px !important;
          }
          /* Full-width, pixel-perfect submit button on mobile */
          .btn-primary.contact-submit-btn {
            width: 100% !important;
            display: flex !important;
            justify-content: center !important;
            align-items: center !important;
            padding: 15px 20px !important;
            font-size: 0.95rem !important;
            min-height: 52px !important;
            border-radius: 12px !important;
            box-shadow: 0 6px 24px var(--clr-primary-glow) !important;
          }
          .contact-status-badge {
            width: 100% !important;
            justify-content: center !important;
            text-align: center !important;
            box-sizing: border-box !important;
          }
        }

        @media (max-width: 420px) {
          .contact-section {
            padding: 45px 12px !important;
          }
          .contact-info-card {
            padding: 16px 14px !important;
            gap: 12px !important;
            border-radius: 16px !important;
          }
          .card-icon-wrap {
            width: 40px !important;
            height: 40px !important;
            font-size: 1.1rem !important;
            border-radius: 12px !important;
          }
          .card-value {
            font-size: 0.82rem !important;
          }
          .contact-form-card {
            padding: 20px 14px !important;
            border-radius: 18px !important;
          }
          .contact-socials-card {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 12px !important;
            padding: 16px 14px !important;
          }
          .contact-socials-list {
            width: 100% !important;
            justify-content: flex-start !important;
            gap: 8px !important;
          }
        }
      `}</style>
    </section>
  );
}

