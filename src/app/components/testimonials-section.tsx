import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef } from "react";
import { Quote, Plus } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface TestimonialsSectionProps {
  onOpenTestimonialModal: () => void;
}

export function TestimonialsSection({ onOpenTestimonialModal }: TestimonialsSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const testimonials = [
    {
      name: "Maria Silva",
      age: 16,
      school: "Colégio Estadual Pedro II",
      image: "https://images.unsplash.com/photo-1758526214152-8b9196b74c43?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWVuYWdlJTIwZ2lybCUyMHNtaWxpbmclMjBwb3NpdGl2ZXxlbnwxfHx8fDE3NzI1NDExMDJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
      quote: "Finalmente tenho um espaço onde minha voz é ouvida. Minha sugestão sobre melhorias na praça do bairro foi aceita e está sendo implementada!"
    },
    {
      name: "Lucas Mendes",
      age: 17,
      school: "Instituto Federal de Chapecó",
      image: "https://images.unsplash.com/photo-1600180758890-6b94519a8ba6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMG1hbiUyMHN0dWRlbnQlMjBoYXBweXxlbnwxfHx8fDE3NzI1NDExMDJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
      quote: "O sistema de pontos é incrível! Me motivou a participar mais e aprender sobre como funciona a gestão pública. Já troquei meus pontos por ingressos para eventos culturais."
    },
    {
      name: "Ana Costa",
      age: 15,
      school: "Escola Municipal São José",
      image: "https://images.unsplash.com/photo-1769467701307-a6381efb5d47?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMHN0dWRlbnQlMjBwb3J0cmFpdCUyMGNvbmZpZGVudHxlbnwxfHx8fDE3NzI1NDExMDF8MA&ixlib=rb-4.1.0&q=80&w=1080",
      quote: "Votei pela primeira vez em uma proposta escolar através do app. É muito legal ver que nossa opinião realmente importa para o futuro de Chapecó."
    }
  ];

  return (
    <section id="depoimentos" ref={ref} className="py-32 px-6 relative">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent opacity-30" />
      
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-24"
        >
          <span className="text-[#D4AF37] uppercase tracking-[0.3em] text-xs mb-6 block">
            Vozes Reais
          </span>
          <h2 className="text-5xl md:text-7xl font-bold uppercase mb-8" style={{ letterSpacing: "-0.02em" }}>
            Depoimentos
          </h2>
          <p className="text-xl text-white/60 max-w-3xl mx-auto leading-relaxed mb-8" style={{ fontWeight: 300 }}>
            Conheça jovens que já estão transformando Chapecó através da plataforma
          </p>
          
          {/* Add Testimonial Button */}
          <motion.button
            onClick={onOpenTestimonialModal}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="group inline-flex items-center gap-3 px-8 py-4 border border-[#D4AF37] text-white text-sm uppercase tracking-wider hover:bg-[#D4AF37] hover:text-[#001B2E] transition-all duration-300"
          >
            <Plus className="w-5 h-5" />
            <span>Enviar Seu Depoimento</span>
          </motion.button>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="relative border border-[#D4AF37]/20 p-8 hover:border-[#D4AF37]/50 transition-all duration-500 group"
            >
              {/* Quote icon */}
              <div className="absolute -top-4 left-8 bg-[#001B2E] px-3">
                <Quote className="w-8 h-8 text-[#D4AF37]" fill="#D4AF37" />
              </div>

              {/* Decorative corners */}
              <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-[#D4AF37]" />
              <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-[#D4AF37]" />
              <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-[#D4AF37]" />
              <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-[#D4AF37]" />

              <div className="flex items-center gap-4 mb-6 mt-4">
                <div className="w-16 h-16 border border-[#D4AF37] overflow-hidden">
                  <ImageWithFallback
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-bold text-lg uppercase tracking-tight" style={{ letterSpacing: "-0.01em" }}>
                    {testimonial.name}
                  </h3>
                  <p className="text-sm text-[#D4AF37]">{testimonial.age} anos</p>
                </div>
              </div>

              <p className="text-white/70 leading-relaxed mb-6 italic" style={{ fontWeight: 300 }}>
                "{testimonial.quote}"
              </p>

              <div className="text-xs text-white/40 uppercase tracking-widest">
                {testimonial.school}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-20 grid md:grid-cols-3 gap-8"
        >
          {[
            { number: "2.5k+", label: "Jovens Cadastrados" },
            { number: "850+", label: "Sugestões Enviadas" },
            { number: "127", label: "Propostas Aprovadas" }
          ].map((stat, index) => (
            <div key={index} className="text-center p-8 border border-[#D4AF37]/20">
              <div className="text-5xl font-bold text-[#D4AF37] mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                {stat.number}
              </div>
              <p className="text-white/60 uppercase tracking-widest text-xs" style={{ fontWeight: 300 }}>
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}