import { useState, useEffect } from "react";
import { PointsProvider } from "./context/points-context";
import { Navigation } from "./components/navigation";
import { HeroSection } from "./components/hero-section";
import { ManifestoSection } from "./components/manifesto-section";
import { ProblemSection } from "./components/problem-section";
import { SolutionSection } from "./components/solution-section";
import { GamificationSection } from "./components/gamification-section";
import { TestimonialsSection } from "./components/testimonials-section";
import { Footer } from "./components/footer";
import { PlatformModal } from "./components/platform-modal";
import { SuggestionModal } from "./components/suggestion-modal";
import { VotingModal } from "./components/voting-modal";
import { ODS16Modal } from "./components/ods16-modal";
import { TestimonialModal } from "./components/testimonial-modal";
import { RewardsStorePage } from "./components/rewards-store-page";

type Page = "landing" | "rewards";

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>("landing");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSuggestionModalOpen, setIsSuggestionModalOpen] = useState(false);
  const [isVotingModalOpen, setIsVotingModalOpen] = useState(false);
  const [isODS16ModalOpen, setIsODS16ModalOpen] = useState(false);
  const [isTestimonialModalOpen, setIsTestimonialModalOpen] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  return (
    <PointsProvider>
      {currentPage === "landing" ? (
        <div className="min-h-screen bg-[#001B2E] text-white overflow-x-hidden">
          <Navigation onOpenRewardsStore={() => setCurrentPage("rewards")} />
          <HeroSection onOpenModal={() => setIsModalOpen(true)} />
          <ManifestoSection 
            onOpenODS16Modal={() => setIsODS16ModalOpen(true)}
          />
          <ProblemSection />
          <SolutionSection 
            onOpenSuggestionModal={() => setIsSuggestionModalOpen(true)}
            onOpenVotingModal={() => setIsVotingModalOpen(true)}
          />
          <GamificationSection onOpenRewardsStore={() => setCurrentPage("rewards")} />
          <TestimonialsSection onOpenTestimonialModal={() => setIsTestimonialModalOpen(true)} />
          <Footer />
          <PlatformModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
          <SuggestionModal isOpen={isSuggestionModalOpen} onClose={() => setIsSuggestionModalOpen(false)} />
          <VotingModal isOpen={isVotingModalOpen} onClose={() => setIsVotingModalOpen(false)} />
          <ODS16Modal isOpen={isODS16ModalOpen} onClose={() => setIsODS16ModalOpen(false)} />
          <TestimonialModal isOpen={isTestimonialModalOpen} onClose={() => setIsTestimonialModalOpen(false)} />
        </div>
      ) : (
        <RewardsStorePage onBack={() => setCurrentPage("landing")} />
      )}
    </PointsProvider>
  );
}