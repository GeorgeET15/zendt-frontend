import { Link } from "react-router-dom";
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
                  <Link
          to="/dashboard/business-profile/edit"
          className="inline-flex h-10 w-10 text-xl items-center justify-center text-white/80 hover:text-white"
        >
          ✎
        </Link>
          </div>

        </div>
      </div>
      <div className="pt-6 relative rounded-t-3xl pb-18 px-4 bg-[#141414] z-1">
        <div className="space-y-6">
        <div className="mx-auto w-full max-w-[480px]">
          <div className="rounded-[28px] bg-[#141414] p-6 shadow-[0_24px_45px_rgba(6,6,9,0.5)] relative overflow-hidden">
            <div className="flex items-start gap-4">
              <div className="relative">
                <div className="h-[129px] w-[129px] rounded-[28px] overflow-hidden bg-[#141414]/60 mx-auto">
                  <img src="/bussinessProfileImage.jpg" alt="Crafts of taste" className="h-full w-full object-cover" />
                </div>
                <div className="absolute left-1/2 top-[140px] h-[calc(100%-140px)] w-px -translate-x-1/2 bg-white/15" />
              </div>

              <div className="flex-1 pt-2 space-y-3">
                <h2 className="text-[17px] font-light tracking-[0.01em]">craftsoftaste</h2>
                <div className="space-y-1 text-[10px] text-white/60 leading-relaxed">
                  <p>
                    <span className="text-white/75">E-mail :</span> craftsoftaste@gmail.com
                  </p>
                  <p>
                    <span className="text-white/75">Phone :</span> +91983784963
                  </p>
                  <p>
                    <span className="text-white/75">Website :</span> craftsoftaste.com
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
          <h3 className="text-[17px] font-light tracking-wide">About business</h3>
          <div className="space-y-4 rounded-[32px] bg-[#101014] border border-white/5 p-6">
            <p className="text-[10px] text-white/80 leading-relaxed">
              we bring creativity to life through the art of paper crafting.
              Founded with a passion for handmade beauty, we specialize in
              unique, high-quality paper products—from greeting cards and gift
              boxes to home decor and DIY kits.
            </p>
          </div>
          <h3 className="text-[17px] font-light tracking-wide">Social profiles</h3>
          <div className="space-y-4 rounded-[32px] bg-[#101014] border border-white/5 p-6">
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
            <button className="text-sm text-white/70 hover:text-white">
              Add Any Socials
            </button>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
