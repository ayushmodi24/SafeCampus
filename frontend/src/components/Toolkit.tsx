import React from "react";

const Toolkit: React.FC = () => {
  return (
    <div className="p-6 min-h-screen bg-gray-900 text-white">
      <h1 className="text-3xl font-bold mb-6 text-red-400">Emergency Toolkit</h1>

      {/* SOS Button */}
      <div className="flex justify-center mb-6">
        <button
          className="bg-red-600 text-white text-2xl font-bold px-12 py-6 rounded-full shadow-lg hover:bg-red-700 animate-pulse"
          onClick={() => alert("🚨 SOS Activated! Authorities have been notified.")}
        >
          🚨 SOS
        </button>
      </div>

      {/* Directory */}
      <div className="bg-gray-800 shadow rounded p-4 mb-6">
        <h2 className="font-semibold">Emergency Contacts</h2>
        <ul className="mt-2 space-y-1">
          <li><a href="tel:101" className="text-blue-400">🔥 Fire Department (101)</a></li>
          <li><a href="tel:102" className="text-blue-400">🚑 Ambulance (102)</a></li>
          <li><a href="tel:100" className="text-blue-400">👮 Police (100)</a></li>
        </ul>
      </div>

      {/* Offline Guides */}
      <div className="bg-gray-800 shadow rounded p-4">
        <h2 className="font-semibold">Download Safety Guides</h2>
        <ul className="mt-2 space-y-1">
          <li><a href="/guides/flood.pdf" download className="text-blue-400">🌊 Flood Safety Guide</a></li>
          <li><a href="/guides/fire.pdf" download className="text-blue-400">🔥 Fire Safety Guide</a></li>
          <li><a href="/guides/earthquake.pdf" download className="text-blue-400">🌍 Earthquake Safety Guide</a></li>
        </ul>
      </div>
    </div>
  );
};

export default Toolkit;
