import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from "react";
import {
  defaultPortfolioData,
  PORTFOLIO_BUILD_VERSION,
  PORTFOLIO_BUILD_TIMESTAMP,
  ASSET_IMAGES,
  ASSET_DOCUMENTS,
  findDocumentAsset,
  findImageAsset,
  computeDataFingerprint,
  CLOUD_SYNC_CONFIG,
} from "../data/portfolioData";

const STORAGE_DATA_KEY   = "debajyoti_portfolio_data_v3";
const STORAGE_PIN_KEY    = "debajyoti_portfolio_admin_pin_v2";
const STORAGE_MSGS_KEY   = "debajyoti_portfolio_messages_v2";
const STORAGE_CLOUD_KEY  = "debajyoti_portfolio_cloud_v1";
const DEFAULT_PIN        = "debajyoti2024";

// Poll cloud every 20 s so viewers on other devices always receive updates promptly
const CLOUD_POLL_INTERVAL_MS = 20_000;

const PortfolioContext = createContext(null);

// Strips obsolete dev paths ("/src/assets/...") so that dynamic resolvers pick live bundled assets
function sanitizeRecord(rec) {
  if (!rec || typeof rec !== "object") return rec;
  const clean = { ...rec };
  if (clean.personal) {
    clean.personal = { ...clean.personal };
    if (typeof clean.personal.avatar === "string" && clean.personal.avatar.startsWith("/src/assets/")) {
      delete clean.personal.avatar;
    }
    if (typeof clean.personal.resumeUrl === "string" && clean.personal.resumeUrl.startsWith("/src/assets/")) {
      delete clean.personal.resumeUrl;
    }
    if (typeof clean.personal.cvUrl === "string" && clean.personal.cvUrl.startsWith("/src/assets/")) {
      delete clean.personal.cvUrl;
    }
  }
  if (Array.isArray(clean.projects)) {
    clean.projects = clean.projects.map((p) => {
      if (p && typeof p.img === "string" && p.img.startsWith("/src/assets/")) {
        const { img, ...rest } = p;
        return rest;
      }
      return p;
    });
  }
  return clean;
}

// True when value is an uploaded data URI, blob URL, or remote HTTP(S) URL
function isUploadedOrRemote(val) {
  if (!val || typeof val !== "string") return false;
  return (
    val.startsWith("data:") ||
    val.startsWith("blob:") ||
    val.startsWith("http://") ||
    val.startsWith("https://")
  );
}

export function PortfolioProvider({ children }) {

  // ── 1. Initial state: load localStorage and sanitize obsolete paths ─────────
  const [portfolioData, setPortfolioData] = useState(() => {
    try {
      try {
        localStorage.removeItem("debajyoti_portfolio_data_v1");
        localStorage.removeItem("debajyoti_portfolio_data_v2");
      } catch {}

      const saved = localStorage.getItem(STORAGE_DATA_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed === "object") {
          const cleaned = sanitizeRecord(parsed);
          return {
            ...defaultPortfolioData,
            ...cleaned,
            personal: { ...defaultPortfolioData.personal, ...(cleaned.personal || {}) },
          };
        }
      }
    } catch (err) {
      console.warn("Failed to read saved portfolio data:", err);
    }
    return defaultPortfolioData;
  });

  const [isAdmin, setIsAdmin] = useState(false);

  const [adminPin, setAdminPin] = useState(() => {
    try { return localStorage.getItem(STORAGE_PIN_KEY) || DEFAULT_PIN; }
    catch { return DEFAULT_PIN; }
  });

  const [cloudConfig, setCloudConfig] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_CLOUD_KEY);
      if (saved) return { ...CLOUD_SYNC_CONFIG, ...JSON.parse(saved) };
    } catch {}
    return CLOUD_SYNC_CONFIG;
  });

  const updateCloudConfig = (nextConfig) => {
    setCloudConfig(nextConfig);
    try { localStorage.setItem(STORAGE_CLOUD_KEY, JSON.stringify(nextConfig)); } catch {}
  };

  // Refs for closure-safe access inside setInterval
  const cloudConfigRef = useRef(cloudConfig);
  useEffect(() => { cloudConfigRef.current = cloudConfig; }, [cloudConfig]);

  const portfolioDataRef = useRef(portfolioData);
  useEffect(() => { portfolioDataRef.current = portfolioData; }, [portfolioData]);

  // ── 2. Apply cloud data across all viewing devices ────────────────────────
  const applyCloudData = useCallback((data) => {
    if (!data || typeof data !== "object") return;
    const cloudTs   = Date.parse(data.lastUpdated) || 0;
    const currentTs = Date.parse(portfolioDataRef.current?.lastUpdated) || 0;

    // Apply cloud data if cloud record is equal or newer than current local record, or local has defaults
    if (cloudTs >= currentTs || !currentTs) {
      const cleaned = sanitizeRecord(data);
      const merged = {
        ...defaultPortfolioData,
        ...cleaned,
        personal: { ...defaultPortfolioData.personal, ...(cleaned.personal || {}) },
      };
      setPortfolioData(merged);
      portfolioDataRef.current = merged;
      try {
        localStorage.setItem(STORAGE_DATA_KEY, JSON.stringify(merged));
      } catch (e) {
        console.warn("Storage quota warning:", e);
      }
    }
  }, []);

  // ── 3. Fetch latest record from JSONbin (no disk-cache) ─────────────────────
  const fetchFromCloud = useCallback(async () => {
    const { binId, apiKey } = cloudConfigRef.current;
    if (!binId) return;
    try {
      const headers = { "X-Bin-Meta": "false" };
      if (apiKey) headers["X-Master-Key"] = apiKey;
      // Timestamp query and cache: "no-store" prevent browsers from serving stale disk cache
      const res = await fetch(`https://api.jsonbin.io/v3/b/${binId}/latest?_t=${Date.now()}`, {
        headers,
        cache: "no-store",
      });
      if (!res.ok) { console.warn("[CloudSync] Fetch failed:", res.status); return; }
      const record = await res.json();
      applyCloudData(record.record || record);
    } catch (err) {
      console.warn("[CloudSync] Network error:", err.message);
    }
  }, [applyCloudData]);

  // ── 4. Poll every 20 s on every device ────────────────────────────────────
  useEffect(() => {
    fetchFromCloud();
    const timer = setInterval(fetchFromCloud, CLOUD_POLL_INTERVAL_MS);
    return () => clearInterval(timer);
  }, [cloudConfig.binId, cloudConfig.apiKey, fetchFromCloud]);

  // ── 5. savePortfolioData: persist locally + push to cloud ──────────────────
  const savePortfolioData = async (newData) => {
    try {
      const updateTimestamp = new Date().toISOString();
      const dataWithVersion = {
        ...newData,
        version: PORTFOLIO_BUILD_VERSION,
        _fingerprint: computeDataFingerprint(newData),
        lastUpdated: updateTimestamp,
      };
      setPortfolioData(dataWithVersion);
      portfolioDataRef.current = dataWithVersion;
      try {
        localStorage.setItem(STORAGE_DATA_KEY, JSON.stringify(dataWithVersion));
      } catch (e) {
        console.warn("Storage write error:", e);
      }

      // Dev: sync to source file so git push deploys the change everywhere
      if (typeof window !== "undefined" && (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1")) {
        try {
          const res = await fetch("/api/save-portfolio-data", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(dataWithVersion),
          });
          const resJson = await res.json();
          if (resJson?.success) console.info("[PortfolioContext] Updated portfolioData.js!");
        } catch {}
      }

      // Cloud: push so every other device gets it in <=20 s
      const { binId, apiKey } = cloudConfigRef.current;
      if (binId && apiKey) {
        try {
          const cloudRes = await fetch(`https://api.jsonbin.io/v3/b/${binId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json", "X-Master-Key": apiKey },
            body: JSON.stringify(dataWithVersion),
          });
          if (cloudRes.ok) {
            console.info("[CloudSync] Published to cloud – viewers receive in <= 20 s.");
          } else {
            console.warn("[CloudSync] PUT failed:", cloudRes.status, await cloudRes.text());
          }
        } catch (cloudErr) {
          console.warn("[CloudSync] Network error during save:", cloudErr);
        }
      }

      return true;
    } catch (err) {
      console.error("Error saving portfolio data:", err);
      return false;
    }
  };

  // ── Admin helpers ──────────────────────────────────────────────────────────
  const loginAdmin = (inputPin) => {
    if (inputPin === adminPin) { setIsAdmin(true); return { success: true }; }
    return { success: false, message: "Incorrect security PIN. Access denied." };
  };

  const logoutAdmin = () => setIsAdmin(false);

  const updateAdminPin = (currentPin, newPin) => {
    if (currentPin !== adminPin) return { success: false, message: "Current PIN is incorrect." };
    if (!newPin || newPin.trim().length < 4) return { success: false, message: "New PIN must be at least 4 characters." };
    try {
      setAdminPin(newPin.trim());
      localStorage.setItem(STORAGE_PIN_KEY, newPin.trim());
      return { success: true };
    } catch {
      return { success: false, message: "Failed to save new PIN." };
    }
  };

  const resetToDefaults = () => {
    try { setPortfolioData(defaultPortfolioData); localStorage.removeItem(STORAGE_DATA_KEY); return true; }
    catch (err) { console.error("Reset failed:", err); return false; }
  };

  const exportDataJSON = () => JSON.stringify(portfolioData, null, 2);

  const importDataJSON = (jsonString) => {
    try {
      const parsed = JSON.parse(jsonString);
      if (!parsed || typeof parsed !== "object") throw new Error("Invalid JSON structure");
      savePortfolioData({ ...defaultPortfolioData, ...parsed });
      return { success: true };
    } catch (err) {
      return { success: false, message: err.message };
    }
  };

  // ── 6. Cache buster tied to data lastUpdated timestamp ────────────────────
  const activeVersion = portfolioData?.lastUpdated
    ? Date.parse(portfolioData.lastUpdated)
    : (Date.parse(PORTFOLIO_BUILD_TIMESTAMP) || PORTFOLIO_BUILD_VERSION);

  const addCacheBuster = useCallback((url) => {
    if (!url || typeof url !== "string") return url;
    if (url.startsWith("data:") || url.startsWith("blob:")) return url;
    const base = url.split("?")[0].split("#")[0];
    return `${base}?v=${encodeURIComponent(activeVersion)}`;
  }, [activeVersion]);

  // ── 7. Asset resolvers ─────────────────────────────────────────────────────
  // Rule: uploaded data URI / blob ALWAYS wins.
  // Otherwise: fuzzy-find from bundled assets + add cache-buster.

  const resolveImage = useCallback((imgKey, uploadedValue, projectContext) => {
    if (typeof uploadedValue === "string" && (uploadedValue.startsWith("data:") || uploadedValue.startsWith("blob:"))) {
      return uploadedValue;
    }
    if (typeof imgKey === "string" && (imgKey.startsWith("data:") || imgKey.startsWith("blob:"))) {
      return imgKey;
    }
    if (typeof uploadedValue === "string" && (uploadedValue.startsWith("http://") || uploadedValue.startsWith("https://"))) {
      return addCacheBuster(uploadedValue);
    }
    if (typeof imgKey === "string" && (imgKey.startsWith("http://") || imgKey.startsWith("https://"))) {
      return addCacheBuster(imgKey);
    }
    const bundled = findImageAsset(imgKey, uploadedValue, projectContext);
    if (!bundled) return uploadedValue || "";
    if (bundled.startsWith("data:") || bundled.startsWith("blob:")) return bundled;
    return addCacheBuster(bundled);
  }, [addCacheBuster]);

  const resolveDocumentUrl = useCallback((docKey, uploadedValue) => {
    if (typeof uploadedValue === "string" && (uploadedValue.startsWith("data:") || uploadedValue.startsWith("blob:"))) {
      return uploadedValue;
    }
    if (typeof docKey === "string" && (docKey.startsWith("data:") || docKey.startsWith("blob:"))) {
      return docKey;
    }
    if (typeof uploadedValue === "string" && (uploadedValue.startsWith("http://") || uploadedValue.startsWith("https://"))) {
      return addCacheBuster(uploadedValue);
    }
    if (typeof docKey === "string" && (docKey.startsWith("http://") || docKey.startsWith("https://"))) {
      return addCacheBuster(docKey);
    }
    const bundled = findDocumentAsset(docKey || uploadedValue, uploadedValue);
    if (!bundled) return uploadedValue || "";
    if (bundled.startsWith("data:") || bundled.startsWith("blob:")) return bundled;
    return addCacheBuster(bundled);
  }, [addCacheBuster]);

  const resolveAssetUrl = useCallback((url) => {
    if (!url || typeof url !== "string") return url;
    if (url.startsWith("data:") || url.startsWith("blob:")) return url;
    return addCacheBuster(url);
  }, [addCacheBuster]);

  // ── 8. Cross-platform Document Downloader (Android, iOS Safari, Desktop) ───
  const downloadOrOpenDocument = useCallback((docUrl, defaultFilename = "document.pdf") => {
    if (!docUrl) return;
    if (docUrl.startsWith("data:")) {
      try {
        const parts = docUrl.split(";base64,");
        const contentType = parts[0].replace("data:", "") || "application/pdf";
        const raw = window.atob(parts[1]);
        const rawLength = raw.length;
        const uInt8Array = new Uint8Array(rawLength);
        for (let i = 0; i < rawLength; ++i) {
          uInt8Array[i] = raw.charCodeAt(i);
        }
        const blob = new Blob([uInt8Array], { type: contentType });
        const blobUrl = URL.createObjectURL(blob);
        const tempLink = document.createElement("a");
        tempLink.href = blobUrl;
        tempLink.download = defaultFilename;
        document.body.appendChild(tempLink);
        tempLink.click();
        document.body.removeChild(tempLink);
        setTimeout(() => URL.revokeObjectURL(blobUrl), 10000);
        return;
      } catch (err) {
        console.warn("Base64 blob conversion fallback:", err);
      }
    }
    const a = document.createElement("a");
    a.href = docUrl;
    a.download = defaultFilename;
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }, []);

  // ── Messages inbox ─────────────────────────────────────────────────────────
  const [messages, setMessages] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_MSGS_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) { console.warn("Failed to read messages:", e); }
    return [
      {
        id: "msg-welcome",
        name: "Welcome Guide",
        email: "system@debajyoti.dev",
        subject: "Direct Portfolio Messages Inbox Active",
        message: "Hello Debajyoti! Any message submitted via your portfolio Contact Form will be stored here in your private Manager Inbox.",
        date: new Date().toISOString(),
        read: false,
      },
    ];
  });

  const addMessage = ({ name, email, subject, message }) => {
    const newMsg = { id: `msg-${Date.now()}`, name: name || "Anonymous", email: email || "No email", subject: subject || "No Subject", message: message || "", date: new Date().toISOString(), read: false };
    setMessages((prev) => {
      const updated = [newMsg, ...prev];
      try { localStorage.setItem(STORAGE_MSGS_KEY, JSON.stringify(updated)); } catch {}
      return updated;
    });
    return true;
  };

  const deleteMessage = (id) => {
    setMessages((prev) => {
      const updated = prev.filter((m) => m.id !== id);
      try { localStorage.setItem(STORAGE_MSGS_KEY, JSON.stringify(updated)); } catch {}
      return updated;
    });
  };

  const markMessageRead = (id) => {
    setMessages((prev) => {
      const updated = prev.map((m) => (m.id === id ? { ...m, read: true } : m));
      try { localStorage.setItem(STORAGE_MSGS_KEY, JSON.stringify(updated)); } catch {}
      return updated;
    });
  };

  const clearAllMessages = () => {
    setMessages([]);
    try { localStorage.removeItem(STORAGE_MSGS_KEY); } catch {}
  };

  const unreadMessagesCount = messages.filter((m) => !m.read).length;

  return (
    <PortfolioContext.Provider
      value={{
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
        resolveAssetUrl,
        resolveDocumentUrl,
        downloadOrOpenDocument,
        messages,
        addMessage,
        deleteMessage,
        markMessageRead,
        clearAllMessages,
        unreadMessagesCount,
        cloudConfig,
        updateCloudConfig,
        refreshFromCloud: fetchFromCloud,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
}


export function usePortfolio() {
  const context = useContext(PortfolioContext);
  if (!context) throw new Error("usePortfolio must be used within a PortfolioProvider");
  return context;
}
