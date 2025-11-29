import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAvatar } from "../../context/AvatarContext";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import DoubleBgBox from "../doubleBgBox";
import ExpandToggleButton from "./ExpandToggleButton";
import PaymentAccordion from "./PaymentAccordion";
import "swiper/css";
import "swiper/css/navigation";

export default function DashboardSummary() {
  const avatarSrc = useAvatar();
  const transactions = useMemo(
    () => [
      { id: 1, name: "Aginaldo", amount: 353.01, avatar: avatarSrc },
      { id: 2, name: "Aginaldo", amount: 353.01, avatar: avatarSrc },
      { id: 3, name: "Aginaldo", amount: 353.01, avatar: avatarSrc },
      { id: 4, name: "Aginaldo", amount: 353.01, avatar: avatarSrc },
    ],
    [avatarSrc]
  );
  const total = transactions.reduce((sum, tx) => sum + tx.amount, 0);

  const wallets = [
    { code: "INR", amount: "23,098 rs", image: "/india.png" },
    { code: "USD", amount: "203 usd", image: "/usa.png" },
    { code: "AED", amount: "2,234 aed", image: "/uae.png" },
    { code: "EUR", amount: "560 eur", image: "/euro.png" },
  ];

  const [showSettlementDetails, setShowSettlementDetails] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const navigate = useNavigate();

  // mobile detection for settlement behavior (unchanged)
  useEffect(() => {
    const update = () => setIsMobile(window.matchMedia("(max-width: 767px)").matches);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-12 space-y-10">
      <header className="text-left">
        <p className="text-3xl font-light text-white">Hello Roberto !</p>
        <p className="text-white/50 font-extralight text-base ">How you doing?</p>
      </header>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-light text-white">WALLETS</h2>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex-1 overflow-hidden">
            <Swiper
              modules={[Navigation]}
              slidesPerView={3}
              slidesPerGroup={3}
              spaceBetween={16}
              className="wallet-swiper"
              breakpoints={{
                0: { slidesPerView: 1, slidesPerGroup: 1 },
                600: { slidesPerView: 2, slidesPerGroup: 2 },
                900: { slidesPerView: 3, slidesPerGroup: 3 },
              }}
            >
              {wallets.map((wallet) => (
                <SwiperSlide key={wallet.code} className="!w-auto">
                  <DoubleBgBox
                    flagImage={wallet.image}
                    variant="wallet"
                    topLeft={<span className="text-sm font-semibold">{wallet.code}</span>}
                    bottomLeft={wallet.amount}
                    className="justify-between"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <div className="flex items-center">
            <ExpandToggleButton
              variant="button"
              className="h-14 w-10"
              icon={
                <svg width="10" height="18" viewBox="0 0 10 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1.25 1.5L8.5 9L1.25 16.5" stroke="white" strokeLinecap="round" />
                </svg>
              }
              onClick={() => {
                const swiperEl = document.querySelector(".wallet-swiper") as any;
                swiperEl?.swiper?.slideNext();
              }}
            />
          </div>
        </div>
      </section>

      <section className="grid grid-cols-2 gap-4">
        <DoubleBgBox className="justify-between">
          <div className="text-left text-white space-y-2">
            <div className="leading-tight">
              <p className="text-[11px] sm:text-xs uppercase tracking-[0.2em] text-white/70">Current</p>
              <p className="text-xl sm:text-2xl font-semibold tracking-[0.08em]">Balance</p>
            </div>
            <p className="text-lg sm:text-2xl font-semibold">Rs 1,00,000</p>
          </div>
        </DoubleBgBox>

        <button
          type="button"
          onClick={() => {
            if (isMobile) {
              navigate("/dashboard/settlement");
              return;
            }
            setShowSettlementDetails((prev) => !prev);
          }}
          aria-expanded={showSettlementDetails}
          className="text-left w-full"
        >
          <DoubleBgBox className="justify-between">
            <div className="text-left text-white space-y-2 pt-[26px]">
              <div className="leading-tight">
                <p className="text-[11px] sm:text-xs uppercase tracking-[0.2em] text-white/70">Last</p>
                <p className="text-xl sm:text-2xl font-semibold tracking-[0.08em]">Settlement</p>
              </div>
              <div className="space-y-1">
                <p className="text-lg sm:text-2xl font-semibold">$24,000</p>
                <p className="text-[10px] sm:text-xs tracking-[0.08em] text-white/60 uppercase">Deposited on July 10th</p>
              </div>
            </div>
          </DoubleBgBox>
        </button>
      </section>

      {!isMobile && showSettlementDetails && (
        <div className="space-y-3">
          <PaymentAccordion />
        </div>
      )}

      <section className="rounded-[32px] bg-gradient-to-br from-[#0d1017] via-[#11161f] to-[#07080a] p-8 text-left text-white shadow-[0_30px_45px_rgba(4,4,7,0.55)] border border-white/5">
        <header className="flex flex-col gap-2 mb-6">
          <h3 className="text-xl font-semibold">Recent transaction</h3>
          <div className="flex items-center justify-between text-xs uppercase tracking-[0.35em] text-gray-400">
            <span className="tracking-tighter">THIS MONTH</span>
            <span className="text-emerald-400 tracking-normal">
              ${total.toFixed(0)}
            </span>
          </div>
          <hr className="border-t border-white/10" />
        </header>

        <ul className="space-y-4">
          {transactions.map((tx) => (
            <li key={tx.id} className="flex items-center justify-between text-sm text-gray-200">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-2xl bg-black/60 overflow-hidden">
                  <img src={tx.avatar} alt={tx.name} className="h-full w-full object-cover" />
                </div>
                <span className="text-base text-white">{tx.name}</span>
              </div>
              <span className="text-base tracking-wide">${tx.amount.toFixed(2)}</span>
            </li>
          ))}
        </ul>

        <div className="mt-10 text-center">
          <Link
            to="/dashboard/transactions"
            className="text-sm text-white/80 hover:text-white transition"
          >
            View all transaction
          </Link>
        </div>
      </section>
    </div>
  );
}
