import BackButton from "./BackButton";
import GradientBlob from "../icons/GradientBlob";
import PageContainer from "./PageContainer";
import { Check } from "lucide-react";

const plans = [
  {
    name: "STARTER",
    price: "₹0",
    period: "/mo",
    description: "For freelancers & individuals",
    features: [
      "Receive global payments",
      "Multi-currency wallet",
      "Basic invoicing",
      "Standard settlements",
      "Email support",
    ],
    highlight: false,
  },
  {
    name: "GROWTH",
    price: "₹999",
    period: "/mo",
    description: "For small teams & agencies",
    features: [
      "Everything in Starter",
      "Smart invoicing",
      "Branded payment links",
      "Fast settlements",
      "Automated FX conversions",
      "Priority support",
    ],
    highlight: true,
  },
  {
    name: "SCALE",
    price: "₹2,999",
    period: "/mo",
    description: "For growing companies",
    features: [
      "Everything in Growth",
      "Automation workflows",
      "Expense controls",
      "Advanced analytics",
    ],
    highlight: false,
  },
];

export default function PricingPage() {
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
         <div className="flex justify-between w-full z-1"><BackButton /></div>
      </div>

      <section className="relative rounded-t-[40px] bg-[#141414] shadow-[0_35px_65px_rgba(4,4,7,0.55)] p-6 pb-24 space-y-8">
        <header className="space-y-2">
          <h2 className="text-[17px] font-light">Pricing Plans</h2>
          <p className="text-sm text-white/70">
            Choose the plan that fits your business needs.
          </p>
        </header>

        <div className="space-y-4">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-[24px] border p-6 ${
                plan.highlight
                  ? "bg-gradient-to-br from-[#2A2A2A] to-[#1E1E1E] border-white/20"
                  : "bg-[#1E1E1E] border-white/5"
              }`}
            >
              {plan.highlight && (
                <div className="absolute -top-3 right-6 rounded-full bg-white px-3 py-1 text-[10px] font-bold text-black uppercase tracking-wider">
                  Popular
                </div>
              )}

              <div className="space-y-1">
                <h3 className="text-xs font-medium tracking-widest text-white/60">
                  {plan.name}
                </h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-light text-white">
                    {plan.price}
                  </span>
                  <span className="text-sm text-white/40">{plan.period}</span>
                </div>
                <p className="text-xs text-white/50">{plan.description}</p>
              </div>

              <div className="my-6 h-px bg-white/5" />

              <ul className="space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check className="h-4 w-4 shrink-0 text-white/80" />
                    <span className="text-sm text-white/70">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                className={`mt-6 w-full rounded-xl py-3 text-xs font-medium transition-colors ${
                  plan.highlight
                    ? "bg-white text-black hover:bg-white/90"
                    : "bg-white/10 text-white hover:bg-white/20"
                }`}
              >
                Choose {plan.name}
              </button>
            </div>
          ))}
        </div>
      </section>
    </PageContainer>
  );
}
