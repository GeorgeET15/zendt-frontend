import { useEffect, useState } from "react";
import BackButton from "./BackButton";
import PageContainer from "./PageContainer";
import { dataService } from "../../services/dataService";

export default function TermsPage() {
  const [paragraphs, setParagraphs] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await dataService.getTermsParagraphs();
      setParagraphs(data);
    };
    fetchData();
  }, []);

  return (
    <PageContainer>
           <div className="flex items-center justify-between px-4 pt-12 z-0">
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
      <div className=" relative rounded-t-2xl[40px] bg-black text-white shadow-[0_35px_65px_rgba(4,4,7,0.55)] border border-white/5 overflow-hidden">
        <div className="p-6 space-y-6">
          <h2 className="text-[17px] font-light">Terms of service</h2>
          <div className="space-y-4 text-sm leading-relaxed text-white/80">
            {paragraphs.map((text, index) => (
              <p key={index}>{text}</p>
            ))}
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
