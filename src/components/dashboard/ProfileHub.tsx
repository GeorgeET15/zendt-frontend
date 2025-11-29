import { Link } from "react-router-dom";
import { Settings, Briefcase, Building2, ClipboardCheck, Tag, Info, LifeBuoy, LogOut } from "lucide-react";
import { useAvatar } from "../../context/AvatarContext";
import BackButton from "./BackButton";
import PageContainer from "./PageContainer";

export default function ProfileHub() {
  const avatarSrc = useAvatar();
  const items = [
    { label: "Business profile", to: "/dashboard/business-profile", icon: Briefcase },
    { label: "Settings", to: "/dashboard/settings", icon: Settings },
    { label: "Bank accounts", to: "/dashboard/bank-accounts", icon: Building2 },
    { label: "Verification / KYC", to: "/dashboard/kyc", icon: ClipboardCheck },
    { label: "Pricing", to: "/dashboard/pricing", icon: Tag },
    { label: "About Zendt", to: "/dashboard/about", icon: Info },
    { label: "Help and Support", to: "/dashboard/help", icon: LifeBuoy, showArrow: true },
  ];

  return (
    <PageContainer className="text-white mb-4">
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
      <div className="mx-auto w-full max-w-[480px]">
        <div className="rounded-[28px] bg-[#0d0d0f] p-6 shadow-[0_24px_45px_rgba(6,6,9,0.5)] border border-white/5 relative overflow-hidden">
          <div className="flex items-start gap-4">
            <div className="relative">
              <div className="h-[140px] w-[140px] rounded-[28px] overflow-hidden bg-black/60">
                <img src={avatarSrc} alt="Roberto Augustus" className="h-full w-full object-cover" />
              </div>
              <div className="absolute left-1/2 top-[140px] h-[calc(100%-140px)] w-px -translate-x-1/2 bg-white/15" />
            </div>

            <div className="flex-1 pt-2 space-y-3">
              <h2 className="text-[17px] font-light tracking-[0.01em]">Roberto Augustus</h2>
              <div className="space-y-1 text-[10px] text-white/60 leading-relaxed">
                <p>
                  <span className="text-white/75">E-mail :</span> robertoaugustus@gmail.com
                </p>
                <p>
                  <span className="text-white/75">Customer id :</span> 69014537892
                </p>
              </div>
              <Link to="/dashboard/profile-settings" className="inline-flex items-center gap-2 text-[14px] text-white">
                Profile settings
                <svg xmlns="http://www.w3.org/2000/svg" width="9" height="21" viewBox="0 0 9 21" fill="none">
                  <path d="M0.5 20.5L6.96447 14.0355C8.91709 12.0829 8.91709 8.91709 6.96447 6.96447L0.499999 0.5" stroke="white" strokeLinecap="round"></path>
                </svg>
              </Link>
            </div>
          </div>

          <div className="mt-10 flex flex-col gap-5">
            {items.map(({ label, to, icon: Icon, showArrow }) => (
              <Link
                key={label}
                to={to}
                className="flex items-center gap-3 text-[17px] font-light tracking-wide text-white hover:text-white/80"
              >
                <Icon className="h-5 w-5 text-white/70" strokeWidth={1} />
                <span className="flex-1">{label}</span>
                {showArrow && (
                  <svg xmlns="http://www.w3.org/2000/svg" width="9" height="21" viewBox="0 0 9 21" fill="none">
                    <path d="M0.5 20.5L6.96447 14.0355C8.91709 12.0829 8.91709 8.91709 6.96447 6.96447L0.499999 0.5" stroke="white" strokeLinecap="round"></path>
                  </svg>
                )}
              </Link>
            ))}
            <Link
              to="/login"
              className="flex items-center gap-3 text-[17px] font-light tracking-wide text-white hover:text-red-300"
            >
              <LogOut className="h-5 w-5 text-white/70" strokeWidth={1} />
              <span>Log out</span>
            </Link>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
