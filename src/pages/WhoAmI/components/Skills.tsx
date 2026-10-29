import { motion } from "motion/react";
const skills = [
  {
    title: "Frontend",
    skill: "Vue.js, Angular, React, Redux, HTML5, SCSS, Tailwind ",
  },
  {
    title: "Languages",
    skill: "Javascript, Typescript, Node, Springboot",
  },
  {
    title: "Dev Tools",
    skill: "Webpack, Vite, Lerna, Docker, SonarQube",
  },
  {
    title: "Softwares",
    skill: "Figma, Photoshop, Illustrator, Premier Pro",
  },
];
export default function Skills() {
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
        skills
      </motion.h3>
      <section
        className="grid max-w-4xl grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2"
      >
        {skills.map((item, index) => (
          <motion.div
            key={index}
            variants={{
              hidden: { opacity: 0, y: 16 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <p className="font-semibold text-sm text-black">{item.title}</p>
            <p className="text-xs text-neutral-500">{item.skill}</p>
          </motion.div>
        ))}
      </section>
    </section>
  );
}
