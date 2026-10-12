import React from 'react';
import { motion } from 'motion/react';
import { Compass, FileCheck, Hammer, Key, ArrowRight, ShieldCheck, Check } from 'lucide-react';

interface TransformationProcessProps {
  onOpenStudyModal: () => void;
}

export const TransformationProcess: React.FC<TransformationProcessProps> = ({ onOpenStudyModal }) => {
  const steps = [
    {
      number: '01',
      title: 'Viabilidad Técnica y Normativa',
      subtitle: 'Antes de firmar el alquiler o compra',
      icon: Compass,
      description:
        'Auditamos el local: salidas de humos, potencia eléctrica, aislamiento acústico, accesibilidad y compatibilidad urbanística con tu actividad.',
      points: [
        'Inspección in situ antes del contrato',
        'Estudio de viabilidad urbanística',
        'Ahorro de sorpresas y costes imprevistos',
      ],
    },
    {
      number: '02',
      title: 'Proyecto Técnico y Diseño 3D',
      subtitle: 'Ingeniería con memoria y presupuesto cerrado',
      icon: FileCheck,
      description:
        'Redactamos el proyecto de actividad y obra visado. Modelamos en 3D el espacio y calculamos climatización, electricidad y distribución comercial.',
      points: [
        'Planos de instalaciones y distribución',
        'Visualización 3D hiperrealista',
        'Presupuesto desglosado con precio cerrado',
      ],
    },
    {
      number: '03',
      title: 'Ejecución y Dirección de Obra',
      subtitle: 'Un único interlocutor técnico en obra',
      icon: Hammer,
      description:
        'Coordinamos albañilería, fontanería, electricidad, carpintería y climatización. Controlamos calidades diarias y aseguramos los plazos de entrega.',
      points: [
        'Dirección facultativa cualificada',
        'Informes periódicos de avance',
        'Compromiso de fecha garantizada por contrato',
      ],
    },
    {
      number: '04',
      title: 'Legalización y Entrega de Llaves',
      subtitle: 'Tu negocio listo para facturar',
      icon: Key,
      description:
        'Gestionamos la licencia ambiental y de apertura ante el Ayuntamiento. Entregamos el local certificado y listo para abrir las puertas al público.',
      points: [
        'Certificados finales de instalación',
        'Tramitación de licencia en el ayuntamiento',
        'Entrega llave en mano en fecha pactada',
      ],
    },
  ];

  return (
    <section id="proceso" className="relative py-4 sm:py-8 px-4 sm:px-6 lg:px-8 z-10 w-full">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-6 sm:mb-8">
          <span className="font-condensed font-bold text-sm sm:text-base text-[#FFD000] tracking-[0.2em] uppercase">
            MÉTODO GUEROLA INGENIERÍA
          </span>
          <h2 className="font-condensed font-extrabold text-3xl sm:text-5xl uppercase tracking-tight text-white mt-1 leading-[0.95] drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]">
            DE LA PRIMERA IDEA A LA FACTURACIÓN
          </h2>
          <p className="text-sm sm:text-base text-slate-200 mt-2 leading-relaxed font-normal drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
            Eliminamos la incertidumbre de reformar un local. Nos encargamos de la ingeniería, los permisos y la construcción para que tú solo te preocupes de abrir tu negocio.
          </p>
        </div>

        {/* 4 Process Cards (Staggered Animation & Playful Spring Hover) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group relative bg-[#0E1118]/85 backdrop-blur-md border border-white/15 hover:border-[#FFD000] rounded-2xl p-6 sm:p-7 flex flex-col justify-between transition-colors duration-300 shadow-xl hover:shadow-2xl hover:shadow-[#FFD000]/15"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-condensed font-black text-3xl sm:text-4xl text-[#FFD000] tracking-tighter drop-shadow-[0_0_12px_rgba(255,208,0,0.4)]">
                      {step.number}
                    </span>
                    <motion.div
                      whileHover={{ rotate: 12, scale: 1.1 }}
                      className="w-10 h-10 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-white group-hover:text-[#FFD000] group-hover:border-[#FFD000]/50 transition-colors"
                    >
                      <Icon className="w-5 h-5" />
                    </motion.div>
                  </div>

                  <h3 className="font-condensed font-bold text-xl sm:text-2xl text-white uppercase tracking-tight leading-tight mb-2">
                    {step.title}
                  </h3>
                  <p className="text-xs text-[#FFD000] font-semibold uppercase tracking-wider mb-3">
                    {step.subtitle}
                  </p>
                  <p className="text-sm text-slate-300 leading-relaxed mb-6">
                    {step.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10 space-y-2">
                  {step.points.map((pt, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                      <Check className="w-3.5 h-3.5 text-[#FFD000] shrink-0 mt-0.5" />
                      <span>{pt}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Callout */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-12 p-6 sm:p-8 rounded-2xl bg-[#11141E]/90 backdrop-blur-md border border-white/15 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl"
        >
          <div className="flex items-center gap-4">
            <motion.div
              whileHover={{ scale: 1.1, rotate: 6 }}
              className="w-12 h-12 rounded-xl bg-[#FFD000]/20 border border-[#FFD000]/40 flex items-center justify-center text-[#FFD000] shrink-0"
            >
              <ShieldCheck className="w-6 h-6" />
            </motion.div>
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white">¿Tienes un local en el punto de mira?</h4>
              <p className="text-xs sm:text-sm text-slate-300">
                Analizamos su idoneidad técnica y viabilidad de licencia antes de que comprometas tu fianza.
              </p>
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={onOpenStudyModal}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#FFD000] text-black font-condensed font-bold uppercase text-base rounded-full hover:bg-yellow-400 transition-colors shrink-0 shadow-lg cursor-pointer"
          >
            <span>CONSULTAR VIABILIDAD AHORA</span>
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        </motion.div>

      </div>
    </section>
  );
};
