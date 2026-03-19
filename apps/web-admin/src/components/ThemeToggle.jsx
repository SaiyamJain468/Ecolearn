import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.button
      onClick={toggleTheme}
      initial={false}
      whileHover={{ scale: 1.15 }}
      whileTap={{ scale: 0.9 }}
      className="fixed bottom-8 right-8 z-[9999] w-14 h-14 rounded-full flex items-center justify-center cursor-pointer"
      style={{
        background: theme === 'dark' ? '#111C44' : '#FFFFFF',
        border: `2px solid ${theme === 'dark' ? '#1B254B' : '#E2E8F0'}`,
        boxShadow: theme === 'dark'
          ? '0 8px 32px rgba(117, 81, 255, 0.3)'
          : '0 8px 32px rgba(67, 24, 255, 0.15)',
      }}
    >
      <AnimatePresence mode="wait" initial={false}>
        {theme === 'light' ? (
          <motion.div
            key="sun"
            initial={{ y: -20, opacity: 0, rotate: -90 }}
            animate={{ y: 0, opacity: 1, rotate: 0 }}
            exit={{ y: 20, opacity: 0, rotate: 90 }}
            transition={{ duration: 0.25, type: 'spring', stiffness: 200 }}
          >
            <Sun color="#FFB547" size={24} />
          </motion.div>
        ) : (
          <motion.div
            key="moon"
            initial={{ y: -20, opacity: 0, rotate: 90 }}
            animate={{ y: 0, opacity: 1, rotate: 0 }}
            exit={{ y: 20, opacity: 0, rotate: -90 }}
            transition={{ duration: 0.25, type: 'spring', stiffness: 200 }}
          >
            <Moon color="#7551FF" size={24} />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
