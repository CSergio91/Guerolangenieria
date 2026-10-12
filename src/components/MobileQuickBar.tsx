import React from 'react';
import { Phone, MessageCircle, ArrowRight } from 'lucide-react';

interface MobileQuickBarProps {
  onOpenStudyModal: () => void;
}

export const MobileQuickBar: React.FC<MobileQuickBarProps> = ({ onOpenStudyModal }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 sm:hidden bg-[#0A0C10]/95 backdrop-blur-lg border-t border-white/10 px-3 py-2 flex items-center gap-2">
      <a
        href="tel:+34912345678"
        aria-label="Llamar a Guerola Ingeniería"
        className="w-11 h-11 rounded-full bg-white/5 border border-white/15 flex items-center justify-center text-slate-200 active:bg-white/10 shrink-0"
      >
        <Phone className="w-4 h-4 text-[#FFD000]" />
      </a>

      <a
        href="https://wa.me/34600000000?text=Hola,%20quisiera%20estudiar%20mi%20local%20comercial"
        target="_blank"
        rel="noreferrer"
        aria-label="Contactar por WhatsApp"
        className="w-11 h-11 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 active:bg-emerald-500/30 shrink-0"
      >
        <MessageCircle className="w-4 h-4" />
      </a>

      <button
        onClick={onOpenStudyModal}
        className="flex-1 h-11 bg-[#FFD000] active:bg-yellow-400 text-black font-condensed font-extrabold text-sm uppercase rounded-full flex items-center justify-center gap-1.5 tracking-wider px-3 shadow-lg"
      >
        <span>ESTUDIAR MI PROYECTO</span>
        <ArrowRight className="w-4 h-4 stroke-[2.5]" />
      </button>
    </div>
  );
};
