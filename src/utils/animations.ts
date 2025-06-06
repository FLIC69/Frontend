import { Variants } from 'framer-motion';

export const pageTransition: Variants = {
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
};

export const staggerContainer: Variants = {
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
};

export const itemFade: Variants = {
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
};

export const getCropAnimation = (cropId: string): Variants => {
  const baseAnimation = {
    initial: {
      scale: 0.2,
      opacity: 0.5,
      y: 50,
    },
    animate: {
      scale: 1,
      opacity: 1,
      y: 0,
      transition: {
        duration: 2.5,
        ease: [0.34, 1.56, 0.64, 1],
      },
    },
  };

  const animations: { [key: string]: Variants } = {
    // Grains
    rice: {
      ...baseAnimation,
      animate: {
        ...baseAnimation.animate,
        transition: {
          duration: 3,
          ease: "easeOut",
        },
      },
    },
    maize: {
      ...baseAnimation,
      animate: {
        ...baseAnimation.animate,
        scale: 1.2,
        transition: {
          duration: 2.8,
          ease: "easeInOut",
        },
      },
    },
    // Legumes
    chickpea: {
      ...baseAnimation,
      animate: {
        ...baseAnimation.animate,
        rotate: [0, -10, 10, -10, 0],
        transition: {
          duration: 2.2,
        },
      },
    },
    kidneybeans: {
      ...baseAnimation,
      animate: {
        ...baseAnimation.animate,
        scale: [0.2, 1.1, 0.9, 1],
        transition: {
          duration: 2.5,
          times: [0, 0.6, 0.8, 1],
        },
      },
    },
    // Fruits
    mango: {
      ...baseAnimation,
      animate: {
        ...baseAnimation.animate,
        rotate: 360,
        transition: {
          duration: 3,
          ease: "easeInOut",
        },
      },
    },
    apple: {
      ...baseAnimation,
      animate: {
        ...baseAnimation.animate,
        scale: [0.2, 1.2, 0.8, 1.1, 1],
        transition: {
          duration: 2.8,
          times: [0, 0.4, 0.6, 0.8, 1],
        },
      },
    },
    // Default animation for other crops
    default: baseAnimation,
  };

  return animations[cropId] || animations.default;
};

export const buttonHover: Variants = {
  initial: {
    scale: 1,
  },
  hover: {
    scale: 1.05,
    boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.1)",
    transition: {
      duration: 0.3,
      ease: "easeInOut",
    },
  },
  tap: {
    scale: 0.95,
  },
};