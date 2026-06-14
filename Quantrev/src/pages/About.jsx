import { motion } from "framer-motion";
import ArcReactor from "../components/ArcReactor";

export default function About() {
  return (
    <div className="relative min-h-[600vh] bg-black text-white overflow-hidden">

      {/* ARC REACTOR */}
      <div className="fixed inset-0 z-0">
        <ArcReactor />
      </div>

      {/* OVERLAY */}
      <div className="fixed inset-0 bg-black/20 z-10" />

      {/* CONTENT */}
      <div className="relative z-20">

        {/* HERO */}
        <section className="h-screen pt-32 flex items-center justify-center px-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center max-w-6xl"
          >
            <p className="uppercase tracking-[0.5em] text-sm text-white/50 mb-8">
              QUANTREV ORIGIN
            </p>

            <h1 className="text-5xl md:text-8xl lg:text-9xl font-black leading-none">
              EVERY GREAT
              <br />
              TOOL STARTS
              <br />
              WITH A
              <br />
              PROBLEM.
            </h1>
          </motion.div>
        </section>

        {/* PROBLEM */}
        <section className="h-screen flex items-center justify-center px-8">
          <div className="max-w-4xl text-center">
            <p className="uppercase tracking-[0.4em] text-sm text-cyan-300 mb-8">
              LOG 01
            </p>

            <h2 className="text-4xl md:text-7xl font-black mb-10">
              DEBUGGING
              <br />
              WAS GOOD.
            </h2>

            <p className="text-xl md:text-2xl text-white/70 leading-relaxed">
              Modern editors already offered debugging tools.
              They worked.
              <br />
              But I wanted something faster.
            </p>
          </div>
        </section>

        {/* QUESTION */}
        <section className="h-screen flex items-center justify-center px-8">
          <div className="max-w-5xl text-center">

            <p className="uppercase tracking-[0.4em] text-sm text-cyan-300 mb-8">
              LOG 02
            </p>

            <h2 className="text-5xl md:text-8xl lg:text-9xl font-black leading-none">
              WHAT IF
              <br />
              THERE WAS
              <br />
              NO WAIT?
            </h2>

          </div>
        </section>

        {/* CREATION */}
        <section className="h-screen flex items-center justify-center px-8">
          <div className="max-w-5xl text-center">

            <p className="uppercase tracking-[0.4em] text-sm text-cyan-300 mb-8">
              LOG 03
            </p>

            <h2 className="text-6xl md:text-9xl font-black mb-10">
              QUANTREV AI
            </h2>

            <p className="text-2xl md:text-3xl text-white/70 leading-relaxed">
              Quantum Speed.
              <br />
              Review.
              <br />
              Artificial Intelligence.
            </p>

          </div>
        </section>

        {/* SYSTEMS */}
        <section className="h-screen flex items-center justify-center px-8">
          <div className="max-w-6xl w-full">

            <p className="uppercase tracking-[0.4em] text-sm text-cyan-300 mb-12 text-center">
              CURRENT SYSTEMS
            </p>

            <div className="grid md:grid-cols-3 gap-8">

              <div className="border border-white/10 backdrop-blur-md bg-white/5 p-10">
                <h3 className="font-black text-3xl mb-4">
                  DEBUG
                </h3>

                <p className="text-white/70">
                  Detect issues and analyze code rapidly.
                </p>
              </div>

              <div className="border border-white/10 backdrop-blur-md bg-white/5 p-10">
                <h3 className="font-black text-3xl mb-4">
                  REVIEW
                </h3>

                <p className="text-white/70">
                  Understand code quality and structure.
                </p>
              </div>

              <div className="border border-white/10 backdrop-blur-md bg-white/5 p-10">
                <h3 className="font-black text-3xl mb-4">
                  OPTIMIZE
                </h3>

                <p className="text-white/70">
                  Improve performance and maintainability.
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* FUTURE */}
        <section className="h-screen flex items-center justify-center px-8">
          <div className="max-w-6xl">

            <p className="uppercase tracking-[0.4em] text-sm text-cyan-300 mb-12 text-center">
              FUTURE OBJECTIVES
            </p>

            <div className="space-y-6 text-center text-3xl md:text-5xl font-black">

              <div>MEMORY ENGINE</div>

              <div>PROJECT CONTEXT</div>

              <div>MULTI FILE ANALYSIS</div>

              <div>REPOSITORY UNDERSTANDING</div>

            </div>

          </div>
        </section>

        {/* FINAL */}
        <section className="h-screen flex items-center justify-center px-8">

          <div className="text-center">

            <p className="uppercase tracking-[0.5em] text-sm text-cyan-300 mb-8">
              VERSION STATUS
            </p>

            <h2 className="text-5xl md:text-8xl lg:text-9xl font-black leading-none">
              THIS IS
              <br />
              ONLY
              <br />
              VERSION 1.0
            </h2>

          </div>

        </section>

      </div>
    </div>
  );
}