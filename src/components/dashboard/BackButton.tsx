import { useNavigate } from "react-router-dom";

export default function BackButton() {
  const navigate = useNavigate();

  const handleClick = () => {
    const entryIdx = Number(sessionStorage.getItem("dashboardEntryIdx") ?? 0);
    const currentIdx = window.history.state?.idx ?? 0;

    if (currentIdx > entryIdx) {
      navigate(-1);
    } else {
      navigate("/dashboard/home");
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="inline-flex h-10 w-10 items-center justify-center rounded-full text-white/60 hover:scale-105 hover:text-white focus-visible:outline-none"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="13" height="27" viewBox="0 0 13 27" fill="none">
        <path
          d="M11.8433 26.5L1.67169 16.3284C0.109592 14.7663 0.109592 12.2337 1.67169 10.6716L11.8433 0.499999"
          stroke="currentColor"
          strokeLinecap="round"
        />
      </svg>
    </button>
  );
}
