import React from "react";

type ToastProps = {
  message: string;
  subMessage?: string;
  icon?: React.ReactNode;
  visible: boolean;
};

export default function Toast({ message, subMessage, icon, visible }: ToastProps) {
  if (!visible) return null;

  return (
    <div className="fixed flex items-center right-4 top-4 z-[1000] rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-xs text-white shadow-lg backdrop-blur">
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
