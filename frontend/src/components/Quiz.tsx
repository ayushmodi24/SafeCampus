import { useState } from "react";

interface Question {
  question: string;
  options: string[];
  answer: string;
}

const quizzesData: Record<number, Question[]> = {
  1: [ // Earthquake
    { question: "What causes most earthquakes?", options: ["Movement of tectonic plates", "Heavy rainfall", "Volcanic eruption only", "Human noise"], answer: "Movement of tectonic plates" },
    { question: "Which instrument is used to measure earthquake magnitude?", options: ["Thermometer", "Barometer", "Seismograph", "Compass"], answer: "Seismograph" },
    { question: "What scale measures earthquake intensity felt by people?", options: ["Celsius scale", "Richter scale", "Mercalli scale", "Kelvin scale"], answer: "Mercalli scale" },
    { question: "What is the safest type of ground to build houses on in earthquake zones?", options: ["Soft soil", "Swamp land", "Solid rock", "Riverbanks"], answer: "Solid rock" },
    { question: "Which item should always be in an earthquake emergency kit?", options: ["Torch and batteries", "Water and food", "First aid kit", "All of the above"], answer: "All of the above" },
    { question: "Where should heavy objects be stored in earthquake-prone homes?", options: ["On high shelves", "On low shelves or ground level", "On the roof", "Hanging on walls"], answer: "On low shelves or ground level" },
    { question: "Which is an important family preparedness step?", options: ["Making a communication plan", "Buying new clothes", "Painting walls", "Planting trees"], answer: "Making a communication plan" },
    { question: "Which action strengthens homes in earthquake zones?", options: ["Using flexible materials", "Painting walls", "Glass walls only", "Ignoring codes"], answer: "Using flexible materials" },
    { question: "What is the safest action indoors during an earthquake?", options: ["Run outside immediately", "Stand under heavy furniture", "Drop, cover, and hold under a table", "Stay in elevators"], answer: "Drop, cover, and hold under a table" },
    { question: "Where should you avoid standing during an earthquake?", options: ["Near windows and glass", "In a doorway", "Under a desk", "Away from falling objects"], answer: "Near windows and glass" },
  ],
  2: [ // Fire
    { question: "What is the leading cause of house fires?", options: ["Cooking accidents", "Earthquakes", "Open fields", "Floods"], answer: "Cooking accidents" },
    { question: "Which is NOT a type of fire extinguisher?", options: ["Water-based", "Foam", "Dry powder", "Ice extinguisher"], answer: "Ice extinguisher" },
    { question: "Which fire type should water NOT be used on?", options: ["Paper fire", "Electrical fire", "Wood fire", "Fabric fire"], answer: "Electrical fire" },
    { question: "What does 'Stop, Drop, and Roll' mean?", options: ["Dance move", "Extinguish fire on clothing", "Sports technique", "Earthquake drill"], answer: "Extinguish fire on clothing" },
    { question: "Why should every home have smoke alarms?", options: ["Decoration", "Quick alerts", "Lower bills", "Keep pets safe"], answer: "Quick alerts" },
    { question: "How often should you test smoke alarms?", options: ["Once a year", "Once a month", "Every 10 years", "Never"], answer: "Once a month" },
    { question: "Fire extinguishers at home should be kept:", options: ["In the kitchen", "On the roof", "Locked cupboards", "Basement only"], answer: "In the kitchen" },
    { question: "What should you do first if a fire breaks out?", options: ["Hide", "Alert others & evacuate", "Wait for firefighters", "Collect valuables"], answer: "Alert others & evacuate" },
    { question: "If smoke is present, how should you move?", options: ["Walk normally", "Run upstairs", "Crawl low", "Stand still"], answer: "Crawl low" },
    { question: "Why should you check doors before opening during fire?", options: ["See if locked", "Check heat (fire may be behind)", "Check neighbors", "Open slowly"], answer: "Check heat (fire may be behind)" },
  ],
  3: [ // Flood
    { question: "Which of the following can cause floods?", options: ["Heavy rainfall", "Dam failure", "Tsunami", "All of the above"], answer: "All of the above" },
    { question: "How can you identify flood risk?", options: ["Check flood maps & warnings", "Wait until water rises", "Ask neighbors", "Ignore updates"], answer: "Check flood maps & warnings" },
    { question: "Why listen to weather forecasts?", options: ["Entertainment", "Know floods in advance", "Farming tips", "Avoid TV"], answer: "Know floods in advance" },
    { question: "Which is a warning sign of flash floods?", options: ["Slowly rising water", "Sudden heavy rainfall", "Dry spells", "Clear skies"], answer: "Sudden heavy rainfall" },
    { question: "Which of these is NOT needed in flood kit?", options: ["Drinking water", "Non-perishable food", "Documents", "Video game console"], answer: "Video game console" },
    { question: "Why is an evacuation plan important?", options: ["Safest routes & meeting points", "Which neighbor to visit", "Store furniture", "Avoid bills"], answer: "Safest routes & meeting points" },
    { question: "Documents during floods should be kept in:", options: ["Plastic/waterproof container", "Cloth bag", "Under bed", "On roof"], answer: "Plastic/waterproof container" },
    { question: "What protects your home before floods?", options: ["Sandbags", "Switch off electricity", "Move valuables up", "All of the above"], answer: "All of the above" },
    { question: "If indoors during flood warning, you should:", options: ["Stay updated", "Gather kit", "Move up", "All of the above"], answer: "All of the above" },
    { question: "Why unsafe to walk/drive through floodwaters?", options: ["Too clean", "May hide drains & currents", "Vehicles washed away", "Both b & c"], answer: "Both b & c" },
  ],
}; interface QuizProps {
  sectionId: number;
  onClose: () => void;
}

const Quiz: React.FC<QuizProps> = ({ sectionId, onClose }) => {
  const questions = quizzesData[sectionId];
  const total = questions.length;

  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<(string | null)[]>(Array(total).fill(null));
  const [finished, setFinished] = useState(false);

  const handleSelect = (opt: string) => {
    const newAnswers = [...answers];
    newAnswers[current] = opt;
    setAnswers(newAnswers);
  };

  const handleFinish = () => {
    setFinished(true);
  };

  const score = answers.reduce(
    (acc, ans, i) => (ans === questions[i].answer ? acc + 1 : acc),
    0
  );

  return (
    <div className="fixed inset-0 bg-gray-900 text-white flex flex-col items-center justify-start p-8 z-50 overflow-y-auto">
      {!finished ? (
        <div className="w-full max-w-4xl bg-gray-800 rounded-2xl p-6 shadow-xl">
          {/* Progress */}
          <div className="mb-4 flex justify-between items-center">
            <span className="text-cyan-400 font-semibold">
              Question {current + 1} of {total}
            </span>
            <span>
              Attempted:{" "}
              {answers.filter((a) => a !== null).length}/{total}
            </span>
          </div>
          <div className="w-full bg-gray-700 h-3 rounded-full mb-6">
            <div
              className="h-3 bg-cyan-400 rounded-full transition-all"
              style={{
                width: `${((current + 1) / total) * 100}%`,
              }}
            />
          </div>

          {/* Question */}
          <h2 className="text-xl font-bold mb-4"
            onCopy={(e) => e.preventDefault()}        // Prevent Ctrl+C
            onContextMenu={(e) => e.preventDefault()}>
            {questions[current].question}
          </h2>

          {/* Options */}
          <div className="flex flex-col gap-3">
            {questions[current].options.map((opt) => (
              <button
                key={opt}
                onClick={() => handleSelect(opt)}
                className={`px-4 py-2 rounded-lg text-left transition-all duration-200 ${answers[current] === opt
                  ? "bg-cyan-500 text-black"
                  : "bg-gray-700 hover:bg-cyan-400 hover:text-black"
                  }`}
              >
                {opt}
              </button>
            ))}
          </div>

          {/* Navigation */}
          <div className="flex justify-between mt-6">
            <button
              onClick={() => setCurrent((c) => Math.max(0, c - 1))}
              disabled={current === 0}
              className={`px-4 py-2 rounded-full ${current === 0
                ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                : "bg-cyan-400 text-black hover:scale-105"
                }`}
            >
              Prev
            </button>
            {current + 1 === total ? (
              <button
                onClick={handleFinish}
                className="px-4 py-2 rounded-full bg-green-500 hover:bg-green-600"
              >
                Submit Quiz
              </button>
            ) : (
              <button
                onClick={() => setCurrent((c) => Math.min(total - 1, c + 1))}
                className="px-4 py-2 rounded-full bg-cyan-400 text-black hover:scale-105"
              >
                Next
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="w-full max-w-3xl bg-gray-800 rounded-2xl p-6 shadow-xl text-center">
          <h2 className="text-3xl font-bold text-cyan-400 mb-4">
            Quiz Completed 🎉
          </h2>
          <p
            className={`text-xl mb-6 ${score >= total * 0.7
              ? "text-green-400"
              : score >= total * 0.4
                ? "text-yellow-400"
                : "text-red-400"
              }`}
          >
            Your Score: {score}/{total}
          </p>

          <h3 className="text-lg font-semibold mb-3">Summary</h3>
          <ul className="text-left space-y-2">
            {questions.map((q, i) => (
              <li key={i}>
                <span className="font-medium">
                  Q{i + 1}: {q.question}
                </span>
                <br />
                <span>
                  Your Answer:{" "}
                  {answers[i] ?? (
                    <span className="text-gray-400">Not Attempted</span>
                  )}
                </span>
                <br />
                <span className="text-green-400">
                  Correct Answer: {q.answer}
                </span>
              </li>
            ))}
          </ul>

          <button
            onClick={onClose}
            className="mt-6 px-6 py-2 bg-red-500 text-white rounded-full hover:bg-red-600"
          >
            Close Quiz
          </button>
        </div>
      )}
    </div>
  );
};

export default Quiz;