import BackButton from "./BackButton";
import PageContainer from "./PageContainer";
import BrandDetailsCard from "./BrandDetailsCard";
import AddressDetailsCard from "./AddressDetailsCard";

export default function BusinessProfileEditPage() {
  return (
    <PageContainer className="text-white space-y-6">
           <div className="flex items-center justify-between px-4 pt-6 z-0">
             <div                      className="absolute opacity-60 blur-2xl -z-10"
                     style={{
                       right: "82px",
                       top: "-20px",
                       width: "321px",
                       height: "262px", zIndex: "0",
                       
                       background:
                         "radial-gradient(50% 50% at 50% 50%, rgba(255,173,122,0.40) 0%, rgba(93,104,157,0.40) 58.08%, rgba(20,35,55,0.40) 200%)",
                     }}></div>
           <div className="flex justify-between w-full z-1"><BackButton /></div>
           </div>
      <div>
        <h1 className="text-3xl font-semibold">Edit business details</h1>
        <p className="text-white/70 text-sm">
          Update the information shown on invoices and customer communications.
        </p>
      </div>
      <BrandDetailsCard />
      <AddressDetailsCard />
    </PageContainer>
  );
}
