import { useState } from "react";
import type { FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthBackground from "./AuthBackground";
import { requestSignup, verifyTwoFactor } from "../services/auth";

type SignupPhase = "form" | "twoFactor";

export default function Signup() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phase, setPhase] = useState<SignupPhase>("form");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [twoFactorToken, setTwoFactorToken] = useState("");
  const [twoFactorCode, setTwoFactorCode] = useState("");
  const [twoFactorHint, setTwoFactorHint] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!firstName || !lastName || !email || !password) {
      setError("Fill out all fields to continue.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      const response = await requestSignup({ firstName, lastName, email, password });
      setTwoFactorToken(response.twoFactorToken);
      setTwoFactorHint(response.demoCode ?? "Check your email for the code.");
      setPhase("twoFactor");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Signup failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleTwoFactor = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!twoFactorCode.trim()) {
      setError("Enter the verification code.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      await verifyTwoFactor({ twoFactorToken, code: twoFactorCode });
      navigate("/dashboard/home", { state: { showKycToast: true } });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Verification failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthBackground showNavigation={false}>
      <div className="flex min-h-screen w-full items-end justify-center pb-5 overflow-y-scroll no-scrollbar">
        <div className="w-full max-w-xs mx-auto">
        <h2 className="text-center text-[20px] font-light mb-8">
          {phase === "form" ? "Sign up" : "Verify your account"}
        </h2>

        {phase === "form" ? (
          <form onSubmit={handleSignup} className="space-y-6 mb-4">
            <input
              placeholder="First name"
              value={firstName}
              onChange={(event) => setFirstName(event.target.value)}
              className="w-full bg-transparent border-b border-gray-500 focus:border-gray-300 outline-none py-2"
            />
            <input
              placeholder="Last name"
              value={lastName}
              onChange={(event) => setLastName(event.target.value)}
              className="w-full bg-transparent border-b border-gray-500 focus:border-gray-300 outline-none py-2"
            />
            <input
              placeholder="E-mail"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="w-full bg-transparent border-b border-gray-500 focus:border-gray-300 outline-none py-2"
            />
            <input
              placeholder="Password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full bg-transparent border-b border-gray-500 focus:border-gray-300 outline-none py-2"
            />

            {error && <p className="text-xs text-red-400">{error}</p>}

            <div className="flex justify-between items-center">
              <button
                type="submit"
                disabled={loading}
                className="flex items-center justify-between bg-[#141414] text-white border border-gray-600 rounded-full py-0.5 pl-2 pr-0.5 w-24 disabled:opacity-50"
              >
                <span className="text-sm">{loading ? "..." : "Signup"}</span>
                <span className="w-7 h-7 bg-gray-300 text-black rounded-full flex items-center justify-center text-sm">
                  ➜
                </span>
              </button>

              <div className="text-right text-xs text-white">
                Already have account?{" "}
                <Link to="/login" className="text-gray-400 underline">
                  Login
                </Link>
              </div>
            </div>
          </form>
        ) : (
          <form onSubmit={handleTwoFactor} className="space-y-6 mb-4">
            <p className="text-sm text-white/70">
              Enter the 6-digit code. {twoFactorHint && <span>Use code {twoFactorHint} for demo.</span>}
            </p>
            <input
              value={twoFactorCode}
              onChange={(event) => setTwoFactorCode(event.target.value)}
              type="text"
              maxLength={6}
              placeholder="123456"
              className="w-full bg-transparent border-b border-gray-500 focus:border-gray-300 outline-none py-2"
            />
            {error && <p className="text-xs text-red-400">{error}</p>}
            <div className="flex justify-between items-center">
              <button
                type="submit"
                disabled={loading}
                className="flex items-center justify-between bg-[#141414] text-white border border-gray-600 rounded-full py-0.5 pl-2 pr-0.5 w-32 disabled:opacity-50"
              >
                <span className="text-sm">{loading ? "..." : "Verify"}</span>
                <span className="w-7 h-7 bg-gray-300 text-black rounded-full flex items-center justify-center text-sm">
                  ✓
                </span>
              </button>
              <button
                type="button"
                className="text-xs text-white underline"
                onClick={() => {
                  setPhase("form");
                  setTwoFactorCode("");
                  setTwoFactorToken("");
                }}
              >
                Edit signup details
              </button>
            </div>
          </form>
        )}
      </div>
      </div>
    </AuthBackground>
  );
}
