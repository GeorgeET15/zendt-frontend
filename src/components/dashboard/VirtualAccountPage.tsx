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
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

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
          <p className="text-xs text-white">Select currency</p>
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="w-full flex items-center justify-between rounded-[14px] bg-[#1E1E1E] px-4 py-3 mb-4"
          >
            <div className="flex items-center gap-3">
              <img
                src={currentAccount.flag}
                alt=""
                className="h-6 w-14 rounded-[10px] object-cover"
              />
              <span className="text-[13px] tracking-[0.08em]">
                {currentAccount.currencyName}
              </span>
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="9"
              height="21"
              className={`transition-transform ${isDropdownOpen ? "rotate-90" : ""}`}
            >
              <path
                d="M0.5 20.5L6.96447 14.0355C8.91709 12.0829 8.91709 8.91709 6.96447 6.96447L0.499999 0.5"
                stroke="white"
                strokeLinecap="round"
              />
            </svg>
          </button>

          {isDropdownOpen && (
            <div className="absolute top-full left-0 w-full mt-1 bg-[#1E1E1E] rounded-[14px] overflow-hidden z-50 shadow-xl border border-white/10">
              {virtualAccounts.map((account, index) => (
                <button
                  key={account.currencyCode}
                  onClick={() => {
                    setSelectedAccountIndex(index);
                    setIsDropdownOpen(false);
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 hover:bg-white/5 transition"
                >
                  <img
                    src={account.flag}
                    alt=""
                    className="h-6 w-14 rounded-[10px] object-cover"
                  />
                  <span className="text-[13px] tracking-[0.08em]">
                    {account.currencyName}
                  </span>
                </button>
              ))}
            </div>
          )}
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

          <div className="flex items-center justify-between gap-3">
            <p className="text-[11.6px] text-white tracking-[0.05em]">
              US Faster payment - account details
            </p>
            <div className="flex items-center gap-2">
              <ActionButton label="Copy" onClick={handleCopyAll} />
              <ActionButton label="Share" icon="share" onClick={handleShare} />
            </div>
          </div>

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
