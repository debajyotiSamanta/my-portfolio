import { useState, useId } from "react";
import { usePortfolio } from "../context/PortfolioContext";
import { ASSET_IMAGES } from "../data/portfolioData";

export default function AdminPanel() {
  const {
    portfolioData,
    savePortfolioData,
    isAdmin,
    loginAdmin,
    logoutAdmin,
    updateAdminPin,
    resetToDefaults,
    exportDataJSON,
    importDataJSON,
    resolveImage,
    messages,
    deleteMessage,
    markMessageRead,
    clearAllMessages,
    unreadMessagesCount,
  } = usePortfolio();

  const [isOpen, setIsOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [pinInput, setPinInput] = useState("");
  const [showPin, setShowPin] = useState(false);
  const [authError, setAuthError] = useState("");
  const [activeTab, setActiveTab] = useState("personal");

  // Editable local state
  const [formData, setFormData] = useState(portfolioData);
  const [saveStatus, setSaveStatus] = useState("");
  const [importText, setImportText] = useState("");
  const [editingProjectId, setEditingProjectId] = useState(null);

  // Security tab state
  const [oldPin, setOldPin] = useState("");
  const [newPin, setNewPin] = useState("");
  const [showChangePin, setShowChangePin] = useState(false);
  const [pinMsg, setPinMsg] = useState("");

  const handleOpenManager = () => {
    if (!isAdmin) {
      setShowAuthModal(true);
      setPinInput("");
      setAuthError("");
    } else {
      setFormData(JSON.parse(JSON.stringify(portfolioData)));
      setIsOpen(true);
      setSaveStatus("");
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const res = loginAdmin(pinInput);
    if (res.success) {
      setShowAuthModal(false);
      setFormData(JSON.parse(JSON.stringify(portfolioData)));
      setIsOpen(true);
      setAuthError("");
    } else {
      setAuthError(res.message);
    }
  };

  const handleSaveAll = () => {
    const success = savePortfolioData(formData);
    if (success) {
      setSaveStatus("Changes successfully saved and applied live!");
      setTimeout(() => setSaveStatus(""), 4000);
    } else {
      setSaveStatus("Failed to save changes. Please try again.");
    }
  };

  const handleReset = () => {
    if (window.confirm("Are you sure you want to restore all portfolio data to default settings? Any local customizations will be reverted.")) {
      resetToDefaults();
      setFormData(JSON.parse(JSON.stringify(portfolioData)));
      setSaveStatus("Portfolio reset to original default configuration.");
      setTimeout(() => setSaveStatus(""), 4000);
    }
  };

  const handlePinUpdate = (e) => {
    e.preventDefault();
    const res = updateAdminPin(oldPin, newPin);
    if (res.success) {
      setPinMsg("Security PIN successfully updated!");
      setOldPin("");
      setNewPin("");
    } else {
      setPinMsg(`Error: ${res.message}`);
    }
    setTimeout(() => setPinMsg(""), 5000);
  };

  // ── Project Helpers ──
  const handleAddProject = () => {
    const newId = `proj-${Date.now()}`;
    const newProj = {
      id: newId,
      title: "New Web Project",
      subtitle: "Full-Stack Web Application",
      tag: "Full-Stack",
      chip: "chip-cyan",
      desc: "Describe the key features, architecture, and purpose of this project here.",
      tech: ["React", "Node.js", "Express", "Tailwind CSS"],
      link: "https://your-live-demo.vercel.app",
      imgKey: "mentorship",
      accentColor: "#22d3ee",
      featured: false,
    };
    setFormData((prev) => ({
      ...prev,
      projects: [newProj, ...prev.projects],
    }));
    setEditingProjectId(newId);
  };

  const handleDeleteProject = (id) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      setFormData((prev) => ({
        ...prev,
        projects: prev.projects.filter((p) => p.id !== id),
      }));
    }
  };

  // ── Skill Helpers ──
  const handleAddSkill = (catIdx) => {
    const newSkill = { name: "New Skill", level: 80, icon: "ri-code-line" };
    setFormData((prev) => {
      const cats = [...prev.skillsCategories];
      cats[catIdx].skills = [...cats[catIdx].skills, newSkill];
      return { ...prev, skillsCategories: cats };
    });
  };

  const handleDeleteSkill = (catIdx, skillIdx) => {
    setFormData((prev) => {
      const cats = [...prev.skillsCategories];
      cats[catIdx].skills = cats[catIdx].skills.filter((_, i) => i !== skillIdx);
      return { ...prev, skillsCategories: cats };
    });
  };

  // ── Document Upload Helper (Resume & CV) ──
  const handlePdfUpload = (e, fieldKey, nameKey, defaultName) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (uploadEvent) => {
      const base64 = uploadEvent.target?.result;
      if (base64) {
        setFormData((prev) => ({
          ...prev,
          personal: {
            ...prev.personal,
            [fieldKey]: base64,
            [nameKey]: file.name || defaultName,
          },
        }));
        setSaveStatus(`Uploaded "${file.name}". Click "Save All Changes" to apply live.`);
        setTimeout(() => setSaveStatus(""), 4000);
      }
    };
    reader.readAsDataURL(file);
  };

  // ── Profile Photo Upload & Reset Helpers ──
  const handleAvatarUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (uploadEvent) => {
      const base64 = uploadEvent.target?.result;
      if (base64) {
        setFormData((prev) => ({
          ...prev,
          personal: {
            ...prev.personal,
            avatar: base64,
            avatarKey: "",
          },
        }));
        setSaveStatus(`Profile picture updated to "${file.name}". Click "Save All Changes" to apply live.`);
        setTimeout(() => setSaveStatus(""), 4000);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleResetAvatar = () => {
    setFormData((prev) => ({
      ...prev,
      personal: {
        ...prev.personal,
        avatar: ASSET_IMAGES.myImage,
        avatarKey: "myImage",
      },
    }));
    setSaveStatus("Profile picture reset to default photo.");
    setTimeout(() => setSaveStatus(""), 4000);
  };
  const handleAddTool = () => {
    const newTool = {
      id: `tool-${Date.now()}`,
      name: "New Tool / Framework",
      imgKey: "react",
      hue: "#22d3ee",
      icon: "ri-code-box-line",
    };
    setFormData((prev) => ({
      ...prev,
      frameworksAndTools: [...(prev.frameworksAndTools || []), newTool],
    }));
  };

  const handleDeleteTool = (id) => {
    if (window.confirm("Delete this framework or tool?")) {
      setFormData((prev) => ({
        ...prev,
        frameworksAndTools: (prev.frameworksAndTools || []).filter((t) => t.id !== id),
      }));
    }
  };

  const handleToolIconUpload = (e, index) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (uploadEvent) => {
      const base64 = uploadEvent.target?.result;
      if (base64) {
        setFormData((prev) => {
          const updated = [...(prev.frameworksAndTools || [])];
          updated[index] = {
            ...updated[index],
            img: base64,
            imgKey: "", // clear asset key when custom image is uploaded
          };
          return { ...prev, frameworksAndTools: updated };
        });
      }
    };
    reader.readAsDataURL(file);
  };

  const handleMoveTool = (index, direction) => {
    setFormData((prev) => {
      const list = [...(prev.frameworksAndTools || [])];
      const targetIndex = index + direction;
      if (targetIndex < 0 || targetIndex >= list.length) return prev;
      const temp = list[index];
      list[index] = list[targetIndex];
      list[targetIndex] = temp;
      return { ...prev, frameworksAndTools: list };
    });
  };

  // ── Experience Helpers ──
  const handleAddExperience = () => {
    const newExp = {
      id: `exp-${Date.now()}`,
      title: "New Role / Position",
      institution: "Organization or Club Name",
      period: "2024 – Present",
      description: "Describe your responsibilities, leadership, and accomplishments.",
      icon: "ri-briefcase-line",
      accent: "var(--clr-primary-dim)",
      glow: "rgba(124,58,237,0.25)",
      bg: "rgba(124,58,237,0.08)",
      border: "rgba(124,58,237,0.22)",
      chip: "chip-violet",
    };
    setFormData((prev) => ({
      ...prev,
      experience: [...prev.experience, newExp],
    }));
  };

  const handleDeleteExperience = (id) => {
    if (window.confirm("Delete this experience entry?")) {
      setFormData((prev) => ({
        ...prev,
        experience: prev.experience.filter((e) => e.id !== id),
      }));
    }
  };

  // ── Education Helpers ──
  const handleAddEducation = () => {
    const newEdu = {
      id: `edu-${Date.now()}`,
      title: "Degree or Certification",
      institution: "University or School Name",
      period: "2023 – 2027",
      score: "Grade / Percentage",
      icon: "ri-graduation-cap-line",
      accent: "var(--clr-cyan-bright)",
      glow: "rgba(6,182,212,0.22)",
      bg: "rgba(6,182,212,0.06)",
      border: "rgba(6,182,212,0.20)",
      chip: "chip-cyan",
    };
    setFormData((prev) => ({
      ...prev,
      education: [...prev.education, newEdu],
    }));
  };

  const handleDeleteEducation = (id) => {
    if (window.confirm("Delete this education entry?")) {
      setFormData((prev) => ({
        ...prev,
        education: prev.education.filter((e) => e.id !== id),
      }));
    }
  };

  // ── Testimonial Helpers ──
  const handleAddTestimonial = () => {
    const newT = {
      id: `test-${Date.now()}`,
      name: "Client or Collaborator Name",
      role: "Position / Company",
      avatar: "CC",
      quote: "Write the recommendation or endorsement quote here.",
      rating: 5,
      accent: "var(--clr-primary-dim)",
      glow: "rgba(124,58,237,0.22)",
      bg: "rgba(124,58,237,0.08)",
      border: "rgba(124,58,237,0.20)",
    };
    setFormData((prev) => ({
      ...prev,
      testimonials: [...(prev.testimonials || []), newT],
    }));
  };

  const handleDeleteTestimonial = (id) => {
    if (window.confirm("Delete this endorsement?")) {
      setFormData((prev) => ({
        ...prev,
        testimonials: prev.testimonials.filter((t) => t.id !== id),
      }));
    }
  };

  return (
    <>
      {/* ── Discreet Owner Pill Trigger (Bottom Right) ── */}
      <div className="admin-trigger-pill">
        {isAdmin && (
          <button
            onClick={logoutAdmin}
            style={{
              padding: "8px 14px",
              background: "rgba(239, 68, 68, 0.20)",
              border: "1px solid rgba(239, 68, 68, 0.40)",
              borderRadius: "999px",
              color: "#fca5a5",
              fontSize: "0.80rem",
              fontWeight: 700,
              cursor: "pointer",
              backdropFilter: "blur(16px)",
              display: "flex",
              alignItems: "center",
              gap: "6px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.4)",
            }}
            title="Lock edit mode so others can only view"
          >
            <i className="ri-lock-line" /> Lock (Visitor View)
          </button>
        )}

        <button
          onClick={handleOpenManager}
          style={{
            padding: "9px 18px",
            background: isAdmin
              ? "linear-gradient(135deg, #7c3aed, #06b6d4)"
              : "rgba(15, 23, 42, 0.90)",
            backdropFilter: "blur(20px)",
            border: isAdmin
              ? "1px solid rgba(255, 255, 255, 0.35)"
              : "1px solid rgba(255, 255, 255, 0.18)",
            borderRadius: "999px",
            color: "#ffffff",
            fontSize: "0.84rem",
            fontWeight: 700,
            cursor: "pointer",
            boxShadow: isAdmin
              ? "0 6px 24px rgba(124,58,237,0.5), 0 0 15px rgba(6,182,212,0.4)"
              : "0 6px 20px rgba(0,0,0,0.6)",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            transition: "all 0.25s ease",
          }}
        >
          <i className={isAdmin ? "ri-dashboard-3-fill" : "ri-shield-keyhole-line"} style={{ fontSize: "1rem" }} />
          <span>{isAdmin ? "Portfolio Manager (Active)" : "Owner Access"}</span>
        </button>
      </div>

      {/* ── PIN Authentication Modal ── */}
      {showAuthModal && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(2, 6, 23, 0.88)",
            backdropFilter: "blur(28px)",
            zIndex: 10002,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
          }}
          onClick={() => setShowAuthModal(false)}
        >
          <div
            style={{
              background: "#0f172a",
              border: "1px solid #334155",
              borderRadius: "20px",
              padding: "clamp(20px, 5vw, 34px)",
              maxWidth: "420px",
              width: "100%",
              boxShadow: "0 25px 60px rgba(0,0,0,0.8), 0 0 40px rgba(124,58,237,0.25)",
              textAlign: "center",
              boxSizing: "border-box",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              style={{
                width: "60px",
                height: "60px",
                borderRadius: "18px",
                background: "rgba(124,58,237,0.20)",
                border: "1px solid rgba(124,58,237,0.40)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 20px",
                color: "#c4b5fd",
                fontSize: "1.8rem",
              }}
            >
              <i className="ri-shield-keyhole-fill" />
            </div>

            <h3 style={{ fontSize: "1.4rem", fontWeight: 800, color: "#f8fafc", marginBottom: "8px", fontFamily: "var(--font-display)" }}>
              Owner Verification
            </h3>
            <p style={{ fontSize: "0.88rem", color: "#94a3b8", lineHeight: 1.6, marginBottom: "24px" }}>
              Only you have access to edit and update your portfolio. Enter your owner security PIN to proceed.
            </p>

            <form onSubmit={handleLogin}>
              <div style={{ position: "relative", marginBottom: "16px" }}>
                <input
                  type={showPin ? "text" : "password"}
                  placeholder="Enter PIN"
                  value={pinInput}
                  onChange={(e) => setPinInput(e.target.value)}
                  autoFocus
                  style={{
                    width: "100%",
                    padding: "14px 44px 14px 16px",
                    background: "#1e293b",
                    border: "1px solid #475569",
                    borderRadius: "12px",
                    color: "#ffffff",
                    fontSize: "1.1rem",
                    outline: "none",
                    textAlign: "center",
                    letterSpacing: "0.2em",
                    boxSizing: "border-box",
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPin(!showPin)}
                  style={{
                    position: "absolute",
                    right: "12px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "transparent",
                    border: "none",
                    color: "#94a3b8",
                    cursor: "pointer",
                    fontSize: "1.1rem",
                  }}
                >
                  <i className={showPin ? "ri-eye-off-line" : "ri-eye-line"} />
                </button>
              </div>

              {authError && (
                <div style={{
                  background: "rgba(239,68,68,0.15)",
                  border: "1px solid rgba(239,68,68,0.3)",
                  borderRadius: "10px",
                  padding: "8px",
                  color: "#fca5a5",
                  fontSize: "0.84rem",
                  fontWeight: 600,
                  marginBottom: "16px",
                }}>
                  {authError}
                </div>
              )}

              <div style={{ display: "flex", gap: "12px" }}>
                <button
                  type="button"
                  onClick={() => setShowAuthModal(false)}
                  style={{
                    flex: 1,
                    padding: "12px",
                    background: "#1e293b",
                    border: "1px solid #334155",
                    borderRadius: "12px",
                    color: "#94a3b8",
                    fontWeight: 600,
                    cursor: "pointer",
                    fontSize: "0.90rem",
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary"
                  style={{ flex: 1.6, justifyContent: "center", fontSize: "0.92rem", padding: "12px" }}
                >
                  Unlock Manager <i className="ri-arrow-right-line" />
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── Main High-Contrast Dynamic Manager Modal ── */}
      {isOpen && (
        <div className="admin-modal-overlay">
          <div className="admin-modal-container">
            {/* ── Modal Header ── */}
            <div className="admin-modal-header">
              <div className="admin-modal-header-info">
                <div
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "12px",
                    background: "linear-gradient(135deg, rgba(124,58,237,0.3), rgba(6,182,212,0.3))",
                    border: "1px solid rgba(124,58,237,0.5)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#c4b5fd",
                    fontSize: "1.25rem",
                    flexShrink: 0,
                  }}
                >
                  <i className="ri-settings-4-fill" />
                </div>
                <div style={{ minWidth: 0 }}>
                  <h3 style={{ fontSize: "1.2rem", fontWeight: 800, color: "#f8fafc", margin: 0, fontFamily: "var(--font-display)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    Portfolio Dynamic Manager
                  </h3>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "3px" }}>
                    <span style={{
                      display: "inline-block", width: "7px", height: "7px", borderRadius: "50%",
                      backgroundColor: "#10b981", boxShadow: "0 0 8px #10b981", flexShrink: 0,
                    }} />
                    <span style={{ fontSize: "0.76rem", color: "#38bdf8", fontWeight: 600 }}>
                      Owner Access
                    </span>
                    <span style={{ fontSize: "0.76rem", color: "#64748b" }}>•</span>
                    <span style={{ fontSize: "0.76rem", color: "#94a3b8" }}>
                      Live Editing
                    </span>
                  </div>
                </div>
              </div>

              <div className="admin-modal-header-actions">
                <button
                  onClick={handleSaveAll}
                  style={{
                    padding: "9px 20px",
                    background: "linear-gradient(135deg, #10b981, #059669)",
                    border: "1px solid rgba(255,255,255,0.2)",
                    borderRadius: "12px",
                    color: "#ffffff",
                    fontSize: "0.86rem",
                    fontWeight: 700,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    boxShadow: "0 4px 16px rgba(16,185,129,0.4)",
                  }}
                >
                  <i className="ri-save-3-line" style={{ fontSize: "1rem" }} />
                  <span className="save-btn-text">Save All Changes</span>
                </button>

                <button
                  onClick={() => setIsOpen(false)}
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "50%",
                    background: "#1e293b",
                    border: "1px solid #334155",
                    color: "#94a3b8",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "1.2rem",
                    transition: "all 0.2s ease",
                    flexShrink: 0,
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = "#ffffff"; e.currentTarget.style.background = "#334155"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = "#94a3b8"; e.currentTarget.style.background = "#1e293b"; }}
                  title="Close Manager"
                >
                  <i className="ri-close-line" />
                </button>
              </div>
            </div>

            {/* Notification alert banner */}
            {saveStatus && (
              <div
                style={{
                  padding: "12px 20px",
                  background: saveStatus.includes("saved") || saveStatus.includes("reset")
                    ? "#064e3b"
                    : "#7f1d1d",
                  borderBottom: "1px solid rgba(255,255,255,0.12)",
                  color: "#f0fdf4",
                  fontSize: "0.88rem",
                  fontWeight: 700,
                  textAlign: "center",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                }}
              >
                <i className="ri-checkbox-circle-fill" style={{ fontSize: "1.1rem" }} />
                <span>{saveStatus}</span>
              </div>
            )}

            {/* ── Navigation Tab Bar ── */}
            <div className="admin-tab-bar">
              {[
                { id: "personal", label: "Profile & Hero", icon: "ri-user-3-line" },
                { id: "messages", label: `Inbox (${messages?.length || 0})`, icon: "ri-mail-line", badge: unreadMessagesCount },
                { id: "stats", label: "Metrics & Stats", icon: "ri-bar-chart-2-line" },
                { id: "projects", label: `Projects (${formData.projects?.length || 0})`, icon: "ri-folder-open-line" },
                { id: "skills", label: "Skills Matrix", icon: "ri-code-s-slash-line" },
                { id: "tools", label: `Frameworks & Tools (${formData.frameworksAndTools?.length || 0})`, icon: "ri-tools-line" },
                { id: "experience", label: "Qualifications", icon: "ri-briefcase-line" },
                { id: "services", label: "Services", icon: "ri-layout-masonry-line" },
                { id: "testimonials", label: `Endorsements (${formData.testimonials?.length || 0})`, icon: "ri-chat-quote-line" },
                { id: "security", label: "Backup & PIN", icon: "ri-shield-keyhole-line" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className="admin-tab-btn"
                  style={{
                    background: activeTab === tab.id
                      ? "linear-gradient(135deg, rgba(124,58,237,0.30), rgba(6,182,212,0.30))"
                      : "transparent",
                    border: `1px solid ${activeTab === tab.id ? "#7c3aed" : "transparent"}`,
                    color: activeTab === tab.id ? "#ffffff" : "#94a3b8",
                  }}
                  onMouseEnter={(e) => {
                    if (activeTab !== tab.id) {
                      e.currentTarget.style.color = "#f8fafc";
                      e.currentTarget.style.background = "#1e293b";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (activeTab !== tab.id) {
                      e.currentTarget.style.color = "#94a3b8";
                      e.currentTarget.style.background = "transparent";
                    }
                  }}
                >
                  <i className={tab.icon} style={{ fontSize: "1rem" }} />
                  <span>{tab.label}</span>
                  {tab.badge > 0 && (
                    <span style={{
                      padding: "2px 7px",
                      borderRadius: "999px",
                      background: "#ef4444",
                      color: "white",
                      fontSize: "0.70rem",
                      fontWeight: 800,
                      lineHeight: 1,
                      marginLeft: "2px",
                      boxShadow: "0 0 8px rgba(239,68,68,0.6)",
                    }}>
                      {tab.badge}
                    </span>
                  )}
                </button>
              ))}
            </div>

            {/* ── Tab Content Body ── */}
            <div className="admin-body">

              {/* ════════ PROFILE & HERO TAB ════════ */}
              {activeTab === "personal" && (
                <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                  {/* Profile Photo / Picture Card */}
                  <div className="admin-card">
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px", flexWrap: "wrap", gap: "12px" }}>
                      <div>
                        <h4 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#38bdf8", margin: 0, display: "flex", alignItems: "center", gap: "8px" }}>
                          <i className="ri-image-circle-line" /> Profile Picture & Hero Avatar
                        </h4>
                        <p style={{ fontSize: "0.82rem", color: "#94a3b8", margin: "4px 0 0 0" }}>
                          Upload your photo from your computer or provide an image URL. It is displayed inside the glowing hero ring.
                        </p>
                      </div>

                      {formData.personal.avatar && formData.personal.avatar !== ASSET_IMAGES.myImage && (
                        <button
                          type="button"
                          onClick={handleResetAvatar}
                          style={{
                            padding: "6px 14px",
                            background: "rgba(239, 68, 68, 0.15)",
                            border: "1px solid rgba(239, 68, 68, 0.35)",
                            borderRadius: "8px",
                            color: "#fca5a5",
                            fontSize: "0.78rem",
                            fontWeight: 600,
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            gap: "6px",
                          }}
                        >
                          <i className="ri-refresh-line" /> Reset to Default Photo
                        </button>
                      )}
                    </div>

                    <div style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "24px",
                      flexWrap: "wrap",
                      background: "#0b0f19",
                      padding: "20px",
                      borderRadius: "14px",
                      border: "1px solid #1f293d",
                    }}>
                      {/* Avatar Live Preview */}
                      <div style={{ position: "relative", width: "96px", height: "96px", flexShrink: 0 }}>
                        <div style={{
                          position: "absolute", inset: "-3px", borderRadius: "50%",
                          background: "linear-gradient(135deg, #7c3aed, #06b6d4, #ec4899)",
                          boxShadow: "0 0 20px rgba(124,58,237,0.35)",
                        }} />
                        <div style={{
                          position: "absolute", inset: "3px", borderRadius: "50%",
                          overflow: "hidden", background: "#060913",
                        }}>
                          <img
                            src={resolveImage(formData.personal.avatarKey, formData.personal.avatar)}
                            alt="Profile Avatar Preview"
                            style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }}
                          />
                        </div>
                      </div>

                      {/* Photo Upload & URL Inputs */}
                      <div style={{ flex: 1, minWidth: "240px", display: "flex", flexDirection: "column", gap: "12px" }}>
                        <div>
                          <label style={labelStyle}>Upload New Picture from Device (PNG / JPG / WEBP)</label>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleAvatarUpload}
                            style={{
                              ...inputStyle,
                              padding: "8px 12px",
                              cursor: "pointer",
                              fontSize: "0.82rem",
                            }}
                          />
                        </div>

                        <div>
                          <label style={labelStyle}>Or Enter Direct Picture URL</label>
                          <input
                            type="text"
                            placeholder="https://example.com/my-photo.jpg or GitHub avatar URL"
                            value={formData.personal.avatar?.startsWith("data:image") ? "(Custom Uploaded Photo Active)" : (formData.personal.avatar || "")}
                            onChange={(e) => {
                              const val = e.target.value;
                              setFormData((prev) => ({
                                ...prev,
                                personal: {
                                  ...prev.personal,
                                  avatar: val,
                                  avatarKey: "",
                                },
                              }));
                            }}
                            style={inputStyle}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="admin-card">
                    <h4 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#38bdf8", marginBottom: "16px", display: "flex", alignItems: "center", gap: "8px" }}>
                      <i className="ri-user-star-line" /> Personal Identity & Role
                    </h4>

                    <div className="admin-grid-2">
                      <div>
                        <label style={labelStyle}>Full Display Name *</label>
                        <input
                          type="text"
                          value={formData.personal.name || ""}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              personal: { ...prev.personal, name: e.target.value },
                            }))
                          }
                          style={inputStyle}
                        />
                      </div>

                      <div>
                        <label style={labelStyle}>Live Status Badge Text</label>
                        <input
                          type="text"
                          value={formData.personal.status || ""}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              personal: { ...prev.personal, status: e.target.value },
                            }))
                          }
                          style={inputStyle}
                        />
                      </div>

                      <div style={{ gridColumn: "1 / -1" }}>
                        <label style={labelStyle}>
                          Typing Animation Roles (Separate each role with a comma)
                        </label>
                        <input
                          type="text"
                          value={formData.personal.roles ? formData.personal.roles.join(", ") : ""}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              personal: {
                                ...prev.personal,
                                roles: e.target.value.split(",").map((s) => s.trim()).filter(Boolean),
                              },
                            }))
                          }
                          style={inputStyle}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="admin-card">
                    <h4 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#a78bfa", marginBottom: "16px", display: "flex", alignItems: "center", gap: "8px" }}>
                      <i className="ri-file-text-line" /> Biography & Introductions
                    </h4>

                    <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
                      <div>
                        <label style={labelStyle}>Hero Introduction Tagline (Visible below hero name)</label>
                        <textarea
                          rows={2}
                          value={formData.personal.bioIntro || ""}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              personal: { ...prev.personal, bioIntro: e.target.value },
                            }))
                          }
                          style={inputStyle}
                        />
                      </div>

                      <div>
                        <label style={labelStyle}>Detailed Biography (Used in about sections & footers)</label>
                        <textarea
                          rows={3}
                          value={formData.personal.bioAbout || ""}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              personal: { ...prev.personal, bioAbout: e.target.value },
                            }))
                          }
                          style={inputStyle}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="admin-card">
                    <h4 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#34d399", marginBottom: "16px", display: "flex", alignItems: "center", gap: "8px" }}>
                      <i className="ri-contacts-line" /> Contact Coordinates & Links
                    </h4>

                    <div className="admin-grid-3">
                      <div>
                        <label style={labelStyle}>Email Address *</label>
                        <input
                          type="email"
                          value={formData.personal.email || ""}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              personal: { ...prev.personal, email: e.target.value },
                            }))
                          }
                          style={inputStyle}
                        />
                      </div>

                      <div>
                        <label style={labelStyle}>WhatsApp Phone Number *</label>
                        <input
                          type="text"
                          value={formData.personal.whatsapp || ""}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              personal: { ...prev.personal, whatsapp: e.target.value },
                            }))
                          }
                          style={inputStyle}
                        />
                      </div>

                      <div>
                        <label style={labelStyle}>Location / Region *</label>
                        <input
                          type="text"
                          value={formData.personal.location || ""}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              personal: { ...prev.personal, location: e.target.value },
                            }))
                          }
                          style={inputStyle}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Resume & CV Document Management */}
                  <div className="admin-card">
                    <h4 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#f59e0b", marginBottom: "8px", display: "flex", alignItems: "center", gap: "8px" }}>
                      <i className="ri-file-pdf-2-line" /> Resume & Curriculum Vitae (CV) Documents
                    </h4>
                    <p style={{ fontSize: "0.82rem", color: "#94a3b8", marginBottom: "20px" }}>
                      Upload new PDF documents directly from your computer or provide a cloud link (Google Drive / GitHub).
                    </p>

                    <div className="admin-grid-2">
                      {/* Resume Box */}
                      <div style={{
                        background: "#0b0f19",
                        border: "1px solid #1f293d",
                        borderRadius: "14px",
                        padding: "18px",
                        display: "flex",
                        flexDirection: "column",
                        gap: "14px",
                      }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                          <span style={{ fontSize: "0.90rem", fontWeight: 700, color: "#38bdf8" }}>
                            Resume Document
                          </span>
                          {formData.personal.resumeUrl && (
                            <a
                              href={formData.personal.resumeUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              download={formData.personal.resumeName || "Resume.pdf"}
                              style={{
                                fontSize: "0.76rem", color: "#38bdf8",
                                display: "inline-flex", alignItems: "center", gap: "4px",
                                textDecoration: "none", fontWeight: 600,
                              }}
                            >
                              <i className="ri-external-link-line" /> Test Download
                            </a>
                          )}
                        </div>

                        <div>
                          <label style={labelStyle}>Upload New Resume PDF (From Device)</label>
                          <input
                            type="file"
                            accept=".pdf,application/pdf"
                            onChange={(e) => handlePdfUpload(e, "resumeUrl", "resumeName", "Debajyoti_Samanta_Resume.pdf")}
                            style={{
                              ...inputStyle,
                              padding: "8px 12px",
                              cursor: "pointer",
                              fontSize: "0.82rem",
                            }}
                          />
                        </div>

                        <div>
                          <label style={labelStyle}>Or Enter Direct Resume URL / Link</label>
                          <input
                            type="text"
                            placeholder="https://drive.google.com/... or /path/to/resume.pdf"
                            value={formData.personal.resumeUrl?.startsWith("data:") ? "(Custom Uploaded PDF Document Active)" : (formData.personal.resumeUrl || "")}
                            onChange={(e) => {
                              const val = e.target.value;
                              setFormData((prev) => ({
                                ...prev,
                                personal: { ...prev.personal, resumeUrl: val },
                              }));
                            }}
                            style={inputStyle}
                          />
                        </div>
                      </div>

                      {/* CV Box */}
                      <div style={{
                        background: "#0b0f19",
                        border: "1px solid #1f293d",
                        borderRadius: "14px",
                        padding: "18px",
                        display: "flex",
                        flexDirection: "column",
                        gap: "14px",
                      }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                          <span style={{ fontSize: "0.90rem", fontWeight: 700, color: "#a78bfa" }}>
                            Curriculum Vitae (CV)
                          </span>
                          {formData.personal.cvUrl && (
                            <a
                              href={formData.personal.cvUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              download={formData.personal.cvName || "CV.pdf"}
                              style={{
                                fontSize: "0.76rem", color: "#a78bfa",
                                display: "inline-flex", alignItems: "center", gap: "4px",
                                textDecoration: "none", fontWeight: 600,
                              }}
                            >
                              <i className="ri-external-link-line" /> Test Download
                            </a>
                          )}
                        </div>

                        <div>
                          <label style={labelStyle}>Upload New CV PDF (From Device)</label>
                          <input
                            type="file"
                            accept=".pdf,application/pdf"
                            onChange={(e) => handlePdfUpload(e, "cvUrl", "cvName", "Debajyoti_Samanta_CV.pdf")}
                            style={{
                              ...inputStyle,
                              padding: "8px 12px",
                              cursor: "pointer",
                              fontSize: "0.82rem",
                            }}
                          />
                        </div>

                        <div>
                          <label style={labelStyle}>Or Enter Direct CV URL / Link</label>
                          <input
                            type="text"
                            placeholder="https://drive.google.com/... or /path/to/cv.pdf"
                            value={formData.personal.cvUrl?.startsWith("data:") ? "(Custom Uploaded PDF Document Active)" : (formData.personal.cvUrl || "")}
                            onChange={(e) => {
                              const val = e.target.value;
                              setFormData((prev) => ({
                                ...prev,
                                personal: { ...prev.personal, cvUrl: val },
                              }));
                            }}
                            style={inputStyle}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ════════ MESSAGES INBOX TAB ════════ */}
              {activeTab === "messages" && (
                <div>
                  <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexWrap: "wrap",
                    gap: "14px",
                    marginBottom: "24px",
                    paddingBottom: "16px",
                    borderBottom: "1px solid #1e293b",
                  }}>
                    <div>
                      <h4 style={{ fontSize: "1.2rem", fontWeight: 800, color: "#f8fafc", margin: 0, display: "flex", alignItems: "center", gap: "10px" }}>
                        <i className="ri-inbox-archive-line" style={{ color: "#38bdf8" }} />
                        Contact Form Inquiries ({messages?.length || 0})
                      </h4>
                      <p style={{ fontSize: "0.82rem", color: "#94a3b8", margin: "4px 0 0 0" }}>
                        Messages submitted by visitors through your portfolio's contact form.
                      </p>
                    </div>

                    {messages && messages.length > 0 && (
                      <button
                        type="button"
                        onClick={() => {
                          if (window.confirm("Are you sure you want to delete all messages from your inbox?")) {
                            clearAllMessages();
                          }
                        }}
                        style={{
                          padding: "8px 16px",
                          background: "rgba(239, 68, 68, 0.15)",
                          border: "1px solid rgba(239, 68, 68, 0.35)",
                          borderRadius: "10px",
                          color: "#fca5a5",
                          fontSize: "0.80rem",
                          fontWeight: 700,
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          gap: "6px",
                        }}
                      >
                        <i className="ri-delete-bin-line" /> Clear Inbox
                      </button>
                    )}
                  </div>

                  {(!messages || messages.length === 0) ? (
                    <div style={{
                      textAlign: "center",
                      padding: "60px 20px",
                      background: "#131a2c",
                      border: "1px solid #23304b",
                      borderRadius: "18px",
                    }}>
                      <div style={{
                        width: "60px", height: "60px", borderRadius: "50%",
                        background: "rgba(56, 189, 248, 0.10)",
                        border: "1px solid rgba(56, 189, 248, 0.25)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        margin: "0 auto 16px auto", color: "#38bdf8", fontSize: "1.8rem",
                      }}>
                        <i className="ri-mail-open-line" />
                      </div>
                      <h5 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#f8fafc", marginBottom: "6px" }}>
                        Your Inbox is Empty
                      </h5>
                      <p style={{ fontSize: "0.86rem", color: "#94a3b8", maxWidth: "420px", margin: "0 auto" }}>
                        Whenever someone submits a message on your contact form, it will appear here in real time with their email and subject.
                      </p>
                    </div>
                  ) : (
                    <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
                      {messages.map((msg) => {
                        const formattedDate = msg.date ? new Date(msg.date).toLocaleString(undefined, {
                          dateStyle: "medium",
                          timeStyle: "short",
                        }) : "Recent";

                        return (
                          <div
                            key={msg.id}
                            style={{
                              background: msg.read ? "#0e1424" : "#131b2e",
                              border: `1px solid ${msg.read ? "#1e293b" : "#38bdf8"}`,
                              borderRadius: "16px",
                              padding: "20px 24px",
                              boxShadow: msg.read ? "none" : "0 4px 20px rgba(56, 189, 248, 0.12)",
                              transition: "all 0.2s ease",
                            }}
                          >
                            <div style={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "flex-start",
                              flexWrap: "wrap",
                              gap: "12px",
                              marginBottom: "12px",
                            }}>
                              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                {!msg.read && (
                                  <span style={{
                                    width: "8px", height: "8px", borderRadius: "50%",
                                    backgroundColor: "#38bdf8", boxShadow: "0 0 8px #38bdf8",
                                    flexShrink: 0,
                                  }} title="Unread Message" />
                                )}
                                <div>
                                  <h4 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#f8fafc", margin: 0 }}>
                                    {msg.name}
                                  </h4>
                                  <a
                                    href={`mailto:${msg.email}`}
                                    style={{ fontSize: "0.82rem", color: "#38bdf8", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "4px" }}
                                  >
                                    <i className="ri-mail-line" /> {msg.email}
                                  </a>
                                </div>
                              </div>

                              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                <span style={{ fontSize: "0.76rem", color: "#94a3b8", fontFamily: "var(--font-mono)" }}>
                                  {formattedDate}
                                </span>

                                <a
                                  href={`mailto:${msg.email}?subject=${encodeURIComponent("Re: " + (msg.subject || "Portfolio Inquiry"))}`}
                                  onClick={() => markMessageRead(msg.id)}
                                  style={{
                                    padding: "6px 14px",
                                    background: "rgba(16, 185, 129, 0.15)",
                                    border: "1px solid rgba(16, 185, 129, 0.35)",
                                    borderRadius: "8px",
                                    color: "#34d399",
                                    fontSize: "0.80rem",
                                    fontWeight: 700,
                                    textDecoration: "none",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "5px",
                                  }}
                                >
                                  <i className="ri-reply-line" /> Reply
                                </a>

                                <button
                                  type="button"
                                  onClick={() => deleteMessage(msg.id)}
                                  style={{
                                    padding: "6px 10px",
                                    background: "rgba(239, 68, 68, 0.12)",
                                    border: "1px solid rgba(239, 68, 68, 0.25)",
                                    borderRadius: "8px",
                                    color: "#fca5a5",
                                    fontSize: "0.80rem",
                                    cursor: "pointer",
                                  }}
                                  title="Delete Message"
                                >
                                  <i className="ri-delete-bin-line" />
                                </button>
                              </div>
                            </div>

                            <div style={{
                              background: "#080c17",
                              border: "1px solid #1f293d",
                              borderRadius: "12px",
                              padding: "14px 18px",
                              marginTop: "8px",
                            }}>
                              <div style={{
                                fontSize: "0.82rem",
                                fontWeight: 700,
                                color: "#e2e8f0",
                                marginBottom: "6px",
                                display: "flex",
                                alignItems: "center",
                                gap: "6px"
                              }}>
                                <span style={{ color: "#94a3b8", fontWeight: 500 }}>Subject:</span>
                                <span>{msg.subject || "(No Subject)"}</span>
                              </div>
                              <p style={{
                                fontSize: "0.90rem",
                                color: "#cbd5e1",
                                lineHeight: 1.65,
                                margin: 0,
                                whiteSpace: "pre-wrap",
                              }}>
                                {msg.message}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}

              {/* ════════ METRICS & STATS TAB ════════ */}
              {activeTab === "stats" && (
                <div>
                  <div style={{
                    background: "rgba(6,182,212,0.10)",
                    border: "1px solid rgba(6,182,212,0.25)",
                    borderRadius: "14px",
                    padding: "14px 18px",
                    marginBottom: "24px",
                    color: "#e2e8f0",
                    fontSize: "0.88rem",
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                  }}>
                    <i className="ri-information-line" style={{ color: "#38bdf8", fontSize: "1.2rem" }} />
                    <span>These four primary statistics are highlighted in the Hero section and throughout the portfolio.</span>
                  </div>

                  <div className="admin-grid-2">
                    {formData.stats.map((s, idx) => (
                      <div
                        key={s.id || idx}
                        className="admin-card"
                      >
                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "14px", alignItems: "center" }}>
                          <span style={{ fontSize: "0.85rem", fontWeight: 700, color: s.color || "#38bdf8" }}>
                            Stat #{idx + 1}
                          </span>
                          <span style={{
                            padding: "3px 10px", borderRadius: "999px",
                            background: "rgba(255,255,255,0.06)", fontSize: "0.75rem",
                            color: "#94a3b8", fontFamily: "var(--font-mono)"
                          }}>
                            Hero Metric
                          </span>
                        </div>

                        <div className="admin-grid-2">
                          <div>
                            <label style={labelStyle}>Value (e.g. 15+, 3+, 25+)</label>
                            <input
                              type="text"
                              value={s.value || ""}
                              onChange={(e) => {
                                const newStats = [...formData.stats];
                                newStats[idx].value = e.target.value;
                                setFormData((prev) => ({ ...prev, stats: newStats }));
                              }}
                              style={inputStyle}
                            />
                          </div>

                          <div>
                            <label style={labelStyle}>Metric Label</label>
                            <input
                              type="text"
                              value={s.label || ""}
                              onChange={(e) => {
                                const newStats = [...formData.stats];
                                newStats[idx].label = e.target.value;
                                setFormData((prev) => ({ ...prev, stats: newStats }));
                              }}
                              style={inputStyle}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ════════ PROJECTS TAB ════════ */}
              {activeTab === "projects" && (
                <div>
                  <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexWrap: "wrap",
                    gap: "12px",
                    marginBottom: "24px",
                  }}>
                    <div>
                      <h4 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#f8fafc", margin: 0 }}>
                        All Showcase Projects ({formData.projects?.length || 0})
                      </h4>
                      <p style={{ fontSize: "0.82rem", color: "#94a3b8", margin: "4px 0 0 0" }}>
                        Click on any project to edit details, images, live links, or tech stacks.
                      </p>
                    </div>

                    <button
                      onClick={handleAddProject}
                      style={{
                        padding: "10px 20px",
                        background: "linear-gradient(135deg, #7c3aed, #a78bfa)",
                        border: "1px solid rgba(255,255,255,0.2)",
                        borderRadius: "12px",
                        color: "#ffffff",
                        fontSize: "0.86rem",
                        fontWeight: 700,
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                      }}
                    >
                      <i className="ri-add-circle-fill" style={{ fontSize: "1.05rem" }} />
                      <span>Add New Project</span>
                    </button>
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                    {formData.projects.map((proj, idx) => {
                      const isExpanded = editingProjectId === proj.id;
                      const thumb = resolveImage(proj.imgKey, proj.img);

                      return (
                        <div
                          key={proj.id || idx}
                          style={{
                            background: isExpanded ? "#141c30" : "#101626",
                            border: `1px solid ${isExpanded ? "#7c3aed" : "#1f293d"}`,
                            borderRadius: "18px",
                            padding: "20px 24px",
                            boxShadow: isExpanded ? "0 10px 30px rgba(0,0,0,0.5), 0 0 20px rgba(124,58,237,0.15)" : "none",
                            transition: "all 0.25s ease",
                          }}
                        >
                          {/* Project Header Row */}
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between",
                              gap: "16px",
                              cursor: "pointer",
                            }}
                            onClick={() => setEditingProjectId(isExpanded ? null : proj.id)}
                          >
                            <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                              <img
                                src={thumb}
                                alt={proj.title}
                                style={{
                                  width: "56px",
                                  height: "38px",
                                  objectFit: "cover",
                                  borderRadius: "8px",
                                  border: "1px solid #334155",
                                }}
                              />
                              <div>
                                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                  <h4 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#f8fafc", margin: 0 }}>
                                    {proj.title}
                                  </h4>
                                  <span style={{
                                    padding: "2px 10px",
                                    borderRadius: "999px",
                                    fontSize: "0.72rem",
                                    fontWeight: 700,
                                    background: "rgba(6,182,212,0.15)",
                                    color: "#67e8f9",
                                    border: "1px solid rgba(6,182,212,0.3)",
                                  }}>
                                    {proj.tag}
                                  </span>
                                </div>
                                <span style={{ fontSize: "0.80rem", color: "#94a3b8" }}>
                                  {proj.subtitle}
                                </span>
                              </div>
                            </div>

                            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setEditingProjectId(isExpanded ? null : proj.id);
                                }}
                                style={{
                                  padding: "6px 14px",
                                  background: "#1e293b",
                                  border: "1px solid #334155",
                                  borderRadius: "8px",
                                  color: "#38bdf8",
                                  fontSize: "0.80rem",
                                  fontWeight: 600,
                                  cursor: "pointer",
                                }}
                              >
                                {isExpanded ? "Collapse" : "Edit Details"}
                              </button>

                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleDeleteProject(proj.id);
                                }}
                                style={{
                                  padding: "6px 12px",
                                  background: "rgba(239, 68, 68, 0.15)",
                                  border: "1px solid rgba(239, 68, 68, 0.35)",
                                  borderRadius: "8px",
                                  color: "#fca5a5",
                                  fontSize: "0.80rem",
                                  cursor: "pointer",
                                }}
                                title="Delete Project"
                              >
                                <i className="ri-delete-bin-line" />
                              </button>
                            </div>
                          </div>

                          {/* Expanded Edit Form */}
                          {isExpanded && (
                            <div style={{ marginTop: "24px", paddingTop: "20px", borderTop: "1px solid #23304b" }}>
                              <div className="admin-grid-2" style={{ marginBottom: "16px" }}>
                                <div>
                                  <label style={labelStyle}>Project Title *</label>
                                  <input
                                    type="text"
                                    value={proj.title || ""}
                                    onChange={(e) => {
                                      const newP = [...formData.projects];
                                      newP[idx].title = e.target.value;
                                      setFormData((prev) => ({ ...prev, projects: newP }));
                                    }}
                                    style={inputStyle}
                                  />
                                </div>

                                <div>
                                  <label style={labelStyle}>Concept / Subtitle *</label>
                                  <input
                                    type="text"
                                    value={proj.subtitle || ""}
                                    onChange={(e) => {
                                      const newP = [...formData.projects];
                                      newP[idx].subtitle = e.target.value;
                                      setFormData((prev) => ({ ...prev, projects: newP }));
                                    }}
                                    style={inputStyle}
                                  />
                                </div>
                              </div>

                              <div className="admin-grid-3" style={{ marginBottom: "16px" }}>
                                <div>
                                  <label style={labelStyle}>Category</label>
                                  <select
                                    value={proj.tag}
                                    onChange={(e) => {
                                      const newP = [...formData.projects];
                                      newP[idx].tag = e.target.value;
                                      setFormData((prev) => ({ ...prev, projects: newP }));
                                    }}
                                    style={inputStyle}
                                  >
                                    <option value="Full-Stack">Full-Stack</option>
                                    <option value="Web">Web</option>
                                    <option value="React">React</option>
                                    <option value="Game">Game</option>
                                  </select>
                                </div>

                                <div>
                                  <label style={labelStyle}>Image Asset Key or Custom Image URL</label>
                                  <input
                                    type="text"
                                    value={proj.imgKey || ""}
                                    onChange={(e) => {
                                      const newP = [...formData.projects];
                                      newP[idx].imgKey = e.target.value;
                                      setFormData((prev) => ({ ...prev, projects: newP }));
                                    }}
                                    style={inputStyle}
                                    placeholder="e.g. mentorship, musicHub, localFix, pfm, etc."
                                  />
                                </div>

                                <div>
                                  <label style={labelStyle}>Accent Glow Color</label>
                                  <input
                                    type="text"
                                    value={proj.accentColor || "#22d3ee"}
                                    onChange={(e) => {
                                      const newP = [...formData.projects];
                                      newP[idx].accentColor = e.target.value;
                                      setFormData((prev) => ({ ...prev, projects: newP }));
                                    }}
                                    style={inputStyle}
                                  />
                                </div>
                              </div>

                              <div style={{ marginBottom: "16px" }}>
                                <label style={labelStyle}>Live Demo Website URL *</label>
                                <input
                                  type="text"
                                  value={proj.link || ""}
                                  onChange={(e) => {
                                    const newP = [...formData.projects];
                                    newP[idx].link = e.target.value;
                                    setFormData((prev) => ({ ...prev, projects: newP }));
                                  }}
                                  style={inputStyle}
                                />
                              </div>

                              <div style={{ marginBottom: "16px" }}>
                                <label style={labelStyle}>Project Description</label>
                                <textarea
                                  rows={3}
                                  value={proj.desc || ""}
                                  onChange={(e) => {
                                    const newP = [...formData.projects];
                                    newP[idx].desc = e.target.value;
                                    setFormData((prev) => ({ ...prev, projects: newP }));
                                  }}
                                  style={inputStyle}
                                />
                              </div>

                              <div>
                                <label style={labelStyle}>Technologies Used (Comma-separated tags)</label>
                                <input
                                  type="text"
                                  value={proj.tech ? proj.tech.join(", ") : ""}
                                  onChange={(e) => {
                                    const newP = [...formData.projects];
                                    newP[idx].tech = e.target.value.split(",").map((s) => s.trim()).filter(Boolean);
                                    setFormData((prev) => ({ ...prev, projects: newP }));
                                  }}
                                  style={inputStyle}
                                />
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* ════════ SKILLS TAB ════════ */}
              {activeTab === "skills" && (
                <div>
                  <div style={{
                    background: "rgba(124,58,237,0.10)",
                    border: "1px solid rgba(124,58,237,0.25)",
                    borderRadius: "14px",
                    padding: "14px 18px",
                    marginBottom: "24px",
                    color: "#e2e8f0",
                    fontSize: "0.88rem",
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                  }}>
                    <i className="ri-information-line" style={{ color: "#a78bfa", fontSize: "1.2rem" }} />
                    <span>Adjust skill names, category titles, and mastery levels (10% - 100%).</span>
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                    {formData.skillsCategories.map((cat, catIdx) => (
                      <div
                        key={cat.id || catIdx}
                        style={{
                          background: "#131a2c",
                          border: "1px solid #23304b",
                          borderRadius: "18px",
                          padding: "24px",
                        }}
                      >
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "18px" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                            <div style={{
                              width: "32px", height: "32px", borderRadius: "8px",
                              background: cat.bg || "rgba(124,58,237,0.15)",
                              display: "flex", alignItems: "center", justifyContent: "center",
                              color: cat.color || "#c4b5fd",
                            }}>
                              <i className={cat.icon || "ri-code-line"} />
                            </div>
                            <input
                              type="text"
                              value={cat.label}
                              onChange={(e) => {
                                const newCats = [...formData.skillsCategories];
                                newCats[catIdx].label = e.target.value;
                                setFormData((prev) => ({ ...prev, skillsCategories: newCats }));
                              }}
                              style={{
                                ...inputStyle,
                                fontWeight: 700,
                                fontSize: "1.05rem",
                                color: cat.color || "#ffffff",
                                width: "auto",
                                padding: "6px 12px",
                              }}
                            />
                          </div>

                          <button
                            type="button"
                            onClick={() => handleAddSkill(catIdx)}
                            style={{
                              padding: "6px 14px",
                              background: "rgba(124,58,237,0.20)",
                              border: "1px solid rgba(124,58,237,0.40)",
                              borderRadius: "8px",
                              color: "#c4b5fd",
                              fontSize: "0.80rem",
                              fontWeight: 600,
                              cursor: "pointer",
                              display: "flex",
                              alignItems: "center",
                              gap: "6px",
                            }}
                          >
                            <i className="ri-add-line" /> Add Skill
                          </button>
                        </div>

                        <div className="admin-grid-2">
                          {cat.skills?.map((sk, skIdx) => (
                            <div
                              key={skIdx}
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "10px",
                                background: "#0b0f19",
                                padding: "10px 14px",
                                borderRadius: "10px",
                                border: "1px solid #1e293b",
                              }}
                            >
                              <input
                                type="text"
                                value={sk.name}
                                onChange={(e) => {
                                  const newCats = [...formData.skillsCategories];
                                  newCats[catIdx].skills[skIdx].name = e.target.value;
                                  setFormData((prev) => ({ ...prev, skillsCategories: newCats }));
                                }}
                                style={{ ...inputStyle, flex: 2, padding: "8px 12px" }}
                              />

                              <div style={{ display: "flex", alignItems: "center", gap: "6px", flex: 1 }}>
                                <input
                                  type="number"
                                  min="10"
                                  max="100"
                                  value={sk.level}
                                  onChange={(e) => {
                                    const newCats = [...formData.skillsCategories];
                                    newCats[catIdx].skills[skIdx].level = Number(e.target.value);
                                    setFormData((prev) => ({ ...prev, skillsCategories: newCats }));
                                  }}
                                  style={{ ...inputStyle, textAlign: "center", padding: "8px 6px" }}
                                />
                                <span style={{ fontSize: "0.85rem", color: "#94a3b8", fontWeight: 700 }}>%</span>
                              </div>

                              <button
                                type="button"
                                onClick={() => handleDeleteSkill(catIdx, skIdx)}
                                style={{
                                  background: "transparent",
                                  border: "none",
                                  color: "#ef4444",
                                  cursor: "pointer",
                                  padding: "4px",
                                }}
                                title="Delete Skill"
                              >
                                <i className="ri-delete-bin-line" />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ════════ FRAMEWORKS & TOOLS TAB ════════ */}
              {activeTab === "tools" && (
                <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                  {/* Header & Add Button */}
                  <div style={{
                    background: "#131a2c",
                    border: "1px solid #23304b",
                    borderRadius: "18px",
                    padding: "24px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexWrap: "wrap",
                    gap: "16px",
                  }}>
                    <div>
                      <h4 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#38bdf8", margin: 0, display: "flex", alignItems: "center", gap: "8px" }}>
                        <i className="ri-tools-line" /> Frameworks, Libraries & Developer Tools
                      </h4>
                      <p style={{ fontSize: "0.82rem", color: "#94a3b8", margin: "6px 0 0 0" }}>
                        These tools are dynamically displayed as interactive floating badges in the Skills section. Add new frameworks, change accent colors, pick built-in tech assets, or upload custom icons.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={handleAddTool}
                      style={{
                        padding: "10px 20px",
                        background: "linear-gradient(135deg, #7c3aed, #06b6d4)",
                        border: "1px solid rgba(255,255,255,0.2)",
                        borderRadius: "12px",
                        color: "#ffffff",
                        fontSize: "0.86rem",
                        fontWeight: 700,
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        boxShadow: "0 4px 15px rgba(124,58,237,0.3)",
                      }}
                    >
                      <i className="ri-add-line" style={{ fontSize: "1.1rem" }} /> Add Framework / Tool
                    </button>
                  </div>

                  {/* Tools Grid */}
                  <div className="admin-grid-tools">
                    {(formData.frameworksAndTools || []).map((tool, idx) => {
                      const toolImg = tool.img || resolveImage(tool.imgKey);
                      return (
                        <div
                          key={tool.id || idx}
                          style={{
                            background: "#0d1322",
                            border: "1px solid #1e293b",
                            borderRadius: "16px",
                            padding: "20px",
                            display: "flex",
                            flexDirection: "column",
                            gap: "16px",
                            transition: "all 0.2s ease",
                          }}
                        >
                          {/* Card Top: Live Badge Preview + Actions */}
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #172033", paddingBottom: "14px" }}>
                            {/* Live Preview Badge */}
                            <div
                              style={{
                                display: "inline-flex",
                                alignItems: "center",
                                gap: "8px",
                                padding: "6px 14px",
                                borderRadius: "999px",
                                background: `${tool.hue || "#38bdf8"}18`,
                                border: `1px solid ${tool.hue || "#38bdf8"}55`,
                                color: "#ffffff",
                                fontSize: "0.84rem",
                                fontWeight: 700,
                                boxShadow: `0 0 16px ${tool.hue || "#38bdf8"}33`,
                              }}
                            >
                              {toolImg ? (
                                <img
                                  src={toolImg}
                                  alt={tool.name}
                                  style={{ width: "16px", height: "16px", objectFit: "contain" }}
                                />
                              ) : (
                                <i className={tool.icon || "ri-code-box-line"} style={{ color: tool.hue || "#38bdf8", fontSize: "1rem" }} />
                              )}
                              <span>{tool.name || "Untitled"}</span>
                            </div>

                            {/* Reorder and Delete buttons */}
                            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                              <button
                                type="button"
                                onClick={() => handleMoveTool(idx, -1)}
                                disabled={idx === 0}
                                style={{
                                  background: "#1e293b",
                                  border: "1px solid #334155",
                                  borderRadius: "6px",
                                  color: idx === 0 ? "#475569" : "#94a3b8",
                                  cursor: idx === 0 ? "not-allowed" : "pointer",
                                  padding: "4px 8px",
                                  fontSize: "0.80rem",
                                }}
                                title="Move Earlier"
                              >
                                <i className="ri-arrow-up-line" />
                              </button>

                              <button
                                type="button"
                                onClick={() => handleMoveTool(idx, 1)}
                                disabled={idx === (formData.frameworksAndTools?.length || 0) - 1}
                                style={{
                                  background: "#1e293b",
                                  border: "1px solid #334155",
                                  borderRadius: "6px",
                                  color: idx === (formData.frameworksAndTools?.length || 0) - 1 ? "#475569" : "#94a3b8",
                                  cursor: idx === (formData.frameworksAndTools?.length || 0) - 1 ? "not-allowed" : "pointer",
                                  padding: "4px 8px",
                                  fontSize: "0.80rem",
                                }}
                                title="Move Later"
                              >
                                <i className="ri-arrow-down-line" />
                              </button>

                              <button
                                type="button"
                                onClick={() => handleDeleteTool(tool.id)}
                                style={{
                                  background: "rgba(239, 68, 68, 0.15)",
                                  border: "1px solid rgba(239, 68, 68, 0.35)",
                                  borderRadius: "6px",
                                  color: "#ef4444",
                                  cursor: "pointer",
                                  padding: "4px 8px",
                                  fontSize: "0.80rem",
                                }}
                                title="Delete Tool"
                              >
                                <i className="ri-delete-bin-line" />
                              </button>
                            </div>
                          </div>

                          {/* Tool Name */}
                          <div>
                            <label style={labelStyle}>Framework / Tool Name *</label>
                            <input
                              type="text"
                              value={tool.name || ""}
                              onChange={(e) => {
                                const list = [...(formData.frameworksAndTools || [])];
                                list[idx].name = e.target.value;
                                setFormData((prev) => ({ ...prev, frameworksAndTools: list }));
                              }}
                              style={inputStyle}
                              placeholder="e.g. Next.js, Docker, TypeScript"
                            />
                          </div>

                          {/* Built-in Asset or Custom Option */}
                          <div>
                            <label style={labelStyle}>Built-in Tech Asset Icon</label>
                            <select
                              value={tool.imgKey || ""}
                              onChange={(e) => {
                                const val = e.target.value;
                                const list = [...(formData.frameworksAndTools || [])];
                                list[idx].imgKey = val;
                                if (val) list[idx].img = ""; // reset custom uploaded image if built-in selected
                                setFormData((prev) => ({ ...prev, frameworksAndTools: list }));
                              }}
                              style={{ ...inputStyle, cursor: "pointer" }}
                            >
                              <option value="">-- Use Custom / Upload / RemixIcon --</option>
                              <option value="react">React</option>
                              <option value="tailwind">Tailwind CSS</option>
                              <option value="nodejs">Node.js</option>
                              <option value="js">JavaScript</option>
                              <option value="html">HTML5</option>
                              <option value="css">CSS3</option>
                              <option value="python">Python</option>
                              <option value="git">Git</option>
                              <option value="github">GitHub</option>
                              <option value="figma">Figma</option>
                              <option value="sql">SQL Database</option>
                              <option value="java">Java</option>
                              <option value="cpp">C++</option>
                              <option value="c">C Language</option>
                            </select>
                          </div>

                          {/* Upload Custom Logo (from device) */}
                          <div>
                            <label style={labelStyle}>Or Upload Logo from Device (SVG / PNG)</label>
                            <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                              <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleToolIconUpload(e, idx)}
                                style={{ ...inputStyle, padding: "7px 10px", fontSize: "0.80rem", flex: 1, cursor: "pointer" }}
                              />
                              {tool.img && (
                                <button
                                  type="button"
                                  onClick={() => {
                                    const list = [...(formData.frameworksAndTools || [])];
                                    list[idx].img = "";
                                    setFormData((prev) => ({ ...prev, frameworksAndTools: list }));
                                  }}
                                  style={{
                                    padding: "8px 12px",
                                    background: "#1e293b",
                                    border: "1px solid #334155",
                                    borderRadius: "8px",
                                    color: "#fca5a5",
                                    fontSize: "0.76rem",
                                    cursor: "pointer",
                                    whiteSpace: "nowrap",
                                  }}
                                >
                                  Clear Image
                                </button>
                              )}
                            </div>
                          </div>

                          {/* Fallback RemixIcon class */}
                          <div>
                            <label style={labelStyle}>RemixIcon Class (Fallback if no logo)</label>
                            <input
                              type="text"
                              value={tool.icon || ""}
                              placeholder="ri-terminal-box-line or ri-database-2-line"
                              onChange={(e) => {
                                const list = [...(formData.frameworksAndTools || [])];
                                list[idx].icon = e.target.value;
                                setFormData((prev) => ({ ...prev, frameworksAndTools: list }));
                              }}
                              style={inputStyle}
                            />
                          </div>

                          {/* Accent Hue Color Picker + Hex */}
                          <div>
                            <label style={labelStyle}>Accent Color & Glow</label>
                            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                              <input
                                type="color"
                                value={tool.hue?.startsWith("#") ? tool.hue : "#38bdf8"}
                                onChange={(e) => {
                                  const list = [...(formData.frameworksAndTools || [])];
                                  list[idx].hue = e.target.value;
                                  setFormData((prev) => ({ ...prev, frameworksAndTools: list }));
                                }}
                                style={{
                                  width: "42px",
                                  height: "42px",
                                  borderRadius: "10px",
                                  border: "1px solid #334155",
                                  background: "transparent",
                                  cursor: "pointer",
                                  padding: "2px",
                                }}
                              />
                              <input
                                type="text"
                                value={tool.hue || "#38bdf8"}
                                onChange={(e) => {
                                  const list = [...(formData.frameworksAndTools || [])];
                                  list[idx].hue = e.target.value;
                                  setFormData((prev) => ({ ...prev, frameworksAndTools: list }));
                                }}
                                style={{ ...inputStyle, flex: 1, fontFamily: "var(--font-mono)", fontSize: "0.85rem" }}
                                placeholder="#38bdf8"
                              />
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* ════════ QUALIFICATIONS TAB ════════ */}
              {activeTab === "experience" && (
                <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
                  {/* Leadership & Experience */}
                  <div style={{
                    background: "#131a2c",
                    border: "1px solid #23304b",
                    borderRadius: "18px",
                    padding: "24px",
                  }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                      <div>
                        <h4 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#38bdf8", margin: 0, display: "flex", alignItems: "center", gap: "8px" }}>
                          <i className="ri-briefcase-line" /> Leadership & Engineering Roles
                        </h4>
                        <p style={{ fontSize: "0.80rem", color: "#94a3b8", margin: "4px 0 0 0" }}>
                          (Internship removed as requested)
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={handleAddExperience}
                        style={{
                          padding: "8px 16px",
                          background: "rgba(6,182,212,0.20)",
                          border: "1px solid rgba(6,182,212,0.40)",
                          borderRadius: "10px",
                          color: "#67e8f9",
                          fontSize: "0.82rem",
                          fontWeight: 700,
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          gap: "6px",
                        }}
                      >
                        <i className="ri-add-line" /> Add Position
                      </button>
                    </div>

                    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                      {formData.experience.map((exp, idx) => (
                        <div
                          key={exp.id || idx}
                          style={{
                            background: "#0b0f19",
                            border: "1px solid #1f293d",
                            borderRadius: "14px",
                            padding: "18px",
                          }}
                        >
                          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px" }}>
                            <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "#67e8f9" }}>
                              Role #{idx + 1}
                            </span>
                            <button
                              type="button"
                              onClick={() => handleDeleteExperience(exp.id)}
                              style={{
                                background: "transparent",
                                border: "none",
                                color: "#ef4444",
                                cursor: "pointer",
                                fontSize: "0.85rem",
                              }}
                            >
                              <i className="ri-delete-bin-line" /> Delete
                            </button>
                          </div>

                          <div className="admin-grid-3" style={{ marginBottom: "12px" }}>
                            <div>
                              <label style={labelStyle}>Role Title</label>
                              <input
                                type="text"
                                value={exp.title || ""}
                                onChange={(e) => {
                                  const newExp = [...formData.experience];
                                  newExp[idx].title = e.target.value;
                                  setFormData((prev) => ({ ...prev, experience: newExp }));
                                }}
                                style={inputStyle}
                              />
                            </div>

                            <div>
                              <label style={labelStyle}>Organization / Club</label>
                              <input
                                type="text"
                                value={exp.institution || ""}
                                onChange={(e) => {
                                  const newExp = [...formData.experience];
                                  newExp[idx].institution = e.target.value;
                                  setFormData((prev) => ({ ...prev, experience: newExp }));
                                }}
                                style={inputStyle}
                              />
                            </div>

                            <div>
                              <label style={labelStyle}>Period (e.g. 2024 – Present)</label>
                              <input
                                type="text"
                                value={exp.period || ""}
                                onChange={(e) => {
                                  const newExp = [...formData.experience];
                                  newExp[idx].period = e.target.value;
                                  setFormData((prev) => ({ ...prev, experience: newExp }));
                                }}
                                style={inputStyle}
                              />
                            </div>
                          </div>

                          <div>
                            <label style={labelStyle}>Role Responsibilities & Achievements</label>
                            <textarea
                              rows={2}
                              value={exp.description || ""}
                              onChange={(e) => {
                                const newExp = [...formData.experience];
                                newExp[idx].description = e.target.value;
                                setFormData((prev) => ({ ...prev, experience: newExp }));
                              }}
                              style={inputStyle}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Education */}
                  <div style={{
                    background: "#131a2c",
                    border: "1px solid #23304b",
                    borderRadius: "18px",
                    padding: "24px",
                  }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                      <h4 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#a78bfa", margin: 0, display: "flex", alignItems: "center", gap: "8px" }}>
                        <i className="ri-graduation-cap-line" /> Academic Education
                      </h4>

                      <button
                        type="button"
                        onClick={handleAddEducation}
                        style={{
                          padding: "8px 16px",
                          background: "rgba(124,58,237,0.20)",
                          border: "1px solid rgba(124,58,237,0.40)",
                          borderRadius: "10px",
                          color: "#c4b5fd",
                          fontSize: "0.82rem",
                          fontWeight: 700,
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          gap: "6px",
                        }}
                      >
                        <i className="ri-add-line" /> Add Education
                      </button>
                    </div>

                    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                      {formData.education.map((edu, idx) => (
                        <div
                          key={edu.id || idx}
                          style={{
                            background: "#0b0f19",
                            border: "1px solid #1f293d",
                            borderRadius: "14px",
                            padding: "18px",
                          }}
                        >
                          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px" }}>
                            <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "#c4b5fd" }}>
                              Education Entry #{idx + 1}
                            </span>
                            <button
                              type="button"
                              onClick={() => handleDeleteEducation(edu.id)}
                              style={{
                                background: "transparent",
                                border: "none",
                                color: "#ef4444",
                                cursor: "pointer",
                                fontSize: "0.85rem",
                              }}
                            >
                              <i className="ri-delete-bin-line" /> Delete
                            </button>
                          </div>

                          <div className="admin-grid-4">
                            <div>
                              <label style={labelStyle}>Degree / Certificate</label>
                              <input
                                type="text"
                                value={edu.title || ""}
                                onChange={(e) => {
                                  const newEdu = [...formData.education];
                                  newEdu[idx].title = e.target.value;
                                  setFormData((prev) => ({ ...prev, education: newEdu }));
                                }}
                                style={inputStyle}
                              />
                            </div>

                            <div>
                              <label style={labelStyle}>Institution / School</label>
                              <input
                                type="text"
                                value={edu.institution || ""}
                                onChange={(e) => {
                                  const newEdu = [...formData.education];
                                  newEdu[idx].institution = e.target.value;
                                  setFormData((prev) => ({ ...prev, education: newEdu }));
                                }}
                                style={inputStyle}
                              />
                            </div>

                            <div>
                              <label style={labelStyle}>Period</label>
                              <input
                                type="text"
                                value={edu.period || ""}
                                onChange={(e) => {
                                  const newEdu = [...formData.education];
                                  newEdu[idx].period = e.target.value;
                                  setFormData((prev) => ({ ...prev, education: newEdu }));
                                }}
                                style={inputStyle}
                              />
                            </div>

                            <div>
                              <label style={labelStyle}>Score / Status</label>
                              <input
                                type="text"
                                value={edu.score || ""}
                                onChange={(e) => {
                                  const newEdu = [...formData.education];
                                  newEdu[idx].score = e.target.value;
                                  setFormData((prev) => ({ ...prev, education: newEdu }));
                                }}
                                style={inputStyle}
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* ════════ SERVICES TAB ════════ */}
              {activeTab === "services" && (
                <div style={{ display: "flex", flexDirection: "column", gap: "22px" }}>
                  {formData.services.map((srv, idx) => (
                    <div
                      key={srv.id || idx}
                      style={{
                        background: "#131a2c",
                        border: "1px solid #23304b",
                        borderRadius: "18px",
                        padding: "24px",
                      }}
                    >
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
                        <h4 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#38bdf8", margin: 0, display: "flex", alignItems: "center", gap: "8px" }}>
                          <i className={srv.icon || "ri-service-line"} /> Service #{idx + 1}: {srv.title}
                        </h4>
                      </div>

                      <div className="admin-grid-2" style={{ marginBottom: "14px" }}>
                        <div>
                          <label style={labelStyle}>Service Title</label>
                          <input
                            type="text"
                            value={srv.title || ""}
                            onChange={(e) => {
                              const newS = [...formData.services];
                              newS[idx].title = e.target.value;
                              setFormData((prev) => ({ ...prev, services: newS }));
                            }}
                            style={inputStyle}
                          />
                        </div>

                        <div>
                          <label style={labelStyle}>Service Tagline</label>
                          <input
                            type="text"
                            value={srv.tagline || ""}
                            onChange={(e) => {
                              const newS = [...formData.services];
                              newS[idx].tagline = e.target.value;
                              setFormData((prev) => ({ ...prev, services: newS }));
                            }}
                            style={inputStyle}
                          />
                        </div>
                      </div>

                      <div style={{ marginBottom: "14px" }}>
                        <label style={labelStyle}>Detailed Scope Description</label>
                        <textarea
                          rows={2}
                          value={srv.desc || ""}
                          onChange={(e) => {
                            const newS = [...formData.services];
                            newS[idx].desc = e.target.value;
                            setFormData((prev) => ({ ...prev, services: newS }));
                          }}
                          style={inputStyle}
                        />
                      </div>

                      <div>
                        <label style={labelStyle}>Deliverable Features (One per line)</label>
                        <textarea
                          rows={3}
                          value={srv.features ? srv.features.join("\n") : ""}
                          onChange={(e) => {
                            const newS = [...formData.services];
                            newS[idx].features = e.target.value.split("\n").filter(Boolean);
                            setFormData((prev) => ({ ...prev, services: newS }));
                          }}
                          style={inputStyle}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* ════════ TESTIMONIALS TAB ════════ */}
              {activeTab === "testimonials" && (
                <div>
                  <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "20px",
                  }}>
                    <h4 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#f8fafc", margin: 0 }}>
                      Client & Peer Endorsements ({formData.testimonials?.length || 0})
                    </h4>

                    <button
                      type="button"
                      onClick={handleAddTestimonial}
                      style={{
                        padding: "8px 16px",
                        background: "rgba(124,58,237,0.20)",
                        border: "1px solid rgba(124,58,237,0.40)",
                        borderRadius: "10px",
                        color: "#c4b5fd",
                        fontSize: "0.82rem",
                        fontWeight: 700,
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                      }}
                    >
                      <i className="ri-add-line" /> Add Endorsement
                    </button>
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
                    {formData.testimonials?.map((t, idx) => (
                      <div
                        key={t.id || idx}
                        style={{
                          background: "#131a2c",
                          border: "1px solid #23304b",
                          borderRadius: "16px",
                          padding: "20px",
                        }}
                      >
                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "14px" }}>
                          <span style={{ fontSize: "0.88rem", fontWeight: 700, color: "#a78bfa" }}>
                            Endorsement #{idx + 1}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleDeleteTestimonial(t.id)}
                            style={{
                              background: "transparent",
                              border: "none",
                              color: "#ef4444",
                              cursor: "pointer",
                            }}
                          >
                            <i className="ri-delete-bin-line" /> Delete
                          </button>
                        </div>

                        <div className="admin-grid-3" style={{ marginBottom: "12px" }}>
                          <div>
                            <label style={labelStyle}>Author Name</label>
                            <input
                              type="text"
                              value={t.name || ""}
                              onChange={(e) => {
                                const newT = [...formData.testimonials];
                                newT[idx].name = e.target.value;
                                setFormData((prev) => ({ ...prev, testimonials: newT }));
                              }}
                              style={inputStyle}
                            />
                          </div>

                          <div>
                            <label style={labelStyle}>Role & Organization</label>
                            <input
                              type="text"
                              value={t.role || ""}
                              onChange={(e) => {
                                const newT = [...formData.testimonials];
                                newT[idx].role = e.target.value;
                                setFormData((prev) => ({ ...prev, testimonials: newT }));
                              }}
                              style={inputStyle}
                            />
                          </div>

                          <div>
                            <label style={labelStyle}>Avatar Initials</label>
                            <input
                              type="text"
                              maxLength={3}
                              value={t.avatar || ""}
                              onChange={(e) => {
                                const newT = [...formData.testimonials];
                                newT[idx].avatar = e.target.value.toUpperCase();
                                setFormData((prev) => ({ ...prev, testimonials: newT }));
                              }}
                              style={inputStyle}
                            />
                          </div>
                        </div>

                        <div>
                          <label style={labelStyle}>Recommendation Quote</label>
                          <textarea
                            rows={3}
                            value={t.quote || ""}
                            onChange={(e) => {
                              const newT = [...formData.testimonials];
                              newT[idx].quote = e.target.value;
                              setFormData((prev) => ({ ...prev, testimonials: newT }));
                            }}
                            style={inputStyle}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ════════ SECURITY & BACKUP TAB ════════ */}
              {activeTab === "security" && (
                <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
                  {/* Change PIN Box */}
                  <div
                    style={{
                      background: "#131a2c",
                      border: "1px solid #23304b",
                      borderRadius: "18px",
                      padding: "24px",
                    }}
                  >
                    <h4 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#f8fafc", marginBottom: "8px", display: "flex", alignItems: "center", gap: "8px" }}>
                      <i className="ri-lock-password-line" /> Change Security PIN
                    </h4>
                    <p style={{ fontSize: "0.85rem", color: "#94a3b8", marginBottom: "18px" }}>
                      Update your secret code so that unauthorized visitors can never modify your portfolio.
                    </p>

                    <form onSubmit={handlePinUpdate} style={{ display: "flex", gap: "14px", flexWrap: "wrap", alignItems: "flex-end" }}>
                      <div style={{ flex: "1 1 140px", minWidth: "130px" }}>
                        <label style={labelStyle}>Current PIN</label>
                        <input
                          type={showChangePin ? "text" : "password"}
                          placeholder="Current PIN"
                          value={oldPin}
                          onChange={(e) => setOldPin(e.target.value)}
                          style={inputStyle}
                        />
                      </div>

                      <div style={{ flex: "1 1 140px", minWidth: "130px" }}>
                        <label style={labelStyle}>New PIN (Min 4 chars)</label>
                        <input
                          type={showChangePin ? "text" : "password"}
                          placeholder="New PIN"
                          value={newPin}
                          onChange={(e) => setNewPin(e.target.value)}
                          style={inputStyle}
                        />
                      </div>

                      <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                        <button
                          type="button"
                          onClick={() => setShowChangePin(!showChangePin)}
                          style={{
                            padding: "11px 14px",
                            background: "#1e293b",
                            border: "1px solid #334155",
                            borderRadius: "10px",
                            color: "#94a3b8",
                            cursor: "pointer",
                          }}
                        >
                          <i className={showChangePin ? "ri-eye-off-line" : "ri-eye-line"} />
                        </button>

                        <button
                          type="submit"
                          style={{
                            padding: "11px 22px",
                            background: "#7c3aed",
                            border: "1px solid rgba(255,255,255,0.2)",
                            borderRadius: "10px",
                            color: "#ffffff",
                            fontWeight: 700,
                            fontSize: "0.88rem",
                            cursor: "pointer",
                            whiteSpace: "nowrap",
                          }}
                        >
                          Update PIN
                        </button>
                      </div>
                    </form>

                    {pinMsg && (
                      <p style={{
                        marginTop: "12px",
                        fontSize: "0.86rem",
                        fontWeight: 700,
                        color: pinMsg.includes("successfully") ? "#34d399" : "#f87171"
                      }}>
                        {pinMsg}
                      </p>
                    )}
                  </div>

                  {/* Backup / Export Box */}
                  <div
                    style={{
                      background: "#131a2c",
                      border: "1px solid #23304b",
                      borderRadius: "18px",
                      padding: "24px",
                    }}
                  >
                    <h4 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#f8fafc", marginBottom: "8px", display: "flex", alignItems: "center", gap: "8px" }}>
                      <i className="ri-download-cloud-line" /> Export & Backup Configuration
                    </h4>
                    <p style={{ fontSize: "0.85rem", color: "#94a3b8", marginBottom: "18px" }}>
                      Download a JSON file of all your customized portfolio data or copy it directly to your clipboard.
                    </p>

                    <div style={{ display: "flex", gap: "14px", flexWrap: "wrap", marginBottom: "20px" }}>
                      <button
                        onClick={() => {
                          const json = exportDataJSON();
                          navigator.clipboard.writeText(json);
                          alert("Portfolio configuration copied to your clipboard!");
                        }}
                        style={{
                          padding: "11px 22px",
                          background: "rgba(124,58,237,0.2)",
                          border: "1px solid rgba(124,58,237,0.4)",
                          borderRadius: "10px",
                          color: "#c4b5fd",
                          fontSize: "0.86rem",
                          fontWeight: 700,
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                        }}
                      >
                        <i className="ri-file-copy-line" /> Copy JSON Config
                      </button>

                      <button
                        onClick={() => {
                          const json = exportDataJSON();
                          const blob = new Blob([json], { type: "application/json" });
                          const url = URL.createObjectURL(blob);
                          const a = document.createElement("a");
                          a.href = url;
                          a.download = `portfolio-config-${new Date().toISOString().split("T")[0]}.json`;
                          a.click();
                        }}
                        style={{
                          padding: "11px 22px",
                          background: "rgba(6,182,212,0.2)",
                          border: "1px solid rgba(6,182,212,0.4)",
                          borderRadius: "10px",
                          color: "#67e8f9",
                          fontSize: "0.86rem",
                          fontWeight: 700,
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                        }}
                      >
                        <i className="ri-download-2-line" /> Download JSON Backup
                      </button>
                    </div>

                    <div>
                      <label style={labelStyle}>Paste JSON Configuration to Restore</label>
                      <textarea
                        rows={3}
                        value={importText}
                        onChange={(e) => setImportText(e.target.value)}
                        placeholder="Paste your JSON configuration string here..."
                        style={inputStyle}
                      />
                      <button
                        onClick={() => {
                          if (!importText.trim()) return;
                          const res = importDataJSON(importText);
                          if (res.success) {
                            alert("Portfolio configuration successfully restored!");
                            setFormData(portfolioData);
                            setImportText("");
                          } else {
                            alert(`Import error: ${res.message}`);
                          }
                        }}
                        style={{
                          marginTop: "10px",
                          padding: "9px 18px",
                          background: "#1e293b",
                          border: "1px solid #334155",
                          borderRadius: "8px",
                          color: "#ffffff",
                          fontSize: "0.82rem",
                          fontWeight: 600,
                          cursor: "pointer",
                        }}
                      >
                        Apply JSON Config
                      </button>
                    </div>
                  </div>

                  {/* Reset Defaults */}
                  <div
                    style={{
                      background: "rgba(239,68,68,0.08)",
                      border: "1px solid rgba(239,68,68,0.30)",
                      borderRadius: "18px",
                      padding: "24px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      flexWrap: "wrap",
                      gap: "14px",
                    }}
                  >
                    <div>
                      <h4 style={{ fontSize: "1rem", color: "#fca5a5", fontWeight: 700, margin: "0 0 4px 0" }}>
                        Factory Reset Defaults
                      </h4>
                      <p style={{ fontSize: "0.82rem", color: "#94a3b8", margin: 0 }}>
                        Revert all modified texts, projects, and skills back to the initial codebase state.
                      </p>
                    </div>
                    <button
                      onClick={handleReset}
                      style={{
                        padding: "10px 20px",
                        background: "rgba(239,68,68,0.25)",
                        border: "1px solid rgba(239,68,68,0.50)",
                        borderRadius: "10px",
                        color: "#ffffff",
                        fontSize: "0.86rem",
                        fontWeight: 700,
                        cursor: "pointer",
                      }}
                    >
                      <i className="ri-refresh-line" /> Reset to Initial State
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* ── Modal Sticky Footer ── */}
            <div className="admin-footer-bar">
              <div className="admin-footer-status" style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{ fontSize: "0.82rem", color: "#94a3b8" }}>
                  Status: All edits live in memory. Click
                </span>
                <strong style={{ color: "#34d399", fontSize: "0.82rem" }}>
                  "Save All Changes"
                </strong>
                <span style={{ fontSize: "0.82rem", color: "#94a3b8" }}>
                  to persist across reloads.
                </span>
              </div>

              <div className="admin-footer-buttons">
                <button
                  onClick={() => setIsOpen(false)}
                  style={{
                    padding: "9px 20px",
                    background: "#1e293b",
                    border: "1px solid #334155",
                    borderRadius: "10px",
                    color: "#f8fafc",
                    fontSize: "0.86rem",
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  Close
                </button>

                <button
                  onClick={handleSaveAll}
                  style={{
                    padding: "9px 22px",
                    background: "linear-gradient(135deg, #10b981, #059669)",
                    border: "1px solid rgba(255,255,255,0.2)",
                    borderRadius: "10px",
                    color: "#ffffff",
                    fontSize: "0.86rem",
                    fontWeight: 700,
                    cursor: "pointer",
                  }}
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

const labelStyle = {
  fontSize: "0.84rem",
  fontWeight: 700,
  color: "#e2e8f0",
  display: "block",
  marginBottom: "7px",
  letterSpacing: "0.02em",
};

const inputStyle = {
  width: "100%",
  padding: "12px 14px",
  background: "#080c17",
  border: "1px solid #2d3748",
  borderRadius: "10px",
  color: "#f8fafc",
  fontSize: "0.92rem",
  fontFamily: "var(--font-body)",
  outline: "none",
  boxSizing: "border-box",
  transition: "border-color 0.2s ease, box-shadow 0.2s ease",
};
