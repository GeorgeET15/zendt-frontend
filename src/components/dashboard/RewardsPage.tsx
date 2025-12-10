import BackButton from "./BackButton";
import GradientBlob from "../icons/GradientBlob";
import PageContainer from "./PageContainer";
import FlappyGame from "../FlappyGame";

export default function RewardsPage() {
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
          <h1 className="text-[18px] font-light tracking-[0.01em]">Rewards</h1>
        </div>

        {/* Rewards Content */}
        <div className="space-y-6 pb-20">
          {/* Points Card */}
          <div className="rounded-[28px] bg-gradient-to-br from-[#1E1E1E] to-[#141414] border border-white/10 p-6 relative overflow-hidden">
            <GradientBlob
              className="absolute opacity-20 blur-2xl"
              style={{
                right: "-50px",
                top: "50%",
                transform: "translateY(-50%)",
                width: "200px",
                height: "200px",
                zIndex: "0",
              }}
            />
            <div className="relative z-10 space-y-4">
              <p className="text-[10px] uppercase tracking-wider text-white/60">Your Points</p>
              <p className="text-5xl font-light">0</p>
              <p className="text-sm text-white/60">Start earning points by playing the game!</p>
            </div>
          </div>

          {/* Game Section */}
          <div className="space-y-4">
            <h2 className="text-lg font-light">Play & Win</h2>
            <FlappyGame />
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
