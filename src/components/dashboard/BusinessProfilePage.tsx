import { Link } from "react-router-dom";
import BackButton from "./BackButton";
import PageContainer from "./PageContainer";

const socials = [
  { platform: "Behance", handle: "Crafts of taste" },
  { platform: "Instagram", handle: "Crafts_of_taste" },
  { platform: "LinkedIn", handle: "Add Account" },
];

export default function BusinessProfilePage() {
  return (
    <PageContainer className="text-white space-y-6">
      <div className="flex items-center justify-between">
        <BackButton />
        <Link
          to="/dashboard/business-profile/edit"
          className="inline-flex h-10 w-10 text-xl items-center justify-center text-white/80 hover:text-white"
        >
          ✎
        </Link>
      </div>

      <div className="space-y-6">
        <div className="flex flex-col items-center gap-4 rounded-[40px] bg-[#0f0f11]/90 border border-white/5 p-6 shadow-[0_35px_65px_rgba(4,4,7,0.55)]">
          <div className="h-28 w-28 rounded-[32px] overflow-hidden bg-black/70">
            <img src="/avatar-placeholder.svg" alt="Crafts of taste" className="h-full w-full object-cover" />
          </div>
          <div className="text-center">
            <h2 className="text-2xl font-semibold">craftsoftaste</h2>
            <p className="text-sm text-white/70">craftsoftaste@gmail.com</p>
            <p className="text-sm text-white/70">+91983784963</p>
            <p className="text-sm text-white/70">craftsoftaste.com</p>
          </div>
        </div>

        <div className="space-y-4 rounded-[32px] bg-[#101014] border border-white/5 p-6">
          <h3 className="text-lg font-light tracking-wide">About business</h3>
          <p className="text-sm text-white/80 leading-relaxed">
            we bring creativity to life through the art of paper crafting. Founded with a passion for handmade beauty, we
            specialize in unique, high-quality paper products—from greeting cards and gift boxes to home decor and DIY kits.
          </p>
        </div>

        <div className="space-y-4 rounded-[32px] bg-[#101014] border border-white/5 p-6">
          <h3 className="text-lg font-light tracking-wide">Social profiles</h3>
          <div className="space-y-3">
            {socials.map((social) => (
              <div
                key={social.platform}
                className="flex items-center justify-between rounded-2xl bg-black/40 px-4 py-3 text-sm"
              >
                <span>{social.platform}</span>
                <span>{social.handle}</span>
              </div>
            ))}
          </div>
          <button className="text-sm text-white/70 hover:text-white">Add Any Socials</button>
        </div>
      </div>
    </PageContainer>
  );
}
