// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const Profile: React.FC = () => {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [college, setCollege] = useState("");
//   const [school, setSchool] = useState("");
//   const [progress, setProgress] = useState<{ moduleId: number; completed: boolean; score?: number }[]>([]);
//   const [message, setMessage] = useState("");

//   const token = localStorage.getItem("token"); // JWT token

//   // Fetch profile on load
//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const res = await axios.get("http://localhost:3000/api/profile", {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         const user = res.data.user;
//         setName(user.name);
//         setEmail(user.email);
//         setCollege(user.college || "");
//         setSchool(user.school || "");
//         setProgress(user.progress || []);
//       } catch (err) {
//         console.error(err);
//         setMessage("Failed to fetch profile");
//       }
//     };
//     fetchProfile();
//   }, [token]);

//   // Update profile
//   const handleUpdateProfile = async () => {
//     try {
//       const res = await axios.put(
//         "http://localhost:3000/api/profile/update",
//         { college, school },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       setMessage(res.data.message);
//     } catch (err) {
//       console.error(err);
//       setMessage("Profile update failed");
//     }
//   };

//   // Update progress
//   const handleUpdateProgress = async (moduleId: number, completed: boolean, score?: number) => {
//     try {
//       const res = await axios.put(
//         "http://localhost:3000/api/profile/progress",
//         { moduleId, completed, score },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       setProgress(res.data.progress);
//       setMessage(res.data.message);
//     } catch (err) {
//       console.error(err);
//       setMessage("Progress update failed");
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto mt-10 p-4 border rounded">
//       <h2 className="text-xl font-bold mb-4">Profile</h2>
//       <input value={name} disabled className="w-full mb-2 p-2 border rounded" placeholder="Name" />
//       <input value={email} disabled className="w-full mb-2 p-2 border rounded" placeholder="Email" />
//       <input
//         value={college}
//         onChange={(e) => setCollege(e.target.value)}
//         className="w-full mb-2 p-2 border rounded"
//         placeholder="College"
//       />
//       <input
//         value={school}
//         onChange={(e) => setSchool(e.target.value)}
//         className="w-full mb-2 p-2 border rounded"
//         placeholder="School"
//       />
//       <button
//         onClick={handleUpdateProfile}
//         className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
//       >
//         Update Profile
//       </button>

//       <h3 className="text-lg font-semibold mb-2">Progress</h3>
//       {progress.map((p) => (
//         <div key={p.moduleId} className="mb-2 flex justify-between items-center">
//           <span>
//             Module {p.moduleId} - {p.completed ? "Completed" : "Incomplete"} - Score: {p.score || 0}
//           </span>
//           <button
//             onClick={() => handleUpdateProgress(p.moduleId, !p.completed, p.score)}
//             className="bg-green-500 text-white px-2 py-1 rounded"
//           >
//             Toggle
//           </button>
//         </div>
//       ))}

//       {message && <p className="mt-2 text-green-600">{message}</p>}
//     </div>
//   );
// };

// export default Profile;

import React, { useState, useEffect } from "react";
import axios from "axios";

// const colleges = ["ABC College", "XYZ College", "LMN College"];
// data/punjabColleges.ts

const colleges = [
  "Guru Nanak Dev University, Amritsar",
  "Punjabi University, Patiala",
  "Thapar Institute of Engineering & Technology, Patiala",
  "Lovely Professional University, Phagwara",
  "Chandigarh University, Mohali",
  "Guru Angad Dev Veterinary and Animal Sciences University, Ludhiana",
  "Punjab Agricultural University, Ludhiana",
  "Central University of Punjab, Bathinda",
  "Baba Farid University of Health Sciences, Faridkot",
  "IK Gujral Punjab Technical University, Jalandhar",
  "Maharaja Ranjit Singh State Technical University, Bathinda",
  "Rajiv Gandhi National University of Law, Patiala",
  "Sardar Beant Singh State University, Gurdaspur",
  "Shaheed Bhagat Singh State University, Firozpur",
  "Sri Guru Teg Bahadur State University of Law, Tarn Taran",
  "Adesh University, Bathinda",
  "Akal University, Bathinda",
  "CT University, Ludhiana",
  "Chitkara University, Rajpura",
  "DAV University, Jalandhar",
  "Desh Bhagat University, Mandi Gobindgarh",
  "GNA University, Phagwara",
  "Guru Kashi University, Talwandi Sabo",
  "Indian School of Business, Mohali",
  "Rayat Bahra University, Mohali",
  "Sri Guru Granth Sahib World University, Fatehgarh Sahib",
  "Sri Guru Ram Das University of Health Sciences, Amritsar",
  "Universal Group of Institutions, Mohali"
];

// const schools = ["Sunrise School", "Greenwood School", "Hillview School"];
 const schools = [
  "Delhi Public School, Patiala",
  "Delhi Public School, Mohali",
  "St. Kabir School, Ludhiana",
  "Sacred Heart Convent School, Jalandhar",
  "Modern Convent School, Ludhiana",
  "Guru Nanak Public School, Amritsar",
  "Ryan International School, Jalandhar",
  "Kendriya Vidyalaya, Amritsar",
  "St. Xavier's Senior Secondary School, Chandigarh",
  "Mata Gujri Public School, Patiala",
  "Guru Amar Dass Public School, Amritsar",
  "Kundan Vidya Mandir, Ludhiana",
  "Mata Jaswant Kaur Memorial School, Badal",
  "Dasmesh Public School, Faridkot",
  "Army Public School, Bathinda",
  "DAV Public School, Jalandhar",
  "Shemrock Foundation School, Mohali",
  "Shishu Niketan Public School, Patiala",
  "Mount View Public School, Ludhiana",
  "Shri Guru Harkrishan Public School, Amritsar",
  "Shri Guru Ram Rai Public School, Ropar"
];

const Profile: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [college, setCollege] = useState("");
  const [school, setSchool] = useState("");
  const [progress, setProgress] = useState<{ moduleId: number; completed: boolean; score?: number }[]>([]);
  const [message, setMessage] = useState("");

  const token = localStorage.getItem("token");

  // Fetch profile on load
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const user = res.data.user;
        setName(user.name);
        setEmail(user.email);
        setCollege(user.college || "");
        setSchool(user.school || "");
        setProgress(user.progress || []);
      } catch (err) {
        console.error(err);
        setMessage("Failed to fetch profile");
      }
    };
    fetchProfile();
  }, [token]);

  // Update profile
  const handleUpdateProfile = async () => {
    // Validation: only one should be filled
    if ((!college && !school) || (college && school)) {
      setMessage("Please fill either College or School (not both).");
      return;
    }

    try {
      const res = await axios.put(
        "http://localhost:3000/api/profile/update",
        { college: college || undefined, school: school || undefined },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage(res.data.message);
    } catch (err: any) {
      console.error(err);
      setMessage(err.response?.data?.message || "Profile update failed");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 border rounded">
      <h2 className="text-xl font-bold mb-4">Profile</h2>
      <input value={name} disabled className="w-full mb-2 p-2 border rounded" placeholder="Name" />
      <input value={email} disabled className="w-full mb-2 p-2 border rounded" placeholder="Email" />

      <label className="block mb-1 font-semibold">College</label>
      <input
        list="college-options"
        value={college}
        onChange={(e) => {
          setCollege(e.target.value);
          if (e.target.value) setSchool(""); // clear school if college typed
        }}
        disabled={!!school} // disable if school is filled
        placeholder="Type or select college"
        className="w-full mb-4 p-2 border rounded"
      />
      <datalist id="college-options">
        {colleges.map((c) => (
          <option key={c} value={c} />
        ))}
      </datalist>

      <label className="block mb-1 font-semibold">School</label>
      <input
        list="school-options"
        value={school}
        onChange={(e) => {
          setSchool(e.target.value);
          if (e.target.value) setCollege(""); // clear college if school typed
        }}
        disabled={!!college} // disable if college is filled
        placeholder="Type or select school"
        className="w-full mb-4 p-2 border rounded"
      />
      <datalist id="school-options">
        {schools.map((s) => (
          <option key={s} value={s} />
        ))}
      </datalist>

      <button
        onClick={handleUpdateProfile}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
      >
        Update Profile
      </button>

      <h3 className="text-lg font-semibold mb-2">Progress</h3>
      {progress.map((p) => (
        <div key={p.moduleId} className="mb-2 flex justify-between items-center">
          <span>
            Module {p.moduleId} - {p.completed ? "Completed" : "Incomplete"} - Score: {p.score || 0}
          </span>
        </div>
      ))}

      {message && <p className="mt-2 text-green-600">{message}</p>}
    </div>
  );
};

export default Profile;
