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
    <motion.section className="mt-16 w-full">
      <h3 className="mb-4 font-bold text-orange">skills</h3>
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
      </motion.section>
    </motion.section>
  );
}
