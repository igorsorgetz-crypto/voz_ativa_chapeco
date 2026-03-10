import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef } from "react";
import { Trophy, Star, Award, Gift } from "lucide-react";

interface GamificationSectionProps {
  onOpenRewardsStore?: () => void;
}

export function GamificationSection({ onOpenRewardsStore }: GamificationSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const rewards = [
    {
      icon: Star,
      points: "50 pts",
      title: "Sugestão Enviada",
      description: "Ganhe pontos a cada sugestão enviada"
    },
    {
      icon: Award,
      points: "30 pts",
      title: "Voto Realizado",
      description: "Participe das votações escolares"
    },
    {
      icon: Trophy,
      points: "40 pts",
      title: "Depoimento Enviado",
      description: "Compartilhe sua experiência na plataforma"
    },
    {
      icon: Gift,
      points: "Loja",
      title: "Recompensas",
      description: "Troque pontos por benefícios reais"
    }
  ];

  return (
    <section id="gamificacao" ref={ref} className="py-32 px-6 relative bg-[#000D17]">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent opacity-30" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent opacity-30" />
      
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-24"
        >
          <span className="text-[#D4AF37] uppercase tracking-[0.3em] text-xs mb-6 block">
            Engajamento
          </span>
          <h2 className="text-5xl md:text-7xl font-bold uppercase mb-8" style={{ letterSpacing: "-0.02em" }}>
            Gamificação
          </h2>
          <p className="text-xl text-white/60 max-w-3xl mx-auto leading-relaxed" style={{ fontWeight: 300 }}>
            Participe, ganhe pontos e seja recompensado por construir uma Chapecó melhor
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {rewards.map((reward, index) => {
            const isRewardsCard = reward.title === "Recompensas";
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                onClick={isRewardsCard ? onOpenRewardsStore : undefined}
                className={`relative text-center p-8 border border-[#D4AF37]/20 hover:border-[#D4AF37] transition-all duration-500 group hover:bg-[#D4AF37]/5 ${isRewardsCard ? 'cursor-pointer' : ''}`}
              >
                {/* Decorative corners */}
                <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-[#D4AF37]" />
                <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-[#D4AF37]" />
                <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-[#D4AF37]" />
                <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-[#D4AF37]" />

                <div className="mb-6 inline-flex items-center justify-center w-16 h-16 border border-[#D4AF37] transition-all duration-300 group-hover:bg-[#D4AF37]">
                  <reward.icon className="w-8 h-8 text-[#D4AF37] transition-colors duration-300 group-hover:text-[#001B2E]" strokeWidth={1} />
                </div>
                
                <div className="text-3xl font-bold text-[#D4AF37] mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  {reward.points}
                </div>
                
                <h3 className="text-xl uppercase mb-3 tracking-tight" style={{ letterSpacing: "-0.01em" }}>
                  {reward.title}
                </h3>
                <p className="text-sm text-white/60 leading-relaxed" style={{ fontWeight: 300 }}>
                  {reward.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-20 text-center"
        >
          <div className="inline-block p-12 border border-[#D4AF37]/30">
            <p className="text-2xl text-white/80 mb-4" style={{ fontWeight: 300 }}>
              Quanto mais você participa,
            </p>
            <p className="text-4xl font-bold text-[#D4AF37] uppercase" style={{ fontFamily: "'Space Grotesk', sans-serif", letterSpacing: "-0.01em" }}>
              Mais impacto você gera
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}