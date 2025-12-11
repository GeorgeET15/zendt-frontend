import CopyButton from "./CopyButton";

type BankAccount = {
  id: number;
  bankName: string;
  currency: string;
  accountNumber: string;
  status: string;
  isDefault: boolean;
  flag: string;
  logo: string;
};

type BankDetailsCardProps = {
  account: BankAccount;
};

export default function BankDetailsCard({ account }: BankDetailsCardProps) {
  const bankFields = [
    { label: "Bank Name", value: account.bankName },
    { label: "Currency", value: account.currency },
    { label: "Account Number", value: account.accountNumber },
    { label: "Status", value: account.status },
    { label: "Default", value: account.isDefault ? "Yes" : "No" },
  ];

  return (
    <section className="rounded-[24px] bg-[#1E1E1E] text-white p-6 space-y-4">
      <h3 className="text-[15px] font-light tracking-tight text-white/80 mb-2">
        Account Details
      </h3>
      <div className="space-y-4">
        {bankFields.map((field) => (
          <div key={field.label} className="space-y-1">
            <p className="text-[11px] uppercase tracking-wide text-white/50">
              {field.label}
            </p>
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <span className="text-[14px] text-white/90 font-mono">{field.value}</span>
              <CopyButton value={field.value} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
