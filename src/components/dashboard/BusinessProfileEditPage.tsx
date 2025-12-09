import { useEffect, useState } from "react";
import BackButton from "./BackButton";
import GradientBlob from "../icons/GradientBlob";
import PageContainer from "./PageContainer";
import EditableDetailsCard from "./EditableDetailsCard";
import { dataService } from "../../services/dataService";

type Field = {
  label: string;
  key: string;
};

type BusinessProfile = {
  addressFields: Field[];
  initialAddress: Record<string, string>;
  brandFields: Field[];
  initialBrandData: Record<string, string>;
};

export default function BusinessProfileEditPage() {
  const [data, setData] = useState<BusinessProfile | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const result = await dataService.getBusinessProfile();
      setData(result as any);
    };
    fetchData();
  }, []);

  if (!data) {
    return <PageContainer className="text-white space-y-6"><div className="p-6">Loading...</div></PageContainer>;
  }

  const { addressFields, initialAddress, brandFields, initialBrandData } = data;

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
      <div className="p-6 bg-[#141414] rounded-t-[32px]">
        <h1 className="text-[18px] font-semibold">Edit business details</h1>
        <p className="text-white/70 text-[10px] pb-6">
          Update the information shown on invoices and customer communications.
        </p>
        <EditableDetailsCard
          title="Brand name"
          fields={brandFields}
          initialValues={initialBrandData}
        />
        <EditableDetailsCard
          title="Business address"
          fields={addressFields}
          initialValues={initialAddress}
        />
      </div>
    </PageContainer>
  );
}
