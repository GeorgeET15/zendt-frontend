import { useMemo } from "react";
import { useAvatar } from "../../context/AvatarContext";

export default function DashboardTransactions() {
  const avatarSrc = useAvatar();
  const transactions = useMemo(
    () =>
      Array.from({ length: 12 }, (_, index) => ({
        id: index + 1,
        name: `Aginaldo ${index + 1}`,
        amount: 353.01,
        avatar: avatarSrc,
        date: "24 Apr 2024",
      })),
    [avatarSrc]
  );

  return (
    <section className="space-y-6">
      <div className="rounded-[32px] bg-gradient-to-br from-[#0a0b11] via-[#10131c] to-[#050608] p-10 text-white shadow-[0_30px_45px_rgba(4,4,7,0.6)] border border-white/5">
        <header className="mb-8 flex items-center justify-between">
          <h2 className="text-2xl font-semibold">All transactions</h2>
          <span className="text-sm uppercase tracking-[0.35em] text-gray-400">
            This year
          </span>
        </header>

        <div className="grid gap-4">
          {transactions.map((tx) => (
            <div
              key={tx.id}
              className="flex items-center justify-between rounded-2xl bg-white/5 px-4 py-3 text-sm"
            >
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-2xl bg-black/60 overflow-hidden">
                  <img src={tx.avatar} alt={tx.name} className="h-full w-full object-cover" />
                </div>
                <div>
                  <p className="text-base font-medium text-white">{tx.name}</p>
                  <p className="text-xs text-gray-400">{tx.date}</p>
                </div>
              </div>
              <span className="text-lg">${tx.amount.toFixed(2)}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
