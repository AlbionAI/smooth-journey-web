
import { useState } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import TokenDetails from '../components/TokenForm/TokenDetails';
import TokenSupply from '../components/TokenForm/TokenSupply';
import TokenSocial from '../components/TokenForm/TokenSocial';
import FormProgress from '../components/TokenForm/FormProgress';

const STEPS = [
  { title: 'Token Details', number: 1 },
  { title: 'Total Supply', number: 2 },
  { title: 'Social Links', number: 3 }
];

const Index = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [showForm, setShowForm] = useState(false);

  const handleWalletConnected = () => {
    setShowForm(true);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <TokenDetails onNext={() => setCurrentStep(2)} />;
      case 2:
        return <TokenSupply onNext={() => setCurrentStep(3)} onBack={() => setCurrentStep(1)} />;
      case 3:
        return <TokenSocial onBack={() => setCurrentStep(2)} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#0B1220]">
      <Navbar />
      {!showForm ? (
        <Hero onWalletConnected={handleWalletConnected} />
      ) : (
        <div className="min-h-screen pt-24 pb-12 px-4">
          <div className="max-w-4xl mx-auto">
            <FormProgress currentStep={currentStep} steps={STEPS} />
            {renderStep()}
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
