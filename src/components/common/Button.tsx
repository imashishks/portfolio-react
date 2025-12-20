import { motion } from "motion/react";
import { ReactNode, CSSProperties } from "react";
import { Link } from "react-router-dom";
import classNames from "classnames";

interface ButtonProps {
  children: ReactNode;
  variant?: "link" | "button";
  to?: string;
  active?: boolean;
  className?: string;
  style?: CSSProperties;
}

function Button({
  children,
  variant = "button",
  to,
  active,
  className,
  style,
}: ButtonProps) {
  const baseClasses = `bg-white px-8 py-2 border-2 shadow-[0_4px_0_rgb(13,13,13)] rounded-lg cursor-pointer ${
    className ? className : ""
  }`;
  const activeClasses = "!bg-black text-white";
  console.log(className);
  console.log(active);
  return variant === "link" && to ? (
    <Link
      to={to}
      className={classNames(baseClasses, active && activeClasses)}
      style={style}
    >
      {children}
    </Link>
  ) : (
    <motion.button
      className={classNames(baseClasses, active && activeClasses)}
      style={style}
    >
      {children}
    </motion.button>
  );
}

export default Button;
