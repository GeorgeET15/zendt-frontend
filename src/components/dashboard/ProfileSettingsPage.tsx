import { useEffect, useState } from "react";
import { useAvatar } from "../../context/AvatarContext";
import BackButton from "./BackButton";
import GradientBlob from "../icons/GradientBlob";
import EditableDetailsCard from "./EditableDetailsCard";
import PageContainer from "./PageContainer";
import { dataService } from "../../services/dataService";

type Field = {
  label: string;
  key: string;
};

type ProfileSettings = {
  initialAddress: Record<string, string>;
  addressFields: Field[];
  brandFields: Field[];
  initialProfileData: Record<string, string>;
};

export default function ProfileSettingsPage() {
  const avatarSrc = useAvatar();
  const [data, setData] = useState<ProfileSettings | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const result = await dataService.getProfileSettings();
      setData(result as any);
    };
    fetchData();
  }, []);

  if (!data) {
    return <PageContainer className="text-white space-y-6"><div className="p-6">Loading...</div></PageContainer>;
  }

  const { initialAddress, addressFields, brandFields, initialProfileData } = data;

  return (
    <PageContainer className="text-white mb-4">
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

      <div className="mx-auto w-full max-w-[480px] pb-25">
        <div className="rounded-t-[48px] bg-[#141414] p-5 z-1 relative overflow-hidden">
          
          {/* Profile Photo - Centered */}
          <div className="relative mb-6 flex justify-center">
            <div className="h-[120px] w-[120px] rounded-full overflow-hidden bg-[#141414]/60">
              <img src={avatarSrc} alt="Profile" className="h-full w-full object-cover" />
            </div>
          </div>

          {/* Editable Cards */}
          <EditableDetailsCard
            title="Name and Email"
            fields={brandFields}
            initialValues={initialProfileData}
          />
          <EditableDetailsCard
            title="Address"
            fields={addressFields}
            initialValues={initialAddress}
          />
        </div>
      </div>
    </PageContainer>
  );
}
