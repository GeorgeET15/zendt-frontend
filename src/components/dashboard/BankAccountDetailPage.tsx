import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BackButton from "./BackButton";
import GradientBlob from "../icons/GradientBlob";
import PageContainer from "./PageContainer";
import BankAccountCard from "./BankAccountCard";
import BankDetailsCard from "./BankDetailsCard";
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

export default function BankAccountDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [account, setAccount] = useState<BankAccount | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const data = await dataService.getBankAccounts();
      const foundAccount = data.find((acc) => acc.id === Number(id));
      setAccount(foundAccount || null);
      setLoading(false);
    };
    fetchData();
  }, [id]);

  const handleStatusToggle = () => {
    if (!account) return;
    setAccount({
      ...account,
      status: account.status === "ACTIVE" ? "IN ACTIVE" : "ACTIVE",
    });
  };

  const handleDefaultToggle = () => {
    if (!account) return;
    setAccount({
      ...account,
      isDefault: !account.isDefault,
    });
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
        <header className="space-y-1 mb-6 pl-2">
          <h1 className="text-[13px] font-medium tracking-[0.12em] text-white/60 uppercase">
            Bank Account Details
          </h1>
        </header>

        {/* Bank Card at Top or Skeleton */}
        {loading || !account ? (
          <BankAccountSkeleton />
        ) : (
          <div className="mb-6 space-y-4">
          <div className="transform scale-105">
            <BankAccountCard
              bankName={account.bankName}
              currency={account.currency}
              accountNumber={account.accountNumber}
              flag={account.flag}
              logo={account.logo}
            />
          </div>

          {/* Action Buttons Below Card */}
          <div className="flex gap-3 px-1">
            <button
              onClick={handleStatusToggle}
              className={`flex-1 py-3 rounded-[14px] text-[10px] font-medium tracking-wider uppercase transition-colors ${
                account.status === "ACTIVE"
                  ? "bg-[#1E1E1E] text-white/80"
                  : "bg-[#4A4A4A] text-white/40"
              }`}
            >
              {account.status}
            </button>
            <button
              onClick={handleDefaultToggle}
              className={`flex-1 py-3 rounded-[14px] text-[10px] font-medium tracking-wider uppercase transition-colors ${
                account.isDefault
                  ? "bg-[#1E1E1E] text-white/80"
                  : "bg-[#4A4A4A] text-white/40"
              }`}
            >
              Default
            </button>
          </div>

          {/* Bank Details Below Buttons */}
          <BankDetailsCard account={account} />
        </div>
        )}
      </div>
    </PageContainer>
  );
}
