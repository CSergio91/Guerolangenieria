import React, { useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronUp, ChevronDown } from 'lucide-react';
import { Hero } from './Hero';
import { TransformationProcess } from './TransformationProcess';
import { OpaqueServicesAndCalculator } from './OpaqueServicesAndCalculator';
import { BeforeAfterSlider } from './BeforeAfterSlider';
import { Guarantees } from './Guarantees';
import { ContactSection } from './ContactSection';

interface SlideDeckProps {
  currentSlide: number;
  direction: number;
  onSlideChange: (index: number) => void;
  onOpenStudyModal: (sectorOrSummary?: string) => void;
  onOpenVideoModal: () => void;
  prefilledType: string;
}

export const TOTAL_SLIDES = 6;

const SLIDE_INFO = [
  { id: 'inicio', label: 'Inicio', title: 'De un local vacío a un negocio' },
  { id: 'proceso', label: 'Proceso', title: 'El método llave en mano' },
  { id: 'servicios', label: 'Especialidades', title: 'Tipologías y viabilidad' },
  { id: 'proyectos', label: 'Antes & Después', title: 'Caso real de transformación' },
  { id: 'garantias', label: 'Garantías', title: '4 compromisos contractuales' },
  { id: 'contacto', label: 'Contacto', title: 'Hablemos de tu proyecto' },
];

export const SlideDeck: React.FC<SlideDeckProps> = ({
  currentSlide,
  direction,
  onSlideChange,
  onOpenStudyModal,
  onOpenVideoModal,
  prefilledType,
}) => {
  const isTransitioningRef = useRef<boolean>(false);
  const touchStartY = useRef<number | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  const goToSlide = useCallback((targetIndex: number) => {
    if (targetIndex < 0 || targetIndex >= TOTAL_SLIDES || targetIndex === currentSlide || isTransitioningRef.current) return;
    
    // Lock transition for 500ms to allow smooth slide completion without jitter
    isTransitioningRef.current = true;
    onSlideChange(targetIndex);

    setTimeout(() => {
      isTransitioningRef.current = false;
    }, 500);
  }, [currentSlide, onSlideChange]);

  const handleNext = useCallback(() => {
    if (currentSlide < TOTAL_SLIDES - 1) {
      goToSlide(currentSlide + 1);
    }
  }, [currentSlide, goToSlide]);

  const handlePrev = useCallback(() => {
    if (currentSlide > 0) {
      goToSlide(currentSlide - 1);
    }
  }, [currentSlide, goToSlide]);

  // WHEEL SCROLL EVENT HANDLER (SMOOTH SLIDE TRANSITIONS & READABLE CONTENT)
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (isTransitioningRef.current) return;

      // Check if active slide has internal scroll container
      const activeEl = scrollContainerRef.current;
      if (activeEl) {
        const atTop = activeEl.scrollTop <= 5;
        const atBottom = activeEl.scrollTop + activeEl.clientHeight >= activeEl.scrollHeight - 5;

        // If scrolling down but not at bottom, let user read inside
        if (e.deltaY > 0 && !atBottom) return;
        // If scrolling up but not at top, let user read inside
        if (e.deltaY < 0 && !atTop) return;
      }

      if (Math.abs(e.deltaY) > 20) {
        if (e.deltaY > 0) {
          handleNext();
        } else {
          handlePrev();
        }
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: true });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [handleNext, handlePrev]);

  // TOUCH SWIPE GESTURES FOR MOBILE
  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (touchStartY.current === null || isTransitioningRef.current) return;
      const touchEndY = e.changedTouches[0].clientY;
      const diffY = touchStartY.current - touchEndY;

      // Check internal scroll before triggering slide switch
      const activeEl = scrollContainerRef.current;
      if (activeEl) {
        const atTop = activeEl.scrollTop <= 5;
        const atBottom = activeEl.scrollTop + activeEl.clientHeight >= activeEl.scrollHeight - 5;
        if (diffY > 0 && !atBottom) return;
        if (diffY < 0 && !atTop) return;
      }

      if (Math.abs(diffY) > 40) {
        if (diffY > 0) {
          handleNext();
        } else {
          handlePrev();
        }
      }
      touchStartY.current = null;
    };

    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [handleNext, handlePrev]);

  // KEYBOARD NAVIGATION (Arrows & Page Up/Down)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        handleNext();
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        handlePrev();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev]);

  // BIDIRECTIONAL ORBITAL CIRCUMFERENCE VARIANTS:
  // - Moving FORWARD (dir >= 0):
  //   Enters from the RIGHT (+85vw, +14vh, rotate +7deg)
  //   Lands squarely in dead center (x: 0, y: 0, rotate: 0deg) completely level & readable
  //   Exits curving upwards to the LEFT (-85vw, -14vh, rotate -7deg)
  // - Moving BACKWARD (dir < 0):
  //   Enters from the LEFT (-85vw, -14vh, rotate -7deg) along the opposite circumference arc
  //   Lands squarely in dead center (x: 0, y: 0, rotate: 0deg) completely level & readable
  //   Exits curving downwards to the RIGHT (+85vw, +14vh, rotate +7deg)
  const slideVariants = {
    enter: (dir: number = 1) => {
      const isForward = (typeof dir === 'number' ? dir : 1) >= 0;
      return {
        x: isForward ? '85vw' : '-85vw',
        y: isForward ? '14vh' : '-14vh',
        rotate: isForward ? 7 : -7,
        scale: 0.94,
        opacity: 0,
      };
    },
    center: {
      x: '0vw',
      y: '0vh',
      rotate: 0,
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.65,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
    exit: (dir: number = 1) => {
      const isForward = (typeof dir === 'number' ? dir : 1) >= 0;
      return {
        x: isForward ? '-85vw' : '85vw',
        y: isForward ? '-14vh' : '14vh',
        rotate: isForward ? -7 : 7,
        scale: 0.94,
        opacity: 0,
        transition: {
          duration: 0.45,
          ease: [0.16, 1, 0.3, 1] as const,
        },
      };
    },
  };

  return (
    <div className="relative w-full h-screen overflow-hidden flex items-center justify-center select-none">
      
      {/* ACTIVE SLIDE CONTAINER (RESTS PRECISELY IN VIEWPORT CENTER) */}
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={currentSlide}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          className="absolute inset-0 flex items-center justify-center pt-20 pb-16 sm:pb-20 px-4 sm:px-6 lg:px-12 w-full h-full will-change-transform"
        >
          {/* Scrollable inner viewport if content exceeds screen height on small devices */}
          <div
            ref={scrollContainerRef}
            className="w-full max-w-6xl max-h-[82vh] sm:max-h-[86vh] overflow-y-auto overscroll-contain no-scrollbar my-auto flex flex-col justify-center"
          >
            {currentSlide === 0 && (
              <Hero
                onOpenStudyModal={() => onOpenStudyModal()}
                onOpenVideoModal={onOpenVideoModal}
              />
            )}

            {currentSlide === 1 && (
              <TransformationProcess
                onOpenStudyModal={() => onOpenStudyModal()}
              />
            )}

            {currentSlide === 2 && (
              <OpaqueServicesAndCalculator
                onOpenStudyModal={(sectorOrSummary) => onOpenStudyModal(sectorOrSummary)}
              />
            )}

            {currentSlide === 3 && (
              <BeforeAfterSlider />
            )}

            {currentSlide === 4 && (
              <Guarantees />
            )}

            {currentSlide === 5 && (
              <ContactSection prefilledType={prefilledType} />
            )}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* FLOATING SIDE INDICATOR (DESKTOP & TABLET RIGHT EDGE) */}
      <div className="fixed right-4 sm:right-6 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-center gap-3 bg-black/40 backdrop-blur-md p-2 rounded-full border border-white/10 shadow-2xl">
        {/* PREVIOUS SLIDE BUTTON */}
        <button
          onClick={handlePrev}
          disabled={currentSlide === 0}
          className="p-1.5 rounded-full text-white/60 hover:text-white disabled:opacity-20 disabled:hover:text-white/60 transition-colors cursor-pointer"
          aria-label="Anterior sección"
        >
          <ChevronUp className="w-4 h-4" />
        </button>

        {/* DOTS WITH TOOLTIPS */}
        <div className="flex flex-col gap-2.5 my-1">
          {SLIDE_INFO.map((item, index) => {
            const isActive = currentSlide === index;
            return (
              <button
                key={item.id}
                onClick={() => goToSlide(index)}
                className="group relative flex items-center justify-center p-1 cursor-pointer"
                aria-label={`Ir a ${item.label}`}
              >
                <span
                  className={`block rounded-full transition-all duration-300 ${
                    isActive
                      ? 'w-2.5 h-6 bg-[#FFD000] shadow-[0_0_10px_#FFD000]'
                      : 'w-2 h-2 bg-white/30 group-hover:bg-white/80'
                  }`}
                />
                
                {/* Hover Tooltip label */}
                <span className="absolute right-7 px-2.5 py-1 rounded-lg bg-black/80 backdrop-blur-md text-[11px] font-condensed font-bold uppercase tracking-wider text-white whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity border border-white/10 shadow-lg">
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* NEXT SLIDE BUTTON */}
        <button
          onClick={handleNext}
          disabled={currentSlide === TOTAL_SLIDES - 1}
          className="p-1.5 rounded-full text-white/60 hover:text-white disabled:opacity-20 disabled:hover:text-white/60 transition-colors cursor-pointer"
          aria-label="Siguiente sección"
        >
          <ChevronDown className="w-4 h-4" />
        </button>
      </div>

      {/* FLOATING SLIDE PROGRESS COUNTER (BOTTOM RIGHT) */}
      <div className="fixed bottom-4 right-4 sm:right-6 z-40 hidden sm:flex items-center gap-2 bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 text-xs font-mono text-white/70">
        <span className="text-[#FFD000] font-bold">0{currentSlide + 1}</span>
        <span className="text-white/30">/</span>
        <span>0{TOTAL_SLIDES}</span>
        <span className="ml-1 text-[11px] text-white/40 hidden lg:inline font-sans">
          · {SLIDE_INFO[currentSlide]?.label}
        </span>
      </div>

    </div>
  );
};
