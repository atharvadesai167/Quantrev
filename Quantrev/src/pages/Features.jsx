import { motion } from "framer-motion";

export default function Features() {
  return (
    <section className="w-full min-h-screen flex items-center justify-center px-10 py-20 bg-white text-black">
      
      <div className="max-w-6xl w-full flex flex-col md:flex-row items-center gap-16">

        {/* LEFT - PARAGRAPH */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="flex-1"
        >
          <h2 className="text-4xl font-bold mb-6">
            Powerful Features
          </h2>

          <p className="text-lg leading-relaxed text-black">
            Quantrev AI is built to transform the way developers write, debug, and optimize code.
            It understands your entire project context and delivers intelligent suggestions in real time.
            From instant error detection to deep-level debugging insights, it acts like a senior engineer
            sitting inside your editor. It not only fixes bugs but explains them clearly, helping you grow
            as a developer. With advanced refactoring capabilities, smart autocomplete, and project-wide
            understanding, Quantrev AI turns complex development workflows into smooth, fast, and effortless
            experiences.
          </p>
        </motion.div>

        {/* RIGHT - IMAGE */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="flex-1 flex justify-center"
        >
          <img
            src="/codeeditor.jpg"
            alt="AI Code Editor"
            className="rounded-2xl shadow-2xl border border-white/10"
          />
        </motion.div>

      </div>
    </section>
  );
}