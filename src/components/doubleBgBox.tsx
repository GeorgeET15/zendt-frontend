import type { ReactNode } from "react";

interface DoubleBgBoxProps {
  className?: string;
  backgroundImage?: string;
  flagImage?: string;
  arcColor?: string;
  topLeft?: ReactNode;
  topRight?: ReactNode;
  bottomLeft?: ReactNode;
  bottomRight?: ReactNode;
  variant?: "wallet" | "others";
  flagPosition?: "left" | "right";
  children?: ReactNode;
}

export default function DoubleBgBox({
  className,
  variant = "others",
  backgroundImage,
  flagImage,
  flagPosition = "right",
  arcColor,
  topLeft,
  topRight,
  bottomLeft,
  bottomRight,
  children,
}: DoubleBgBoxProps) {
  const baseClasses =
    "relative overflow-hidden rounded-[20px]   text-gray-100 ";
  const sizeClass =
    variant === "wallet" ? "w-full aspect-[130/135]" : "w-full aspect-[185/135]";
  const containerClass = [baseClasses, sizeClass, className].filter(Boolean).join(" ");

  return (
    <div className={containerClass}>
      {variant === "wallet" ? (
        <svg
          className="absolute inset-0 w-[101%] h-full z-10"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 102 135"
          fill="none"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            d="M0 121.681V13.3183C0 5.96282 5.96283 0 13.3183 0H56.0744C60.8326 0 65.2293 2.53846 67.6084 6.65917L74.2492 18.1614C76.6283 22.2821 81.025 24.8205 85.7832 24.8205H87.7799C95.1355 24.8205 101.098 30.7834 101.098 38.1389V121.681C101.098 129.037 95.1355 134.999 87.7799 134.999H13.3183C5.96282 134.999 0 129.037 0 121.681Z"
            fill="#161616"
          />
        </svg>
      ) : (
      <svg
        className="absolute inset-0 w-full h-[102%] z-10"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 185 136"
        fill="none"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M185 114V44.8713C185 39.1693 180.378 34.5469 174.676 34.5469C171.88 34.5469 169.203 33.413 167.259 31.4044L142.744 6.08736C138.976 2.19652 133.792 0 128.376 0H20C8.95431 0 0 8.9543 0 20V114C0 125.046 8.9543 134 20 134H165C176.046 134 185 125.046 185 114Z"
          fill="#161616"
        />
      </svg>
      )}
      {flagImage && (
        <img
          src={flagImage}
          alt=""
          className={`absolute z-0 top-[-5px] h-11 w-14 object-cover ${
            flagPosition === "left" 
              ? "-left-3 rounded-br-3xl" 
              : "-right-3 rounded-bl-3xl"
          }`}
        />
      )}
      {arcColor && (
        <svg
          className="absolute -right-3 top-[-5px] h-11 w-14 z-0"
          viewBox="0 0 56 44"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <path
            d="M0 0H56V44C56 44 42 34 28 34C14 34 0 44 0 44V0Z"
            fill={arcColor}
          />
        </svg>
      )}

      {backgroundImage && (
        <img
          src={backgroundImage}
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-10"
          aria-hidden="true"
        />
      )}

      <div
        className={[
          "relative z-10 flex h-full w-full flex-col p-4",
          variant === "wallet" ? "justify-between" : "justify-center",
        ].join(" ")}
      >
        {children ? (
          children
        ) : (
          <>
            {(topLeft || topRight) && (
              <div className="flex items-start justify-between text-[9px] uppercase tracking-[0.35em] text-white">
                <span>{topLeft}</span>
                <span className="ml-4">{topRight}</span>
              </div>
            )}

            {backgroundImage && (
              <div className="flex flex-1 items-center justify-center">
                <img
                  src={backgroundImage}
                  alt=""
                  className="max-h-[60%] max-w-[60%] object-contain"
                />
              </div>
            )}

            {(bottomLeft || bottomRight) && (
              <div 
                className={`flex flex-col gap-1 text-left text-white ${
                  variant === "wallet" ? "absolute bottom-4 left-4 w-[calc(100%-32px)]" : ""
                }`}
              >
                {bottomLeft && (
                  <div className="text-[17px] font-semibold leading-tight">
                    {bottomLeft}
                  </div>
                )}
                {bottomRight && (
                  <div className="text-xs uppercase tracking-[0.3em] text-gray-400">
                    {bottomRight}
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
