import React, { useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ValentineCardProps {
  onAccept: () => void;
  onMoveNo: (e?: React.MouseEvent | React.TouchEvent) => void;
  noPos: { x: number; y: number };
  evadeCount: number;
}

const ValentineCard: React.FC<ValentineCardProps> = ({ onAccept, onMoveNo, noPos, evadeCount }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const noButtonStyle = useMemo(() => {
    const max = 12; 
    const progress = Math.min(evadeCount, max);
    const scale = Math.max(1 - (progress / max), 0);
    const opacity = Math.max(1 - (progress / max), 0);
    return { scale, opacity, isGone: scale <= 0.05 };
  }, [evadeCount]);

  const handleAcceptClick = () => {
    if (audioRef.current) {
      audioRef.current.volume = 0.4;
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {});
    }
    onAccept();
  };

  return (
    <div className="bg-white p-6 md:p-10 rounded-[40px] shadow-[0_20px_60px_rgba(255,77,109,0.3)] border-[8px] md:border-[12px] border-white max-w-sm w-full mx-auto text-center relative overflow-visible">
      <audio ref={audioRef} src="https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3" preload="auto" />
      
      <h1 className="text-3xl md:text-4xl font-bold text-rose-500 mb-6 font-romantic tracking-wide px-2 leading-tight">
        ¿Quieres ser mi San Valentín?
      </h1>
      
      <div className="flex justify-center mb-6">
        <div className="relative w-44 h-44 md:w-56 md:h-56 flex items-center justify-center">
           {/* Usando una URL de Tenor más directa y común */}
           <img 
              src="https://media.tenor.com/C7-m9fVvY_QAAAAC/bunny-butt-bunny.gif" 
              alt="Cute Bunny Butt" 
              className="w-full h-full object-contain rounded-2xl"
           />
        </div>
      </div>

      <div className="flex flex-row justify-center items-center gap-4 md:gap-8 min-h-[90px] relative">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleAcceptClick}
          className="bg-[#ff4d6d] hover:bg-[#ff758f] text-white font-bold py-3 md:py-4 px-8 md:px-10 rounded-full shadow-lg transition-colors text-lg md:text-xl z-20"
        >
          ¡Sí!
        </motion.button>

        <AnimatePresence>
          {!noButtonStyle.isGone && (
            <motion.button
              key="no-btn"
              onMouseEnter={(e) => onMoveNo(e)}
              onClick={(e) => onMoveNo(e)}
              initial={{ scale: 1, opacity: 1 }}
              animate={{
                x: noPos.x,
                y: noPos.y,
                scale: noButtonStyle.scale,
                opacity: noButtonStyle.opacity
              }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ 
                x: { type: 'spring', stiffness: 150, damping: 20 },
                y: { type: 'spring', stiffness: 150, damping: 20 },
                scale: { duration: 0.4 },
                opacity: { duration: 0.4 }
              }}
              className="bg-gray-100 text-gray-400 font-bold py-3 md:py-4 px-8 md:px-10 rounded-full border border-gray-200 text-lg md:text-xl whitespace-nowrap z-10 touch-none select-none"
            >
              No
            </motion.button>
          )}
        </AnimatePresence>
      </div>
      
      <div className="mt-8">
        <div className="flex justify-center gap-2">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.7, 0.3] }}
              transition={{ repeat: Infinity, duration: 2, delay: i * 0.4 }}
              className="w-2 h-2 rounded-full bg-rose-300"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ValentineCard;