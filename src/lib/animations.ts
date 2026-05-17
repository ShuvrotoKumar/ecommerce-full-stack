'use client';

import { motion, useReducedMotion } from 'framer-motion';

export const springTransition = {
  type: 'spring',
  stiffness: 100,
  damping: 20,
};

// Hook to check for reduced motion preference
export const useReducedMotionPreference = () => {
  const shouldReduceMotion = useReducedMotion();
  return shouldReduceMotion;
};

// Higher-order component wrapper or helper for accessible animations
export const getAccessibleTransition = (shouldReduceMotion: boolean | undefined) => {
  if (shouldReduceMotion) {
    return { duration: 0 };
  }
  return springTransition;
};
