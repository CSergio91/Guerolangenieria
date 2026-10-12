import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, CalendarCheck, Coins, UserCheck } from 'lucide-react';

export const Guarantees: React.FC = () => {
  const pillars = [
    {
      icon: CalendarCheck,
      title: 'Plazo Cerrado por Contrato',
      desc: 'Fijamos por escrito el día exacto de entrega de llaves. Si nos retrasamos por causas imputables, asumimos penalización económica por cada día de desfase.',
      stat: '98.7%',
      statLabel: 'Aperturas en fecha exacta',
    },
    {
      icon: Coins,
      title: 'Presupuesto Sin Desviaciones',
      desc: 'Mediciones exhaustivas e ingeniería previa para que no existan partidas imprevistas. El precio firmado en contrato es el precio final de tu local.',
      stat: '0€',
      statLabel: 'Sobrecostes no autorizados',
    },
    {
      icon: ShieldCheck,
      title: 'Garantía Total de Licencia',
      desc: 'Nuestros ingenieros visan cada plano y gestionan la licencia ambiental y de obra con los técnicos municipales hasta la resolución favorable.',
      stat: '100%',
      statLabel: 'Licencias obtenidas con éxito',
    },
    {
      icon: UserCheck,
      title: 'Interlocutor Técnico Único',
      desc: 'Trato directo con el Ingeniero responsable de tu obra. Sin intermediarios comerciales ni pérdida de información entre diseño y albañilería.',
      stat: '1:1',
      statLabel: 'Ingeniero colegiado asignado',
    },
  ];

  return (
    <section id="garantias" className="relative py-4 sm:py-8 px-4 sm:px-6 lg:px-8 z-10 w-full">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="max-w-3xl mb-6 sm:mb-8">
          <span className="font-condensed font-bold text-sm sm:text-base text-[#FFD000] tracking-[0.2em] uppercase">
            COMPROMISO CONTRACTUAL
          </span>
          <h2 className="font-condensed font-extrabold text-4xl sm:text-5xl md:text-6xl uppercase tracking-tight text-white mt-2 leading-[0.95] drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]">
            4 GARANTÍAS QUE NINGUNA OTRA REFORMA TE FIRMA
          </h2>
          <p className="text-base sm:text-lg text-slate-200 mt-4 leading-relaxed font-normal drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
            El mayor temor al abrir un negocio son las obras que nunca terminan y los presupuestos que se duplican. En Guerola Ingeniería blindamos tu inversión con rigor de ingeniería.
          </p>
        </div>

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="bg-[#0E1118]/85 backdrop-blur-md border border-white/15 hover:border-[#FFD000] rounded-2xl p-7 flex flex-col justify-between transition-colors duration-300 shadow-xl hover:shadow-2xl hover:shadow-[#FFD000]/15"
              >
                <div>
                  <motion.div
                    whileHover={{ scale: 1.15, rotate: 6 }}
                    className="w-12 h-12 rounded-xl bg-[#FFD000]/15 border border-[#FFD000]/30 flex items-center justify-center text-[#FFD000] mb-6"
                  >
                    <Icon className="w-6 h-6" />
                  </motion.div>

                  <h3 className="font-condensed font-extrabold text-2xl text-white uppercase tracking-tight mb-3">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10">
                  <span className="font-condensed font-black text-3xl sm:text-4xl text-[#FFD000] block tracking-tight drop-shadow-[0_0_12px_rgba(255,208,0,0.4)]">
                    {item.stat}
                  </span>
                  <span className="text-[11px] uppercase tracking-wider text-slate-300 font-semibold">
                    {item.statLabel}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
