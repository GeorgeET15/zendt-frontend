import { Link } from "react-router-dom";
import AuthBackground from "./AuthBackground";

export default function Signup() {
  return (
    <AuthBackground>
      <div className="w-full max-w-xs mx-auto">

        <h2 className="text-center text-2xl font-light mb-12">Sign up</h2>

        <input placeholder="First name"
          className="w-full bg-transparent border-b border-gray-500 focus:border-gray-300 outline-none py-3 mb-6"
        />
        <input placeholder="Last name"
          className="w-full bg-transparent border-b border-gray-500 focus:border-gray-300 outline-none py-3 mb-6"
        />
        <input placeholder="E-mail id"
          className="w-full bg-transparent border-b border-gray-500 focus:border-gray-300 outline-none py-3 mb-6"
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full bg-transparent border-b border-gray-500 focus:border-gray-300 outline-none py-3 mb-6"
        />
        <input
          type="password"
          placeholder="Use Password"
          className="w-full bg-transparent border-b border-gray-500 focus:border-gray-300 outline-none py-3 mb-10"
        />

        


        <div className=" flex justify-between items-center">
  <button
  className="flex items-center justify-between bg-black text-white border border-gray-600 rounded-full py-0.5 pl-2 pr-0.5 w-32">
  <span className="text-sm">Signup</span>
  <span className="w-7 h-7 bg-gray-300 text-black rounded-full flex items-center justify-center text-sm">
    ➜
  </span>
</button>


        <div className="text-right text-xs text-gray-400">
          Already have account?{" "}
          <Link to="/signup" className="text-white underline">
         login
          </Link>
        </div>
</div>
      </div>
    </AuthBackground>
  );
}
