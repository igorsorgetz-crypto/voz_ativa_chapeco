import { motion } from "motion/react";
import { Instagram, Facebook, Twitter, Youtube } from "lucide-react";

export function Footer() {
  const socialLinks = [
    { 
      icon: Instagram, 
      label: "Instagram", 
      href: "https://www.instagram.com/voz_ativa_chapeco/" 
    },
    { 
      icon: Facebook, 
      label: "Facebook", 
      href: "https://www.facebook.com/vozativachapeco" 
    },
    { 
      icon: Twitter, 
      label: "Twitter", 
      href: "https://twitter.com/vozativachapeco" 
    },
    { 
      icon: Youtube, 
      label: "Youtube", 
      href: "https://www.youtube.com/@vozativachapeco" 
    }
  ];

  return (
    <footer className="py-20 px-6 relative">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent opacity-30" />
      
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-6xl font-bold uppercase mb-8" style={{ letterSpacing: "-0.02em" }}>
              Seja a Mudança
              <br />
              <span className="text-[#D4AF37]">em Chapecó</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex justify-center gap-8 mb-12"
          >
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 border border-[#D4AF37] flex items-center justify-center hover:bg-[#D4AF37] transition-all duration-300 group"
                aria-label={social.label}
              >
                <social.icon className="w-5 h-5 text-[#D4AF37] group-hover:text-[#001B2E] transition-colors duration-300" strokeWidth={1.5} />
              </a>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="border-t border-[#D4AF37]/20 pt-12"
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-white/50">
            <p style={{ fontWeight: 300 }}>
              © 2026 Voz Ativa Chapecó. Todos os direitos reservados.
            </p>
            <div className="flex gap-8">
              <a href="#" className="hover:text-[#D4AF37] transition-colors duration-300">
                Privacidade
              </a>
              <a href="#" className="hover:text-[#D4AF37] transition-colors duration-300">
                Termos de Uso
              </a>
              <a href="#" className="hover:text-[#D4AF37] transition-colors duration-300">
                Contato
              </a>
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-xs text-white/40 uppercase tracking-widest" style={{ fontWeight: 300 }}>
              ODS 16 • Paz, Justiça e Instituições Eficazes
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}