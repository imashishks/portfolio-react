import { motion } from "motion/react";
import { ReactNode } from "react";
import { Link } from "react-router-dom";
import classNames from "classnames";

interface KeypadButtonProps {
  children: ReactNode;
  variant?: "link";
  to?: string;
  active?: boolean;
  className?: string;
}

function KeypadButton({
  children,
  variant,
  to,
  active,
  className,
}: KeypadButtonProps) {
  // 3D button styling
  const buttonWrapperClasses = classNames(
    "group relative block before:py-6 before:px-8 before:content-[''] before:w-[calc(100%+4px)] before:h-full before:absolute before:z-1 before:left-[-2px] before:top-[14px] before:border before:border-black before:bg-[grey] before:rounded-[10px]",
    className
  );

  const topDivClasses = classNames(
    "rounded-[10px] py-6 px-8 w-full h-full top-0 flex items-center justify-center absolute z-4 whitespace-nowrap",
    active ? "bg-black text-white" : "bg-white"
  );

  const bottomDivClasses = classNames(
    "rounded-[10px] py-6 px-8 w-full h-full absolute top-[10px] z-1",
    active ? "bg-white" : "bg-black"
  );

  const buttonContent = (
    <>
      {/* Hidden element to determine width - must match actual button padding */}
      <span className="invisible py-6 px-8 whitespace-nowrap">{children}</span>
      <motion.div
        className={topDivClasses}
        animate={{
          y: active ? 10 : 0,
        }}
        whileTap={{
          y: 10,
        }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
      >
        {children}
      </motion.div>
      <div className={bottomDivClasses}></div>
    </>
  );

  return variant === "link" && to ? (
    <Link to={to} className={buttonWrapperClasses}>
      {buttonContent}
    </Link>
  ) : (
    <motion.button className={buttonWrapperClasses}>
      {buttonContent}
    </motion.button>
  );
}

export default KeypadButton;
