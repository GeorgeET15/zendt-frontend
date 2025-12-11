import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BackButton from "./BackButton";
import GradientBlob from "../icons/GradientBlob";
import PageContainer from "./PageContainer";
import BankAccountCard from "./BankAccountCard";
import BankAccountSkeleton from "./BankAccountSkeleton";
import { dataService } from "../../services/dataService";

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

export default function BankAccountsPage() {
  const [accounts, setAccounts] = useState<BankAccount[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const data = await dataService.getBankAccounts();
      setAccounts(data);
      setLoading(false);
    };
    fetchData();
  }, []);

  const handleStatusToggle = (id: number) => {
    setAccounts((prevAccounts) =>
      prevAccounts.map((account) =>
        account.id === id
          ? { ...account, status: account.status === "ACTIVE" ? "IN ACTIVE" : "ACTIVE" }
          : account
      )
    );
  };

  const handleDefaultToggle = (id: number) => {
    setAccounts((prevAccounts) =>
      prevAccounts.map((account) => ({
        ...account,
        isDefault: account.id === id,
      }))
    );
  };

  return (
    <PageContainer className="text-white space-y-6">
      {/* Top Section */}
      <div className="flex items-center justify-between px-4 pt-12 relative">
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

        {/* Back Button */}
        <div className="flex w-full z-10">
          <BackButton />
        </div>
      </div>

      {/* Main Content Block */}
      <div className="pt-6 relative rounded-t-[48px] px-4 pb-24 bg-[#141414] z-10 min-h-[calc(100vh-100px)]">
        <header className="space-y-1 mb-8 pl-2">
          <h1 className="text-[13px] font-medium tracking-[0.12em] text-white/60 uppercase">
            Bank Details
          </h1>
        </header>

        {/* Bank Cards List or Skeleton */}
        {loading ? (
          <BankAccountSkeleton />
        ) : (
          <div className="space-y-8">
          {accounts.map((account) => (
            <div key={account.id} className="space-y-3">
              <button
                onClick={() => navigate(`/dashboard/bank-account/${account.id}`)}
                className="w-full text-left transition-transform active:scale-95"
              >
                <BankAccountCard
                  bankName={account.bankName}
                  currency={account.currency}
                  accountNumber={account.accountNumber}
                  flag={account.flag}
                  logo={account.logo}
                />
              </button>

              {/* Action Buttons */}
              <div className="flex gap-3 px-1">
                <button 
                  onClick={() => handleStatusToggle(account.id)}
                  className={`flex-1 py-3 rounded-[14px] text-[10px] font-medium tracking-wider uppercase transition-colors ${
                    account.status === 'ACTIVE' 
                      ? 'bg-[#1E1E1E] text-white/80' 
                      : 'bg-[#4A4A4A] text-white/40'
                  }`}
                >
                  {account.status}
                </button>
                <button 
                  onClick={() => handleDefaultToggle(account.id)}
                  className={`flex-1 py-3 rounded-[14px] text-[10px] font-medium tracking-wider uppercase transition-colors ${
                    account.isDefault 
                      ? 'bg-[#1E1E1E] text-white/80' 
                      : 'bg-[#4A4A4A] text-white/40'
                  }`}
                >
                  Default
                </button>
              </div>
            </div>
          ))}
          </div>
        )}
      </div>
    </PageContainer>
  );
}
