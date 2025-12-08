import { useEffect, useState, useMemo } from "react";
import { useAvatar } from "../../context/AvatarContext";
import { dataService } from "../../services/dataService";

type Transaction = {
  id: number;
  name: string;
  amount: number;
  avatar?: string;
  date?: string;
};

type FilterType = "all" | "today" | "week" | "month";
type SortType = "none" | "high" | "low";

export default function DashboardTransactions() {
  const avatarSrc = useAvatar();
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const [filter, setFilter] = useState<FilterType>("all");
  const [sort, setSort] = useState<SortType>("none");

  // Fetch
  useEffect(() => {
    const fetchData = async () => {
      const data = await dataService.getTransactions();
      setTransactions(data.map((t) => ({ ...t, avatar: avatarSrc })));
    };
    fetchData();
  }, [avatarSrc]);

  // Filtering + Sorting
  const filtered = useMemo(() => {
    let list = [...transactions];

    const today = new Date();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay());
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

    const parse = (d?: string) => (d ? new Date(d) : null);

    if (filter === "today") {
      list = list.filter((t) => {
        const dt = parse(t.date);
        return (
          dt &&
          dt.getFullYear() === today.getFullYear() &&
          dt.getMonth() === today.getMonth() &&
          dt.getDate() === today.getDate()
        );
      });
    } else if (filter === "week") {
      list = list.filter((t) => {
        const dt = parse(t.date);
        return dt && dt >= startOfWeek;
      });
    } else if (filter === "month") {
      list = list.filter((t) => {
        const dt = parse(t.date);
        return dt && dt >= startOfMonth;
      });
    }

    if (sort === "high") list.sort((a, b) => b.amount - a.amount);
    else if (sort === "low") list.sort((a, b) => a.amount - b.amount);

    return list;
  }, [transactions, filter, sort]);

  // Minimal tab style
  const tab = (active: boolean) =>
    `text-[11px] tracking-wide cursor-pointer pb-[3px] 
     transition-all
     ${
       active
         ? "text-white border-b border-white/20"
         : "text-white/40 hover:text-white/60"
     }`;

  return (
    <section className="w-full h-screen overflow-hidden text-white">
      <div
        className="
          rounded-b-[32px]
          bg-[#161616]/80
          backdrop-blur-xl
          border border-white/10
          shadow-[0_35px_65px_rgba(4,4,7,0.55)]
          p-10
          h-full
          flex flex-col
        "
      >
        {/* HEADER */}
        <header>
          <h2 className="text-xl font-semibold tracking-wide">All Transactions</h2>
          <span className="text-xs uppercase tracking-[0.35em] text-white/50">
            This Year
          </span>
        </header>

        {/* *** MINIMAL FILTER BAR *** */}
        <div className="flex items-center gap-5 mt-6 mb-4">
          <span className={tab(filter === "all")} onClick={() => setFilter("all")}>
            All
          </span>
          <span className={tab(filter === "today")} onClick={() => setFilter("today")}>
            Today
          </span>
          <span className={tab(filter === "week")} onClick={() => setFilter("week")}>
            Week
          </span>
          <span className={tab(filter === "month")} onClick={() => setFilter("month")}>
            Month
          </span>

          <div className="w-px h-4 bg-white/10 mx-2"></div>

          <span className={tab(sort === "high")} onClick={() => setSort("high")}>
            High ↓
          </span>
          <span className={tab(sort === "low")} onClick={() => setSort("low")}>
            Low ↑
          </span>
        </div>

        <hr className="border-white/10 mb-4" />

        {/* SCROLLABLE LIST */}
        <div className="space-y-4 overflow-y-auto pr-1 flex-1 pb-24">
          {filtered.map((tx) => (
            <div
              key={tx.id}
              className="
                flex items-center justify-between
                px-5 py-4
                rounded-[22px]
                bg-white/[0.04]
                border border-white/5
                backdrop-blur-lg
              "
            >
              <div className="flex items-center gap-4">
                <div className="h-11 w-11 rounded-2xl bg-black/60 overflow-hidden">
                  <img
                    src={tx.avatar}
                    alt={tx.name}
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="flex flex-col">
                  <p className="text-base font-medium tracking-wide">{tx.name}</p>
                  <p className="text-xs text-white/50">{tx.date}</p>
                </div>
              </div>

              <span className="text-lg font-semibold tracking-wide">
                ${tx.amount.toFixed(2)}
              </span>
            </div>
          ))}

          {filtered.length === 0 && (
            <p className="text-center text-white/40 mt-10">No transactions found.</p>
          )}
        </div>
      </div>
    </section>
  );
}
