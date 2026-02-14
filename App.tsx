import React, { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import PullStringScreen from './components/PullStringScreen';
import ValentineCard from './components/ValentineCard';
import SuccessCard from './components/SuccessCard';

type Step = 'intro' | 'proposal' | 'success';

const App: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<Step>('intro');
  const [noButtonPos, setNoButtonPos] = useState({ x: 0, y: 0 });
  const [evadeCount, setEvadeCount] = useState(0);

  const notifyWhatsApp = async (message: string) => {
    // REEMPLAZA ESTOS DATOS
    const PHONE = "TU_NUMERO_AQUI"; // Ejemplo: 51987654321 (con código de país)
    const API_KEY = "TU_API_KEY_AQUI";

    if (PHONE === "TU_NUMERO_AQUI" || !API_KEY) return;

    const url = `https://api.callmebot.com/whatsapp.php?phone=${PHONE}&text=${encodeURIComponent(message)}&apikey=${API_KEY}`;

    try {
      // Usamos no-cors porque la API de CallMeBot no siempre permite CORS desde el navegador, 
      // pero la petición llega igual al servidor.
      await fetch(url, { mode: 'no-cors' });
    } catch (error) {
      console.error("Error enviando WhatsApp:", error);
    }
  };

  useEffect(() => {
    notifyWhatsApp("❤️ Alguien acaba de entrar a tu invitación de San Valentín!");
  }, []);

  const triggerConfetti = (particleCount = 100) => {
    const duration = 6 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 45, spread: 360, ticks: 100, zIndex: 1000 };

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval: any = setInterval(function () {
      const timeLeft = animationEnd - Date.now();
      if (timeLeft <= 0) return clearInterval(interval);

      const count = particleCount * (timeLeft / duration);
      confetti({ ...defaults, particleCount: count, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
      confetti({ ...defaults, particleCount: count, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);
  };

  const handlePullComplete = () => {
    setCurrentStep('proposal');
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      zIndex: 1000
    });
  };

  const handleAccept = () => {
    setCurrentStep('success');
    triggerConfetti(120);
    notifyWhatsApp("✨ ¡DIJO QUE SÍ! ❤️ La invitación ha sido aceptada.");
  };

  const moveNoButton = useCallback((e?: React.MouseEvent | React.TouchEvent) => {
    setEvadeCount(prev => prev + 1);
    const range = 100;

    if (e && 'clientX' in e) {
      const target = e.currentTarget as HTMLElement;
      const rect = target.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      let dirX = centerX - e.clientX;
      let dirY = centerY - e.clientY;

      if (Math.abs(dirX) < 1 && Math.abs(dirY) < 1) {
        dirX = Math.random() - 0.5;
        dirY = Math.random() - 0.5;
      }

      const distance = Math.sqrt(dirX * dirX + dirY * dirY) || 1;

      setNoButtonPos(prev => ({
        x: prev.x + (dirX / distance) * range,
        y: prev.y + (dirY / distance) * range
      }));
    } else {
      const angle = Math.random() * Math.PI * 2;
      setNoButtonPos(prev => ({
        x: prev.x + Math.cos(angle) * range,
        y: prev.y + Math.sin(angle) * range
      }));
    }
  }, []);

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center bg-[#fce4ec] overflow-hidden select-none">

      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute text-pink-300/15 text-[6rem] md:text-[10rem] animate-pulse"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              transform: `rotate(${Math.random() * 360}deg) scale(${0.5 + Math.random() * 0.5})`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${4 + Math.random() * 4}s`
            }}
          >
            ❤️
          </div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {currentStep === 'intro' && (
          <motion.div
            key="intro"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.6 }}
            className="z-20 w-full flex justify-center px-4"
          >
            <PullStringScreen onComplete={handlePullComplete} />
          </motion.div>
        )}

        {currentStep === 'proposal' && (
          <motion.div
            key="proposal"
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.5, type: 'spring' }}
            className="z-20 w-full max-w-sm"
          >
            <ValentineCard
              onAccept={handleAccept}
              onMoveNo={moveNoButton}
              noPos={noButtonPos}
              evadeCount={evadeCount}
            />
          </motion.div>
        )}

        {currentStep === 'success' && (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="z-20 w-full max-w-lg px-4"
          >
            <SuccessCard />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;