// Explore Page Component
import { Link } from "react-router-dom";
import BackButton from "./BackButton";
import GradientBlob from "../icons/GradientBlob";
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

      <div className="pt-6 relative rounded-t-3xl px-4 pb-25 bg-[#141414] z-1 min-h-[calc(100vh-100px)]">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-[18px] font-light tracking-[0.01em]">Explore</h1>
        </div>

        {/* 5-Container Grid Layout */}
        <div className="grid grid-cols-2 gap-4 pb-20">
          {/* Rewards Card */}
          <Link to="/dashboard/rewards" className="block">
            <div className="rounded-[28px] bg-[#1E1E1E] shadow-[0_24px_45px_rgba(4,4,7,0.55)] p-5 min-h-[180px] flex flex-col justify-end relative overflow-hidden transition-all active:scale-95">
              <div className="absolute top-[46%] left-5 -translate-y-1/2">
                <BarsIcon />
              </div>
              <div className="relative z-10 mt-auto">
                <p className="text-[10px] uppercase tracking-wider text-white/60 mb-1">
                  Play & Win
                </p>
                <p className="text-xl font-light">Rewards</p>
              </div>
            </div>
          </Link>

          {/* September Spends Card */}
          <Link to="/dashboard/coming-soon" className="block">
            <div className="rounded-[28px] bg-[#1E1E1E] shadow-[0_24px_45px_rgba(4,4,7,0.55)] p-5 min-h-[180px] flex flex-col justify-end relative overflow-hidden transition-all active:scale-95">
              <div className="absolute top-[46%] left-5 -translate-y-1/2">
                <RippleIcon />
              </div>
              <div className="relative z-10 mt-auto">
                <p className="text-[9px] uppercase tracking-wider text-white/60 mb-1">
                  September Spends
                </p>
                <p className="text-xl font-light">0 $</p>
              </div>
            </div>
          </Link>

          {/* Pay Bills Card */}
          <Link to="/dashboard/coming-soon" className="col-span-2 block">
            <div className="rounded-[28px] bg-[#1E1E1E] shadow-[0_24px_45px_rgba(4,4,7,0.55)] p-6 min-h-[140px] flex items-center justify-between transition-all active:scale-95">
              <div>
                <p className="text-[10px] uppercase tracking-wider text-white/60 mb-2">
                  Electricity, Gas, Mobile & More
                </p>
                <p className="text-xl font-light">Pay bills instantly</p>
              </div>
              <div className="">
                <WavesIcon />
              </div>
            </div>
          </Link>

          {/* Invite (Earn $150) Card */}
          <Link to="/dashboard/coming-soon" className="block">
            <div className="rounded-[28px] bg-[#1E1E1E] shadow-[0_24px_45px_rgba(4,4,7,0.55)] p-5 min-h-[180px] flex flex-col justify-between transition-all active:scale-95">
              <div>
                <p className="text-[10px] uppercase tracking-wider text-white/60 mb-1">
                  Invite
                </p>
                <p className="text-xl font-light">Earn $150</p>
              </div>
              <div className="self-start">
                <StepsIcon />
              </div>
            </div>
          </Link>

          {/* Autopay Card */}
          <Link to="/dashboard/coming-soon" className="block">
            <div className="rounded-[28px] bg-[#1E1E1E] shadow-[0_24px_45px_rgba(4,4,7,0.55)] p-5 min-h-[180px] flex flex-col justify-between transition-all active:scale-95">
              <div>
                <p className="text-[10px] uppercase tracking-wider text-white/60 mb-1">
                  Autopay
                </p>
                <p className="text-xl font-light">0 Active</p>
              </div>
              <div className="self-start">
                <CurveIcon />
              </div>
            </div>
          </Link>
        </div>
      </div>
    </PageContainer>
  );
}
