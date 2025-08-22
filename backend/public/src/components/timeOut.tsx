import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import '../styles/timeOut.css';
import { useWebSocket } from '../context/useWebSocketToken';

export const TimerDisplay: React.FC = () => {
 const { timeOut } = useWebSocket();
  const [timer, setTimer] = useState(timeOut);

 useEffect(() => {
    const interval = setInterval(() => {
      setTimer(prev => Math.max(prev - 1, 0)); 
    }, 1000);

    return () => clearInterval(interval);
  }, []); 

  const isCritical = timer <= 10;

  return (
    <AnimatePresence>
      {timer > 0 && (
        <motion.div
          className={`timerDisplay ${isCritical ? 'critical' : ''}`}
          initial={{ scale: 1 }}
          animate={isCritical ? { scale: [1, 1.3, 1] } : { scale: 1 }}
          transition={isCritical ? { duration: 0.6, repeat: Infinity, ease: 'easeInOut' } : { duration: 0 }}
        >
          {timer}s
        </motion.div>
      )}
    </AnimatePresence>
  );
};
