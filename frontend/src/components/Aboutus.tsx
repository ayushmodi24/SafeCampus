import { useNavigate } from "react-router-dom";

export default function Aboutus() {
      const navigate = useNavigate();
  return (
    <section className="bg- py-16 px-6 md:px-20" id="about">
      <div className="max-w-5xl mx-auto text-center">
        {/* Heading */}
        <h2 className="text-4xl font-bold text-blue-700 mb-6">About SafeCampus</h2>
        <p className="text-lg text-gray-600 mb-12">
          Building flood-resilient communities across Punjab through education, preparedness, and digital innovation.
        </p>

        {/* Content Grid */}
        <div className="grid md:grid-cols-2 gap-10 text-left">
          {/* Who We Are */}
          <div className="bg-blue-50 p-6 rounded-2xl shadow-sm">
            <h3 className="text-2xl font-semibold text-blue-600 mb-3">
              Who We Are
            </h3>
            <p className="text-gray-700 leading-relaxed">
              SafeCampus is a Punjab-focused disaster preparedness platform dedicated to protecting schools, colleges, and communities from flood emergencies. We provide AI-powered early warning systems, interactive safety training, and region-specific guidance tailored for Punjab's unique flood patterns and monsoon challenges.
            </p>
          </div>

          {/* Our Mission */}
          <div className="bg-blue-50 p-6 rounded-2xl shadow-sm">
            <h3 className="text-2xl font-semibold text-blue-600 mb-3">
              Our Mission
            </h3>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Educate Punjab's students about monsoon flood risks and safety protocols.</li>
              <li>Provide real-time flood alerts specific to Punjab districts.</li>
              <li>Empower schools with virtual drill simulations and gamified learning.</li>
              <li>Connect communities with NDMA and Punjab State Disaster Management Authority resources.</li>
            </ul>
          </div>

          {/* What We Do */}
          <div className="bg-blue-50 p-6 rounded-2xl shadow-sm">
            <h3 className="text-2xl font-semibold text-blue-600 mb-3">
              What We Do
            </h3>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>🌊 Punjab-specific flood safety guidelines and evacuation routes.</li>
              <li>🎮 Interactive flood simulation games for schools and colleges.</li>
              <li>🤖 AI chatbot providing region-specific disaster guidance in Punjabi, Hindi, and English.</li>
              <li>📱 Real-time alerts for Sutlej, Beas, and Ravi river water levels.</li>
              <li>🏫 Virtual mock drills designed for Punjab educational institutions.</li>
            </ul>
          </div>

          {/* Punjab Focus */}
          <div className="bg-blue-50 p-6 rounded-2xl shadow-sm">
            <h3 className="text-2xl font-semibold text-blue-600 mb-3">
              Punjab-Specific Features
            </h3>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>🗺 District-wise flood risk mapping (Patiala, Ludhiana, Amritsar).</li>
              <li>🌾 Agricultural flood protection tips for farming communities.</li>
              <li>🚨 Integration with Punjab Emergency Services (108, Fire Brigade).</li>
              <li>📚 Content available in Punjabi (Gurmukhi script) and Hindi.</li>
            </ul>
          </div>
        </div>

        {/* Why Choose SafeCampus */}
        <div className="mt-12 bg-gradient-to-r from-blue-100 to-cyan-100 p-8 rounded-2xl shadow-md">
          <h3 className="text-2xl font-semibold text-blue-700 mb-4">
            Why Choose SafeCampus?
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Built by students, for students across Punjab.</li>
              <li>NDMA and Punjab SDMA approved guidelines.</li>
              <li>Free multilingual access for all educational institutions.</li>
              <li>Real-time integration with IMD weather forecasts.</li>
            </ul>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Interactive virtual reality flood simulations.</li>
              <li>Community-driven preparedness scoring system.</li>
              <li>Emergency contact integration with local authorities.</li>
              <li>Offline downloadable safety protocols and checklists.</li>
            </ul>
          </div>
        </div>

        {/* Punjab Disaster Statistics */}
        <div className="mt-12 bg-red-50 p-8 rounded-2xl shadow-md">
          <h3 className="text-2xl font-semibold text-red-700 mb-4">
            Why Punjab Needs SafeCampus
          </h3>
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-red-600">25+</div>
              <div className="text-gray-700">Major floods in Punjab since 2000</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-red-600">1000+</div>
              <div className="text-gray-700">Schools affected annually during monsoons</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-red-600">50%</div>
              <div className="text-gray-700">Students lack proper flood safety training</div>
            </div>
          </div>
          <p className="text-gray-700 mt-4 text-center">
            SafeCampus aims to reduce these numbers through proactive education and technology-driven preparedness.
          </p>
        </div>

        {/* Call to Action */}
        <div className="mt-12 bg-blue-600 text-white p-8 rounded-2xl shadow-lg">
          <h3 className="text-2xl font-semibold mb-4">Join Punjab's Flood Safety Movement</h3>
          <p className="mb-6">
            Together, we can build a safer Punjab where every student, teacher, and community member knows how to respond effectively during flood emergencies.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition"
            onClick={() => navigate("/login")}>
              Start Learning Now
            </button>
            {/* <button className="bg-orange-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-orange-600 transition">
              Download Punjab Safety Guide
            </button> */}
          </div>
        </div>
      </div>
    </section>
  );
}