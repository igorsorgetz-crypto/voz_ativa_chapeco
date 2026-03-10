import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef } from "react";
import { MessageSquare, Vote, GraduationCap, ArrowRight } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface SolutionSectionProps {
  onOpenSuggestionModal: () => void;
  onOpenVotingModal: () => void;
}

export function SolutionSection({ onOpenSuggestionModal, onOpenVotingModal }: SolutionSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const features = [
    {
      icon: MessageSquare,
      title: "Canal de Sugestões",
      description: "Envie suas ideias diretamente para a gestão pública. Acompanhe o status e veja o impacto real.",
      action: "Enviar Sugestão",
      onClick: onOpenSuggestionModal
    },
    {
      icon: Vote,
      title: "Sistema de Votação Escolar",
      description: "Vote nas propostas que mais importam para você. Democracia participativa na palma da mão.",
      action: "Ver Votações",
      onClick: onOpenVotingModal
    },
    {
      icon: GraduationCap,
      title: "Área Educativa",
      description: "Aprenda sobre cidadania, direitos e como o poder público funciona de forma simples e visual.",
      action: "Em Breve",
      onClick: undefined
    }
  ];

  return (
    <section id="solucao" ref={ref} className="py-32 px-6 relative">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent opacity-30" />
      
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-24"
        >
          <span className="text-[#D4AF37] uppercase tracking-[0.3em] text-xs mb-6 block">
            A Resposta
          </span>
          <h2 className="text-5xl md:text-7xl font-bold uppercase mb-8" style={{ letterSpacing: "-0.02em" }}>
            A Solução
          </h2>
          <p className="text-xl text-white/60 max-w-3xl mx-auto leading-relaxed" style={{ fontWeight: 300 }}>
            Um aplicativo pensado para jovens, simples, direto e eficaz
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-20 items-center mb-20">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8 }}
            className="order-2 lg:order-1"
          >
            <div className="space-y-12">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  transition={{ duration: 0.6, delay: 0.2 + index * 0.15 }}
                  className="flex flex-col gap-6 group"
                >
                  <div className="flex gap-6">
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 border border-[#D4AF37] flex items-center justify-center transition-all duration-300 group-hover:bg-[#D4AF37]">
                        <feature.icon className="w-8 h-8 text-[#D4AF37] transition-colors duration-300 group-hover:text-[#001B2E]" strokeWidth={1} />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl uppercase mb-3 tracking-tight" style={{ letterSpacing: "-0.01em" }}>
                        {feature.title}
                      </h3>
                      <p className="text-white/60 leading-relaxed mb-4" style={{ fontWeight: 300 }}>
                        {feature.description}
                      </p>
                      {feature.onClick ? (
                        <button
                          onClick={feature.onClick}
                          className="group/btn inline-flex items-center gap-2 px-6 py-3 border border-[#D4AF37] text-white text-sm uppercase tracking-wider hover:bg-[#D4AF37] hover:text-[#001B2E] transition-all duration-300"
                        >
                          <span>{feature.action}</span>
                          <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                        </button>
                      ) : (
                        <div className="inline-flex items-center gap-2 px-6 py-3 border border-white/20 text-white/40 text-sm uppercase tracking-wider cursor-not-allowed">
                          <span>{feature.action}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8 }}
            className="order-1 lg:order-2"
          >
            <div className="relative">
              {/* Decorative frame */}
              <div className="absolute -inset-4 border border-[#D4AF37]/30" />
              <div className="absolute -inset-8 border border-[#D4AF37]/10" />
              
              <div className="relative aspect-[3/4] overflow-hidden">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1694878981905-b742a32f8121?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBhcHAlMjBpbnRlcmZhY2UlMjBtb2NrdXB8ZW58MXx8fHwxNzcyNTA4ODA3fDA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Voz Ativa Chapecó - App Mockup"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}