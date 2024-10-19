import { colorOptions } from '@/db';
import React, { useState, useRef } from 'react';
import { IoClose } from 'react-icons/io5';

interface ProfilePhotoSelectorProps {
  onClose: () => void;
  onSave: (photo: File | null, color: string) => void;
}

const ProfilePhotoSelector: React.FC<ProfilePhotoSelectorProps> = ({ onClose, onSave }) => {
  const [selectedColor, setSelectedColor] = useState<string>(colorOptions[0].hex);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleColorSelect = (color: string) => {
    setSelectedColor(color);
    setSelectedFile(null);
    setPreviewUrl(null);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    onSave(selectedFile, selectedColor);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Choose your profile photo</h2>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          <IoClose size={24} />
        </button>
      </div>

      {previewUrl ? (
        <div className="mb-4">
          <img src={previewUrl} alt="Preview" className="w-full h-48 object-cover rounded-lg" />
          <div className="flex justify-end mt-2">
            <button 
              className="px-4 py-2 bg-gray-200 rounded-md mr-2"
              onClick={() => {
                setSelectedFile(null);
                setPreviewUrl(null);
              }}
            >
              Cancel
            </button>
            <button 
              className="px-4 py-2 bg-purple-500 text-white rounded-md"
              onClick={handleSave}
            >
              Save
            </button>
          </div>
        </div>
      ) : (
        <>
          <div 
            className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer mb-4"
            onClick={() => fileInputRef.current?.click()}
          >
            <p className="text-gray-500">+ Select an image</p>
            <p className="text-xs text-gray-400">Recommended size: 400x400px</p>
          </div>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            className="hidden"
          />

          <p className="text-center text-gray-500 mb-2">Or select color</p>

          <div className="flex justify-center space-x-2 mb-4">
            {colorOptions.map((color) => (
              <button
                key={color.hex}
                className={`w-8 h-8 rounded-full ${selectedColor === color.hex ? 'ring-2 ring-offset-2 ring-purple-500' : ''}`}
                style={{ backgroundColor: color.hex }}
                onClick={() => handleColorSelect(color.hex)}
              />
            ))}
          </div>

          <div className="flex items-center justify-center w-24 h-24 rounded-full mx-auto" style={{ backgroundColor: selectedColor }}>
            <span className="text-4xl text-white">J</span>
          </div>
        </>
      )}
    </div>
  );
};

export default ProfilePhotoSelector;