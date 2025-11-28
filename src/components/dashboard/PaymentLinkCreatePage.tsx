import { useState } from "react";
import BackButton from "./BackButton";
import FormSelect from "./FormSelect";
import PageContainer from "./PageContainer";
import ToggleCheckbox from "./ToggleCheckbox";

function LabeledInput({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="flex flex-col gap-2 text-sm text-white/70">
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

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const slug = Math.random().toString(36).slice(2, 8);
    setShareableLink(`https://pay.zendt.com/${slug}`);
    setLinkCreated(true);
  };

  return (
    <PageContainer className="text-white space-y-6">
      <BackButton />
      <div>
        <h1 className="text-3xl font-semibold">Create payment link</h1>
        <p className="text-white/70 text-sm">Collect funds with a branded shareable link.</p>
      </div>

      {linkCreated ? (
        <section className="space-y-4 rounded-[36px] border border-white/10 bg-[#0f0f13]/90 p-6 shadow-[0_25px_45px_rgba(4,4,7,0.55)]">
          <h2 className="text-2xl font-semibold">Link created successfully</h2>
          <p className="text-white/70 text-sm">Share this URL with your customer to collect the payment.</p>
          <div className="rounded-2xl border border-white/20 bg-black/40 px-4 py-3 flex items-center justify-between">
            <span className="truncate text-white/90">{shareableLink}</span>
            <button
              type="button"
              onClick={() => navigator.clipboard.writeText(shareableLink)}
              className="text-sm text-white/70 hover:text-white"
            >
              Copy
            </button>
          </div>
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
        <form
          onSubmit={handleSubmit}
          className="space-y-6 rounded-[36px] border border-white/10 bg-[#0f0f13]/90 p-6 shadow-[0_25px_45px_rgba(4,4,7,0.55)]"
        >
          <section className="space-y-4">
            <h2 className="text-sm uppercase tracking-[0.35em] text-white/60">Amount</h2>
            <div className="flex items-center gap-3">
              <FormSelect
                value={amountCurrency}
                onChange={(event) => setAmountCurrency(event.target.value)}
                className="border-white/20 bg-black/40"
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
                className="flex-1 rounded-3xl border border-white/15 bg-black/30 px-4 py-3 text-white focus:outline-none"
              />
            </div>
          </section>

          <LabeledInput label="Payment for">
            <textarea
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              rows={3}
              placeholder="Payment description"
              className="rounded-3xl border border-white/15 bg-black/30 px-4 py-3 text-white focus:outline-none"
            />
          </LabeledInput>

          <section className="space-y-3">
            <h2 className="text-sm uppercase tracking-[0.35em] text-white/60">Customer details</h2>
            <input
              value={customer.name}
              onChange={(event) => setCustomer({ ...customer, name: event.target.value })}
              placeholder="Name"
              className="w-full rounded-3xl border border-white/15 bg-black/30 px-4 py-3 text-white focus:outline-none"
            />
            <input
              value={customer.email}
              onChange={(event) => setCustomer({ ...customer, email: event.target.value })}
              placeholder="E mail"
              className="w-full rounded-3xl border border-white/15 bg-black/30 px-4 py-3 text-white focus:outline-none"
            />
            <input
              value={customer.phone}
              onChange={(event) => setCustomer({ ...customer, phone: event.target.value })}
              placeholder="Number"
              className="w-full rounded-3xl border border-white/15 bg-black/30 px-4 py-3 text-white focus:outline-none"
            />
          </section>

          <LabeledInput label="Reference id">
            <input
              value={referenceId}
              onChange={(event) => setReferenceId(event.target.value)}
              className="w-full rounded-3xl border border-white/15 bg-black/30 px-4 py-3 text-white focus:outline-none"
            />
          </LabeledInput>

          <LabeledInput label="Link expiry">
            <input
              type="date"
              value={expiry}
              onChange={(event) => setExpiry(event.target.value)}
              className="w-full rounded-3xl border border-white/15 bg-black/30 px-4 py-3 text-white focus:outline-none"
            />
          </LabeledInput>

          <LabeledInput label="Reminder">
            <input
              value={reminder}
              onChange={(event) => setReminder(event.target.value)}
              placeholder="Alternate days"
              className="w-full rounded-3xl border border-white/15 bg-black/30 px-4 py-3 text-white focus:outline-none"
            />
          </LabeledInput>

          <label className="flex items-center gap-3 text-sm text-white/80">
            <ToggleCheckbox checked={partialAllowed} onChange={setPartialAllowed} />
            <span>Allow partial payments</span>
          </label>

          <LabeledInput label="Notes">
            <textarea
              value={notes}
              onChange={(event) => setNotes(event.target.value)}
              rows={3}
              placeholder="description"
              className="rounded-3xl border border-white/15 bg-black/30 px-4 py-3 text-white focus:outline-none"
            />
          </LabeledInput>

          <section className="space-y-2">
            <p className="text-sm uppercase tracking-[0.35em] text-white/60">Attach invoice</p>
            <label className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-white/20 bg-black/20 px-4 py-6 text-sm text-white/60">
              <input
                type="file"
                className="hidden"
                onChange={(event) => setInvoiceName(event.target.files?.[0]?.name ?? "")}
              />
              {invoiceName ? (
                <span>{invoiceName}</span>
              ) : (
                <>
                  <span>Upload invoice +</span>
                  <span className="text-xs">jpg/jpeg/png/HEIC/HEIF/PDF/Docs/doc</span>
                </>
              )}
            </label>
          </section>

          <div className="flex justify-end">
            <button
              type="submit"
              className="rounded-[32px] bg-white/10 px-6 py-2 text-sm text-white border border-white/20 hover:bg-white/20"
            >
              Create
            </button>
          </div>
        </form>
      )}
    </PageContainer>
  );
}
