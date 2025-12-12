import PageContainer from "./PageContainer";

export default function VirtualAccountSkeleton() {
  return (
    <PageContainer className="text-white space-y-6">
      <div className="animate-pulse">

        {/* Dropdown Section */}
        <div className="px-4 mb-6">
          <div className="h-3 w-24 bg-white/10 rounded mb-2" />
          <div className="h-[76px] rounded-[14px] bg-[#1E1E1E] border border-white/5" />
        </div>

        {/* Details Card */}
        <div className="px-4">
          <div className="rounded-[28px] bg-[#1E1E1E] p-5 space-y-6 min-h-[400px]">
            {/* Card Header */}
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-[14px] bg-white/10" />
              <div className="space-y-2">
                <div className="h-4 w-32 bg-white/10 rounded" />
                <div className="h-3 w-24 bg-white/5 rounded" />
              </div>
            </div>

            {/* Location Cards Placeholders */}
            <div className="space-y-3">
              <div className="h-[60px] rounded-[14px] bg-[#2E2E2E]/50" />
              <div className="h-[60px] rounded-[14px] bg-[#2E2E2E]/50" />
            </div>

            {/* Details List */}
            <div className="space-y-3 bg-[#2E2E2E]/50 rounded-[18px] px-4 py-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex justify-between items-center py-1">
                  <div className="h-3 w-24 bg-white/5 rounded" />
                  <div className="h-3 w-32 bg-white/10 rounded" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
