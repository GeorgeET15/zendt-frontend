import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ExpandToggleButton from "./ExpandToggleButton";

const sections = [
  {
    title: "International payments",
    items: [
      { label: "Direct to account", to: "/dashboard/virtual-account" },
      { label: "Payment links", to: "/dashboard/payment-links" },
    ],
  },
  {
    title: "Domestic payments",
    items: [
      { label: "Direct to account", to: "/dashboard/virtual-account" },
      { label: "Payment links", to: "/dashboard/payment-links" },
    ],
  },
];

export default function PaymentAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const navigate = useNavigate();

  return (
    <div className="space-y-3">
      {sections.map((section, index) => {
        const isOpen = openIndex === index;
        return (
          <div
            key={section.title + index}
            className="relative overflow-hidden rounded-4xl border border-white/5 px-4 py-3 text-white shadow-[0_22px_40px_rgba(4,4,7,0.55)] bg-[#161616]"
          >
            <div className="pointer-events-none absolute inset-0">
              <div
                className="absolute opacity-60 blur-2xl -z-10"
                style={{
                  right: "-100px",
                  top: "-120px",
                  width: "321px",
                  height: "262px", zIndex: "0",
                  background:
                    "radial-gradient(50% 50% at 50% 50%, rgba(255,173,122,0.40) 0%, rgba(93,104,157,0.40) 58.08%, rgba(20,35,55,0.40) 200%)",
                }}
              />
            </div>
            <div className="relative">
              <div className="flex items-center justify-between">
                <p className="text-sm text-white/80">{section.title}</p>
                <ExpandToggleButton
                  isOpen={isOpen}
                  className="w-[58px] h-[123px] rounded-[20px]"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                />
              </div>

              {isOpen && (
                <div className="mt-4 border-t border-white/10 pt-4 space-y-3 text-sm text-white/90">
                  {section.items.map((item) => {
                    const content = (
                      <>
                        <span>{item.label}</span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="8"
                          height="19"
                          viewBox="0 0 8 19"
                          fill="none"
                        >
                          <path
                            d="M0.353516 0.353516L5.81798 5.81798C7.77061 7.77061 7.7706 10.9364 5.81798 12.889L0.353516 18.3535"
                            stroke="white"
                          />
                        </svg>
                      </>
                    );

                    if (item.to) {
                      return (
                        <button
                          key={item.label}
                          type="button"
                          onClick={() => navigate(item.to!)}
                          className="flex w-full items-center justify-between text-left text-sm hover:text-white px-2 py-4"
                        >
                          {content}
                        </button>
                      );
                    }

                    return (
                      <div
                        key={item.label}
                        className="flex items-center justify-between text-sm"
                      >
                        {content}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
