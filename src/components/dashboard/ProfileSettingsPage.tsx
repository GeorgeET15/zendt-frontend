import { useEffect, useState } from "react";
import { useAvatar } from "../../context/AvatarContext";
import BackButton from "./BackButton";
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
      <div className="p-6 bg-black rounded-t-[32px] pb-18">
        <div className="relative mb-4 mx-auto flex justify-center">
          <div className="h-[140px] w-[140px] rounded-full overflow-hidden bg-black/60 relative ">
            <img
              src={avatarSrc}
              alt="Roberto Augustus"
              className="h-full w-full object-cover"
            />
          </div>
        </div>

        <EditableDetailsCard
          title="Brand name"
          fields={brandFields}
          initialValues={initialProfileData}
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
