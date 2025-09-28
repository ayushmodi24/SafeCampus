import React, { useMemo, useState } from "react";

type Student = {
  id: number;
  name: string;
  score: number;
  school: string;
  avatar: string;
};

type University = {
  id: number;
  name: string;
  score: number;
  avatar: string;
};

type Leader = Student | University;

const leaderboardData: Student[] = [
  { id: 1, name: "Aisha Khan", score: 982, school: "Greenwood High", avatar: "AK" },
  { id: 2, name: "Rohit Sharma", score: 921, school: "St. Marys", avatar: "RS" },
  { id: 3, name: "Leela Gupta", score: 897, school: "Sunrise Public", avatar: "LG" },
  { id: 4, name: "Imran Ali", score: 872, school: "Riverdale", avatar: "IA" },
  { id: 5, name: "Neha Verma", score: 845, school: "Bright Academy", avatar: "NV" },
  { id: 6, name: "Arjun Mehra", score: 812, school: "Central School", avatar: "AM" },
];

const universityData: University[] = [
  { id: 1, name: "Delhi University", score: 4800, avatar: "DU" },
  { id: 2, name: "Mumbai University", score: 4550, avatar: "MU" },
  { id: 3, name: "IIT Kanpur", score: 4400, avatar: "IK" },
  { id: 4, name: "Banaras Hindu University", score: 4200, avatar: "BH" },
  { id: 5, name: "JNU Delhi", score: 4100, avatar: "JNU" },
];

const statCards = [
  { title: "Average Score", value: "78%", subtitle: "Across enrolled schools" },
  { title: "Active Drills", value: "14", subtitle: "This month" },
  { title: "Students Trained", value: "1.2k", subtitle: "Total" },
];


const Cup: React.FC<{ rank: number }> = ({ rank }) => {
  const colors: Record<number, string> = { 1: "#FFD700", 2: "#C0C0C0", 3: "#CD7F32" };
  return (
    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M7 4V6C4.79086 6 3 7.79086 3 10V11C3 13.2091 4.79086 15 7 15H17C19.2091 15 21 13.2091 21 11V10C21 7.79086 19.2091 6 17 6V4H7Z"
        fill={colors[rank] || "#999"}
      />
      <path d="M9 15V17C9 18.6569 10.3431 20 12 20C13.6569 20 15 18.6569 15 17V15" stroke="#222" strokeWidth={0.6} />
    </svg>
  );
};

const hasSchool = (item: Leader): item is Student => {
  return (item as Student).school !== undefined;
};

const LeaderboardRow: React.FC<{
  rank: number;
  item: Leader;
  maxScore: number;
  view: "student" | "university";
}> = ({ rank, item, maxScore, view }) => {
  const highlight = rank <= 3;
// Top 3 border colors
  const borderColors: Record<number, string> = {
    1: "border-yellow-400",
    2: "border-gray-300",
    3: "border-amber-600",
  };

  const bg = highlight
    ? `bg-gradient-to-r from-black/30 to-transparent border ${borderColors[rank]}`
    : "bg-transparent";
  const pct = Math.min(
    100,
    Math.round((item.score / Math.max(1, maxScore)) * 100)
  ); // percent for progress

  return (
    <div className={`flex items-center gap-4 p-3 rounded-xl ${bg} border-gray-700`}>
      {/* Avatar */}
      <div className="w-12 h-12 rounded-full bg-gray-700 text-white flex items-center justify-center font-bold">
        {item.avatar}
      </div>

      {/* Info + Progress */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-white font-semibold truncate">{item.name}</div>
            {view === "student" && hasSchool(item) && (
              <div className="text-sm text-gray-300 truncate">{item.school}</div>
            )}
          </div>

          <div className="text-right">
            <div className="text-xl font-bold text-blue-400">{item.score}</div>
            <div className="text-xs text-gray-400">points</div>
          </div>
        </div>

        <div className="mt-2 h-2 bg-gray-700 rounded-full overflow-hidden">
          <div
            style={{ width: `${pct}%` }}
            className="h-full bg-gradient-to-r from-orange-400 to-red-500"
          />
        </div>
      </div>
    </div>
  );
};

const Dashboard: React.FC = () => {
  const [view, setView] = useState<"student" | "university">("student");
  const [search, setSearch] = useState("");

  
  const source: Leader[] = view === "student" ? leaderboardData : universityData;

  
  const { sorted, filtered, maxScore } = useMemo(() => {
    const sortedList = [...source].sort((a, b) => b.score - a.score);
    const max = sortedList.length ? sortedList[0].score : 1;
    const q = search.trim().toLowerCase();
    const filteredList = q ? sortedList.filter((it) => it.name.toLowerCase().includes(q)) : sortedList;
    return { sorted: sortedList, filtered: filteredList, maxScore: max };
  }, [source, search]);

  
  const displayList = filtered;

  // Top 3 (from display list so top3 reflect search)
  const top3 = displayList.slice(0, 3);

  return (
    <div className="min-h-screen bg-gray-800 text-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-white">Dashboard</h1>
            <p className="text-sm text-gray-300">Overview of quizzes, drills and leaderboards</p>
          </div>

          {/* Controls: toggles + search */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="flex gap-2">
              <button
                onClick={() => setView("student")}
                className={`px-4 py-2 rounded-lg transition ${
                  view === "student"
                    ? "bg-blue-500 text-white"
                    : "border border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white"
                }`}
              >
                Student Ranking
              </button>
              <button
                onClick={() => setView("university")}
                className={`px-4 py-2 rounded-lg transition ${
                  view === "university"
                    ? "bg-purple-500 text-white"
                    : "border border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white"
                }`}
              >
                University Ranking
              </button>
            </div>

            <div className="relative">
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={view === "student" ? "Search students..." : "Search universities..."}
                className="ml-0 sm:ml-4 mt-2 sm:mt-0 px-4 py-2 rounded-lg bg-gray-900 border border-gray-700 placeholder-gray-500 focus:outline-none focus:border-blue-500"
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-gray-400 hover:text-white"
                  aria-label="clear search"
                >
                  ✕
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Stats + Leaderboard */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left: Stat cards */}
          <div className="md:col-span-1 space-y-4">
            {statCards.map((s, idx) => (
              <div key={idx} className="bg-gray-900/40 p-4 rounded-2xl shadow-md">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm text-gray-300">{s.title}</div>
                    <div className="text-2xl font-bold text-white">{s.value}</div>
                    <div className="text-xs text-gray-400">{s.subtitle}</div>
                  </div>
                  <div className="text-3xl text-blue-500">★</div>
                </div>
              </div>
            ))}

            {/* Preparedness Score small */}
            <div className="bg-blue-600 text-white p-4 rounded-2xl shadow-lg text-center">
              <div className="text-sm">School Preparedness Score</div>
              <div className="mt-4 mx-auto w-28 h-28 rounded-full bg-gradient-conic flex items-center justify-center text-2xl font-bold">78%</div>
              <div className="text-xs text-blue-100 mt-2">Measured by participation & drill performance</div>
            </div>
          </div>

          {/* Middle & Right: Leaderboard */}
          <div className="md:col-span-2 space-y-6">
            {/* Top 3 Highlight */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {top3.length ? (
                top3.map((item, i) => (
                  <div key={item.id} className="bg-gray-900/40 p-4 rounded-2xl shadow-md flex flex-col items-center gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-16 h-16 rounded-full bg-gray-700 text-white flex items-center justify-center font-bold text-lg">{item.avatar}</div>
                      <div className="text-left">
                        <div className="text-white font-bold">{item.name}</div>
                        {view === "student" && hasSchool(item) && <div className="text-xs text-gray-300">{item.school}</div>}
                      </div>
                    </div>
                    <div className="text-2xl font-extrabold text-blue-400">{item.score}</div>
                    <div className="flex items-center gap-2">
                      <Cup rank={i + 1} />
                      <div className="text-sm text-gray-300">Rank {i + 1}</div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-3 p-6 text-center text-gray-300 bg-gray-900/30 rounded-2xl">No results</div>
              )}
            </div>

            {/* Full list */}
            <div className="bg-gray-900/30 p-4 rounded-2xl">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-white">{view === "student" ? "Student Leaderboard" : "University Leaderboard"}</h3>
                <div className="text-sm text-gray-300">Updated just now</div>
              </div>

              <div className="space-y-3">
                {displayList.length ? (
                  displayList.map((item, idx) => (
                    <LeaderboardRow key={item.id} rank={idx + 1} item={item} maxScore={maxScore} view={view} />
                  ))
                ) : (
                  <div className="p-6 text-center text-gray-300">No matching {view === "student" ? "students" : "universities"} found.</div>
                )}
              </div>
            </div>

            {/* Activity / Recent Quizzes (mock) - only for student view */}
            {view === "student" && (
              <div className="bg-gray-900/30 p-4 rounded-2xl">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold">Recent Quiz Activity</h3>
                  <div className="text-sm text-gray-300">Last 7 days</div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="p-3 rounded-lg bg-gray-800/50">
                    <div className="text-sm text-gray-300">Quiz: Earthquake Safety</div>
                    <div className="text-white font-bold mt-2">Avg Score: 74%</div>
                    <div className="text-xs text-gray-400">Completed by 420 students</div>
                  </div>
                  <div className="p-3 rounded-lg bg-gray-800/50">
                    <div className="text-sm text-gray-300">Drill: Fire Evacuation</div>
                    <div className="text-white font-bold mt-2">Avg Score: 83%</div>
                    <div className="text-xs text-gray-400">Completed by 315 students</div>
                  </div>
                  <div className="p-3 rounded-lg bg-gray-800/50">
                    <div className="text-sm text-gray-300">Quiz: Flood Awareness</div>
                    <div className="text-white font-bold mt-2">Avg Score: 69%</div>
                    <div className="text-xs text-gray-400">Completed by 208 students</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* local style matches your home page style */}
      <style>
        {`
          @keyframes flicker {0%{transform:scale(1) rotate(0deg);}25%{transform:scale(1.02);}50%{transform:scale(1);}75%{transform:scale(1.02);}100%{transform:scale(1);} }
          .bg-gradient-conic {background: conic-gradient(#28a745 78%, #e0e0e0 0);} 
        `}
      </style>
    </div>
  );
};

export default Dashboard;