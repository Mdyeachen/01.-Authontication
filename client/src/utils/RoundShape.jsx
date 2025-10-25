import React from "react";
import { motion } from "framer-motion";

const RoundShape = ({ size, position, delay }) => {
  return (
    <motion.div
      className={`absolute rounded-full bg-green-900 ${size} opacity-40 blur-xl ${position}`}
      animate={{
        x: ["0%", "100%", "0%"],
        y: ["0%", "100%", "0%"],
        rotate: [0, 360],
      }}
      transition={{
        duration: 15,
        ease: "linear",
        repeat: Infinity,
        delay,
      }}
      aria-hidden="true"
    />
  );
};

export default RoundShape;
