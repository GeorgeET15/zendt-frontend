import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BackButton from "./BackButton";
import GradientBlob from "../icons/GradientBlob";
import PageContainer from "./PageContainer";
import Toast from "../Toast";
import CustomDropdown from "../CustomDropdown";
import { dataService } from "../../services/dataService";

interface ServiceItem {
  id: number;
  description: string;
  rate: number;
  quantity: number;
}

export default function InvoicePage() {
  const navigate = useNavigate();
  const [services, setServices] = useState<ServiceItem[]>([
    { id: 1, description: "Service", rate: 200, quantity: 3 },
  ]);

  const [showToast, setShowToast] = useState(false);
  
  // Bill From state
  const [billFromOptions, setBillFromOptions] = useState<any>(null);
  const [selectedBillFrom, setSelectedBillFrom] = useState<string>("personal");
  const [billFromData, setBillFromData] = useState({ name: "", email: "", phone: "", address: "" });
  
  // Bill To state
  const [clients, setClients] = useState<any[]>([]);
  const [selectedClient, setSelectedClient] = useState<string>("");
  const [billToData, setBillToData] = useState({ name: "", email: "", phone: "", address: "" });

  useEffect(() => {
    const fetchData = async () => {
      const billFromData = await dataService.getInvoiceBillFrom();
      const clientsData = await dataService.getInvoiceClients();
      setBillFromOptions(billFromData);
      setClients(clientsData);
      // Set default bill from (personal)
      if (billFromData?.personal) {
        setBillFromData(billFromData.personal);
      }
    };
    fetchData();
  }, []);

  const handleBillFromChange = (value: string) => {
    setSelectedBillFrom(value);
    if (billFromOptions) {
      setBillFromData(billFromOptions[value] || { name: "", email: "", phone: "", address: "" });
    }
  };

  const handleClientChange = (value: string) => {
    setSelectedClient(value);
    const client = clients.find(c => c.id.toString() === value);
    if (client) {
      setBillToData({ name: client.name, email: client.email, phone: client.phone, address: client.address });
    } else {
      setBillToData({ name: "", email: "", phone: "", address: "" });
    }
  };

  const handleServiceChange = (
    id: number,
    key: keyof ServiceItem,
    value: string
  ) => {
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
          : item
      )
    );
  };

  const addService = () => {
    setServices((items) => [
      ...items,
      {
        id: items.length + 1,
        description: "New service",
        rate: 0,
        quantity: 1,
      },
    ]);
  };

  const total = services.reduce(
    (sum, item) => sum + item.rate * item.quantity,
    0
  );

  const handleCopyTotal = () => {
    navigator.clipboard.writeText(`INR ${total.toFixed(2)}`);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  return (
    <PageContainer className="text-white">

      {/* 🔥 TOAST */}
      <Toast
        message="Copied"
        subMessage="Total amount has been copied."
        visible={showToast}
        icon={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            fill="none"
            stroke="lime"
            strokeWidth="2"
          >
            <circle cx="9" cy="9" r="8" />
            <path d="m7 9 2 2 4-4" />
          </svg>
        }
      />

      <div className="flex items-center justify-between px-4 pt-6 relative z-20 select-none">
        <GradientBlob
          className="absolute opacity-60 blur-2xl -z-10"
          style={{
            right: "82px",
            top: "-50px",
            width: "321px",
            height: "262px",
            zIndex: "-1",
            pointerEvents: "none",
          }}
        />
        <BackButton onClick={() => navigate("/dashboard/home")} />
      </div>

      <div className="relative rounded-t-[32px] bg-[#141414] z-1 space-y-6 pb-20">
        <section className="bg-[#141414] p-6 shadow-[0_25px_45px_rgba(4,4,7,0.55)] rounded-t-[32px] space-y-6">

          <header className="space-y-1">
            <h1 className="text-[18px] font-semibold">Create invoice</h1>
          </header>

          <div className="space-y-6">

            <FormField label="Invoice Number" placeholder="12345" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField label="Creation date" placeholder="Select date" type="date" />
              <FormField label="Due date" placeholder="Select date" type="date" />
            </div>

            <AddressBlock 
              title="Bills from"
              selectedOption={selectedBillFrom}
              onOptionChange={handleBillFromChange}
              options={[
                { value: "personal", label: "Personal" },
                { value: "brand", label: "Brand" }
              ]}
              data={billFromData}
              onDataChange={setBillFromData}
            />
            <AddressBlock 
              title="Bills to"
              selectedOption={selectedClient}
              onOptionChange={handleClientChange}
              options={[
                { value: "", label: "Select Client" },
                ...clients.map(c => ({ value: c.id.toString(), label: c.name }))
              ]}
              data={billToData}
              onDataChange={setBillToData}
            />

            {/* SERVICES */}
            <div className="space-y-4">
              <p className="text-sm uppercase tracking-tight text-white/70">Services</p>

              <div className="space-y-3">
                {services.map((service) => (
                  <div key={service.id}>
                    <input
                      className="w-full rounded-[10px] bg-[#1E1E1E] px-4 py-2 text-sm focus:outline-none mb-4"
                      value={service.description}
                      onChange={(event) =>
                        handleServiceChange(service.id, "description", event.target.value)
                      }
                    />

                    <div className="flex flex-wrap items-center gap-3 text-sm">

                      <NumberBubble
                        value={service.rate}
                        onChange={(event) =>
                          handleServiceChange(service.id, "rate", event.target.value)
                        }
                      />

                      <span className="text-white/60">×</span>

                      <NumberBubble
                        value={service.quantity}
                        onChange={(event) =>
                          handleServiceChange(service.id, "quantity", event.target.value)
                        }
                      />

                      <span className="text-white/60">=</span>

                      <div className="rounded-[10px] bg-[#1E1E1E] px-4 py-2 text-[10px] w-20">
                        INR {(service.rate * service.quantity).toFixed(2)}
                      </div>
                    </div>

                    <button
                      type="button"
                      className="text-[10px] text-white/70 hover:text-white"
                      onClick={addService}
                    >
                      Add more
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* TOTAL WITH COPY */}
            <div className="flex items-center justify-between rounded-[10px] text-[13px] bg-[#1E1E1E] px-4 py-3 text-lg">
              <span>Total</span>

              <div className="flex items-center gap-3">
                <span className="font-semibold">INR {total.toFixed(2)}</span>

                {/* 🔥 COPY BUTTON */}
                <button
                  type="button"
                  onClick={handleCopyTotal}
                  className="text-xs text-white/60 hover:text-white"
                >
                  Copy
                </button>
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-sm uppercase tracking-tight text-white/70">
                Mode of payment
              </p>

              <div className="space-y-3 text-[13px]">
                {["Payment link", "Direct to account"].map((mode) => (
                  <button
                    key={mode}
                    type="button"
                    className="w-full rounded-[10px] bg-[#1E1E1E] px-4 py-3 text-left text-white/80 hover:border-white/40"
                  >
                    {mode}
                  </button>
                ))}
              </div>
            </div>

            <FormField label="Notes" placeholder="description" rows={3} />

            <div className="flex justify-end pb-12">
              <button
                type="button"
                onClick={() => navigate("/dashboard/invoice/success")}
                className="rounded-[10px] bg-white/10 px-6 py-2 text-[10px] text-white w-42 hover:bg-white/20"
              >
                Create
              </button>
            </div>
          </div>

        </section>
      </div>
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
    "w-full rounded-[10px] bg-[#1E1E1E] px-4 py-3 text-[10px] text-white placeholder:text-white/40 focus:outline-none";

  return (
    <label className="flex flex-col gap-2 text-[10px] text-white/70">
      {label}
      {rows ? (
        <textarea rows={rows} placeholder={placeholder} className={sharedClass} />
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

interface AddressBlockProps {
  title: string;
  selectedOption: string;
  onOptionChange: (value: string) => void;
  options: { value: string; label: string }[];
  data: { name: string; email: string; phone: string; address: string };
  onDataChange: (data: { name: string; email: string; phone: string; address: string }) => void;
}

function AddressBlock({ title, selectedOption, onOptionChange, options, data, onDataChange }: AddressBlockProps) {
  return (
    <div className="space-y-3">
      <p className="text-sm uppercase tracking-tight text-white/70">{title}</p>
      
      {/* Custom Dropdown */}
      <CustomDropdown
        value={selectedOption}
        onChange={onOptionChange}
        options={options}
        placeholder="Select an option"
      />

      {/* Auto-filled fields */}
      <div className="space-y-3">
        <input
          placeholder="Name"
          value={data.name}
          onChange={(e) => onDataChange({ ...data, name: e.target.value })}
          className="w-full rounded-[10px] bg-[#1E1E1E] px-4 py-3 text-[10px] text-white placeholder:text-white/40 focus:outline-none"
        />
        <input
          placeholder="Email"
          value={data.email}
          onChange={(e) => onDataChange({ ...data, email: e.target.value })}
          className="w-full rounded-[10px] bg-[#1E1E1E] px-4 py-3 text-[10px] text-white placeholder:text-white/40 focus:outline-none"
        />
        <input
          placeholder="Number"
          value={data.phone}
          onChange={(e) => onDataChange({ ...data, phone: e.target.value })}
          className="w-full rounded-[10px] bg-[#1E1E1E] px-4 py-3 text-[10px] text-white placeholder:text-white/40 focus:outline-none"
        />
        <input
          placeholder="Address"
          value={data.address}
          onChange={(e) => onDataChange({ ...data, address: e.target.value })}
          className="w-full rounded-[10px] bg-[#1E1E1E] px-4 py-3 text-[10px] text-white placeholder:text-white/40 focus:outline-none"
        />
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
      className="w-20 text-[10px] rounded-[10px] bg-[#1E1E1E] px-4 py-2 text-center focus:outline-none"
    />
  );
}
