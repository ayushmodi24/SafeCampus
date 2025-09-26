// src/pages/Modules.tsx
import React, { useState } from "react";
// import { Progress } from "@/components/ui/progress"; // if you're using shadcn/ui
import { FaFire, FaWater, FaClinicMedical, FaSearch } from "react-icons/fa";

const modulesData = [
  {
    id: 1,
    title: "Flood Preparedness",
    description: "Learn how to stay safe during floods and understand evacuation routes.",
    icon: <FaWater className="text-blue-500 text-4xl" />,
    progress: 65,
    badge: "🏆 Safety Hero",
  },
  {
    id: 2,
    title: "Fire Safety",
    description: "Understand fire prevention, evacuation, and emergency handling.",
    icon: <FaFire className="text-red-500 text-4xl" />,
    progress: 30,
  },
  {
    id: 3,
    title: "Earthquake Safety",
    description: "Steps to take before, during, and after an earthquake.",
    icon: <FaClinicMedical className="text-green-500 text-4xl" />,
    progress: 0,
  },
];

const leaderboard = [
  { name: "Aman (XYZ College)", score: "95%" },
  { name: "Riya (ABC School)", score: "90%" },
  { name: "Karan (LMN College)", score: "85%" },
  { name: "Priya (PQR School)", score: "80%" },
  { name: "Dev (XYZ College)", score: "78%" },
];

const Modules: React.FC = () => {
  const [search, setSearch] = useState("");

  const filteredModules = modulesData.filter((m) =>
    m.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      {/* Overall Progress */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold mb-4">Disaster Learning Modules</h1>
        <div className="flex justify-center items-center gap-6">
          <div className="w-32 h-32 rounded-full bg-gradient-to-tr from-green-500 to-gray-600 flex items-center justify-center text-2xl font-bold">
            70%
          </div>
          <div>
            <h2 className="text-lg font-semibold">Overall Progress</h2>
            <p className="text-gray-400">Based on modules & quizzes completed</p>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="flex justify-center mb-8">
        <div className="flex items-center bg-gray-800 rounded-lg px-4 py-2 w-1/2">
          <FaSearch className="text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Search Modules..."
            className="bg-transparent focus:outline-none w-full text-white"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Main Grid + Leaderboard */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Module Cards */}
        <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {filteredModules.map((module) => (
            <div
              key={module.id}
              className="bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition"
            >
              <div className="flex items-center gap-4 mb-4">
                {module.icon}
                <h3 className="text-xl font-semibold">{module.title}</h3>
              </div>
              <p className="text-gray-400 mb-4">{module.description}</p>

              {/* Progress Bar */}
              {/* <Progress value={module.progress} className="h-2 mb-3" /> */}
              <p className="text-sm text-gray-400 mb-2">
                Progress: {module.progress}%
              </p>

              {/* Badge */}
              {module.badge && (
                <span className="inline-block bg-yellow-500 text-black px-3 py-1 text-xs font-bold rounded-full mb-3">
                  {module.badge}
                </span>
              )}

              {/* Buttons */}
              <div className="flex gap-3">
                <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-sm">
                  📘 {module.progress > 0 ? "Continue" : "Start"} Learning
                </button>
                <button className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg text-sm">
                  📝 Take Quiz
                </button>
                <button className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg text-sm">
                  🎮 Simulation
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Leaderboard */}
        {/* <div className="bg-gray-800 rounded-2xl p-6 shadow-lg">
          <h3 className="text-xl font-bold mb-4">🏆 Leaderboard</h3>
          <ul className="space-y-3">
            {leaderboard.map((entry, idx) => (
              <li
                key={idx}
                className="flex justify-between text-gray-300 bg-gray-700 px-3 py-2 rounded-lg"
              >
                <span>{entry.name}</span>
                <span className="font-semibold">{entry.score}</span>
              </li>
            ))}
          </ul>
        </div> */}
      </div>

      {/* Recommended Next Module */}
      <div className="mt-12 text-center">
        <h2 className="text-lg text-gray-300">Next Suggested Module →</h2>
        <p className="text-2xl font-bold text-blue-400">Learn Virtual Drill 🔥</p>
      </div>
    </div>
  );
};

export default Modules;
