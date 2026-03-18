import profilePic from "./../../assets/images/profilepic.webp";
import { motion } from "motion/react";
import Experience from "./components/Experience";
import Skills from "./components/Skills";
import Education from "./components/Education";
import TabLayout from "../../components/TabLayout";

function WhoAmI() {
  return (
    <TabLayout>
      <motion.div 
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
        className=" flex items-center flex-col w-4/6 h-full"
      >
        <motion.img
          variants={{
            hidden: { opacity: 0, y: 16 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          src={profilePic}
          alt="Profile"
          className="rounded-full w-[150px] min-w-[150px] min-h-[150px] mt-8 "
        />
        <motion.h2 
          variants={{
            hidden: { opacity: 0, y: 16 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="mt-4 text-2xl ">
          hello! my name is{" "}
          <span className="font-bold text-orange">Ashish</span> Kumar
        </motion.h2>
        <motion.p 
          variants={{
            hidden: { opacity: 0, y: 16 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="mt-8  text-sm">
          Born and brought up in Jamshedpur (the steel city of India), working
          now as full time software engineer in Bengaluru ( the silicon valley
          of India).
        </motion.p>
        <motion.p 
          variants={{
            hidden: { opacity: 0, y: 16 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="mt-8  text-sm">
          Apart from work, i like to paint, cycling and long walks. Coffee is my
          choice of fuel (both cold and hot brew, i don't discriminate). Never
          said no to a nice chicken burger or some chicken biryani. Big fan of
          all kinds of music from Kishore kumar to Ritviz to Pink flyod and
          Queen.
        </motion.p>
        <Experience />
        <Skills />
        <Education />
        <div className="opacity-0">.</div>
      </motion.div>
    </TabLayout>
  );
}

export default WhoAmI;
