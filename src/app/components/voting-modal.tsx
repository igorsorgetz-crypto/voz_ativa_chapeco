import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, ThumbsUp, ThumbsDown, Users, Clock, TrendingUp } from "lucide-react";
import { usePoints } from "../context/points-context";

interface VotingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Proposal {
  id: number;
  title: string;
  category: string;
  description: string;
  author: string;
  votes: {
    favor: number;
    against: number;
  };
  timeLeft: string;
  hasVoted?: boolean;
  userVote?: "favor" | "against";
}

export function VotingModal({ isOpen, onClose }: VotingModalProps) {
  const { addPoints } = usePoints();
  const [selectedProposal, setSelectedProposal] = useState<number | null>(null);
  const [proposals, setProposals] = useState<Proposal[]>([
    {
      id: 1,
      title: "Implementar Wi-Fi Gratuito em Todas as Praças",
      category: "Tecnologia",
      description: "Proposta para instalação de internet gratuita nas principais praças da cidade, permitindo acesso digital para todos.",
      author: "Escola Municipal São José",
      votes: { favor: 284, against: 42 },
      timeLeft: "2 dias"
    },
    {
      id: 2,
      title: "Criar Espaços de Convivência para Jovens",
      category: "Infraestrutura",
      description: "Construção de áreas de lazer com quadras, skate park e espaços para atividades culturais.",
      author: "Colégio Estadual Pedro II",
      votes: { favor: 456, against: 78 },
      timeLeft: "5 dias"
    },
    {
      id: 3,
      title: "Aulas de Programação nas Escolas Públicas",
      category: "Educação",
      description: "Incluir programação e robótica no currículo escolar a partir do ensino fundamental.",
      author: "Instituto Federal de Chapecó",
      votes: { favor: 523, against: 124 },
      timeLeft: "1 dia"
    },
    {
      id: 4,
      title: "Transporte Escolar Noturno",
      category: "Mobilidade",
      description: "Estender o horário do transporte escolar para estudantes de cursos noturnos.",
      author: "Escola Técnica de Chapecó",
      votes: { favor: 389, against: 56 },
      timeLeft: "3 dias"
    }
  ]);

  const handleVote = (proposalId: number, voteType: "favor" | "against") => {
    setProposals(proposals.map(p => {
      if (p.id === proposalId) {
        const updatedVotes = { ...p.votes };
        const isFirstVote = !p.hasVoted;
        
        // Remove voto anterior se existir
        if (p.userVote) {
          updatedVotes[p.userVote]--;
        }
        
        // Adiciona novo voto
        updatedVotes[voteType]++;
        
        // Adiciona pontos apenas no primeiro voto
        if (isFirstVote) {
          addPoints(30); // Adiciona 30 pontos por votar
        }
        
        return {
          ...p,
          votes: updatedVotes,
          hasVoted: true,
          userVote: voteType
        };
      }
      return p;
    }));
  };

  const getVotePercentage = (proposal: Proposal) => {
    const total = proposal.votes.favor + proposal.votes.against;
    const favorPercent = total > 0 ? (proposal.votes.favor / total) * 100 : 0;
    return Math.round(favorPercent);
  };

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
            className="relative w-full max-w-5xl bg-[#001B2E] border border-[#D4AF37] p-8 md:p-12 max-h-[90vh] overflow-y-auto"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 w-10 h-10 border border-[#D4AF37] flex items-center justify-center hover:bg-[#D4AF37] transition-all duration-300 group z-10"
              aria-label="Fechar"
            >
              <X className="w-5 h-5 text-[#D4AF37] group-hover:text-[#001B2E]" />
            </button>

            {/* Header */}
            <div className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 border border-[#D4AF37] flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-[#D4AF37]" />
                </div>
                <span className="text-[#D4AF37] uppercase tracking-[0.3em] text-xs">
                  Votação Escolar
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold uppercase mb-4" style={{ letterSpacing: "-0.02em" }}>
                Propostas em
                <br />
                <span className="text-[#D4AF37]">Votação</span>
              </h2>
              <p className="text-white/60 leading-relaxed" style={{ fontWeight: 300 }}>
                Vote nas propostas que você considera mais importantes para Chapecó
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-10 pb-10 border-b border-[#D4AF37]/20">
              <div className="text-center p-4 border border-[#D4AF37]/20">
                <div className="text-3xl font-bold text-[#D4AF37] mb-1">{proposals.length}</div>
                <div className="text-xs uppercase tracking-widest text-white/60">Propostas Ativas</div>
              </div>
              <div className="text-center p-4 border border-[#D4AF37]/20">
                <div className="text-3xl font-bold text-[#D4AF37] mb-1">1.2k</div>
                <div className="text-xs uppercase tracking-widest text-white/60">Votos Totais</div>
              </div>
              <div className="text-center p-4 border border-[#D4AF37]/20">
                <div className="text-3xl font-bold text-[#D4AF37] mb-1">
                  {proposals.filter(p => p.hasVoted).length}
                </div>
                <div className="text-xs uppercase tracking-widest text-white/60">Seus Votos</div>
              </div>
            </div>

            {/* Proposals List */}
            <div className="space-y-6">
              {proposals.map((proposal, index) => {
                const percentage = getVotePercentage(proposal);
                const isExpanded = selectedProposal === proposal.id;

                return (
                  <motion.div
                    key={proposal.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="border border-[#D4AF37]/30 p-6 hover:border-[#D4AF37]/60 transition-all duration-300"
                  >
                    {/* Proposal Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="px-3 py-1 border border-[#D4AF37] text-[#D4AF37] text-xs uppercase tracking-wider">
                            {proposal.category}
                          </span>
                          <div className="flex items-center gap-2 text-white/40 text-sm">
                            <Clock className="w-4 h-4" />
                            <span>{proposal.timeLeft} restantes</span>
                          </div>
                        </div>
                        <h3 
                          className="text-xl font-bold uppercase mb-2 cursor-pointer hover:text-[#D4AF37] transition-colors"
                          onClick={() => setSelectedProposal(isExpanded ? null : proposal.id)}
                          style={{ letterSpacing: "-0.01em" }}
                        >
                          {proposal.title}
                        </h3>
                        <div className="flex items-center gap-2 text-white/40 text-sm">
                          <Users className="w-4 h-4" />
                          <span>{proposal.author}</span>
                        </div>
                      </div>
                    </div>

                    {/* Description (expandable) */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <p className="text-white/60 leading-relaxed mb-4 pb-4 border-b border-[#D4AF37]/20" style={{ fontWeight: 300 }}>
                            {proposal.description}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Vote Progress Bar */}
                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-white/60">A Favor ({proposal.votes.favor})</span>
                        <span className="text-[#D4AF37] font-bold">{percentage}%</span>
                        <span className="text-white/60">Contra ({proposal.votes.against})</span>
                      </div>
                      <div className="relative h-2 bg-white/10">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${percentage}%` }}
                          transition={{ duration: 1, ease: "easeOut" }}
                          className="absolute left-0 top-0 h-full bg-[#D4AF37]"
                        />
                      </div>
                    </div>

                    {/* Vote Buttons */}
                    <div className="flex gap-4">
                      <button
                        onClick={() => handleVote(proposal.id, "favor")}
                        disabled={proposal.hasVoted}
                        className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 border transition-all duration-300 ${
                          proposal.userVote === "favor"
                            ? "bg-[#D4AF37] border-[#D4AF37] text-[#001B2E]"
                            : "border-[#D4AF37] text-white hover:bg-[#D4AF37] hover:text-[#001B2E]"
                        } ${proposal.hasVoted && proposal.userVote !== "favor" ? "opacity-50 cursor-not-allowed" : ""}`}
                      >
                        <ThumbsUp className="w-4 h-4" />
                        <span className="text-sm uppercase tracking-wider">
                          {proposal.userVote === "favor" ? "Votado" : "A Favor"}
                        </span>
                      </button>
                      <button
                        onClick={() => handleVote(proposal.id, "against")}
                        disabled={proposal.hasVoted}
                        className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 border transition-all duration-300 ${
                          proposal.userVote === "against"
                            ? "bg-white/20 border-white/40 text-white"
                            : "border-white/20 text-white/60 hover:bg-white/10 hover:border-white/40"
                        } ${proposal.hasVoted && proposal.userVote !== "against" ? "opacity-50 cursor-not-allowed" : ""}`}
                      >
                        <ThumbsDown className="w-4 h-4" />
                        <span className="text-sm uppercase tracking-wider">
                          {proposal.userVote === "against" ? "Votado" : "Contra"}
                        </span>
                      </button>
                    </div>

                    {proposal.hasVoted && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-4 text-center text-sm text-[#D4AF37] flex items-center justify-center gap-2"
                      >
                        <span>✓ Você ganhou +30 pontos por votar</span>
                      </motion.div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}