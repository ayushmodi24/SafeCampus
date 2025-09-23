import React, { useState } from "react";
import { Link } from "react-router-dom";


const Navbar: React.FC = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    // const [showChatbot, setShowChatbot] = useState(false);
    // if (showChatbot) {
    //     // Show only chatbot
    //     return <Chatbot />;
    // }

    return (
        <>
            <header className="sticky top-0 bg-gray-900 shadow z-50">
                <div className="max-w-7xl mx-auto flex justify-between items-center p-4">
                    {/* Logo */}
                    <div className="text-2xl font-extrabold text-blue-600">SafeCampus</div>

                    {/* Nav */}
                    <nav className="relative">
                        {/* Desktop Menu */}
                        <ul
                            className={`${menuOpen ? "flex" : "hidden"
                                } md:flex flex-col md:flex-row gap-6 list-none text-white absolute md:static top-full left-0 bg-black md:bg-transparent w-full md:w-auto p-4 md:p-0`}
                        >
                            <li>
                                <a href="/" className="hover:text-orange-500 font-medium">
                                    Home
                                </a>
                            </li>
                            <li>
                                <a href="/safety" className="hover:text-orange-500 font-medium">
                                    Learn Safety
                                </a>
                            </li>
                            <li>
                                <a href="" className="hover:text-orange-500 font-medium">
                                    Virtual Drill
                                </a>
                            </li>
                            <li>
                                <a href="" className="hover:text-orange-500 font-medium">
                                    Alerts
                                </a>
                            </li>
                            <li>
                                <a href="" className="hover:text-orange-500 font-medium">
                                    Dashboard
                                </a>
                            </li>
                            <li>
                                <a href="" className="hover:text-orange-500 font-medium">
                                    About Us
                                </a>
                            </li>
                            <li>
                                <Link to="/chatbot" className="bg-red-600 px-3 py-1 rounded-lg hover:bg-red-700">Chatbot</Link>
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

            {/* Chatbot */}
            {/* {showChatbot && <Chatbot />} */}
        </>
    );
};

export default Navbar;
