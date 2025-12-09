import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Settings, Briefcase, Building2, ClipboardCheck, Tag, Info, LifeBuoy, LogOut } from "lucide-react";
import GradientBlob from "../icons/GradientBlob";
import { useAvatar } from "../../context/AvatarContext";
import { useAuth } from "../../context/AuthContext";
import BackButton from "./BackButton";
import PageContainer from "./PageContainer";
import { dataService } from "../../services/dataService";

const iconMap: Record<string, any> = {
  Briefcase,
  Settings,
  Building2,
  ClipboardCheck,
  Tag,
  Info,
  LifeBuoy,
};

type ProfileItem = {
  label: string;
  to: string;
  icon: string;
  showArrow?: boolean;
};

export default function ProfileHub() {
  const avatarSrc = useAvatar();
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [items, setItems] = useState<ProfileItem[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await dataService.getProfileHubItems();
      setItems(data);
    };
    fetchData();
  }, []);

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

      <div className="mx-auto w-full max-w-[480px]">
        <div className="rounded-t-[48px] bg-[#141414] p-5 z-1 relative overflow-hidden">

          {/* Profile Header */}
          <div className="flex items-start gap-4">
            <div className="relative">
              <div className="h-[110px] w-[110px] rounded-full overflow-hidden bg-[#141414]/60">
                <img src={avatarSrc} alt="Profile" className="h-full w-full object-cover" />
              </div>
              <div className="absolute left-1/2 top-[110px] h-[calc(100%-110px)] w-px -translate-x-1/2 bg-white/15" />
            </div>

            <div className="flex-1 pt-1 space-y-2">
              <h2 className="text-[16px] font-light tracking-[0.01em]">Roberto Augustus</h2>
              <div className="space-y-1 text-[10px] text-white/60 leading-relaxed">
                <p>
                  <span className="text-white/75">E-mail :</span> robertoaugustus@gmail.com
                </p>
                <p>
                  <span className="text-white/75">Customer id :</span> 69014537892
                </p>
              </div>
              <Link to="/dashboard/profile-settings" className="inline-flex items-center gap-1.5 text-[13px] text-white">
                Profile settings
                <svg xmlns="http://www.w3.org/2000/svg" width="8" height="20" viewBox="0 0 9 21" fill="none">
                  <path d="M0.5 20.5L6.96447 14.0355C8.91709 12.0829 8.91709 8.91709 6.96447 6.96447L0.499999 0.5" stroke="white" strokeLinecap="round"></path>
                </svg>
              </Link>
            </div>
          </div>

          {/* Options List */}
          <div className="mt-8 flex flex-col gap-4">
            {items.map(({ label, to, icon, showArrow }) => {
              const Icon = iconMap[icon] || Info;
              return (
                <Link
                  key={label}
                  to={to}
                  className="flex items-center gap-2.5 text-[15px] font-light tracking-wide text-white hover:text-white/80"
                >
                  <Icon className="h-4 w-4 text-white/70" strokeWidth={1} />
                  <span className="flex-1">{label}</span>
                  {showArrow && (
                    <svg xmlns="http://www.w3.org/2000/svg" width="8" height="20" viewBox="0 0 9 21" fill="none">
                      <path d="M0.5 20.5L6.96447 14.0355C8.91709 12.0829 8.91709 8.91709 6.96447 6.96447L0.499999 0.5" stroke="white" strokeLinecap="round"></path>
                    </svg>
                  )}
                </Link>
              );
            })}

            {/* Logout Button (Smaller) */}
            <button
              onClick={() => {
                logout();
                navigate("/login");
              }}
              className="flex items-center gap-2 text-[15px] font-light tracking-wide text-white hover:text-red-300"
            >
              <LogOut className="h-4 w-4 text-white/70" strokeWidth={1} />
              <span>Log out</span>
            </button>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
