import HomePage from "./components/HomePage"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar"
import Chatbot from "./components/Chatbot";
import LearnSafety from "./components/LearnSafety";
import Login from "./components/pages/Login";
import Signup from "./components/pages/Signup";
import Alerts from "./components/Alerts";
import Dashboard from "./components/Dashboard";
import Aboutus from "./components/Aboutus";
import VirtualDrill from "./components/VirtualDrill";
import Profile from "./components/Profile";
import AdminDashboard from "./components/pages/AdminDashboard";
// import SetPassword from "./components/pages/SetPassword";
import SetupPassword from "./components/pages/SetPassword";
function App() {
  return (
    <div className=''>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/safety" element={<LearnSafety />} />
          <Route path="/chatbot" element={<Chatbot />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/alerts" element={<Alerts />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/aboutus" element={<Aboutus />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/setup-password/:token" element={<SetupPassword />} />
          <Route path="/virtualdrill" element={<VirtualDrill />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
