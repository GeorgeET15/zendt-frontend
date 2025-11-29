import { useState } from "react";
import BackButton from "./BackButton";
import CopyButton from "./CopyButton";
import PageContainer from "./PageContainer";

type LocationOption = "domestic" | "international";

const accountDetails = [
  { label: "Account holder name", value: "Alen thomas" },
  { label: "Account type", value: "Cheking" },
  { label: "Sort Code", value: "041404" },
  { label: "Account number", value: "41234432" },
  { label: "Bank name", value: "The currency cloud" },
  {
    label: "Bank address",
    value: "12 street, the texas hijo building elud 89",
  },
];

export default function VirtualAccountPage() {
  const [location, setLocation] = useState<LocationOption>("domestic");
  const currency = { flag: "/usa.png", name: "U S DOLLERS" };

  return (
    <PageContainer className="text-white space-y-6">
      <div className="flex items-center justify-between px-4 pt-6 z-0">
        <div                      className="absolute opacity-60 blur-2xl"
                style={{
                  right: "82px",
                  top: "-20px",
                  width: "321px",
                  height: "262px",
                  zIndex: '0',
                  background:
                    "radial-gradient(50% 50% at 50% 50%, rgba(255,173,122,0.40) 0%, rgba(93,104,157,0.40) 58.08%, rgba(20,35,55,0.40) 200%)",
                }}></div>
        <BackButton />
      </div>
    <div className="pt-6 relative rounded-3xl px-4 bg-black z-1">
      <div className="flex justify-between items-center">
              <h1 className="text-lg font-light tracking-[0.01em] mb-4">
        My Virtual Account
      </h1>
                <button className="flex items-center gap-3 rounded-md bg-[#1d1d1f] px-2 text-sm">
          <span className="text-sm flex items-center">Add account</span> <span className="text-lg flex items-center">+</span>
        </button>
      </div>


      <div className="space-y-2">
        <p className="text-xs text-white">Select currency</p>
        <div className="flex items-center justify-between rounded-[14px] bg-[#0f0f11] border border-white/10 px-4 py-3 mb-4">
          <div className="flex items-center gap-3">
            <img
              src={currency.flag}
              alt=""
              className="h-9 w-14 rounded-[10px] object-cover"
            />
            <span className="text-lg tracking-[0.08em]">{currency.name}</span>
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="9"
            height="21"
            viewBox="0 0 9 21"
            fill="none"
          >
            <path
              d="M0.5 20.5L6.96447 14.0355C8.91709 12.0829 8.91709 8.91709 6.96447 6.96447L0.499999 0.5"
              stroke="white"
              strokeLinecap="round"
            ></path>
          </svg>
        </div>
      </div>

      <section className="rounded-[28px] bg-[#1E1E1E]  shadow-[0_24px_45px_rgba(4,4,7,0.55)] p-5 space-y-4">
        <div className="flex items-center gap-3">
          <img
            src={currency.flag}
            alt=""
            className="h-12 w-12 rounded-[14px] object-cover"
          />
          <div className="space-y-1">
            <p className="text-base font-medium tracking-tight">
              {currency.name}
            </p>
            <p className="text-xs text-white/60">Accepted Currencies</p>
          </div>
        </div>

        <p className="text-sm text-white">Sender's bank location</p>

        <div className="space-y-3">
          <LocationCard
            active={location === "domestic"}
            badge="Recommended"
            title="Within south america"
            subtitle="Payment mode : US Faster Payment"
            onClick={() => setLocation("domestic")}
          />
          <LocationCard
            active={location === "international"}
            title="Outside south america"
            subtitle="Payment mode : Swift"
            onClick={() => setLocation("international")}
          />
        </div>
        <div className="flex items-center justify-between gap-3">
          <p className="text-sm text-white tracking-[0.05em]">
            US Faster payment - account details
          </p>
          <div className="flex items-center gap-2">
            <ActionButton label="Copy" />
            <ActionButton label="Share" icon="share" />
          </div>
        </div>
        <div className="space-y-3 bg-[#2E2E2E] rounded-[18px] px-4 py-3 ">
          {accountDetails.map((field) => (
            <div
              key={field.label}
              className="flex items-center justify-between text-sm text-white/80"
            >
              <span className="tracking-[0.03em]">{field.label}</span>
              <div className="flex items-center gap-3 text-base text-white">
                <span>{field.value}</span>
                <CopyButton value={field.value} />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
    </PageContainer>
  );
}

function LocationCard({
  active,
  badge,
  title,
  subtitle,
  onClick,
}: {
  active: boolean;
  badge?: string;
  title: string;
  subtitle: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full items-center justify-between rounded-[14px] bg-[#2E2E2E] px-4 py-3 text-left"
    >
      <div className="flex items-center gap-3">
        <span
          className={[
            "h-5 w-5 rounded-full border-2 shrink-0 flex items-center justify-center",
            active ? "border-white" : "border-white/40",
          ].join(" ")}
        >
          {active && (
            <span className="block h-2.5 w-2.5 rounded-full bg-white" />
          )}
        </span>
        <div>
          <p className="text-base text-white tracking-[0.02em]">{title}</p>
          <p className="text-xs text-white/60">{subtitle}</p>
        </div>
      </div>
      {badge && (
        <span className="rounded-[12px] bg-[#1f1f21] px-3 py-2 text-xs text-white/80">
          {badge}
        </span>
      )}
    </button>
  );
}

function ActionButton({ label, icon }: { label: string; icon?: "share" }) {
  return (
    <button
      type="button"
      className="flex items-center gap-2 rounded-[10px] bg-[#2E2E2E] px-4 py-2 text-sm text-white/90"
    >
      {label}
      {icon === "share" ? (
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6 5L10 8L6 11"
            stroke="currentColor"
            strokeWidth="1.3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M4 3H12C13.1046 3 14 3.89543 14 5V11C14 12.1046 13.1046 13 12 13H4C2.89543 13 2 12.1046 2 11V5C2 3.89543 2.89543 3 4 3Z"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
        </svg>
      ) : (
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="5"
            y="3"
            width="8"
            height="10"
            rx="2"
            stroke="currentColor"
            strokeWidth="1.2"
          />
          <rect
            x="3"
            y="5"
            width="8"
            height="10"
            rx="2"
            stroke="currentColor"
            strokeWidth="1.2"
            opacity="0.5"
          />
        </svg>
      )}
    </button>
  );
}
