import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface CoreFeaturesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const features = [
  { label: "Share Virtual Account", to: "/dashboard/virtual-account", icon: "Share" },
  { label: "Show payment links info", to: "/dashboard/payment-links", icon: "Info" },
  { label: "Create payment link", to: "/dashboard/payment-links/new", icon: "Link" },
  { label: "Create an invoice", to: "/dashboard/invoice", icon: "FileText" },
  { label: "Add Client", to: "/dashboard/add-client", icon: "UserPlus" },
];

export default function CoreFeaturesModal({
  isOpen,
  onClose,
}: CoreFeaturesModalProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setVisible(true);
    } else {
      setTimeout(() => setVisible(false), 300);
    }
  }, [isOpen]);

  if (!visible && !isOpen) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-end justify-center transition-opacity duration-300 ${
        isOpen ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal Content - Bottom Sheet */}
      <div
        className={`relative w-full max-w-lg rounded-t-[32px] bg-[#1E1E1E] p-6 pb-10 shadow-2xl transition-transform duration-300 ${
          isOpen ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="flex justify-center mb-6">
          <div className="w-12 h-1.5 rounded-full bg-white/20" />
        </div>

        <h3 className="text-xl font-light text-white mb-6 px-2">Core Features</h3>

        <div className="grid grid-cols-1 gap-3">
          {features.map((feature) => (
            <Link
              key={feature.label}
              to={feature.to}
              onClick={onClose}
              className="flex items-center gap-4 p-4 rounded-[24px] bg-[#2E2E2E] hover:bg-[#3E3E3E] transition group"
            >
              <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white group-hover:bg-white/10 transition">
                {/* Simple Icon Placeholder based on name */}
                {feature.icon === "Share" && (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <circle cx="18" cy="5" r="3" />
                    <circle cx="6" cy="12" r="3" />
                    <circle cx="18" cy="19" r="3" />
                    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
                  </svg>
                )}
                {feature.icon === "Info" && (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="16" x2="12" y2="12" />
                    <line x1="12" y1="8" x2="12.01" y2="8" />
                  </svg>
                )}
                {feature.icon === "Link" && (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                  </svg>
                )}
                {feature.icon === "FileText" && (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                    <line x1="16" y1="13" x2="8" y2="13" />
                    <line x1="16" y1="17" x2="8" y2="17" />
                    <polyline points="10 9 9 9 8 9" />
                  </svg>
                )}
                {feature.icon === "UserPlus" && (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="8.5" cy="7" r="4" />
                    <line x1="20" y1="8" x2="20" y2="14" />
                    <line x1="23" y1="11" x2="17" y2="11" />
                  </svg>
                )}
              </div>
              <span className="text-base font-medium text-white">{feature.label}</span>
              <div className="ml-auto text-white/30 group-hover:text-white/60 transition">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
