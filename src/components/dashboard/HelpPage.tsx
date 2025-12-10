import { useEffect, useState } from "react";
import { Mail, Phone, MessageCircle } from "lucide-react";
import BackButton from "./BackButton";
import GradientBlob from "../icons/GradientBlob";
import PageContainer from "./PageContainer";
import { dataService } from "../../services/dataService";

type Faq = {
  question: string;
  answer: string;
};

export default function HelpPage() {
  const [faqs, setFaqs] = useState<Faq[]>([]);
  const [view, setView] = useState<'menu' | 'faqs'>('menu');
  const [isContactExpanded, setIsContactExpanded] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const data = await dataService.getFaqs();
      setFaqs(data);
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
            if (view === 'faqs') {
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
            <h2 className="text-xl font-light text-white/90 px-2">Help & Support</h2>
            <div className="space-y-4">
              {/* Contact Support */}
              <div className="group relative z-0 rounded-[32px] bg-gradient-to-r from-[#1A1A1A] to-[#141414] border border-white/5 hover:border-white/10 transition-all overflow-hidden">
                <div 
                  className="flex items-center justify-between p-8 cursor-pointer min-h-[140px]"
                  onClick={() => setIsContactExpanded(!isContactExpanded)}
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
                <span className="text-lg font-light text-white z-10 max-w-[70%]">Contact Support</span>
                <div className="w-12 h-24 rounded-full bg-[#1F1F1F] flex items-center justify-center group-hover:bg-[#2A2A2A] transition-colors z-10 mr-[-12px]">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="10" 
                    height="21" 
                    fill="none"
                    className={`transition-transform duration-300 ${isContactExpanded ? 'rotate-90' : ''}`}
                  >
                    <path
                      d="M0.5 0.5L7.67158 7.67158C9.23367 9.23367 9.23367 11.7663 7.67157 13.3284L0.5 20.5"
                      stroke="#5B5B5B"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
              </div>
              {/* Contact Options - Expanded */}
              {isContactExpanded && (
                <div className="px-6 pb-4 space-y-2 animate-in slide-in-from-top-2 duration-300">
                  <div className="flex items-center gap-3">
                    {/* Email */}
                    <a href="mailto:support@zendt.com" className="flex-1 flex flex-col items-center gap-1.5 p-4 rounded-[16px] bg-white/5 hover:bg-white/10 transition-colors border border-white/5">
                      <Mail size={18} className="text-white/60" />
                      <span className="text-xs text-white/60">Email</span>
                    </a>
                    
                    {/* Call */}
                    <a href="tel:+18005550100" className="flex-1 flex flex-col items-center gap-1.5 p-4 rounded-[16px] bg-white/5 hover:bg-white/10 transition-colors border border-white/5">
                      <Phone size={18} className="text-white/60" />
                      <span className="text-xs text-white/60">Call</span>
                    </a>
                    
                    {/* Chat */}
                    <button className="flex-1 flex flex-col items-center gap-1.5 p-4 rounded-[16px] bg-white/5 hover:bg-white/10 transition-colors border border-white/5">
                      <MessageCircle size={18} className="text-white/60" />
                      <span className="text-xs text-white/60">Chat</span>
                    </button>
                  </div>
                </div>
              )}
              </div>

              {/* Documentation */}
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
                <span className="text-lg font-light text-white z-10 max-w-[70%]">Documentation</span>
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

              {/* FAQs */}
              <div 
                className="group relative z-0 flex items-center justify-between p-8 rounded-[32px] bg-gradient-to-r from-[#1A1A1A] to-[#141414] border border-white/5 hover:border-white/10 transition-all cursor-pointer overflow-hidden min-h-[140px]"
                onClick={() => setView('faqs')}
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
                <span className="text-lg font-light text-white z-10 max-w-[70%]">Frequently Asked Questions</span>
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
          <div className="space-y-6">
            <h2 className="text-xl font-light text-white/90">FAQs</h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="rounded-3xl border border-white/10 bg-[#1E1E1E] p-6">
                  <h3 className="text-base font-medium text-white/90 mb-3">{faq.question}</h3>
                  <p className="text-sm text-white/70 leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>
    </PageContainer>
  );
}
