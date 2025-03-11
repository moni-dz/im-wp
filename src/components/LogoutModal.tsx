'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LogoutModalProps {
  onConfirm: () => void;
  onCancel: () => void;
}

const LogoutModal = ({ onConfirm, onCancel }: LogoutModalProps) => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-blue-950/70"
      >
        <motion.div
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 20 }}
          transition={{ type: "spring", bounce: 0.4 }}
          className="bg-white rounded-lg shadow-xl p-6 max-w-sm w-full text-center"
          onClick={(e) => e.stopPropagation()}
        >
          <h2 className="text-xl font-geoformHeavy text-blue-950 mb-4">
            Are you sure?
          </h2>
          <p className="text-blue-950/80 mb-6">
            You will be logged out of the system.
          </p>
          
          <div className="flex gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gray-200 text-blue-950 font-geoformHeavy py-2 px-6 rounded-lg"
              onClick={onCancel}
            >
              Back
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-blue-950 text-white font-geoformHeavy py-2 px-6 rounded-lg"
              onClick={onConfirm}
            >
              Logout
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default LogoutModal;