import { useEffect, useState } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import NavigationBar from "./layout/NavigationBar";

type TabDefinition = {
  to: string;
  label: string;
  icon: string;
  iconHighlighted: string;
};

const tabs: TabDefinition[] = [
  {
    to: "home",
    label: "Dashboard",
    icon: "/dashboard.png",
    iconHighlighted: "/dashboard-highlighted.png",
  },
  {
    to: "card-management",
    label: "Cards",
    icon: "/card.png",
    iconHighlighted: "/card-highlighted.png",
  },
  {
    to: "profile",
    label: "Profile",
    icon: "/profile.png",
    iconHighlighted: "/profile-highlighted.png",
  },
  {
    to: "virtual-account",
    label: "Virtual",
    icon: "/virtual.png",
    iconHighlighted: "/virtual-highlighted.png",
  },
  {
    to: "explore",
    label: "Explore",
    icon: "/explore.png",
    iconHighlighted: "/explore-highlighted.png",
  },
];

function DashboardDesktopNav() {
  const [hoveredTab, setHoveredTab] = useState<string | null>(null);

  return (
    <nav className="flex items-center gap-1">
      {tabs.map((tab) => {
        return (
          <NavLink
            key={tab.to}
            to={`/dashboard/${tab.to}`}
            onMouseEnter={() => setHoveredTab(tab.to)}
            onMouseLeave={() => setHoveredTab(null)}
            className={({ isActive }) =>
              [
                "flex items-center gap-2 text-sm px-3 py-2 rounded-[20px] transition focus-visible:outline-none",
                isActive ? "bg-white/10 text-white" : "text-slate-300 hover:text-white",
              ].join(" ")
            }
          >
            {({ isActive }) => (
              <>
                <img
                  src={
                    isActive || hoveredTab === tab.to
                      ? tab.iconHighlighted
                      : tab.icon
                  }
                  className="h-5 w-5 object-contain"
                />
                <span>{tab.label}</span>
              </>
            )}
          </NavLink>
        );
      })}
    </nav>
  );
}

function DashboardMobileNav() {
  return (
    <>
      {/* Full-width background container starting from top of nav bar */}
      <div className="fixed bottom-0 left-0 right-0 h-[94px] bg-[#141414] z-30 md:hidden" />
      
      <div className="fixed bottom-6 left-1/2 z-40 -translate-x-1/2 md:hidden">
        <div 
          className="pointer-events-auto flex justify-center items-center gap-1 p-1 bg-[#1F1F1F] rounded-full font-normal whitespace-nowrap shadow-[0_24px_45px_rgba(6,6,9,0.4)]"
          style={{
            width: '374px',
            height: '70px',
            borderRadius: '66px'
          }}
        >
          {tabs.map((tab) => {
            return (
              <NavLink
                key={tab.to}
                to={`/dashboard/${tab.to}`}
                className={({ isActive }) =>
                  [
                    "inline-flex justify-center items-center px-3 py-2 gap-1 rounded-full border border-transparent font-extralight! transition focus-visible:outline-none",
                    "hover:scale-105 hover:text-white",
                    isActive ? " text-white active-tab" : "text-slate-500",
                  ].join(" ")
                }
              >
                {({ isActive }) => (
                  <img
                    src={isActive ? tab.iconHighlighted : tab.icon}
                    className="h-7 w-7 object-contain"
                  />
                )}
              </NavLink>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default function Dashboard() {
  useEffect(() => {
    const idx = window.history.state?.idx ?? 0;
    sessionStorage.setItem("dashboardEntryIdx", String(idx));
    return () => {
      sessionStorage.removeItem("dashboardEntryIdx");
    };
  }, []);

  const location = useLocation();

  // 🔹 Initialize from navigation state ONCE (no effect needed for this)
  const navigationState = location.state as { showKycToast?: boolean } | null;
  const [showKycToast, setShowKycToast] = useState(
    !!navigationState?.showKycToast,
  );

  // 🔹 Auto-hide the toast after 5 seconds when it's visible
  useEffect(() => {
    if (!showKycToast) return;

    const timer = setTimeout(() => {
      setShowKycToast(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, [showKycToast]);

  const showNavigationBar =
    location.pathname.startsWith("/dashboard/home") ||
    location.pathname.startsWith("/dashboard/card-management") ||
    location.pathname.startsWith("/dashboard/settlement") ||
    location.pathname === "/dashboard";

  return (
    <div className="min-h-screen w-full bg-[#141414] text-white overflow-y-scroll no-scrollbar">
      {/* 🔹 Small top-right toast */}
      {showKycToast && (
        <div className="fixed flex  items-center right-4 top-4 z-1000 rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-xs text-white shadow-lg backdrop-blur">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="red" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-circle-alert-icon lucide-circle-alert"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></svg>
         <div className="ml-2"> <span className="font-medium">Complete your KYC</span>
          <div className="mt-1 text-[11px] text-gray-300">
            Please complete your KYC to unlock all features.
          </div></div> 
        </div>
      )}

      {showNavigationBar && (
        <div className="mx-auto w-full max-w-4xl px-4 pt-8">
          <NavigationBar className="w-full" centerContent={<DashboardDesktopNav />} />
        </div>
      )}

      <div className="relative flex min-h-screen flex-col w-full items-center">
        <DashboardMobileNav />
        <div className="w-full flex-1">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
