import React, { useState } from "react";

const EarthquakeModule: React.FC = () => {
  const lectures = [
    {
      title: "Understanding Earthquake Risks",
      thumbnail: "https://img.youtube.com/vi/3m5qxZm_JqM/0.jpg",
      video: "/videos/earthquake1.mp4",
    },
    {
      title: "Safety Drills During Quakes",
      thumbnail: "https://img.youtube.com/vi/ScMzIvxBSi4/0.jpg",
      video: "/videos/earthquake2.mp4",
    },
    {
      title: "Post-Earthquake Precautions",
      thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/0.jpg",
      video: "/videos/earthquake3.mp4",
    },
    {
      title: "Community Resilience",
      thumbnail: "https://img.youtube.com/vi/2vjPBrBU-TM/0.jpg",
      video: "/videos/earthquake4.mp4",
    },
    {
      title: "Emergency Kits Preparation",
      thumbnail: "https://img.youtube.com/vi/tgbNymZ7vqY/0.jpg",
      video: "/videos/earthquake5.mp4",
    },
    {
      title: "Helping Vulnerable Groups",
      thumbnail: "https://img.youtube.com/vi/lTTajzrSkCw/0.jpg",
      video: "/videos/earthquake6.mp4",
    },
    {
      title: "Structural Safety Measures",
      thumbnail: "https://img.youtube.com/vi/aqz-KE-bpKQ/0.jpg",
      video: "/videos/earthquake7.mp4",
    },
    {
      title: "Aftershock Safety",
      thumbnail: "https://img.youtube.com/vi/60ItHLz5WEA/0.jpg",
      video: "/videos/earthquake8.mp4",
    },
    {
      title: "Disaster Management Teams",
      thumbnail: "https://img.youtube.com/vi/OPf0YbXqDm0/0.jpg",
      video: "/videos/earthquake9.mp4",
    },
    {
      title: "Rehabilitation & Recovery",
      thumbnail: "https://img.youtube.com/vi/kXYiU_JCYtU/0.jpg",
      video: "/videos/earthquake10.mp4",
    },
  ];

  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex gap-8">
      {/* Left Section */}
      <div className="w-1/3 bg-white rounded-xl shadow p-4">
        <img
          src="https://source.unsplash.com/400x250/?earthquake"
          alt="Earthquake Safety"
          className="w-full h-48 object-cover rounded-lg mb-4"
        />
        <h2 className="text-2xl font-bold mb-3">Earthquake Safety</h2>
        <ul className="list-disc list-inside text-gray-700 space-y-2">
          <li>Understanding earthquake risks</li>
          <li>Safety drills during quakes</li>
          <li>Post-earthquake precautions</li>
          <li>Community resilience</li>
        </ul>
      </div>

      {/* Right Section */}
      <div className="w-2/3 bg-white rounded-xl shadow p-4">
        <h3 className="text-xl font-bold mb-4">Lectures</h3>

        {/* Video Player */}
        {selectedVideo ? (
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
        ) : null}

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

export default EarthquakeModule;