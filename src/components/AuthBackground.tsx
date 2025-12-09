import type { ReactNode } from "react";
import NavigationBar from "./layout/NavigationBar";

interface AuthBackgroundProps {
  children: ReactNode;
  showNavigation?: boolean;
  navigationContent?: ReactNode;
}

export default function AuthBackground({
  children,
  showNavigation = true,
  navigationContent,
}: AuthBackgroundProps) {
  return (
    <div className="bg-[#141414] relative min-h-screen w-full bg-linear-to-b overflow-hidden text-white flex flex-col items-center">
      {showNavigation && (
        <NavigationBar className={` relative z-50 w-full max-w-4xl pt-8`} centerContent={navigationContent} />
      )}
      <div className="absolute top-20 right-8 w-[200px] h-[200px] border border-gray-700 opacity-10 rounded-3xl rotate-12" />
      <div
        className="pointer-events-none absolute top-[-60px] md:top-[-65px] left-[90px] w-[360px] h-[472px] rotate-[7.308deg]"
        aria-hidden="true"
      >
        <img
          src="/auth-pattern.svg"
          alt=""
          loading="lazy"
          className="w-full h-full object-contain drop-shadow-[0_25px_45px_rgba(0,0,0,0.45)]"
        />
        <img
          src="/auth-radial.svg"
          alt=""
          loading="lazy"
          className="absolute -top-6 md:-top-10 right-0 w-[321px] h-[427px] blur-[32px]"
        />
      </div>

      {children}
    </div>
  );
}
