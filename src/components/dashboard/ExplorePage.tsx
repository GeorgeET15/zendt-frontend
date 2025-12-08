// Explore Page Component
import BackButton from "./BackButton";
import PageContainer from "./PageContainer";
import { Icon1 as RippleIcon } from "../icons/RippleIcon";
import { Icon2 as BarsIcon } from "../icons/BarsIcon";
import { Icon3 as WavesIcon } from "../icons/WavesIcon";
import { Icon4 as StepsIcon } from "../icons/StepsIcon";
import { Icon5 as CurveIcon } from "../icons/CurveIcon";

export default function ExplorePage() {
  return (
    <PageContainer className="text-white space-y-6">
      <div className="flex items-center justify-between px-4 pt-12 z-0">
        <div
          className="absolute opacity-60 blur-2xl -z-10"
          style={{
            right: "82px",
            top: "-20px",
            width: "321px",
            height: "262px",
            zIndex: "0",
            background:
              "radial-gradient(50% 50% at 50% 50%, rgba(255,173,122,0.40) 0%, rgba(93,104,157,0.40) 58.08%, rgba(20,35,55,0.40) 200%)",
          }}
        ></div>
        <div className="flex justify-between w-full z-1">
          <BackButton />
        </div>
      </div>

      <div className="pt-6 relative rounded-t-3xl px-4 pb-25 bg-[#141414] z-1 min-h-[calc(100vh-100px)]">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-[18px] font-light tracking-[0.01em]">Explore</h1>
        </div>

        {/* 5-Container Grid Layout */}
        <div className="grid grid-cols-2 gap-4 pb-20">
          {/* Top Row: 2 Containers */}
          <div className="rounded-[28px] bg-[#1E1E1E] shadow-[0_24px_45px_rgba(4,4,7,0.55)] p-5 min-h-[180px] flex flex-col justify-end relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-80">
               <BarsIcon />
            </div>
            <div className="relative z-10 mt-auto">
              <p className="text-[10px] uppercase tracking-wider text-white/60 mb-1">
                Play & Win
              </p>
              <p className="text-xl font-light">Rewards</p>
            </div>
          </div>

          <div className="rounded-[28px] bg-[#1E1E1E] shadow-[0_24px_45px_rgba(4,4,7,0.55)] p-5 min-h-[180px] flex flex-col justify-center items-center relative">
            <div className="mb-4">
              <RippleIcon />
            </div>
            <div className="text-left w-full">
              <p className="text-[9px] uppercase tracking-wider text-white/60 mb-1">
                September Spends
              </p>
              <p className="text-xl font-light">0 $</p>
            </div>
          </div>

          {/* Middle Row: 1 Container spanning full width */}
          <div className="col-span-2 rounded-[28px] bg-[#1E1E1E] shadow-[0_24px_45px_rgba(4,4,7,0.55)] p-6 min-h-[140px] flex items-center justify-between">
            <div>
              <p className="text-[10px] uppercase tracking-wider text-white/60 mb-2">
                Electricity, Gas, Mobile & More
              </p>
              <p className="text-xl font-light">Pay bills instantly</p>
            </div>
            <div className="opacity-80">
              <WavesIcon />
            </div>
          </div>

          {/* Bottom Row: 2 Containers */}
          <div className="rounded-[28px] bg-[#1E1E1E] shadow-[0_24px_45px_rgba(4,4,7,0.55)] p-5 min-h-[180px] flex flex-col justify-between">
            <div>
              <p className="text-[10px] uppercase tracking-wider text-white/60 mb-1">
                Invite
              </p>
              <p className="text-xl font-light">Earn $150</p>
            </div>
            <div className="self-start opacity-80">
              <StepsIcon />
            </div>
          </div>

          <div className="rounded-[28px] bg-[#1E1E1E] shadow-[0_24px_45px_rgba(4,4,7,0.55)] p-5 min-h-[180px] flex flex-col justify-between">
            <div>
              <p className="text-[10px] uppercase tracking-wider text-white/60 mb-1">
                Autopay
              </p>
              <p className="text-xl font-light">0 Active</p>
            </div>
            <div className="self-start opacity-80">
              <CurveIcon />
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
