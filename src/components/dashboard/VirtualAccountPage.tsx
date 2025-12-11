import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import BackButton from "./BackButton";
import CopyButton from "./CopyButton";
import PageContainer from "./PageContainer";
import { dataService } from "../../services/dataService";

type LocationOption = "domestic" | "international";

interface AccountDetail {
  label: string;
  value: string;
}

interface VirtualAccount {
  currencyName: string;
  currencyCode: string;
  flag: string;
  accountDetails: AccountDetail[];
}

const Toast = ({ message, isVisible, onClose }: { message: string; isVisible: boolean; onClose: () => void }) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(onClose, 2000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className="bg-[#1E1E1E] border border-white/10 text-white px-4 py-2.5 rounded-xl shadow-2xl flex items-center gap-2">
        <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
        <span className="text-xs font-medium">{message}</span>
      </div>
    </div>
  );
};

export default function VirtualAccountPage() {
  const navigate = useNavigate();
  const [location, setLocation] = useState<LocationOption>("domestic");
  const [accounts, setAccounts] = useState<VirtualAccount[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedAccountIndex, setSelectedAccountIndex] = useState(0);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [toast, setToast] = useState({ show: false, message: "" });

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const data = await dataService.getVirtualAccounts();
        setAccounts(data);
      } catch (error) {
        console.error("Failed to fetch virtual accounts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAccounts();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const showToast = (message: string) => {
    setToast({ show: true, message });
  };

  const handleCopyAll = async () => {
    if (!accounts[selectedAccountIndex]) return;
    
    const account = accounts[selectedAccountIndex];
    const detailsText = account.accountDetails
      .map(detail => `${detail.label}: ${detail.value}`)
      .join('\n');
    
    const textToCopy = `
${account.currencyName} (${account.currencyCode}) Account Details
----------------------------------------
${detailsText}
----------------------------------------
Powered by Zendt
    `.trim();

    try {
      await navigator.clipboard.writeText(textToCopy);
      showToast("Account details copied to clipboard");
    } catch (err) {
      console.error('Failed to copy:', err);
      showToast("Failed to copy details");
    }
  };

  const handleShare = async () => {
    if (!accounts[selectedAccountIndex]) return;

    const account = accounts[selectedAccountIndex];
    const detailsText = account.accountDetails
      .map(detail => `${detail.label}: ${detail.value}`)
      .join('\n');
    
    const shareData = {
      title: `${account.currencyCode} Account Details`,
      text: `Here are my ${account.currencyName} account details:\n\n${detailsText}\n\nSent via Zendt`,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(shareData.text);
        showToast("Details copied (Sharing not supported)");
      }
    } catch (err) {
      console.error('Error sharing:', err);
    }
  };

  if (loading) {
    return (
      <PageContainer className="text-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white"></div>
      </PageContainer>
    );
  }

  const currentAccount = accounts[selectedAccountIndex];

  return (
    <PageContainer className="text-white space-y-6">
      <Toast 
        message={toast.message} 
        isVisible={toast.show} 
        onClose={() => setToast(prev => ({ ...prev, show: false }))} 
      />

      <div className="flex items-center justify-between px-4 pt-12 z-0 relative">
        <div
          className="absolute opacity-60 blur-2xl -z-10"
          style={{
            right: "82px",
            top: "-20px",
            width: "321px",
            height: "262px",
            zIndex: "0",
            background:
              "radial-gradient(50% 50% at 50% 50%, rgba(255,173,122,0.40) 0%, rgba(93,104,157,0.40) 58.08%, rgba(20,35,55,0.40) 200%)",
          }}
        ></div>
        <div className="flex justify-between w-full z-1">
          <BackButton />
        </div>
      </div>

      <div className="pt-6 relative rounded-t-3xl px-4 pb-14 bg-[#141414] z-1 min-h-[calc(100vh-100px)]">
        <div className="flex justify-between items-center">
          <h1 className="text-[18px] font-light tracking-[0.01em] mb-4">
            My Virtual Account
          </h1>
          <button 
            onClick={() => navigate("/dashboard/virtual-account/new")}
            className="flex items-center gap-3 rounded-md bg-[#1d1d1f] px-2 text-sm h-8"
          >
            <span className="text-sm flex items-center">Add account</span>{" "}
            <span className="text-lg flex items-center">+</span>
          </button>
        </div>

        <div className="space-y-2 relative z-20" ref={dropdownRef}>
          <p className="text-xs text-white">Select currency</p>
          <div 
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center justify-between rounded-[14px] bg-[#1E1E1E] px-4 py-3 mb-4 cursor-pointer"
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
              viewBox="0 0 9 21"
              fill="none"
              className={`transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`}
            >
              <path
                d="M0.5 20.5L6.96447 14.0355C8.91709 12.0829 8.91709 8.91709 6.96447 6.96447L0.499999 0.5"
                stroke="white"
                strokeLinecap="round"
              ></path>
            </svg>
          </div>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute top-[70px] left-0 right-0 bg-[#1E1E1E] border border-white/10 rounded-2xl overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200 z-50">
              {accounts.map((account, index) => (
                <button
                  key={account.currencyCode}
                  onClick={() => {
                    setSelectedAccountIndex(index);
                    setIsDropdownOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 p-3 transition-colors ${
                    index === selectedAccountIndex 
                      ? 'bg-white/10' 
                      : 'hover:bg-white/5'
                  }`}
                >
                  <img
                    src={account.flag}
                    alt={account.currencyCode}
                    className="h-6 w-14 rounded-[10px] object-cover"
                  />
                  <span className="text-xs font-medium text-white">{account.currencyName}</span>
                  {index === selectedAccountIndex && (
                    <div className="ml-auto w-1.5 h-1.5 rounded-full bg-green-500" />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        <section className="rounded-[28px] bg-[#1E1E1E] shadow-[0_24px_45px_rgba(4,4,7,0.55)] p-5 space-y-4">
          <div className="flex items-center gap-3">
            <img
              src={currentAccount.flag}
              alt=""
              className="h-12 w-12 rounded-[14px] object-cover"
            />
            <div className="space-y-1">
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
              <ActionButton 
                label="Copy" 
                onClick={handleCopyAll}
              />
              <ActionButton 
                label="Share" 
                icon="share" 
                onClick={handleShare}
              />
            </div>
          </div>
          <div className="space-y-3 bg-[#2E2E2E] rounded-[18px] px-4 py-3 ">
            {currentAccount.accountDetails.map((field) => (
              <div
                key={field.label}
                className="flex items-center justify-between text-[11px] "
              >
                <span className="tracking-[0.03em]">{field.label}</span>
                <div className="flex items-center gap-3 text-[11px] text-white">
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
      className="flex w-full items-center justify-between rounded-[14px] bg-[#2E2E2E]  text-left"
    >
      <div className="flex items-center gap-3 px-3 py-2">
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
          <p className="text-[11px] text-white tracking-[0.02em]">{title}</p>
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

function ActionButton({ label, icon, onClick }: { label: string; icon?: "share"; onClick?: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
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
