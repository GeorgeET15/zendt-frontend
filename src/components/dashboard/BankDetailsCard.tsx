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
    <section className="rounded-[24px] bg-[#1E1E1E] text-white p-5 shadow-lg border border-white/5">
      <h3 className="text-xs font-medium tracking-wider text-white/50 uppercase mb-4">
        Account Details
      </h3>
      <div className="space-y-4">
        {bankFields.map((field) => (
          <div key={field.label} className="space-y-1">
            <div className="flex items-center justify-between gap-3 text-sm">
              <div className="text-white/60 text-xs">{field.label}</div>
              <div className="flex items-center gap-2 text-sm text-white">
                <span className="break-all font-mono">{field.value}</span>
                <CopyButton value={field.value} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
