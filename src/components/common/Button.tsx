import { motion } from "motion/react";
import { ReactNode } from "react";
import { Link } from "react-router-dom";
import classNames from "classnames";

interface ButtonProps {
  children: ReactNode;
  variant: "link";
  to: string;
  active: boolean;
}

function Button({ children, variant, to, active }: ButtonProps) {
  const baseClasses =
    "bg-white px-8 py-2 border-2 shadow-[0_4px_0_rgb(13,13,13)] rounded-lg cursor-pointer hover:translate-y-[2px]";
  const activeClasses = "!bg-black text-white";
  console.log(active);
  return variant === "link" ? (
    <Link to={to} className={classNames(baseClasses, active && activeClasses)}>
      {children}
    </Link>
  ) : (
    <motion.button className={classNames(baseClasses, active && activeClasses)}>
      {children}
    </motion.button>
  );
}

export default Button;
