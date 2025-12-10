import React from "react";

type ToastProps = {
  message: string;
  subMessage?: string;
  icon?: React.ReactNode;
  visible: boolean;
};

export default function Toast({ message, subMessage, icon, visible }: ToastProps) {
  return (
    <div
      className={`fixed right-4 top-4 z-[1000] flex items-center rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-xs text-white shadow-lg backdrop-blur transition-all duration-500 ease-in-out ${
        visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4 pointer-events-none"
      }`}
    >
      {icon && <div className="flex-shrink-0">{icon}</div>}

      <div className="ml-2">
        <span className="font-medium">{message}</span>

        {subMessage && (
          <div className="mt-1 text-[11px] text-gray-300">{subMessage}</div>
        )}
      </div>
    </div>
  );
}
