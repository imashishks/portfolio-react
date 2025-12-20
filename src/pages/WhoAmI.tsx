import { motion } from "motion/react";

function WhoAmI() {
  return (
    <div className=" flex justify-center items-center">
      <motion.div
        className="bg-orange w-32 h-32 rounded-full ease-spring-snappy "
        whileHover={{ scale: 2 }}
      ></motion.div>
    </div>
  );
}

export default WhoAmI;
