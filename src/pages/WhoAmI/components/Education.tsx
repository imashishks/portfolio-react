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
    <section className="mt-8 mb-8 w-full sm:mt-16">
      <motion.h3 
        variants={{
          hidden: { opacity: 0, y: 16 },
          visible: { opacity: 1, y: 0 },
        }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="mb-4 font-bold text-orange"
      >
        education
      </motion.h3>
      <section
        className="grid max-w-4xl grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2"
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
      </section>
    </section>
  );
}
