import { useEffect, useState } from "react";
import BackButton from "./BackButton";
import FormSelect from "./FormSelect";
import PageContainer from "./PageContainer";
import ToggleCheckbox from "./ToggleCheckbox";
import { dataService } from "../../services/dataService";
import Toast from "../Toast"; 

export default function AddClientPage() {
  const [type, setType] = useState<"individual" | "company">("individual");
  const [form, setForm] = useState({
    payerName: "",
    email: "",
    country: "",
    purposeCode: "",
    address: "",
    companyName: "",
    companyWebsite: "",
  });
  const [allowPartial, setAllowPartial] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [showToast, setShowToast] = useState(false); 
  const [countryOptions, setCountryOptions] = useState<string[]>([]);
  const [purposeCodes, setPurposeCodes] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await dataService.getClientOptions();
      setCountryOptions(data.countries);
      setPurposeCodes(data.purposeCodes);
    };
    fetchData();
  }, []);

  const handleChange =
    (key: keyof typeof form) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm({ ...form, [key]: event.target.value });
    };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);

    // ✅ Show toast
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  return (
    <PageContainer className="text-white space-y-6">
    
      <Toast
        message="Client added"
        subMessage="Client saved successfully."
        visible={showToast}
        icon={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            fill="none"
            stroke="grey"
            strokeWidth="2"
          >
            <circle cx="9" cy="9" r="8" />
            <path d="m7 9 2 2 4-4" />
          </svg>
        }
      />

      <div className="flex items-center justify-between px-4 pt-12 z-0">
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

      <div className="bg-black p-6 shadow-[0_25px_45px_rgba(4,4,7,0.55)] space-y-6 rounded-t-[32px] relative z-2">
        <header className="space-y-1">
          <h1 className="text-[18px] font-semibold">Add Client</h1>
          <p className="text-[10px] text-white/60">
            Add a client for easier access of payee in invoice / payment links creation.
          </p>
        </header>

        <form
          onSubmit={handleSubmit}
          className="space-y-6 shadow-[0_25px_45px_rgba(4,4,7,0.55)]"
        >
          <div className="flex justify-center items-center">
            <div className="flex border border-white/15 rounded-[11px] bg-[#1E1E1E] overflow-hidden w-full max-w-sm">
              {(["individual", "company"] as const).map((option) => (
                <button
                  type="button"
                  key={option}
                  onClick={() => setType(option)}
                  className={[
                    "flex-1 py-2 text-sm transition",
                    type === option ? "bg-white/10 text-white" : "text-white/60",
                  ].join(" ")}
                >
                  {option === "individual" ? "Individual" : "Company"}
                </button>
              ))}
            </div>
          </div>

          <Field label="Payer name">
            <input
              value={form.payerName}
              onChange={handleChange("payerName")}
              placeholder="Enter payer name"
              className="w-full rounded-[11px] bg-[#1E1E1E] px-4 py-3 text-white placeholder:text-white/40 focus:outline-none"
            />
          </Field>

          <Field label="E-mail">
            <input
              type="email"
              value={form.email}
              onChange={handleChange("email")}
              placeholder="Enter email"
              className="w-full rounded-[11px] bg-[#1E1E1E] px-4 py-3 text-white placeholder:text-white/40 focus:outline-none"
            />
          </Field>

          <Field label="Country">
            <FormSelect
              value={form.country}
              onChange={(event) => setForm({ ...form, country: event.target.value })}
              className="w-full rounded-[11px]  bg-[#1E1E1E]! border-none"
            >
              <option value="" hidden>
                Select country
              </option>
              {countryOptions.map((c) => (
                <option key={c} value={c} className="text-black">
                  {c}
                </option>
              ))}
            </FormSelect>
          </Field>

          <Field label="Purpose code">
            <FormSelect
              value={form.purposeCode}
              onChange={(event) =>
                setForm({ ...form, purposeCode: event.target.value })
              }
              className="w-full rounded-[11px] bg-[#1E1E1E]! border-none"
            >
              <option value="" hidden>
                Select
              </option>
              {purposeCodes.map((code) => (
                <option key={code} value={code} className="text-black">
                  {code}
                </option>
              ))}
            </FormSelect>
          </Field>

          <Field label="Purpose address">
            <textarea
              value={form.address}
              onChange={handleChange("address")}
              rows={3}
              placeholder="Enter payer address"
              className="w-full rounded-[11px] bg-[#1E1E1E] px-4 py-3 text-white placeholder:text-white/40 focus:outline-none"
            />
          </Field>

          {type === "company" && (
            <>
              <Field label="Company name">
                <input
                  value={form.companyName}
                  onChange={handleChange("companyName")}
                  placeholder="Enter company name"
                  className="w-full rounded-[11px] bg-[#1E1E1E] px-4 py-3 text-white placeholder:text-white/40 focus:outline-none"
                />
              </Field>

              <Field label="Company website">
                <input
                  value={form.companyWebsite}
                  onChange={handleChange("companyWebsite")}
                  placeholder="Enter company website"
                  className="w-full rounded-[11px] bg-[#1E1E1E] px-4 py-3 text-white placeholder:text-white/40 focus:outline-none"
                />
              </Field>
            </>
          )}

          <label className="flex items-center gap-3 text-sm text-white/80">
            <ToggleCheckbox checked={allowPartial} onChange={setAllowPartial} size="sm" />
            <span>Allow alternate reminders</span>
          </label>

          {submitted && (
            <p className="text-sm text-emerald-300">Client saved successfully.</p>
          )}

          <div className="flex justify-end pb-20">
            <button
              type="submit"
              className="rounded-[11px] bg-[#1E1E1E] py-2 text-sm text-white hover:bg-white/20 w-40"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </PageContainer>
  );
}

function Field({
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

declare module "react" {
  interface HTMLAttributes<T> {
    className?: string;
  }
}
