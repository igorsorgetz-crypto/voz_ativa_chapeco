import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Send, MapPin, Lightbulb } from "lucide-react";
import { usePoints } from "../context/points-context";

interface SuggestionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SuggestionModal({ isOpen, onClose }: SuggestionModalProps) {
  const { addPoints } = usePoints();
  const [formData, setFormData] = useState({
    category: "",
    title: "",
    description: "",
    location: "",
    urgency: "normal"
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const categories = [
    "Educação",
    "Saúde",
    "Mobilidade",
    "Meio Ambiente",
    "Cultura e Lazer",
    "Segurança",
    "Infraestrutura",
    "Outro"
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Salvar sugestão no localStorage
    const newSuggestion = {
      ...formData,
      id: Date.now(),
      date: new Date().toISOString(),
      status: "Em Análise"
    };
    
    const existingSuggestions = JSON.parse(localStorage.getItem("userSuggestions") || "[]");
    localStorage.setItem("userSuggestions", JSON.stringify([...existingSuggestions, newSuggestion]));
    
    setIsSubmitted(true);
    addPoints(50); // Adiciona 50 pontos por enviar sugestão
    setTimeout(() => {
      setIsSubmitted(false);
      onClose();
      setFormData({ category: "", title: "", description: "", location: "", urgency: "normal" });
    }, 2500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
            className="relative w-full max-w-3xl bg-[#001B2E] border border-[#D4AF37] p-8 md:p-12 max-h-[90vh] overflow-y-auto"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 w-10 h-10 border border-[#D4AF37] flex items-center justify-center hover:bg-[#D4AF37] transition-all duration-300 group"
              aria-label="Fechar"
            >
              <X className="w-5 h-5 text-[#D4AF37] group-hover:text-[#001B2E]" />
            </button>

            {/* Content */}
            {!isSubmitted ? (
              <>
                <div className="mb-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 border border-[#D4AF37] flex items-center justify-center">
                      <Lightbulb className="w-6 h-6 text-[#D4AF37]" />
                    </div>
                    <span className="text-[#D4AF37] uppercase tracking-[0.3em] text-xs">
                      Enviar Sugestão
                    </span>
                  </div>
                  <h2 className="text-4xl md:text-5xl font-bold uppercase mb-4" style={{ letterSpacing: "-0.02em" }}>
                    Sua Ideia
                    <br />
                    <span className="text-[#D4AF37]">Transforma Chapecó</span>
                  </h2>
                  <p className="text-white/60 leading-relaxed" style={{ fontWeight: 300 }}>
                    Compartilhe sua sugestão e contribua para melhorar nossa cidade
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="category" className="block text-sm uppercase tracking-widest mb-3 text-white/80">
                        Categoria
                      </label>
                      <select
                        id="category"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        required
                        className="w-full bg-transparent border border-[#D4AF37]/30 px-6 py-4 text-white focus:border-[#D4AF37] focus:outline-none transition-colors duration-300"
                      >
                        <option value="" className="bg-[#001B2E]">Selecione uma categoria</option>
                        {categories.map((cat, index) => (
                          <option key={index} value={cat} className="bg-[#001B2E]">
                            {cat}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label htmlFor="urgency" className="block text-sm uppercase tracking-widest mb-3 text-white/80">
                        Urgência
                      </label>
                      <select
                        id="urgency"
                        name="urgency"
                        value={formData.urgency}
                        onChange={handleChange}
                        required
                        className="w-full bg-transparent border border-[#D4AF37]/30 px-6 py-4 text-white focus:border-[#D4AF37] focus:outline-none transition-colors duration-300"
                      >
                        <option value="low" className="bg-[#001B2E]">Baixa</option>
                        <option value="normal" className="bg-[#001B2E]">Normal</option>
                        <option value="high" className="bg-[#001B2E]">Alta</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="title" className="block text-sm uppercase tracking-widest mb-3 text-white/80">
                      Título da Sugestão
                    </label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      required
                      maxLength={80}
                      className="w-full bg-transparent border border-[#D4AF37]/30 px-6 py-4 text-white placeholder:text-white/30 focus:border-[#D4AF37] focus:outline-none transition-colors duration-300"
                      placeholder="Ex: Criar ciclovias na Avenida Getúlio Vargas"
                    />
                    <div className="text-xs text-white/40 mt-2">{formData.title.length}/80 caracteres</div>
                  </div>

                  <div>
                    <label htmlFor="location" className="block text-sm uppercase tracking-widest mb-3 text-white/80 flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      Localização
                    </label>
                    <input
                      type="text"
                      id="location"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      required
                      className="w-full bg-transparent border border-[#D4AF37]/30 px-6 py-4 text-white placeholder:text-white/30 focus:border-[#D4AF37] focus:outline-none transition-colors duration-300"
                      placeholder="Ex: Bairro Centro, Rua XYZ"
                    />
                  </div>

                  <div>
                    <label htmlFor="description" className="block text-sm uppercase tracking-widest mb-3 text-white/80">
                      Descrição Detalhada
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      required
                      rows={6}
                      maxLength={500}
                      className="w-full bg-transparent border border-[#D4AF37]/30 px-6 py-4 text-white placeholder:text-white/30 focus:border-[#D4AF37] focus:outline-none transition-colors duration-300 resize-none"
                      placeholder="Descreva sua sugestão com o máximo de detalhes possível..."
                    />
                    <div className="text-xs text-white/40 mt-2">{formData.description.length}/500 caracteres</div>
                  </div>

                  <button
                    type="submit"
                    className="group relative w-full px-12 py-5 border border-[#D4AF37] text-white uppercase tracking-widest text-sm overflow-hidden transition-all duration-300 hover:bg-[#D4AF37] hover:text-[#001B2E] flex items-center justify-center gap-3"
                  >
                    <span className="relative z-10">Enviar Sugestão</span>
                    <Send className="w-4 h-4 relative z-10" />
                    <div className="absolute inset-0 bg-[#D4AF37] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
                  </button>
                </form>
              </>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <div className="w-20 h-20 border-2 border-[#D4AF37] rounded-full flex items-center justify-center mx-auto mb-6">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <Lightbulb className="w-10 h-10 text-[#D4AF37]" />
                  </motion.div>
                </div>
                <h3 className="text-3xl font-bold uppercase mb-4 text-[#D4AF37]" style={{ letterSpacing: "-0.02em" }}>
                  Sugestão Enviada!
                </h3>
                <p className="text-white/60 text-lg mb-4" style={{ fontWeight: 300 }}>
                  Sua ideia foi recebida e está sendo analisada
                </p>
                <div className="inline-flex items-center gap-2 px-6 py-3 border border-[#D4AF37]/30 text-sm">
                  <span className="text-white/60">Você ganhou</span>
                  <span className="text-[#D4AF37] font-bold text-xl">+50 pontos</span>
                </div>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
