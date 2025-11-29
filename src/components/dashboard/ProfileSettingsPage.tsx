import { useState } from "react";
import BackButton from "./BackButton";
import PageContainer from "./PageContainer";

const initialProfile = {
  firstName: "Roberto",
  lastName: "Augustus",
  email: "robertoaugustus@gmail.com",
  phone: "+1 232 343 4545",
};

export default function ProfileSettingsPage() {
  const [profile, setProfile] = useState(initialProfile);

  const handleChange =
    (key: keyof typeof initialProfile) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setProfile({ ...profile, [key]: event.target.value });
    };

  return (
    <PageContainer className="text-white space-y-6">
           <div className="flex items-center justify-between px-4 pt-6 z-0">
             <div                      className="absolute opacity-60 blur-2xl -z-10"
                     style={{
                       right: "82px",
                       top: "-20px",
                       width: "321px",
                       height: "262px", zIndex: "0",
                       
                       background:
                         "radial-gradient(50% 50% at 50% 50%, rgba(255,173,122,0.40) 0%, rgba(93,104,157,0.40) 58.08%, rgba(20,35,55,0.40) 200%)",
                     }}></div>
           <div className="flex justify-between w-full z-1"><BackButton /></div>
           </div>
      <section className="rounded-[32px] bg-[#0f1014]/90 border border-white/5 shadow-[0_35px_65px_rgba(4,4,7,0.55)] p-6 space-y-6">
        <header className="space-y-2">
          <h2 className="text-[17px] font-light">Profile settings</h2>
          <p className="text-sm text-white/70">Update the contact information tied to your Zendt account.</p>
        </header>

        <div className="space-y-5">
          {(
            [
              { key: "firstName", label: "First name" },
              { key: "lastName", label: "Last name" },
              { key: "email", label: "Email" },
              { key: "phone", label: "Phone number" },
            ] as const
          ).map((field) => (
            <label key={field.key} className="flex flex-col gap-2 text-sm uppercase tracking-[0.3em] text-white/60">
              {field.label}
              <input
                type="text"
                value={profile[field.key]}
                onChange={handleChange(field.key)}
                className="rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-base text-white focus:border-white/40 focus:outline-none"
              />
            </label>
          ))}
        </div>

        <div className="flex items-center justify-end gap-3">
          <button type="button" className="rounded-full border border-white/20 px-5 py-2 text-sm text-white/70 hover:border-white/40">
            Cancel
          </button>
          <button type="button" className="rounded-full border border-white/10 bg-white/10 px-5 py-2 text-sm text-white hover:bg-white/20">
            Save changes
          </button>
        </div>
      </section>
    </PageContainer>
  );
}
