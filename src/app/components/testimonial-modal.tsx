import { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Upload, Camera, CheckCircle } from "lucide-react";
import { usePoints } from "../context/points-context";

interface TestimonialModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function TestimonialModal({ isOpen, onClose }: TestimonialModalProps) {
  const { addPoints } = usePoints();
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    school: "",
    testimonial: ""
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    addPoints(40); // Adiciona 40 pontos por enviar depoimento
    setTimeout(() => {
      setIsSubmitted(false);
      onClose();
      setFormData({ name: "", age: "", school: "", testimonial: "" });
      setImagePreview(null);
    }, 2500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
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
                      <Camera className="w-6 h-6 text-[#D4AF37]" />
                    </div>
                    <span className="text-[#D4AF37] uppercase tracking-[0.3em] text-xs">
                      Compartilhe Sua Experiência
                    </span>
                  </div>
                  <h2 className="text-4xl md:text-5xl font-bold uppercase mb-4" style={{ letterSpacing: "-0.02em" }}>
                    Envie Seu
                    <br />
                    <span className="text-[#D4AF37]">Depoimento</span>
                  </h2>
                  <p className="text-white/60 leading-relaxed" style={{ fontWeight: 300 }}>
                    Conte como o Voz Ativa Chapecó impactou sua vida
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Photo Upload */}
                  <div>
                    <label className="block text-sm uppercase tracking-widest mb-3 text-white/80">
                      Sua Foto
                    </label>
                    <div className="flex gap-4 items-start">
                      <div 
                        onClick={triggerFileInput}
                        className="w-32 h-32 border-2 border-dashed border-[#D4AF37]/50 flex flex-col items-center justify-center cursor-pointer hover:border-[#D4AF37] hover:bg-[#D4AF37]/5 transition-all duration-300 group"
                      >
                        {imagePreview ? (
                          <img 
                            src={imagePreview} 
                            alt="Preview" 
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <>
                            <Upload className="w-8 h-8 text-[#D4AF37] mb-2 group-hover:scale-110 transition-transform" />
                            <span className="text-xs text-white/60 text-center px-2">
                              Clique para adicionar
                            </span>
                          </>
                        )}
                      </div>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                      {imagePreview && (
                        <button
                          type="button"
                          onClick={() => setImagePreview(null)}
                          className="px-4 py-2 border border-white/20 text-white/60 text-sm hover:border-[#D4AF37] hover:text-white transition-all duration-300"
                        >
                          Remover Foto
                        </button>
                      )}
                    </div>
                    <p className="text-xs text-white/40 mt-2">
                      Recomendamos uma foto de rosto clara (JPG, PNG - Máx. 5MB)
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm uppercase tracking-widest mb-3 text-white/80">
                        Seu Nome
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full bg-transparent border border-[#D4AF37]/30 px-6 py-4 text-white placeholder:text-white/30 focus:border-[#D4AF37] focus:outline-none transition-colors duration-300"
                        placeholder="Ex: Maria Silva"
                      />
                    </div>

                    <div>
                      <label htmlFor="age" className="block text-sm uppercase tracking-widest mb-3 text-white/80">
                        Idade
                      </label>
                      <input
                        type="number"
                        id="age"
                        name="age"
                        value={formData.age}
                        onChange={handleChange}
                        required
                        min="12"
                        max="18"
                        className="w-full bg-transparent border border-[#D4AF37]/30 px-6 py-4 text-white placeholder:text-white/30 focus:border-[#D4AF37] focus:outline-none transition-colors duration-300"
                        placeholder="Ex: 16"
                      />
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
                      placeholder="Ex: Colégio Estadual Pedro II"
                    />
                  </div>

                  <div>
                    <label htmlFor="testimonial" className="block text-sm uppercase tracking-widest mb-3 text-white/80">
                      Seu Depoimento
                    </label>
                    <textarea
                      id="testimonial"
                      name="testimonial"
                      value={formData.testimonial}
                      onChange={handleChange}
                      required
                      rows={6}
                      maxLength={400}
                      className="w-full bg-transparent border border-[#D4AF37]/30 px-6 py-4 text-white placeholder:text-white/30 focus:border-[#D4AF37] focus:outline-none transition-colors duration-300 resize-none"
                      placeholder="Compartilhe como o Voz Ativa impactou sua vida, suas experiências com a plataforma e como você ajudou a transformar Chapecó..."
                    />
                    <div className="text-xs text-white/40 mt-2">{formData.testimonial.length}/400 caracteres</div>
                  </div>

                  <button
                    type="submit"
                    className="group relative w-full px-12 py-5 border border-[#D4AF37] text-white uppercase tracking-widest text-sm overflow-hidden transition-all duration-300 hover:bg-[#D4AF37] hover:text-[#001B2E] flex items-center justify-center gap-3"
                  >
                    <span className="relative z-10">Enviar Depoimento</span>
                    <Camera className="w-4 h-4 relative z-10" />
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
                    <CheckCircle className="w-10 h-10 text-[#D4AF37]" />
                  </motion.div>
                </div>
                <h3 className="text-3xl font-bold uppercase mb-4 text-[#D4AF37]" style={{ letterSpacing: "-0.02em" }}>
                  Depoimento Enviado!
                </h3>
                <p className="text-white/60 text-lg mb-4" style={{ fontWeight: 300 }}>
                  Obrigado por compartilhar sua história
                </p>
                <div className="inline-flex items-center gap-2 px-6 py-3 border border-[#D4AF37]/30 text-sm">
                  <span className="text-white/60">Seu depoimento será analisado e publicado em breve</span>
                </div>
                <p className="text-white/40 text-sm mt-6" style={{ fontWeight: 300 }}>
                  Você ganhou +40 pontos por contribuir com a comunidade!
                </p>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
