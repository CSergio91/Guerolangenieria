import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Store, Stethoscope, Utensils, Briefcase, Calculator, CheckCircle2, ArrowRight, Clock, ShieldCheck, FileCheck, Layers } from 'lucide-react';

interface OpaqueServicesAndCalculatorProps {
  onOpenStudyModal: (sectorOrSummary?: string) => void;
}

export const OpaqueServicesAndCalculator: React.FC<OpaqueServicesAndCalculatorProps> = ({
  onOpenStudyModal,
}) => {
  const [activeTab, setActiveTab] = useState<'especialidades' | 'calculadora'>('especialidades');
  const [selectedSpecialty, setSelectedSpecialty] = useState<'retail' | 'salud' | 'hosteleria' | 'oficinas'>('retail');

  // Calculator State
  const [surfaceM2, setSurfaceM2] = useState<number>(120);
  const [activityType, setActivityType] = useState<string>('comercio');
  const [currentState, setCurrentState] = useState<string>('bruto');
  const [needSmokeExtraction, setNeedSmokeExtraction] = useState<boolean>(false);

  // Specialties data
  const specialties = [
    {
      id: 'retail' as const,
      icon: Store,
      title: 'Comercio & Retail',
      badge: '6 - 10 Semanas',
      tagline: 'Locales comerciales, moda, zapaterías y concept stores de alto impacto',
      highlights: [
        'Fachadas acristaladas que maximizan la atracción de viandantes',
        'Iluminación escenográfica con alto índice de reproducción cromática (CRI > 90)',
        'Circulación y ergonomía pensada para aumentar el ticket medio',
        'Cumplimiento de accesibilidad y rampas según normativa CTE SUA',
      ],
      legal: 'Licencia de Apertura inocua / comunicación ambiental previa',
    },
    {
      id: 'salud' as const,
      icon: Stethoscope,
      title: 'Clínicas & Salud',
      badge: '8 - 14 Semanas',
      tagline: 'Clínicas dentales, medicina estética, fisioterapia y centros sanitarios',
      highlights: [
        'Tramitación de Autorización Sanitaria autonómica y licencias de actividad',
        'Instalaciones de plomado en salas de rayos X y gases medicinales',
        'Aislamiento acústico entre gabinetes confidenciales (Rw > 50 dBA)',
        'Pavimentos continuos antibacterianos y filtración de aire específica',
      ],
      legal: 'Licencia clasificada + Autorización previa de la Consejería de Sanidad',
    },
    {
      id: 'hosteleria' as const,
      icon: Utensils,
      title: 'Hostelería & Gastro',
      badge: '10 - 16 Semanas',
      tagline: 'Restaurantes, cafeterías de especialidad, bares y obradores de panadería',
      highlights: [
        'Salida de humos reglamentaria a cubierta y campanas con extinción automática',
        'Aislamiento acústico integral certificado mediante ensayo in situ',
        'Circuito de higiene de alimentos y cámaras frigoríficas (normas APPCC)',
        'Cálculo de aforo, vestíbulos acústicos y evacuación de humos',
      ],
      legal: 'Actividad clasificada con proyecto técnico de alta complejidad',
    },
    {
      id: 'oficinas' as const,
      icon: Briefcase,
      title: 'Oficinas & Tech',
      badge: '6 - 12 Semanas',
      tagline: 'Sedes corporativas, agencias y espacios de trabajo para equipos de alto rendimiento',
      highlights: [
        'Salas de reuniones acristaladas insonorizadas para videollamadas',
        'Climatización zonificada independiente VRF con renovación de aire exterior',
        'Red de datos estructurada cat 6A/7 y puestos de trabajo ergonómicos',
        'Zonas office, cocina y áreas de descanso con diseño vanguardista',
      ],
      legal: 'Licencia de actividad administrativa y adecuación de telecomunicaciones',
    },
  ];

  // Quick calculator calculation
  const getEstimatedWeeks = () => {
    let base = 6;
    if (activityType === 'salud') base = 9;
    if (activityType === 'hosteleria') base = 12;
    if (activityType === 'oficinas') base = 7;
    if (surfaceM2 > 200) base += 3;
    if (surfaceM2 > 400) base += 4;
    if (currentState === 'bruto') base += 2;
    if (needSmokeExtraction) base += 2;
    return base;
  };

  const getLicenseType = () => {
    if (activityType === 'hosteleria' || activityType === 'salud') {
      return 'Licencia Ambiental Calificada con Inspección';
    }
    return 'Declaración Responsable / Comunicación Previa Inmediata';
  };

  const activeSpecData = specialties.find((s) => s.id === selectedSpecialty) || specialties[0];

  return (
    <div className="relative w-full max-w-5xl mx-auto bg-[#0B0D11] border border-white/15 rounded-3xl p-5 sm:p-8 lg:p-10 shadow-[0_0_120px_rgba(0,0,0,1)] text-left select-none">
      
      {/* HEADER SECTION (EXPLICITLY BLANKETS BACKGROUND VIDEO AT 5.0s) */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="inline-flex items-center gap-2 bg-[#FFD000]/10 border border-[#FFD000]/30 px-3 py-1 rounded-full text-xs font-mono font-bold text-[#FFD000] uppercase tracking-wider mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FFD000]" />
            <span>FASE CENTRAL · TAPA EL VÍDEO Y DETIENE EN 5.0s</span>
          </div>
          <h2 className="font-condensed font-extrabold text-3xl sm:text-4xl lg:text-5xl uppercase tracking-tight text-white leading-none">
            ESPECIALIDADES Y VIABILIDAD TÉCNICA
          </h2>
          <p className="text-sm sm:text-base text-slate-300 mt-2 max-w-2xl font-normal">
            Guerola Ingeniería resuelve toda la normativa municipal, instalaciones y obra de tu local con garantías contractuales por escrito.
          </p>
        </div>

        {/* INTERACTIVE TOGGLE PILL: ESPECIALIDADES VS CALCULADORA */}
        <div className="flex items-center bg-black/60 p-1 rounded-2xl border border-white/15 shrink-0 self-start md:self-end">
          <button
            onClick={() => setActiveTab('especialidades')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl font-condensed font-bold text-sm uppercase tracking-wider transition-all cursor-pointer ${
              activeTab === 'especialidades'
                ? 'bg-[#FFD000] text-black shadow-md'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <Store className="w-4 h-4" />
            <span>Tipologías de Espacio</span>
          </button>
          <button
            onClick={() => setActiveTab('calculadora')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl font-condensed font-bold text-sm uppercase tracking-wider transition-all cursor-pointer ${
              activeTab === 'calculadora'
                ? 'bg-[#FFD000] text-black shadow-md'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <Calculator className="w-4 h-4" />
            <span>Calculadora de Plazos</span>
          </button>
        </div>
      </div>

      {/* CONTENT BODY */}
      <div className="mt-6">
        {activeTab === 'especialidades' ? (
          <div>
            {/* SPECIALTY SELECTOR BUTTONS */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-6">
              {specialties.map((spec) => {
                const isSelected = selectedSpecialty === spec.id;
                const IconComponent = spec.icon;
                return (
                  <button
                    key={spec.id}
                    onClick={() => setSelectedSpecialty(spec.id)}
                    className={`p-3.5 rounded-2xl border transition-all text-left flex flex-col justify-between cursor-pointer ${
                      isSelected
                        ? 'bg-[#FFD000]/15 border-[#FFD000] shadow-lg shadow-yellow-500/10'
                        : 'bg-black/40 border-white/10 hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full mb-2">
                      <IconComponent
                        className={`w-5 h-5 ${isSelected ? 'text-[#FFD000]' : 'text-slate-400'}`}
                      />
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/10 text-white/80">
                        {spec.badge}
                      </span>
                    </div>
                    <span
                      className={`font-condensed font-bold text-sm uppercase tracking-wider ${
                        isSelected ? 'text-[#FFD000]' : 'text-white'
                      }`}
                    >
                      {spec.title}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* ACTIVE SPECIALTY CARD */}
            <div className="bg-black/50 border border-white/10 rounded-2xl p-5 sm:p-7">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-4 border-b border-white/10">
                <div>
                  <h3 className="font-condensed font-extrabold text-2xl sm:text-3xl uppercase text-white">
                    {activeSpecData.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 mt-0.5">
                    {activeSpecData.tagline}
                  </p>
                </div>
                <div className="flex items-center gap-2 text-xs font-mono bg-white/5 border border-white/10 px-3 py-1.5 rounded-xl text-emerald-400 shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                  <span>{activeSpecData.legal}</span>
                </div>
              </div>

              {/* HIGHLIGHTS LIST */}
              <div className="grid sm:grid-cols-2 gap-3 mb-6">
                {activeSpecData.highlights.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-[#FFD000] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              {/* ACTION FOOTER */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-white/10">
                <span className="text-xs text-slate-400 font-mono">
                  Plazo estimado: <strong className="text-white">{activeSpecData.badge}</strong> llave en mano
                </span>
                <button
                  onClick={() => onOpenStudyModal(activeSpecData.title)}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#FFD000] text-black font-condensed font-black text-sm uppercase tracking-wider px-6 py-2.5 rounded-full shadow-md hover:bg-[#ffe566] transition-all cursor-pointer"
                >
                  <span>Pedir Viabilidad para {activeSpecData.title}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* CALCULADORA TÉCNICA */
          <div className="grid md:grid-cols-12 gap-6 bg-black/50 border border-white/10 rounded-2xl p-5 sm:p-7">
            {/* CONTROLS (7 COLS) */}
            <div className="md:col-span-7 flex flex-col gap-4">
              {/* METROS CUADRADOS */}
              <div>
                <div className="flex justify-between items-center text-xs font-mono mb-2">
                  <span className="text-slate-300 uppercase tracking-wider">Superficie del local:</span>
                  <span className="text-[#FFD000] font-black text-base">{surfaceM2} m²</span>
                </div>
                <input
                  type="range"
                  min="40"
                  max="600"
                  step="10"
                  value={surfaceM2}
                  onChange={(e) => setSurfaceM2(Number(e.target.value))}
                  className="w-full accent-[#FFD000] cursor-pointer"
                />
                <div className="flex justify-between text-[10px] font-mono text-slate-400 mt-1">
                  <span>40 m²</span>
                  <span>150 m²</span>
                  <span>300 m²</span>
                  <span>600 m²</span>
                </div>
              </div>

              {/* TIPO DE ACTIVIDAD */}
              <div>
                <label className="block text-xs font-mono uppercase text-slate-300 mb-2">
                  Actividad proyectada:
                </label>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {[
                    { id: 'comercio', label: 'Comercio / Retail' },
                    { id: 'salud', label: 'Clínica / Salud' },
                    { id: 'hosteleria', label: 'Hostelería / Café' },
                    { id: 'oficinas', label: 'Oficinas / Coworking' },
                  ].map((act) => (
                    <button
                      key={act.id}
                      onClick={() => setActivityType(act.id)}
                      className={`p-2.5 rounded-xl border text-left font-semibold transition-all cursor-pointer ${
                        activityType === act.id
                          ? 'bg-[#FFD000]/15 border-[#FFD000] text-white'
                          : 'bg-black/40 border-white/10 text-slate-300'
                      }`}
                    >
                      {act.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* ESTADO INICIAL DEL LOCAL */}
              <div className="flex items-center justify-between gap-4 pt-2 border-t border-white/10">
                <span className="text-xs text-slate-300 font-mono">Estado actual:</span>
                <div className="flex gap-2">
                  {[
                    { id: 'bruto', label: 'En bruto (ladrillo)' },
                    { id: 'reformar', label: 'A reformar anterior' },
                  ].map((st) => (
                    <button
                      key={st.id}
                      onClick={() => setCurrentState(st.id)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold border cursor-pointer ${
                        currentState === st.id
                          ? 'bg-white/20 border-white text-white'
                          : 'bg-black/30 border-white/10 text-slate-400'
                      }`}
                    >
                      {st.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* RESULTS PANEL (5 COLS) */}
            <div className="md:col-span-5 bg-black/70 border border-white/15 rounded-2xl p-5 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#FFD000]">
                  ESTIMACIÓN TÉCNICA INMEDIATA
                </span>
                
                <div className="mt-3">
                  <div className="text-3xl font-condensed font-black text-white flex items-baseline gap-2">
                    <span>{getEstimatedWeeks()} - {getEstimatedWeeks() + 3}</span>
                    <span className="text-sm font-normal text-[#FFD000] font-sans">semanas de obra</span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1">
                    Plazo cerrado contractualmente con indemnización por retraso.
                  </p>
                </div>

                <div className="mt-4 pt-4 border-t border-white/10 flex flex-col gap-2 text-xs">
                  <div className="flex items-start gap-2 text-slate-200">
                    <FileCheck className="w-4 h-4 text-[#FFD000] shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-white">Vía Municipal:</strong>
                      <span className="text-[11px] text-slate-300">{getLicenseType()}</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-2 text-slate-200">
                    <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-white">Garantía Guerola:</strong>
                      <span className="text-[11px] text-slate-300">Presupuesto cerrado sin sobrecostes.</span>
                    </div>
                  </div>
                </div>
              </div>

              <button
                onClick={() =>
                  onOpenStudyModal(
                    `Calculadora: ${surfaceM2}m², actividad ${activityType}, plazo estimado ${getEstimatedWeeks()} sem.`
                  )
                }
                className="w-full mt-5 bg-[#FFD000] text-black font-condensed font-black text-sm uppercase tracking-wider py-3 rounded-full flex items-center justify-center gap-2 hover:bg-[#ffe566] transition-all cursor-pointer shadow-lg"
              >
                <span>Validar Viabilidad de Mi Local</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

    </div>
  );
};
