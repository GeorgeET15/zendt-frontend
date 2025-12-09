import BackButton from "./BackButton";
import GradientBlob from "../icons/GradientBlob";
import PageContainer from "./PageContainer";

export default function AddVirtualAccountPage() {
  return (
    <PageContainer className="text-white">
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
      <section className="rounded-[32px] bg-[#0f0f12]/95 border border-white/5 shadow-[0_35px_65px_rgba(4,4,7,0.55)] p-6 space-y-4">
        <h1 className="text-[18px] font-semibold">Add virtual account</h1>
        <p className="text-white/70">
          Placeholder page – awaiting design details.
        </p>
      </section>
    </PageContainer>
  );
}
