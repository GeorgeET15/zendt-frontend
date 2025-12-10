import { useEffect, useState } from "react";
import CopyButton from "./CopyButton";
import { dataService } from "../../services/dataService";

type BankField = {
  label: string;
  value: string;
};

export default function BankDetailsCard() {
  const [bankFields, setBankFields] = useState<BankField[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const accounts = await dataService.getBankAccounts();
      if (accounts.length > 0) {
        const account = accounts[0];
        setBankFields([
          { label: "Bank Name", value: account.bankName },
          { label: "Currency", value: account.currency },
          { label: "Account Number", value: account.accountNumber },
          { label: "Status", value: account.status },
        ]);
      }
    };
    fetchData();
  }, []);

  if (bankFields.length === 0) {
    return <section className="rounded-[32px] bg-[#161616] text-white p-6 md:p-8 shadow-[0_30px_55px_rgba(4,4,7,0.55)] border border-white/5">Loading...</section>;
  }

  return (
    <section className={`rounded-[32px] bg-[#161616] text-white p-6 md:p-8 shadow-[0_30px_55px_rgba(4,4,7,0.55)] border border-white/5`}>
      <div className="space-y-5">
        {bankFields.map((field) => (
          <div key={field.label} className="space-y-2">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 text-sm">
              <div className="text-white/70">{field.label}</div>
              <div className="flex items-center gap-3 text-base text-white/90">
                <span className="break-all">{field.value}</span>
                <CopyButton value={field.value} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
