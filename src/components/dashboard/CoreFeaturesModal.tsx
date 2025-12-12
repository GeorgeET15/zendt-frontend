import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import GradientBlob from "../icons/GradientBlob";

interface CoreFeaturesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const features = [
  { label: "Share Virtual Account", to: "/dashboard/virtual-account" },
  { label: "Payment links", to: "/dashboard/payment-links" },
  { label: "Create Payments", to: "/dashboard/payment-pages" },
  { label: "Create an invoice", to: "/dashboard/invoice" },
  { label: "Add Client", to: "/dashboard/add-client" },
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
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-40 bg-black/40 transition-all duration-300 ease-out ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* Modal Content - Floating Card */}
      <div
        className={`fixed bottom-[110px] left-1/2 z-50 -translate-x-1/2 w-[374px] rounded-[32px] overflow-hidden shadow-2xl transition-all duration-300 ease-out ${
          isOpen 
            ? "translate-y-0 opacity-100 scale-100" 
            : "translate-y-8 opacity-0 scale-95 pointer-events-none"
        }`}
        style={{
          transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)'
        }}
      >
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-[#161616]">
            <GradientBlob
            className="absolute opacity-50 blur-2xl"
            style={{
                top: "-200px",
                left: "-50px",
                width: "150%",
                height: "150%",
                zIndex: "0",
            }}
            />
        </div>

        {/* Content */}
        <div className="relative z-10 p-8 pb-12 flex flex-col gap-6">
          {features.map((feature, index) => (
            <Link
              key={feature.label}
              to={feature.to}
              onClick={onClose}
              className="text-lg font-light text-white hover:text-white/80 transition-all duration-200 hover:translate-x-1"
              style={{
                animation: isOpen ? `slideIn 0.3s ease-out ${index * 0.05}s both` : 'none'
              }}
            >
              {feature.label}
            </Link>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-10px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </>
  );
}
