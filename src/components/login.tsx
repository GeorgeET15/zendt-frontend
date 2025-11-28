import { useState } from "react";
import type { FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthBackground from "./AuthBackground";
import { requestLogin, verifyTwoFactor } from "../services/auth";

type LoginPhase = "credentials" | "twoFactor";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [phase, setPhase] = useState<LoginPhase>("credentials");
  const [loading, setLoading] = useState(false);
  const [twoFactorToken, setTwoFactorToken] = useState("");
  const [twoFactorCode, setTwoFactorCode] = useState("");
  const [twoFactorHint, setTwoFactorHint] = useState("");
  const navigate = useNavigate();

  const handleCredentialsSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email.trim() || !password.trim()) {
      setError("Please enter both email and password.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      const response = await requestLogin({ email, password });
      setTwoFactorToken(response.twoFactorToken);
      setTwoFactorHint(response.demoCode ?? "Check your authenticator app for the code.");
      setPhase("twoFactor");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleTwoFactorSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!twoFactorCode.trim()) {
      setError("Enter the verification code.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      await verifyTwoFactor({ twoFactorToken, code: twoFactorCode });
      navigate("/dashboard/home");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Verification failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthBackground showNavigation={false}>
      <div className="flex min-h-screen w-full items-center justify-center px-4 py-10">
        <div className="w-full max-w-xs mx-auto">
          <h2 className="text-center text-2xl font-light mb-12">
            {phase === "credentials" ? "Login" : "Two-factor authentication"}
          </h2>

          {phase === "credentials" ? (
            <form onSubmit={handleCredentialsSubmit} className="space-y-6 mb-4">
              <div>
                <label className="text-xs text-gray-400" htmlFor="email">
                  Email
                </label>
                <input
                  id="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  type="email"
                  placeholder="you@example.com"
                  className="w-full bg-transparent border-b border-gray-500 focus:border-gray-300 outline-none py-3 mt-2"
                />
              </div>

              <div>
                <label className="text-xs text-gray-400" htmlFor="password">
                  Password
                </label>
                <input
                  id="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  type="password"
                  placeholder="Password"
                  className="w-full bg-transparent border-b border-gray-500 focus:border-gray-300 outline-none py-3 mt-2"
                />
              </div>

              {error && <p className="text-xs text-red-400">{error}</p>}

              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex items-center justify-between bg-black text-white border border-gray-600 rounded-full py-0.5 pl-2 pr-0.5 w-32 disabled:opacity-50"
                >
                  <span className="text-sm">{loading ? "..." : "Login"}</span>
                  <span className="w-7 h-7 bg-gray-300 text-black rounded-full flex items-center justify-center text-sm">
                    ➜
                  </span>
                </button>

                <div className="text-center sm:text-right text-xs text-gray-400">
                  Don't have account?{" "}
                  <Link to="/signup" className="text-white underline">
                    Sign up
                  </Link>
                </div>
              </div>
            </form>
          ) : (
            <form onSubmit={handleTwoFactorSubmit} className="space-y-6 mb-4">
              <p className="text-sm text-white/70">
                Enter the 6-digit code. {twoFactorHint && <span>Use code {twoFactorHint} for demo.</span>}
              </p>
              <input
                value={twoFactorCode}
                onChange={(event) => setTwoFactorCode(event.target.value)}
                type="text"
                maxLength={6}
                placeholder="123456"
                className="w-full bg-transparent border-b border-gray-500 focus:border-gray-300 outline-none py-3"
              />
              {error && <p className="text-xs text-red-400">{error}</p>}
              <div className="flex justify-between items-center">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex items-center justify-between bg-black text-white border border-gray-600 rounded-full py-0.5 pl-2 pr-0.5 w-32 disabled:opacity-50"
                >
                  <span className="text-sm">{loading ? "..." : "Verify"}</span>
                  <span className="w-7 h-7 bg-gray-300 text-black rounded-full flex items-center justify-center text-sm">
                    ✓
                  </span>
                </button>
                <button
                  type="button"
                  className="text-xs text-gray-400 underline"
                  onClick={() => {
                    setPhase("credentials");
                    setTwoFactorCode("");
                    setTwoFactorToken("");
                  }}
                >
                  Use different account
                </button>
              </div>
            </form>
          )}

          <p className="text-center text-xs text-gray-500 mt-4">Need any help?</p>
        </div>
      </div>
    </AuthBackground>
  );
}
