import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { ArrowLeft, Coins, ShoppingCart, Check, X } from "lucide-react";
import { usePoints } from "../context/points-context";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface Product {
  id: number;
  name: string;
  description: string;
  points: number;
  image: string;
  category: string;
}

interface RewardsStorePageProps {
  onBack: () => void;
}

export function RewardsStorePage({ onBack }: RewardsStorePageProps) {
  const { points, spendPoints } = usePoints();
  const [selectedCategory, setSelectedCategory] = useState<string>("Todos");
  const [purchaseStatus, setPurchaseStatus] = useState<{
    show: boolean;
    success: boolean;
    product?: string;
  }>({ show: false, success: false });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const products: Product[] = [
    {
      id: 1,
      name: "Fones Premium",
      description: "Fones de ouvido wireless com cancelamento de ruído",
      points: 5000,
      image: "https://images.unsplash.com/photo-1765279327575-bc9e453514dd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcmVtaXVtJTIwaGVhZHBob25lcyUyMHRlY2hub2xvZ3l8ZW58MXx8fHwxNzcyNjAwMjMwfDA&ixlib=rb-4.1.0&q=80&w=1080",
      category: "Eletrônicos",
    },
    {
      id: 2,
      name: "Smartphone",
      description: "Smartphone de última geração com câmera profissional",
      points: 20000,
      image: "https://images.unsplash.com/photo-1605188378873-3ddf764e6fff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFydHBob25lJTIwbW9kZXJuJTIwdGVjaG5vbG9neXxlbnwxfHx8fDE3NzI1ODQ0MzN8MA&ixlib=rb-4.1.0&q=80&w=1080",
      category: "Eletrônicos",
    },
    {
      id: 3,
      name: "Smartwatch",
      description: "Relógio inteligente com monitor de saúde",
      points: 8000,
      image: "https://images.unsplash.com/photo-1665860455418-017fa50d29bc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFydHdhdGNoJTIwZml0bmVzcyUyMHRyYWNrZXJ8ZW58MXx8fHwxNzcyNjc3NTkxfDA&ixlib=rb-4.1.0&q=80&w=1080",
      category: "Eletrônicos",
    },
    {
      id: 4,
      name: "Earbuds Pro",
      description: "Fones intra-auriculares wireless de alta qualidade",
      points: 3500,
      image: "https://images.unsplash.com/photo-1695634463848-4db4e47703a4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aXJlbGVzcyUyMGVhcmJ1ZHMlMjB0ZWNofGVufDF8fHx8MTc3MjYxMjMxNXww&ixlib=rb-4.1.0&q=80&w=1080",
      category: "Eletrônicos",
    },
    {
      id: 5,
      name: "Speaker Bluetooth",
      description: "Caixa de som portátil com som premium",
      points: 3000,
      image: "https://images.unsplash.com/photo-1675319245480-215961c129f1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3J0YWJsZSUyMHNwZWFrZXIlMjBibHVldG9vdGh8ZW58MXx8fHwxNzcyNjkwMTk1fDA&ixlib=rb-4.1.0&q=80&w=1080",
      category: "Eletrônicos",
    },
    {
      id: 6,
      name: "Tablet Pro",
      description: "Tablet profissional para estudos e criatividade",
      points: 15000,
      image: "https://images.unsplash.com/photo-1769603891182-0316b20ce2aa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0YWJsZXQlMjBkZXZpY2UlMjB0ZWNobm9sb2d5fGVufDF8fHx8MTc3MjY5NjQwMXww&ixlib=rb-4.1.0&q=80&w=1080",
      category: "Eletrônicos",
    },
    {
      id: 7,
      name: "Mouse Gamer",
      description: "Mouse e teclado gamer para alto desempenho",
      points: 4000,
      image: "https://images.unsplash.com/photo-1629429408719-a64b3ae484e5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1pbmclMjBtb3VzZSUyMGtleWJvYXJkfGVufDF8fHx8MTc3MjY5MDkyN3ww&ixlib=rb-4.1.0&q=80&w=1080",
      category: "Eletrônicos",
    },
    {
      id: 8,
      name: "Mochila Premium",
      description: "Mochila moderna com compartimento para laptop",
      points: 2500,
      image: "https://images.unsplash.com/photo-1765098399232-62423a733ae9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWNrcGFjayUyMG1vZGVybiUyMHVyYmFufGVufDF8fHx8MTc3MjcwNTk1Nnww&ixlib=rb-4.1.0&q=80&w=1080",
      category: "Acessórios",
    },
    {
      id: 9,
      name: "Vale-Compras R$ 50",
      description: "Cartão presente para lojas parceiras",
      points: 1000,
      image: "https://images.unsplash.com/photo-1637910116483-7efcc9480847?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnaWZ0JTIwY2FyZCUyMHZvdWNoZXJ8ZW58MXx8fHwxNzcyNjkwNzU4fDA&ixlib=rb-4.1.0&q=80&w=1080",
      category: "Vale-Compras",
    },
    {
      id: 10,
      name: "Vale-Compras R$ 100",
      description: "Cartão presente para lojas parceiras",
      points: 2000,
      image: "https://images.unsplash.com/photo-1637910116483-7efcc9480847?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnaWZ0JTIwY2FyZCUyMHZvdWNoZXJ8ZW58MXx8fHwxNzcyNjkwNzU4fDA&ixlib=rb-4.1.0&q=80&w=1080",
      category: "Vale-Compras",
    },
  ];

  const categories = ["Todos", "Eletrônicos", "Acessórios", "Vale-Compras"];

  const filteredProducts =
    selectedCategory === "Todos"
      ? products
      : products.filter((p) => p.category === selectedCategory);

  const handlePurchase = (product: Product) => {
    const success = spendPoints(product.points);
    setPurchaseStatus({
      show: true,
      success,
      product: product.name,
    });

    setTimeout(() => {
      setPurchaseStatus({ show: false, success: false });
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-[#001B2E] text-white">
      {/* Header */}
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="sticky top-0 z-40 bg-[#001B2E]/95 backdrop-blur-md border-b border-[#D4AF37]/20"
      >
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-white/70 hover:text-[#D4AF37] transition-colors duration-300 group"
            >
              <ArrowLeft className="w-5 h-5 transition-transform duration-300 group-hover:-translate-x-1" />
              <span className="uppercase tracking-widest text-sm" style={{ fontWeight: 300 }}>
                Voltar
              </span>
            </button>

            <h1
              className="text-2xl uppercase tracking-tight"
              style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700 }}
            >
              Loja de <span className="text-[#D4AF37]">Recompensas</span>
            </h1>

            <div className="flex items-center gap-2 px-4 py-2 bg-[#D4AF37]/10 border border-[#D4AF37]">
              <Coins className="w-5 h-5 text-[#D4AF37]" />
              <span className="font-bold text-[#D4AF37]">{points}</span>
              <span className="text-sm text-white/70">pontos</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap gap-4 mb-12 justify-center"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 uppercase tracking-widest text-sm transition-all duration-300 ${
                selectedCategory === category
                  ? "bg-[#D4AF37] text-[#001B2E] border border-[#D4AF37]"
                  : "bg-transparent text-white/70 border border-white/20 hover:border-[#D4AF37] hover:text-[#D4AF37]"
              }`}
              style={{ fontWeight: 300 }}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              className="group relative bg-[#001B2E] border border-white/10 hover:border-[#D4AF37] transition-all duration-500 overflow-hidden"
            >
              {/* Product Image */}
              <div className="relative h-64 overflow-hidden bg-black/20">
                <ImageWithFallback
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#001B2E] via-transparent to-transparent opacity-60" />
              </div>

              {/* Product Info */}
              <div className="p-6">
                <h3
                  className="text-xl uppercase tracking-tight mb-2"
                  style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700 }}
                >
                  {product.name}
                </h3>
                <p className="text-white/60 text-sm mb-4" style={{ fontWeight: 300 }}>
                  {product.description}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Coins className="w-5 h-5 text-[#D4AF37]" />
                    <span className="text-xl font-bold text-[#D4AF37]">{product.points}</span>
                  </div>

                  <button
                    onClick={() => handlePurchase(product)}
                    disabled={points < product.points}
                    className={`px-4 py-2 flex items-center gap-2 uppercase tracking-widest text-xs transition-all duration-300 ${
                      points < product.points
                        ? "bg-white/10 text-white/40 cursor-not-allowed"
                        : "bg-[#D4AF37] text-[#001B2E] hover:bg-[#D4AF37]/90"
                    }`}
                    style={{ fontWeight: 700 }}
                  >
                    <ShoppingCart className="w-4 h-4" />
                    Resgatar
                  </button>
                </div>
              </div>

              {/* Out of Stock Badge */}
              {points < product.points && (
                <div className="absolute top-4 right-4 px-3 py-1 bg-red-500/90 backdrop-blur-sm">
                  <span className="text-xs uppercase tracking-widest" style={{ fontWeight: 700 }}>
                    Pontos Insuficientes
                  </span>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Purchase Status Notification */}
      {purchaseStatus.show && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="fixed bottom-8 right-8 z-50 px-6 py-4 bg-[#001B2E] border flex items-center gap-3 shadow-2xl max-w-md"
          style={{
            borderColor: purchaseStatus.success ? "#D4AF37" : "#ef4444",
          }}
        >
          {purchaseStatus.success ? (
            <>
              <div className="w-10 h-10 rounded-full bg-[#D4AF37] flex items-center justify-center flex-shrink-0">
                <Check className="w-6 h-6 text-[#001B2E]" />
              </div>
              <div>
                <p className="font-bold text-[#D4AF37] uppercase tracking-wide text-sm">
                  Resgate Realizado!
                </p>
                <p className="text-white/70 text-sm" style={{ fontWeight: 300 }}>
                  {purchaseStatus.product} foi adicionado aos seus resgates
                </p>
              </div>
            </>
          ) : (
            <>
              <div className="w-10 h-10 rounded-full bg-red-500 flex items-center justify-center flex-shrink-0">
                <X className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="font-bold text-red-500 uppercase tracking-wide text-sm">
                  Pontos Insuficientes
                </p>
                <p className="text-white/70 text-sm" style={{ fontWeight: 300 }}>
                  Continue participando para ganhar mais pontos
                </p>
              </div>
            </>
          )}
        </motion.div>
      )}
    </div>
  );
}
