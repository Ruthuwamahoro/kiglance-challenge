import React from 'react';

interface Step1Props {
  handleNext: () => void;
}

const WelcomePage: React.FC<Step1Props> = ({ handleNext }) => {
  return (
    <div className="text-center">
      <div className="bg-purple-500 text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl mx-auto mb-4">
        J
      </div>
      <h2 className="text-xl font-semibold mb-2">Welcome Jane Doe 🙌</h2>
      <div className="text-gray-600 mb-4">
        We need a few details to personalize your experience.
      </div>
      <button
        onClick={handleNext}
        className="w-full bg-purple-500 text-white py-2 rounded-md hover:bg-purple-600 transition-colors"
      >
        Let&apos;s do it
      </button>
      <div className="text-sm text-gray-500 mt-2">
        This will only take a minute.
      </div>
    </div>
  );
};

export default WelcomePage;