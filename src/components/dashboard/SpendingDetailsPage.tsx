import { useState, useEffect } from "react";
import BackButton from "./BackButton";
import GradientBlob from "../icons/GradientBlob";
import PageContainer from "./PageContainer";
import { ShoppingBag, Utensils, Car, Film } from "lucide-react";

// Mock Data for the graph
const spendingData = [
  { day: "1", amount: 45, label: "Sep 1" },
  { day: "5", amount: 120, label: "Sep 5" },
  { day: "10", amount: 80, label: "Sep 10" },
  { day: "15", amount: 250, label: "Sep 15" },
  { day: "20", amount: 160, label: "Sep 20" },
  { day: "25", amount: 90, label: "Sep 25" },
  { day: "30", amount: 310, label: "Sep 30" },
];

export default function SpendingDetailsPage() {
  const [activePoint, setActivePoint] = useState<number | null>(3);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
  }, []);

  // Graph dimensions
  const width = 340;
  const height = 200;
  const padding = 20;
  const maxAmount = Math.max(...spendingData.map((d) => d.amount));

  // Helper to calculate coordinates
  const getX = (index: number) =>
    padding + (index / (spendingData.length - 1)) * (width - 2 * padding);
  const getY = (amount: number) =>
    height - padding - (amount / maxAmount) * (height - 2 * padding);

  // Generate path for the line
  const pathData = spendingData
    .map((d, i) => `${i === 0 ? "M" : "L"} ${getX(i)} ${getY(d.amount)}`)
    .join(" ");

  // Generate area path (for gradient fill)
  const areaPathData = `${pathData} L ${getX(spendingData.length - 1)} ${height} L ${getX(0)} ${height} Z`;

  return (
    <PageContainer className="text-white space-y-6">
      {/* Header Section */}
      <div className="flex items-center justify-between px-4 pt-12 relative">
        <GradientBlob
          className="absolute opacity-60 blur-2xl -z-10"
          style={{
            right: "82px",
            top: "-50px",
            width: "321px",
            height: "262px",
            zIndex: "0",
          }}
        />
        <div className="flex w-full z-10">
          <BackButton />
        </div>
      </div>

      {/* Main Content */}
      <div className="pt-6 relative rounded-t-[48px] px-4 pb-24 bg-[#141414] z-10 min-h-[calc(100vh-100px)]">
        <header className="mb-8 pl-2 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <h1 className="text-[13px] font-medium tracking-[0.12em] text-white/60 uppercase mb-1">
            Spending Analysis
          </h1>
          <h2 className="text-3xl font-light text-white">September Spends</h2>
          <p className="text-white/50 text-sm mt-2">Total spent: <span className="text-white font-medium">$1,055.00</span></p>
        </header>

        {/* Interactive Graph Card */}
        <div className="rounded-[32px] bg-[#1E1E1E] p-6 shadow-lg border border-white/5 relative overflow-hidden animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-100">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-light">Overview</h3>
            <select className="bg-white/5 border border-white/10 rounded-full px-3 py-1 text-xs text-white/70 outline-none">
              <option>This Month</option>
              <option>Last Month</option>
            </select>
          </div>

          {/* SVG Graph */}
          <div 
            className="relative h-[200px] w-full select-none touch-none"
            onMouseMove={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const x = e.clientX - rect.left;
              const index = Math.min(Math.max(Math.round((x - padding) / ((width - 2 * padding) / (spendingData.length - 1))), 0), spendingData.length - 1);
              setActivePoint(index);
            }}
            onTouchMove={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const x = e.touches[0].clientX - rect.left;
              const index = Math.min(Math.max(Math.round((x - padding) / ((width - 2 * padding) / (spendingData.length - 1))), 0), spendingData.length - 1);
              setActivePoint(index);
            }}
            onMouseLeave={() => setActivePoint(null)}
            onTouchEnd={() => setTimeout(() => setActivePoint(null), 2000)}
          >
            <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`} className="overflow-visible">
              <defs>
                <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#fff" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#fff" stopOpacity="0" />
                </linearGradient>
                <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Area Fill with animation */}
              <path 
                d={areaPathData} 
                fill="url(#gradient)" 
                className={`transition-opacity duration-1000 ${animate ? 'opacity-100' : 'opacity-0'}`}
              />

              {/* Vertical Cursor Line */}
              {activePoint !== null && (
                <line
                  x1={getX(activePoint)}
                  y1={0}
                  x2={getX(activePoint)}
                  y2={height}
                  stroke="white"
                  strokeWidth="1"
                  strokeDasharray="4 4"
                  className="opacity-50"
                />
              )}

              {/* Line with drawing animation and glow */}
              <path
                d={pathData}
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                filter="url(#glow)"
                strokeDasharray="1000"
                strokeDashoffset={animate ? "0" : "1000"}
                className="transition-all duration-[2000ms] ease-out"
              />

              {/* Interactive Points */}
              {spendingData.map((d, i) => (
                <g key={i}>
                  {/* Visible Point */}
                  <circle
                    cx={getX(i)}
                    cy={getY(d.amount)}
                    r={activePoint === i ? 6 : 0}
                    fill="white"
                    className={`transition-all duration-300 ${animate ? 'opacity-100' : 'opacity-0'}`}
                    style={{ transitionDelay: `${i * 100}ms` }}
                  />
                  {/* Pulse effect removed as per request */}
                </g>
              ))}
            </svg>

            {/* Tooltip */}
            {activePoint !== null && (
              <div
                className="absolute bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-medium px-3 py-2 rounded-xl shadow-xl transform -translate-x-1/2 -translate-y-full pointer-events-none transition-all duration-100 animate-in fade-in zoom-in-95"
                style={{
                  left: `${(getX(activePoint) / width) * 100}%`,
                  top: `${(getY(spendingData[activePoint].amount) / height) * 100}%`,
                  marginTop: "-16px",
                }}
              >
                <div className="text-[10px] text-white/60 mb-0.5 uppercase tracking-wider">{spendingData[activePoint].label}</div>
                <div className="text-lg font-light">${spendingData[activePoint].amount}</div>
              </div>
            )}
          </div>
        </div>

        {/* Breakdown Stats */}
        <div className="mt-8 space-y-4 animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-300">
          <h3 className="text-lg font-light px-2">Top Categories</h3>
          <div className="space-y-3">
            {[
              { name: "Shopping", amount: "$450", percent: "45%", color: "bg-blue-500", icon: ShoppingBag },
              { name: "Food & Dining", amount: "$320", percent: "30%", color: "bg-orange-500", icon: Utensils },
              { name: "Transport", amount: "$180", percent: "15%", color: "bg-green-500", icon: Car },
              { name: "Entertainment", amount: "$105", percent: "10%", color: "bg-purple-500", icon: Film },
            ].map((cat) => (
              <div key={cat.name} className="relative overflow-hidden flex items-center justify-between bg-[#1E1E1E] p-4 rounded-[24px] border border-white/5 group active:scale-[0.98] transition-all">
                {/* Progress Bar Background */}
                <div 
                  className={`absolute left-0 top-0 bottom-0 ${cat.color} opacity-5 transition-all duration-1000 ease-out`}
                  style={{ width: animate ? cat.percent : '0%' }}
                />
                
                <div className="flex items-center gap-4 relative z-10">
                  <div className={`w-10 h-10 rounded-full ${cat.color} bg-opacity-20 flex items-center justify-center`}>
                    <cat.icon className={`w-5 h-5 ${cat.color.replace('bg-', 'text-')}`} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white/90">{cat.name}</p>
                    <p className="text-xs text-white/40">{cat.percent} of total</p>
                  </div>
                </div>
                <span className="text-sm font-medium relative z-10">{cat.amount}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
