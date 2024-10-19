import { Step3Props } from '@/types/responsabilities';
import React from 'react';


const CompanySize: React.FC<Step3Props> = ({ selectedResponsibility, setSelectedResponsibility }) => {

  
  const companySizes = [
    'Myself only', 
    '2-10 employees', 
    '11-50 employees', 
    '51-200 employees', 
    '201-500 employees', 
    '501-1000 employees', 
    '1001-5000 employees', 
    '5001-10,000 employees', 
    '10,000+ employees'
  ];

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">What is your company size?</h2>
      <div className="grid grid-cols-2 gap-2">
        {companySizes.map((size) => (
            <button
            key={size}
            className={`text-left border p-2 rounded-md transition-colors ${
                selectedResponsibility === size
                  ? 'bg-purple-100 border-2 border-purple-500'
                  : 'border-gray-300 hover:bg-gray-100'
              }`}
            onClick={() => setSelectedResponsibility(size)}
            >
            {size}
            </button>
        ))}
      </div>
    </div>
  );
};

export default CompanySize;
