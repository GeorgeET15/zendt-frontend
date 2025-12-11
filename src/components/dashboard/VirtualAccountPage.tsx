import { useEffect, useState } from "react";
import BackButton from "./BackButton";
import CopyButton from "./CopyButton";
import PageContainer from "./PageContainer";
import { dataService } from "../../services/dataService";
import Toast from "../Toast";
import GradientBlob from "../icons/GradientBlob";

type LocationOption = "domestic" | "international";

type AccountDetail = {
  label: string;
  value: string;
};

type VirtualAccount = {
  currencyName: string;
  currencyCode: string;
  flag: string;
  accountDetails: AccountDetail[];
};

export default function VirtualAccountPage() {
  const [location, setLocation] = useState<LocationOption>("domestic");
  const [virtualAccounts, setVirtualAccounts] = useState<VirtualAccount[]>([]);
  const [selectedAccountIndex, setSelectedAccountIndex] = useState(0);

  // 🔹 Toast state
  const [toastMessage, setToastMessage] = useState("");
  const [toastVisible, setToastVisible] = useState(false);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 3000);
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await dataService.getVirtualAccounts();
      setVirtualAccounts(data);
    };
    fetchData();
  }, []);

  if (virtualAccounts.length === 0) {
    return (
      <PageContainer className="text-white space-y-6">
        <div className="p-6">Loading...</div>
      </PageContainer>
    );
  }

  const currentAccount = virtualAccounts[selectedAccountIndex];

  const handleCopyAll = () => {
    const text = currentAccount.accountDetails
      .map((detail) => `${detail.label}: ${detail.value}`)
      .join("\n");

    navigator.clipboard.writeText(text);
    showToast("Account details copied!");
  };

  const handleShare = async () => {
    const text = currentAccount.accountDetails
      .map((detail) => `${detail.label}: ${detail.value}`)
      .join("\n");

    if (navigator.share) {
      try {
        await navigator.share({
          title: `${currentAccount.currencyName} Virtual Account`,
          text,
        });
      } catch (error) {
        console.error("Share error:", error);
      }
    } else {
      handleCopyAll();
      showToast("Copied! Sharing not supported.");
    }
  };

  return (
    <PageContainer className="text-white space-y-6">

      {/* 🔹 GLOBAL TOAST */}
      <Toast
        visible={toastVisible}
        message={toastMessage}
        icon={
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
          >
            <path d="M20 6L9 17l-5-5" />
          </svg>
        }
      />

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
        <div className="flex justify-between w-full z-1">
          <BackButton />
        </div>
      </div>

      <div className="pt-6 relative rounded-t-3xl px-4 pb-25 bg-[#141414] z-1">
        <div className="flex justify-between items-center">
          <h1 className="text-[18px] font-light tracking-[0.01em] mb-4">
            My Virtual Account
          </h1>
          <button className="flex items-center gap-3 rounded-md bg-[#1d1d1f] px-2 text-sm">
            <span className="text-sm flex items-center">Add account</span>{" "}
            <span className="text-lg flex items-center">+</span>
          </button>
        </div>

        {/* DROPDOWN */}
        <div className="space-y-2 relative z-20">
          {/* BANK CARDS - Horizontal Scrollable */}
        <div className="overflow-x-auto pb-4 -mx-4 px-4 scrollbar-hide">
          <div className="flex gap-3 min-w-max">
            {virtualAccounts.map((account, index) => (
              <button
                key={account.currencyCode}
                onClick={() => setSelectedAccountIndex(index)}
                className={`flex-shrink-0 w-[280px] rounded-[24px] p-5 transition-all duration-300 ${
                  selectedAccountIndex === index
                    ? 'bg-gradient-to-br from-[#2E2E2E] to-[#1E1E1E] border-2 border-white/20 scale-105'
                    : 'bg-[#1E1E1E] border border-white/5 hover:border-white/10 active:scale-95'
                }`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <img
                    src={account.flag}
                    alt=""
                    className="h-10 w-10 rounded-full object-cover"
                  />
                  <div className="text-left">
                    <p className="text-sm font-medium tracking-tight text-white">
                      {account.currencyCode}
                    </p>
                    <p className="text-[10px] text-white/50">
                      {account.currencyName}
                    </p>
                  </div>
                </div>
                <div className="h-[1px] bg-white/10 mb-3" />
                <p className="text-xs text-white/60 text-left">
                  {account.accountDetails[0]?.label}
                </p>
                <p className="text-xs text-white font-mono mt-1 text-left truncate">
                  {account.accountDetails[0]?.value}
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* ACTION BUTTONS */}
        <div className="flex items-center gap-3 px-1">
          <button
            onClick={handleCopyAll}
            className="flex-1 flex items-center justify-center gap-2 bg-[#1E1E1E] hover:bg-[#2E2E2E] border border-white/10 rounded-[20px] px-6 py-4 transition-all active:scale-95"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
            </svg>
            <span className="text-sm font-medium text-white">Copy All</span>
          </button>
          <button
            onClick={handleShare}
            className="flex-1 flex items-center justify-center gap-2 bg-[#1E1E1E] hover:bg-[#2E2E2E] border border-white/10 rounded-[20px] px-6 py-4 transition-all active:scale-95"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <circle cx="18" cy="5" r="3"></circle>
              <circle cx="6" cy="12" r="3"></circle>
              <circle cx="18" cy="19" r="3"></circle>
              <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
              <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
            </svg>
            <span className="text-sm font-medium text-white">Share</span>
          </button>
        </div>
        </div>

        {/* ACCOUNT DETAILS */}
        <section className="rounded-[28px] bg-[#1E1E1E] shadow-[0_24px_45px_rgba(4,4,7,0.55)] p-5 space-y-4">
          <div className="flex items-center gap-3">
            <img
              src={currentAccount.flag}
              alt=""
              className="h-12 w-12 rounded-[14px] object-cover"
            />
            <div>
              <p className="text-[11px] font-medium tracking-tight">
                {currentAccount.currencyName}
              </p>
              <p className="text-[8px] text-white/60">Accepted Currencies</p>
            </div>
          </div>

          <p className="text-[11px] text-white">Sender's bank location</p>

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

          <p className="text-[11.6px] text-white tracking-[0.05em]">
            US Faster payment - account details
          </p>

          <div className="space-y-3 bg-[#2E2E2E] rounded-[18px] px-4 py-3 ">
            {currentAccount.accountDetails.map((field) => (
              <div
                key={field.label}
                className="flex items-center justify-between text-[11px]"
              >
                <span className="tracking-[0.03em]">{field.label}</span>
                <div className="flex items-center gap-3 text-[11px] text-white">
                  <span className="break-all text-right">{field.value}</span>

                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(field.value);
                        showToast("Copied!");
                      }}
                    >
                      <CopyButton value={field.value} />
                    </button>
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
      className="flex w-full items-center justify-between rounded-[14px] bg-[#2E2E2E] text-left"
    >
      <div className="flex items-center gap-3 px-3 py-2">
        <span
          className={[
            "h-5 w-5 rounded-full border-2 flex items-center justify-center",
            active ? "border-white" : "border-white/40",
          ].join(" ")}
        >
          {active && <span className="block h-2.5 w-2.5 rounded-full bg-white" />}
        </span>
        <div>
          <p className="text-[11px] text-white">{title}</p>
          <p className="text-[8px] text-white/60">{subtitle}</p>
        </div>
      </div>
      {badge && (
        <span className="rounded-[12px] bg-[#1f1f21] p-[18px] text-xs text-white/80">
          {badge}
        </span>
      )}
    </button>
  );
}

function ActionButton({
  label,
  icon,
  onClick,
}: {
  label: string;
  icon?: "share";
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex items-center gap-2 rounded-[10px] bg-[#2E2E2E] px-4 py-2 text-sm text-white/90 hover:bg-white/10 transition"
    >
      {label}
      {icon === "share" ? (
        <svg width="16" height="16" fill="none" stroke="currentColor">
          <path d="M6 5L10 8L6 11" strokeWidth="1.3" />
          <path
            d="M4 3H12C13.1 3 14 3.9 14 5V11C14 12.1 13.1 13 12 13H4C2.9 13 2 12.1 2 11V5C2 3.9 2.9 3 4 3Z"
            strokeWidth="1.2"
          />
        </svg>
      ) : (
        <svg width="16" height="16" fill="none" stroke="currentColor">
          <rect x="5" y="3" width="8" height="10" rx="2" strokeWidth="1.2" />
          <rect
            x="3"
            y="5"
            width="8"
            height="10"
            rx="2"
            opacity="0.5"
            strokeWidth="1.2"
          />
        </svg>
      )}
    </button>
  );
}
