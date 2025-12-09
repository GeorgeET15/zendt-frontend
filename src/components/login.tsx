import { useState, useEffect } from "react";
import type { FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthBackground from "./AuthBackground";
import { requestLogin, verifyTwoFactor } from "../services/auth";
import { useAuth } from "../context/AuthContext";
import Toast from "./Toast"; // ✅ import Toast

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

  // 🔹 biometric toast
  const [showBiometricToast, setShowBiometricToast] = useState(false);

  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();

  // Redirect to dashboard if logged in
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard/home", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  // Auto-hide biometric toast
  useEffect(() => {
    if (!showBiometricToast) return;
    const t = setTimeout(() => setShowBiometricToast(false), 3000);
    return () => clearTimeout(t);
  }, [showBiometricToast]);

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
      login();
      navigate("/dashboard/home", { state: { showKycToast: true } });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Verification failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthBackground showNavigation={false}>
      
      {/* 🔹 BIOMETRIC TOAST */}
      <Toast
        visible={showBiometricToast}
        message="Biometric Login Coming Soon"
        subMessage="You will soon be able to sign in using Face ID or fingerprints."
        icon={
          <img
            src="https://cdn-icons-png.flaticon.com/512/709/709612.png"
            className="w-5 h-5 opacity-90"
          />
        }
      />

      <div className="flex min-h-screen w-full items-end justify-center pb-5 overflow-y-scroll no-scrollbar">
        <div className="w-full max-w-xs mx-auto">
          <h2 className="text-center text-[20px] font-light mb-8">
            {phase === "credentials" ? "Login" : "Two-factor authentication"}
          </h2>

          {phase === "credentials" ? (
            <>
              <form onSubmit={handleCredentialsSubmit} className="space-y-6 mb-4">
                <div>
                  <input
                    id="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    type="email"
                    placeholder="Username"
                    className="w-full bg-transparent border-b border-gray-500 focus:border-gray-300 outline-none py-2 mt-2"
                  />
                </div>

                <div>
                  <input
                    id="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    type="password"
                    placeholder="Password"
                    className="w-full bg-transparent border-b border-gray-500 focus:border-gray-300 outline-none py-2 mt-2"
                  />
                </div>

                {error && <p className="text-xs text-red-400">{error}</p>}

                <div className="flex gap-4 items-center justify-between">
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex items-center justify-between bg-[#141414] text-white border border-gray-600 rounded-full py-0.5 pl-2 pr-0.5 w-24 disabled:opacity-50"
                  >
                    <span className="text-sm">{loading ? "..." : "Login"}</span>
                    <span className="w-7 h-7 bg-gray-300 text-black rounded-full flex items-center justify-center text-sm">
                      ➜
                    </span>
                  </button>

                  <div className="shrink-0 text-center sm:text-right text-xs text-white">
                    Don't have account?{" "}
                    <Link to="/signup" className="text-gray-400 underline">
                      Sign up
                    </Link>
                  </div>
                </div>
              </form>

              {/* 🔹 BIOMETRICS BUTTON */}
              <div className="mt-6 mb-8 flex flex-col items-center gap-3">
                <p className="text-xs text-gray-400">Or continue with</p>

                <button
                  className="flex items-center gap-2 py-2 px-4 bg-white/10 border border-white/20 rounded-full text-xs text-white hover:bg-white/20"
                  onClick={() => setShowBiometricToast(true)}
                >
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/709/709612.png"
                    className="w-4 h-4 opacity-80"
                    alt="Face ID"
                  />
                  Use Face ID / Biometrics
                </button>
              </div>
            </>
          ) : (
            <form onSubmit={handleTwoFactorSubmit} className="space-y-6 mb-4">
              <p className="text-sm text-white/70">
                Enter the 6-digit code.{" "}
                {twoFactorHint && <span>Use code {twoFactorHint} for demo.</span>}
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
                    ➜
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

          <p className="text-center py-16 text-xs text-white mt-4">Need any help?</p>
        </div>
      </div>
    </AuthBackground>
  );
}
