export default function BankAccountSkeleton() {
  return (
    <div className="space-y-8 animate-pulse">
      {[1, 2, 3].map((i) => (
        <div key={i} className="space-y-3">
          {/* Card Skeleton */}
          <div className="rounded-[28px] bg-[#1E1E1E] p-5 h-[140px]">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-white/10" />
                <div className="space-y-2">
                  <div className="h-4 w-24 bg-white/10 rounded" />
                  <div className="h-3 w-16 bg-white/5 rounded" />
                </div>
              </div>
              <div className="w-10 h-10 rounded-full bg-white/10" />
            </div>
            <div className="h-3 w-32 bg-white/5 rounded" />
          </div>

          {/* Buttons Skeleton */}
          <div className="flex gap-3 px-1">
            <div className="flex-1 h-12 rounded-[14px] bg-[#1E1E1E]" />
            <div className="flex-1 h-12 rounded-[14px] bg-[#1E1E1E]" />
          </div>
        </div>
      ))}
    </div>
  );
}
