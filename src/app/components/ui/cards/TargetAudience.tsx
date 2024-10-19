import { Step3Props } from '@/types/responsabilities';
import React from 'react';

const TargetAudience: React.FC<Step3Props> = ({ selectedResponsibility, setSelectedResponsibility }) => {
  const audiences = ['Business (B2B)', 'Consumers (B2C)', 'Business and Consumers'];

  return (
    <div className="step4-container">
      <h2 className="text-xl font-semibold mb-4 text-center">Who is your target audience?</h2>
      <div className="space-y-2 flex flex-col justify-center items-center mb-10">
        {audiences.map((audience) => (
          <button
            key={audience}
            className={`w-80 text-left border p-2 rounded-md transition-colors ${
              selectedResponsibility === audience 
                ? 'bg-purple-100 border-2 border-purple-500'
                : 'border-gray-300 hover:bg-gray-100'
            }`}
            onClick={() => setSelectedResponsibility(audience)}
          >
            {audience}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TargetAudience;