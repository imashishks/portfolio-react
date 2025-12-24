import profilePic from "./../../assets/images/profilepic.webp";
import { motion } from "motion/react";
import Experience from "./components/Experience";
import Skills from "./components/Skills";
import Education from "./components/Education";

function WhoAmI() {
  return (
    <div className=" flex items-center flex-col w-4/6 h-full">
      <img
        src={profilePic}
        alt="Profile"
        className="rounded-full border-3 p-2 w-[150px] mt-8 "
      />
      <h2 className="mt-4 text-2xl ">
        hello! my name is <span className="font-bold text-orange">Ashish</span>{" "}
        Kumar
      </h2>
      <p className="mt-8  text-sm">
        Born and brought up in Jamshedpur (the steel city of India), working now
        as full time software engineer in Bengaluru ( the silicon valley of
        India).
      </p>
      <p className="mt-8  text-sm">
        Apart from work, i like to paint, cycling and long walks. Coffee is my
        choice of fuel (both cold and hot brew, i don't discriminate). Never
        said no to a nice chicken burger or some chicken biryani. Big fan of all
        kinds of music from Kishore kumar to Ritviz to Pink flyod and Queen.
      </p>
      <Experience />
      <Skills />
      <Education />
      <div className="opacity-0">.</div>
    </div>
  );
}

export default WhoAmI;
