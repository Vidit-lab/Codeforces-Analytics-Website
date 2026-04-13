export const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.9,
      delay,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  }),
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: (delay = 0) => ({
    opacity: 1,
    transition: {
      duration: 1.1,
      delay,
      ease: "easeOut",
    },
  }),
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: (delay = 0) => ({
    opacity: 1,
    scale: 1,
    transition: {
      duration: 1.2,
      delay,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  }),
};

export const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

export const cardHover = {
  rest: { scale: 1, boxShadow: "0 0 0px rgba(139, 92, 246, 0)" },
  hover: {
    scale: 1.025,
    boxShadow: "0 0 30px rgba(139, 92, 246, 0.2)",
    transition: { duration: 0.35, ease: "easeOut" },
  },
};
