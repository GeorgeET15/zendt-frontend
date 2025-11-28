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
  brandLogo = "https://www.mastercard.com/content/dam/brandcenter/assets/images/logos/mclogo-for-footer.svg",
  className = "",
}) => {
  return (
    <div className={`relative text-[#dddddd] font-[Cairo] ${className}`}>
<div
  className="relative mx-auto shrink-0
    h-[170px] w-[280px] sm:h-[200px] sm:w-[320px]
    overflow-hidden rounded-[20px]
    shadow-[0_0_25px_2px_rgba(0,0,0,0.4)]
    bg-[#161616]
    before:content-['']
    before:absolute
    before:inset-0
    before:bg-[radial-gradient(50%_50%_at_50%_50%,rgba(255,173,122,0.40)_0%,rgba(93,104,157,0.40)_58.08%,rgba(20,35,55,0.40)_200%)]
    before:bg-no-repeat
    before:bg-size-[321px_262px]
    before:bg-position-[-100px_-110px]
    before:opacity-60
    before:blur-2xl"
>

        {brandLogo && (
          <img src={brandLogo} alt="Card brand" className="absolute left-6 top-6 h-6 w-auto" />
        )}
        <div className="absolute bottom-8 right-6 text-[12px] w-5 font-semibold tracking-[0.3em] drop-shadow-[1px_1px_1px_rgba(0,0,0,0.3)]">
          {cardNumber}
        </div>
        <div className="absolute bottom-8 left-6 text-[14px] tracking-[0.2em] drop-shadow-[1px_1px_1px_rgba(0,0,0,0.3)]">
          {cardHolder.toUpperCase()}
        </div>
      </div>
    </div>
  );
};

export default CreditCard;
