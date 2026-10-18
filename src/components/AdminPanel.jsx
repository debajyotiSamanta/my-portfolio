import { useState, useEffect, useId } from "react";
import { usePortfolio } from "../context/PortfolioContext";
import { ASSET_IMAGES } from "../data/portfolioData";

// Utility: Automatically compresses uploaded photos into compact, high-quality WebP/JPEG data URIs
// Keeps payload strictly under ~12KB per image so JSONbin free tier (100KB limit) never fails!
function compressImageFile(file, maxWidth = 480, maxHeight = 320, quality = 0.70) {
  return new Promise((resolve, reject) => {
    if (!file) return reject(new Error("No file provided"));
    if (file.type === "image/svg+xml") {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target?.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        let width = img.width;
        let height = img.height;
        if (width > maxWidth || height > maxHeight) {
          const ratio = Math.min(maxWidth / width, maxHeight / height);
          width = Math.round(width * ratio);
          height = Math.round(height * ratio);
        }
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = "high";
        ctx.drawImage(img, 0, 0, width, height);

        let compressed = canvas.toDataURL("image/webp", quality);
        if (!compressed || !compressed.startsWith("data:image/webp")) {
          compressed = canvas.toDataURL("image/jpeg", quality);
        }
        resolve(compressed);
      };
      img.onerror = () => resolve(e.target?.result);
      img.src = e.target?.result;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

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
    cloudConfig,
    updateCloudConfig,
    refreshFromCloud,
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

  // Auto-sync formData from cloud updates ONLY when the panel is closed
  // (avoids overwriting edits the user is actively making)
  useEffect(() => {
    if (!isOpen) {
      setFormData(JSON.parse(JSON.stringify(portfolioData)));
    }
  }, [portfolioData, isOpen]);

  // Security tab state
  const [oldPin, setOldPin] = useState("");
  const [newPin, setNewPin] = useState("");
  const [showChangePin, setShowChangePin] = useState(false);
  const [pinMsg, setPinMsg] = useState("");

  // Live Cloud Database Sync state
  const [cloudApiKey, setCloudApiKey] = useState(cloudConfig?.apiKey || "");
  const [cloudBinId, setCloudBinId] = useState(cloudConfig?.binId || "");
  const [cloudStatusMsg, setCloudStatusMsg] = useState("");
  const [isCloudLoading, setIsCloudLoading] = useState(false);

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

  const handleSaveAll = async () => {
    setSaveStatus("Saving and syncing across all devices...");
    const res = await savePortfolioData(formData);
    if (res && res.success) {
      if (res.cloudSynced) {
        setSaveStatus("Changes successfully saved and synced live across all devices!");
      } else {
        setSaveStatus(`Saved locally! Cloud note: ${res.cloudError || "Stored on this device"}`);
      }
      setTimeout(() => setSaveStatus(""), 5000);
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

  // ── Cloud Database Handlers ──
  const handleAutoCreateCloudBin = async () => {
    if (!cloudApiKey.trim()) {
      setCloudStatusMsg("Please enter your JSONbin Master Key first.");
      return;
    }
    setIsCloudLoading(true);
    setCloudStatusMsg("Connecting and creating public cloud database on JSONbin...");
    try {
      const res = await fetch("https://api.jsonbin.io/v3/b", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Master-Key": cloudApiKey.trim(),
          "X-Bin-Name": "debajyoti-portfolio-live",
          "X-Bin-Private": "false",
        },
        body: JSON.stringify({
          ...formData,
          version: PORTFOLIO_BUILD_VERSION,
          lastUpdated: new Date().toISOString(),
        }),
      });
      const data = await res.json();
      if (data?.metadata?.id) {
        const newBinId = data.metadata.id;
        setCloudBinId(newBinId);
        updateCloudConfig({
          provider: "jsonbin",
          binId: newBinId,
          apiKey: cloudApiKey.trim(),
        });
        setCloudStatusMsg(`Cloud Database connected successfully! Bin ID: ${newBinId}. All devices will now receive your updates.`);
      } else {
        setCloudStatusMsg(`Error creating bin: ${data?.message || "Invalid Key or request failed"}`);
      }
    } catch (err) {
      setCloudStatusMsg(`Connection failed: ${err.message}`);
    } finally {
      setIsCloudLoading(false);
    }
  };

  const handleSaveManualCloud = () => {
    if (!cloudBinId.trim() || !cloudApiKey.trim()) {
      setCloudStatusMsg("Please provide both Bin ID and API Key.");
      return;
    }
    updateCloudConfig({
      provider: "jsonbin",
      binId: cloudBinId.trim(),
      apiKey: cloudApiKey.trim(),
    });
    setCloudStatusMsg("Cloud Database configuration saved! Any changes will now sync live.");
    setTimeout(() => setCloudStatusMsg(""), 5000);
  };

  const handleTestCloudConnection = async () => {
    if (!cloudBinId.trim()) {
      setCloudStatusMsg("No Bin ID provided to test.");
      return;
    }
    setIsCloudLoading(true);
    setCloudStatusMsg("Testing connection to cloud database...");
    try {
      const headers = { "X-Bin-Meta": "false" };
      if (cloudApiKey.trim()) headers["X-Master-Key"] = cloudApiKey.trim();
      const res = await fetch(`https://api.jsonbin.io/v3/b/${cloudBinId.trim()}/latest`, { headers });
      if (res.ok) {
        setCloudStatusMsg("Connection test SUCCESSFUL! Cloud Database is online and accessible.");
      } else {
        setCloudStatusMsg(`Connection test failed: HTTP ${res.status} (${res.statusText})`);
      }
    } catch (err) {
      setCloudStatusMsg(`Connection test failed: ${err.message}`);
    } finally {
      setIsCloudLoading(false);
    }
  };

  const handleDisconnectCloud = () => {
    if (window.confirm("Disconnect from Cloud Database? Changes will only be saved locally until reconnected.")) {
      setCloudBinId("");
      setCloudApiKey("");
      updateCloudConfig({
        provider: "jsonbin",
        binId: "",
        apiKey: "",
      });
      setCloudStatusMsg("Cloud Database disconnected.");
    }
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

  const handleProjectImageUpload = async (e, projId) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setSaveStatus("Optimizing thumbnail image...");
      const compressed = await compressImageFile(file, 480, 320, 0.70);
      setFormData((prev) => ({
        ...prev,
        projects: prev.projects.map((p) =>
          p.id === projId ? { ...p, img: compressed, imgKey: "" } : p
        ),
      }));
      setSaveStatus(`Thumbnail updated & optimized (${(compressed.length / 1024).toFixed(0)} KB). Click "Save All Changes" to persist live.`);
      setTimeout(() => setSaveStatus(""), 4500);
    } catch (err) {
      console.error("Failed to process thumbnail:", err);
      setSaveStatus("Error processing image file.");
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
  const handlePdfUpload = async (e, fieldKey, nameKey, defaultName) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async (uploadEvent) => {
      const base64 = uploadEvent.target?.result;
      if (!base64) return;

      let documentUrl = base64;
      const isLocal = typeof window !== "undefined" && (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1");

      if (isLocal) {
        try {
          const res = await fetch("/api/save-document", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ filename: file.name, base64 }),
          });
          const resData = await res.json();
          if (resData?.success && resData.url) {
            documentUrl = resData.url;
            console.info("[AdminPanel] Saved PDF directly to public directory:", documentUrl);
          }
        } catch {
          // Dev endpoint not active, continue with base64
        }
      }

      setFormData((prev) => ({
        ...prev,
        personal: {
          ...prev.personal,
          [fieldKey]: documentUrl,
          [nameKey]: file.name || defaultName,
        },
      }));

      const sizeKb = Math.round(file.size / 1024);
      if (documentUrl.startsWith("/") || sizeKb <= 60) {
        setSaveStatus(`Uploaded "${file.name}" (${sizeKb} KB). Click "Save All Changes" to sync across all devices!`);
      } else {
        setSaveStatus(`Loaded "${file.name}" (${sizeKb} KB). Note: To make large PDFs visible across all devices, paste a Google Drive / GitHub link below or place the file in the public/ folder.`);
      }
      setTimeout(() => setSaveStatus(""), 6000);
    };
    reader.readAsDataURL(file);
  };

  // ── Profile Photo Upload & Reset Helpers ──
  const handleAvatarUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setSaveStatus("Optimizing profile photo...");
      const compressed = await compressImageFile(file, 360, 360, 0.72);
      setFormData((prev) => ({
        ...prev,
        personal: {
          ...prev.personal,
          avatar: compressed,
          avatarKey: "",
        },
      }));
      setSaveStatus(`Profile photo updated & optimized (${(compressed.length / 1024).toFixed(0)} KB). Click "Save All Changes" to persist live.`);
      setTimeout(() => setSaveStatus(""), 4500);
    } catch (err) {
      console.error("Failed to process photo:", err);
      setSaveStatus("Error processing photo file.");
    }
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

  const handleToolIconUpload = async (e, index) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const compressed = await compressImageFile(file, 80, 80, 0.75);
      setFormData((prev) => {
        const updated = [...(prev.frameworksAndTools || [])];
        updated[index] = {
          ...updated[index],
          img: compressed,
          imgKey: "", // clear asset key when custom image is uploaded
        };
        return { ...prev, frameworksAndTools: updated };
      });
      setSaveStatus("Tool icon updated & optimized. Click 'Save All Changes' to persist.");
      setTimeout(() => setSaveStatus(""), 4000);
    } catch (err) {
      console.error("Tool icon error:", err);
    }
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
              ? "#1e293b"
              : "rgba(15, 23, 42, 0.92)",
            backdropFilter: "blur(20px)",
            border: isAdmin
              ? "1px solid rgba(59, 130, 246, 0.55)"
              : "1px solid rgba(255, 255, 255, 0.16)",
            borderRadius: "999px",
            color: "#ffffff",
            fontSize: "0.84rem",
            fontWeight: 600,
            cursor: "pointer",
            boxShadow: isAdmin
              ? "0 6px 20px rgba(0, 0, 0, 0.6), 0 0 14px rgba(59, 130, 246, 0.25)"
              : "0 6px 20px rgba(0, 0, 0, 0.6)",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            transition: "all 0.25s ease",
          }}
        >
          <i className={isAdmin ? "ri-dashboard-3-fill" : "ri-shield-keyhole-line"} style={{ fontSize: "1rem", color: isAdmin ? "#60a5fa" : "#94a3b8" }} />
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
                    background: "rgba(59, 130, 246, 0.12)",
                    border: "1px solid rgba(59, 130, 246, 0.25)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#60a5fa",
                    fontSize: "1.25rem",
                    flexShrink: 0,
                  }}
                >
                  <i className="ri-settings-4-fill" />
                </div>
                <div style={{ minWidth: 0, flex: 1 }}>
                  <h3 style={{ fontSize: "1.15rem", fontWeight: 800, color: "#f8fafc", margin: 0, fontFamily: "var(--font-display)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    Portfolio Dynamic Manager
                  </h3>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "3px" }}>
                    <span style={{
                      display: "inline-block", width: "7px", height: "7px", borderRadius: "50%",
                      backgroundColor: "#10b981", boxShadow: "0 0 8px #10b981", flexShrink: 0,
                    }} />
                    <span style={{ fontSize: "0.76rem", color: "#60a5fa", fontWeight: 600 }}>
                      Owner Access
                    </span>
                    <span style={{ fontSize: "0.76rem", color: "#64748b" }}>•</span>
                    <span style={{ fontSize: "0.76rem", color: "#94a3b8" }}>
                      Live Editing
                    </span>
                  </div>
                </div>

                {/* Close Button on mobile view */}
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="admin-modal-close-mobile"
                  title="Close Manager"
                >
                  <i className="ri-close-line" />
                </button>
              </div>

              <div className="admin-modal-header-actions">
                <button
                  type="button"
                  onClick={async () => {
                    setSaveStatus("Refreshing latest data from cloud...");
                    await refreshFromCloud();
                    setSaveStatus("Cloud data refreshed! Latest updates loaded.");
                    setTimeout(() => setSaveStatus(""), 3000);
                  }}
                  className="admin-save-all-btn"
                  title="Pull latest data from cloud"
                  style={{ background: "rgba(6,182,212,0.15)", border: "1px solid rgba(6,182,212,0.4)" }}
                >
                  <i className="ri-refresh-line" style={{ fontSize: "1rem" }} />
                  <span className="save-btn-text">Refresh from Cloud</span>
                </button>

                <button
                  type="button"
                  onClick={handleSaveAll}
                  className="admin-save-all-btn"
                  title="Save All Changes live"
                >
                  <i className="ri-save-3-line" style={{ fontSize: "1rem" }} />
                  <span className="save-btn-text">Save All Changes</span>
                </button>

                {/* Close Button on desktop view */}
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="admin-modal-close-desktop"
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
                { id: "cloud", label: "Cloud Sync (Live)", icon: "ri-cloud-line", badge: cloudConfig?.binId ? 0 : 0 },
                { id: "security", label: "Backup & PIN", icon: "ri-shield-keyhole-line" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`admin-tab-btn ${activeTab === tab.id ? "active" : ""}`}
                  style={{
                    background: activeTab === tab.id ? "#1e293b" : "transparent",
                    border: `1px solid ${activeTab === tab.id ? "rgba(255,255,255,0.16)" : "transparent"}`,
                    color: activeTab === tab.id ? "#ffffff" : "#94a3b8",
                    boxShadow: activeTab === tab.id ? "0 2px 8px rgba(0,0,0,0.35)" : "none",
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
                            src={resolveImage(formData.personal.avatarKey || "myImage", formData.personal.avatar)}
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
                  <div className="admin-section-header">
                    <div>
                      <h4 style={{ fontSize: "1.15rem", fontWeight: 700, color: "#f8fafc", margin: 0 }}>
                        All Showcase Projects ({formData.projects?.length || 0})
                      </h4>
                      <p style={{ fontSize: "0.82rem", color: "#94a3b8", margin: "4px 0 0 0" }}>
                        Click any project card to edit title, description, category, demo URL, thumbnail, or tech stack.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={handleAddProject}
                      className="admin-btn-primary"
                      style={{
                        padding: "10px 20px",
                        background: "#2563eb",
                        border: "1px solid rgba(255, 255, 255, 0.20)",
                        borderRadius: "12px",
                        color: "#ffffff",
                        fontSize: "0.86rem",
                        fontWeight: 600,
                        cursor: "pointer",
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "8px",
                        boxShadow: "0 2px 10px rgba(37, 99, 235, 0.35)",
                        transition: "all 0.2s ease",
                      }}
                    >
                      <i className="ri-add-circle-fill" style={{ fontSize: "1.1rem" }} />
                      <span>Add New Project</span>
                    </button>
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                    {formData.projects.map((proj, idx) => {
                      const isExpanded = editingProjectId === proj.id;
                      const thumb = resolveImage(proj.imgKey, proj.img, proj);

                      return (
                        <div
                          key={proj.id || idx}
                          className={`admin-project-card ${isExpanded ? "expanded" : ""}`}
                        >
                          {/* Project Header Row */}
                          <div
                            className="admin-project-header"
                            onClick={() => setEditingProjectId(isExpanded ? null : proj.id)}
                          >
                            <div className="admin-project-header-left">
                              <img
                                src={thumb}
                                alt={proj.title}
                                className="admin-project-thumb"
                              />
                              <div className="admin-project-meta">
                                <div className="admin-project-title-row">
                                  <h4 className="admin-project-title">
                                    {proj.title}
                                  </h4>
                                  <span className="admin-project-tag">
                                    {proj.tag}
                                  </span>
                                  {proj.featured && (
                                    <span style={{
                                      padding: "2px 8px",
                                      borderRadius: "999px",
                                      fontSize: "0.68rem",
                                      fontWeight: 600,
                                      background: "rgba(234, 179, 8, 0.15)",
                                      color: "#fde047",
                                      border: "1px solid rgba(234, 179, 8, 0.3)",
                                      whiteSpace: "nowrap",
                                    }}>
                                      Featured
                                    </span>
                                  )}
                                </div>
                                <span className="admin-project-subtitle">
                                  {proj.subtitle}
                                </span>
                              </div>
                            </div>

                            <div className="admin-project-actions">
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setEditingProjectId(isExpanded ? null : proj.id);
                                }}
                                className="admin-btn-action-edit"
                              >
                                <i className={isExpanded ? "ri-arrow-up-s-line" : "ri-edit-line"} />
                                <span>{isExpanded ? "Collapse" : "Edit Details"}</span>
                              </button>

                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleDeleteProject(proj.id);
                                }}
                                className="admin-btn-action-delete"
                                title="Delete Project"
                              >
                                <i className="ri-delete-bin-line" />
                              </button>
                            </div>
                          </div>

                          {/* Expanded Edit Form */}
                          {isExpanded && (
                            <div style={{ marginTop: "20px", paddingTop: "20px", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
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
                                    placeholder="e.g. Finance Manager"
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
                                    placeholder="e.g. Full-Stack Web Application"
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
                                  <label style={labelStyle}>Image Key or Custom URL</label>
                                  <input
                                    type="text"
                                    value={proj.imgKey || ""}
                                    onChange={(e) => {
                                      const newP = [...formData.projects];
                                      newP[idx].imgKey = e.target.value;
                                      newP[idx].img = "";
                                      setFormData((prev) => ({ ...prev, projects: newP }));
                                    }}
                                    style={inputStyle}
                                    placeholder="e.g. mentorship, musicHub, localFix..."
                                  />
                                </div>

                                <div>
                                  <label style={labelStyle}>Accent Color</label>
                                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                                    <input
                                      type="color"
                                      value={proj.accentColor?.startsWith("#") ? proj.accentColor : "#3b82f6"}
                                      onChange={(e) => {
                                        const newP = [...formData.projects];
                                        newP[idx].accentColor = e.target.value;
                                        setFormData((prev) => ({ ...prev, projects: newP }));
                                      }}
                                      style={{
                                        width: "40px",
                                        height: "40px",
                                        borderRadius: "8px",
                                        border: "1px solid #334155",
                                        background: "transparent",
                                        cursor: "pointer",
                                        padding: "2px",
                                        flexShrink: 0,
                                      }}
                                    />
                                    <input
                                      type="text"
                                      value={proj.accentColor || "#3b82f6"}
                                      onChange={(e) => {
                                        const newP = [...formData.projects];
                                        newP[idx].accentColor = e.target.value;
                                        setFormData((prev) => ({ ...prev, projects: newP }));
                                      }}
                                      style={{ ...inputStyle, flex: 1 }}
                                      placeholder="#3b82f6"
                                    />
                                  </div>
                                </div>
                              </div>

                              {/* Upload custom thumbnail option */}
                              <div style={{ marginBottom: "16px" }}>
                                <label style={labelStyle}>Upload Project Screenshot / Thumbnail from Device</label>
                                <input
                                  type="file"
                                  accept="image/*"
                                  onChange={(e) => handleProjectImageUpload(e, proj.id)}
                                  style={{
                                    ...inputStyle,
                                    padding: "8px 12px",
                                    cursor: "pointer",
                                    fontSize: "0.82rem",
                                  }}
                                />
                              </div>

                              <div style={{ marginBottom: "16px" }}>
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
                                  <label style={{ ...labelStyle, marginBottom: 0 }}>Live Demo Website URL *</label>
                                  {proj.link && (
                                    <a
                                      href={proj.link}
                                      target="_blank"
                                      rel="noreferrer"
                                      style={{ fontSize: "0.78rem", color: "#60a5fa", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "4px" }}
                                    >
                                      Test Link <i className="ri-external-link-line" />
                                    </a>
                                  )}
                                </div>
                                <input
                                  type="url"
                                  value={proj.link || ""}
                                  onChange={(e) => {
                                    const newP = [...formData.projects];
                                    newP[idx].link = e.target.value;
                                    setFormData((prev) => ({ ...prev, projects: newP }));
                                  }}
                                  style={inputStyle}
                                  placeholder="https://..."
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
                                  placeholder="Describe the application features, architecture, and impact..."
                                />
                              </div>

                              <div style={{ marginBottom: "18px" }}>
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
                                  placeholder="React, Node.js, Express, MongoDB, Tailwind CSS"
                                />
                                {proj.tech && proj.tech.length > 0 && (
                                  <div className="admin-tech-tags-list">
                                    {proj.tech.map((t, tIdx) => (
                                      <span key={tIdx} className="admin-tech-pill">
                                        {t}
                                      </span>
                                    ))}
                                  </div>
                                )}
                              </div>

                              <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", paddingTop: "14px", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                                <button
                                  type="button"
                                  onClick={() => setEditingProjectId(null)}
                                  style={{
                                    padding: "8px 18px",
                                    background: "#1e293b",
                                    border: "1px solid #334155",
                                    borderRadius: "8px",
                                    color: "#e2e8f0",
                                    fontSize: "0.82rem",
                                    fontWeight: 600,
                                    cursor: "pointer",
                                  }}
                                >
                                  Done Editing
                                </button>
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
                  <div className="admin-skills-info-banner">
                    <i className="ri-information-line" />
                    <div>
                      <strong style={{ color: "#f8fafc", display: "block", marginBottom: "2px" }}>
                        Technical Skills Matrix & Proficiency
                      </strong>
                      <span>
                        Adjust category titles, skill names, and mastery percentages (10% to 100%). Use the range sliders or enter exact values.
                      </span>
                    </div>
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                    {formData.skillsCategories.map((cat, catIdx) => (
                      <div
                        key={cat.id || catIdx}
                        className="admin-skill-category-card"
                      >
                        <div className="admin-skill-category-header">
                          <div className="admin-skill-category-title-group">
                            <div className="admin-skill-category-icon">
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
                              className="admin-skill-category-input"
                              placeholder="Category Name"
                            />
                          </div>

                          <button
                            type="button"
                            onClick={() => handleAddSkill(catIdx)}
                            className="admin-btn-add-skill"
                          >
                            <i className="ri-add-line" />
                            <span>Add Skill</span>
                          </button>
                        </div>

                        <div className="admin-grid-2">
                          {cat.skills?.map((sk, skIdx) => (
                            <div
                              key={skIdx}
                              className="admin-skill-row"
                            >
                              <div className="admin-skill-row-top">
                                <input
                                  type="text"
                                  value={sk.name}
                                  onChange={(e) => {
                                    const newCats = [...formData.skillsCategories];
                                    newCats[catIdx].skills[skIdx].name = e.target.value;
                                    setFormData((prev) => ({ ...prev, skillsCategories: newCats }));
                                  }}
                                  className="admin-skill-name-input"
                                  placeholder="Skill Name (e.g. React.js)"
                                />

                                <button
                                  type="button"
                                  onClick={() => handleDeleteSkill(catIdx, skIdx)}
                                  style={{
                                    background: "rgba(239, 68, 68, 0.10)",
                                    border: "1px solid rgba(239, 68, 68, 0.25)",
                                    borderRadius: "6px",
                                    color: "#fca5a5",
                                    cursor: "pointer",
                                    padding: "6px 8px",
                                    display: "inline-flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    transition: "all 0.15s ease",
                                  }}
                                  title="Delete Skill"
                                >
                                  <i className="ri-delete-bin-line" />
                                </button>
                              </div>

                              <div className="admin-skill-row-bottom">
                                <div className="admin-skill-range-container">
                                  <input
                                    type="range"
                                    min="10"
                                    max="100"
                                    step="1"
                                    value={sk.level}
                                    onChange={(e) => {
                                      const newCats = [...formData.skillsCategories];
                                      newCats[catIdx].skills[skIdx].level = Number(e.target.value);
                                      setFormData((prev) => ({ ...prev, skillsCategories: newCats }));
                                    }}
                                    className="admin-skill-slider"
                                    style={{ accentColor: cat.color?.includes("#") ? cat.color : "#3b82f6" }}
                                  />
                                </div>

                                <div className="admin-skill-badge">
                                  <input
                                    type="number"
                                    min="10"
                                    max="100"
                                    value={sk.level}
                                    onChange={(e) => {
                                      const newCats = [...formData.skillsCategories];
                                      newCats[catIdx].skills[skIdx].level = Math.max(0, Math.min(100, Number(e.target.value)));
                                      setFormData((prev) => ({ ...prev, skillsCategories: newCats }));
                                    }}
                                    className="admin-skill-level-input"
                                  />
                                  <span style={{ fontSize: "0.80rem", color: "#94a3b8", fontWeight: 700 }}>%</span>
                                </div>
                              </div>
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
                      const toolImg = tool.img || resolveImage(tool.imgKey, null, tool);
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

              {/* ════════ CLOUD SYNC TAB (LIVE GLOBAL UPDATES) ════════ */}
              {activeTab === "cloud" && (
                <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                  {/* Status Banner */}
                  <div style={{
                    background: cloudConfig?.binId ? "rgba(16, 185, 129, 0.12)" : "rgba(245, 158, 11, 0.12)",
                    border: `1px solid ${cloudConfig?.binId ? "rgba(16, 185, 129, 0.35)" : "rgba(245, 158, 11, 0.35)"}`,
                    borderRadius: "16px",
                    padding: "20px 24px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexWrap: "wrap",
                    gap: "16px",
                  }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                      <div style={{
                        width: "48px", height: "48px", borderRadius: "14px",
                        background: cloudConfig?.binId ? "rgba(16, 185, 129, 0.20)" : "rgba(245, 158, 11, 0.20)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        color: cloudConfig?.binId ? "#34d399" : "#fbbf24",
                        fontSize: "1.5rem",
                      }}>
                        <i className={cloudConfig?.binId ? "ri-cloud-fill" : "ri-cloud-off-line"} />
                      </div>
                      <div>
                        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                          <h4 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#f8fafc", margin: 0 }}>
                            {cloudConfig?.binId ? "Live Cloud Sync Active" : "Cloud Sync Inactive"}
                          </h4>
                          <span style={{
                            padding: "3px 10px", borderRadius: "999px",
                            background: cloudConfig?.binId ? "rgba(16, 185, 129, 0.2)" : "rgba(245, 158, 11, 0.2)",
                            color: cloudConfig?.binId ? "#6ee7b7" : "#fde68a",
                            fontSize: "0.72rem", fontWeight: 700,
                          }}>
                            {cloudConfig?.binId ? "Global Broadcast ON" : "Local Storage Only"}
                          </span>
                        </div>
                        <p style={{ fontSize: "0.85rem", color: "#94a3b8", margin: 0 }}>
                          {cloudConfig?.binId
                            ? `Connected to Bin: ${cloudConfig.binId}. Whenever you click "Save All Changes", all viewers on all devices immediately receive updates.`
                            : "Your changes are currently saved only to this browser. Connect a free cloud database below so other devices receive your updates."}
                        </p>
                      </div>
                    </div>

                    {cloudConfig?.binId && (
                      <div style={{ display: "flex", gap: "10px" }}>
                        <button
                          type="button"
                          onClick={handleTestCloudConnection}
                          disabled={isCloudLoading}
                          style={{
                            padding: "8px 16px", background: "#1e293b",
                            border: "1px solid #334155", borderRadius: "8px",
                            color: "#e2e8f0", fontSize: "0.80rem", fontWeight: 600,
                            cursor: "pointer",
                          }}
                        >
                          <i className="ri-pulse-line" /> Test Connection
                        </button>
                        <button
                          type="button"
                          onClick={handleDisconnectCloud}
                          style={{
                            padding: "8px 14px", background: "rgba(239, 68, 68, 0.15)",
                            border: "1px solid rgba(239, 68, 68, 0.35)", borderRadius: "8px",
                            color: "#fca5a5", fontSize: "0.80rem", fontWeight: 600,
                            cursor: "pointer",
                          }}
                        >
                          Disconnect
                        </button>
                      </div>
                    )}
                  </div>

                  {cloudStatusMsg && (
                    <div style={{
                      padding: "12px 18px",
                      background: cloudStatusMsg.includes("SUCCESS") || cloudStatusMsg.includes("connected")
                        ? "rgba(16, 185, 129, 0.15)"
                        : "rgba(59, 130, 246, 0.15)",
                      border: "1px solid rgba(255,255,255,0.12)",
                      borderRadius: "12px",
                      color: "#f8fafc",
                      fontSize: "0.85rem",
                      fontWeight: 600,
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}>
                      <i className="ri-information-line" />
                      <span>{cloudStatusMsg}</span>
                    </div>
                  )}

                  {/* One-Click Auto Setup Card */}
                  <div className="admin-card">
                    <div style={{ marginBottom: "16px" }}>
                      <span style={{ fontSize: "0.72rem", fontWeight: 700, color: "#38bdf8", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                        Quick Setup (Free Forever)
                      </span>
                      <h4 style={{ fontSize: "1.15rem", fontWeight: 700, color: "#f8fafc", margin: "4px 0 6px 0" }}>
                        Connect Free JSONbin.io Cloud Database in 30 Seconds
                      </h4>
                      <p style={{ fontSize: "0.85rem", color: "#94a3b8", lineHeight: 1.6, margin: 0 }}>
                        JSONbin.io provides 10,000 free cloud requests per month with zero server setup.
                        Paste your Master Key below, and our manager will automatically create and connect your live cloud database with one click.
                      </p>
                    </div>

                    <div style={{
                      background: "#080c17",
                      border: "1px solid #1e293b",
                      borderRadius: "14px",
                      padding: "16px 20px",
                      marginBottom: "20px",
                    }}>
                      <ol style={{ margin: 0, paddingLeft: "18px", color: "#cbd5e1", fontSize: "0.86rem", lineHeight: 1.8 }}>
                        <li>
                          Open <a href="https://jsonbin.io" target="_blank" rel="noreferrer" style={{ color: "#38bdf8", fontWeight: 700, textDecoration: "underline" }}>jsonbin.io</a> and create a free account with Google/GitHub.
                        </li>
                        <li>
                          Navigate to <strong>API Keys</strong> in their sidebar and copy your <strong>Master Key</strong> (starts with <code>$2a$...</code>).
                        </li>
                        <li>
                          Paste your Master Key below and click <strong>Auto-Create & Connect Live Cloud Database</strong>.
                        </li>
                      </ol>
                    </div>

                    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                      <div>
                        <label style={labelStyle}>Your JSONbin Master Key (X-Master-Key) *</label>
                        <input
                          type="password"
                          value={cloudApiKey}
                          onChange={(e) => setCloudApiKey(e.target.value)}
                          placeholder="$2a$10$abcdef1234567890..."
                          style={inputStyle}
                        />
                      </div>

                      <button
                        type="button"
                        onClick={handleAutoCreateCloudBin}
                        disabled={isCloudLoading}
                        className="admin-btn-primary"
                        style={{
                          padding: "12px 24px",
                          background: "#2563eb",
                          border: "1px solid rgba(255,255,255,0.20)",
                          borderRadius: "12px",
                          color: "#ffffff",
                          fontSize: "0.90rem",
                          fontWeight: 700,
                          cursor: "pointer",
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: "8px",
                          boxShadow: "0 2px 10px rgba(37,99,235,0.35)",
                        }}
                      >
                        <i className={isCloudLoading ? "ri-loader-4-line ri-spin" : "ri-magic-line"} style={{ fontSize: "1.1rem" }} />
                        <span>{isCloudLoading ? "Creating & Connecting Cloud Database..." : "Auto-Create & Connect Live Cloud Database"}</span>
                      </button>
                    </div>
                  </div>

                  {/* Manual Settings / Existing Bin */}
                  <div className="admin-card">
                    <h4 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#f8fafc", marginBottom: "6px" }}>
                      Manual Cloud Configuration
                    </h4>
                    <p style={{ fontSize: "0.82rem", color: "#94a3b8", marginBottom: "18px" }}>
                      If you already have an existing Bin ID or want to link a specific bin:
                    </p>

                    <div className="admin-grid-2" style={{ marginBottom: "16px" }}>
                      <div>
                        <label style={labelStyle}>Active Bin ID</label>
                        <input
                          type="text"
                          value={cloudBinId}
                          onChange={(e) => setCloudBinId(e.target.value)}
                          placeholder="e.g. 660f8a9e1f... or similar"
                          style={inputStyle}
                        />
                      </div>
                      <div>
                        <label style={labelStyle}>API Master Key</label>
                        <input
                          type="password"
                          value={cloudApiKey}
                          onChange={(e) => setCloudApiKey(e.target.value)}
                          placeholder="JSONbin Master Key"
                          style={inputStyle}
                        />
                      </div>
                    </div>

                    <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                      <button
                        type="button"
                        onClick={handleSaveManualCloud}
                        style={{
                          padding: "10px 20px",
                          background: "#1e293b",
                          border: "1px solid #334155",
                          borderRadius: "10px",
                          color: "#38bdf8",
                          fontSize: "0.86rem",
                          fontWeight: 700,
                          cursor: "pointer",
                        }}
                      >
                        Save Configuration
                      </button>
                    </div>
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
                    background: "#059669",
                    border: "1px solid rgba(255,255,255,0.18)",
                    borderRadius: "10px",
                    color: "#ffffff",
                    fontSize: "0.86rem",
                    fontWeight: 700,
                    cursor: "pointer",
                    boxShadow: "0 2px 10px rgba(5,150,105,0.3)",
                    transition: "all 0.2s ease",
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
