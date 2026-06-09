import { motion } from "framer-motion";

export default function About() {
  return (
    <section className="w-full min-h-screen flex items-center justify-center px-10 py-20 bg-white text-black">
      
      <div className="max-w-6xl w-full flex flex-col md:flex-row items-center gap-16">

        {/* LEFT - ABOUT TEXT */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="flex-1"
        >
          <h2 className="text-4xl font-bold mb-6">
            About Quantrev
          </h2>

          <p className="text-lg leading-relaxed text-black">
            Quantrev AI is an advanced developer intelligence system designed to make coding faster,
            smarter, and more intuitive. It understands your entire codebase, detects issues in real time,
            and provides intelligent suggestions just like a senior software engineer. Built with a focus on
            simplicity and power, Quantrev AI helps developers reduce debugging time, improve code quality,
            and accelerate project development. Our mission is to remove friction from programming so that
            developers can focus purely on building impactful products.
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
            src="/about.jpg"
            alt="About Quantrev"
            className="rounded-2xl shadow-2xl border border-white/10"
          />
        </motion.div>

      </div>
    </section>
  );
}