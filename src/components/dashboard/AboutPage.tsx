import BackButton from "./BackButton";
import GradientBlob from "../icons/GradientBlob";
import PageContainer from "./PageContainer";

const mainFeature = {
  title: "Receive · Manage · Spend",
  detail: "Accept global payments, organize your money across currencies, and spend securely with ease.",
};

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
    <PageContainer className="text-white space-y-6 bg-[#141414] min-h-screen">
      {/* Background Gradients - Enhanced Visibility */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <GradientBlob
          className="absolute opacity-80 blur-3xl"
          style={{
            right: "-20%",
            top: "-10%",
            width: "500px",
            height: "500px",
            zIndex: 0,
          }}
        />
        <GradientBlob
          className="absolute opacity-40 blur-3xl"
          style={{
            left: "-20%",
            bottom: "10%",
            width: "400px",
            height: "400px",
            zIndex: 0,
            transform: "rotate(180deg)",
          }}
        />
      </div>

      {/* Top Bar */}
      <div className="flex items-center justify-between px-4 pt-12 relative z-10">
        <BackButton />
        <img 
          src="/z-logo-nobg.png" 
          alt="Zendt Logo" 
          className="w-15 h-15 opacity-90"
        />
      </div>

      {/* Main Content */}
      <section className="relative z-10 px-4 pb-24 space-y-8">
        
        {/* Header */}
        <header className="space-y-3 pt-4">
          <h1 className="text-5xl font-light tracking-tight bg-gradient-to-br from-white to-white/60 bg-clip-text text-transparent">
            About Zendt
          </h1>
          <p className="text-lg text-white/70 leading-relaxed max-w-[90%] font-light">
            Empowering global-first companies to move money without borders.
          </p>
        </header>

        {/* Main Feature Card - Glassmorphism */}
        <div className="rounded-[32px] bg-white/5 backdrop-blur-xl border border-white/10 p-8 space-y-4 shadow-2xl relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          <h2 className="text-2xl font-light tracking-wide relative z-10">
            {mainFeature.title}
          </h2>
          <p className="text-base text-white/70 leading-relaxed relative z-10">
            {mainFeature.detail}
          </p>
        </div>

        {/* Grid Layout for Features */}
        <div className="grid grid-cols-2 gap-4">
          {features.map((feature) => (
            <div 
              key={feature.title} 
              className="rounded-[24px] bg-[#141414]/80 backdrop-blur-md border border-white/5 p-5 space-y-3 hover:bg-white/5 transition-colors duration-300"
            >
              <h3 className="text-base font-medium text-white/90 leading-tight">
                {feature.title}
              </h3>
              <p className="text-sm text-white/50 leading-relaxed">
                {feature.detail}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom Info */}
        <div className="text-center pt-8 space-y-2">
          <p className="text-[10px] uppercase tracking-[0.2em] text-white/30">
            Version 1.0.0
          </p>
        </div>

      </section>
    </PageContainer>
  );
}
