import React from 'react';
import { motion } from 'framer-motion';

const GlitchTransition = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 1.1, filter: 'blur(10px) brightness(2)' }}
      animate={{ opacity: 1, scale: 1, filter: 'blur(0px) brightness(1)' }}
      exit={{ 
        opacity: 0, 
        scale: 0.9, 
        filter: 'blur(20px) contrast(2) invert(1)',
        x: [0, -20, 20, -10, 10, 0],
        transition: { duration: 0.3 }
      }}
      transition={{ 
        type: 'spring',
        stiffness: 100,
        damping: 20
      }}
      className="w-full h-full"
    >
      {children}
    </motion.div>
  );
};

export default GlitchTransition;
