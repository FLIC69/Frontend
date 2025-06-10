export const pageTransition = {
  initial: {
    opacity: 0,
    y: 20,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: 'easeOut',
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.3,
      ease: 'easeIn',
    },
  },
}

export const staggerContainer = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

export const itemFade = {
  initial: {
    opacity: 0,
    y: 20,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
}

export const buttonHover = {
  initial: {
    scale: 1,
  },
  hover: {
    scale: 1.05,
    boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.1)',
    transition: {
      duration: 0.3,
      ease: 'easeInOut',
    },
  },
  tap: {
    scale: 0.95,
  },
}
