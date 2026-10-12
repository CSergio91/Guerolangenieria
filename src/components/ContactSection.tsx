import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Phone, Mail, MapPin, Send, MessageCircle, Clock, CheckCircle2, ArrowRight } from 'lucide-react';

interface ContactSectionProps {
  prefilledType?: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ prefilledType }) => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    location: '',
    sqm: '',
    type: prefilledType || 'Retail / Comercio',
    notes: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate instantaneous lead registration
    setSubmitted(true);
  };

  return (
    <section id="contacto" className="relative py-4 sm:py-8 px-4 sm:px-6 lg:px-8 z-10 w-full">
      <div className="max-w-7xl mx-auto">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          
          {/* Left Column: Direct Contact & Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 space-y-8"
          >
            <div>
              <span className="font-condensed font-bold text-sm sm:text-base text-[#FFD000] tracking-[0.2em] uppercase">
                HABLEMOS DE TU PROYECTO
              </span>
              <h2 className="font-condensed font-extrabold text-4xl sm:text-5xl md:text-6xl uppercase tracking-tight text-white mt-2 leading-[0.95] drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]">
                ¿PREPARADO PARA DAR EL SALTO?
              </h2>
              <p className="text-base sm:text-lg text-slate-200 mt-4 leading-relaxed font-normal drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
                Cuéntanos en qué fase te encuentras. Te asesoramos sin compromiso sobre la viabilidad de tu local, costes estimados y normativa aplicable.
              </p>
            </div>

            {/* Direct Contact Cards */}
            <div className="space-y-4">
              <a
                href="tel:+34912345678"
                className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-[#FFD000]/60 transition-colors group"
              >
                <div className="w-12 h-12 rounded-lg bg-[#FFD000]/10 flex items-center justify-center text-[#FFD000] group-hover:bg-[#FFD000] group-hover:text-black transition-colors shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-slate-400 block">Llámanos directamente</span>
                  <span className="text-base font-bold text-white group-hover:text-[#FFD000] transition-colors">+34 91 234 56 78</span>
                </div>
              </a>

              <a
                href="https://wa.me/34600000000?text=Hola,%20me%20gustar%C3%ADa%20solicitar%20un%20estudio%20para%20un%20local%20comercial"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-4 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 hover:border-emerald-400/50 transition-colors group"
              >
                <div className="w-12 h-12 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400 group-hover:bg-emerald-500 group-hover:text-black transition-colors shrink-0">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-emerald-300 block">WhatsApp de Ingeniería</span>
                  <span className="text-base font-bold text-white group-hover:text-emerald-300 transition-colors">Respuesta técnica en &lt; 2h</span>
                </div>
              </a>

              <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10">
                <div className="w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center text-slate-300 shrink-0">
                  <Clock className="w-5 h-5 text-[#FFD000]" />
                </div>
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-slate-400 block">Horario de Estudio</span>
                  <span className="text-sm font-medium text-slate-200">Lunes a Viernes: 08:30 - 19:30</span>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#141721] border border-white/10 text-xs text-slate-400">
              <span className="font-bold text-white block mb-1">Visita técnica in situ gratuita</span>
              Nos desplazamos a tu local antes de que firmes el contrato de arrendamiento para verificar normativas y evitar sorpresas desagradables.
            </div>

          </motion.div>

          {/* Right Column: Lead Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 bg-[#0E1118]/85 backdrop-blur-md border border-white/15 rounded-3xl p-7 sm:p-10 shadow-2xl relative"
          >
            
            {submitted ? (
              <div className="py-12 text-center space-y-4 animate-in fade-in">
                <div className="w-16 h-16 rounded-full bg-[#FFD000]/10 border-2 border-[#FFD000] text-[#FFD000] mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-condensed font-extrabold text-3xl text-white uppercase tracking-tight">
                  SOLICITUD REGISTRADA CON ÉXITO
                </h3>
                <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                  Uno de nuestros ingenieros especialistas revisará los datos de tu espacio y se pondrá en contacto contigo en las próximas 24 horas laborables.
                </p>
                <div className="pt-4">
                  <button
                    onClick={() => setSubmitted(false)}
                    className="text-xs uppercase tracking-wider font-bold text-[#FFD000] hover:underline cursor-pointer"
                  >
                    Enviar otra consulta
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="border-b border-white/10 pb-4 mb-5">
                  <h3 className="font-condensed font-bold text-2xl text-white uppercase tracking-tight">
                    ESTUDIAR MI PROYECTO
                  </h3>
                  <p className="text-xs text-slate-400">
                    Completa este breve formulario y recibe un primer estudio de viabilidad sin coste.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                      Nombre completo *
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="Ej. Carlos Martínez"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-[#FFD000] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                      Teléfono de contacto *
                    </label>
                    <input
                      required
                      type="tel"
                      placeholder="Ej. 612 345 678"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-[#FFD000] transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                      Email profesional *
                    </label>
                    <input
                      required
                      type="email"
                      placeholder="ejemplo@negocio.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-[#FFD000] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                      Ubicación del local
                    </label>
                    <input
                      type="text"
                      placeholder="Ciudad / Distrito"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-[#FFD000] transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                      Tipo de negocio
                    </label>
                    <select
                      value={formData.type}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                      className="w-full px-4 py-3 bg-[#171a24] border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-[#FFD000] transition-colors"
                    >
                      <option value="Retail / Comercio">Retail / Comercio</option>
                      <option value="Clínica / Sanitario">Clínica / Sanitario</option>
                      <option value="Restauración / Hostelería">Restauración / Hostelería</option>
                      <option value="Oficinas / Corporativo">Oficinas / Corporativo</option>
                      <option value="Gimnasio / Wellness">Gimnasio / Wellness</option>
                      <option value="Otro tipo de actividad">Otro tipo de actividad</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                      Superficie aprox. (m²)
                    </label>
                    <input
                      type="text"
                      placeholder="Ej. 120 m²"
                      value={formData.sqm}
                      onChange={(e) => setFormData({ ...formData, sqm: e.target.value })}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-[#FFD000] transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                    Detalles del local / ¿Tienes ya el espacio reservado?
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Cuéntanos brevemente si es obra nueva, local antiguo, si tienes dudas con la salida de humos o fechas límite..."
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-[#FFD000] transition-colors resize-none"
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.02, boxShadow: "0 0 25px rgba(255,208,0,0.35)" }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full flex items-center justify-center gap-3 bg-[#FFD000] hover:bg-yellow-400 text-black font-condensed font-black uppercase text-lg sm:text-xl py-4 rounded-full transition-all duration-200 shadow-xl shadow-yellow-500/10 group cursor-pointer"
                >
                  <span>SOLICITAR ESTUDIO DE MI PROYECTO</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform stroke-[2.5]" />
                </motion.button>

                <p className="text-[11px] text-center text-slate-400">
                  Tus datos están protegidos. Respuesta garantizada en menos de 24 horas laborables.
                </p>
              </form>
            )}

          </motion.div>

        </div>

      </div>
    </section>
  );
};
