import { motion } from "motion/react";
import { ReactNode, useEffect, useState } from "react";
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
  // Phones use a compact button; md+ keeps the original chunky size.
  const [isCompact, setIsCompact] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(max-width: 767px)").matches
  );

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const update = () => setIsCompact(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const pressOffset = isCompact ? 4 : 6;

  // 3D button styling
  const buttonWrapperClasses = classNames(
    "group relative block h-6 sm:h-7 md:h-[52px]",
    className
  );

  const sizingClasses =
    "py-2.5 px-3 text-xs sm:px-5 sm:py-3 sm:text-sm md:px-8 md:py-6 md:text-base";

  const topDivClasses = classNames(
    "rounded-lg sm:rounded-[10px] w-full h-full top-0 flex items-center justify-center absolute z-4 whitespace-nowrap border-2",
    sizingClasses,
    active ? "bg-black text-white keypadbutton" : "bg-white"
  );

  const bottomDivClasses = classNames(
    "rounded-lg sm:rounded-[10px] w-full h-full absolute top-[4px] z-1 border-2 border-black md:top-[6px]",
    sizingClasses,
    active ? "bg-white" : "bg-black"
  );

  const buttonContent = (
    <>
      {/* Hidden element to determine width - must match actual button padding */}
      <span className={classNames("invisible whitespace-nowrap", sizingClasses)}>
        {children}
      </span>
      <motion.div
        className={topDivClasses}
        animate={{
          y: active ? pressOffset : 0,
        }}
        whileTap={{
          y: pressOffset,
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
