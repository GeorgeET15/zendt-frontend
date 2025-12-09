import BackButton from "./BackButton";
import GradientBlob from "../icons/GradientBlob";
import BankDetailsCard from "./BankDetailsCard";
import PageContainer from "./PageContainer";

export default function BankAccountsPage() {
  return (
    <PageContainer className="text-white space-y-6">
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
      <div className="pt-6 relative rounded-t-3xl px-4 pb-25 bg-[#141414] z-1">
        <header className="space-y-1 mb-6">
          <h1 className="text-[18px] font-light tracking-[0.01em]">
            Bank Accounts
          </h1>
          <p className="text-sm text-white/60">
            View and manage your connected bank accounts
          </p>
        </header>

        <BankDetailsCard />
      </div>
    </PageContainer>
  );
}
