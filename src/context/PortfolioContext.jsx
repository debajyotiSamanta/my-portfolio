import React, { createContext, useContext, useState, useEffect } from "react";
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

// Session-level asset cache token:
// In localhost/dev, appends Date.now() on each page load so browsers never serve stale disk cache.
// In production, uses the unique compile-time build version.
const IS_DEV = typeof window !== "undefined" && (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1");
const SESSION_CACHE_KEY = IS_DEV ? `dev-${Date.now()}` : PORTFOLIO_BUILD_VERSION;

const PortfolioContext = createContext(null);

export function PortfolioProvider({ children }) {
  const [portfolioData, setPortfolioData] = useState(() => {
    try {
      // Purge obsolete legacy caches
      try {
        localStorage.removeItem("debajyoti_portfolio_data_v1");
        localStorage.removeItem("debajyoti_portfolio_data_v2");
      } catch {}

      const currentFingerprint = computeDataFingerprint(defaultPortfolioData);
      const saved = localStorage.getItem(STORAGE_DATA_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        const codebaseTs = Date.parse(PORTFOLIO_BUILD_TIMESTAMP) || 0;
        const savedTs = Date.parse(parsed.lastUpdated) || 0;

        // Cache Invalidation Check:
        // When any file in the project (thumbnails, portfolioData.js, text, etc.) is updated:
        // Discard stale local cache so viewers are 100% guaranteed to see the brand new files!
        if (
          parsed &&
          parsed.version === PORTFOLIO_BUILD_VERSION &&
          parsed._fingerprint === currentFingerprint &&
          savedTs >= codebaseTs
        ) {
          return {
            ...defaultPortfolioData,
            ...parsed,
            personal: { ...defaultPortfolioData.personal, ...(parsed.personal || {}) },
          };
        } else {
          console.info("[PortfolioContext] Codebase file update or new build detected. Purged stale local cache to load newest files.");
          localStorage.removeItem(STORAGE_DATA_KEY);
        }
      }
    } catch (err) {
      console.warn("Failed to read saved portfolio data:", err);
    }
    return defaultPortfolioData;
  });

  const [isAdmin, setIsAdmin] = useState(false);
  const [adminPin, setAdminPin] = useState(() => {
    try {
      return localStorage.getItem(STORAGE_PIN_KEY) || DEFAULT_PIN;
    } catch {
      return DEFAULT_PIN;
    }
  });

  const [cloudConfig, setCloudConfig] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_CLOUD_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return { ...CLOUD_SYNC_CONFIG, ...parsed };
      }
    } catch {}
    return CLOUD_SYNC_CONFIG;
  });

  const updateCloudConfig = (nextConfig) => {
    setCloudConfig(nextConfig);
    try {
      localStorage.setItem(STORAGE_CLOUD_KEY, JSON.stringify(nextConfig));
    } catch {}
  };

  // Live Cloud Database Sync: Automatically fetch the latest data from the cloud on every device!
  useEffect(() => {
    const binId = cloudConfig.binId;
    if (!binId) return;

    let isMounted = true;
    const fetchCloudData = async () => {
      try {
        const headers = { "X-Bin-Meta": "false" };
        if (cloudConfig.apiKey) headers["X-Master-Key"] = cloudConfig.apiKey;
        const res = await fetch(`https://api.jsonbin.io/v3/b/${binId}/latest`, { headers });
        if (!res.ok) return;
        const record = await res.json();
        const data = record.record || record;
        if (!isMounted || !data || typeof data !== "object") return;

        // Codebase vs Cloud Precedence check:
        // A stale cloud snapshot must NEVER overwrite a newer codebase deployment!
        const codebaseTs = Date.parse(PORTFOLIO_BUILD_TIMESTAMP) || 0;
        const cloudTs = Date.parse(data.lastUpdated) || 0;

        if (cloudTs && cloudTs > codebaseTs) {
          // Cloud has a fresher edit made via Admin Panel AFTER the codebase was deployed
          console.info("[Portfolio] Applying fresh live update from Cloud Database.");
          setPortfolioData((prev) => ({
            ...prev,
            ...data,
            personal: { ...prev.personal, ...(data.personal || {}) },
          }));
        } else {
          // Codebase is newer than or equal to the cloud record (or cloud record has no timestamp)
          console.info("[Portfolio] Codebase files are up-to-date and take precedence over cloud snapshot.");
          // Refresh the cloud bin with current codebase data so all other devices receive the newest release!
          if (cloudConfig.apiKey) {
            try {
              const currentFingerprint = computeDataFingerprint(defaultPortfolioData);
              if (data._fingerprint !== currentFingerprint) {
                const refreshedData = {
                  ...defaultPortfolioData,
                  version: PORTFOLIO_BUILD_VERSION,
                  _buildTime: PORTFOLIO_BUILD_TIMESTAMP,
                  _fingerprint: currentFingerprint,
                  lastUpdated: new Date().toISOString(),
                };
                fetch(`https://api.jsonbin.io/v3/b/${binId}`, {
                  method: "PUT",
                  headers: {
                    "Content-Type": "application/json",
                    "X-Master-Key": cloudConfig.apiKey,
                  },
                  body: JSON.stringify(refreshedData),
                }).catch(() => {});
              }
            } catch {}
          }
        }
      } catch (err) {
        console.warn("[CloudSync] Background sync check:", err);
      }
    };

    fetchCloudData();
    return () => { isMounted = false; };
  }, [cloudConfig.binId, cloudConfig.apiKey]);

  // Contact form messages inbox
  const [messages, setMessages] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_MSGS_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn("Failed to read messages:", e);
    }
    return [
      {
        id: "msg-welcome",
        name: "Welcome Guide",
        email: "system@debajyoti.dev",
        subject: "Direct Portfolio Messages Inbox Active",
        message: "Hello Debajyoti! Any message submitted via your portfolio's Contact Form will now be stored directly here in your private Manager Inbox. You can read, manage, and reply to client inquiries at any time.",
        date: new Date().toISOString(),
        read: false,
      },
    ];
  });

  const savePortfolioData = async (newData) => {
    try {
      const dataWithVersion = {
        ...newData,
        version: PORTFOLIO_BUILD_VERSION,
        _fingerprint: computeDataFingerprint(newData),
        lastUpdated: new Date().toISOString(),
      };
      setPortfolioData(dataWithVersion);
      localStorage.setItem(STORAGE_DATA_KEY, JSON.stringify(dataWithVersion));

      // In local development, sync directly to src/data/portfolioData.js so git push deploys live to every viewer
      if (typeof window !== "undefined" && (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1")) {
        try {
          const res = await fetch("/api/save-portfolio-data", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(dataWithVersion),
          });
          const resJson = await res.json();
          if (resJson?.success) {
            console.info("[PortfolioContext] Successfully updated src/data/portfolioData.js!");
          }
        } catch {
          // Dev server sync endpoint not active, continue with localStorage
        }
      }

      // Cloud Database Sync: When deployed, push updates directly to the cloud so all viewers on all devices receive changes immediately!
      if (cloudConfig.binId && cloudConfig.apiKey) {
        try {
          const cloudRes = await fetch(`https://api.jsonbin.io/v3/b/${cloudConfig.binId}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              "X-Master-Key": cloudConfig.apiKey,
            },
            body: JSON.stringify(dataWithVersion),
          });
          if (cloudRes.ok) {
            console.info("[CloudSync] Successfully published updates to Cloud Database for all viewers!");
          }
        } catch (cloudErr) {
          console.warn("[CloudSync] Cloud sync error:", cloudErr);
        }
      }

      return true;
    } catch (err) {
      console.error("Error saving portfolio data:", err);
      return false;
    }
  };

  const loginAdmin = (inputPin) => {
    if (inputPin === adminPin) {
      setIsAdmin(true);
      return { success: true };
    }
    return { success: false, message: "Incorrect security PIN. Access denied." };
  };

  const logoutAdmin = () => {
    setIsAdmin(false);
  };

  const updateAdminPin = (currentPin, newPin) => {
    if (currentPin !== adminPin) {
      return { success: false, message: "Current PIN is incorrect." };
    }
    if (!newPin || newPin.trim().length < 4) {
      return { success: false, message: "New PIN must be at least 4 characters." };
    }
    try {
      setAdminPin(newPin.trim());
      localStorage.setItem(STORAGE_PIN_KEY, newPin.trim());
      return { success: true };
    } catch {
      return { success: false, message: "Failed to save new PIN." };
    }
  };

  const resetToDefaults = () => {
    try {
      setPortfolioData(defaultPortfolioData);
      localStorage.removeItem(STORAGE_DATA_KEY);
      return true;
    } catch (err) {
      console.error("Reset failed:", err);
      return false;
    }
  };

  const exportDataJSON = () => {
    return JSON.stringify(portfolioData, null, 2);
  };

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

  // ── Contact Messages Inbox Methods ──
  const addMessage = ({ name, email, subject, message }) => {
    const newMsg = {
      id: `msg-${Date.now()}`,
      name: name || "Anonymous",
      email: email || "No email",
      subject: subject || "No Subject",
      message: message || "",
      date: new Date().toISOString(),
      read: false,
    };
    setMessages((prev) => {
      const updated = [newMsg, ...prev];
      try {
        localStorage.setItem(STORAGE_MSGS_KEY, JSON.stringify(updated));
      } catch (err) {
        console.error("Error storing message:", err);
      }
      return updated;
    });
    return true;
  };

  const deleteMessage = (id) => {
    setMessages((prev) => {
      const updated = prev.filter((m) => m.id !== id);
      try {
        localStorage.setItem(STORAGE_MSGS_KEY, JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  const markMessageRead = (id) => {
    setMessages((prev) => {
      const updated = prev.map((m) => (m.id === id ? { ...m, read: true } : m));
      try {
        localStorage.setItem(STORAGE_MSGS_KEY, JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  const clearAllMessages = () => {
    setMessages([]);
    try {
      localStorage.removeItem(STORAGE_MSGS_KEY);
    } catch {}
  };

  const unreadMessagesCount = messages.filter((m) => !m.read).length;

  const resolveAssetUrl = (url) => {
    if (!url || typeof url !== "string") return url;
    // Base64 data URIs or blob URLs do not need cache-busting
    if (url.startsWith("data:") || url.startsWith("blob:")) return url;
    const sep = url.includes("?") ? "&" : "?";
    return `${url}${sep}v=${encodeURIComponent(SESSION_CACHE_KEY)}`;
  };

  const resolveImage = (imgKey, fallback) => {
    // 1. Prioritize uploaded base64 data URIs, blob URLs, or live web URLs
    if (typeof fallback === "string" && (fallback.startsWith("data:") || fallback.startsWith("blob:") || fallback.startsWith("http://") || fallback.startsWith("https://"))) {
      return fallback;
    }
    if (typeof imgKey === "string" && (imgKey.startsWith("data:") || imgKey.startsWith("blob:") || imgKey.startsWith("http://") || imgKey.startsWith("https://"))) {
      return imgKey;
    }

    // 2. Automatically find the asset regardless of file name or casing!
    const raw = findImageAsset(imgKey, fallback);
    return resolveAssetUrl(raw);
  };

  const resolveDocumentUrl = (docKey, fallback) => {
    // 1. Prioritize uploaded base64 data URIs, blob URLs, or live web URLs
    if (typeof fallback === "string" && (fallback.startsWith("data:") || fallback.startsWith("blob:") || fallback.startsWith("http://") || fallback.startsWith("https://"))) {
      return fallback;
    }

    // 2. Automatically find any resume or CV PDF regardless of exact file name!
    const raw = findDocumentAsset(docKey || fallback, fallback);
    return resolveAssetUrl(raw);
  };

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
        messages,
        addMessage,
        deleteMessage,
        markMessageRead,
        clearAllMessages,
        unreadMessagesCount,
        cloudConfig,
        updateCloudConfig,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolio() {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error("usePortfolio must be used within a PortfolioProvider");
  }
  return context;
}
