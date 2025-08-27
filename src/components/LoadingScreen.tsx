import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Lock, Globe, Wifi } from 'lucide-react';
import { useLanguage } from './LanguageContext';

const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
  const { t } = useLanguage();
  const [progress, setProgress] = useState(0);
  const [stage, setStage] = useState<'loading' | 'complete' | 'exit'>('loading');

  // Binary rain animation data
  const binaryStrings = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    content: Array.from({ length: 20 }, () => Math.random() > 0.5 ? '1' : '0').join(''),
    delay: Math.random() * 2,
    duration: 3 + Math.random() * 2,
  }));

  // Security icons for rotation
  const securityIcons = [Shield, Lock, Globe, Wifi];

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setStage('complete');
          
          // Complete animation after a short delay
          setTimeout(() => {
            setStage('exit');
            setTimeout(onComplete, 800);
          }, 500);
          
          return 100;
        }
        return prev + 2;
      });
    }, 60);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {stage !== 'exit' && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] bg-black flex items-center justify-center overflow-hidden"
        >
          {/* Binary Rain Background */}
          <div className="absolute inset-0 overflow-hidden">
            {binaryStrings.map((string) => (
              <motion.div
                key={string.id}
                initial={{ y: -100, opacity: 0 }}
                animate={{ 
                  y: '110vh', 
                  opacity: [0, 1, 1, 0],
                }}
                transition={{
                  duration: string.duration,
                  delay: string.delay,
                  repeat: Infinity,
                  ease: "linear"
                }}
                className="absolute text-emerald-500/30 font-mono text-sm"
                style={{
                  left: `${(string.id / binaryStrings.length) * 100}%`,
                  writingMode: 'vertical-rl',
                  textOrientation: 'mixed'
                }}
              >
                {string.content}
              </motion.div>
            ))}
          </div>

          {/* Animated Grid Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div 
              className="absolute inset-0"
              style={{
                backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(16, 185, 129, 0.3) 1px, transparent 0)',
                backgroundSize: '40px 40px',
                animation: 'pulse 4s ease-in-out infinite'
              }} 
            />
          </div>

          {/* Central Loading Area */}
          <div className="relative z-10 flex flex-col items-center px-4 sm:px-6">
            
            {/* Rotating Security Icons */}
            <div className="relative mb-6 sm:mb-8">
              {securityIcons.map((Icon, index) => (
                <motion.div
                  key={index}
                  className="absolute"
                  style={{
                    left: '50%',
                    top: '50%',
                  }}
                  animate={{
                    rotate: 360,
                    x: Math.cos((index * Math.PI * 2) / 4 + (progress * 0.1)) * (window.innerWidth < 640 ? 40 : 60) - 12,
                    y: Math.sin((index * Math.PI * 2) / 4 + (progress * 0.1)) * (window.innerWidth < 640 ? 40 : 60) - 12,
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                >
                  <Icon 
                    size={window.innerWidth < 640 ? 20 : 24} 
                    className="text-emerald-400/60 drop-shadow-lg"
                  />
                </motion.div>
              ))}
            </div>

            {/* Central Logo */}
            <motion.div
              initial={{ scale: 0, rotateY: 180 }}
              animate={{ 
                scale: [0, 1.2, 1], 
                rotateY: [180, 0, 0],
              }}
              transition={{ 
                duration: 1.5, 
                ease: "easeOut",
                times: [0, 0.6, 1]
              }}
              className="relative mb-6 sm:mb-8"
            >
              <div className="w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center relative">
                {/* Glitch overlay for logo */}
                <motion.div
                  animate={{
                    opacity: [0, 0.3, 0],
                    x: [0, 2, -2, 0],
                  }}
                  transition={{
                    duration: 0.2,
                    repeat: Infinity,
                    repeatDelay: 3,
                  }}
                  className="absolute inset-0 bg-gradient-to-r from-cyan-300 to-emerald-400 mix-blend-difference rounded-xl"
                />
                
                <img 
                  src="/logo2.png" 
                  alt="Sina Toprak Güleç Logo" 
                  className="w-16 h-16 sm:w-20 sm:h-20 object-contain relative z-10 drop-shadow-2xl filter brightness-110"
                />
                
                {/* Scanning line effect */}
                <motion.div
                  animate={{
                    y: [-100, 100],
                    opacity: [0, 0.8, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="absolute inset-0 h-1 bg-emerald-400/60 blur-sm"
                />
              </div>

              {/* Outer rotating ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 border-2 border-emerald-400/30 rounded-full scale-125"
              />
            </motion.div>

            {/* Progress Ring */}
            <div className="relative w-28 h-28 sm:w-32 sm:h-32 mb-4 sm:mb-6">
              <svg className="w-28 h-28 sm:w-32 sm:h-32 transform -rotate-90" viewBox="0 0 128 128">
                {/* Background circle */}
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  stroke="rgba(16, 185, 129, 0.1)"
                  strokeWidth="4"
                  fill="none"
                />
                {/* Progress circle */}
                <motion.circle
                  cx="64"
                  cy="64"
                  r="56"
                  stroke="url(#gradient)"
                  strokeWidth="4"
                  fill="none"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: progress / 100 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  style={{
                    pathLength: progress / 100
                  }}
                />
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#10b981" />
                    <stop offset="50%" stopColor="#06b6d4" />
                    <stop offset="100%" stopColor="#3b82f6" />
                  </linearGradient>
                </defs>
              </svg>
              
              {/* Progress percentage */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.span 
                  key={Math.floor(progress / 10)}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-xl sm:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400"
                >
                  {Math.floor(progress)}%
                </motion.span>
              </div>
            </div>

            {/* Loading Text with Glitch Effect */}
            <motion.div
              animate={{
                opacity: [1, 0.7, 1],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="text-center px-4 sm:px-0"
            >
              <motion.h2 
                className="text-lg sm:text-xl font-semibold text-white mb-2 relative"
                animate={{
                  textShadow: [
                    "0 0 0px rgba(16, 185, 129, 0)",
                    "0 0 10px rgba(16, 185, 129, 0.5)",
                    "0 0 0px rgba(16, 185, 129, 0)"
                  ]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
              >
                {t('loading.title')}
                
                {/* Glitch text overlay */}
                <motion.span
                  className="absolute inset-0 text-emerald-400"
                  animate={{
                    opacity: [0, 1, 0],
                    x: [0, -2, 2, 0],
                  }}
                  transition={{
                    duration: 0.15,
                    repeat: Infinity,
                    repeatDelay: 4,
                  }}
                >
                  {t('loading.title')}
                </motion.span>
              </motion.h2>
              
              <motion.div 
                className="flex items-center justify-center gap-1"
                animate={{
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                }}
              >
                <span className="text-gray-400 text-sm">{t('loading.preparing')}</span>
                <motion.span
                  animate={{
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 0.8,
                    repeat: Infinity,
                    repeatDelay: 0.2,
                  }}
                  className="text-emerald-400"
                >
                  ...
                </motion.span>
              </motion.div>
            </motion.div>

            {/* System Status Messages */}
            <motion.div 
              className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 text-center px-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
            >
              <div className="text-xs text-gray-500 font-mono space-y-1">
                <motion.div
                  animate={{ opacity: [0, 1, 1, 0] }}
                  transition={{ duration: 2, delay: 0 }}
                  className="whitespace-nowrap overflow-hidden text-ellipsis max-w-[280px] sm:max-w-none"
                >
                  {t('loading.encryption')}
                </motion.div>
                <motion.div
                  animate={{ opacity: [0, 1, 1, 0] }}
                  transition={{ duration: 2, delay: 1 }}
                  className="whitespace-nowrap overflow-hidden text-ellipsis max-w-[280px] sm:max-w-none"
                >
                  {t('loading.connection')}
                </motion.div>
                <motion.div
                  animate={{ opacity: [0, 1, 1, 0] }}
                  transition={{ duration: 2, delay: 2 }}
                  className="whitespace-nowrap overflow-hidden text-ellipsis max-w-[280px] sm:max-w-none"
                >
                  {t('loading.interface')}
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* Particle Effects */}
          <div className="absolute inset-0 pointer-events-none">
            {Array.from({ length: 8 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-emerald-400 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  scale: [0, 1, 0],
                  opacity: [0, 1, 0],
                  x: [0, (Math.random() - 0.5) * 200],
                  y: [0, (Math.random() - 0.5) * 200],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                  ease: "easeOut"
                }}
              />
            ))}
          </div>

          {/* Scan Lines Effect */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(16, 185, 129, 0.03) 2px, rgba(16, 185, 129, 0.03) 4px)',
            }}
            animate={{
              x: ['-100%', '100%'],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
