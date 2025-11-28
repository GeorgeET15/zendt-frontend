import { useState } from "react";
import { Link } from "react-router-dom";
import BackButton from "./BackButton";
import CopyButton from "./CopyButton";
import PageContainer from "./PageContainer";

const currencies = [
  { code: "INR", name: "Indian Rupees", flag: "/india.png" },
  { code: "USD", name: "US Dollar", flag: "/usa.png" },
];

const accountDetails = [
  { label: "Account holder name", value: "Alen Thomas" },
  { label: "Account type", value: "Checking" },
  { label: "Sort Code", value: "041404" },
  { label: "Account number", value: "41234432" },
  { label: "Bank name", value: "The currency cloud" },
  { label: "Bank address", value: "12 street, the texas hijo building elud 89" },
];

type LocationOption = "domestic" | "international";

const locationOptions: Array<{
  value: LocationOption;
  label: string;
  detail: string;
  badge?: string;
}> = [
  { value: "domestic", label: "Within India", detail: "Payment mode : Indian Payment", badge: "Recommended" },
  { value: "international", label: "Outside India", detail: "Payment mode : Swift" },
];

export default function VirtualAccountPage() {
  const [selectedCurrency] = useState(currencies[0]);
  const [location, setLocation] = useState<LocationOption>("domestic");

  return (
    <PageContainer className="space-y-8 text-white">
      <div className="flex items-center justify-between gap-4">
        <BackButton />
          <Link
            to="/dashboard/virtual-account/new"
            className="inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-2 text-sm text-white/80 hover:text-white hover:border-white/40"
          >
            Add account <span className="text-lg">+</span>
          </Link>
        </div>

        <section className="rounded-[40px] bg-[#050506]/95 border border-white/5 shadow-[0_35px_65px_rgba(4,4,7,0.55)] sm:p-6 p-2 space-y-8">
          <header className="space-y-2">
            <h1 className="text-3xl font-semibold">My Virtual Account</h1>
            <p className="text-sm text-white/70">Select currency</p>
          </header>

          <div className="space-y-4">
            <div className="rounded-[28px] bg-[#0b0c10] border border-white/5 px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-3 text-lg">
                {selectedCurrency.flag && (
                  <img src={selectedCurrency.flag} alt="" className="h-7 w-10 object-cover rounded-xl" />
                )}
                <span>{selectedCurrency.name}</span>
              </div>
              <span className="text-2xl text-white/70">&rsaquo;</span>
            </div>

            <div className="rounded-4xl bg-[#0d0f15]/95 border border-white/5 p-5 space-y-5">
              <div className="flex items-center gap-3 text-lg">
                {selectedCurrency.flag && (
                  <img src={selectedCurrency.flag} alt="" className="h-10 w-16 object-cover rounded-[16px]" />
                )}
                <div>
                  <p className="text-lg font-medium">{selectedCurrency.name}</p>
                  <p className="text-xs text-white/60">Accepted currencies</p>
                </div>
              </div>

              <div className="text-sm text-white/60 uppercase tracking-[0.3em]">
                Sender's bank location
              </div>

              <div className="space-y-3">
                {locationOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setLocation(option.value)}
                    className={[
                      "flex w-full items-center justify-between rounded-3xl text-left transition border pl-4",
                      location === option.value ? "bg-white/10 border-white/20" : "bg-black/30 border-transparent",
                    ].join(" ")}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={[
                          "h-5 w-5 rounded-full border-2 shrink-0",
                          location === option.value ? "border-white" : "border-white/40",
                        ].join(" ")}
                      >
                        {location === option.value && <span className="block h-full w-full rounded-full border-8 border-white" />}
                      </span>
                      <div>
                        <p className="text-base text-white">{option.label}</p>
                        <p className="text-xs text-white/60">{option.detail}</p>
                      </div>
                    </div>
                    {option.badge && (
                      <span className=" w-42 h-18 rounded-3xl flex items-center justify-center bg-white/10 px-3 py-1 text-sm text-white/80">
                        {option.badge}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="rounded-[32px] bg-[#0a0b0f]/95 border border-white/5 shadow-[0_35px_65px_rgba(4,4,7,0.55)] p-6 space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-white/60">US Faster payment - account details</p>
              <p className="text-xs text-white/50">Use the details below to receive funds.</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                className="flex items-center gap-2 rounded-2xl border border-white/15 px-3 py-2 text-sm text-white/80 hover:text-white hover:border-white/40"
              >
                Copy
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="5" y="3" width="8" height="10" rx="2" stroke="currentColor" strokeWidth="1.2" />
                  <rect x="3" y="5" width="8" height="10" rx="2" stroke="currentColor" strokeWidth="1.2" opacity="0.5" />
                </svg>
              </button>
              <button
                type="button"
                className="flex items-center gap-2 rounded-2xl border border-white/15 px-3 py-2 text-sm text-white/80 hover:text-white hover:border-white/40"
              >
                Share
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6 5L10 8L6 11" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M4 3H12C13.1046 3 14 3.89543 14 5V11C14 12.1046 13.1046 13 12 13H4C2.89543 13 2 12.1046 2 11V5C2 3.89543 2.89543 3 4 3Z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                </svg>
              </button>
            </div>
          </div>

          <div className="space-y-4">
            {accountDetails.map((field) => (
              <div key={field.label}>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 text-sm text-white/70">
                  <span>{field.label}</span>
                  <div className="flex items-center gap-3 text-base text-white">
                    <span>{field.value}</span>
                    <CopyButton value={field.value} />
                  </div>
                </div>
                <div className="mt-3 h-px bg-white/5" />
              </div>
            ))}
          </div>
        </section>
      </PageContainer>
  );
}
