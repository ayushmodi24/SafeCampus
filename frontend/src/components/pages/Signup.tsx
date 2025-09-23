import React from "react";
import { IoMail, IoLockClosed, IoPerson } from "react-icons/io5";
import { FcGoogle } from "react-icons/fc"; // Google icon

const Signup: React.FC = () => {
  return (
    <div className="min-h-[712px] flex items-center justify-center bg-gray-900 relative overflow-hidden">
      {/* Neon Glow Top */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[10px] bg-cyan-400 rounded-xl blur-lg"></div>

      <div className="relative w-[400px] rounded-2xl p-8 bg-gray-900 shadow-[0_0_25px_#06b6d4]">
        {/* Title */}
        <h2 className="text-3xl font-bold text-center mb-8 text-cyan-400 drop-shadow-[0_0_10px_#06b6d4]">
          Sign Up
        </h2>

        {/* Name */}
        <div className="relative mb-6">
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xl text-cyan-400 drop-shadow-[0_0_5px_#06b6d4]">
            <IoPerson />
          </span>
          <input
            type="text"
            required
            className="w-full bg-transparent border-b-2 border-cyan-400 outline-none py-3 px-2 text-cyan-400 placeholder-cyan-300 transition duration-500"
            placeholder="Full Name"
          />
        </div>

        {/* Email */}
        <div className="relative mb-6">
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xl text-cyan-400 drop-shadow-[0_0_5px_#06b6d4]">
            <IoMail />
          </span>
          <input
            type="email"
            required
            className="w-full bg-transparent border-b-2 border-cyan-400 outline-none py-3 px-2 text-cyan-400 placeholder-cyan-300 transition duration-500"
            placeholder="Email"
          />
        </div>

        {/* Password */}
        <div className="relative mb-6">
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xl text-cyan-400 drop-shadow-[0_0_5px_#06b6d4]">
            <IoLockClosed />
          </span>
          <input
            type="password"
            required
            className="w-full bg-transparent border-b-2 border-cyan-400 outline-none py-3 px-2 text-cyan-400 placeholder-cyan-300 transition duration-500"
            placeholder="Password"
          />
        </div>

        {/* Confirm Password */}
        <div className="relative mb-6">
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xl text-cyan-400 drop-shadow-[0_0_5px_#06b6d4]">
            <IoLockClosed />
          </span>
          <input
            type="password"
            required
            className="w-full bg-transparent border-b-2 border-cyan-400 outline-none py-3 px-2 text-cyan-400 placeholder-cyan-300 transition duration-500"
            placeholder="Confirm Password"
          />
        </div>

        {/* Signup Button */}
        <button className="w-full py-2 rounded-full font-semibold bg-cyan-400 text-gray-900 shadow-[0_0_15px_#06b6d4] transition-all duration-500 mb-4">
          Sign Up
        </button>

        {/* OR divider */}
        <div className="flex items-center justify-center mb-4 text-gray-400">
          <span className="border-b border-gray-600 w-1/4"></span>
          <span className="px-2 text-sm">or</span>
          <span className="border-b border-gray-600 w-1/4"></span>
        </div>

        {/* Sign up with Google */}
        <button className="w-full py-2 rounded-full font-semibold bg-gray-800 text-white flex items-center justify-center gap-2 hover:bg-gray-700 transition-all duration-300 shadow-[0_0_10px_#06b6d4]">
          <FcGoogle size={24} />
          Sign up with Google
        </button>

        {/* Already have account */}
        <div className="mt-6 text-center text-sm text-cyan-400 drop-shadow-[0_0_5px_#06b6d4]">
          Already have an account?{" "}
          <a href="/login" className="font-semibold hover:underline">
            Login
          </a>
        </div>
      </div>
    </div>
  );
};

export default Signup;
