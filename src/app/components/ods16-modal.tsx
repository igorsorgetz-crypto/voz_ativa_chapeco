import { motion, AnimatePresence } from "motion/react";
import { X, Target, CheckCircle, Globe } from "lucide-react";

interface ODS16ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ODS16Modal({ isOpen, onClose }: ODS16ModalProps) {
  const targets = [
    {
      number: "16.6",
      title: "Instituições Eficazes e Transparentes",
      description: "Desenvolver instituições eficazes, responsáveis e transparentes em todos os níveis"
    },
    {
      number: "16.7",
      title: "Tomada de Decisão Participativa",
      description: "Garantir a tomada de decisão responsiva, inclusiva, participativa e representativa em todos os níveis"
    },
    {
      number: "16.10",
      title: "Acesso à Informação",
      description: "Assegurar o acesso público à informação e proteger as liberdades fundamentais"
    },
    {
      number: "16.B",
      title: "Leis e Políticas Não Discriminatórias",
      description: "Promover e fazer cumprir leis e políticas não discriminatórias para o desenvolvimento sustentável"
    }
  ];

  const impacts = [
    "850+ sugestões de jovens enviadas à gestão pública",
    "127 propostas aprovadas e implementadas",
    "2.5k+ jovens participando ativamente",
    "85% de aprovação nas decisões votadas pela comunidade"
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", duration: 0.5 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-4xl bg-[#001B2E] border border-[#D4AF37] p-8 md:p-12 max-h-[90vh] overflow-y-auto"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 w-10 h-10 border border-[#D4AF37] flex items-center justify-center hover:bg-[#D4AF37] transition-all duration-300 group"
              aria-label="Fechar"
            >
              <X className="w-5 h-5 text-[#D4AF37] group-hover:text-[#001B2E]" />
            </button>

            {/* Header */}
            <div className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 border border-[#D4AF37] flex items-center justify-center">
                  <Globe className="w-6 h-6 text-[#D4AF37]" />
                </div>
                <span className="text-[#D4AF37] uppercase tracking-[0.3em] text-xs">
                  Objetivos de Desenvolvimento Sustentável
                </span>
              </div>
              <h2 className="text-4xl md:text-6xl font-bold uppercase mb-4" style={{ letterSpacing: "-0.02em" }}>
                ODS 16
              </h2>
              <h3 className="text-2xl md:text-3xl font-bold uppercase mb-6 text-[#D4AF37]" style={{ letterSpacing: "-0.01em" }}>
                Paz, Justiça e Instituições Eficazes
              </h3>
              <p className="text-white/60 leading-relaxed text-lg" style={{ fontWeight: 300 }}>
                Promover sociedades pacíficas e inclusivas para o desenvolvimento sustentável, 
                proporcionar o acesso à justiça para todos e construir instituições eficazes, 
                responsáveis e inclusivas em todos os níveis.
              </p>
            </div>

            {/* ODS Targets */}
            <div className="mb-10 pb-10 border-b border-[#D4AF37]/20">
              <h4 className="text-xl uppercase mb-6 tracking-tight flex items-center gap-2">
                <Target className="w-5 h-5 text-[#D4AF37]" />
                Metas Prioritárias
              </h4>
              <div className="grid md:grid-cols-2 gap-6">
                {targets.map((target, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="border border-[#D4AF37]/30 p-6 hover:border-[#D4AF37]/60 transition-all duration-300"
                  >
                    <div className="flex items-start gap-3 mb-3">
                      <div className="px-3 py-1 border border-[#D4AF37] text-[#D4AF37] text-sm font-bold">
                        {target.number}
                      </div>
                    </div>
                    <h5 className="font-bold uppercase mb-2 text-lg" style={{ letterSpacing: "-0.01em" }}>
                      {target.title}
                    </h5>
                    <p className="text-white/60 text-sm leading-relaxed" style={{ fontWeight: 300 }}>
                      {target.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* How Voz Ativa Contributes */}
            <div className="mb-10 pb-10 border-b border-[#D4AF37]/20">
              <h4 className="text-xl uppercase mb-6 tracking-tight">
                Como o Voz Ativa Chapecó Contribui
              </h4>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center p-6 border border-[#D4AF37]/20">
                  <div className="w-16 h-16 border border-[#D4AF37] mx-auto mb-4 flex items-center justify-center">
                    <CheckCircle className="w-8 h-8 text-[#D4AF37]" />
                  </div>
                  <h5 className="font-bold uppercase mb-2" style={{ letterSpacing: "-0.01em" }}>
                    Transparência
                  </h5>
                  <p className="text-white/60 text-sm" style={{ fontWeight: 300 }}>
                    Acesso direto às informações sobre gestão pública
                  </p>
                </div>
                <div className="text-center p-6 border border-[#D4AF37]/20">
                  <div className="w-16 h-16 border border-[#D4AF37] mx-auto mb-4 flex items-center justify-center">
                    <CheckCircle className="w-8 h-8 text-[#D4AF37]" />
                  </div>
                  <h5 className="font-bold uppercase mb-2" style={{ letterSpacing: "-0.01em" }}>
                    Participação
                  </h5>
                  <p className="text-white/60 text-sm" style={{ fontWeight: 300 }}>
                    Canal direto para voz jovem nas decisões públicas
                  </p>
                </div>
                <div className="text-center p-6 border border-[#D4AF37]/20">
                  <div className="w-16 h-16 border border-[#D4AF37] mx-auto mb-4 flex items-center justify-center">
                    <CheckCircle className="w-8 h-8 text-[#D4AF37]" />
                  </div>
                  <h5 className="font-bold uppercase mb-2" style={{ letterSpacing: "-0.01em" }}>
                    Educação Cívica
                  </h5>
                  <p className="text-white/60 text-sm" style={{ fontWeight: 300 }}>
                    Formação de cidadãos conscientes e ativos
                  </p>
                </div>
              </div>
            </div>

            {/* Impact Stats */}
            <div>
              <h4 className="text-xl uppercase mb-6 tracking-tight">
                Impacto em Chapecó
              </h4>
              <div className="space-y-4">
                {impacts.map((impact, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    className="flex items-center gap-4 p-4 border border-[#D4AF37]/20"
                  >
                    <div className="w-2 h-2 bg-[#D4AF37] flex-shrink-0" />
                    <p className="text-white/80" style={{ fontWeight: 300 }}>
                      {impact}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="mt-10 text-center"
            >
              <a
                href="https://sdgs.un.org/goals/goal16"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 border border-[#D4AF37] text-white text-sm uppercase tracking-wider hover:bg-[#D4AF37] hover:text-[#001B2E] transition-all duration-300"
              >
                <Globe className="w-4 h-4" />
                <span>Saiba Mais sobre ODS 16</span>
              </a>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
