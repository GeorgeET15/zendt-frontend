import BackButton from "./BackButton";
import PageContainer from "./PageContainer";

const faqs = [
  {
    question: "How do I generate payment links?",
    answer: "Head to Collect → Payment links. You can share branded URLs or embed buttons on your site.",
  },
  {
    question: "When do payouts arrive?",
    answer: "Domestic payouts usually settle same day. International transfers land within 2 to 3 business days.",
  },
  {
    question: "Where can I talk to support?",
    answer: "Ping us anytime in the dashboard chat or write to success@zendt.com.",
  },
];

export default function HelpPage() {
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

      <section className="relative rounded-3xl px-4 bg-black z-1 h-full border border-white/5 shadow-[0_35px_65px_rgba(4,4,7,0.55)] p-6 space-y-6">
        <header>
          <h2 className="text-[17px] font-light">Help &amp; support</h2>
          <p className="text-sm text-white/70">Quick answers for the most common Zendt questions.</p>
        </header>

        <div className="space-y-4">
          {faqs.map((faq) => (
            <details key={faq.question} className="group rounded-3xl border border-white/10 bg-white/5 p-4">
              <summary className="cursor-pointer list-none text-base font-medium">
                {faq.question}
                <span className="float-right text-white/60 transition group-open:rotate-90">
                  <svg xmlns="http://www.w3.org/2000/svg" width="9" height="21" viewBox="0 0 9 21" fill="none">
                    <path d="M0.5 20.5L6.96447 14.0355C8.91709 12.0829 8.91709 8.91709 6.96447 6.96447L0.499999 0.5" stroke="white" strokeLinecap="round"></path>
                  </svg>
                </span>
              </summary>
              <p className="mt-3 text-sm text-white/70">{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>
    </PageContainer>
  );
}
