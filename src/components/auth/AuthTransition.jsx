import { motion } from "framer-motion";

const variants = {
  initial:  { opacity: 0, y: 16, scale: 0.98 },
  animate:  { opacity: 1, y: 0,  scale: 1    },
  exit:     { opacity: 0, y: -16, scale: 0.98 },
};

export default function AuthTransition({ children }) {
  return (
    <motion.div
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  );
}