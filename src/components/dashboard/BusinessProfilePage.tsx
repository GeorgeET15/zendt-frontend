import { Link } from "react-router-dom";
import { Pencil } from "lucide-react";
import BackButton from "./BackButton";
import GradientBlob from "../icons/GradientBlob";
import PageContainer from "./PageContainer";

const socials = [
  { platform: "Behance", handle: "Crafts of taste" },
  { platform: "Instagram", handle: "Crafts_of_taste" },
  { platform: "LinkedIn", handle: "Add Account" },
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
                  <img src="/bussinessProfileImage.jpg" alt="Crafts of taste" className="h-full w-full object-cover" />
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
          <div className="space-y-4 rounded-[32px] bg-[#1E1E1E] border border-white/5 p-6">
            <div className="space-y-3">
              {socials.map((social) => (
                <div
                  key={social.platform}
                  className="flex items-center justify-between rounded-2xl bg-[#1E1E1E] px-4 py-3 text-sm"
                >
                  <span>{social.platform}</span>
                  <span>{social.handle}</span>
                </div>
              ))}
            </div>
          <div className="flex justify-center">
            <button className="text-sm text-white/70 hover:text-white">
              Add Any Socials
            </button>
          </div>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
