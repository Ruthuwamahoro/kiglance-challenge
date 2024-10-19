import { Avatar } from '@mui/material';
import { deepPurple } from '@mui/material/colors';
import React, { useState, useEffect } from 'react';

interface UserIntroFormProps {
  onBack: () => void;
  onSkip: () => void;
  onSubmit: (data: UserIntroData) => void;
}

interface UserIntroData {
  headline: string;
  jobTitle: string;
  location: string;
}

const UserIntroductionForm: React.FC<UserIntroFormProps> = ({ onBack, onSkip, onSubmit }) => {
  const [formData, setFormData] = useState<UserIntroData>({
    headline: '',
    jobTitle: '',
    location: '',
  });
  const [errors, setErrors] = useState<Partial<UserIntroData>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof UserIntroData, boolean>>>({});

  const maxLengths = {
    headline: 90,
    jobTitle: 40,
    location: 50,
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setTouched(prev => ({ ...prev, [name]: true }));
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<UserIntroData> = {};
    if (formData.headline.length > maxLengths.headline) {
      newErrors.headline = `Exceeded maximum character length of ${maxLengths.headline}`;
    }
    if (formData.jobTitle.length > maxLengths.jobTitle) {
      newErrors.jobTitle = `Exceeded maximum character length of ${maxLengths.jobTitle}`;
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  useEffect(() => {
    validateForm();
  }, [formData]);

  const getBorderColor = (field: keyof UserIntroData) => {
    if (!touched[field]) return 'border-gray-300';
    if (errors[field]) return 'border-red-500';
    return 'border-purple-500';
  };

  const isSubmitDisabled = Object.keys(errors).length > 0 || Object.values(formData).some(value => value.trim() === '');

  return (
    <div className="flex flex-col items-center">
      <div className="w-full max-w-md">
        <div className="text-center mb-6">
          <h2 className="text-xl font-semibold">Introduce yourself to the community</h2>
          <p className="text-gray-600 mt-2">Let members learn more about you.</p>
          <div className="mt-4 flex items-center justify-center">
            <Avatar sx={{ bgcolor: deepPurple[500] }}>N</Avatar>
            <p className='mx-3'>Jane Doe</p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              name="headline"
              value={formData.headline}
              onChange={handleChange}
              placeholder="Headline"
              className={`w-full p-2 border rounded-md ${getBorderColor('headline')}`}
            />
            {errors.headline && <p className="text-red-500 text-sm mt-1">{errors.headline}</p>}
            <p className={`text-right text-sm ${errors.headline ? 'text-red-500' : 'text-gray-500'}`}>
              {formData.headline.length}/{maxLengths.headline}
            </p>
          </div>

          <div className="mb-4">
            <input
              type="text"
              name="jobTitle"
              value={formData.jobTitle}
              onChange={handleChange}
              placeholder="Job Title"
              className={`w-full p-2 border rounded-md ${getBorderColor('jobTitle')}`}
            />
            {errors.jobTitle && <p className="text-red-500 text-sm mt-1">{errors.jobTitle}</p>}
            <p className={`text-right text-sm ${errors.jobTitle ? 'text-red-500' : 'text-gray-500'}`}>
              {formData.jobTitle.length}/{maxLengths.jobTitle}
            </p>
          </div>

          <div className="mb-6">
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Location"
              className={`w-full p-2 border rounded-md ${getBorderColor('location')}`}
            />
          </div>

          <div className="flex justify-between">
            <button type="button" onClick={onBack} className="text-purple-500 hover:underline">Back</button>
            <div>
              <button type="button" onClick={onSkip} className="text-purple-500 hover:underline mr-4">Skip</button>
              <button 
                type="submit"
                className={`px-4 py-2 bg-purple-500 text-white rounded-md ${isSubmitDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-purple-600'}`}
                disabled={isSubmitDisabled}
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserIntroductionForm;