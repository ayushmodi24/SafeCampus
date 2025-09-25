import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const baseStyle =
    "font-medium transition px-1"; // spacing so underline looks good
  const activeStyle =
    "text-orange-500 underline underline-offset-4 drop-shadow-lg";
  const hoverStyle = "hover:text-orange-500";

  return (
    <>
      <header className="sticky top-0 bg-gray-900 shadow z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center p-4">
          {/* Logo */}
          <div className="text-2xl font-extrabold text-blue-600">
            <NavLink to="/">SafeCampus</NavLink>
          </div>

          {/* Nav */}
          <nav className="relative">
            {/* Desktop & Mobile Menu */}
            <ul
              className={`${
                menuOpen ? "flex" : "hidden"
              } md:flex flex-col md:flex-row gap-6 list-none text-white absolute md:static top-full left-0 bg-black md:bg-transparent w-full md:w-auto p-4 md:p-0`}
            >
              <li>
                <NavLink
                  to="/"
                  end
                  className={({ isActive }) =>
                    `${baseStyle} ${hoverStyle} ${
                      isActive ? activeStyle : ""
                    }`
                  }
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/safety"
                  className={({ isActive }) =>
                    `${baseStyle} ${hoverStyle} ${
                      isActive ? activeStyle : ""
                    }`
                  }
                >
                  Learn Safety
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/virtualdrill"
                  className={({ isActive }) =>
                    `${baseStyle} ${hoverStyle} ${
                      isActive ? activeStyle : ""
                    }`
                  }
                >
                  Virtual Drill
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/alerts"
                  className={({ isActive }) =>
                    `${baseStyle} ${hoverStyle} ${
                      isActive ? activeStyle : ""
                    }`
                  }
                >
                  Alerts
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard"
                  className={({ isActive }) =>
                    `${baseStyle} ${hoverStyle} ${
                      isActive ? activeStyle : ""
                    }`
                  }
                >
                  Dashboard
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/aboutus"
                  className={({ isActive }) =>
                    `${baseStyle} ${hoverStyle} ${
                      isActive ? activeStyle : ""
                    }`
                  }
                >
                  About Us
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/chatbot"
                  className="bg-red-600 px-3 py-1 rounded-lg hover:bg-red-700"
                >
                  Chatbot
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/login"
                  className="px-4 py-1.5 border border-blue-500 text-blue-400 rounded-lg hover:bg-blue-500 hover:text-white transition"
                >
                  Log In
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/signup"
                  className="px-4 py-1.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:opacity-90 transition"
                >
                  Sign Up
                </NavLink>
              </li>
            </ul>

            {/* Hamburger */}
            <div
              className="flex flex-col gap-1.5 md:hidden cursor-pointer"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <div className="w-6 h-0.5 bg-gray-200"></div>
              <div className="w-6 h-0.5 bg-gray-200"></div>
              <div className="w-6 h-0.5 bg-gray-200"></div>
            </div>
          </nav>
        </div>
      </header>
    </>
  );
};

export default Navbar;
