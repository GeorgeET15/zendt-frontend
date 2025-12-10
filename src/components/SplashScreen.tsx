import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import AuthBackground from "./AuthBackground";
import { useAuth } from "../context/AuthContext";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

export default function SplashScreen() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef<any>(null);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard/home", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const slides = [
    {
      id: 1,
      category: "Built For Freelancers",
      description: "India's First Complete Freelancer Finance Stack Designed for creators, developers, designers, and professionals",
    },
    {
      id: 2,
      category: "Get Paid From Anywhere",
      description: "Receive money from 190+ countriesIncluding GCC currencies (QAR, AED, SAR, OMR, BHD, KWD)",
    },
    {
      id: 3,
      category: "Know Your Money",
      description: "Track earnings, clients, invoices, and cash flow All in one dashboard",
    },
  ];

  const handleSkip = () => {
    navigate("/login");
  };

  return (
    <AuthBackground showNavigation={false}>
      {/* Skip Button */}
      <div className="absolute top-6 right-6 z-20">
        {activeIndex < slides.length - 1 && (
          <button
            onClick={handleSkip}
            className="text-white/60 hover:text-white text-sm font-medium transition-colors"
          >
            Skip
          </button>
        )}
      </div>

      {/* Static Title Section */}
      <div className="flex-1 flex flex-col justify-end items-center text-center pb-16 w-full z-10">
        <h1 className="text-3xl font-medium text-white mb-2 tracking-wide uppercase">
          ZENDT
        </h1>
        <h2 className="text-lg text-white/90 font-light">
          Your Global Payments, Simplified
        </h2>
      </div>

      {/* Swiper Carousel */}
      <div className="pb-12 w-full">
        <Swiper
          modules={[Pagination]}
          pagination={{
            clickable: true,
            bulletActiveClass: "!bg-white !opacity-100",
            bulletClass: "swiper-pagination-bullet !bg-white/20 !opacity-100 !w-1.5 !h-1.5 !mx-1 transition-all duration-300",
          }}
          onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
          ref={swiperRef}
          className="w-full max-w-md"
        >
          {slides.map((slide) => (
            <SwiperSlide key={slide.id} className="flex flex-col items-center justify-end px-8 text-center pb-4">
              <div className="mb-4">
                <span className="text-xs uppercase tracking-[0.2em] text-white/60">
                  {slide.category}
                </span>
              </div>
              
              <p className="text-white/50 text-sm leading-relaxed max-w-[280px] mx-auto">
                {slide.description}
              </p>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Pagination Container */}
        <div className="flex justify-center gap-1.5 mt-4 mb-8">
            {slides.map((_, index) => (
                <div 
                    key={index}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                        index === activeIndex ? "w-1.5 bg-white" : "w-1.5 bg-white/20"
                    }`}
                />
            ))}
        </div>

        {/* Get Started Button */}
        <div className="h-12 flex justify-center items-center px-8">
          {activeIndex === slides.length - 1 && (
            <button
              onClick={() => navigate("/login")}
              className="w-full max-w-xs bg-white text-black font-medium py-3 rounded-full hover:bg-gray-100 transition-all animate-in fade-in slide-in-from-bottom-4 duration-500"
            >
              Get Started
            </button>
          )}
        </div>
      </div>
      
      {/* Hide default swiper pagination */}
      <style>{`
        .swiper-pagination { display: none; }
      `}</style>
    </AuthBackground>
  );
}
