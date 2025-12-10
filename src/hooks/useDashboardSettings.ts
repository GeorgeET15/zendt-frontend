import { useState, useEffect } from "react";

export type DashboardSection = "wallets" | "transactions" | "cards";

type DashboardSettings = Record<DashboardSection, boolean>;

const STORAGE_KEY = "zendt_dashboard_settings";

const DEFAULT_SETTINGS: DashboardSettings = {
  wallets: true,
  transactions: true,
  cards: true,
};

export function useDashboardSettings() {
  const [settings, setSettings] = useState<DashboardSettings>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : DEFAULT_SETTINGS;
    } catch (error) {
      console.error("Failed to load dashboard settings:", error);
      return DEFAULT_SETTINGS;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    } catch (error) {
      console.error("Failed to save dashboard settings:", error);
    }
  }, [settings]);

  const toggleSection = (section: DashboardSection) => {
    setSettings((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return {
    settings,
    toggleSection,
  };
}
