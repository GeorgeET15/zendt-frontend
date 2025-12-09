import { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import { useAvatar } from "../../context/AvatarContext";
import CreditCard from "../creditCard";
import PageContainer from "./PageContainer";
import ExpandToggleButton from "./ExpandToggleButton";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { dataService } from "../../services/dataService";
import GradientBlob from "../icons/GradientBlob";

type Card = {
  cardNumber: string;
  cardHolder: string;
  brandLogo: string;
};

export default function CardManagementPage() {
  const location = useLocation();
  const initialIndex = (location.state as { initialCardIndex?: number })?.initialCardIndex ?? 0;

  const avatarSrc = useAvatar();
  const [cards, setCards] = useState<Card[]>([]);
  const [selectedCardIndex, setSelectedCardIndex] = useState(initialIndex);

  useEffect(() => {
    const fetchData = async () => {
      const data = await dataService.getCards();
      setCards(data);
    };
    fetchData();
  }, []);

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
  
  // Handle case where cards are loading
  if (cards.length === 0) {
    return <PageContainer className="text-white space-y-8"><div className="p-6">Loading...</div></PageContainer>;
  }

  const currentCard = cards[selectedCardIndex];
  const currentTransactions = transactionsByCard[selectedCardIndex] ?? [];

  return (
    <PageContainer className="text-white space-y-8">
      <div className="px-6 pt-10">
        <header className="space-y-1 mb-5">
          <span className="text-2xl font-light ">CARD MANAGEMENT</span>
        </header>

        {/* CARD CAROUSEL */}
        <div className="flex items-stretch gap-3 w-full mb-5">
          <div className="flex-1">
            <Swiper
              initialSlide={initialIndex}
              modules={[Navigation]}
              slidesPerView={1}
              spaceBetween={16}
              className="card-swiper"
              onSlideChange={(swiper) => setSelectedCardIndex(swiper.activeIndex)}
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
              className="h-full w-10 cursor-pointer bg-[#181818]! rounded-[10px]"
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="10"
                  height="21"
                  viewBox="0 0 10 21"
                  fill="none"
                >
                  <path
                    d="M0.5 0.5L7.67158 7.67158C9.23367 9.23367 9.23367 11.7663 7.67157 13.3284L0.5 20.5"
                    stroke="#5B5B5B"
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

        <section className="relative overflow-hidden rounded-[19px] p-8 mb-9 text-left text-white bg-[#161616]">
          <GradientBlob
            className="absolute opacity-30 blur-2xl -z-10"
            style={{
              right: "-100px",
              top: "-50px",
              width: "321px",
              height: "262px",
              zIndex: "0",
            }}
          />
          <header className="flex flex-col gap-2 mb-6">
            <h3 className="text-xl font-semibold">Recent transaction</h3>
            <div className="flex items-center justify-between text-xs uppercase tracking-[0.35em] text-gray-400">
              <span>THIS MONTH</span>
              <span className="text-emerald-400">
                $
                {currentTransactions
                  .reduce((sum, tx) => sum + tx.amount, 0)
                  .toFixed(0)}
              </span>
            </div>
            <hr className="border-t border-white/10" />
          </header>

          <ul className="space-y-4">
            {currentTransactions.map((tx) => (
              <li key={tx.id} className="flex items-center justify-between text-sm text-gray-200">
                <div className="flex items-center gap-3">
                  <div>
                    <p className="text-base text-white">{tx.name}</p>
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
      </div>
    </PageContainer>
  );
}
