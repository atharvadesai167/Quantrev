import Navbar from "./components/Navbar";

import Landing from "./pages/Landing";
import About from "./pages/About";
import Features from "./pages/Features";
import Editor from "./pages/Editor";

import SocialLinks from "./components/SocialLinks";

import {
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

function App() {
  const location = useLocation();

  const isEditor = location.pathname === "/editor";

  return (
    <div
      className={
        isEditor
          ? "min-h-screen bg-white"
          : `
            min-h-screen
            bg-white
            [background-image:linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)]
            [background-size:72px_72px]
          `
      }
    >
      <Navbar />

      <SocialLinks />

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