import { motion } from "framer-motion";

const features = [
  {
    number: "01",
    title: "AI-Powered Bug Detection",
    description:
      "Detect runtime errors, logic flaws, and hidden issues before they reach production.",
  },
  {
    number: "02",
    title: "Deep Code Review",
    description:
      "Receive architecture, performance, and maintainability feedback instantly.",
  },
  {
    number: "03",
    title: "Code Explanation",
    description:
      "Understand complex codebases with simple and contextual AI explanations.",
  },
];

const HoverText = ({ text, className = "" }) => {
  return (
    <div className={className}>
      {text.split("").map((char, index) => (
        <span
          key={index}
          className="
            inline-block
            cursor-default
            transition-all
            duration-300
            hover:text-[#ff0000]
            hover:-translate-y-2
          "
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </div>
  );
};

export default function Features() {
  return (
    <div
      className="
        min-h-screen
        bg-white
        text-black
        [background-image:linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)]
        [background-size:72px_72px]
      "
    >
      {/* HERO */}
      <section className="min-h-screen flex items-center justify-center px-8 md:px-20">
        <div className="max-w-7xl mx-auto w-full text-center">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="uppercase tracking-[0.3em] text-sm text-black/50 mb-8"
          >
            QUANTREV AI — V1.0
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="
              font-black
              leading-none
              tracking-tight
              text-[4rem]
              md:text-[8rem]
              lg:text-[10rem]
            "
          >
            <HoverText text="DEBUG." />
            <HoverText text="EXPLAIN." />
            <HoverText text="OPTIMIZE." />
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-10 max-w-xl mx-auto text-lg text-black/60"
          >
            Quantrev AI transforms the way developers analyze, debug,
            understand, fix, and optimize code.
          </motion.p>
        </div>
      </section>

      {/* BIG STATEMENT */}
      <section className="px-8 md:px-20 py-32 text-center">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <HoverText
            text="THREE SYSTEMS."
            className="
              font-black
              tracking-tight
              leading-none
              text-[3rem]
              md:text-[7rem]
              lg:text-[9rem]
            "
          />

          <HoverText
            text="ONE ENGINE."
            className="
              font-black
              tracking-tight
              leading-none
              text-[3rem]
              md:text-[7rem]
              lg:text-[9rem]
            "
          />
        </motion.div>
      </section>

      {/* FEATURE GRID */}
      <section className="px-8 md:px-20 pb-32">
        <div className="grid md:grid-cols-2 gap-8">
          {features.map((feature) => (
            <motion.div
              key={feature.number}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              whileHover={{ y: -6 }}
              className="
                border
                border-black/10
                bg-white
                p-10
                min-h-[320px]
                transition-all
                duration-300
                text-center
                flex
                flex-col
                justify-center
                items-center
              "
            >
              <p className="text-black/40 text-sm mb-8">
                {feature.number}
              </p>

              <h3 className="font-black text-4xl md:text-5xl leading-tight mb-8">
                {feature.title}
              </h3>

              <p className="text-black/60 text-lg max-w-md mx-auto">
                {feature.description}
              </p>

              <div className="mt-12 border-t border-black/10 pt-6">
                <code className="text-black/40 text-sm">
                  quantrev.feature.{feature.number}
                </code>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="px-8 md:px-20 pb-40">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="
            border
            border-black/10
            p-12
            md:p-20
            text-center
            flex
            flex-col
            items-center
            justify-center
            max-w-6xl
            mx-auto
          "
        >
          <p className="uppercase tracking-[0.3em] text-sm text-black/40 mb-6">
            START BUILDING
          </p>

          <div>
            <HoverText
              text="BUILD FASTER."
              className="
                font-black
                text-[3rem]
                md:text-[6rem]
                leading-none
                tracking-tight
              "
            />

            <HoverText
              text="SHIP SMARTER."
              className="
                font-black
                text-[3rem]
                md:text-[6rem]
                leading-none
                tracking-tight
              "
            />
          </div>
        </motion.div>
      </section>
    </div>
  );
}