import BackButton from "./BackButton";
import GradientBlob from "../icons/GradientBlob";
import PageContainer from "./PageContainer";

const paragraphs = new Array(4).fill(`Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.`);

export default function PrivacyPolicyPage() {
  return (
    <PageContainer>
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
      <div className="relative rounded-t-[40px] bg-[#141414] text-white shadow-[0_35px_65px_rgba(4,4,7,0.55)] overflow-hidden">
        <div className="p-6 space-y-6">
          <h2 className="text-[17px] font-light">Privacy policy</h2>
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
