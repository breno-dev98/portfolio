"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

type CardAnimadoProps = {
  children: ReactNode;
  delay?: number;
};

export default function CardAnimado({ children, delay = 0 }: CardAnimadoProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay,
        ease: "easeOut",
      }}
      viewport={{ once: true, amount: 0.2 }}
    >
      {children}
    </motion.div>
  );
}
