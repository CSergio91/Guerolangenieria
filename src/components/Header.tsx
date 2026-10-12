import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Phone, ArrowRight, MessageCircle } from 'lucide-react';

interface HeaderProps {
  onOpenStudyModal: () => void;
  onOpenVideoModal: () => void;
  activeSlideIndex?: number;
  onSelectSlide?: (index: number) => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenStudyModal,
  activeSlideIndex = 0,
  onSelectSlide,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: 'Inicio', index: 0, id: 'inicio' },
    { label: 'Proceso', index: 1, id: 'proceso' },
    { label: 'Especialidades', index: 2, id: 'servicios' },
    { label: 'Antes y Después', index: 3, id: 'proyectos' },
    { label: 'Garantías', index: 4, id: 'garantias' },
    { label: 'Contacto', index: 5, id: 'contacto' },
  ];

  const handleNavClick = (index: number) => {
    setMobileMenuOpen(false);
    if (onSelectSlide) {
      onSelectSlide(index);
    }
  };

  return (
    <>
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-[#090b0f]/85 via-[#090b0f]/50 to-transparent backdrop-blur-[6px] py-4 sm:py-5 border-b border-white/10"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            
            {/* BRAND LOGO: EXACT MATCH TO REFERENCE IMAGE, DIRECTLY ON BACKGROUND */}
            <motion.a
              href="#inicio"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(0);
              }}
              className="flex items-center gap-2 group shrink-0 focus:outline-none drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)] cursor-pointer"
            >
              <div className="flex items-baseline">
                {/* GI. with vibrant yellow dot */}
                <span className="font-display font-extrabold text-3xl sm:text-4xl text-white tracking-tighter">
                  G<span className="text-[#FFD000]">I.</span>
                </span>
              </div>
              <div className="flex flex-col border-l border-white/30 pl-2 text-left leading-none">
                <span className="font-condensed font-extrabold text-sm sm:text-base text-white tracking-widest uppercase">
                  GUEROLA
                </span>
                <span className="font-condensed font-medium text-[10px] sm:text-xs text-slate-200 tracking-[0.2em] uppercase">
                  INGENIERÍA
                </span>
              </div>
            </motion.a>

            {/* DESKTOP NAV LINKS WITH SMOOTH ACTIVE INDICATORS */}
            <nav className="hidden lg:flex items-center gap-7 xl:gap-8 drop-shadow-[0_2px_6px_rgba(0,0,0,0.85)]">
              {navItems.map((item) => {
                const isActive = activeSlideIndex === item.index;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.index)}
                    className={`relative py-1 text-sm font-semibold transition-all cursor-pointer ${
                      isActive ? 'text-[#FFD000]' : 'text-slate-200 hover:text-white'
                    }`}
                  >
                    <span>{item.label}</span>
                    {isActive && (
                      <motion.div
                        layoutId="activeSlideHeaderDot"
                        className="absolute -bottom-1 left-0 right-0 h-[2.5px] bg-[#FFD000] rounded-full shadow-[0_0_10px_#FFD000]"
                      />
                    )}
                  </button>
                );
              })}
            </nav>

            {/* ACTION CTA & WHATSAPP BUTTON */}
            <div className="flex items-center gap-3">
              <a
                href="https://wa.me/34611234567?text=Hola%20Guerola%20Ingenier%C3%ADa%2C%20tengo%20un%20local%20y%20quiero%20hacer%20un%20estudio%20de%20viabilidad."
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center gap-2 px-3.5 py-2 text-xs font-bold text-white bg-emerald-600/80 hover:bg-emerald-600 rounded-full border border-emerald-400/30 backdrop-blur-md transition-all shadow-md drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)]"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </a>

              {/* PRIMARY CTA: YELLOW OUTLINE BUTTON AS IN REFERENCE */}
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={onOpenStudyModal}
                className="hidden md:inline-flex items-center gap-2 border-2 border-[#FFD000] text-[#FFD000] hover:bg-[#FFD000] hover:text-black font-condensed font-black text-sm uppercase tracking-wider px-5 py-2 rounded-full transition-all duration-200 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] cursor-pointer"
              >
                <span>ESTUDIAR MI LOCAL</span>
                <ArrowRight className="w-4 h-4" />
              </motion.button>

              {/* MOBILE HAMBURGER BUTTON */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 text-white hover:text-[#FFD000] rounded-lg bg-black/40 border border-white/10 backdrop-blur-sm focus:outline-none"
                aria-label="Abrir menú"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

          </div>
        </div>
      </motion.header>

      {/* MOBILE FULLSCREEN MENU DRAWER */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-[#0B0D11]/98 backdrop-blur-2xl flex flex-col pt-24 pb-8 px-6 lg:hidden"
          >
            <div className="flex flex-col gap-2 my-auto">
              <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#FFD000] mb-2">
                Navegación del Proyecto
              </span>
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.index)}
                  className={`text-left font-condensed text-3xl font-extrabold uppercase py-3 border-b border-white/10 flex items-center justify-between ${
                    activeSlideIndex === item.index ? 'text-[#FFD000]' : 'text-white'
                  }`}
                >
                  <span>{item.label}</span>
                  <span className="text-xs font-mono text-white/40">0{item.index + 1}</span>
                </button>
              ))}
            </div>

            <div className="pt-6 border-t border-white/10 flex flex-col gap-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenStudyModal();
                }}
                className="w-full bg-[#FFD000] text-black font-condensed font-black text-lg uppercase tracking-wider py-3.5 rounded-full shadow-lg flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>ESTUDIAR MI LOCAL</span>
                <ArrowRight className="w-5 h-5" />
              </button>
              <a
                href="tel:611234567"
                className="w-full bg-white/10 text-white font-condensed font-bold text-base uppercase py-3 rounded-full flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4 text-[#FFD000]" />
                <span>Llamar a Ingeniería: 611 234 567</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
