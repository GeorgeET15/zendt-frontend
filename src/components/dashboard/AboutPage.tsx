import BackButton from "./BackButton";
import PageContainer from "./PageContainer";

const values = [
  { title: "Borderless payouts", detail: "Move funds to 150+ countries with a single compliant workflow." },
  { title: "Realtime visibility", detail: "Track balances, FX conversions, and beneficiaries from one dashboard." },
  { title: "Human support", detail: "A dedicated success manager is paired with every Zendt business account." },
];

export default function AboutPage() {
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

      <section className="relative rounded-[40px] bg-[#111116]/95 border border-white/5 shadow-[0_35px_65px_rgba(4,4,7,0.55)] p-6 space-y-6">
        <header className="space-y-2">
          <h2 className="text-[17px] font-light">About Zendt</h2>
          <p className="text-sm text-white/70">
            We help global-first companies accept payments anywhere and settle money where it matters.
          </p>
        </header>

        <div className="space-y-4">
          {values.map((value) => (
            <div key={value.title} className="rounded-3xl border border-white/10 bg-black/40 p-4">
              <p className="text-sm uppercase tracking-[0.3em] text-white/50">{value.title}</p>
              <p className="mt-2 text-base text-white/80">{value.detail}</p>
            </div>
          ))}
        </div>
      </section>
    </PageContainer>
  );
}
