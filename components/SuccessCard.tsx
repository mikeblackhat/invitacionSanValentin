
import React from 'react';
import { motion } from 'framer-motion';

const SuccessCard: React.FC = () => {
  const handleClaimVoucher = () => {
    const phoneNumber = "51912701756";
    const message = encodeURIComponent("¡Hola! Acepto ir por ese sushi. ¡Nos vemos en San Valentín! 🍣🍱");
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  return (
    <div className="bg-white p-8 md:p-12 rounded-[50px] shadow-[0_30px_100px_rgba(255,77,109,0.25)] border-[10px] md:border-[15px] border-white max-w-lg w-full mx-auto text-center relative overflow-hidden">
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="relative z-10"
      >
        <h1 className="text-4xl md:text-6xl font-bold text-[#ff4d6d] mb-4 font-romantic flex items-center justify-center gap-3">
          ¡Siiiiiiii! 
          <motion.div
            animate={{ 
              scale: [1, 1.3, 1],
              rotate: [0, 5, -5, 0]
            }}
            transition={{ 
              duration: 0.8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="inline-block"
          >
            <svg width="40" height="40" viewBox="0 0 24 24" fill="#ff4d6d" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </motion.div>
        </h1>
        
        <div className="flex justify-center mb-6">
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <img 
              src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExdm1pczhnbHBoZzltbmxhc2M2cXZxODNqY21pY2Z2cjRybm9oZ2Z2bCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/v9D6QOmsxWAsx1S58W/giphy.gif" 
              alt="Celebration" 
              className="w-48 h-48 md:w-56 md:h-56 object-contain drop-shadow-xl"
            />
          </motion.div>
        </div>

        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', delay: 0.5 }}
          className="flex flex-col items-center gap-3"
        >
          <span className="text-4xl md:text-6xl font-logo text-[#ff4d6d] drop-shadow-md">
            ¡Qué emoción!
          </span>
          
          <div className="bg-rose-50 p-5 md:p-6 rounded-3xl border-2 border-rose-100 shadow-inner mt-4 w-full">
            <p className="text-rose-600 font-bold text-lg md:text-2xl mb-1">
              ¡Entonces está decidido! 🍣
            </p>
            <p className="text-rose-400 text-base md:text-lg font-medium italic">
              Nuestra cita será para ir a comer sushi
            </p>
          </div>

          <div className="flex gap-4 mt-4">
            <span className="text-3xl md:text-4xl animate-bounce">🍣</span>
            <span className="text-3xl md:text-4xl animate-bounce delay-100">🍱</span>
            <span className="text-3xl md:text-4xl animate-bounce delay-200">🥢</span>
          </div>
        </motion.div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleClaimVoucher}
          className="mt-8 text-[#ff4d6d] text-3xl md:text-4xl font-logo drop-shadow-sm bg-rose-100/50 hover:bg-rose-100 py-3 px-10 rounded-full inline-block transition-all shadow-sm border border-rose-200 cursor-pointer"
        >
          reclamar Vale
        </motion.button>
      </motion.div>

      {/* Decoración de esquinas */}
      <div className="absolute top-0 left-0 w-24 h-24 bg-rose-50 rounded-br-full -z-0 opacity-50" />
      <div className="absolute bottom-0 right-0 w-24 h-24 bg-rose-50 rounded-tl-full -z-0 opacity-50" />
    </div>
  );
};

export default SuccessCard;
