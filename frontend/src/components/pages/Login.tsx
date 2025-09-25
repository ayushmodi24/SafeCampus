// import React, { useState } from "react";
// import { IoMail, IoLockClosed } from "react-icons/io5";
// import { FcGoogle } from "react-icons/fc";

// const Login: React.FC = () => {
//   const [role, setRole] = useState("student"); // default role

//   const handleLogin = (e: React.FormEvent) => {
//     e.preventDefault();
//     console.log("Logging in as:", role);
//     // yaha tum API call karoge aur role ke hisaab se redirect karoge
//   };

//   return (
//     <div className="min-h-[712px] flex items-center justify-center bg-gray-900 relative overflow-hidden">
//       {/* Neon Glow Top */}
//       <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[10px] bg-cyan-400 rounded-xl blur-lg"></div>

//       <div className="relative w-[400px] rounded-2xl p-8 bg-gray-900 shadow-[0_0_25px_#06b6d4]">
//         {/* Title */}
//         <h2 className="text-3xl font-bold text-center mb-8 text-cyan-400 drop-shadow-[0_0_10px_#06b6d4]">
//           Login
//         </h2>

//         {/* Role Selection */}
//         <select
//           className="w-full mb-6 p-3 rounded-lg bg-gray-800 text-cyan-400 border border-cyan-400 outline-none shadow-[0_0_10px_#06b6d4] mr-"
//           value={role}
//           onChange={(e) => setRole(e.target.value)}
//         >
//           <option value="student">Student</option>
//           <option value="teacher">Teacher</option>
//           <option value="parent">Parent</option>
//           <option value="admin">Admin</option>
//         </select>

//         {/* Login Form */}
//         <form onSubmit={handleLogin}>
//           {/* Email */}
//           <div className="relative mb-6">
//             <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xl text-cyan-400 drop-shadow-[0_0_5px_#06b6d4]">
//               <IoMail />
//             </span>
//             <input
//               type="email"
//               required
//               className="w-full bg-transparent border-b-2 border-cyan-400 outline-none py-3 px-2 text-cyan-400 placeholder-cyan-300 transition duration-500"
//               placeholder="Email"
//             />
//           </div>

//           {/* Password */}
//           <div className="relative mb-6">
//             <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xl text-cyan-400 drop-shadow-[0_0_5px_#06b6d4]">
//               <IoLockClosed />
//             </span>
//             <input
//               type="password"
//               required
//               className="w-full bg-transparent border-b-2 border-cyan-400 outline-none py-3 px-2 text-cyan-400 placeholder-cyan-300 transition duration-500"
//               placeholder="Password"
//             />
//           </div>

//           {/* Remember / Forgot */}
//           <div className="flex items-center justify-between text-sm mb-6 text-cyan-400 drop-shadow-[0_0_5px_#06b6d4]">
//             <label className="flex items-center gap-2">
//               <input type="checkbox" className="accent-cyan-400" /> Remember me
//             </label>
//             <a href="#" className="hover:underline">
//               Forgot Password?
//             </a>
//           </div>

//           {/* Login Button */}
//           <button
//             type="submit"
//             className="w-full py-2 rounded-full font-semibold bg-cyan-400 text-gray-900 shadow-[0_0_15px_#06b6d4] transition-all duration-500 mb-4"
//           >
//             Login
//           </button>
//         </form>

//         {/* OR divider */}
//         <div className="flex items-center justify-center mb-4 text-gray-400">
//           <span className="border-b border-gray-600 w-1/4"></span>
//           <span className="px-2 text-sm">or</span>
//           <span className="border-b border-gray-600 w-1/4"></span>
//         </div>

//         {/* Sign in with Google */}
//         <button className="w-full py-2 rounded-full font-semibold bg-gray-800 text-white flex items-center justify-center gap-2 hover:bg-gray-700 transition-all duration-300 shadow-[0_0_10px_#06b6d4]">
//           <FcGoogle size={24} />
//           Sign in with Google
//         </button>

//         {/* Register */}
//         <div className="mt-6 text-center text-sm text-cyan-400 drop-shadow-[0_0_5px_#06b6d4]">
//           Don&apos;t have an account?{" "}
//           <a href="/signup" className="font-semibold hover:underline">
//             Register
//           </a>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;


import React, { useState } from "react";
import { IoMail, IoLockClosed } from "react-icons/io5";
import { FcGoogle } from "react-icons/fc";

const Login: React.FC = () => {
  const [role, setRole] = useState("student");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);

      const res = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, role }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Login failed");
      }

      // Store JWT and user info
      localStorage.setItem("token", data.token);
      console.log("JWT Token:", data.token);

      localStorage.setItem("user", JSON.stringify(data.user));

      alert(`Welcome ${data.user.name}!`);

      if (data.user.role === "admin") {
        window.location.href = "/";
      } else {
        window.location.href = "/";
      }

    } catch (err: any) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[712px] flex items-center justify-center bg-gray-900 relative overflow-hidden">
      {/* Neon Glow Top */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[10px] bg-cyan-400 rounded-xl blur-lg"></div>

      <div className="relative w-[400px] rounded-2xl p-8 bg-gray-900 shadow-[0_0_25px_#06b6d4]">
        <h2 className="text-3xl font-bold text-center mb-8 text-cyan-400 drop-shadow-[0_0_10px_#06b6d4]">
          Login
        </h2>

        {/* Role Selection */}
        <select
          className="w-full mb-6 p-3 rounded-lg bg-gray-800 text-cyan-400 border border-cyan-400 outline-none shadow-[0_0_10px_#06b6d4]"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="student">Student</option>
          <option value="teacher">Teacher</option>
          <option value="parent">Parent</option>
          <option value="admin">Admin</option>
        </select>

        <form onSubmit={handleLogin}>
          {/* Email */}
          <div className="relative mb-6">
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xl text-cyan-400 drop-shadow-[0_0_5px_#06b6d4]">
              <IoMail />
            </span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full bg-transparent border-b-2 border-cyan-400 outline-none py-3 px-2 text-cyan-400 placeholder-cyan-300 transition duration-500"
              placeholder="Password"
            />
          </div>

          <div className="flex items-center justify-between text-sm mb-6 text-cyan-400 drop-shadow-[0_0_5px_#06b6d4]">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="accent-cyan-400" /> Remember me
            </label>
            <a href="#" className="hover:underline">
              Forgot Password?
            </a>
          </div>

          <button
            type="submit"
            className="w-full py-2 rounded-full font-semibold bg-cyan-400 text-gray-900 shadow-[0_0_15px_#06b6d4] transition-all duration-500 mb-4"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* OR divider */}
        <div className="flex items-center justify-center mb-4 text-gray-400">
          <span className="border-b border-gray-600 w-1/4"></span>
          <span className="px-2 text-sm">or</span>
          <span className="border-b border-gray-600 w-1/4"></span>
        </div>

        {/* Sign in with Google */}
        <button className="w-full py-2 rounded-full font-semibold bg-gray-800 text-white flex items-center justify-center gap-2 hover:bg-gray-700 transition-all duration-300 shadow-[0_0_10px_#06b6d4]">
          <FcGoogle size={24} />
          Sign in with Google
        </button>

        {/* Register */}
        <div className="mt-6 text-center text-sm text-cyan-400 drop-shadow-[0_0_5px_#06b6d4]">
          Don&apos;t have an account?{" "}
          <a href="/signup" className="font-semibold hover:underline">
            Register
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
