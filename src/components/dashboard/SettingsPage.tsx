import { useState } from "react";
import BackButton from "./BackButton";
import PageContainer from "./PageContainer";

const toggleSettings = [
  { key: "autopay", label: "Enable autopayments", description: "Automatically collect recurring payments from your customers." },
  { key: "alerts", label: "Transaction alerts", description: "Send me push notification whenever a payment is received." },
  { key: "weeklyReport", label: "Weekly email summary", description: "Receive a digest with balances and statements every Monday." },
];

const initialPreferences = toggleSettings.reduce<Record<string, boolean>>((acc, setting) => {
  acc[setting.key] = setting.key !== "autopay";
  return acc;
}, {});

export default function SettingsPage() {
  const [preferences, setPreferences] = useState(initialPreferences);

  const handleToggle = (key: string) => {
    setPreferences((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <PageContainer className="text-white space-y-6">
          <div className="flex items-center justify-between px-4 pt-6 z-0">
            <div                      className="absolute opacity-60 blur-2xl -z-10"
                    style={{
                      right: "82px",
                      top: "-20px",
                      width: "321px",
                      height: "262px", zIndex: "0",
                      
                      background:
                        "radial-gradient(50% 50% at 50% 50%, rgba(255,173,122,0.40) 0%, rgba(93,104,157,0.40) 58.08%, rgba(20,35,55,0.40) 200%)",
                    }}></div>
          <div className="flex justify-between w-full z-1"><BackButton /></div>
          </div>

      <section className="pt-6 relative rounded-3xl px-4 bg-black z-1">
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
    </PageContainer>
  );
}
