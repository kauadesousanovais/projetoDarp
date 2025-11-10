import React, { useState } from 'react';
import RegisterForm from './components/RegisterForm';
import MobileFormOverlay from './components/MobileFormOverlay';
import InstagramIcon from './components/InstagramIcon';

function App() {
  const [isMobileFormOpen, setIsMobileFormOpen] = useState(false);

  const openMobileForm = () => {
    setIsMobileFormOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeMobileForm = () => {
    setIsMobileFormOpen(false);
    document.body.style.overflow = '';
  };

  return (
    <div className="font-inter bg-black min-h-screen flex items-center justify-center p-0">
      {/* Container */}
      <div className="flex flex-col bg-gradient-to-r from-yellow-700 to-red-500 lg:flex-row w-full max-w-6xl shadow-2xl lg:rounded-2xl overflow-hidden min-h-0">
        
        {/* Seção Ilustrativa */}
        <div className="lg:w-1/2 text-white p-8 lg:p-12 flex flex-col justify-center items-center text-center relative lg:min-h-[600px]">
          <div className="flex flex-col items-center justify-center w-full h-full">
            <div className="mb-6 mt-64 lg:mb-8 lg:mt-9"> 
              <h2 className="text-3xl lg:text-4xl font-bold mb-4 lg:mb-6">Domine seus Reels favoritos</h2>
              <p className="text-blue-100 text-lg lg:text-xl max-w-md leading-relaxed mb-4">
                <span className="font-semibold text-white">Crie ja sua conta e venha fazer parte da comunidade da melhor plataforma para organizar, classificar e redescobrir os melhores Reels do Instagram.</span>
              </p>
              <InstagramIcon/>
            </div>
            
            <div className="mt-6 lg:mt-8 w-full max-w-xs">
              <button 
                onClick={openMobileForm}
                className="lg:hidden bg-white text-purple-900 hover:bg-blue-50 font-semibold py-4 px-8 rounded-xl transition duration-200 flex items-center justify-center shadow-lg w-full"
              >
                <i className="fas fa-user-plus mr-3"></i>
                Criar Conta
              </button>
            </div>
          </div>
        </div>
        
        <div className="hidden lg:block lg:w-1/2">
          <RegisterForm/>
        </div>
      </div>

      <MobileFormOverlay 
        isOpen={isMobileFormOpen} 
        onClose={closeMobileForm} 
      />
    </div>
  );
}
export default App;