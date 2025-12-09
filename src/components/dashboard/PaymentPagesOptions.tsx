import { useNavigate } from "react-router-dom";
import BackButton from "./BackButton";
import GradientBlob from "../icons/GradientBlob";
import PageContainer from "./PageContainer";

export default function PaymentPagesOptions() {
  const navigate = useNavigate();

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

      <section className="relative rounded-t-[40px] bg-[#141414] pb-24 p-6 space-y-6 mb-24 min-h-[calc(100vh-100px)]">
         <div className="space-y-8 mt-10">
            {/* Option 1 */}
            <div 
              onClick={() => navigate("/dashboard/payment-links/new")}
              className="group relative z-0 flex items-center justify-between p-8 rounded-[32px] bg-gradient-to-r from-[#1A1A1A] to-[#141414] border border-white/5 hover:border-white/10 transition-all cursor-pointer overflow-hidden min-h-[140px]"
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
              <span className="text-lg font-light text-white z-10 max-w-[70%]">International payments</span>
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
            <div 
              onClick={() => navigate("/dashboard/payment-links/new")}
              className="group relative z-0 flex items-center justify-between p-8 rounded-[32px] bg-gradient-to-r from-[#1A1A1A] to-[#141414] border border-white/5 hover:border-white/10 transition-all cursor-pointer overflow-hidden min-h-[140px]"
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
              <span className="text-lg font-light text-white z-10 max-w-[70%]">Domestic payments</span>
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
      </section>
    </PageContainer>
  );
}
