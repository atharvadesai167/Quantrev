import { useNavigate } from "react-router-dom";
import BlurText from "./BlurText";

export default function Hero() {
  const navigate = useNavigate();

  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-6">
      
      <BlurText
        text="QUANTREV AI"
        delay={150}
        animateBy="letters"
        direction="top"
        className="text-7xl md:text-8xl font-black text-black tracking-tight"
      />

      <p className="mt-6 max-w-2xl text-center text-zinc-600 text-lg">
        AI-powered code analysis, debugging and intelligent code assistance.
      </p>

      <button
        onClick={() => navigate("/editor")}
        className="mt-10 rounded-xl bg-black px-8 py-4 text-white font-medium transition hover:scale-105"
      >
        Get Started
      </button>

    </section>
  );
}