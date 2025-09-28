import React, { useState } from "react";

const FloodModule: React.FC = () => {
  const lectures = [
    { title: "Understanding Flood Early Warnings", thumbnail: "/Flood.PNG", video: "/Floodvideo.mp4" },
    { title: "Safe Evacuation Routes", thumbnail: "https://img.youtube.com/vi/ScMzIvxBSi4/0.jpg", video: "/videos/flood2.mp4" },
    { title: "Preparing Emergency Kits", thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/0.jpg", video: "/videos/flood3.mp4" },
    { title: "Helping Vulnerable Groups", thumbnail: "https://img.youtube.com/vi/2vjPBrBU-TM/0.jpg", video: "/videos/flood4.mp4" },
    { title: "Community Flood Drills", thumbnail: "https://img.youtube.com/vi/tgbNymZ7vqY/0.jpg", video: "/videos/flood5.mp4" },
    { title: "Household Flood Safety", thumbnail: "https://img.youtube.com/vi/lTTajzrSkCw/0.jpg", video: "/videos/flood6.mp4" },
    { title: "Waterborne Diseases", thumbnail: "https://img.youtube.com/vi/aqz-KE-bpKQ/0.jpg", video: "/videos/flood7.mp4" },
    { title: "After Flood Cleanup", thumbnail: "https://img.youtube.com/vi/60ItHLz5WEA/0.jpg", video: "/videos/flood8.mp4" },
    { title: "Government Relief Programs", thumbnail: "https://img.youtube.com/vi/OPf0YbXqDm0/0.jpg", video: "/videos/flood9.mp4" },
    { title: "Rehabilitation Planning", thumbnail: "https://img.youtube.com/vi/kXYiU_JCYtU/0.jpg", video: "/videos/flood10.mp4" },
  ];

  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex gap-8">
      {/* Left Section */}
      <div className="w-1/3 bg-white rounded-xl shadow p-4">
        <img
          src="data:image/png;base64,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"
          alt="Flood Preparedness"
          className="w-full h-48 object-cover rounded-lg mb-4"
        />
        <h2 className="text-2xl font-bold mb-3">Flood Preparedness</h2>
        <ul className="list-disc list-inside text-gray-700 space-y-2">
          <li>Understand flood early warnings</li>
          <li>Safe evacuation routes</li>
          <li>Prepare emergency kits</li>
          <li>Helping vulnerable groups</li>
        </ul>
      </div>

      {/* Right Section */}
      <div className="w-2/3 bg-white rounded-xl shadow p-4">
        <h3 className="text-xl font-bold mb-4">Lectures</h3>

        {/* Video Player */}
        {selectedVideo && (
          <div className="mb-6">
            <video
              src={selectedVideo}
              controls
              autoPlay
              className="w-full rounded-lg shadow"
            />
            <button
              onClick={() => setSelectedVideo(null)}
              className="mt-3 bg-red-500 text-white px-4 py-2 rounded-lg"
            >
              Close Video
            </button>
          </div>
        )}

        {/* Thumbnails */}
        <ul className="grid grid-cols-2 gap-4">
          {lectures.map((lec, idx) => (
            <li
              key={idx}
              className="cursor-pointer bg-gray-100 rounded-lg overflow-hidden shadow hover:shadow-lg transition"
              onClick={() => setSelectedVideo(lec.video)}
            >
              <img
                src={lec.thumbnail}
                alt={lec.title}
                className="w-full h-32 object-cover"
              />
              <p className="p-2 text-gray-800 font-medium">{lec.title}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FloodModule;