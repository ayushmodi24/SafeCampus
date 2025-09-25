// // import React, { useState } from "react";

// // interface Video {
// //   id: number;
// //   title: string;
// //   src: string;
// //   watched: boolean;
// // }

// // interface Section {
// //   id: number;
// //   title: string;
// //   videos: Video[];
// // }

// // const sectionsData: Section[] = [
// //   {
// //     id: 1,
// //     title: "Earthquake",
// //     videos: [
// //       { id: 1, title: "Evacuation Drill", src: "/videos/earthquake1.mp4", watched: false },
// //       { id: 2, title: "Safety Tips", src: "/videos/earthquake2.mp4", watched: false },
// //       { id: 3, title: "First Aid Basics", src: "/videos/earthquake3.mp4", watched: false },
// //     ],
// //   },
// //   {
// //     id: 2,
// //     title: "Fire",
// //     videos: [
// //       { id: 1, title: "What is Fire", src: "/video4.mp4", watched: false },
// //       { id: 2, title: "How to survive Fire", src: "/video2.mp4", watched: false },
// //       { id: 3, title: "Do's and Dont's", src: "/video3.mp4", watched: false },
// //     ],
// //   },
// //   {
// //     id: 3,
// //     title: "Flood",
// //     videos: [
// //       { id: 1, title: "What is Flood", src: "/video4.mp4", watched: false },
// //       { id: 2, title: "How to survive Flood", src: "/video2.mp4", watched: false },
// //       { id: 3, title: "Do's and Dont's", src: "/video3.mp4", watched: false },
// //     ],
// //   },
// // ];

// // const VirtualDrill: React.FC = () => {
// //   const [sections, setSections] = useState(sectionsData);
// //   const [activeSection, setActiveSection] = useState(1);

// //   const markWatched = (sectionId: number, videoId: number) => {
// //     setSections((prev) =>
// //       prev.map((section) =>
// //         section.id === sectionId
// //           ? {
// //               ...section,
// //               videos: section.videos.map((v) =>
// //                 v.id === videoId ? { ...v, watched: true } : v
// //               ),
// //             }
// //           : section
// //       )
// //     );
// //   };

// //   const isQuizUnlocked = (section: Section) => {
// //     return section.videos.every((v) => v.watched);
// //   };

// //   const active = sections.find((s) => s.id === activeSection)!;

// //   return (
// //     <div className="min-h-screen bg-gray-900 p-8 text-white">
// //       <h1 className="text-4xl text-center text-cyan-400 drop-shadow-[0_0_10px_#06b6d4] mb-8">
// //         Virtual Drill & Preparedness
// //       </h1>

// //       {/* Section Tabs */}
// //       <div className="flex gap-4 mb-6 flex-wrap justify-center">
// //         {sections.map((section) => (
// //           <button
// //             key={section.id}
// //             onClick={() => setActiveSection(section.id)}
// //             className={`px-4 py-2 rounded-full transition-all ${
// //               activeSection === section.id
// //                 ? "bg-cyan-400 text-gray-900 shadow-[0_0_10px_#06b6d4]"
// //                 : "bg-gray-700 hover:bg-cyan-400 hover:text-gray-900"
// //             }`}
// //           >
// //             {section.title}
// //           </button>
// //         ))}
// //       </div>

// //       {/* Videos Grid */}
// //       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
// //         {active.videos.map((video) => (
// //           <div key={video.id} className="bg-gray-800 p-4 h-[500px] rounded-lg shadow-lg">
// //             <video
// //               src={video.src}
// //               controls
// //               className="rounded-md w-[620px] h-[400px] mb-5"
// //               onEnded={() => markWatched(activeSection, video.id)}
// //             />
// //             <div className="flex items-center justify-between">
// //               <p className="text-xl">{video.title}</p>
// //               {video.watched ? (
// //                 <span className="text-green-400 text-xl">Watched ✅</span>
// //               ) : (
// //                 <span className="text-gray-400">Not Watched</span>
// //               )}
// //             </div>
// //           </div>
// //         ))}
// //       </div>

// //       {/* Quiz Section */}
// //       <div className="mt-8 p-6 bg-gray-800 rounded-2xl shadow-lg text-center">
// //         <h2 className="text-2xl text-cyan-400 mb-4">Quiz: {active.title}</h2>
// //         {isQuizUnlocked(active) ? (
// //           <button className="mt-4 px-6 py-2 bg-cyan-400 text-gray-900 rounded-full shadow-[0_0_10px_#06b6d4]">
// //             Start Quiz
// //           </button>
// //         ) : (
// //           <button
// //             disabled
// //             className="mt-4 px-6 py-2 bg-gray-600 text-gray-400 rounded-full cursor-not-allowed"
// //           >
// //             Quiz Locked - Watch all videos first
// //           </button>
// //         )}
// //       </div>
// //     </div>
// //   );
// // };

// // export default VirtualDrill;
// import React, { useState } from "react";

// interface Video {
//   id: number;
//   title: string;
//   src: string;
//   watched: boolean;
// }

// interface Section {
//   id: number;
//   title: string;
//   videos: Video[];
// }

// const sectionsData: Section[] = [
//   {
//     id: 1,
//     title: "Earthquake",
//     videos: [
//       { id: 1, title: "Evacuation Drill", src: "/videos/earthquake1.mp4", watched: false },
//       { id: 2, title: "Safety Tips", src: "/videos/earthquake2.mp4", watched: false },
//       { id: 3, title: "First Aid Basics", src: "/videos/earthquake3.mp4", watched: false },
//     ],
//   },
//   {
//     id: 2,
//     title: "Fire",
//     videos: [
//       { id: 1, title: "What is Fire", src: "/video4.mp4", watched: false },
//       { id: 2, title: "How to survive Fire", src: "/video2.mp4", watched: false },
//       { id: 3, title: "Do's and Dont's", src: "/video3.mp4", watched: false },
//     ],
//   },
//   {
//     id: 3,
//     title: "Flood",
//     videos: [
//       { id: 1, title: "What is Flood", src: "/video4.mp4", watched: false },
//       { id: 2, title: "How to survive Flood", src: "/video2.mp4", watched: false },
//       { id: 3, title: "Do's and Dont's", src: "/video3.mp4", watched: false },
//     ],
//   },
// ];

// const VirtualDrill: React.FC = () => {
//   const [sections, setSections] = useState(sectionsData);
//   const [activeSection, setActiveSection] = useState(1);

//   const markWatched = (sectionId: number, videoId: number) => {
//     setSections((prev) =>
//       prev.map((section) =>
//         section.id === sectionId
//           ? {
//               ...section,
//               videos: section.videos.map((v) =>
//                 v.id === videoId ? { ...v, watched: true } : v
//               ),
//             }
//           : section
//       )
//     );
//   };

//   const isQuizUnlocked = (section: Section) => {
//     return section.videos.every((v) => v.watched);
//   };

//   const active = sections.find((s) => s.id === activeSection)!;

//   return (
//     <div className="min-h-screen p-8 text-white">
//       <h1 className="text-4xl text-center text-cyan-400 drop-shadow-[0_0_10px_#06b6d4] mb-8">
//         Virtual Drill & Preparedness
//       </h1>

//       {/* Section Tabs */}
//       <div className="flex gap-4 mb-6 flex-wrap justify-center">
//         {sections.map((section) => (
//           <button
//             key={section.id}
//             onClick={() => setActiveSection(section.id)}
//             className={`px-4 py-2 rounded-full transition-all ${
//               activeSection === section.id
//                 ? "bg-cyan-400 text-gray-900 shadow-[0_0_10px_#06b6d4]"
//                 : "bg-gray-700 hover:bg-cyan-400 hover:text-gray-900"
//             }`}
//           >
//             {section.title}
//           </button>
//         ))}
//       </div>

//       {/* Videos List - Updated to horizontal layout with video on left, text on right */}
//       <div className="flex flex-col gap-6 mb-8 mx-20">
//         {active.videos.map((video) => (
//           <div key={video.id} className="bg-gray-900 p-4 rounded-lg shadow-lg flex items-center gap-4">
//             {/* Video Thumbnail/Player on the Left */}
//             <div className="flex-shrink-0 w-2/5  "> {/* Adjust width as needed */}
//               <video
//                 src={video.src}
//                 controls
//                 className="rounded-md w-[450px] h-auto"
//                 onEnded={() => markWatched(activeSection, video.id)}
//                 // Consider adding a poster attribute for a thumbnail if video autoplay isn't desired
//                 // poster="/path/to/thumbnail.jpg"
//               />
//             </div>

//             {/* Video Title and Watched Status on the Right */}
//             <div className="flex-grow flex flex-col justify-between h-full">
//               <p className="text-xl font-semibold mb-2">{video.title}</p>
//               <div className="self-end"> {/* Pushes the watched status to the bottom right */}
//                 {video.watched ? (
//                   <span className="text-green-400 text-xl mb-0">Watched ✅</span>
//                 ) : (
//                   <span className="text-gray-400 text-lg mb-0">Not Watched</span>
//                 )}
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Quiz Section */}
//       <div className="mt-8 p-6 bg-gray-800 rounded-2xl shadow-lg text-center">
//         <h2 className="text-2xl text-cyan-400 mb-4">Quiz: {active.title}</h2>
//         {isQuizUnlocked(active) ? (
//           <button className="mt-4 px-6 py-2 bg-cyan-400 text-gray-900 rounded-full shadow-[0_0_10px_#06b6d4]">
//             Start Quiz
//           </button>
//         ) : (
//           <button
//             disabled
//             className="mt-4 px-6 py-2 bg-gray-600 text-gray-400 rounded-full cursor-not-allowed"
//           >
//             Quiz Locked - Watch all videos first
//           </button>
//         )}
//       </div>
//     </div>
//   );
// };

// export default VirtualDrill;

import React, { useState } from "react";
import { FaPlay } from "react-icons/fa"; // add at the top
import Quiz from "../Quiz";


interface Video {
    id: number;
    title: string;
    src: string;
    poster?: string;
    watched: boolean;
}

interface Section {
    id: number;
    title: string;
    videos: Video[];
}

// Sample data with poster images
const sectionsData: Section[] = [
    {
        id: 1,
        title: "Earthquake",
        videos: [
            { id: 1, title: "Evacuation Drill", src: "/videos/earthquake1.mp4", poster: "https://www.azcentral.com/gcdn/-mm-/8cf8c96e979f12424b2d891bbc04e9f6c2544dc6/c=0-42-1735-1022/local/-/media/2015/10/06/Phoenix/Phoenix/635797441425641173-earthquake-drill.jpg?width=660&height=373&fit=crop&format=pjpg&auto=webp", watched: false },
            { id: 2, title: "Safety Tips", src: "/videos/earthquake2.mp4", poster: "https://imgv2-1-f.scribdassets.com/img/document/625323052/original/3353c558d6/1?v=1", watched: false },
            { id: 3, title: "First Aid Basics", src: "/videos/earthquake3.mp4", poster: "https://www.india.com/wp-content/uploads/2023/03/Safety-new.jpg", watched: false },
        ],
    },
    {
        id: 2,
        title: "Fire",
        videos: [
            { id: 1, title: "What is Fire", src: "/video2.mp4", poster: "https://www.sciencelearn.org.nz/_next/image?url=https%3A%2F%2Fwww.datocms-assets.com%2F117510%2F1757049076-update_fire-triangle_3-sept-25.png%3Fw%3D1840%26h%3D1267.372197309417&w=1920&q=85&dpl=dpl_G4E8YDM9Vg8HtDdjvYFyYxhgghS4", watched: false },
            { id: 2, title: "How to Survive Fire", src: "/video2.mp4", poster: "https://zhl.org.in/blog/wp-content/uploads/2018/01/fire-new.jpg", watched: false },
            { id: 3, title: "Do's and Dont's", src: "/video3.mp4", poster: "https://fireandemergencyservices.assam.gov.in/sites/default/files/styles/inner_page_image_380x238/public/swf_utility_folder/departments/fire_emergency_webcomindia_org_oid_4/portlet/level_1/image/do-dont.png?itok=sdO2y5Zr", watched: false },
        ],
    },
    {
        id: 3,
        title: "Flood",
        videos: [
            { id: 1, title: "What is Flood", src: "/videos/earthquake1.mp4", poster: "https://wetlandinfo.des.qld.gov.au/resources/static/images/ecology/processes-systems/characteristics-of-floods.jpg", watched: false },
            { id: 2, title: "How to Survive Flood", src: "/videos/earthquake2.mp4", poster: "https://www.shutterstock.com/image-vector/how-survive-flood-information-preparation-260nw-488552143.jpg", watched: false },
            { id: 3, title: "Do's and Dont's", src: "/videos/earthquake3.mp4", poster: "https://tnstc.wordpress.com/wp-content/uploads/2015/12/f5efe0.jpg", watched: false },
        ],
    },
];

const VirtualDrill: React.FC = () => {
    const [showModal, setShowModal] = useState(false);
    const [showQuiz, setShowQuiz] = useState(false);
    const [sections, setSections] = useState(sectionsData);
    const [activeSection, setActiveSection] = useState(1);
    const [modalVideo, setModalVideo] = useState<Video | null>(null);

    const markWatched = (sectionId: number, videoId: number) => {
        setSections(prev =>
            prev.map(section =>
                section.id === sectionId
                    ? {
                        ...section,
                        videos: section.videos.map(v =>
                            v.id === videoId ? { ...v, watched: true } : v
                        ),
                    }
                    : section
            )
        );
    };

    const active = sections.find(s => s.id === activeSection)!;

    const openModal = (video: Video) => {
        setModalVideo(video);
        setShowModal(true); // start fade-in
    };

    const closeModal = () => {
        setShowModal(false); // start fade-out
        // wait for animation, then remove modalVideo
        setTimeout(() => setModalVideo(null), 300); // 300ms = transition duration
    };

    const isQuizUnlocked = (section: Section) => section.videos.every(v => v.watched);

    return (
        <div className="min-h-screen bg-gray-900 text-white p-8">
            <h1 className="text-4xl text-center text-cyan-400 mb-8 drop-shadow-[0_0_10px_#06b6d4]">
                Virtual Drill & Preparedness
            </h1>

            {/* Section Tabs */}
            <div className="flex gap-4 mb-6 flex-wrap justify-center">
                {sections.map(section => (
                    <button
                        key={section.id}
                        onClick={() => setActiveSection(section.id)}
                        className={`px-4 py-2 rounded-full transition-all ${activeSection === section.id
                            ? "bg-cyan-400 text-gray-900 shadow-[0_0_10px_#06b6d4]"
                            : "bg-gray-700 hover:bg-cyan-400 hover:text-gray-900"
                            }`}
                    >
                        {section.title}
                    </button>
                ))}
            </div>

            {/* Video Cards */}
            <div className="grid md:grid-cols-3 gap-6">
                {active.videos.map(video => (
                    <div
                        key={video.id}
                        className="bg-gray-800 rounded-lg shadow-lg overflow-hidden cursor-pointer transform transition hover:scale-105"
                        onClick={() => openModal(video)}
                    >
                        {/* Video thumbnail */}
                        <div className="relative">
                            <img
                                src={video.poster}
                                alt={video.title}
                                className="w-full h-48 object-cover"
                            />
                            {/* Play icon overlay */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <FaPlay className="text-white border-2 rounded-full bg-black text-6xl p-3 opacity-80" />
                            </div>
                        </div>
                        <div className="p-4">
                            <h3 className="text-xl font-semibold mb-2">{video.title}</h3>
                            <div className="h-2 bg-gray-600 rounded mb-2">
                                <div
                                    className="h-2 bg-cyan-400 rounded"
                                    style={{ width: video.watched ? "100%" : "0%" }}
                                ></div>
                            </div>
                            <span className={video.watched ? "text-green-400" : "text-gray-400"}>
                                {video.watched ? "Watched ✅" : "Not Watched"}
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Quiz Section */}
            <div className="mt-8 p-6 bg-gray-800 rounded-2xl shadow-lg text-center">
                <h2 className="text-2xl text-cyan-400 mb-4">Quiz: {active.title}</h2>
                {isQuizUnlocked(active) ? (
                    <button
                        onClick={() => setShowQuiz(true)}
                        className="mt-4 px-6 py-2 bg-cyan-400 text-gray-900 rounded-full shadow-[0_0_10px_#06b6d4]"
                    >
                        Start Quiz
                    </button>
                ) : (
                    <button
                        disabled
                        className="mt-4 px-6 py-2 bg-gray-600 text-gray-400 rounded-full cursor-not-allowed"
                    >
                        Quiz Locked - Watch all videos first
                    </button>
                )}
            </div>
            {showQuiz && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
                    <Quiz sectionId={active.id} onClose={() => setShowQuiz(false)} />
                </div>
            )}



            {modalVideo && (
                <div
                    className={`fixed inset-0 flex items-center justify-center z-50 transition-opacity duration-300 ${showModal ? "opacity-100" : "opacity-0"
                        } bg-black bg-opacity-70`}
                    onClick={closeModal} // clicking outside closes modal
                >
                    <div
                        className={`bg-gray-900 p-4 rounded-xl shadow-lg max-w-3xl w-full transform transition-transform duration-300 ${showModal ? "scale-100" : "scale-95"
                            }`}
                        onClick={(e) => e.stopPropagation()} // prevent modal close
                    >
                        <h2 className="text-xl text-cyan-400 mb-4">{modalVideo.title}</h2>
                        <video
                            src={modalVideo.src}
                            controls
                            autoPlay
                            className="w-full rounded-lg"
                            onEnded={() => {
                                markWatched(activeSection, modalVideo.id);
                                closeModal();
                            }}
                        />
                        <button
                            onClick={closeModal}
                            className="mt-4 px-4 py-2 bg-red-500 rounded-full hover:bg-red-600"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}

        </div>
    );
};

export default VirtualDrill;
