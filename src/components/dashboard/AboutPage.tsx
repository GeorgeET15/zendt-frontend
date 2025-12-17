import BackButton from "./BackButton";
import GradientBlob from "../icons/GradientBlob";
import PageContainer from "./PageContainer";

const features = [
  {
    title: "Global Receivables",
    detail: "Accept payments from foreign clients with local account details.",
  },
  {
    title: "Multi-Currency Wallets",
    detail: "Hold, convert, and manage money in multiple currencies.",
  },
  {
    title: "FX Optimization",
    detail: "Get competitive conversion rates with transparent fees.",
  },
  {
    title: "Smart Invoicing",
    detail: "Generate invoices with integrated payment links.",
  },
  {
    title: "Settlement Acceleration",
    detail: "Faster access to your earnings with same-day options.",
  },
  {
    title: "Compliance Ready",
    detail: "Bank-grade security and verified business onboarding.",
  },
];

export default function AboutPage() {
  return (
    <PageContainer className="max-w-2xl text-white space-y-6 pb-28">
      {/* Top Section */}
      <div className="flex items-center justify-between px-4 pt-12 z-0 relative">
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

      {/* Main Content Area */}
      <section className="relative rounded-t-[40px] bg-[#141414] pb-20 p-6 space-y-8 min-h-[80vh]">
        {/* Header */}
        <header className="space-y-3 pt-2">
          <h1 className="text-[28px] font-normal text-white">About Zendt</h1>
          <p className="text-[15px] text-white/60 leading-relaxed font-light">
            We help global-first companies accept payments anywhere and settle money where it matters.
          </p>
        </header>

        {/* Feature Cards */}
        <div className="space-y-4">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="rounded-[24px] bg-[#1C1C1E] p-6 space-y-3"
            >
              <h3 className="text-[17px] uppercase tracking-[0.15em] text-white/50 font-light">
                {feature.title}
              </h3>
              <p className="text-[15px] text-white/90 leading-relaxed font-light">
                {feature.detail}
              </p>
            </div>
          ))}
        </div>
      </section>
    </PageContainer>
  );
}
