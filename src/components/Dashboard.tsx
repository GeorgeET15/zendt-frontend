import { useEffect } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import type { LucideIcon } from "lucide-react";
import { Compass, CreditCard, LayoutDashboard, UserRound, Wallet } from "lucide-react";
import NavigationBar from "./layout/NavigationBar";

type TabDefinition = {
  to: string;
  label: string;
  icon: LucideIcon;
};

const tabs: TabDefinition[] = [
  { to: "home", label: "Dashboard", icon: LayoutDashboard },
  { to: "card-management", label: "Cards", icon: CreditCard },
  { to: "profile", label: "Profile", icon: UserRound },
  { to: "virtual-account", label: "Virtual", icon: Wallet },
  { to: "explore", label: "Explore", icon: Compass },
];

function DashboardDesktopNav() {
  return (
    <nav className="flex items-center gap-1">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        return (
          <NavLink
            key={tab.to}
            to={`/dashboard/${tab.to}`}
            className={({ isActive }) =>
              [
                "flex items-center gap-2 text-sm px-3 py-2 rounded-[20px] transition focus-visible:outline-none",
                isActive ? "bg-white/10 text-white" : "text-slate-300 hover:text-white",
              ].join(" ")
            }
          >
            <Icon className="h-5 w-5" strokeWidth={1.7} />
            <span>{tab.label}</span>
          </NavLink>
        );
      })}
    </nav>
  );
}

function DashboardMobileNav() {
  return (
    <div className="fixed bottom-4 left-1/2 z-40 w-[calc(100%-2rem)] max-w-lg -translate-x-1/2 md:hidden">
      <div className="pointer-events-auto flex justify-center items-center h-auto gap-1 p-1 bg-[#242424]/95 rounded-full font-normal whitespace-nowrap shadow-[0_24px_45px_rgba(6,6,9,0.4)] backdrop-blur">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <NavLink
              key={tab.to}
              to={`/dashboard/${tab.to}`}
              className={({ isActive }) =>
                [
                  "inline-flex justify-center items-center px-3 py-2 gap-1 rounded-full border border-transparent transition focus-visible:outline-none",
                  "hover:bg-[#484848] hover:text-white",
                  isActive ? "bg-[#484848] text-white active-tab" : "text-slate-500",
                ].join(" ")
              }
            >
              <Icon className="h-5 w-5" strokeWidth={1.7} />
            </NavLink>
          );
        })}
      </div>
    </div>
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
  const showNavigationBar =
    location.pathname.startsWith("/dashboard/home") ||
    location.pathname.startsWith("/dashboard/card-management") ||
    location.pathname.startsWith("/dashboard/settlement") ||
    location.pathname === "/dashboard";

  return (
    <div className="min-h-screen w-full bg-[#141414] text-white">
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
