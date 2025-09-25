// import { useState } from "react";
// import { useParams } from "react-router-dom";

// const SetupPassword = () => {
//   const { token } = useParams<{ token: string }>();
//   const [password, setPassword] = useState("");
//   const [message, setMessage] = useState("");

//   if (!token) return <div className="p-8">Invalid or missing link.</div>;

//   const handleSetup = async () => {
//     const res = await fetch("http://localhost:3000/api/auth/setup-password", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ token, password }),
//     });
//     const data = await res.json();
//     setMessage(data.message);
//   };

//   return (
//     <div className="p-8">
//       <h2 className="text-2xl mb-4">Set Your Password</h2>
//       <input
//         type="password"
//         placeholder="New Password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//         className="border p-2 mb-2"
//       />
//       <button onClick={handleSetup} className="bg-green-500 text-white p-2 rounded mb-2">
//         Set Password
//       </button>
//       {message && <p className="mt-2 text-blue-600">{message}</p>}
//     </div>
//   );
// };

// export default SetupPassword;


import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const SetupPassword = () => {
  const { token } = useParams<{ token: string }>();
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  if (!token)
    return (
      <div className="min-h-[712px] flex items-center justify-center bg-gray-900 text-red-400">
        Invalid or missing link.
      </div>
    );

  const handleSetup = async () => {
    if (!password) {
      setMessage("Please enter a password");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("http://localhost:3000/api/auth/setup-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Failed to set password");

      setMessage(data.message || "Password set successfully!");
      setPassword("");

      // Redirect to login after 2 seconds
      setTimeout(() => navigate("/login"), 2000);
    } catch (err: any) {
      setMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[712px] flex items-center justify-center bg-gray-900 relative overflow-hidden">
      {/* Neon glow top */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[10px] bg-cyan-400 rounded-xl blur-lg"></div>

      <div className="relative w-[400px] rounded-2xl p-8 bg-gray-900 shadow-[0_0_25px_#06b6d4]">
        <h2 className="text-3xl font-bold text-center mb-8 text-cyan-400 drop-shadow-[0_0_10px_#06b6d4]">
          Set Your Password
        </h2>

        {message && (
          <div className="mb-4 p-2 border rounded bg-gray-800 text-cyan-400 text-center">
            {message}
          </div>
        )}

        <input
          type="password"
          placeholder="New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full bg-gray-800 text-cyan-400 placeholder-cyan-300 border-b-2 border-cyan-400 py-3 px-2 mb-6 rounded transition duration-300 focus:border-cyan-300 outline-none"
        />

        <button
          onClick={handleSetup}
          disabled={loading}
          className={`w-full py-2 rounded-full font-semibold text-gray-900 bg-green-400 shadow-[0_0_15px_#06b6d4] transition-all duration-500 ${
            loading ? "opacity-50 cursor-not-allowed" : "hover:bg-green-500"
          }`}
        >
          {loading ? "Setting..." : "Set Password"}
        </button>

        <div className="mt-4 text-center text-cyan-400 text-sm drop-shadow-[0_0_5px_#06b6d4]">
          Already have an account?{" "}
          <a href="/login" className="font-semibold hover:underline">
            Login
          </a>
        </div>
      </div>
    </div>
  );
};

export default SetupPassword;
