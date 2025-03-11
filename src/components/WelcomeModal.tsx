'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface WelcomeModalProps {
  onClose: () => void;
}

const WelcomeModal = ({ onClose }: WelcomeModalProps) => {
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 500); 
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
          className="fixed inset-0 z-50 flex items-center justify-center bg-blue-950/70 cursor-pointer"
        >
          <motion.div
            initial={{ scale: 0.8, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.8, y: 20 }}
            transition={{ type: "spring", bounce: 0.5 }}
            className="bg-white rounded-2xl shadow-xl p-10 max-w-md w-full text-center relative overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Decorative elements */}
            <motion.div 
              className="absolute top-0 right-0 w-32 h-32 bg-blue-100 rounded-full -mr-16 -mt-16"
              animate={{ 
                scale: [1, 1.2, 1],
                rotate: [0, 15, 0] 
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            />
            <motion.div 
              className="absolute bottom-0 left-0 w-24 h-24 bg-blue-100 rounded-full -ml-12 -mb-12"
              animate={{ 
                scale: [1, 1.3, 1],
                rotate: [0, -15, 0] 
              }}
              transition={{ 
                duration: 4,
                repeat: Infinity,
                repeatType: "reverse",
                delay: 0.5
              }}
            />
            
            {/* Content */}
            <motion.div 
              className="relative z-10"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <motion.h2 
                className="text-3xl font-geoformHeavy text-blue-950 mb-2"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                Welcome!
              </motion.h2>
              <p className="text-blue-950/80 mb-6">
                Click anywhere to start
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-blue-950 text-white font-geoformHeavy py-3 px-8 rounded-lg shadow-lg"
                onClick={handleClose}
              >
                Let's Go!
              </motion.button>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WelcomeModal;