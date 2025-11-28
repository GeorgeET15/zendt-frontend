import { useMemo, useState } from "react";
import { useAvatar } from "../../context/AvatarContext";
import CreditCard from "../creditCard";
import PageContainer from "./PageContainer";
import ExpandToggleButton from "./ExpandToggleButton";

const cards = [
  {
    cardNumber: "1234 56** ****",
    cardHolder: "Roberto Augustus",
    brandLogo:
      "https://www.mastercard.com/content/dam/brandcenter/assets/images/logos/mclogo-for-footer.svg",
  },
  {
    cardNumber: "9876 54** ****",
    cardHolder: "Crafts of taste",
    brandLogo: "https://upload.wikimedia.org/wikipedia/commons/0/04/Visa.svg",
  },
  {
    cardNumber: "4455 11** ****",
    cardHolder: "Paper Studio",
    brandLogo:
      "https://upload.wikimedia.org/wikipedia/commons/b/b7/American_Express_logo_%282018%29.svg",
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
  const [cardIndex, setCardIndex] = useState(0);
  const canPrev = cardIndex > 0;
  const canNext = cardIndex < cards.length - 1;
  const currentCard = cards[cardIndex];
  const currentTransactions = transactionsByCard[cardIndex] ?? [];

  return (
    <PageContainer className="text-white space-y-8">
      <header className="space-y-1">
        <p className="text-sm text-white/60 uppercase tracking-[0.35em]">
          Card management
        </p>
        <h1 className="text-3xl font-semibold">Hello Roberto!</h1>
        <p className="text-white/60">
          Manage your cards and review the latest transactions.
        </p>
      </header>

      {/* CARD CAROUSEL */}
      <div className="flex items-center justify-center">
        {/* Left column: fixed size, arrow or empty */}
        <div className="flex items-center justify-center h-12 w-10 z-10">
          {canPrev && (
            <ExpandToggleButton
              variant="button"
              className="h-12 w-10"
              icon={
                <svg
                  width="10"
                  height="18"
                  viewBox="0 0 10 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8.75 16.5L1.5 9L8.75 1.5"
                    stroke="white"
                    strokeLinecap="round"
                  />
                </svg>
              }
              onClick={() => setCardIndex((prev) => Math.max(0, prev - 1))}
            />
          )}
        </div>

        {/* Center column: flex-1, card always centered */}
        <div className="flex-1 flex justify-center">
          <div className="w-full max-w-[300px] sm:max-w-[320px] overflow-hidden">
            <div
              className="flex transition-transform duration-300 ease-in-out"
              style={{ transform: `translateX(-${cardIndex * 100}%)` }}
            >
              {cards.map((card) => (
                <div
                  key={card.cardNumber}
                  className="min-w-full flex justify-center"
                  data-card-slide
                >
                  <CreditCard
                    className="max-w-[320px] w-full"
                    cardNumber={card.cardNumber}
                    cardHolder={card.cardHolder}
                    brandLogo={card.brandLogo}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right column: fixed size, arrow or empty */}
        <div className="flex items-center justify-center h-12 w-10 z-10">
          {canNext && (
            <ExpandToggleButton
              variant="button"
              className="h-12 w-10"
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
              onClick={() => setCardIndex((prev) => Math.min(cards.length - 1, prev + 1))}
            />
          )}
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
