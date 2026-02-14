
import React from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';

interface PullStringScreenProps {
  onComplete: () => void;
}

const BowIcon = ({ color = "#ff4d6d", scale = 1 }: { color?: string, scale?: number }) => (
  <svg 
    width="50" 
    height="35" 
    viewBox="0 0 40 30" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg" 
    style={{ transform: `scale(${scale})` }}
  >
    <path d="M20 15C20 15 12 5 5 10C-2 15 5 25 10 22C15 19 20 15 20 15Z" fill="#ff758f" stroke={color} strokeWidth="2"/>
    <path d="M20 15C20 15 28 5 35 10C42 15 35 25 30 22C25 19 20 15 20 15Z" fill="#ff758f" stroke={color} strokeWidth="2"/>
    <circle cx="20" cy="15" r="4" fill={color} />
  </svg>
);

const PullStringScreen: React.FC<PullStringScreenProps> = ({ onComplete }) => {
  const y = useMotionValue(0);
  
  // La altura de la cuerda empieza en 100px y crece exactamente según lo que se arrastra
  const stringHeight = useTransform(y, [0, 150], [100, 250]);
  const boxScale = useTransform(y, [0, 150], [1, 1.1]);
  const opacity = useTransform(y, [0, 120], [1, 0.3]);

  const handleDragEnd = (_: any, info: any) => {
    // Si el usuario bajó lo suficiente (100px), activamos la transición
    if (y.get() > 100) {
      onComplete();
    } else {
      y.set(0);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-[320px] mx-auto h-[80vh] min-h-[440px]">
      <div className="bg-white/95 backdrop-blur-sm w-full h-full max-h-[480px] rounded-[40px] shadow-2xl relative overflow-hidden flex flex-col items-center border-[10px] border-white">
        
        {/* Decoración de fondo sutil */}
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#ff4d6d 1.5px, transparent 0)', backgroundSize: '24px 24px' }} />

        {/* Estructura de la cuerda ancorada al techo de la tarjeta */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full flex flex-col items-center z-20">
          <motion.div 
            style={{ height: stringHeight }}
            className="w-[3.5px] bg-rose-500 relative origin-top shadow-sm"
          >
             {/* Textura de la cuerda para que parezca trenzada */}
             <div className="absolute inset-0 flex flex-col justify-around py-2 opacity-20">
                {[...Array(12)].map((_, i) => <div key={i} className="w-full h-[1.5px] bg-white"></div>)}
             </div>
          </motion.div>

          {/* Etiqueta / Tag para jalar, pegada al final de la cuerda */}
          <motion.div
            drag="y"
            dragConstraints={{ top: 0, bottom: 150 }}
            dragElastic={0.02}
            style={{ y }}
            onDragEnd={handleDragEnd}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex flex-col items-center -mt-0.5 cursor-grab active:cursor-grabbing touch-none select-none"
          >
            {/* Moño decorativo sobre la etiqueta */}
            <div className="drop-shadow-sm mb-[-4px] z-30">
               <BowIcon scale={1.0} />
            </div>
            
            <div className="w-14 h-18 bg-[#ff4d6d] rounded-lg shadow-xl flex flex-col items-center justify-center border-2 border-white/30 relative">
              <div className="w-3 h-3 rounded-full bg-white absolute top-2 shadow-inner"></div>
              <div className="text-white text-[11px] mt-6 font-black uppercase tracking-widest text-center leading-none">
                Jala
              </div>
            </div>
          </motion.div>
        </div>

        {/* Caja de regalo visual en la parte inferior */}
        <motion.div 
          style={{ scale: boxScale }}
          className="mt-auto mb-16 relative z-10 flex flex-col items-center"
        >
          <div className="text-8xl filter drop-shadow-xl animate-bounce">🎁</div>
          <motion.div 
            style={{ opacity }}
            className="mt-2 bg-rose-500/10 px-4 py-1 rounded-full border border-rose-100"
          >
            <span className="text-rose-500 text-[10px] font-black uppercase tracking-[0.2em]">Sorpresa</span>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Guía inferior */}
      <div className="mt-8 text-center">
        <h2 className="text-rose-500 font-romantic text-3xl md:text-4xl mb-1">Hola Caro =)</h2>
        <div className="flex items-center justify-center gap-2 text-rose-400 font-bold text-xs opacity-60">
          <span className="animate-bounce">↓</span>
          <span>Desliza para abrir</span>
          <span className="animate-bounce">↓</span>
        </div>
      </div>
    </div>
  );
};

export default PullStringScreen;
