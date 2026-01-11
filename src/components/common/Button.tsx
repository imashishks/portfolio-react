import { motion } from "motion/react";
import { ReactNode } from "react";
import { Link } from "react-router-dom";
import classNames from "classnames";

interface ButtonProps {
  children: ReactNode;
  variant?: "link";
  to?: string;
  active?: boolean;
  className?: string;
  onClick?: () => {};
}

function Button({
  children,
  variant,
  to,
  active,
  className,
  onClick,
}: ButtonProps) {
  const baseClasses = `bg-white px-8 py-1 border-2 shadow-[0_4px_0_rgb(13,13,13)] rounded-lg cursor-pointer ${
    className ? className : ""
  }`;
  const activeClasses = "!bg-black text-white";
  return variant === "link" && to ? (
    <Link to={to} className={classNames(baseClasses, active && activeClasses)}>
      {children}
    </Link>
  ) : (
    <motion.button
      onClick={onClick}
      className={classNames(baseClasses, active && activeClasses)}
    >
      {children}
    </motion.button>
  );
}

export default Button;
