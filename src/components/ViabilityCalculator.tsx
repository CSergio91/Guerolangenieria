import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Calculator, ArrowRight, CheckCircle2, AlertTriangle } from 'lucide-react';

interface ViabilityCalculatorProps {
  onOpenStudyModal: (summary?: string) => void;
}

export const ViabilityCalculator: React.FC<ViabilityCalculatorProps> = ({ onOpenStudyModal }) => {
  const [activity, setActivity] = useState<'retail' | 'clinica' | 'hosteleria' | 'oficinas'>('retail');
  const [sqm, setSqm] = useState<number>(120);
  const [status, setStatus] = useState<'bruto' | 'reforma_parcial' | 'demolicion'>('bruto');
  const [hasChimney, setHasChimney] = useState<'si' | 'no' | 'duda'>('duda');

  // Calculation estimates
  const getTimelineWeeks = () => {
    let base = 6;
    if (activity === 'clinica') base = 9;
    if (activity === 'hosteleria') base = 11;
    if (activity === 'oficinas') base = 7;

    if (sqm > 200) base += 3;
    if (sqm > 400) base += 5;

    if (status === 'demolicion') base += 2;
    if (status === 'reforma_parcial') base -= 1;

    return Math.max(5, base);
  };

  const getLicenseType = () => {
    if (activity === 'hosteleria' || activity === 'clinica') {
      return 'Licencia Ambiental Calificada / Sanitaria';
    }
    return sqm > 300 ? 'Licencia Ordinaria Municipal' : 'Declaración Responsable con Proyecto Técnico';
  };

  const getCriticalPoints = () => {
    if (activity === 'hosteleria') {
      return [
        'Obligatoria salida de humos independiente a cubierta comunitaria',
        'Insonorización acústica homologada con ensayo in situ',
        'Aseos accesibles y vestuario de personal independiente',
      ];
    }
    if (activity === 'clinica') {
      return [
        'Autorización Sanitaria previa y visado de gabinetes',
        'Separación acústica entre boxes y zona de espera',
        'Gestión de residuos biosanitarios y esterilización',
      ];
    }
    if (activity === 'oficinas') {
      return [
        'Cálculo de renovación de aire exterior según RITE (IDA 2)',
        'Iluminación según UNE-EN 12464-1 (UGR < 19)',
        'Evacuación contra incendios y accesibilidad de accesos',
      ];
    }
    return [
      'Ancho libre de paso en acceso ≥ 80 cm a cota cero',
      'Carga de fuego y sectorización contra incendios',
      'Potencia eléctrica contratada acorde a climatización e iluminación',
    ];
  };

  const weeks = getTimelineWeeks();
  const license = getLicenseType();
  const critical = getCriticalPoints();

  const handleConsult = () => {
    const summary = `Local de ${sqm}m² para ${activity.toUpperCase()} en estado ${status}`;
    onOpenStudyModal(summary);
  };

  return (
    <section className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 z-10">
      <div className="max-w-7xl mx-auto">
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mb-12 sm:mb-16"
        >
          <span className="font-condensed font-bold text-sm sm:text-base text-[#FFD000] tracking-[0.2em] uppercase">
            CALCULADORA DE VIABILIDAD TÉCNICA
          </span>
          <h2 className="font-condensed font-extrabold text-4xl sm:text-5xl md:text-6xl uppercase tracking-tight text-white mt-2 leading-[0.95] drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]">
            CALCULA TIEMPOS Y EXIGENCIAS DE TU LOCAL
          </h2>
          <p className="text-base sm:text-lg text-slate-200 mt-4 leading-relaxed font-normal drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
            Introduce los datos de tu futuro espacio y descubre el plazo estimado de obra y los requisitos técnicos que te exigirá el Ayuntamiento.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Controls Column */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7 bg-[#0E1118]/85 backdrop-blur-md border border-white/15 rounded-2xl p-6 sm:p-8 space-y-7 shadow-xl"
          >
            
            {/* 1. Actividad */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-3">
                1. Tipo de actividad comercial
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: 'retail', label: 'Retail / Tienda' },
                  { id: 'clinica', label: 'Clínica / Salud' },
                  { id: 'hosteleria', label: 'Hostelería' },
                  { id: 'oficinas', label: 'Oficina / Sede' },
                ].map((act) => (
                  <button
                    key={act.id}
                    onClick={() => setActivity(act.id as any)}
                    className={`py-3 px-3 rounded-xl text-xs font-semibold border transition-all text-center ${
                      activity === act.id
                        ? 'bg-[#FFD000] text-black border-[#FFD000] font-bold shadow-md'
                        : 'bg-white/5 border-white/10 text-slate-300 hover:border-white/20'
                    }`}
                  >
                    {act.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Superficie m² */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  2. Superficie del local (m²)
                </label>
                <span className="font-mono text-base font-bold text-[#FFD000]">
                  {sqm} m²
                </span>
              </div>
              <input
                type="range"
                min="35"
                max="600"
                step="5"
                value={sqm}
                onChange={(e) => setSqm(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-[#FFD000]"
              />
              <div className="flex justify-between text-[11px] text-slate-400 mt-1 font-mono">
                <span>35 m²</span>
                <span>150 m²</span>
                <span>300 m²</span>
                <span>600+ m²</span>
              </div>
            </div>

            {/* 3. Estado actual del inmueble */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-3">
                3. Estado actual del espacio
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {[
                  { id: 'bruto', label: 'En bruto (obra nueva)' },
                  { id: 'reforma_parcial', label: 'Actividad previa similar' },
                  { id: 'demolicion', label: 'Requiere demolición total' },
                ].map((st) => (
                  <button
                    key={st.id}
                    onClick={() => setStatus(st.id as any)}
                    className={`py-3 px-3 rounded-xl text-xs font-semibold border transition-all text-center ${
                      status === st.id
                        ? 'bg-[#FFD000] text-black border-[#FFD000] font-bold shadow-md'
                        : 'bg-white/5 border-white/10 text-slate-300 hover:border-white/20'
                    }`}
                  >
                    {st.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 4. Si es hostelería, salida de humos */}
            {activity === 'hosteleria' && (
              <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20">
                <div className="flex items-center gap-2 mb-2 text-amber-300 text-xs font-bold uppercase tracking-wider">
                  <AlertTriangle className="w-4 h-4 shrink-0" />
                  <span>¿El edificio dispone de salida de humos a cubierta?</span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'si', label: 'Sí, confirmada' },
                    { id: 'no', label: 'No dispone' },
                    { id: 'duda', label: 'Necesito revisarlo' },
                  ].map((ch) => (
                    <button
                      key={ch.id}
                      onClick={() => setHasChimney(ch.id as any)}
                      className={`py-2 px-2 rounded-lg text-xs font-semibold border transition-all ${
                        hasChimney === ch.id
                          ? 'bg-amber-400 text-black border-amber-400 font-bold'
                          : 'bg-white/5 border-white/10 text-slate-300'
                      }`}
                    >
                      {ch.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

          </motion.div>

          {/* Results Summary Box */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-5 bg-gradient-to-b from-[#141722]/95 to-[#0b0d13]/95 backdrop-blur-md border border-[#FFD000]/50 rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#FFD000]/10 rounded-full blur-3xl pointer-events-none" />

            <div>
              <div className="flex items-center justify-between pb-5 border-b border-white/10 mb-6">
                <span className="text-xs uppercase font-bold tracking-widest text-[#FFD000]">
                  DIAGNÓSTICO TÉCNICO PRELIMINAR
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  Guerola Engineering
                </span>
              </div>

              {/* Plazo estimado */}
              <div className="mb-6">
                <span className="text-xs text-slate-400 block mb-1">Tiempo de ejecución estimado</span>
                <div className="flex items-baseline gap-2">
                  <span className="font-condensed font-black text-4xl sm:text-5xl text-white">
                    {weeks} - {weeks + 2}
                  </span>
                  <span className="text-xl font-bold text-[#FFD000]">semanas</span>
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  Desde aprobación del proyecto técnico hasta entrega de llaves.
                </p>
              </div>

              {/* Licencia requerida */}
              <div className="mb-6 p-4 rounded-xl bg-white/5 border border-white/10">
                <span className="text-[11px] font-mono text-[#FFD000] uppercase block mb-1">
                  Trámite Municipal Previsto
                </span>
                <span className="text-sm font-bold text-white block">
                  {license}
                </span>
              </div>

              {/* Puntos críticos */}
              <div className="mb-6">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-300 block mb-3">
                  Exigencias Técnicas Clave:
                </span>
                <div className="space-y-2">
                  {critical.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#FFD000] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleConsult}
                className="w-full flex items-center justify-center gap-2 bg-[#FFD000] hover:bg-yellow-400 text-black font-condensed font-extrabold uppercase text-lg py-4 rounded-full transition-all duration-200 shadow-xl shadow-yellow-500/10 group cursor-pointer"
              >
                <span>SOLICITAR AUDITORÍA GRATUITA</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </motion.button>
              <p className="text-[11px] text-center text-slate-400 mt-2">
                Revisamos la idoneidad técnica de tu local antes de comprometer fondos.
              </p>
            </div>

          </motion.div>

        </div>

      </div>
    </section>
  );
};
