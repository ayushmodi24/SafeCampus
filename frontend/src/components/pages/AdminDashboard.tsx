// import React, { useState } from "react";

// const AdminDashboard: React.FC = () => {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [role, setRole] = useState("teacher");
//   const [setupLink, setSetupLink] = useState("");

//   const token = localStorage.getItem("token");

//   const handleCreate = async () => {
//     try {
//       const res = await fetch("http://localhost:3000/api/auth/signup/admin", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({ name, email, role }),
//       });

//       const data = await res.json();
//       if (!res.ok) throw new Error(data.message || "Error");

//       setSetupLink(data.setupLink);
//       alert("User created! Password setup link generated.");
//     } catch (err: any) {
//       alert(err.message);
//     }
//   };

//   return (
//     <div className="p-8">
//       <h2 className="text-2xl mb-4">Admin Dashboard - Create User</h2>

//       <input
//         type="text"
//         placeholder="Name"
//         value={name}
//         onChange={(e) => setName(e.target.value)}
//         className="border p-2 mb-2"
//       />
//       <input
//         type="email"
//         placeholder="Email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//         className="border p-2 mb-2"
//       />
//       <select value={role} onChange={(e) => setRole(e.target.value)} className="border p-2 mb-2">
//         <option value="teacher">Teacher</option>
//         <option value="parent">Parent</option>
//         <option value="admin">Admin</option>
//       </select>

//       <button onClick={handleCreate} className="bg-blue-500 text-white p-2 rounded">
//         Create User
//       </button>

//       {setupLink && (
//         <div className="mt-4">
//           <p>Send this link to user to set password:</p>
//           <a href={setupLink} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
//             {setupLink}
//           </a>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AdminDashboard;


import React, { useState } from "react";

interface CreatedUser {
  name: string;
  email: string;
  role: string;
  setupLink: string;
}

const AdminDashboard: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("teacher");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [createdUsers, setCreatedUsers] = useState<CreatedUser[]>([]);

  const token = localStorage.getItem("token");

  const handleCreate = async () => {
    if (!name || !email) {
      setMessage("Name and Email are required");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("http://localhost:3000/api/auth/signup/admin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name, email, role }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Error creating user");

      setCreatedUsers((prev) => [
        ...prev,
        { name, email, role, setupLink: data.setupLink },
      ]);

      setMessage(`${role} created successfully!`);
      setName("");
      setEmail("");
    } catch (err: any) {
      setMessage(err.message);
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
          Admin Dashboard
        </h2>

        {message && (
          <div className="mb-4 p-2 border rounded bg-gray-800 text-cyan-400 text-center">
            {message}
          </div>
        )}

        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full bg-gray-800 text-cyan-400 placeholder-cyan-300 border-b-2 border-cyan-400 py-3 px-2 mb-4 rounded transition duration-300 focus:border-cyan-300 outline-none"
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full bg-gray-800 text-cyan-400 placeholder-cyan-300 border-b-2 border-cyan-400 py-3 px-2 mb-4 rounded transition duration-300 focus:border-cyan-300 outline-none"
        />

        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full bg-gray-800 text-cyan-400 border-b-2 border-cyan-400 py-3 px-2 mb-6 rounded outline-none transition duration-300 focus:border-cyan-300"
        >
          <option value="teacher">Teacher</option>
          <option value="parent">Parent</option>
          <option value="admin">Admin</option>
        </select>

        <button
          onClick={handleCreate}
          className={`w-full py-2 rounded-full font-semibold text-gray-900 bg-cyan-400 shadow-[0_0_15px_#06b6d4] transition-all duration-500 mb-6 ${
            loading ? "cursor-not-allowed opacity-50" : "hover:bg-cyan-500"
          }`}
          disabled={loading}
        >
          {loading ? "Creating..." : "Create User"}
        </button>

        {createdUsers.length > 0 && (
          <div className="mt-4">
            <h3 className="text-xl mb-2 text-cyan-400 drop-shadow-[0_0_5px_#06b6d4]">Created Users</h3>
            <ul className="space-y-2">
              {createdUsers.map((user, idx) => (
                <li
                  key={idx}
                  className="p-2 border rounded flex justify-between items-center bg-gray-800 text-cyan-300"
                >
                  <div>
                    <strong>{user.name}</strong> ({user.role}) - {user.email}
                  </div>
                  <a
                    href={user.setupLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 underline hover:text-blue-300"
                  >
                    Setup Password
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
