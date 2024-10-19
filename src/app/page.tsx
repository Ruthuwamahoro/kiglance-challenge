'use client';
import { useState } from 'react';
import HeaderNav from './components/ui/HeaderNav';
import OnboardingModal from './components/ui/MainPage';

const App = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);
    return (
        <div className="">
            <HeaderNav />
            <div className="flex items-center justify-center overflow-none h-screen">
              <div>
                <button onClick={handleOpenModal} className="bg-[#8D57FA] text-white px-4 py-2 rounded">
                    Let&apos;s get started
                </button>
                <OnboardingModal open={isModalOpen} onClose={handleCloseModal} />
                </div>
            </div>
        </div>
    );
};

export default App;
