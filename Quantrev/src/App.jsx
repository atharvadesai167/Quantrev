import Navbar from "./components/Navbar";

import Landing from "./pages/Landing";
import About from "./pages/About";
import Features from "./pages/Features";
import Editor from "./pages/Editor";

import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="min-h-screen bg-white bg-[radial-gradient(#d4d4d8_1px,transparent_1px)] bg-size:[24px_24px]">
      <Navbar />

      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/features" element={<Features />} />
        <Route path="/about" element={<About />} />
        <Route path="/editor" element={<Editor />} />
      </Routes>
    </div>
  );
}

export default App;