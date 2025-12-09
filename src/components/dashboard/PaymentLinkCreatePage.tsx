import { useState } from "react";
import BackButton from "./BackButton";
import GradientBlob from "../icons/GradientBlob";
import FormSelect from "./FormSelect";
import PageContainer from "./PageContainer";
import ToggleCheckbox from "./ToggleCheckbox";
import Toast from "../Toast";

function LabeledInput({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="flex flex-col gap-2 text-[10px] text-white/70">
      {label}
      {children}
    </label>
  );
}

export default function PaymentLinkCreatePage() {
  const [amountCurrency, setAmountCurrency] = useState("$");
  const [amount, setAmount] = useState("10,000");
  const [description, setDescription] = useState("");
  const [customer, setCustomer] = useState({ name: "", email: "", phone: "" });
  const [referenceId, setReferenceId] = useState("12345");
  const [expiry, setExpiry] = useState("");
  const [reminder, setReminder] = useState("Alternate days");
  const [partialAllowed, setPartialAllowed] = useState(false);
  const [notes, setNotes] = useState("");
  const [invoiceName, setInvoiceName] = useState("");
  const [linkCreated, setLinkCreated] = useState(false);
  const [shareableLink, setShareableLink] = useState("");

  // 🔥 Toast state
  const [showToast, setShowToast] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const slug = Math.random().toString(36).slice(2, 8);
    setShareableLink(`https://pay.zendt.com/${slug}`);
    setLinkCreated(true);
  };

  // 🔥 copy handler with toast
  const handleCopy = () => {
    navigator.clipboard.writeText(shareableLink);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  return (
    <PageContainer className="text-white space-y-6">

      <Toast
        message="Link copied!"
        subMessage="Payment link is now in your clipboard."
        visible={showToast}
        icon={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            fill="none"
            stroke="grey"
            strokeWidth="2"
            className="lucide lucide-check-circle"
          >
            <circle cx="9" cy="9" r="8" />
            <path d="m7 9 2 2 4-4" />
          </svg>
        }
      />

      {/* HEADER */}
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

      {/* CONTENT */}
      <div className="bg-[#141414] p-6 shadow-[0_25px_45px_rgba(4,4,7,0.55)] space-y-6 rounded-t-[32px] relative z-2 pb-20">

        {!linkCreated ? (
          <h1 className="text-[18px] font-semibold">Create payment link</h1>
        ) : null}

        {linkCreated ? (
          /* -----------------------------
             🔵 SUCCESS SCREEN
          ------------------------------*/
          <section className="space-y-4 shadow-[0_25px_45px_rgba(4,4,7,0.55)]">
            <h2 className="text-2xl font-semibold">Link created successfully</h2>
            <p className="text-white/70 text-sm">
              Share this URL with your customer to collect the payment.
            </p>

            {/* 🔥 COPY BUTTON */}
            <div className="rounded-2xl border border-white/20 bg-[#1E1E1E] px-4 py-3 flex items-center justify-between">
              <span className="truncate text-white/90">{shareableLink}</span>

              <button
                type="button"
                onClick={handleCopy}
                className="text-sm text-white/70 hover:text-white"
              >
                Copy
              </button>
            </div>

            {/* CREATE ANOTHER */}
            <button
              type="button"
              onClick={() => {
                setLinkCreated(false);
                setShareableLink("");
              }}
              className="rounded-full border border-white/20 px-4 py-2 text-sm text-white/80 hover:text-white"
            >
              Create another link
            </button>
          </section>
        ) : (
          /* -----------------------------
             🔵 CREATE FORM
          ------------------------------*/
          <form
            onSubmit={handleSubmit}
            className="space-y-6 rounded-t-[36px]"
          >
            <section className="space-y-4">
              <h2 className="text-[10px] uppercase tracking-[0.35em] text-white/60">
                Amount
              </h2>

              <div className="flex items-center gap-3">
                <FormSelect
                  value={amountCurrency}
                  onChange={(event) => setAmountCurrency(event.target.value)}
                  className="rounded-[11px] bg-[#1E1E1E]"
                >
                  {["$", "€", "₹"].map((cur) => (
                    <option key={cur} value={cur} className="text-black">
                      {cur}
                    </option>
                  ))}
                </FormSelect>

                <input
                  value={amount}
                  onChange={(event) => setAmount(event.target.value)}
                  placeholder="10,000"
                  className="flex-1 rounded-[11px] bg-[#1E1E1E] px-4 py-3 text-white text-[10px] focus:outline-none"
                />
              </div>
            </section>

            <LabeledInput label="Payment for">
              <textarea
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                rows={3}
                placeholder="Payment description"
                className="rounded-[11px] bg-[#1E1E1E] px-4 py-3 text-white text-[10px] focus:outline-none"
              />
            </LabeledInput>

            <section className="space-y-3">
              <h2 className="text-[10px] uppercase tracking-[0.35em] text-white/60">
                Customer details
              </h2>

              <input
                value={customer.name}
                onChange={(event) =>
                  setCustomer({ ...customer, name: event.target.value })
                }
                placeholder="Name"
                className="w-full rounded-[11px] bg-[#1E1E1E] px-4 py-3 text-white text-[10px] focus:outline-none"
              />

              <input
                value={customer.email}
                onChange={(event) =>
                  setCustomer({ ...customer, email: event.target.value })
                }
                placeholder="E mail"
                className="w-full rounded-[11px] bg-[#1E1E1E] px-4 py-3 text-white text-[10px] focus:outline-none"
              />

              <input
                value={customer.phone}
                onChange={(event) =>
                  setCustomer({ ...customer, phone: event.target.value })
                }
                placeholder="Number"
                className="w-full rounded-[11px] bg-[#1E1E1E] px-4 py-3 text-white text-[10px] focus:outline-none"
              />
            </section>

            <LabeledInput label="Reference id">
              <input
                value={referenceId}
                onChange={(event) => setReferenceId(event.target.value)}
                className="w-full rounded-[11px] bg-[#1E1E1E] px-4 py-3 text-white text-[10px] focus:outline-none"
              />
            </LabeledInput>

            <LabeledInput label="Link expiry">
              <input
                type="date"
                value={expiry}
                onChange={(event) => setExpiry(event.target.value)}
                className="w-full rounded-[11px] bg-[#1E1E1E] px-4 py-3 text-white text-[10px] focus:outline-none"
              />
            </LabeledInput>

            <LabeledInput label="Reminder">
              <input
                value={reminder}
                onChange={(event) => setReminder(event.target.value)}
                placeholder="Alternate days"
                className="w-full rounded-[11px] bg-[#1E1E1E] px-4 py-3 text-white text-[10px] focus:outline-none"
              />
            </LabeledInput>

            <label className="flex items-center gap-3 text-sm text-white/80">
              <ToggleCheckbox
                checked={partialAllowed}
                onChange={setPartialAllowed}
              />
              <span>Allow partial payments</span>
            </label>

            <LabeledInput label="Notes">
              <textarea
                value={notes}
                onChange={(event) => setNotes(event.target.value)}
                rows={3}
                placeholder="description"
                className="rounded-[11px] bg-[#1E1E1E] px-4 py-3 text-white text-[10px] focus:outline-none"
              />
            </LabeledInput>

            <section className="space-y-2">
              <p className="text-[10px] uppercase tracking-[0.35em] text-white/60">
                Attach invoice
              </p>

              <label className="flex flex-col items-center justify-center border border-dashed border-white/20 bg-[#141414]/20 px-4 py-6 text-sm text-white/60">
                <input
                  type="file"
                  className="hidden"
                  onChange={(event) =>
                    setInvoiceName(event.target.files?.[0]?.name ?? "")
                  }
                />

                {invoiceName ? (
                  <span>{invoiceName}</span>
                ) : (
                  <>
                    <span>Upload invoice +</span>
                    <span className="text-xs">
                      jpg/jpeg/png/HEIC/HEIF/PDF/Docs/doc
                    </span>
                  </>
                )}
              </label>
            </section>

            <div className="flex justify-end pb-12">
              <button
                type="submit"
                className="rounded-[11px] w-38 bg-[#1E1E1E] px-6 py-2 text-sm text-white hover:bg-white/20"
              >
                Create
              </button>
            </div>
          </form>
        )}
      </div>
    </PageContainer>
  );
}
