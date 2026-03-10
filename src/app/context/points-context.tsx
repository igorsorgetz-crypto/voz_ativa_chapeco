import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface PointsContextType {
  points: number;
  addPoints: (amount: number) => void;
  spendPoints: (amount: number) => boolean;
}

const PointsContext = createContext<PointsContextType | undefined>(undefined);

export function PointsProvider({ children }: { children: ReactNode }) {
  const [points, setPoints] = useState<number>(() => {
    const saved = localStorage.getItem("voz-ativa-points");
    return saved ? parseInt(saved, 10) : 150; // Começa com 150 pontos
  });

  useEffect(() => {
    localStorage.setItem("voz-ativa-points", points.toString());
  }, [points]);

  const addPoints = (amount: number) => {
    setPoints((prev) => prev + amount);
  };

  const spendPoints = (amount: number): boolean => {
    if (points >= amount) {
      setPoints((prev) => prev - amount);
      return true;
    }
    return false;
  };

  return (
    <PointsContext.Provider value={{ points, addPoints, spendPoints }}>
      {children}
    </PointsContext.Provider>
  );
}

export function usePoints() {
  const context = useContext(PointsContext);
  if (!context) {
    throw new Error("usePoints must be used within a PointsProvider");
  }
  return context;
}
