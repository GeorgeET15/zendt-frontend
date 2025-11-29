import BackButton from "./BackButton";
import PageContainer from "./PageContainer";

const steps = [
  { title: "Business documents", detail: "Upload certificate of incorporation and proof of address." },
  { title: "Identity verification", detail: "Capture a government issued ID for all beneficial owners." },
  { title: "Bank statement", detail: "Share a PDF copy from the last 3 months to verify ownership." },
];

export default function KycPage() {
  return (
    <PageContainer className="text-white space-y-6">
           <div className="flex items-center justify-between px-4 pt-6 z-0">
             <div                      className="absolute opacity-60 blur-2xl -z-10"
                     style={{
                       right: "82px",
                       top: "-20px",
                       width: "321px",
                       height: "262px", zIndex: "0",
                       
                       background:
                         "radial-gradient(50% 50% at 50% 50%, rgba(255,173,122,0.40) 0%, rgba(93,104,157,0.40) 58.08%, rgba(20,35,55,0.40) 200%)",
                     }}></div>
            <div className="flex justify-between w-full z-1"><BackButton /></div>
           </div>

      <section className="relative  rounded-[32px] bg-[#101014]/95 border border-white/5 shadow-[0_35px_65px_rgba(4,4,7,0.55)] p-6 space-y-6">
        <header className="space-y-2">
          <h2 className="text-[17px] font-light">Verification / KYC</h2>
          <p className="text-sm text-white/70">
            Complete the following steps so we can keep payouts flowing without interruption.
          </p>
        </header>

        <div className="space-y-4">
          {steps.map((step, index) => (
            <div key={step.title} className="rounded-3xl border border-white/10 bg-black/40 p-4">
              <div className="flex items-center justify-between text-sm text-white/70">
                <span>Step {index + 1}</span>
                <span>Pending</span>
              </div>
              <h3 className="mt-2 text-xl font-medium">{step.title}</h3>
              <p className="text-sm text-white/70">{step.detail}</p>
              <button type="button" className="mt-3 text-sm text-emerald-300 hover:text-emerald-200">
                Upload file
              </button>
            </div>
          ))}
        </div>
      </section>
    </PageContainer>
  );
}
