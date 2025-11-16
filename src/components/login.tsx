import { Link } from "react-router-dom";
import AuthBackground from "./AuthBackground";

export default function Login() {
  return (
    <AuthBackground>
        <div className="flex-col sm:justify-end">
<div className="w-full max-w-xs mx-auto ">

        <h2 className="text-center text-2xl font-light mb-12">Login</h2>

        <input
          type="text"
          placeholder="Username"
          className="w-full bg-transparent border-b border-gray-500 focus:border-gray-300 outline-none py-3 mb-8"
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full bg-transparent border-b border-gray-500 focus:border-gray-300 outline-none py-3 mb-10"
        />

<div className=" flex justify-between items-center">
  <button
  className="flex items-center justify-between bg-black text-white border border-gray-600 rounded-full py-0.5 pl-2 pr-0.5 w-32">
  <span className="text-sm">Login</span>
  <span className="w-7 h-7 bg-gray-300 text-black rounded-full flex items-center justify-center text-sm">
    ➜
  </span>
</button>


        <div className="text-right text-xs text-gray-400">
          Don't have account?{" "}
          <Link to="/signup" className="text-white underline">
            Sign up
          </Link>
        </div>
</div>
       
      

        <p className="text-center text-xs text-gray-500 mt-8">Need any help ?</p>
      </div>
        </div>
      
    </AuthBackground>
  );
}
