
import { useState } from "react";
import { Button } from "@/components/ui/button";
import LoginModal from "@/components/LoginModal";
import AdminDashboard from "@/components/AdminDashboard";

const Index = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  const handleAdminLogin = () => {
    setIsAdminLoggedIn(true);
  };

  const handleLogout = () => {
    setIsAdminLoggedIn(false);
  };

  if (isAdminLoggedIn) {
    return (
      <div className="relative">
        <AdminDashboard />
        <Button 
          onClick={handleLogout}
          className="fixed top-4 right-4 bg-red-500 hover:bg-red-600"
        >
          Déconnexion
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-blue-900 flex items-center justify-center p-4">
      <div className="text-center">
        <div className="mb-8">
          <img 
            src="/lovable-uploads/6d6959de-2520-47ed-9e21-f90d440b8bd1.png" 
            alt="GestBox Logo" 
            className="h-16 w-auto mx-auto mb-6"
          />
          <h1 className="text-4xl font-bold text-white mb-4">
            Bienvenue sur GESTBOX
          </h1>
          <p className="text-gray-300 text-lg">
            Votre solution de gestion intelligente
          </p>
        </div>
        
        <Button 
          onClick={() => setIsLoginModalOpen(true)}
          className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-8 py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
        >
          Se connecter
        </Button>
      </div>

      <LoginModal 
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onAdminLogin={handleAdminLogin}
      />
    </div>
  );
};

export default Index;
