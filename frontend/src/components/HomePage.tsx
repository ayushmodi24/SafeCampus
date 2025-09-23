// src/FrontPage.tsx
import React, { useState } from "react";

const videoSources = [
  "/video2.mp4",
  "/video3.mp4",
  "/video4.mp4",
];

const HomePage: React.FC = () => {
  const [currentVideo, setCurrentVideo] = useState(0);

  const handleVideoEnd = () => {
    setCurrentVideo((prev) => (prev + 1) % videoSources.length);
  };
  return (
    <div className="font-sans scroll-smooth bg-gray-800 text-gray-800">
      <section className="relative w-full h-screen flex">
        {/* Left side content */}
        <div className="absolute inset-0 flex items-center px-16 z-10">
          <div className="w-1/2 text-white">
            <h1 className="text-6xl font-bold"><span className="text-blue-600">Be Ready. Stay Safe.</span><br /><h2 className="text-red-700 mt-2">Learn Disaster Preparedness Digitally.</h2></h1>
            <p className="mt-6 text-lg text-gray-300">
              Stay prepared with our AI-powered disaster prediction and
              response system.
            </p>
          </div>
        </div>

        {/* Background video */}
        <video
          key={currentVideo} // forces re-render so new video starts
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          muted
          playsInline
          onEnded={handleVideoEnd} // trigger next video
        >
          <source src={videoSources[currentVideo]} type="video/mp4" />
        </video>

        {/* Black → Transparent overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent"></div>
      </section>



      {/* How It Works */}
      <section id="how-it-works" className="max-w-7xl mx-auto py-24 px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-blue-600 mb-12">How It Works</h2>
        <div className="flex flex-wrap justify-center gap-10">
          <div className="bg-gray-100/10 backdrop-blur rounded-2xl p-8 shadow-lg text-gray-100 hover:-translate-y-2 hover:shadow-xl transition w-72">
            <div className="text-4xl text-blue-600 mb-4"><i className="fas fa-book-reader"></i></div>
            <h3 className="text-xl font-semibold mb-3">Learn Modules</h3>
            <p className="">Watch animated videos and complete quizzes to learn about floods, earthquakes, fires, and other disasters.</p>
          </div>
          <div className="bg-gray-100/10 backdrop-blur rounded-2xl p-8 shadow-lg text-gray-100 hover:-translate-y-2 hover:shadow-xl transition w-72">
            <div className="text-4xl text-blue-600 mb-4"><i className="fas fa-vr-cardboard"></i></div>
            <h3 className="text-xl font-semibold mb-3">Practice Drills</h3>
            <p className="">Engage in virtual simulations to practice real-life disaster scenarios and make safe decisions.</p>
          </div>
          <div className="bg-gray-100/10 backdrop-blur rounded-2xl p-8 shadow-lg text-gray-100  hover:-translate-y-2 hover:shadow-xl transition w-72">
            <div className="text-4xl text-blue-600 mb-4"><i className="fas fa-bell"></i></div>
            <h3 className="text-xl font-semibold mb-3">Stay Ready</h3>
            <p className="">Receive real-time alerts and certificates upon completing drills and modules to track preparedness.</p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-blue-600 mb-12">Features</h2>
        <div className="flex flex-wrap justify-center gap-8">
          {[
            { icon: "fas fa-gamepad", title: "Gamified Learning", desc: "Earn badges & points while learning about disaster safety." },
            { icon: "fas fa-vr-cardboard", title: "Virtual Drills", desc: "3D/VR simulations for practical disaster practice." },
            { icon: "fas fa-globe", title: "Multi-language", desc: "Access in English, Hindi, or your regional language." },
            { icon: "fas fa-bell", title: "Real-time Alerts", desc: "Instant warnings for your region in case of disasters." },
            { icon: "fas fa-ambulance", title: "Emergency SOS", desc: "One-click access to fire brigade, hospitals, and authorities." },
            { icon: "fas fa-chart-line", title: "Admin Dashboard", desc: "Track student progress, drill scores, and preparedness metrics." },
          ].map((f, idx) => (
            <div key={idx} className="bg-gray-100/10 backdrop-blur rounded-2xl p-8 shadow-lg text-gray-100 hover:-translate-y-2 hover:shadow-xl transition w-72 text-center">
              <div className="text-4xl text-orange-500 mb-4"><i className={f.icon}></i></div>
              <h3 className="text-xl font-semibold mb-3">{f.title}</h3>
              <p className="">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Preparedness Score */}
      <section id="score" className="bg-blue-600 text-white py-20 px-4 max-w-md mx-auto rounded-2xl shadow-lg text-center my-24">
        <h3 className="text-2xl font-bold mb-6">Our School Preparedness Score</h3>
        <div className="w-36 h-36 mx-auto rounded-full bg-gradient-conic from-green-500 via-green-500 to-gray-200 flex items-center justify-center text-3xl font-bold">78%</div>
        <p className="mt-4">Measured based on student participation, quiz scores, and virtual drill performance.</p>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-24 px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-blue-600 mb-12">What Our Stakeholders Say</h2>
        <div className="flex flex-wrap justify-center gap-8">
          {[
            { text: "Now our students know how to react in an earthquake and other disasters. It’s a game changer for safety education.", author: "— Principal, XYZ School" },
            { text: "My child enjoys learning through interactive drills and earns badges, making safety education fun!", author: "— Parent, ABC City" },
            { text: "Teachers can easily track which students need extra training. The dashboard is very intuitive.", author: "— Teacher, LMN School" },
          ].map((t, idx) => (
            <div key={idx} className="bg-gray-100/10 backdrop-blur rounded-2xl p-8 shadow-lg text-gray-100 italic hover:-translate-y-2 hover:shadow-xl transition w-80">
              {t.text}
              <div className="text-blue-600 font-bold text-right mt-4">{t.author}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer id="footer" className="bg-gray-900 text-white py-12 text-center">
        <p>&copy; 2025 SafeCampus. All rights reserved.</p>
        <p>Contact: <a href="mailto:info@safecampus.com" className="text-blue-600 hover:underline">info@safecampus.com</a></p>
      </footer>

      {/* Tailwind Animations */}
      <style>
        {`
          @keyframes shake {0%{transform:translateX(0);}20%{transform:translateX(-5px);}40%{transform:translateX(5px);}60%{transform:translateX(-5px);}80%{transform:translateX(5px);}100%{transform:translateX(0);}}
          @keyframes wave {0%{transform:translateY(0);}50%{transform:translateY(-5px);}100%{transform:translateY(0);}}
          @keyframes flicker {0%{transform:scale(1) rotate(0deg);}25%{transform:scale(1.1) rotate(2deg);}50%{transform:scale(1) rotate(-2deg);}75%{transform:scale(1.1) rotate(2deg);}100%{transform:scale(1) rotate(0deg);}}
          .animate-shake {animation: shake 1s infinite;}
          .animate-wave {animation: wave 2s infinite ease-in-out;}
          .animate-flicker {animation: flicker 1.2s infinite ease-in-out;}
          .bg-gradient-conic {background: conic-gradient(#28a745 78%, #e0e0e0 0);}
        `}
      </style>
    </div>
  );
};

export default HomePage;
