import { useState, useEffect, type ReactNode } from "react";
import BackButton from "./BackButton";
import GradientBlob from "../icons/GradientBlob";
import PageContainer from "./PageContainer";
import ToggleCheckbox from "./ToggleCheckbox";
import { dataService } from "../../services/dataService";

const sortOptions = ["Newest first", "Oldest first", "Amount high to low"];
const statusOptions = ["Created", "Partially paid", "Paid", "Cancelled", "Expired"];

const durationOptions = [
  "Past 7 days",
  "Past 30 days",
  "Past 90 days",
  "Past 1 year",
  "This month",
  "This year",
  "All time",
];

export default function PaymentLinksPage() {
  const [sortBy, setSortBy] = useState(sortOptions[0]);
  const [statusOpen, setStatusOpen] = useState(false);
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>(["Created"]);
  const [durationOpen, setDurationOpen] = useState(false);
  const [duration, setDuration] = useState(durationOptions[0]);

  const [paymentLinks, setPaymentLinks] = useState<any[]>([]);
  const [filtered, setFiltered] = useState<any[]>([]);

  useEffect(() => {
    dataService.getPaymentLinks().then((data) => {
      setPaymentLinks(data);
      setFiltered(data);
    });
  }, []);

  const toggleStatus = (status: string) => {
    setSelectedStatuses((current) =>
      current.includes(status)
        ? current.filter((item) => item !== status)
        : [...current, status]
    );
  };

  /* APPLY FILTERS */
  const applyFilters = () => {
    let data = [...paymentLinks];

    // STATUS
    if (selectedStatuses.length > 0) {
      data = data.filter((link) =>
        selectedStatuses.map((s) => s.toLowerCase()).includes(link.status.toLowerCase())
      );
    }

    // DATE FILTER
    const today = new Date();
    let cutoff = new Date();

    if (duration === "All time") {
      // no date filter
    } 
    
    else if (duration === "This month") {
      cutoff = new Date(today.getFullYear(), today.getMonth(), 1);
      data = data.filter((link) => new Date(link.createdOn) >= cutoff);
    }
    
    else if (duration === "This year") {
      cutoff = new Date(today.getFullYear(), 0, 1);
      data = data.filter((link) => new Date(link.createdOn) >= cutoff);
    }
    
    else if (duration === "Past 1 year") {
      cutoff = new Date();
      cutoff.setFullYear(today.getFullYear() - 1);
      data = data.filter((link) => new Date(link.createdOn) >= cutoff);
    }
    
    else {
      // Past X days
      const daysMap: any = {
        "Past 7 days": 7,
        "Past 30 days": 30,
        "Past 90 days": 90,
      };

      cutoff = new Date();
      cutoff.setDate(today.getDate() - daysMap[duration]);

      data = data.filter((link) => new Date(link.createdOn) >= cutoff);
    }

    // SORT
    if (sortBy === "Newest first") {
      data.sort(
        (a, b) => new Date(b.createdOn).getTime() - new Date(a.createdOn).getTime()
      );
    }
    if (sortBy === "Oldest first") {
      data.sort(
        (a, b) => new Date(a.createdOn).getTime() - new Date(b.createdOn).getTime()
      );
    }
    if (sortBy === "Amount high to low") {
      data.sort((a, b) => b.amount - a.amount);
    }

    setFiltered(data);
  };

  const Section = ({ children }: { children: ReactNode }) => (
    <section className="rounded-[32px] bg-[#141414] relative z-10 p-5 pt-10 shadow-[0_25px_45px_rgba(4,4,7,0.55)] space-y-3">
      {children}
    </section>
  );

  const Input = ({ placeholder }: { placeholder: string }) => (
    <input
      placeholder={placeholder}
      className="w-full rounded-[10px] bg-[#1E1E1E] px-3.5 py-2.5 text-[10px] text-white placeholder:text-white/40 focus:outline-none"
    />
  );

  return (
    <PageContainer className="text-white space-y-6 overflow-y-auto">
      {/* HEADER */}
      <div className="flex items-center justify-between px-4 pt-12 z-0 relative">
      <GradientBlob
        className="absolute opacity-60 blur-2xl -z-10"
        style={{
          right: "82px",
            top: "-50px",
          width: "321px",
          height: "262px",
        }}
      />
      <div className="flex justify-between w-full z-1">
        <BackButton />
      </div>
    </div>

      <Section>
        <header className="space-y-2 mb-4">
  <h2 className="text-[17px] font-light">Payment Links</h2>
  <p className="text-sm text-white/70">
    View and manage your payment links.
  </p>
</header>

        <FieldToggle
          label="Sort by"
          value={sortBy}
          onClick={() => setSortBy(nextSort(sortBy))}
        />

        <div className="grid grid-cols-2 gap-3">
          <Input placeholder="Payment link ID" />
          <Input placeholder="Reference ID" />
          <Input placeholder="Customer contact" />
          <Input placeholder="Customer Email" />
          <Input placeholder="Count" />
        </div>

        {/* STATUS */}
        <div>
          <FieldToggle
            label="Payment link status"
            trailingIcon={<Chevron isOpen={statusOpen} />}
            onClick={() => setStatusOpen((prev) => !prev)}
          />

          {statusOpen && (
            <div className="mt-2 rounded-2xl border border-white/10 bg-[#141414]/30 p-3 space-y-2 text-xs text-white/80">
              <label className="flex items-center gap-2 mb-2">
                <ToggleCheckbox
                  size="sm"
                  checked={selectedStatuses.length === statusOptions.length}
                  onChange={(checked) =>
                    setSelectedStatuses(checked ? statusOptions : [])
                  }
                />
                <span className="text-xs">All</span>
              </label>

              <div className="grid grid-cols-2 gap-2">
                {statusOptions.map((status) => (
                  <label
                    key={status}
                    className="flex items-center gap-2 rounded-xl bg-[#141414]/20 px-2 py-2"
                  >
                    <ToggleCheckbox
                      size="sm"
                      checked={selectedStatuses.includes(status)}
                      onChange={() => toggleStatus(status)}
                    />
                    <span className="text-xs">{status}</span>
                  </label>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* DURATION */}
        <div>
          <FieldToggle
            label="Duration"
            value={duration}
            trailingIcon={<Chevron isOpen={durationOpen} />}
            onClick={() => setDurationOpen((prev) => !prev)}
          />

          {durationOpen && (
            <div className="rounded-2xl border border-white/10 bg-[#141414]/30 p-3 space-y-1">
              {durationOptions.map((option) => (
                <button
                  key={option}
                  type="button"
                  className={`w-full text-left px-3 py-2 text-xs rounded-xl ${
                    option === duration ? "bg-white/10" : "hover:bg-white/5"
                  }`}
                  onClick={() => {
                    setDuration(option);
                    setDurationOpen(false);
                  }}
                >
                  {option}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* APPLY */}
        <div className="flex justify-end">
          <button
            type="button"
            onClick={applyFilters}
            className="mt-1 w-32 rounded-[10px] bg-[#1E1E1E] px-4 py-2 text-[10px] text-white hover:bg-white/20"
          >
            Apply
          </button>
        </div>

        {/* RESULTS */}
        <div className="mt-15 space-y-3 pb-10">
          <div className="mt-6 h-96 overflow-y-auto pr-1">
            <div className="space-y-3 pb-10">
              {filtered.map((link) => (
                <div
                  key={link.id}
                  className="rounded-2xl border border-white/10 bg-[#1E1E1E] p-4 text-xs"
                >
                  <div className="flex justify-between">
                    <span className="text-white/90">{link.id}</span>
                    <span className="text-white/60">{link.status}</span>
                  </div>

                  <div className="mt-1 text-white/70">
                    {link.customer.name} • {link.amount} USD
                  </div>

                  <div className="text-white/50 text-[10px] mt-1">
                    {link.createdOn}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </Section>
    </PageContainer>
  );
}

/* Chevron icon */
function Chevron({ isOpen }: { isOpen: boolean }) {
  return isOpen ? (
    <svg xmlns="http://www.w3.org/2000/svg" width="21" height="9" fill="none">
      <path d="M0.3 0.5L7 7.2c1.8 1.8 4.5 1.8 6.3 0L20 0.5" stroke="white" strokeWidth="0.8" />
    </svg>
  ) : (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="21"
      height="9"
      className="rotate-180"
      fill="none"
    >
      <path d="M0.3 0.5L7 7.2c1.8 1.8 4.5 1.8 6.3 0L20 0.5" stroke="white" strokeWidth="0.8" />
    </svg>
  );
}

function FieldToggle({
  label,
  value,
  trailingIcon,
  onClick,
}: {
  label: string;
  value?: string;
  trailingIcon?: ReactNode;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      className="flex w-full items-center justify-between bg-[#1E1E1E] rounded-[10px] px-4 py-2.5 text-left"
      onClick={onClick}
    >
      <div className="text-[10px] text-white/70">{label}</div>
      <div className="flex items-center gap-2 text-white/80 text-[10px]">
        {value && <span>{value}</span>}
        {trailingIcon}
      </div>
    </button>
  );
}

function nextSort(current: string) {
  const index = sortOptions.indexOf(current);
  return sortOptions[(index + 1) % sortOptions.length];
}
