import { motion } from "motion/react";
const education = [
  {
    title: "Bachelor of Technology",
    spec: "Computer Science",
    location: "Gandhi University, Gunupur",
    year: "2012 - 2016",
  },
  {
    title: "Higher Secondary Education",
    spec: "Science",
    location: "Krishna Public School, Bhilai",
    year: "2010 - 2012",
  },
  {
    title: "Matriculation",
    spec: "Science",
    location: "Vig English School, Jamshedpur",
    year: "2010",
  },
];
export default function Education() {
  return (
    <motion.section className="mt-16 w-full mb-8">
      <h3 className="mb-4 font-bold text-orange">education</h3>
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
        {education.map((exp, index) => (
          <motion.div
            key={index}
            variants={{
              hidden: { opacity: 0, y: 16 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <p className="font-semibold text-sm text-black">
              {exp.title} <span>({exp.spec})</span>
            </p>
            <p className="mt-1 text-xs text-neutral-500">{exp.location}</p>
            <p className="mt-1 text-xs text-neutral-500">{exp.year}</p>
          </motion.div>
        ))}
      </motion.section>
    </motion.section>
  );
}
