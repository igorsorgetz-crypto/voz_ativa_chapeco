import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Send } from "lucide-react";

interface PlatformModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PlatformModal({ isOpen, onClose }: PlatformModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: "",
    school: "",
    interest: ""
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      onClose();
      setFormData({ name: "", email: "", age: "", school: "", interest: "" });
    }, 2000);
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
            className="relative w-full max-w-2xl bg-[#001B2E] border border-[#D4AF37] p-8 md:p-12 max-h-[90vh] overflow-y-auto"
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
                  <span className="text-[#D4AF37] uppercase tracking-[0.3em] text-xs mb-4 block">
                    Participe
                  </span>
                  <h2 className="text-4xl md:text-5xl font-bold uppercase mb-4" style={{ letterSpacing: "-0.02em" }}>
                    Conheça a
                    <br />
                    <span className="text-[#D4AF37]">Plataforma</span>
                  </h2>
                  <p className="text-white/60 leading-relaxed" style={{ fontWeight: 300 }}>
                    Preencha o formulário abaixo e seja um dos primeiros a ter acesso ao Voz Ativa Chapecó
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm uppercase tracking-widest mb-3 text-white/80">
                      Nome Completo
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full bg-transparent border border-[#D4AF37]/30 px-6 py-4 text-white placeholder:text-white/30 focus:border-[#D4AF37] focus:outline-none transition-colors duration-300"
                      placeholder="Seu nome"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="email" className="block text-sm uppercase tracking-widest mb-3 text-white/80">
                        E-mail
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full bg-transparent border border-[#D4AF37]/30 px-6 py-4 text-white placeholder:text-white/30 focus:border-[#D4AF37] focus:outline-none transition-colors duration-300"
                        placeholder="seu@email.com"
                      />
                    </div>

                    <div>
                      <label htmlFor="age" className="block text-sm uppercase tracking-widest mb-3 text-white/80">
                        Idade
                      </label>
                      <select
                        id="age"
                        name="age"
                        value={formData.age}
                        onChange={handleChange}
                        required
                        className="w-full bg-transparent border border-[#D4AF37]/30 px-6 py-4 text-white focus:border-[#D4AF37] focus:outline-none transition-colors duration-300"
                      >
                        <option value="" className="bg-[#001B2E]">Selecione</option>
                        <option value="12-14" className="bg-[#001B2E]">12-14 anos</option>
                        <option value="15-16" className="bg-[#001B2E]">15-16 anos</option>
                        <option value="17-18" className="bg-[#001B2E]">17-18 anos</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="school" className="block text-sm uppercase tracking-widest mb-3 text-white/80">
                      Escola
                    </label>
                    <input
                      type="text"
                      id="school"
                      name="school"
                      value={formData.school}
                      onChange={handleChange}
                      required
                      className="w-full bg-transparent border border-[#D4AF37]/30 px-6 py-4 text-white placeholder:text-white/30 focus:border-[#D4AF37] focus:outline-none transition-colors duration-300"
                      placeholder="Nome da sua escola"
                    />
                  </div>

                  <div>
                    <label htmlFor="interest" className="block text-sm uppercase tracking-widest mb-3 text-white/80">
                      O que mais te interessa?
                    </label>
                    <textarea
                      id="interest"
                      name="interest"
                      value={formData.interest}
                      onChange={handleChange}
                      rows={4}
                      className="w-full bg-transparent border border-[#D4AF37]/30 px-6 py-4 text-white placeholder:text-white/30 focus:border-[#D4AF37] focus:outline-none transition-colors duration-300 resize-none"
                      placeholder="Conte-nos o que você espera da plataforma..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="group relative w-full px-12 py-5 border border-[#D4AF37] text-white uppercase tracking-widest text-sm overflow-hidden transition-all duration-300 hover:bg-[#D4AF37] hover:text-[#001B2E] flex items-center justify-center gap-3"
                  >
                    <span className="relative z-10">Enviar Inscrição</span>
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
                    <Send className="w-10 h-10 text-[#D4AF37]" />
                  </motion.div>
                </div>
                <h3 className="text-3xl font-bold uppercase mb-4 text-[#D4AF37]" style={{ letterSpacing: "-0.02em" }}>
                  Inscrição Enviada!
                </h3>
                <p className="text-white/60 text-lg" style={{ fontWeight: 300 }}>
                  Em breve você receberá mais informações sobre a plataforma
                </p>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
