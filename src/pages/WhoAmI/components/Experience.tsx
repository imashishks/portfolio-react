import { motion } from "motion/react";
const experiences = [
  {
    title: "Senior Software Engineer, Zeta",
    date: "Oct 2021 – Present",
  },
  {
    title: "Software Development Engineer II, Nineleaps",
    date: "Dec 2020 – Oct 2021",
  },
  {
    title: "Software Development Engineer II, Moonraft",
    date: "April 2018 – Dec 2020",
  },
  {
    title: "Software Development Engineer, Airtory",
    date: "June 2016 – March 2018",
  },
];
export default function Experience() {
  return (
    <motion.section className="mt-16 w-full">
      <h3 className="mb-4 font-bold text-orange">experience</h3>
      <motion.section
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.12,
            },
          },
        }}
        className="grid grid-cols-2 gap-x-16 gap-y-4 max-w-4xl"
      >
        {experiences.map((exp, index) => (
          <motion.div
            key={index}
            variants={{
              hidden: { opacity: 0, y: 16 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <p className="font-semibold text-sm text-black">{exp.title}</p>
            <p className="mt-1 text-xs text-neutral-500">{exp.date}</p>
          </motion.div>
        ))}
      </motion.section>
    </motion.section>
  );
}
