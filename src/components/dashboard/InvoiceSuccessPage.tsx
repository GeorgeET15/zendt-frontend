import { useState } from "react";
import BackButton from "./BackButton";
import PageContainer from "./PageContainer";
import GradientBlob from "../icons/GradientBlob";
import Toast from "../Toast";

export default function InvoiceSuccessPage() {
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const handleDownload = () => {
    setToastMessage("Invoice downloaded successfully!");
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  const handleShare = () => {
    setToastMessage("Invoice ready to share!");
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  return (
    <PageContainer className="text-white">
      {/* Toast */}
      <Toast
        message={toastMessage}
        subMessage=""
        visible={showToast}
        icon={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            fill="none"
            stroke="grey"
            strokeWidth="2"
          >
            <circle cx="9" cy="9" r="8" />
            <path d="m7 9 2 2 4-4" />
          </svg>
        }
      />

      <div className="flex items-center justify-between px-4 pt-12 z-0">
        <GradientBlob
  className="absolute opacity-60 blur-2xl -z-10"
  style={{
    right: "82px",
    top: "-50px",
    width: "321px",
    height: "262px",
    zIndex: -1,
    pointerEvents: "none"
  }}
/>

        <div className="flex justify-between w-full z-1">
          <BackButton />
        </div>
      </div>

      <div className="pt-6 relative rounded-t-3xl bg-[#141414] z-1 min-h-[calc(100vh-100px)]">
        {/* Main Content - Centered */}
        <div className="flex-1 flex items-center justify-center min-h-[60vh]">
          <div className="text-center space-y-4">
            <h1 className="text-2xl font-light">Created Successfully!</h1>
            <div className="flex items-center justify-center gap-3 text-sm text-white/60">
              <button
                onClick={handleDownload}
                className="hover:text-white transition-colors"
              >
                Download
              </button>
              <span>|</span>
              <button
                onClick={handleShare}
                className="hover:text-white transition-colors"
              >
                Share
              </button>
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
