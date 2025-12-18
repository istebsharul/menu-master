import { motion, useAnimation, useInView } from "framer-motion";
import { useRef, useEffect } from "react";

export const AnimatedSection = ({ id, children, className = "", delay = 0 }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const controls = useAnimation();

  useEffect(() => {
    if (inView) controls.start("visible");
  }, [controls, inView]);

  return (
    <motion.section
      id={id}
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay } },
      }}
      className={`scroll-mt-24 ${className}`}
    >
      {children}
    </motion.section>
  );
};