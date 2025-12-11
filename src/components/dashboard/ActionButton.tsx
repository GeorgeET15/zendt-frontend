function ActionButton({
  label,
  icon,
  onClick,
}: {
  label: string;
  icon?: "share";
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex items-center gap-2 rounded-[10px] bg-[#2E2E2E] px-4 py-2 text-sm text-white/90 hover:bg-white/10 transition"
    >
      {label}
      {icon === "share" ? (
        <svg width="16" height="16" fill="none" stroke="currentColor">
          <path d="M6 5L10 8L6 11" strokeWidth="1.3" />
          <path
            d="M4 3H12C13.1 3 14 3.9 14 5V11C14 12.1 13.1 13 12 13H4C2.9 13 2 12.1 2 11V5C2 3.9 2.9 3 4 3Z"
            strokeWidth="1.2"
          />
        </svg>
      ) : (
        <svg width="16" height="16" fill="none" stroke="currentColor">
          <rect x="5" y="3" width="8" height="10" rx="2" strokeWidth="1.2" />
          <rect
            x="3"
            y="5"
            width="8"
            height="10"
            rx="2"
            opacity="0.5"
            strokeWidth="1.2"
          />
        </svg>
      )}
    </button>
  );
}

export { ActionButton };
