import type { SelectHTMLAttributes } from "react";

type FormSelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  containerClassName?: string;
};

export default function FormSelect({
  className = "",
  containerClassName = "",
  children,
  ...props
}: FormSelectProps) {
  return (
    <div className={["relative", containerClassName].filter(Boolean).join(" ")}>
      <select
        {...props}
        className={[
          "appearance-none rounded-3xl border border-white/15 bg-black/30 px-4 py-3 pr-12 text-white focus:outline-none",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
      >
        {children}
      </select>
      <span className="pointer-events-none absolute inset-y-0 right-4 flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="5" viewBox="0 0 21 9" fill="none">
          <path
            d="M19.7014 0.311523L13.1226 6.89035C11.4016 8.6113 8.61142 8.61131 6.89047 6.89036L0.31164 0.311523"
            stroke="white"
            strokeWidth="0.881353"
          />
        </svg>
      </span>
    </div>
  );
}
