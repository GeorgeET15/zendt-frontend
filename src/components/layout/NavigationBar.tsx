import { useEffect, useRef, useState, type ReactNode } from "react";
import { Link } from "react-router-dom";

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
    <header className={className}>
      <div className="mx-auto flex max-w-4xl items-center justify-between rounded-[28px] bg-black/70 px-4 py-3 backdrop-blur border border-white/5 gap-4">
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
              className="absolute left-0 mt-3 w-64 rounded-3xl border border-white/10 bg-black/90 p-4 shadow-2xl"
            >
              <nav className="flex flex-col gap-2 text-sm text-white/80">
                {drawerItems.map((item) => (
                  <Link
                    key={item.label}
                    to={item.to}
                    className="rounded-2xl px-3 py-2 hover:bg-white/10"
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
            src="/avatar-placeholder.svg"
            alt="Profile"
            className="h-full w-full object-cover"
          />
        </Link>
      </div>
    </header>
  );
}
