import HomePage from "./components/HomePage"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar"
import Chatbot from "./components/Chatbot";
import LearnSafety from "./components/LearnSafety";
function App() {
  return (
    <div className=''>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="/safety" element={<LearnSafety/>} />
          <Route path="/chatbot" element={<Chatbot />} />
        </Routes>
      </Router>
    </div>
  )
}


export default App
