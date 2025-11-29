import { useMemo } from "react";
import { useAvatar } from "../../context/AvatarContext";
import CreditCard from "../creditCard";
import PageContainer from "./PageContainer";
import ExpandToggleButton from "./ExpandToggleButton";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const cards = [
  {
    cardNumber: "1234 56** ****",
    cardHolder: "Roberto Augustus",
    brandLogo: "/assets/mastercard.png",
  },
  {
    cardNumber: "9876 54** ****",
    cardHolder: "Crafts of taste",
    brandLogo: "/assets/visa.svg",
  },
  {
    cardNumber: "4455 11** ****",
    cardHolder: "Paper Studio",
    brandLogo: "/assets/amex.svg",
  },
];

export default function CardManagementPage() {
  const avatarSrc = useAvatar();
  const transactionsByCard = useMemo(
    () => [
      [
        { id: 1, name: "Aginaldo", amount: 353.01, avatar: avatarSrc },
        { id: 2, name: "Asha", amount: 421.5, avatar: avatarSrc },
        { id: 3, name: "Komal", amount: 210.0, avatar: avatarSrc },
      ],
      [
        { id: 4, name: "Loren", amount: 125.0, avatar: avatarSrc },
        { id: 5, name: "Miguel", amount: 289.99, avatar: avatarSrc },
      ],
      [
        { id: 6, name: "Dana", amount: 900.45, avatar: avatarSrc },
        { id: 7, name: "Alex", amount: 120.0, avatar: avatarSrc },
        { id: 8, name: "Nina", amount: 75.5, avatar: avatarSrc },
      ],
    ],
    [avatarSrc]
  );
  const currentCard = cards[0];
  const currentTransactions = transactionsByCard[0] ?? [];

  return (
    <PageContainer className="text-white space-y-8">
      <header className="space-y-1">
        <span className="text-2xl font-light">CARD MANAGEMENT</span>
      </header>

      {/* CARD CAROUSEL */}
      <div className="flex items-stretch gap-3 w-full">
        <div className="flex-1">
          <Swiper
            modules={[Navigation]}
            slidesPerView={1}
            spaceBetween={16}
            className="card-swiper"
          >
            {cards.map((card) => (
              <SwiperSlide key={card.cardNumber} className="!w-full">
                <div className="relative w-full max-w-[520px] mx-auto aspect-[16/10]">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <CreditCard
                      className="w-full h-full"
                      cardNumber={card.cardNumber}
                      cardHolder={card.cardHolder}
                      brandLogo={card.brandLogo}
                    />
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className="flex items-stretch justify-center w-12">
          <ExpandToggleButton
            variant="button"
            className="h-full w-10"
            icon={
              <svg
                width="10"
                height="18"
                viewBox="0 0 10 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1.25 1.5L8.5 9L1.25 16.5"
                  stroke="white"
                  strokeLinecap="round"
                />
              </svg>
            }
            onClick={() => {
              const swiperEl = document.querySelector(".card-swiper") as any;
              swiperEl?.swiper?.slideNext();
            }}
          />
        </div>
      </div>

      <section className="rounded-[32px] bg-[#0f1115]/90 border border-white/10 shadow-[0_25px_45px_rgba(4,4,7,0.55)] p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-white/60">
              Recent transactions
            </p>
            <p className="text-xs text-white/60">Linked to this card</p>
          </div>
          <p className="text-emerald-300 text-sm font-semibold">
            ${currentTransactions.reduce((sum, tx) => sum + tx.amount, 0).toFixed(0)}
          </p>
        </div>

        <ul className="space-y-4">
          {currentTransactions.map((tx) => (
            <li key={tx.id} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-2xl bg-black/60 overflow-hidden">
                  <img src={tx.avatar} alt={tx.name} className="h-full w-full object-cover" />
                </div>
                <div>
                  <p className="text-base">{tx.name}</p>
                  <p className="text-xs text-white/60">
                    ••• {currentCard.cardNumber.slice(-4)}
                  </p>
                </div>
              </div>
              <span className="text-base">${tx.amount.toFixed(2)}</span>
            </li>
          ))}
        </ul>
      </section>
    </PageContainer>
  );
}
