import React, { createContext, useContext, useState, useEffect } from "react";
import { defaultPortfolioData, ASSET_IMAGES } from "../data/portfolioData";

const STORAGE_DATA_KEY = "debajyoti_portfolio_data_v2";
const STORAGE_PIN_KEY  = "debajyoti_portfolio_admin_pin_v2";
const STORAGE_MSGS_KEY = "debajyoti_portfolio_messages_v2";
const DEFAULT_PIN      = "debajyoti2024";

const PortfolioContext = createContext(null);

export function PortfolioProvider({ children }) {
  const [portfolioData, setPortfolioData] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_DATA_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          ...defaultPortfolioData,
          ...parsed,
          personal: { ...defaultPortfolioData.personal, ...(parsed.personal || {}) },
        };
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

  // Contact form messages inbox
  const [messages, setMessages] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_MSGS_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn("Failed to read messages:", e);
    }
    // Initial welcome message sample so Debajyoti can immediately see how it works
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

  const savePortfolioData = (newData) => {
    try {
      setPortfolioData(newData);
      localStorage.setItem(STORAGE_DATA_KEY, JSON.stringify(newData));
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

  const resolveImage = (imgKey, fallback) => {
    // If fallback is an uploaded base64 data URI or custom URL, prioritize it
    if (typeof fallback === "string" && (fallback.startsWith("data:") || fallback.startsWith("http://") || fallback.startsWith("https://"))) {
      return fallback;
    }
    // If imgKey is an uploaded base64 data URI or custom URL
    if (typeof imgKey === "string" && (imgKey.startsWith("data:") || imgKey.startsWith("http://") || imgKey.startsWith("https://") || imgKey.startsWith("/"))) {
      return imgKey;
    }
    if (imgKey && ASSET_IMAGES[imgKey]) return ASSET_IMAGES[imgKey];
    return fallback || ASSET_IMAGES.mentorship;
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
        messages,
        addMessage,
        deleteMessage,
        markMessageRead,
        clearAllMessages,
        unreadMessagesCount,
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
