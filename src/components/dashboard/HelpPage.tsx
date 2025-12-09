import { useEffect, useState } from "react";
import BackButton from "./BackButton";
import GradientBlob from "../icons/GradientBlob";
import ExpandToggleButton from "./ExpandToggleButton";
import PageContainer from "./PageContainer";
import { dataService } from "../../services/dataService";

type Faq = {
  question: string;
  answer: string;
};

export default function HelpPage() {
  const [faqs, setFaqs] = useState<Faq[]>([]);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await dataService.getFaqs();
      setFaqs(data);
    };
    fetchData();
  }, []);

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

      <section className="relative rounded-t-[40px] bg-[#141414] shadow-[0_35px_65px_rgba(4,4,7,0.55)] p-6 space-y-6 pb-25">
        <header className="space-y-2">
          <h2 className="text-[17px] font-light">Help & Support</h2>
          <p className="text-sm text-white/70">
            Find answers to common questions or contact our support team.
          </p>
        </header>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={index} className="rounded-3xl border border-white/10 bg-[#1E1E1E] p-4">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-base font-medium text-white/90">{faq.question}</h3>

                  <ExpandToggleButton
                    isOpen={isOpen}
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="shrink-0"
                  />
                </div>

                {isOpen && (
                  <p className="mt-3 text-sm text-white/70 leading-relaxed border-t border-white/10 pt-3">
                    {faq.answer}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </PageContainer>
  );
}
