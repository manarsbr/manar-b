
import React, { useState } from 'react';
import { Menu, X, Globe, User } from 'lucide-react';
import AuthModal from './AuthModal';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const openAuthModal = (mode: 'login' | 'register') => {
    setAuthMode(mode);
    setIsAuthModalOpen(true);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-md shadow-sm z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Globe className="text-emerald-600 w-8 h-8" />
              <div className="text-2xl font-bold text-gray-800">
                TradConnect
              </div>
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              <button 
                onClick={() => scrollToSection('accueil')}
                className="text-gray-700 hover:text-emerald-600 transition-colors duration-200"
              >
                Accueil
              </button>
              <button 
                onClick={() => scrollToSection('a-propos')}
                className="text-gray-700 hover:text-emerald-600 transition-colors duration-200"
              >
                À propos
              </button>
              <button 
                onClick={() => scrollToSection('services')}
                className="text-gray-700 hover:text-emerald-600 transition-colors duration-200"
              >
                Services
              </button>
              <button 
                onClick={() => scrollToSection('traducteurs')}
                className="text-gray-700 hover:text-emerald-600 transition-colors duration-200"
              >
                Traducteurs
              </button>
              <button 
                onClick={() => scrollToSection('dashboard')}
                className="text-gray-700 hover:text-emerald-600 transition-colors duration-200"
              >
                Tableau de bord
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="text-gray-700 hover:text-emerald-600 transition-colors duration-200"
              >
                Contact
              </button>
            </nav>

            {/* Auth Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              {!isLoggedIn ? (
                <>
                  <button 
                    onClick={() => openAuthModal('login')}
                    className="text-gray-700 hover:text-emerald-600 transition-colors duration-200"
                  >
                    Connexion
                  </button>
                  <button 
                    onClick={() => openAuthModal('register')}
                    className="bg-emerald-600 text-white px-6 py-2 rounded-full hover:bg-emerald-700 transition-colors duration-200"
                  >
                    Inscription
                  </button>
                </>
              ) : (
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <User className="w-8 h-8 bg-emerald-100 text-emerald-600 rounded-full p-1.5" />
                    <span className="text-gray-700">John Doe</span>
                  </div>
                  <button 
                    onClick={() => setIsLoggedIn(false)}
                    className="text-gray-700 hover:text-emerald-600 transition-colors duration-200"
                  >
                    Déconnexion
                  </button>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className="md:hidden p-2"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <nav className="md:hidden mt-4 pb-4 border-t border-gray-200">
              <div className="flex flex-col space-y-3 pt-4">
                <button 
                  onClick={() => scrollToSection('accueil')}
                  className="text-gray-700 hover:text-emerald-600 transition-colors duration-200 text-left"
                >
                  Accueil
                </button>
                <button 
                  onClick={() => scrollToSection('a-propos')}
                  className="text-gray-700 hover:text-emerald-600 transition-colors duration-200 text-left"
                >
                  À propos
                </button>
                <button 
                  onClick={() => scrollToSection('services')}
                  className="text-gray-700 hover:text-emerald-600 transition-colors duration-200 text-left"
                >
                  Services
                </button>
                <button 
                  onClick={() => scrollToSection('traducteurs')}
                  className="text-gray-700 hover:text-emerald-600 transition-colors duration-200 text-left"
                >
                  Traducteurs
                </button>
                <button 
                  onClick={() => scrollToSection('dashboard')}
                  className="text-gray-700 hover:text-emerald-600 transition-colors duration-200 text-left"
                >
                  Tableau de bord
                </button>
                <button 
                  onClick={() => scrollToSection('contact')}
                  className="text-gray-700 hover:text-emerald-600 transition-colors duration-200 text-left"
                >
                  Contact
                </button>
                
                {!isLoggedIn ? (
                  <div className="flex flex-col space-y-2 pt-4">
                    <button 
                      onClick={() => openAuthModal('login')}
                      className="bg-white border border-emerald-600 text-emerald-600 px-6 py-2 rounded-full hover:bg-emerald-50 transition-colors duration-200 text-center"
                    >
                      Connexion
                    </button>
                    <button 
                      onClick={() => openAuthModal('register')}
                      className="bg-emerald-600 text-white px-6 py-2 rounded-full hover:bg-emerald-700 transition-colors duration-200 text-center"
                    >
                      Inscription
                    </button>
                  </div>
                ) : (
                  <div className="pt-4">
                    <div className="flex items-center space-x-2 mb-3">
                      <User className="w-8 h-8 bg-emerald-100 text-emerald-600 rounded-full p-1.5" />
                      <span className="text-gray-700">John Doe</span>
                    </div>
                    <button 
                      onClick={() => setIsLoggedIn(false)}
                      className="text-gray-700 hover:text-emerald-600 transition-colors duration-200"
                    >
                      Déconnexion
                    </button>
                  </div>
                )}
              </div>
            </nav>
          )}
        </div>
      </header>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        initialMode={authMode}
      />
    </>
  );
};

export default Header;
