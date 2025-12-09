import React from "react";

interface CreditCardProps {
  cardNumber?: string;
  cardHolder?: string;
  expiry?: string;
  /** URL or imported image for the brand (Visa/Mastercard/etc.) */
  brandLogo?: string;
  /** Optional extra classNames for the outer wrapper */
  className?: string;
}

const CreditCard: React.FC<CreditCardProps> = ({
  cardNumber = "1234 5678 ****",
  cardHolder = "John Doe",
  brandLogo = "/assets/mastercard.png",
  className = "",
}) => {
  return (
    <div className={`relative text-[#dddddd] font-[Cairo] ${className}`}>
      <div
        className="relative w-full aspect-[1.586/1] overflow-hidden rounded-[24px] bg-[#161616] border border-white/10 backdrop-blur-xl"
        style={{
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5), inset 0 0 0 1px rgba(255, 255, 255, 0.1), inset 0 1px 0 0 rgba(255, 255, 255, 0.2)"
        }}
      >
        {/* Noise Texture Overlay */}
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}></div>

        
        

        {/* Chip */}
        <div className="absolute top-8 left-8 w-12 h-9 rounded-md bg-gradient-to-br from-[#ffdf86] to-[#d4af37] shadow-inner border border-[#b89425] flex items-center justify-center overflow-hidden z-10">
            <div className="w-full h-[1px] bg-black/20 absolute top-1/3"></div>
            <div className="w-full h-[1px] bg-black/20 absolute top-2/3"></div>
            <div className="h-full w-[1px] bg-black/20 absolute left-1/3"></div>
            <div className="h-full w-[1px] bg-black/20 absolute left-2/3"></div>
            <div className="w-5 h-3 border border-black/20 rounded-[2px]"></div>
        </div>

        {/* Contactless Icon */}
        <div className="absolute top-8 right-8 text-white/60 z-10">
             <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12.55a11 11 0 0 1 14.08 0" />
                <path d="M1.42 9a16 16 0 0 1 21.16 0" />
                <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
                <line x1="12" y1="20" x2="12.01" y2="20" />
             </svg>
        </div>

        {brandLogo && (
          <img src={brandLogo} alt="Card brand" className="absolute right-6 bottom-6 h-8 w-auto object-contain z-10" />
        )}
        
        <div className="absolute bottom-16 left-8 z-10">
             <div className="text-xl font-mono tracking-[0.15em] text-white drop-shadow-md">
                {cardNumber}
             </div>
        </div>

        <div className="absolute bottom-6 left-8 z-10">
            <div className="text-[10px] text-white/60 uppercase tracking-widest mb-0.5">Card Holder</div>
            <div className="text-sm font-medium tracking-widest text-white drop-shadow-md">
                {cardHolder.toUpperCase()}
            </div>
        </div>
      </div>
    </div>
  );
};

export default CreditCard;
