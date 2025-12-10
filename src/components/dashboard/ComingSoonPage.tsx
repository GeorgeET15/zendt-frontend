import BackButton from "./BackButton";
import GradientBlob from "../icons/GradientBlob";
import PageContainer from "./PageContainer";

export default function ComingSoonPage() {
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

      <div className="pt-6 relative rounded-t-3xl px-4 pb-25 bg-[#141414] z-1 min-h-[calc(100vh-100px)] flex flex-col items-center justify-center">
        <div className="text-center space-y-6 max-w-sm">
          {/* Icon */}
          <div className="mx-auto w-24 h-24 rounded-full bg-white/5 border border-white/10 flex items-center justify-center backdrop-blur-xl">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-white/60"
            >
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
          </div>

          {/* Text */}
          <div className="space-y-3">
            <h1 className="text-3xl font-light">Coming Soon</h1>
            <p className="text-white/60 text-sm leading-relaxed">
              We're working hard to bring you this feature. Stay tuned for updates!
            </p>
          </div>

          {/* Decorative gradient blob */}
          <GradientBlob
            className="absolute opacity-30 blur-3xl -z-10"
            style={{
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
              width: "300px",
              height: "300px",
              zIndex: "0",
            }}
          />
        </div>
      </div>
    </PageContainer>
  );
}
