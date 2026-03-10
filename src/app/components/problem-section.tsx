import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef } from "react";
import { TrendingDown, UserX, MessageSquareOff } from "lucide-react";

export function ProblemSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const problems = [
    {
      icon: TrendingDown,
      stat: "78%",
      title: "Baixo Engajamento",
      description: "dos jovens sentem que suas opiniões não são consideradas nas decisões públicas."
    },
    {
      icon: UserX,
      stat: "62%",
      title: "Desconexão",
      description: "não sabem como ou onde podem participar de discussões sobre políticas locais."
    },
    {
      icon: MessageSquareOff,
      stat: "85%",
      title: "Falta de Canais",
      description: "nunca utilizaram um canal oficial para sugerir melhorias em sua cidade."
    }
  ];

  return (
    <section id="problema" ref={ref} className="py-32 px-6 relative bg-[#000D17]">
      {/* Decorative lines */}
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
            O Desafio
          </span>
          <h2 className="text-5xl md:text-7xl font-bold uppercase mb-8" style={{ letterSpacing: "-0.02em" }}>
            O Problema
          </h2>
          <p className="text-xl text-white/60 max-w-3xl mx-auto leading-relaxed" style={{ fontWeight: 300 }}>
            Os jovens querem participar, mas os canais tradicionais não atendem suas necessidades
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 md:gap-12">
          {problems.map((problem, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="relative p-10 border border-[#D4AF37]/20 hover:border-[#D4AF37]/50 transition-all duration-500 group"
            >
              {/* Corner accents */}
              <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-[#D4AF37]" />
              <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-[#D4AF37]" />
              <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-[#D4AF37]" />
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-[#D4AF37]" />

              <div className="mb-6">
                <problem.icon className="w-12 h-12 text-[#D4AF37] mb-6" strokeWidth={1} />
                <div className="text-6xl font-bold text-[#D4AF37] mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  {problem.stat}
                </div>
              </div>
              
              <h3 className="text-2xl uppercase mb-4 tracking-tight" style={{ letterSpacing: "-0.01em" }}>
                {problem.title}
              </h3>
              <p className="text-white/60 leading-relaxed" style={{ fontWeight: 300 }}>
                {problem.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}