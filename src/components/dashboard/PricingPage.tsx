import { useEffect, useState } from "react";
import BackButton from "./BackButton";
import GradientBlob from "../icons/GradientBlob";
import PageContainer from "./PageContainer";
import { dataService } from "../../services/dataService";

type Plan = {
  name: string;
  price: string;
  description: string;
  features: string[];
};

export default function PricingPage() {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [view, setView] = useState<'menu' | 'plans'>('menu');

  useEffect(() => {
    const fetchData = async () => {
      const data = await dataService.getPricingPlans(); // ← all plans now come from here
      setPlans(data);
    };
    fetchData();
  }, []);

  return (
    <PageContainer className="max-w-4xl text-white space-y-6 pb-24">
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
          <BackButton onClick={() => {
            if (view === 'plans') {
              setView('menu');
            } else {
              window.history.back();
            }
          }} />
        </div>
      </div>

      <section className="relative rounded-t-[40px] bg-[#141414] pb-24 p-6 space-y-6 mb-24">
        {view === 'menu' ? (
          <div className="space-y-8">
            <h2 className="text-xl font-light text-white/90 px-2">Fees for receiving money</h2>
            <div className="space-y-4">
              {/* Option 1 */}
              <div className="group relative z-0 flex items-center justify-between p-8 rounded-[32px] bg-gradient-to-r from-[#1A1A1A] to-[#141414] border border-white/5 hover:border-white/10 transition-all cursor-pointer overflow-hidden min-h-[140px]">
                <GradientBlob
                  className="absolute opacity-40 blur-2xl -z-10 group-hover:opacity-60 transition-opacity duration-500"
                  style={{
                    right: "-80px",
                    top: "80%",
                    transform: "translateY(-50%)",
                    width: "300px",
                    height: "200px",
                  }}
                />
                <span className="text-lg font-light text-white z-10 max-w-[70%]">When a payment request is paid</span>
                <div className="w-12 h-24 rounded-full bg-[#1F1F1F] flex items-center justify-center group-hover:bg-[#2A2A2A] transition-colors z-10 mr-[-12px]">
                  <svg xmlns="http://www.w3.org/2000/svg" width="10" height="21" fill="none">
                    <path
                      d="M0.5 0.5L7.67158 7.67158C9.23367 9.23367 9.23367 11.7663 7.67157 13.3284L0.5 20.5"
                      stroke="#5B5B5B"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
              </div>

              {/* Option 2 */}
              <div className="group relative z-0 flex items-center justify-between p-8 rounded-[32px] bg-gradient-to-r from-[#1A1A1A] to-[#141414] border border-white/5 hover:border-white/10 transition-all cursor-pointer overflow-hidden min-h-[140px]">
                <GradientBlob
                  className="absolute opacity-40 blur-2xl -z-10 group-hover:opacity-60 transition-opacity duration-500"
                  style={{
                    right: "-80px",
                    top: "80%",
                    transform: "translateY(-50%)",
                    width: "300px",
                    height: "200px",
                  }}
                />
                <span className="text-lg font-light text-white z-10 max-w-[70%]">Fees for transfers to your bank account</span>
                <div className="w-12 h-24 rounded-full bg-[#1F1F1F] flex items-center justify-center group-hover:bg-[#2A2A2A] transition-colors z-10 mr-[-12px]">
                  <svg xmlns="http://www.w3.org/2000/svg" width="10" height="21" fill="none">
                    <path
                      d="M0.5 0.5L7.67158 7.67158C9.23367 9.23367 9.23367 11.7663 7.67157 13.3284L0.5 20.5"
                      stroke="#5B5B5B"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
              </div>

              {/* Option 3 - Links to Plans */}
              <div 
                className="group relative z-0 flex items-center justify-between p-8 rounded-[32px] bg-gradient-to-r from-[#1A1A1A] to-[#141414] border border-white/5 hover:border-white/10 transition-all cursor-pointer overflow-hidden min-h-[140px]"
                onClick={() => setView('plans')}
              >
                <GradientBlob
                  className="absolute opacity-40 blur-2xl -z-10 group-hover:opacity-60 transition-opacity duration-500"
                  style={{
                    right: "-80px",
                    top: "80%",
                    transform: "translateY(-50%)",
                    width: "300px",
                    height: "200px",
                  }}
                />
                <span className="text-lg font-light text-white z-10 max-w-[70%]">Other fees</span>
                <div className="w-12 h-24 rounded-full bg-[#1F1F1F] flex items-center justify-center group-hover:bg-[#2A2A2A] transition-colors z-10 mr-[-12px]">
                  <svg xmlns="http://www.w3.org/2000/svg" width="10" height="21" fill="none">
                    <path
                      d="M0.5 0.5L7.67158 7.67158C9.23367 9.23367 9.23367 11.7663 7.67157 13.3284L0.5 20.5"
                      stroke="#5B5B5B"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <>
            <header className="text-center space-y-2">
              <h2 className="text-[17px] font-light">Pricing</h2>
              <p className="text-white/70">
                Choose a plan that matches your payout volume.
              </p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
              {plans.map((plan) => (
                <div
                  key={plan.name}
                  className="rounded-3xl border border-white/10 bg-white/5 p-6 space-y-4"
                >
                  <div>
                    <p className="text-sm uppercase tracking-[0.3em] text-white/60">
                      {plan.name}
                    </p>
                    <p className="text-4xl font-semibold">{plan.price}</p>
                    <p className="text-sm text-white/70">{plan.description}</p>
                  </div>

                  <ul className="space-y-2 text-sm text-white/90">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2">
                        <span className="text-emerald-300">•</span>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <button
                    type="button"
                    className="w-full rounded-2xl border border-white/20 px-4 py-2 text-sm hover:border-white/50"
                  >
                    Choose {plan.name}
                  </button>
                </div>
              ))}
            </div>
          </>
        )}
      </section>
    </PageContainer>
  );
}
