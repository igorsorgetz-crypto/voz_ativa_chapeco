import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef, useState, useEffect } from "react";
import { Scale, Users, Lightbulb, ArrowRight, BookOpen, X, Check, Shield, Target, Clock, MapPin, AlertCircle } from "lucide-react";

interface ManifestoSectionProps {
  onOpenODS16Modal: () => void;
}

interface UserSuggestion {
  id: number;
  category: string;
  title: string;
  description: string;
  location: string;
  urgency: string;
  date: string;
  status: string;
}

export function ManifestoSection({ onOpenODS16Modal }: ManifestoSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [selectedPillar, setSelectedPillar] = useState<number | null>(null);
  const [userSuggestions, setUserSuggestions] = useState<UserSuggestion[]>([]);

  useEffect(() => {
    // Carregar sugestões do localStorage
    const loadSuggestions = () => {
      const suggestions = JSON.parse(localStorage.getItem("userSuggestions") || "[]");
      setUserSuggestions(suggestions);
    };
    
    loadSuggestions();
    
    // Atualizar quando o modal abrir
    if (selectedPillar === 2) {
      loadSuggestions();
    }
  }, [selectedPillar]);

  const scrollToSolution = () => {
    const solutionSection = document.getElementById("solucao");
    if (solutionSection) {
      solutionSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };
  
  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "high": return "text-red-400";
      case "normal": return "text-yellow-400";
      case "low": return "text-green-400";
      default: return "text-white/60";
    }
  };
  
  const getUrgencyLabel = (urgency: string) => {
    switch (urgency) {
      case "high": return "Alta";
      case "normal": return "Normal";
      case "low": return "Baixa";
      default: return urgency;
    }
  };

  const pillarsContent = [
    {
      icon: Scale,
      title: "Instituições Fortes",
      description: "Construindo pontes entre jovens e o poder público para uma gestão mais transparente e eficaz.",
      detailedContent: {
        subtitle: "Fortalecendo a Democracia Local",
        points: [
          "Governança transparente e accountability real",
          "Acesso facilitado à informação pública",
          "Combate à corrupção através da participação cidadã",
          "Instituições responsivas às necessidades da juventude"
        ],
        impact: "Com instituições fortes, você tem poder real para fiscalizar, questionar e melhorar a gestão pública de Chapecó.",
        actionIcon: Shield
      }
    },
    {
      icon: Users,
      title: "Participação Ativa",
      description: "Cada jovem tem direito de ser ouvido. Criamos os canais para que isso aconteça de verdade.",
      detailedContent: {
        subtitle: "Sua Voz Transforma a Cidade",
        points: [
          "Canais diretos de comunicação com gestores públicos",
          "Votação democrática em prioridades escolares",
          "Sistema de pontos que recompensa seu engajamento",
          "Comunidade ativa de jovens transformadores"
        ],
        impact: "Sua participação não é simbólica - ela gera mudanças reais nas políticas públicas que afetam seu dia a dia.",
        actionIcon: Target
      }
    },
    {
      icon: Lightbulb,
      title: "Decisões Transparentes",
      description: "Acompanhe como suas sugestões se tornam políticas públicas que transformam nossa cidade.",
      detailedContent: {
        subtitle: "Transparência de Ponta a Ponta",
        points: [
          "Rastreamento completo de suas sugestões",
          "Feedback em tempo real sobre implementações",
          "Relatórios públicos de impacto das iniciativas",
          "Histórico de decisões e suas justificativas"
        ],
        impact: "Veja exatamente como sua ideia saiu do papel e virou realidade, com total transparência em cada etapa.",
        actionIcon: Check
      }
    }
  ];

  return (
    <section id="manifesto" ref={ref} className="py-32 px-6 relative">
      {/* Top decorative line */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent opacity-30" />
      
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="text-[#D4AF37] uppercase tracking-[0.3em] text-xs mb-6 block">
            Manifesto
          </span>
          <h2 className="text-5xl md:text-7xl font-bold uppercase mb-8" style={{ letterSpacing: "-0.02em" }}>
            ODS 16 em Ação
          </h2>
          <p className="text-xl text-white/60 max-w-3xl mx-auto leading-relaxed" style={{ fontWeight: 300 }}>
            Transparência, justiça e participação não são apenas palavras.
            São o alicerce de uma Chapecó mais justa, onde cada voz jovem
            pode transformar nossa cidade.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-12 md:gap-16 mb-16">
          {pillarsContent.map((item, index) => (
            <motion.button
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              onClick={() => setSelectedPillar(index)}
              className="text-center group cursor-pointer hover:scale-105 transition-transform duration-300"
            >
              <div className="mb-8 inline-flex items-center justify-center w-20 h-20 border border-[#D4AF37] transition-all duration-300 group-hover:bg-[#D4AF37]">
                <item.icon className="w-10 h-10 text-[#D4AF37] transition-colors duration-300 group-hover:text-[#001B2E]" strokeWidth={1} />
              </div>
              <h3 className="text-2xl uppercase mb-4 tracking-tight" style={{ letterSpacing: "-0.01em" }}>
                {item.title}
              </h3>
              <p className="text-white/60 leading-relaxed" style={{ fontWeight: 300 }}>
                {item.description}
              </p>
              <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-[#D4AF37] text-xs uppercase tracking-widest inline-flex items-center gap-2">
                  Saiba Mais <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </motion.button>
          ))}
        </div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-6 justify-center items-center"
        >
          <button
            onClick={onOpenODS16Modal}
            className="group inline-flex items-center gap-3 px-8 py-4 border border-[#D4AF37] text-white text-sm uppercase tracking-wider hover:bg-[#D4AF37] hover:text-[#001B2E] transition-all duration-300"
          >
            <BookOpen className="w-5 h-5" />
            <span>Entenda o ODS 16</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
          
          <button
            onClick={scrollToSolution}
            className="group relative px-8 py-4 border border-[#D4AF37] text-white uppercase tracking-widest text-sm overflow-hidden transition-all duration-300 hover:bg-[#D4AF37] hover:text-[#001B2E] flex items-center gap-3"
          >
            <span className="relative z-10">Participe Agora</span>
            <ArrowRight className="w-4 h-4 relative z-10 transition-transform duration-300 group-hover:translate-x-1" />
            <div className="absolute inset-0 bg-[#D4AF37] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
          </button>
        </motion.div>
      </div>

      {/* Pillar Detail Modal */}
      {selectedPillar !== null && (
        <div
          className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-6"
          onClick={() => setSelectedPillar(null)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-[#001B2E] border border-[#D4AF37] max-w-2xl w-full max-h-[90vh] overflow-y-auto relative"
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedPillar(null)}
              className="absolute top-6 right-6 w-10 h-10 border border-[#D4AF37] flex items-center justify-center hover:bg-[#D4AF37] group transition-all duration-300 z-10"
            >
              <X className="w-5 h-5 text-[#D4AF37] group-hover:text-[#001B2E]" />
            </button>

            <div className="p-8 md:p-12">
              {/* Icon */}
              <div className="mb-6 inline-flex items-center justify-center w-20 h-20 border border-[#D4AF37] bg-[#D4AF37]">
                {(() => {
                  const Icon = pillarsContent[selectedPillar].icon;
                  return <Icon className="w-10 h-10 text-[#001B2E]" strokeWidth={1} />;
                })()}
              </div>

              {/* Title */}
              <h2
                className="text-4xl md:text-5xl uppercase mb-4 tracking-tight"
                style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, letterSpacing: "-0.02em" }}
              >
                {pillarsContent[selectedPillar].title}
              </h2>

              {/* Subtitle */}
              <p className="text-[#D4AF37] text-lg uppercase tracking-wider mb-8" style={{ fontWeight: 300 }}>
                {pillarsContent[selectedPillar].detailedContent.subtitle}
              </p>

              {/* Divider */}
              <div className="w-20 h-px bg-[#D4AF37] mb-8" />

              {/* Conteúdo específico para Decisões Transparentes */}
              {selectedPillar === 2 ? (
                <>
                  {userSuggestions.length > 0 ? (
                    <div className="space-y-6 mb-10">
                      <h3 className="text-[#D4AF37] uppercase text-sm tracking-widest mb-4" style={{ fontWeight: 700 }}>
                        Suas Sugestões ({userSuggestions.length})
                      </h3>
                      <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
                        {userSuggestions.map((suggestion, idx) => (
                          <motion.div
                            key={suggestion.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="border border-[#D4AF37]/30 bg-[#001B2E] p-5 hover:border-[#D4AF37] transition-all duration-300"
                          >
                            <div className="flex items-start justify-between gap-4 mb-3">
                              <div className="flex-1">
                                <h4 className="text-lg font-semibold text-white mb-2">{suggestion.title}</h4>
                                <div className="flex flex-wrap items-center gap-3 text-xs">
                                  <span className="px-2 py-1 bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/30">
                                    {suggestion.category}
                                  </span>
                                  <span className={`flex items-center gap-1 ${getUrgencyColor(suggestion.urgency)}`}>
                                    <AlertCircle className="w-3 h-3" />
                                    {getUrgencyLabel(suggestion.urgency)}
                                  </span>
                                  <span className="flex items-center gap-1 text-white/50">
                                    <Clock className="w-3 h-3" />
                                    {new Date(suggestion.date).toLocaleDateString('pt-BR')}
                                  </span>
                                </div>
                              </div>
                              <div className="px-3 py-1 bg-[#D4AF37]/10 border border-[#D4AF37]/50 text-[#D4AF37] text-xs whitespace-nowrap">
                                {suggestion.status}
                              </div>
                            </div>
                            
                            <p className="text-white/60 text-sm mb-3 leading-relaxed" style={{ fontWeight: 300 }}>
                              {suggestion.description}
                            </p>
                            
                            <div className="flex items-center gap-2 text-xs text-white/50">
                              <MapPin className="w-3 h-3" />
                              {suggestion.location}
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="border border-[#D4AF37]/20 bg-[#D4AF37]/5 p-8 text-center mb-10">
                      <Lightbulb className="w-12 h-12 text-[#D4AF37]/50 mx-auto mb-4" />
                      <h3 className="text-[#D4AF37] uppercase text-sm tracking-widest mb-3" style={{ fontWeight: 700 }}>
                        Nenhuma Sugestão Ainda
                      </h3>
                      <p className="text-white/60 text-sm leading-relaxed" style={{ fontWeight: 300 }}>
                        Envie sua primeira sugestão e acompanhe sua jornada de transformação em tempo real.
                      </p>
                    </div>
                  )}
                  
                  {/* Impact Box for Decisions */}
                  <div className="border border-[#D4AF37]/30 bg-[#D4AF37]/5 p-6">
                    <h3
                      className="text-[#D4AF37] uppercase text-sm tracking-widest mb-3"
                      style={{ fontWeight: 700 }}
                    >
                      Como Funciona a Transparência
                    </h3>
                    <p className="text-white/70 leading-relaxed" style={{ fontWeight: 300 }}>
                      Cada sugestão que você envia é registrada e rastreável. Você pode acompanhar o status, receber atualizações e ver quando sua ideia é implementada pela gestão pública.
                    </p>
                  </div>
                </>
              ) : (
                <>
                  {/* Points - Para outros pilares */}
                  <div className="space-y-4 mb-10">
                    {pillarsContent[selectedPillar].detailedContent.points.map((point, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="flex items-start gap-4"
                      >
                        <div className="mt-1 flex-shrink-0">
                          {(() => {
                            const ActionIcon = pillarsContent[selectedPillar].detailedContent.actionIcon;
                            return <ActionIcon className="w-5 h-5 text-[#D4AF37]" strokeWidth={1.5} />;
                          })()}
                        </div>
                        <p className="text-white/80 leading-relaxed" style={{ fontWeight: 300 }}>
                          {point}
                        </p>
                      </motion.div>
                    ))}
                  </div>

                  {/* Impact Box */}
                  <div className="border border-[#D4AF37]/30 bg-[#D4AF37]/5 p-6">
                    <h3
                      className="text-[#D4AF37] uppercase text-sm tracking-widest mb-3"
                      style={{ fontWeight: 700 }}
                    >
                      Impacto Real
                    </h3>
                    <p className="text-white/70 leading-relaxed" style={{ fontWeight: 300 }}>
                      {pillarsContent[selectedPillar].detailedContent.impact}
                    </p>
                  </div>
                </>
              )}

              {/* CTA */}
              <div className="mt-8">
                <button
                  onClick={() => {
                    setSelectedPillar(null);
                    scrollToSolution();
                  }}
                  className="w-full px-8 py-4 bg-[#D4AF37] text-[#001B2E] uppercase tracking-widest text-sm hover:bg-[#D4AF37]/90 transition-all duration-300 flex items-center justify-center gap-3 group"
                  style={{ fontWeight: 700 }}
                >
                  <span>Comece a Participar</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </section>
  );
}