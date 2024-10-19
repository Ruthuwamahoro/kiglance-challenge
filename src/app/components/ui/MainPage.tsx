import React, { useState } from 'react';
import { IoTrendingUpSharp, IoClose } from "react-icons/io5";
import { FaCheck } from "react-icons/fa";
import Step1 from '@/app/components/ui/cards/Welcome';
import MainResponsabilities from '@/app/components/ui/cards/MainResponsabilities';
import CompanySize from '@/app/components/ui/cards/CompanySize';
import TargetAudience from '@/app/components/ui/cards/TargetAudience';
import Products from '@/app/components/ui/cards/Products';
// import Step6 from '@/app/components/ui/cards/ProfilePhotoSelector';
import UserIntroductionForm from '@/app/components/ui/cards/UserIntroductionForm';
import ProductManage from './cards/ProductsTags';
import ProfilePhotoSelector from '@/app/components/ui/cards/ProfilePhotoSelector';

interface OnboardingModalProps {
  open: boolean;
  onClose: () => void;
}

interface Product {
  name: string;
  icon: string;
}

const OnboardingModal: React.FC<OnboardingModalProps> = ({ open, onClose }) => {
  const [step, setStep] = useState<number>(1);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  // const [selectedColor, setSelectedColor] = useState<string>('#8D57FA');
  const [isOpen, setIsOpen] = useState(false);
  const [selectedResponsibility, setSelectedResponsibility] = useState<string>('');
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
  const [userInfo, setUserInfo] = useState({
    headline: '',
    jobTitle: '',
    location: '',
  });

  const handleSave = (photo: File | null, color: string) => {
    console.log(photo, color);
    setIsOpen(false);
  };

  const handleNext = () => setStep(step + 1);
  const handleBack = () => setStep(step - 1);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  const handleInterestToggle = (interest: string) => {
    setSelectedInterests(prev => 
      prev.includes(interest) 
        ? prev.filter(i => i !== interest)
        : [...prev, interest]
    );
  };

  const totalSteps = 9;

  if (!open) return null;

  const renderProgressBar = () => (
    <div className="flex mb-6">
      {[...Array(totalSteps)].map((_, index) => (
        <div
          key={index}
          className={`h-1 flex-1 ${
            index < step ? 'bg-purple-500' : 'bg-gray-200'
          } ${index < totalSteps - 1 ? 'mr-1' : ''}`}
        ></div>
      ))}
    </div>
  );

  const renderSuccessDialog = () => (
    <div className="text-center py-8">
      <h2 className="text-2xl font-semibold mb-2">You&apos;re all set!</h2>
      <p className="text-gray-600 mb-6">Start stackin&apos;, reviewin&apos;, discussin&apos; and more... 🙌</p>
      <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto">
        <FaCheck className="text-purple-500" size={32} />
      </div>
    </div>
  );

  const isNextButtonActive = step === 6 ? selectedProducts.length >= 3 : true;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-[600px] max-w-[90%]">
        <div className="flex justify-between items-center mb-4">
          <IoTrendingUpSharp className="text-purple-500" size={24} />
          {step > 1 && (
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <IoClose size={20} />
            </button>
          )}
        </div>
        {renderProgressBar()}
        {step === 1 && <Step1 handleNext={handleNext} />}
        {step === 2 && <MainResponsabilities selectedResponsibility={selectedResponsibility} setSelectedResponsibility={setSelectedResponsibility} />}
        {step === 3 && <CompanySize selectedResponsibility={selectedResponsibility} setSelectedResponsibility={setSelectedResponsibility}/>}
        {step === 4 && <TargetAudience selectedResponsibility={selectedResponsibility} setSelectedResponsibility={setSelectedResponsibility}/>}
        {step === 5 && <Products selectedInterests={selectedInterests} handleInterestToggle={handleInterestToggle} />}
        {step === 6 && <ProductManage selectedProducts={selectedProducts} setSelectedProducts={setSelectedProducts} />}
        {step === 7 && (
          <ProfilePhotoSelector
            onClose={() => setIsOpen(false)}
            onSave={handleSave}
          />
        )}
        {step === 8 && <UserIntroductionForm userInfo={userInfo} handleInputChange={handleInputChange} />}
        {step === 9 && renderSuccessDialog()}

        {step > 1 && step < 9 && (
          <div className="flex justify-between items-center px-6 py-4 bg-gray-50 rounded-b-lg">
            <button onClick={handleBack} className="text-purple-500 hover:underline">
              Back
            </button>
            <div>
              <button onClick={() => setStep(9)} className="text-purple-500 hover:underline mr-4">
                Skip
              </button>
              <button
                onClick={handleNext}
                className={`px-4 py-2 rounded-md ${
                  isNextButtonActive 
                    ? 'bg-purple-500 text-white hover:bg-purple-600 transition-colors' 
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
                disabled={!isNextButtonActive}
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OnboardingModal;
