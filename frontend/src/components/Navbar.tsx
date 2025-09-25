// import React, { useState, useEffect } from "react";
// import { NavLink, useNavigate } from "react-router-dom";
// import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";

// const Navbar: React.FC = () => {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   const navigate = useNavigate();

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     setIsLoggedIn(!!token);
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     setIsLoggedIn(false);
//     navigate("/login");
//   };

//   const baseStyle = "font-medium transition px-1";
//   const activeStyle = "text-orange-500 underline underline-offset-4 drop-shadow-lg";
//   const hoverStyle = "hover:text-orange-500";

//   return (
//     <header className="sticky top-0 bg-gray-900 shadow z-50">
//       <div className="max-w-7xl mx-auto flex justify-between items-center p-4">
//         {/* Logo */}
//         <div className="text-2xl font-extrabold text-blue-600">
//           <NavLink to="/">SafeCampus</NavLink>
//         </div>

//         {/* Nav */}
//         <nav className="relative">
//           <ul
//             className={`${
//               menuOpen ? "flex" : "hidden"
//             } md:flex flex-col md:flex-row gap-6 list-none text-white absolute md:static top-full left-0 bg-black md:bg-transparent w-full md:w-auto p-4 md:p-0`}
//           >
//             <li>
//               <NavLink
//                 to="/"
//                 end
//                 className={({ isActive }) => `${baseStyle} ${hoverStyle} ${isActive ? activeStyle : ""}`}
//               >
//                 Home
//               </NavLink>
//             </li>
//             <li>
//               <NavLink
//                 to="/safety"
//                 className={({ isActive }) => `${baseStyle} ${hoverStyle} ${isActive ? activeStyle : ""}`}
//               >
//                 Learn Safety
//               </NavLink>
//             </li>
//             <li>
//               <NavLink
//                 to="/virtualdrill"
//                 className={({ isActive }) => `${baseStyle} ${hoverStyle} ${isActive ? activeStyle : ""}`}
//               >
//                 Virtual Drill
//               </NavLink>
//             </li>
//             <li>
//               <NavLink
//                 to="/alerts"
//                 className={({ isActive }) => `${baseStyle} ${hoverStyle} ${isActive ? activeStyle : ""}`}
//               >
//                 Alerts
//               </NavLink>
//             </li>
//             <li>
//               <NavLink
//                 to="/dashboard"
//                 className={({ isActive }) => `${baseStyle} ${hoverStyle} ${isActive ? activeStyle : ""}`}
//               >
//                 Dashboard
//               </NavLink>
//             </li>
//             <li>
//               <NavLink
//                 to="/aboutus"
//                 className={({ isActive }) => `${baseStyle} ${hoverStyle} ${isActive ? activeStyle : ""}`}
//               >
//                 About Us
//               </NavLink>
//             </li>
//             <li>
//               <NavLink to="/chatbot" className="bg-red-600 px-3 py-1 rounded-lg hover:bg-red-700">
//                 Chatbot
//               </NavLink>
//             </li>

//             {!isLoggedIn ? (
//               <>
//                 <li>
//                   <NavLink
//                     to="/login"
//                     className="px-4 py-1.5 border border-blue-500 text-blue-400 rounded-lg hover:bg-blue-500 hover:text-white transition"
//                   >
//                     Log In
//                   </NavLink>
//                 </li>
//                 <li>
//                   <NavLink
//                     to="/signup"
//                     className="px-4 py-1.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:opacity-90 transition"
//                   >
//                     Sign Up
//                   </NavLink>
//                 </li>
//               </>
//             ) : (
//               <li className="relative group ml-20 ">
//                 <button className="flex items-end  px-2 py-1.5 border text- bg-black rounded-full hover:bg-gray-700 transition">
//                   <AccountCircleRoundedIcon fontSize="medium" />
//                 </button>

//                 {/* Dropdown menu */}
//                 <div className="absolute right-0  w-32 bg-black text-white rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity z-50">
//                   <NavLink
//                     to="/profile"
//                     className="block px-4 py-2 hover:bg-gray-800"
//                   >
//                     Profile
//                   </NavLink>
//                   <button
//                     onClick={handleLogout}
//                     className="w-full text-left px-4 py-2 hover:bg-gray-800"
//                   >
//                     Logout
//                   </button>
//                 </div>
//               </li>
//             )}
//           </ul>

//           {/* Hamburger */}
//           <div
//             className="flex flex-col gap-1.5 md:hidden cursor-pointer"
//             onClick={() => setMenuOpen(!menuOpen)}
//           >
//             <div className="w-6 h-0.5 bg-gray-200"></div>
//             <div className="w-6 h-0.5 bg-gray-200"></div>
//             <div className="w-6 h-0.5 bg-gray-200"></div>
//           </div>
//         </nav>
//       </div>
//     </header>
//   );
// };

// export default Navbar;import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import { useEffect, useState } from "react";

const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    setIsLoggedIn(!!token);

    if (user) {
      const parsedUser = JSON.parse(user);
      setUserRole(parsedUser.role);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setUserRole(null);
    navigate("/login");
  };

  const baseStyle = "font-medium transition px-1";
  const activeStyle = "text-orange-500 underline underline-offset-4 drop-shadow-lg";
  const hoverStyle = "hover:text-orange-500";

  return (
    <header className="sticky top-0 bg-gray-900 shadow z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center p-4">
        {/* Logo */}
        <div className="text-2xl font-extrabold text-blue-600">
          <NavLink to="/">SafeCampus</NavLink>
        </div>

        {/* Desktop menu */}
        <nav className="relative">
          <ul className="hidden md:flex flex-row gap-6 items-center text-white">
            <li>
              <NavLink to="/" end className={({ isActive }) => `${baseStyle} ${hoverStyle} ${isActive ? activeStyle : ""}`}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/safety" className={({ isActive }) => `${baseStyle} ${hoverStyle} ${isActive ? activeStyle : ""}`}>
                Learn Safety
              </NavLink>
            </li>
            <li>
              <NavLink to="/virtualdrill" className={({ isActive }) => `${baseStyle} ${hoverStyle} ${isActive ? activeStyle : ""}`}>
                Virtual Drill
              </NavLink>
            </li>
            <li>
              <NavLink to="/alerts" className={({ isActive }) => `${baseStyle} ${hoverStyle} ${isActive ? activeStyle : ""}`}>
                Alerts
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard" className={({ isActive }) => `${baseStyle} ${hoverStyle} ${isActive ? activeStyle : ""}`}>
                Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink to="/aboutus" className={({ isActive }) => `${baseStyle} ${hoverStyle} ${isActive ? activeStyle : ""}`}>
                About Us
              </NavLink>
            </li>
            <li>
              <NavLink to="/chatbot" className="bg-red-600 px-3 py-1 rounded-lg hover:bg-red-700">
                Chatbot
              </NavLink>
            </li>

            {/* Admin-only button */}
            {isLoggedIn && userRole === "admin" && (
              <li>
                <button
                  onClick={() => navigate("/admin/dashboard")}
                  className="px-3 py-1 bg-green-500 text-white rounded-lg hover:bg-green-600"
                >
                  Add User
                </button>
              </li>
            )}

            {!isLoggedIn ? (
              <>
                <li>
                  <NavLink to="/login" className="px-4 py-1.5 border border-blue-500 text-blue-400 rounded-lg hover:bg-blue-500 hover:text-white transition">
                    Log In
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/signup" className="px-4 py-1.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:opacity-90 transition">
                    Sign Up
                  </NavLink>
                </li>
              </>
            ) : (
              <li className="relative group ml-20">
                <button className="flex items-center px-2 py-1.5 border bg-black rounded-full hover:bg-gray-700 transition">
                  <AccountCircleRoundedIcon fontSize="medium" />
                </button>
                <div className="absolute right-0 mt-2 w-32 bg-black text-white rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity z-50">
                  <NavLink to="/profile" className="block px-4 py-2 hover:bg-gray-800">
                    Profile
                  </NavLink>
                  <button onClick={handleLogout} className="w-full text-left px-4 py-2 hover:bg-gray-800">
                    Logout
                  </button>
                </div>
              </li>
            )}
          </ul>

          {/* Mobile menu */}
          <div className="md:hidden flex items-center">
            <button
              className="mr-4"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <div className="w-6 h-0.5 bg-gray-200 mb-1"></div>
              <div className="w-6 h-0.5 bg-gray-200 mb-1"></div>
              <div className="w-6 h-0.5 bg-gray-200"></div>
            </button>

            {menuOpen && (
              <ul className="flex flex-col gap-4 absolute top-full left-0 w-full bg-black p-4 text-white z-50">
                <li>
                  <NavLink to="/" onClick={() => setMenuOpen(false)}>Home</NavLink>
                </li>
                <li>
                  <NavLink to="/safety" onClick={() => setMenuOpen(false)}>Learn Safety</NavLink>
                </li>
                <li>
                  <NavLink to="/virtualdrill" onClick={() => setMenuOpen(false)}>Virtual Drill</NavLink>
                </li>
                <li>
                  <NavLink to="/alerts" onClick={() => setMenuOpen(false)}>Alerts</NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard" onClick={() => setMenuOpen(false)}>Dashboard</NavLink>
                </li>
                <li>
                  <NavLink to="/aboutus" onClick={() => setMenuOpen(false)}>About Us</NavLink>
                </li>
                <li>
                  <NavLink to="/chatbot" onClick={() => setMenuOpen(false)}>Chatbot</NavLink>
                </li>
                {isLoggedIn && userRole === "admin" && (
                  <li>
                    <button
                      onClick={() => { navigate("/admin/dashboard"); setMenuOpen(false); }}
                      className="px-3 py-1 bg-green-500 text-white rounded-lg hover:bg-green-600"
                    >
                      Add User
                    </button>
                  </li>
                )}
                {!isLoggedIn ? (
                  <>
                    <li>
                      <NavLink to="/login" onClick={() => setMenuOpen(false)}>Log In</NavLink>
                    </li>
                    <li>
                      <NavLink to="/signup" onClick={() => setMenuOpen(false)}>Sign Up</NavLink>
                    </li>
                  </>
                ) : (
                  <li>
                    <button onClick={() => { handleLogout(); setMenuOpen(false); }}>Logout</button>
                  </li>
                )}
              </ul>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
