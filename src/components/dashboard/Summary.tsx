import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAvatar } from "../../context/AvatarContext";
import DoubleBgBox from "../doubleBgBox";
import ExpandToggleButton from "./ExpandToggleButton";
import PaymentAccordion from "./PaymentAccordion";
import GradientBlob from "../icons/GradientBlob";
import { dataService } from "../../services/dataService";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import CreditCard from "../creditCard";
import { useDashboardSettings } from "../../hooks/useDashboardSettings";

type Transaction = {
  id: number;
  name: string;
  amount: number;
  avatar?: string;
  date?: string;
};

type Wallet = {
  code: string;
  amount: string;
  image: string;
};

type Card = {
  cardNumber: string;
  cardHolder: string;
  brandLogo: string;
};

import WalletActionModal from "./WalletActionModal";

export default function DashboardSummary() {
  const { settings } = useDashboardSettings();
  const avatarSrc = useAvatar();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [wallets, setWallets] = useState<Wallet[]>([]);
  const [cards, setCards] = useState<Card[]>([]);
  const walletScrollRef = useRef<HTMLDivElement | null>(null);
  
  // Modal State
  const [selectedWallet, setSelectedWallet] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleWalletClick = (code: string) => {
    setSelectedWallet(code);
    setIsModalOpen(true);
  };

  // Currency symbols
  const currencySymbols: Record<string, string> = {
    USD: "$",
    EUR: "€",
    GBP: "£",
    INR: "₹",
    JPY: "¥",
    AUD: "A$",
    CAD: "C$",
    CHF: "₣",
    CNY: "¥",
    NZD: "NZ$",
  };

  useEffect(() => {
    const fetchData = async () => {
      const [txs, wals, cardsData] = await Promise.all([
        dataService.getTransactions(),
        dataService.getWallets(),
        dataService.getCards(),
      ]);

      setTransactions(txs.slice(0, 4).map((t) => ({ ...t, avatar: "/avatar-placeholder.svg" })));
      setWallets(wals);
      setCards(cardsData);
    };
    fetchData();
  }, [avatarSrc]);

  useEffect(() => {
    if (wallets.length > 0 && walletScrollRef.current) {
      walletScrollRef.current.scrollLeft = 0;
    }
  }, [wallets]);

  const total = transactions.reduce((sum, tx) => sum + tx.amount, 0);

  const [showSettlementDetails, setShowSettlementDetails] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const update = () =>
      setIsMobile(window.matchMedia("(max-width: 767px)").matches);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const handleWalletNext = () => {
    const container = walletScrollRef.current;
    if (!container) return;

    const card = container.querySelector<HTMLElement>("[data-wallet-card]");
    const cardWidth = card ? card.offsetWidth : 160;
    const gap = 16;

    const maxScrollLeft = container.scrollWidth - container.clientWidth;
    const nextScrollLeft = Math.min(
      container.scrollLeft + cardWidth + gap,
      maxScrollLeft
    );

    container.scrollTo({
      left: nextScrollLeft,
      behavior: "smooth",
    });
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-12 space-y-10">
      <WalletActionModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        walletCode={selectedWallet || ""} 
      />

      <header className="text-left">
        <p className="text-3xl font-light text-white">Hello Roberto !</p>
        <p className="text-white/50 font-extralight text-base">How you doing?</p>
      </header>

      {/* WALLETS */}
      {settings.wallets && (
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-light text-white">WALLETS</h2>
          </div>

          <div className="flex items-center gap-3">

            <div className="flex-1 overflow-hidden">
              <div
                ref={walletScrollRef}
                className="bg-[#141414] flex overflow-x-auto snap-x snap-mandatory scroll-smooth gap-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
              >
                {wallets.map((wallet) => (
                  <div
                    key={wallet.code}
                    data-wallet-card
                    className="snap-start shrink-0 min-w-[calc(33.333%-11px)] cursor-pointer transition-transform active:scale-95"
                    onClick={() => handleWalletClick(wallet.code)}
                  >
                    <DoubleBgBox
                      flagImage={wallet.image}
                      variant="wallet"
                      className="w-full aspect-[130/175] justify-between"
                      topLeft={<span className="text-sm font-semibold">{wallet.code}</span>}
                      bottomLeft={
                        <div className="flex items-baseline gap-1">
                          <span className="text-sm opacity-70">
                            {currencySymbols[wallet.code] ?? wallet.code}
                          </span>
                          <span>{wallet.amount.split(' ')[0]}</span>
                        </div>
                      }
                    />
                  </div>
                ))}

                {/* Add Account */}
                <div data-wallet-card className="snap-start shrink-0 min-w-[calc(33.333%-11px)]">
                  <button className="w-full aspect-[130/175] rounded-[20px] bg-[#181818] border border-white/10 flex items-center justify-center hover:bg-white/5 transition">
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
                          <line x1="12" y1="5" x2="12" y2="19"></line>
                          <line x1="5" y1="12" x2="19" y2="12"></line>
                        </svg>
                      </div>
                      <span className="text-xs text-white/70">Add Account</span>
                    </div>
                  </button>
                </div>
              </div>
            </div>

            <div className="flex items-center">
              <ExpandToggleButton
                variant="button"
                className="w-[38px] h-[135px] bg-[#181818]! rounded-[20px]!"
                icon={
                  <svg xmlns="http://www.w3.org/2000/svg" width="10" height="21" fill="none">
                    <path
                      d="M0.5 0.5L7.67158 7.67158C9.23367 9.23367 9.23367 11.7663 7.67157 13.3284L0.5 20.5"
                      stroke="#5B5B5B"
                      strokeLinecap="round"
                    />
                  </svg>
                }
                onClick={handleWalletNext}
              />
            </div>

          </div>
        </section>
      )}

      {/* BALANCE + SETTLEMENT */}
      <section className="grid grid-cols-2 gap-4">
        <DoubleBgBox className="justify-between" arcColor="#272727">
          <div className="text-left text-white space-y-2">
            <div className="leading-tight">
              <p className="text-[11px] uppercase tracking-[0.2em]">Current</p>
              <p className="text-lg font-semibold">Balance</p>
            </div>
            <p className="text-lg font-semibold">Rs 1,00,000</p>
          </div>
        </DoubleBgBox>

        <button
          type="button"
          onClick={() => {
            if (isMobile) navigate("/dashboard/settlement");
            else setShowSettlementDetails((prev) => !prev);
          }}
          aria-expanded={showSettlementDetails}
          className="text-left w-full"
        >
          <DoubleBgBox className="justify-between" arcColor="#272727">
            <div className="text-left text-white space-y-2 pt-[13px]">
              <p className="text-[11px] uppercase tracking-[0.2em]">Last</p>
              <p className="text-lg font-semibold">Settlement</p>
              <p className="text-[14px] font-semibold">$24,000</p>
              <p className="text-[7px] text-white/60 uppercase">Deposited on July 10th</p>
            </div>
          </DoubleBgBox>
        </button>
      </section>

      {!isMobile && showSettlementDetails && (
        <div className="space-y-3">
          <PaymentAccordion />
        </div>
      )}

      {/* RECENT TRANSACTIONS */}
      {settings.transactions && (
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
              <span className="text-emerald-400">${total.toFixed(0)}</span>
            </div>
            <hr className="border-t border-white/10" />
          </header>

          <ul className="space-y-4">
            {transactions.map((tx) => (
              <li key={tx.id} className="flex items-center justify-between text-sm text-gray-200">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-2xl bg-[#141414]/60 overflow-hidden">
                    <img src={tx.avatar} alt={tx.name} className="h-full w-full object-cover" />
                  </div>
                  <span className="text-base text-white">{tx.name}</span>
                </div>
                <span className="text-base">${tx.amount.toFixed(2)}</span>
              </li>
            ))}
          </ul>

          <div className="mt-10 text-center">
            <Link to="/dashboard/transactions" className="text-sm text-white/80 hover:text-white">
              View all transaction
            </Link>
          </div>
        </section>
      )}

      {/* AVAILABLE CARDS */}
      {settings.cards && cards.length > 0 && (
        <section className="space-y-4 mb-20">
          <div className="flex items-center justify-between pr-4">
            <h2 className="text-2xl font-light text-white">Available Cards</h2>
            {cards.length > 1 && (
              <div className="flex items-center gap-2 text-white/40 text-xs uppercase tracking-wider">
                <span>Swipe</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </div>
            )}
          </div>
          <Swiper
            modules={[Navigation]}
            slidesPerView={1}
            spaceBetween={16}
            className="w-full"
          >
            {cards.map((card, index) => (
              <SwiperSlide key={card.cardNumber}>
                <div 
                  className="w-full max-w-[400px] mx-auto cursor-pointer"
                  onClick={() => navigate("/dashboard/card-management", { state: { initialCardIndex: index } })}
                >
                  <CreditCard
                    cardNumber={card.cardNumber}
                    cardHolder={card.cardHolder}
                    brandLogo={card.brandLogo}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </section>
      )}
    </div>
  );
}
