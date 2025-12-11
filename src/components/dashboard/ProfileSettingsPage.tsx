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
            <div className="relative">
              <div className="h-[120px] w-[120px] rounded-full overflow-hidden bg-[#141414]/60">
                <img src={avatarSrc} alt="Profile" className="h-full w-full object-cover" />
              </div>
              <button 
                className="absolute bottom-0 right-0 p-2.5 bg-[#2E2E2E] border border-white/10 rounded-full shadow-lg hover:bg-[#3E3E3E] transition-colors"
                aria-label="Edit profile picture"
              >
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11.3333 2.00004C11.5084 1.82494 11.7163 1.68605 11.9451 1.59129C12.1739 1.49653 12.4191 1.44775 12.6667 1.44775C12.9142 1.44775 13.1594 1.49653 13.3882 1.59129C13.617 1.68605 13.8249 1.82494 14 2.00004C14.1751 2.17513 14.314 2.383 14.4088 2.61182C14.5035 2.84064 14.5523 3.08586 14.5523 3.33337C14.5523 3.58088 14.5035 3.8261 14.4088 4.05493C14.314 4.28375 14.1751 4.49161 14 4.66671L5.00001 13.6667L1.33334 14.6667L2.33334 11L11.3333 2.00004Z"
                    stroke="white"
                    strokeWidth="1.33333"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
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
