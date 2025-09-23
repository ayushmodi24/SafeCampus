import React, { useState } from "react";

// Question bank (can expand later)
const questions = [
  {
    text: "🌍 An earthquake starts shaking. What’s your first move?",
    options: [
      { text: "Run outside immediately", score: -5 },
      { text: "Drop, Cover & Hold under sturdy table", score: 10 },
      { text: "Stand near glass window", score: -10 },
    ],
    category: "Earthquake",
  },
  {
    text: "🌊 Flood water is rising. What do you grab first?",
    options: [
      { text: "Emergency kit + documents", score: 10 },
      { text: "TV & fridge", score: -10 },
      { text: "Nothing, just run", score: -5 },
    ],
    category: "Flood",
  },
  {
    text: "🔥 A fire breaks out at night. What do you do first?",
    options: [
      { text: "Try to save valuables", score: -10 },
      { text: "Alert family & exit via evacuation route", score: 10 },
      { text: "Pour water without checking source", score: -5 },
    ],
    category: "Fire",
  },
  {
    text: "🌀 Cyclone warning issued. What’s your prep?",
    options: [
      { text: "Charge phone + store food/water", score: 10 },
      { text: "Go to beach to see waves", score: -10 },
      { text: "Ignore alerts & sleep", score: -5 },
    ],
    category: "Cyclone",
  },
];

const PreparednessGame: React.FC = () => {
  const [step, setStep] = useState(0);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<{ category: string; score: number }[]>([]);
  const [finished, setFinished] = useState(false);

  const handleAnswer = (points: number, category: string) => {
    setScore((prev) => prev + points);
    setAnswers((prev) => [...prev, { category, score: points }]);
    if (step + 1 < questions.length) {
      setStep(step + 1);
    } else {
      setFinished(true);
    }
  };

  const getResultMessage = () => {
    if (score >= 30) return "🚀 You are a Disaster Ninja! Totally ready!";
    if (score >= 15) return "⚡ Survivor in Training. Improve your kit!";
    return "💀 Danger Zone! Let’s train harder!";
  };

  const getAdvice = () => {
    const weakAreas = answers.filter((a) => a.score < 0).map((a) => a.category);
    if (weakAreas.length === 0) return "✅ Excellent! You’re strong in all areas.";
    return `⚠️ Improve your knowledge in: ${[...new Set(weakAreas)].join(", ")}.`;
  };

  return (
    <div className="flex flex-col items-center justify-center h-[600px] bg-black text-white p-6 rounded-2xl shadow-xl">
      {!finished ? (
        <>
          <h2 className="text-2xl font-bold mb-6">Disaster Preparedness Challenge</h2>
          <p className="text-lg mb-4">{questions[step].text}</p>
          <div className="flex flex-col gap-3 w-full max-w-md">
            {questions[step].options.map((opt, idx) => (
              <button
                key={idx}
                onClick={() => handleAnswer(opt.score, questions[step].category)}
                className="bg-[#1C1C1C] hover:bg-gray-700 p-3 rounded-xl border border-gray-600 text-left"
              >
                {opt.text}
              </button>
            ))}
          </div>
          <p className="mt-6 text-sm text-gray-400">
            Question {step + 1} of {questions.length}
          </p>
        </>
      ) : (
        <div className="flex flex-col items-center">
          {/* Score Circle */}
          <div className="relative w-40 h-40 mb-6">
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="80"
                cy="80"
                r="70"
                stroke="#333"
                strokeWidth="15"
                fill="none"
              />
              <circle
                cx="80"
                cy="80"
                r="70"
                stroke="#00FF88"
                strokeWidth="15"
                fill="none"
                strokeDasharray={440}
                strokeDashoffset={440 - (score / 40) * 440}
                strokeLinecap="round"
                className="transition-all duration-700 ease-out"
              />
            </svg>
            <span className="absolute inset-0 flex items-center justify-center text-2xl font-bold">
              {Math.max(score, 0)}/40
            </span>
          </div>

          {/* Result */}
          <h3 className="text-xl font-bold mb-2">{getResultMessage()}</h3>
          <p className="text-gray-300 mb-4">{getAdvice()}</p>

          {/* Restart */}
          <button
            onClick={() => {
              setStep(0);
              setScore(0);
              setAnswers([]);
              setFinished(false);
            }}
            className="bg-[#1C1C1C] hover:bg-gray-700 px-6 py-3 rounded-xl border border-gray-600"
          >
            🔄 Try Again
          </button>
        </div>
      )}
    </div>
  );
};

export default PreparednessGame;
