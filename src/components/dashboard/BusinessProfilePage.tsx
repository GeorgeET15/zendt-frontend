import { Link } from "react-router-dom";
import { Pencil } from "lucide-react";
import BackButton from "./BackButton";
import GradientBlob from "../icons/GradientBlob";
import PageContainer from "./PageContainer";

const socialLinks = [
  { platform: "Behance", handle: "Zynga", icon: "/behance.png" },
  { platform: "Instagram", handle: "Zynga", icon: "/instagram.png" },
  { platform: "LinkedIn", handle: "Zynga", icon: "/linkedin.png" },
];

export default function BusinessProfilePage() {

  return (
    <PageContainer className="text-white space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center justify-between px-4 pt-12 z-0 w-full">
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
      </div>
      <div className="pt-6 relative rounded-t-3xl pb-18 px-4 bg-[#141414] z-1 pb-30">
        <div className="space-y-6">
        <div className="mx-auto w-full max-w-[480px]">
          <div className="rounded-[28px] bg-[#141414] p-6 relative overflow-hidden">
            {/* Edit Button */}
            <Link
              to="/dashboard/business-profile/edit"
              className="absolute top-4 right-4 inline-flex h-8 w-8 items-center justify-center text-white/60 hover:text-white transition-colors z-20"
            >
              <Pencil size={16} />
            </Link>
            
            <div className="flex items-start gap-4">
              <div className="relative">
                <div className="h-[129px] w-[129px] rounded-[28px] overflow-hidden bg-[#141414] mx-auto">
                  <img src="/bussinessProfileImage.jpg" alt="Zynga" className="h-full w-full object-cover" />
                </div>
                <div className="absolute left-1/2 top-[140px] h-[calc(100%-140px)] w-px -translate-x-1/2 bg-white/15" />
              </div>

              <div className="flex-1 pt-2 space-y-3">
                <h2 className="text-[17px] font-light tracking-[0.01em]">Zynga</h2>
                <div className="space-y-1 text-[10px] text-white/60 leading-relaxed">
                  <p>
                    <span className="text-white/75">E-mail :</span> zynga@gmail.com
                  </p>
                  <p>
                    <span className="text-white/75">Phone :</span> +91983784963
                  </p>
                  <p>
                    <span className="text-white/75">Website :</span> Zynga.com
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
          <h3 className="text-[17px] font-light tracking-wide">About business</h3>
          <div className="relative space-y-4 rounded-[20px] bg-[#1E1E1E] border border-white/5 p-8 overflow-hidden">
            <GradientBlob
              className="absolute opacity-60 blur-2xl"
              style={{
                right: "-20px",
                top: "50%",
                transform: "translateY(-50%)",
                width: "250px",
                height: "180px",
                zIndex: "0",
              }}
            />
            <p className="text-[13px] text-white/80 leading-relaxed relative z-10">
              we bring creativity to life through the art of paper crafting.
              Founded with a passion for handmade beauty, we specialize in
              unique, high-quality paper products—from greeting cards and gift
              boxes to home decor and DIY kits.
            </p>
          </div>
          <h3 className="text-[17px] font-light tracking-wide">Social profiles</h3>
          <div className="space-y-4 rounded-[32px] bg-[#1E1E1E] border border-white/5 p-6 relative overflow-hidden">
            {/* Subtle background gradient for the card */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 blur-[50px] rounded-full -mr-10 -mt-10 pointer-events-none" />
            
            <div className="space-y-3 relative z-10">
              {socialLinks.map((social) => (
                <div
                  key={social.platform}
                  className="group flex items-center justify-between rounded-2xl bg-white/5 border border-white/5 px-4 py-4 text-sm transition-all duration-300 hover:bg-white/10 hover:scale-[1.02] hover:border-white/10 hover:shadow-lg hover:shadow-black/20 cursor-default"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 flex items-center justify-center p-2 group-hover:bg-white/10 transition-colors">
                      <img src={social.icon} alt={social.platform} className="w-full h-full object-contain opacity-90 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <span className="font-medium text-white/90">{social.platform}</span>
                  </div>
                  <span className="text-white/50 font-mono text-xs tracking-wide group-hover:text-white/70 transition-colors">{social.handle}</span>
                </div>
              ))}
            </div>
            
            <div className="relative z-10 pt-2">
              <button className="w-full flex items-center justify-center gap-2 rounded-xl border border-dashed border-white/20 py-3 text-sm text-white/60 hover:text-white hover:border-white/40 hover:bg-white/5 transition-all duration-300 group">
                <div className="w-5 h-5 rounded-full border border-white/40 flex items-center justify-center group-hover:border-white/80 transition-colors">
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 2V8M2 5H8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <span>Add Social Profile</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
