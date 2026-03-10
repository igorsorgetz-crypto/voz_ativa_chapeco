import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, Coins } from "lucide-react";
import { usePoints } from "../context/points-context";

interface NavigationProps {
  onOpenRewardsStore?: () => void;
}

export function Navigation({ onOpenRewardsStore }: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { points } = usePoints();

  const navItems = [
    { label: "Início", href: "#hero" },
    { label: "Manifesto", href: "#manifesto" },
    { label: "O Problema", href: "#problema" },
    { label: "Solução", href: "#solucao" },
    { label: "Gamificação", href: "#gamificacao" },
    { label: "Depoimentos", href: "#depoimentos" }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-[#001B2E]/95 backdrop-blur-md border-b border-[#D4AF37]/20"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-6 flex justify-between items-center">
          {/* Logo */}
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("#hero");
            }}
            className="text-xl font-bold uppercase tracking-tight"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Voz Ativa <span className="text-[#D4AF37]">Chapecó</span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navItems.map((item, index) => (
              <a
                key={index}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(item.href);
                }}
                className="text-sm uppercase tracking-widest text-white/70 hover:text-[#D4AF37] transition-colors duration-300 relative group"
                style={{ fontWeight: 300 }}
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#D4AF37] transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
            
            {/* Points Button */}
            <button
              onClick={onOpenRewardsStore}
              className="flex items-center gap-2 px-4 py-2 bg-[#D4AF37]/10 border border-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#001B2E] transition-all duration-300 group"
            >
              <Coins className="w-4 h-4 text-[#D4AF37] group-hover:text-[#001B2E] transition-colors duration-300" />
              <span className="font-bold text-[#D4AF37] group-hover:text-[#001B2E] transition-colors duration-300">
                {points}
              </span>
              <span className="text-xs uppercase tracking-widest text-white/70 group-hover:text-[#001B2E] transition-colors duration-300" style={{ fontWeight: 300 }}>
                Pontos
              </span>
            </button>
          </div>

          {/* Mobile Points and Menu */}
          <div className="lg:hidden flex items-center gap-3">
            {/* Mobile Points Button */}
            <button
              onClick={onOpenRewardsStore}
              className="flex items-center gap-1.5 px-3 py-2 bg-[#D4AF37]/10 border border-[#D4AF37]"
            >
              <Coins className="w-4 h-4 text-[#D4AF37]" />
              <span className="font-bold text-[#D4AF37] text-sm">{points}</span>
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="w-10 h-10 border border-[#D4AF37] flex items-center justify-center hover:bg-[#D4AF37] transition-all duration-300 group"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5 text-[#D4AF37] group-hover:text-[#001B2E]" />
              ) : (
                <Menu className="w-5 h-5 text-[#D4AF37] group-hover:text-[#001B2E]" />
              )}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-[#001B2E] lg:hidden"
          >
            <div className="flex flex-col items-center justify-center h-full gap-8">
              {navItems.map((item, index) => (
                <motion.a
                  key={index}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(item.href);
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="text-2xl uppercase tracking-widest text-white hover:text-[#D4AF37] transition-colors duration-300"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  {item.label}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
