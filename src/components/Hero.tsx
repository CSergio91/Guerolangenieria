import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Play, ShieldCheck, Clock, Building2 } from 'lucide-react';

interface HeroProps {
  onOpenStudyModal: () => void;
  onOpenVideoModal: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenStudyModal, onOpenVideoModal }) => {
  return (
    <section
      id="inicio"
      className="relative flex flex-col justify-center py-4 sm:py-8 px-4 sm:px-6 lg:px-8 z-10 w-full"
    >
      <div className="max-w-7xl mx-auto w-full">
        <div className="max-w-3xl">

          {/* MAIN MASSIVE IMPACT HEADLINE (ANIMATED & DELIGHTFUL) */}
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 className="font-condensed font-extrabold uppercase tracking-tight text-white leading-[0.92] text-5xl sm:text-7xl md:text-8xl lg:text-[6.5rem] select-none">
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="block text-white drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)]"
              >
                DE UN LOCAL VACÍO
              </motion.span>
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.25 }}
                className="block mt-1 sm:mt-2"
              >
                <span className="text-white drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)]">A UN </span>
                <motion.span
                  initial={{ scale: 0.85, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 12, delay: 0.4 }}
                  className="inline-block text-[#FFD000] drop-shadow-[0_4px_24px_rgba(0,0,0,0.9)] text-shadow-[0_0_35px_rgba(255,208,0,0.5)]"
                >
                  NEGOCIO
                </motion.span>
              </motion.span>
            </h1>
          </motion.div>

          {/* SUBTITLE (EXACT REPLICA FROM REFERENCE IMAGE WITH ANIMATION) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-5 sm:mt-7 max-w-xl"
          >
            <p className="text-lg sm:text-xl md:text-2xl font-normal text-white tracking-wide leading-snug drop-shadow-[0_3px_10px_rgba(0,0,0,0.95)]">
              Ingeniería que convierte ideas
              <span className="block sm:inline"> en espacios reales.</span>
            </p>
            {/* The distinct horizontal yellow accent line with expansion animation */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.6, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
              style={{ originX: 0 }}
              className="w-16 sm:w-20 h-[3.5px] bg-[#FFD000] mt-3.5 rounded-full shadow-[0_0_12px_#FFD000]"
            />
          </motion.div>

          {/* ACTION BUTTONS (PLAYFUL, PROFESSIONAL & SPRINGY) */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.65 }}
            className="mt-8 sm:mt-11 flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-6"
          >
            
            {/* PRIMARY CTA: "CUÉNTANOS TU PROYECTO ->" */}
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(255,208,0,0.5)" }}
              whileTap={{ scale: 0.95 }}
              onClick={onOpenStudyModal}
              className="inline-flex items-center justify-center gap-3 bg-[#FFD000] text-black font-condensed font-black text-lg sm:text-xl uppercase tracking-wider px-8 py-4 sm:py-4.5 rounded-full shadow-2xl shadow-yellow-500/30 transition-all duration-200 group cursor-pointer border border-[#ffe566]/60 drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]"
            >
              <span>CUÉNTANOS TU PROYECTO</span>
              <motion.span
                animate={{ x: [0, 4, 0] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              >
                <ArrowRight className="w-5 h-5 stroke-[2.8]" />
              </motion.span>
            </motion.button>

            {/* SECONDARY CTA: "Ver cómo trabajamos" with playful beacon pulse play button */}
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={onOpenVideoModal}
              className="inline-flex items-center justify-center sm:justify-start gap-3.5 text-white hover:text-[#FFD000] text-sm sm:text-base font-bold py-3 px-4 rounded-full bg-black/40 backdrop-blur-md border border-white/20 hover:border-[#FFD000]/60 transition-all group focus:outline-none drop-shadow-[0_4px_10px_rgba(0,0,0,0.85)] cursor-pointer"
            >
              <div className="relative">
                {/* Playful beacon pulse effect */}
                <span className="absolute -inset-1 rounded-full bg-[#FFD000]/30 animate-ping opacity-75" />
                <span className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-full border-2 border-white/70 group-hover:border-[#FFD000] group-hover:bg-[#FFD000]/20 flex items-center justify-center transition-all duration-200 shadow-md">
                  <Play className="w-4 h-4 fill-white group-hover:fill-[#FFD000] text-white group-hover:text-[#FFD000] ml-0.5 transition-colors" />
                </span>
              </div>
              <span className="tracking-wide">Ver cómo trabajamos</span>
            </motion.button>

          </motion.div>

          {/* QUICK PROOF STRIP (FLOATS IN WITH SPRING ANIMATION) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.85 }}
            className="mt-12 sm:mt-16 pt-6 sm:pt-8 border-t border-white/20 grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6 text-xs sm:text-sm text-white font-medium drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]"
          >
            <motion.div
              whileHover={{ y: -2 }}
              className="flex items-center gap-2.5 p-2 rounded-xl bg-black/35 backdrop-blur-sm border border-white/10"
            >
              <Clock className="w-4 h-4 text-[#FFD000] shrink-0" />
              <span>Plazo cerrado por contrato</span>
            </motion.div>
            <motion.div
              whileHover={{ y: -2 }}
              className="flex items-center gap-2.5 p-2 rounded-xl bg-black/35 backdrop-blur-sm border border-white/10"
            >
              <ShieldCheck className="w-4 h-4 text-[#FFD000] shrink-0" />
              <span>Presupuesto sin desviaciones</span>
            </motion.div>
            <motion.div
              whileHover={{ y: -2 }}
              className="flex items-center gap-2.5 p-2 rounded-xl bg-black/35 backdrop-blur-sm border border-white/10 col-span-2 sm:col-span-1"
            >
              <Building2 className="w-4 h-4 text-[#FFD000] shrink-0" />
              <span>+120 locales inaugurados</span>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
