import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Store, Stethoscope, Utensils, Briefcase, CheckCircle2, ArrowRight } from 'lucide-react';

interface ServicesGridProps {
  onOpenStudyModal: (sector?: string) => void;
}

export const ServicesGrid: React.FC<ServicesGridProps> = ({ onOpenStudyModal }) => {
  const [activeTab, setActiveTab] = useState<'todos' | 'retail' | 'salud' | 'hosteleria' | 'oficinas'>('todos');

  const specialties = [
    {
      id: 'retail',
      icon: Store,
      category: 'retail',
      title: 'Comercio & Flagship Retail',
      tagline: 'Diseño comercial que maximiza ticket medio y flujo de clientes',
      highlights: [
        'Fachadas acristaladas de alto impacto visual',
        'Iluminación escenográfica con alto CRI para producto',
        'Circulación interior pensada para conversión',
        'Mobiliario a medida y optimización de almacén',
      ],
      leadTime: '6 - 10 semanas',
      normative: 'Accesibilidad universal + CTE Seguridad',
    },
    {
      id: 'salud',
      icon: Stethoscope,
      category: 'salud',
      title: 'Clínicas & Espacios Sanitarios',
      tagline: 'Dental, medicina estética, fisioterapia y consultas médicas',
      highlights: [
        'Autorización Sanitaria autonómica y licencias específicas',
        'Instalaciones de gases medicinales y radiología plomada',
        'Acústica confidencial entre gabinetes (Rw > 50 dBA)',
        'Pavimentos antibacterianos y climatización con filtros HEPA',
      ],
      leadTime: '8 - 14 semanas',
      normative: 'Sanidad autonómica + Protección radiológica',
    },
    {
      id: 'hosteleria',
      icon: Utensils,
      category: 'hosteleria',
      title: 'Hostelería & Gastronomía',
      tagline: 'Restaurantes, cafeterías de especialidad, obradores y bares',
      highlights: [
        'Cálculo e instalación de chimeneas y extracción de humos',
        'Insonorización acústica homologada con ensayos in situ',
        'Distribución higiénico-sanitaria de cocinas según APPCC',
        'Aforos optimizados y cumplimiento de evacuación contra incendios',
      ],
      leadTime: '10 - 16 semanas',
      normative: 'Chimenea independiente a cubierta + Acústica',
    },
    {
      id: 'oficinas',
      icon: Briefcase,
      category: 'oficinas',
      title: 'Oficinas & Espacios Corporativos',
      tagline: 'Sedes que atraen talento y transmiten solidez de marca',
      highlights: [
        'Salas de reuniones acristaladas con alto aislamiento',
        'Climatización zonificada inteligente VRF',
        'Cableado estructurado y conectividad de alta velocidad',
        'Zonas office, relax y cabinas insonorizadas para llamadas',
      ],
      leadTime: '6 - 12 semanas',
      normative: 'RITE + Eficiencia energética + Ergonomía',
    },
  ];

  const filtered = activeTab === 'todos' ? specialties : specialties.filter((s) => s.category === activeTab);

  return (
    <section id="servicios" className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 z-10">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16"
        >
          <div className="max-w-2xl">
            <span className="font-condensed font-bold text-sm sm:text-base text-[#FFD000] tracking-[0.2em] uppercase">
              SECTORES DE ESPECIALIZACIÓN
            </span>
            <h2 className="font-condensed font-extrabold text-4xl sm:text-5xl md:text-6xl uppercase tracking-tight text-white mt-2 leading-[0.95] drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]">
              CADA NEGOCIO TIENE SUS NORMAS TÉCNICAS
            </h2>
            <p className="text-base sm:text-lg text-slate-200 mt-4 leading-relaxed font-normal drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
              No es lo mismo abrir una clínica dental que un restaurante o una tienda de moda. Dominamos la normativa de cada sector para garantizar tu licencia a la primera.
            </p>
          </div>

          {/* Interactive filter tabs with animated layout pills */}
          <div className="flex flex-wrap items-center gap-1.5 p-1.5 bg-[#141720]/90 border border-white/15 rounded-xl self-start md:self-auto backdrop-blur-md">
            {[
              { id: 'todos', label: 'Todos' },
              { id: 'retail', label: 'Retail' },
              { id: 'salud', label: 'Clínicas' },
              { id: 'hosteleria', label: 'Hostelería' },
              { id: 'oficinas', label: 'Oficinas' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`relative px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                  activeTab === tab.id
                    ? 'text-black font-extrabold'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="activeFilterTab"
                    className="absolute inset-0 bg-[#FFD000] rounded-lg shadow-sm"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                  />
                )}
                <span className="relative z-10">{tab.label}</span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Animated Grid Cards */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <AnimatePresence mode="popLayout">
            {filtered.map((item) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.94 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.94 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ y: -6, scale: 1.01 }}
                  className="bg-[#0E1118]/85 backdrop-blur-md border border-white/15 hover:border-[#FFD000] rounded-2xl p-7 sm:p-9 transition-colors duration-300 flex flex-col justify-between group shadow-xl hover:shadow-2xl hover:shadow-[#FFD000]/15"
                >
                  <div>
                    <div className="flex items-start justify-between gap-4 mb-5">
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: 6 }}
                        className="w-12 h-12 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-[#FFD000] group-hover:bg-[#FFD000]/15 transition-colors"
                      >
                        <Icon className="w-6 h-6" />
                      </motion.div>
                      <div className="text-right">
                        <span className="text-[11px] font-mono text-slate-300 block">Plazo estimado</span>
                        <span className="text-xs font-bold text-[#FFD000] drop-shadow-[0_0_8px_rgba(255,208,0,0.5)]">
                          {item.leadTime}
                        </span>
                      </div>
                    </div>

                    <h3 className="font-condensed font-extrabold text-2xl sm:text-3xl text-white uppercase tracking-tight mb-2">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-300 mb-6">
                      {item.tagline}
                    </p>

                    <div className="space-y-2.5 mb-8">
                      {item.highlights.map((h, i) => (
                        <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-200">
                          <CheckCircle2 className="w-4 h-4 text-[#FFD000] shrink-0 mt-0.5" />
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-5 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="text-xs text-slate-300">
                      <span className="block text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Normativa Clave</span>
                      <span className="text-white font-medium">{item.normative}</span>
                    </div>

                    <motion.button
                      whileHover={{ x: 4 }}
                      whileTap={{ scale: 0.96 }}
                      onClick={() => onOpenStudyModal(item.title)}
                      className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#FFD000] group-hover:text-yellow-300 transition-colors cursor-pointer"
                    >
                      <span>Estudiar este tipo</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </motion.button>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
};
