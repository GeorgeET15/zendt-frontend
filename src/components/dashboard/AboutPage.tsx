import { useEffect, useState } from "react";
import BackButton from "./BackButton";
import GradientBlob from "../icons/GradientBlob";
import PageContainer from "./PageContainer";
import { dataService } from "../../services/dataService";

type Value = {
  title: string;
  detail: string;
};

export default function AboutPage() {
  const [values, setValues] = useState<Value[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await dataService.getAboutValues();
      setValues(data);
    };
    fetchData();
  }, []);

  return (
    <PageContainer className="text-white space-y-6">
      <div className="flex items-center justify-between px-4 pt-12 z-0">
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
         <div className="flex justify-between w-full z-1"><BackButton /></div>
      </div>

      <section className="relative rounded-t-[40px] bg-[#141414] shadow-[0_35px_65px_rgba(4,4,7,0.55)] p-6 space-y-6">
        <header className="space-y-2">
          <h2 className="text-[17px] font-light">About Zendt</h2>
          <p className="text-sm text-white/70">
            We help global-first companies accept payments anywhere and settle money where it matters.
          </p>
        </header>

        <div className="space-y-4">
          {values.map((value) => (
            <div key={value.title} className="rounded-3xl border border-white/10 bg-[#1E1E1E] p-4">
              <p className="text-sm uppercase tracking-[0.3em] text-white/50">{value.title}</p>
              <p className="mt-2 text-base text-white/80">{value.detail}</p>
            </div>
          ))}
        </div>
      </section>
    </PageContainer>
  );
}
