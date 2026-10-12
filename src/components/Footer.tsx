import React from 'react';
import { ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#07080a] border-t border-white/10 py-12 px-4 sm:px-6 lg:px-8 z-10 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Brand */}
        <div className="flex items-center gap-3">
          <span className="font-display font-extrabold text-2xl text-white tracking-tighter">
            G<span className="text-[#FFD000]">I.</span>
          </span>
          <div className="border-l border-white/20 pl-2 leading-none">
            <span className="font-condensed font-extrabold text-xs text-white uppercase tracking-widest block">
              GUEROLA INGENIERÍA
            </span>
            <span className="text-[10px] text-slate-400">
              Proyectos de Actividad y Reformas Comerciales
            </span>
          </div>
        </div>

        {/* Links */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-slate-400">
          <a href="#inicio" className="hover:text-white transition-colors">Inicio</a>
          <a href="#proceso" className="hover:text-white transition-colors">El Proceso</a>
          <a href="#servicios" className="hover:text-white transition-colors">Sectores</a>
          <a href="#proyectos" className="hover:text-white transition-colors">Antes y Después</a>
          <a href="#contacto" className="hover:text-white transition-colors">Contacto</a>
        </div>

        {/* Copyright & Top Button */}
        <div className="flex items-center gap-4">
          <span>&copy; {new Date().getFullYear()} Guerola Ingeniería S.L. Todos los derechos reservados.</span>
          <button
            onClick={scrollToTop}
            aria-label="Volver arriba"
            className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:text-[#FFD000] hover:border-[#FFD000]/40 transition-colors"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>

      </div>
    </footer>
  );
};
