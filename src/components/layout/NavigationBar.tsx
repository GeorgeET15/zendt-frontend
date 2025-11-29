import { useEffect, useRef, useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { useAvatar } from "../../context/AvatarContext";

const drawerItems = [
  { label: "Share Virtual Account", to: "/dashboard/virtual-account" },
  { label: "Show payment links info", to: "/dashboard/payment-links" },
  { label: "Create payment link", to: "/dashboard/payment-links/new" },
  { label: "Create an invoice", to: "/dashboard/invoice" },
  { label: "Add Client", to: "/dashboard/add-client" },
];

interface NavigationBarProps {
  className?: string;
  centerContent?: ReactNode;
}

export default function NavigationBar({ className, centerContent }: NavigationBarProps) {
  const [open, setOpen] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);
  const avatarSrc = useAvatar();

  useEffect(() => {
    if (!open) return;
    const handleClick = (event: MouseEvent) => {
      if (drawerRef.current && !drawerRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  return (
    <header className={["relative z-[999]", className].filter(Boolean).join(" ")}>
      <div className="mx-auto flex max-w-4xl items-center justify-between rounded-[28px] px-4 py-3 backdrop-blur border border-white/5 gap-4">
        <div className="relative">
          <button
            type="button"
            onClick={() => setOpen((prev) => !prev)}
            className="group h-12 w-12 flex flex-col items-center justify-center gap-1 text-gray-400 hover:text-white/90 cursor-pointer"
            aria-expanded={open}
          >
            <span className="h-0.5 w-6 bg-current transition-colors group-hover:bg-white" />
            <span className="h-0.5 w-4 bg-current transition-colors group-hover:bg-white" />
            <span className="h-0.5 w-6 bg-current transition-colors group-hover:bg-white" />
          </button>

          {open && (
            <div
              ref={drawerRef}
              className="absolute left-0 mt-3 w-64 rounded-3xl  p-4 shadow-2xl bg-black overflow-hidden"
            >
                      <div                      className="absolute opacity-60 blur-2xl -z-10"
                style={{
                  right: "0px",
                  top: "0px",
                  width: "321px",
                  height: "262px", zIndex: "0",
                  
                  background:
                    "radial-gradient(50% 50% at 50% 50%, rgba(255,173,122,0.40) 0%, rgba(93,104,157,0.40) 58.08%, rgba(20,35,55,0.40) 200%)",
                }}></div>
              <nav className="relative z-10 flex flex-col gap-2 text-sm text-white/80">
                {drawerItems.map((item) => (
                  <Link
                    key={item.label}
                    to={item.to}
                    className="rounded-2xl px-3 py-2 hover:scale-105"
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>
          )}
        </div>

        {centerContent && (
          <div className="hidden md:flex flex-1 justify-center">{centerContent}</div>
        )}

        <Link
          to="/dashboard/profile"
          className="h-12 w-12 rounded-[18px] overflow-hidden border border-white/10 shadow-lg"
        >
          <img
            src={avatarSrc}
            alt="Profile"
            className="h-full w-full object-cover"
          />
        </Link>
      </div>
    </header>
  );
}
