import { useState } from "react";
import BackButton from "./BackButton";
import PageContainer from "./PageContainer";

interface ServiceItem {
  id: number;
  description: string;
  rate: number;
  quantity: number;
}

export default function InvoicePage() {
  const [services, setServices] = useState<ServiceItem[]>([
    { id: 1, description: "Service", rate: 200, quantity: 3 },
  ]);

  const handleServiceChange = (id: number, key: keyof ServiceItem, value: string) => {
    setServices((items) =>
      items.map((item) =>
        item.id === id
          ? {
              ...item,
              [key]:
                key === "rate" || key === "quantity"
                  ? Number(value.replace(/[^\d.]/g, "")) || 0
                  : value,
            }
          : item,
      ),
    );
  };

  const addService = () => {
    setServices((items) => [
      ...items,
      { id: items.length + 1, description: "New service", rate: 0, quantity: 1 },
    ]);
  };

  const total = services.reduce((sum, item) => sum + item.rate * item.quantity, 0);

  return (
    <PageContainer className="text-white space-y-6">
           <div className="flex items-center justify-between px-4 pt-6 z-0">
             <div                      className="absolute opacity-60 blur-2xl -z-10"
                     style={{
                       right: "82px",
                       top: "-20px",
                       width: "321px",
                       height: "262px", zIndex: "0",
                       
                       background:
                         "radial-gradient(50% 50% at 50% 50%, rgba(255,173,122,0.40) 0%, rgba(93,104,157,0.40) 58.08%, rgba(20,35,55,0.40) 200%)",
                     }}></div>
            <div className="flex justify-between w-full z-1"><BackButton /></div>
           </div>
      <section className="rounded-[36px] border border-white/10 bg-[#0b0b0e]/90 p-6 shadow-[0_25px_45px_rgba(4,4,7,0.55)] space-y-6">
        <header className="space-y-1">
          <h1 className="text-3xl font-semibold">Create invoice</h1>
          <p className="text-sm text-white/60">Send a branded invoice in seconds.</p>
        </header>

        <div className="space-y-6">
          <FormField label="Invoice Number" placeholder="12345" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField label="Creation date" placeholder="Select date" type="date" />
            <FormField label="Due date" placeholder="Select date" type="date" />
          </div>

          <AddressBlock title="Bills from" />
          <AddressBlock title="Bills to" />

          <div className="space-y-4">
            <p className="text-sm uppercase tracking-[0.35em] text-white/70">Services</p>
            <div className="space-y-3">
              {services.map((service) => (
                <div key={service.id} className="rounded-3xl border border-white/10 bg-black/30 p-4 space-y-3">
                  <input
                    className="w-full rounded-2xl bg-black/40 px-4 py-2 text-sm focus:outline-none border border-white/10"
                    value={service.description}
                    onChange={(event) => handleServiceChange(service.id, "description", event.target.value)}
                  />
                  <div className="flex flex-wrap items-center gap-3 text-sm">
                    <NumberBubble
                      value={service.rate}
                      onChange={(event) => handleServiceChange(service.id, "rate", event.target.value)}
                    />
                    <span className="text-white/60">×</span>
                    <NumberBubble
                      value={service.quantity}
                      onChange={(event) => handleServiceChange(service.id, "quantity", event.target.value)}
                    />
                    <span className="text-white/60">=</span>
                    <div className="rounded-2xl border border-white/15 px-4 py-2 text-sm">
                      INR {(service.rate * service.quantity).toFixed(2)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button type="button" className="text-sm text-white/70 hover:text-white" onClick={addService}>
              Add more
            </button>
          </div>

          <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-lg">
            <span>Total</span>
            <span className="font-semibold">INR {total.toFixed(2)}</span>
          </div>

          <div className="space-y-3">
            <p className="text-sm uppercase tracking-[0.35em] text-white/70">Mode of payment</p>
            <div className="space-y-3">
              {["Payment link", "Direct to account", "Crypto"].map((mode) => (
                <button
                  key={mode}
                  type="button"
                  className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-left text-white/80 hover:border-white/40"
                >
                  {mode}
                </button>
              ))}
            </div>
          </div>

          <FormField label="Notes" placeholder="description" rows={3} />

          <div className="flex justify-end">
            <button
              type="button"
              className="rounded-[32px] bg-white/10 px-6 py-2 text-sm text-white border border-white/20 hover:bg-white/20"
            >
              Create
            </button>
          </div>
        </div>
      </section>
    </PageContainer>
  );
}

interface FormFieldProps {
  label: string;
  placeholder?: string;
  type?: string;
  rows?: number;
}

function FormField({ label, placeholder, type = "text", rows }: FormFieldProps) {
  const sharedClass =
    "w-full rounded-3xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:outline-none";

  return (
    <label className="flex flex-col gap-2 text-sm text-white/70">
      {label}
      {rows ? (
        <textarea
          rows={rows}
          placeholder={placeholder}
          className={sharedClass}
        />
      ) : (
        <input
          type={type === "date" ? "date" : "text"}
          placeholder={type === "date" ? undefined : placeholder}
          className={sharedClass}
        />
      )}
    </label>
  );
}

function AddressBlock({ title }: { title: string }) {
  return (
    <div className="space-y-3">
      <p className="text-sm uppercase tracking-[0.35em] text-white/70">{title}</p>
      <div className="space-y-3">
        {["Name", "Email", "Number", "Address"].map((field) => (
          <input
            key={field}
            placeholder={field}
            className="w-full rounded-3xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:outline-none"
          />
        ))}
      </div>
    </div>
  );
}

interface NumberBubbleProps {
  value: number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function NumberBubble({ value, onChange }: NumberBubbleProps) {
  return (
    <input
      type="number"
      value={value}
      onChange={onChange}
      className="w-20 rounded-2xl border border-white/15 bg-black/40 px-4 py-2 text-center focus:outline-none"
    />
  );
}
