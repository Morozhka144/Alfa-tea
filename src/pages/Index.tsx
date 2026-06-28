import "@/styles/tipping.css";
import { useState } from "react";
import BackgroundWrapper from "@/components/Index/BackgroundWrapper";
import Header from "@/components/layout/Header";
import LegalFooterText from "@/components/Index/LegalFooterText";
import ServerProfileCard from "@/components/Index/ServerProfileCard";
import SuccessOverlay from "@/components/Index/SuccessOverlay";
import TipSelectionPanel from "@/components/Index/TipSelectionPanel";

const Index = () => {
  const [showSuccess, setShowSuccess] = useState(false);
  const [paidAmount, setPaidAmount] = useState(0);

  const handlePay = (amount: number) => {
    setPaidAmount(amount);
    setShowSuccess(true);
  };

  return (
    <div className="font-figtree overflow-hidden">

      <BackgroundWrapper />
      <div className="relative z-10 flex flex-col min-h-screen w-full max-w-sm mx-auto px-4 py-0" id="main-screen">
      <Header />
      <div className="flex-1 flex flex-col justify-center gap-4 pb-4">
      <ServerProfileCard />
      <TipSelectionPanel onPay={handlePay} />
      <LegalFooterText />
      </div>
      </div>
      <SuccessOverlay visible={showSuccess} amount={paidAmount} onClose={() => setShowSuccess(false)} />
    </div>
  );
};

export default Index;
