// import React, { useEffect, useRef, useState } from "react";
// import SendIcon from '@mui/icons-material/Send';

// const Chatbot: React.FC = () => {
//     const [messages, setMessages] = useState<{ sender: "user" | "bot"; text: string }[]>([]);
//     const [userInput, setUserInput] = useState("");
//     const chatBoxRef = useRef<HTMLDivElement>(null);

//     const [kitItems, setKitItems] = useState([
//         { id: 1, name: "Torch", checked: false },
//         { id: 2, name: "First Aid Kit", checked: false },
//         { id: 3, name: "Water Bottle", checked: false },
//         { id: 4, name: "Power Bank", checked: false },
//         { id: 5, name: "Emergency Contact List", checked: false },
//     ]);

//     // ✅ Score calculation
//     const completedCount = kitItems.filter((i) => i.checked).length;
//     const totalItems = kitItems.length;
//     const preparednessScore = Math.round((completedCount / totalItems) * 100);

//     useEffect(() => {
//         addMessage("Hello 👋 I am your Disaster Preparedness Bot!", "bot");
//     }, []);

//     const addMessage = (text: string, sender: "user" | "bot") => {
//         setMessages((prev) => [...prev, { sender, text }]);
//         setTimeout(() => {
//             if (chatBoxRef.current) {
//                 chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
//             }
//         }, 100);
//     };

//     const askAI = async () => {
//         if (!userInput.trim()) return;

//         addMessage(userInput, "user");
//         const inputText = userInput;
//         setUserInput("");

//         try {
//             const response = await fetch(
//                 "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyCaG_y9fBKkM5O7gzlyn5cYA5eZRnUg_88",
//                 {
//                     method: "POST",
//                     headers: { "Content-Type": "application/json" },
//                     body: JSON.stringify({
//                         system_instruction: {
//                             role: "system",
//                             parts: [
//                                 {
//                                     text: `You are a helpful chatbot that provides guidance on **disaster preparedness in India**.
// - Focus on earthquakes, floods, fires, cyclones, and region-specific disasters.  
// - Always provide **NDMA / UNDRR-backed safety protocols**.  
// - Encourage **practical actions**: evacuation plans, mock drills, first aid, safe assembly points, emergency contact use.  
// - For schools/colleges: suggest **virtual drills, gamified safety modules, and localized alerts**.  
// - Highlight importance of training students, staff, and parents.  
// - Provide region-specific info (e.g., floods in Punjab, cyclones in Odisha).  
// - If asked about non-disaster topics, politely redirect to disaster awareness.  
// - Use simple Hindi/English mix for clarity.`
//                                 },
//                             ],
//                         },
//                         contents: [{ role: "user", parts: [{ text: inputText }] }],
//                     }),
//                 }
//             );

//             const data = await response.json();
//             const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text || "⚠️ No reply from AI.";
//             addMessage(reply, "bot");
//         } catch (error) {
//             console.error(error);
//             addMessage("⚠️ Error fetching AI response.", "bot");
//         }
//     };
//     const toggleItem = (id: number) => {
//         setKitItems((prev) =>
//             prev.map((item) =>
//                 item.id === id ? { ...item, checked: !item.checked } : item
//             )
//         );
//     };

//     return (
//         <div className="flex justify-center items-center h-[712px] bg-gray-800 px4">
//             <div className="bg-[#111111] h-[712px] w-[350px] p-6 text-white flex flex-col">
//                 {/* Bot Avatar + Title */}
//                 <div className="flex flex-col items-center mb-6">
//                     <img
//                         src="https://cdn-icons-png.flaticon.com/512/4712/4712109.png"
//                         alt="Bot Avatar"
//                         className="w-20 h-20 rounded-full mb-3 border-2 pl-3 py-2 border-gray-600"
//                     />
//                     <h2 className="text-xl font-bold">Disaster Bot</h2>
//                     <p className="text-gray-400 text-sm text-center mt-1">
//                         Your AI Safety Guide
//                     </p>
//                 </div>

//                 {/* Emergency Kit Checklist */}
//                 <div className="mb-6">
//                     <h3 className="text-lg font-bold mb-3">🧰 Emergency Kit</h3>
//                     {kitItems.map((item) => (
//                         <div key={item.id} className="flex items-center gap-2 mb-2">
//                             <input
//                                 type="checkbox"
//                                 checked={item.checked}
//                                 onChange={() => toggleItem(item.id)}
//                                 className="accent-red-500 cursor-pointer"
//                             />
//                             <span>{item.name}</span>
//                         </div>
//                     ))}
//                 </div>

//                 {/* Preparedness Score */}
//                 <div className="mt-auto">
//                     <h3 className="text-lg font-bold mb-3">🎯 Preparedness Score</h3>
//                     <div className="w-full bg-gray-700 rounded-full h-3">
//                         <div
//                             className="bg-green-500 h-3 rounded-full transition-all duration-300"
//                             style={{ width: `${preparednessScore}%` }}
//                         />
//                     </div>
//                     <p className="text-sm text-gray-400 mt-2">
//                         You are {preparednessScore}% prepared!
//                     </p>
//                 </div>
//             </div>

//             <div className="w-[1500px]  h-full bg-black rounded-r-2xl shadow-2xl flex flex-col overflow-hidden">
//                 {/* Header */}
//                 <div className="bg-black text-white p-5 text-center font-bold text-xl md:text-2xl">
//                     Disaster Preparedness Bot
//                 </div>

//                 {/* Chat Box */}
//                 <div
//                     ref={chatBoxRef}
//                     className="flex-1 p-6 overflow-y-auto flex flex-col gap-3 bg-[#1A1A1A]"
//                 >
//                     {messages.map((msg, idx) => (
//                         <div
//                             key={idx}
//                             className={`px-4 py-2 rounded-2xl text-sm md:text-base max-w-[70%] break-words text-[#B3B3B3]
//                 ${msg.sender === "user" ? "bg-[#333333] self-end" : "bg-[#1C1C1C] self-start"}`}
//                         >
//                             {msg.sender === "user" ? " " : " "}
//                             {msg.text}
//                         </div>
//                     ))}
//                 </div>

//                 {/* Input */}
//                 <div className="flex border-t border-gray-300 p-3 bg-[#1C1C1C] ">
//                     <input
//                         type="text"
//                         className="flex-1 text-white  p-3 text-sm md:text-base rounded-xl bg-[#1C1C1C] outline-none border border-gray-300 focus:border-white"
//                         placeholder="Ask about disaster safety..."
//                         value={userInput}
//                         onChange={(e) => setUserInput(e.target.value)}
//                         onKeyDown={(e) => e.key === "Enter" && askAI()}
//                     />
//                     <button
//                         onClick={askAI}
//                         className="bg-[#1C1C1C] hover:bg-black text-white ml-1 px-6 md:px-8 rounded-xl text-sm md:text-base font-semibold border-1"
//                     >
//                         <SendIcon />
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Chatbot;

import React, { useEffect, useRef, useState } from "react";
import SendIcon from "@mui/icons-material/Send";

const recommendedQuestions = [
    "How can I create a family evacuation plan for floods in Punjab?",
    "What items are essential in an earthquake emergency kit in Northern India?",
    "How do I prepare my school for cyclones in Odisha?",
    "Best practices for fire safety in high-rise buildings?",
    "How to conduct a mock disaster drill effectively at home?",
    "What region-specific early warning apps exist for tsunamis and floods?",
    "How to safely store and manage emergency water and food supplies?",
    "Steps to maintain communication during a disaster if the power is out?",
    "How to make a disaster preparedness checklist for elderly or differently-abled people?",
    "What are NDMA-approved evacuation protocols for urban vs rural areas?",
];


const Chatbot: React.FC = () => {
    const [messages, setMessages] = useState<{ sender: "user" | "bot"; text: string }[]>([]);
    const [userInput, setUserInput] = useState("");
    const chatBoxRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        addMessage("Hello 👋 I am your Disaster Preparedness Bot!", "bot");
    }, []);

    const addMessage = (text: string, sender: "user" | "bot") => {
        setMessages((prev) => [...prev, { sender, text }]);
        setTimeout(() => {
            if (chatBoxRef.current) {
                chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
            }
        }, 100);
    };
    const detectLanguage = (text: string) => {
    const punjabiChars = /[\u0A00-\u0A7F]/; // Gurmukhi
    const hindiChars = /[\u0900-\u097F]/;   // Devanagari

    if (punjabiChars.test(text)) return "punjabi";
    if (hindiChars.test(text)) return "hindi";

    const words = text.toLowerCase().split(/\s+/);

    // Common Latin-script Hindi words for Hinglish detection
    const hinglishWords = new Set([
        "m", "main", "h", "hai", "kaise", "kya", "nahi", "haan", "yeh", "woh",
        "mera", "meri", "tum", "apna", "karna", "se", "me", "hogi", "hoga", "raha", "rahi"
    ]);

    let hinglishCount = 0;
    let englishCount = 0;

    words.forEach(word => {
        if (hinglishWords.has(word)) hinglishCount++;
        else if (/^[A-Za-z]+$/.test(word)) englishCount++;
    });

    const total = words.length || 1;

    if (hinglishCount / total > 0.2) return "hinglish"; // >20% words are Hinglish
    if (englishCount / total > 0.7) return "english";   // >70% English words
    return "hinglish"; // fallback
};



    //     const askAI = async (text?: string) => {
    //         const inputText = text || userInput;
    //         if (!inputText.trim()) return;

    //         addMessage(inputText, "user");
    //         setUserInput("");

    //         try {
    //             const response = await fetch(
    //                 "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyCaG_y9fBKkM5O7gzlyn5cYA5eZRnUg_88",
    //                 {
    //                     method: "POST",
    //                     headers: { "Content-Type": "application/json" },
    //                     body: JSON.stringify({
    //                         system_instruction: {
    //                             role: "system",
    //                             parts: [
    //                                 {
    //                                     text: `You are a helpful chatbot that provides guidance on **disaster preparedness in India**.
    // - Focus on earthquakes, floods, fires, cyclones, and region-specific disasters.  
    // - Always provide **NDMA / UNDRR-backed safety protocols**.  
    // - Encourage **practical actions**: evacuation plans, mock drills, first aid, safe assembly points, emergency contact use.  
    // - For schools/colleges: suggest **virtual drills, gamified safety modules, and localized alerts**.  
    // - Highlight importance of training students, staff, and parents.  
    // - Provide region-specific info (e.g., floods in Punjab, cyclones in Odisha).  
    // - If asked about non-disaster topics, politely redirect to disaster awareness.  
    // - Use simple Hindi/English mix for clarity.`,
    //                                 },
    //                             ],
    //                         },
    //                         contents: [{ role: "user", parts: [{ text: inputText }] }],
    //                     }),
    //                 }
    //             );

    //             const data = await response.json();
    //             const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text || "⚠️ No reply from AI.";
    //             addMessage(reply, "bot");
    //         } catch (error) {
    //             console.error(error);
    //             addMessage("⚠️ Error fetching AI response.", "bot");
    //         }
    //     };

    const askAI = async (text?: string) => {
        const inputText = text || userInput;
        if (!inputText.trim()) return;

        addMessage(inputText, "user");
        setUserInput("");

        const lang = detectLanguage(inputText);

        // System prompt based on language
        let systemPrompt = "";
        if (lang === "english") {
            systemPrompt = `You are a helpful chatbot that provides guidance on disaster preparedness in India.
- Respond strictly in English only; do not use Hindi or any other language.
- Give answers in clear numbered or bullet-point format.`;
        } else if (lang === "hindi") {
            systemPrompt = `आप एक मददगार चैटबोट हैं जो भारत में आपदा तैयारी पर मार्गदर्शन देता है।
- उत्तर केवल हिंदी में दें।
- उत्तर बिंदुवार (point-wise) दें।`;
        } else if (lang === "punjabi") {
            systemPrompt = `ਤੁਸੀਂ ਇੱਕ ਸਹਾਇਕ ਚੈਟਬੋਟ ਹੋ ਜੋ ਭਾਰਤ ਵਿੱਚ ਆਫ਼ਤਾਂ ਲਈ ਤਿਆਰੀ ਬਾਰੇ ਸਲਾਹ ਦਿੰਦਾ ਹੈ।
- ਜਵਾਬ ਸਿਰਫ ਪੰਜਾਬੀ ਵਿੱਚ ਦਿਓ।
- ਜਵਾਬ ਬਿੰਦੂ-ਵਾਰ (point-wise) ਹੋਣੇ ਚਾਹੀਦੇ ਹਨ।`;
        } else {
            systemPrompt = `You are a helpful chatbot that provides guidance on disaster preparedness in India.
- Respond in Hinglish (mix of Hindi & English).
- Give answers in clear numbered or bullet-point format.`;
        }

        try {
            const response = await fetch(
                "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyCaG_y9fBKkM5O7gzlyn5cYA5eZRnUg_88",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        system_instruction: { role: "system", parts: [{ text: systemPrompt }] },
                        contents: [{ role: "user", parts: [{ text: inputText }] }],
                    }),
                }
            );

            const data = await response.json();
            const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text || "⚠️ No reply from AI.";
            addMessage(reply, "bot");
        } catch (error) {
            console.error(error);
            addMessage("⚠️ Error fetching AI response.", "bot");
        }
    };

    return (
        <div className="flex justify-center items-center h-[712px] bg-gray-800 px4">
            {/* Left Panel */}
            <div className="bg-[#111111] h-[712px] w-[450px] p-6 text-white flex flex-col">
                {/* Bot Avatar + Title */}
                <div className="flex flex-col items-center mb-4">
                    <img
                        src="https://cdn-icons-png.flaticon.com/512/4712/4712109.png"
                        alt="Bot Avatar"
                        className="w-20 h-20 rounded-full mb-3 border-2 pl-3 py-2 border-gray-600"
                    />
                    <h2 className="text-xl font-bold">Disaster Bot</h2>
                    <p className="text-gray-400 text-sm text-center mt-1">Your AI Safety Guide</p>
                </div>

                {/* Recommended Questions */}
                <h3 className="text-lg font-bold mb-3">💡 Recommended Questions</h3>
                <div className="mb-5 flex-1 overflow-y-auto custom-scrollbar">
                    <ul className="flex flex-col gap-2 mr-2">
                        {recommendedQuestions.map((q, idx) => (
                            <li
                                key={idx}
                                onClick={() => askAI(q)}
                                className="cursor-pointer bg-[#333333] hover:bg-gray-600 p-2 rounded-2xl transition"
                            >
                                {q}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Chat Area */}
            <div className="w-[1500px] h-full bg-black rounded-r-2xl shadow-2xl flex flex-col overflow-hidden">
                {/* Header */}
                <div className="bg-black text-white p-5 text-center font-bold text-xl md:text-2xl">
                    Disaster Preparedness Bot
                </div>

                {/* Chat Box */}
                <div
                    ref={chatBoxRef}
                    className="flex-1 p-6 overflow-y-auto flex flex-col gap-3 bg-[#1A1A1A]"
                >
                    {messages.map((msg, idx) => (
                        <div
                            key={idx}
                            className={`px-4 py-2 rounded-2xl text-sm md:text-base max-w-[70%] break-words text-[#B3B3B3]
                ${msg.sender === "user" ? "bg-[#333333] self-end" : "bg-[#1C1C1C] self-start"}`}
                        >
                            {msg.sender === "user" && <span className="text-gray-400 text-xs mr-1">[{detectLanguage(msg.text)}]</span>}
                            {msg.text}
                        </div>
                    ))}
                </div>

                {/* Input */}
                <div className="flex border-t border-gray-300 p-3 bg-[#1C1C1C]">
                    <input
                        type="text"
                        className="flex-1 text-white p-3 text-sm md:text-base rounded-xl bg-[#1C1C1C] outline-none border border-gray-300 focus:border-white"
                        placeholder="Ask about disaster safety..."
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && askAI()}
                    />
                    <button
                        onClick={() => askAI()}
                        className="bg-[#1C1C1C] hover:bg-black text-white ml-1 px-6 md:px-8 rounded-xl text-sm md:text-base font-semibold border-1"
                    >
                        <SendIcon />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Chatbot;
