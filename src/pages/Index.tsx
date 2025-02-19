
import { useState } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import TokenDetails from '../components/TokenForm/TokenDetails';
import FormProgress from '../components/TokenForm/FormProgress';

const STEPS = [
  { title: 'Token Details', number: 1 },
  { title: 'Total Supply', number: 2 },
  { title: 'Social Links', number: 3 }
];

const Index = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="min-h-screen bg-[#0B1220]">
      <Navbar />
      {!showForm ? (
        <Hero />
      ) : (
        <div className="min-h-screen pt-24 pb-12 px-4">
          <div className="max-w-4xl mx-auto">
            <FormProgress currentStep={currentStep} steps={STEPS} />
            <TokenDetails onNext={() => setCurrentStep(2)} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
