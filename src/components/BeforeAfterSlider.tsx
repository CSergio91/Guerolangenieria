import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { Sparkles, SlidersHorizontal, ArrowLeftRight, CheckCircle2 } from 'lucide-react';

export const BeforeAfterSlider: React.FC = () => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const pos = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(pos);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (e.buttons === 1) {
      handleMove(e.clientX);
    }
  };

  return (
    <section id="proyectos" className="relative py-4 sm:py-8 px-4 sm:px-6 lg:px-8 z-10 w-full">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="max-w-3xl mb-4 sm:mb-6">
          <span className="font-condensed font-bold text-sm sm:text-base text-[#FFD000] tracking-[0.2em] uppercase">
            CASO REAL DE TRANSFORMACIÓN
          </span>
          <h2 className="font-condensed font-extrabold text-3xl sm:text-5xl uppercase tracking-tight text-white mt-1 leading-[0.95] drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]">
            MIRA LA METAMORFOSIS EN DIRECTO
          </h2>
          <p className="text-sm sm:text-base text-slate-200 mt-2 leading-relaxed font-normal drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
            Desliza el controlador central para comparar el estado en bruto inicial frente al resultado entregado con licencia concedida y apertura inmediata.
          </p>
        </div>

        {/* Interactive Comparison Box */}
        <div
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onTouchMove={handleTouchMove}
          className="relative w-full aspect-[16/9] sm:aspect-[21/9] max-h-[450px] rounded-3xl overflow-hidden border-2 border-white/20 select-none shadow-2xl cursor-ew-resize bg-[#0B0D11]"
        >
          {/* 1. "DESPUÉS" (COMPLETED CORPORATE MODERN RECEPTION - CLOUDINARY USER IMAGE) */}
          <div className="absolute inset-0 w-full h-full">
            <img
              src="https://res.cloudinary.com/lju4v2pw/image/upload/v1791820544/Recepci%C3%B3n_corporativa_moderna_con_plantas.png"
              alt="Negocio entregado y en marcha - Guerola Ingeniería"
              className="w-full h-full object-cover object-center"
              referrerPolicy="no-referrer"
            />
            {/* Label Despues */}
            <div className="absolute top-6 right-6 bg-emerald-500/90 backdrop-blur-md text-white font-condensed font-black text-sm uppercase px-4 py-1.5 rounded-full shadow-xl tracking-wider border border-white/20">
              DESPUÉS: NEGOCIO ENTREGADO & EN MARCHA
            </div>
          </div>

          {/* 2. "ANTES" (RAW CONCRETE & EXPOSED BRICK) - CLIPPED AT SLIDER POSITION */}
          <div
            className="absolute inset-0 overflow-hidden"
            style={{ width: `${sliderPosition}%` }}
          >
            <div className="absolute inset-0 w-[100vw] max-w-[1280px] h-full">
              <img
                src="https://res.cloudinary.com/lju4v2pw/image/upload/v1791820235/Vest%C3%ADbulo_moderno_en_fase_de_reforma.png"
                alt="Local en fase de reforma - Guerola Ingeniería"
                className="w-full h-full object-cover grayscale contrast-125"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/40" />
            </div>

            {/* Label Antes */}
            <div className="absolute top-6 left-6 bg-rose-500/90 backdrop-blur-md text-white font-condensed font-black text-sm uppercase px-4 py-1.5 rounded-full shadow-lg tracking-wider">
              LOCAL EN BRUTO (INICIAL)
            </div>
          </div>

          {/* 3. SLIDER DIVIDER LINE WITH CENTRAL HANDLE */}
          <div
            className="absolute top-0 bottom-0 w-1 bg-[#FFD000] cursor-ew-resize flex items-center justify-center pointer-events-none"
            style={{ left: `${sliderPosition}%` }}
          >
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#FFD000] text-black shadow-2xl flex items-center justify-center font-bold">
              <ArrowLeftRight className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
          </div>

        </div>

        {/* Legend */}
        <div className="mt-6 flex flex-wrap items-center justify-between text-xs sm:text-sm text-slate-400 gap-4">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-[#FFD000]" />
            <span>Arrastra o desliza con el dedo para comparar</span>
          </div>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
              Antes: Sin aislamiento, sin potencia, sin licencia
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              Después: Llave en mano en 8 semanas
            </span>
          </div>
        </div>

      </div>
    </section>
  );
};
