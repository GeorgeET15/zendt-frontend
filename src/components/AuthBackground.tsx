import type  { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function AuthBackground({ children }: Props) {
  return (
    <div className="min-h-screen w-full flex justify-center items-center bg-gradient-to-b from-black via-[#0b0b16] to-black relative overflow-hidden text-white px-6">

      {/* Curved highlight shapes */}
      <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-gradient-to-br from-transparent via-[#1a1a2e44] to-transparent rounded-full opacity-40 blur-2xl" />
      <div className="absolute top-10 right-4 w-[260px] h-[260px] border border-gray-600 opacity-20 rounded-3xl rotate-12" />
      <div className="absolute top-20 right-8 w-[200px] h-[200px] border border-gray-700 opacity-10 rounded-3xl rotate-12" />

      {children}
    </div>
  );
}

