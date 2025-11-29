interface ExpandToggleButtonProps {
  isOpen?: boolean;
  onClick: () => void;
  icon?: React.ReactNode;
  className?: string;
  variant?: "toggle" | "button";
}

export default function ExpandToggleButton({
  isOpen,
  onClick,
  icon,
  className,
  variant = "toggle",
}: ExpandToggleButtonProps) {
  const content =
    icon ??
    (isOpen ? (
      <svg xmlns="http://www.w3.org/2000/svg" width="27" height="13" viewBox="0 0 27 13" fill="none">
        <path d="M26.5 0.5L16.3284 10.6716C14.7663 12.2337 12.2337 12.2337 10.6716 10.6716L0.499999 0.5" stroke="white" strokeLinecap="round" />
      </svg>
    ) : (
      <svg xmlns="http://www.w3.org/2000/svg" width="13" height="27" viewBox="0 0 13 27" fill="none">
        <path d="M0.5 0.5L10.6716 10.6716C12.2337 12.2337 12.2337 14.7663 10.6716 16.3284L0.5 26.5" stroke="white" strokeLinecap="round" />
      </svg>
    ));

  const ariaProps =
    variant === "toggle"
      ? {
          "aria-expanded": Boolean(isOpen),
        }
      : undefined;

  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "h-[135px]  w-[38px] rounded-[21px] bg-[rgba(42,42,42,0.6)] backdrop-blur-[19px] flex justify-center items-center cursor-pointer shrink-0",
        className,
      ].join(" ")}
      {...ariaProps}
    >
      {content}
    </button>
  );
}
