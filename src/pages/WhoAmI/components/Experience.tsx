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
    <section className="mt-8 w-full sm:mt-16">
      <motion.h3 
        variants={{
          hidden: { opacity: 0, y: 16 },
          visible: { opacity: 1, y: 0 },
        }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="mb-4 font-bold text-orange"
      >
        experience
      </motion.h3>
      <section
        className="grid max-w-4xl grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2"
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
      </section>
    </section>
  );
}
