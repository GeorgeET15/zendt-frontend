import { useEffect, useState } from "react";
import BackButton from "./BackButton";
import GradientBlob from "../icons/GradientBlob";
import PageContainer from "./PageContainer";
import { dataService } from "../../services/dataService";
import { useDashboardSettings } from "../../hooks/useDashboardSettings";

type ToggleSetting = {
  key: string;
  label: string;
  description: string;
};

export default function SettingsPage() {
  const { settings, toggleSection } = useDashboardSettings();
  const [toggleSettings, setToggleSettings] = useState<ToggleSetting[]>([]);
  const [preferences, setPreferences] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const data = await dataService.getSettingsToggles();
      setToggleSettings(data);
      
      const initialPreferences = data.reduce<Record<string, boolean>>((acc, setting) => {
        acc[setting.key] = setting.key !== "autopay";
        return acc;
      }, {});
      setPreferences(initialPreferences);
      setLoading(false);
    };
    fetchData();
  }, []);

  const handleToggle = (key: string) => {
    setPreferences((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  if (loading) {
    return <PageContainer className="text-white space-y-6"><div className="p-6">Loading...</div></PageContainer>;
  }

  return (
    <PageContainer className="text-white space-y-6">
          <div className="flex items-center justify-between px-4 pt-12 z-0">
            <GradientBlob
              className="absolute opacity-60 blur-2xl -z-10"
              style={{
                right: "82px",
                top: "-50px",
                width: "321px",
                height: "262px",
                zIndex: "0",
              }}
            />
          <div className="flex justify-between w-full z-1"><BackButton /></div>
          </div>

      <section className="pt-6 relative rounded-3xl px-4 bg-[#141414] z-1">
        <header className="mb-6">
          <h2 className="text-[17px] font-light">Settings</h2>
          <p className="text-white/70 text-sm mt-1">Control notifications and automation preferences for your workspace.</p>
        </header>

        <div className="space-y-5">
          {toggleSettings.map(({ key, label, description }) => (
            <div key={key} className="flex items-start justify-between gap-4 rounded-2xl bg-white/5 px-4 py-3">
              <div>
                <p className="text-base font-medium">{label}</p>
                <p className="text-sm text-white/70">{description}</p>
              </div>
              <button
                type="button"
                onClick={() => handleToggle(key)}
                className={["relative h-8 w-14 rounded-full transition", preferences[key] ? "bg-emerald-400/70" : "bg-white/20"].join(" ")}
                aria-pressed={preferences[key]}
              >
                <span
                  className={[
                    "absolute top-1 h-6 w-6 rounded-full bg-white transition-all",
                    preferences[key] ? "right-1" : "left-1",
                  ].join(" ")}
                />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Dashboard Visibility Settings */}
      <section className="pt-6 relative rounded-3xl px-4 bg-[#141414] z-1 mb-10">
        <header className="mb-6">
          <h2 className="text-[17px] font-light">Dashboard Visibility</h2>
          <p className="text-white/70 text-sm mt-1">Customize what you see on your dashboard.</p>
        </header>

        <div className="space-y-5">
          {[
            { key: "wallets", label: "Show Wallets", description: "Display your wallet balances and accounts." },
            { key: "transactions", label: "Show Transactions", description: "Display your recent transaction history." },
            { key: "cards", label: "Show Cards", description: "Display your linked credit and debit cards." },
          ].map(({ key, label, description }) => (
            <div key={key} className="flex items-start justify-between gap-4 rounded-2xl bg-white/5 px-4 py-3">
              <div>
                <p className="text-base font-medium">{label}</p>
                <p className="text-sm text-white/70">{description}</p>
              </div>
              <button
                type="button"
                onClick={() => toggleSection(key as any)}
                className={["relative h-8 w-14 rounded-full transition", settings[key as keyof typeof settings] ? "bg-emerald-400/70" : "bg-white/20"].join(" ")}
                aria-pressed={settings[key as keyof typeof settings]}
              >
                <span
                  className={[
                    "absolute top-1 h-6 w-6 rounded-full bg-white transition-all",
                    settings[key as keyof typeof settings] ? "right-1" : "left-1",
                  ].join(" ")}
                />
              </button>
            </div>
          ))}
        </div>
      </section>
    </PageContainer>
  );
}
