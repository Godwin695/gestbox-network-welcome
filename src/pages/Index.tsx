import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Network, Shield, Settings, Wifi } from "lucide-react";
import LoginModal from "@/components/LoginModal";
import AdminDashboard from "@/components/AdminDashboard";
import UserDashboard from "@/components/UserDashboard";

const Index = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState<{
    firstName: string;
    lastName: string;
    phone: string;
    countryCode: string;
  } | null>(null);

  useEffect(() => {
    const handleUserLogin = (event: CustomEvent) => {
      setUserInfo(event.detail);
      setIsUserLoggedIn(true);
    };

    window.addEventListener('userLogin', handleUserLogin as EventListener);
    
    return () => {
      window.removeEventListener('userLogin', handleUserLogin as EventListener);
    };
  }, []);

  const handleAdminLogin = () => {
    setIsAdminLoggedIn(true);
  };

  const handleAdminLogout = () => {
    setIsAdminLoggedIn(false);
  };

  const handleUserLogout = () => {
    setIsUserLoggedIn(false);
    setUserInfo(null);
  };

  // Si admin connecté, afficher le dashboard admin
  if (isAdminLoggedIn) {
    return <AdminDashboard onLogout={handleAdminLogout} />;
  }

  // Si utilisateur connecté, afficher le dashboard utilisateur
  if (isUserLoggedIn && userInfo) {
    return <UserDashboard onLogout={handleUserLogout} userInfo={userInfo} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      {/* Header */}
      <header className="bg-gradient-to-r from-slate-900 to-blue-900 shadow-xl border-b border-orange-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center animate-fade-in">
              <img 
                src="/lovable-uploads/6d6959de-2520-47ed-9e21-f90d440b8bd1.png" 
                alt="GestBox Logo" 
                className="h-12 w-auto hover:scale-105 transition-transform duration-300"
              />
            </div>
            
            {/* Bouton de connexion */}
            <Button 
              className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-in"
              onClick={() => setIsLoginModalOpen(true)}
            >
              Connexion
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section avec image illustrative */}
      <section className="relative bg-gradient-to-r from-slate-900 via-blue-900 to-slate-800 py-20">
        <div className="absolute inset-0 bg-black/20"></div>
        <div 
          className="absolute inset-0 opacity-10 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')`
          }}
        ></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold text-white mb-6 animate-fade-in">
            Bienvenue chez{" "}
            <span className="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
              GESTBOX
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto animate-fade-in">
            Votre partenaire de confiance pour tous vos besoins en services réseau. 
            Nous offrons des solutions innovantes et fiables pour optimiser votre infrastructure réseau.
          </p>
        </div>
      </section>

      {/* Section principale */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Blocs de services avec animations */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {/* Service 1 */}
          <Card className="bg-gradient-to-br from-slate-800/80 to-blue-900/80 border-orange-500/30 hover:shadow-2xl hover:shadow-orange-500/20 transition-all duration-500 hover:scale-105 animate-fade-in backdrop-blur-sm group">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 p-4 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full w-20 h-20 flex items-center justify-center group-hover:from-orange-500 group-hover:to-orange-600 transition-all duration-300">
                <Network className="h-10 w-10 text-white" />
              </div>
              <CardTitle className="text-xl font-semibold text-white">
                Infrastructure Réseau
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center text-gray-300">
                Conception, installation et maintenance de votre infrastructure réseau 
                pour une connectivité optimale et sécurisée.
              </CardDescription>
            </CardContent>
          </Card>

          {/* Service 2 */}
          <Card className="bg-gradient-to-br from-slate-800/80 to-blue-900/80 border-orange-500/30 hover:shadow-2xl hover:shadow-orange-500/20 transition-all duration-500 hover:scale-105 animate-fade-in backdrop-blur-sm group" style={{animationDelay: '0.2s'}}>
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 p-4 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full w-20 h-20 flex items-center justify-center group-hover:from-orange-500 group-hover:to-orange-600 transition-all duration-300">
                <Shield className="h-10 w-10 text-white" />
              </div>
              <CardTitle className="text-xl font-semibold text-white">
                Sécurité Réseau
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center text-gray-300">
                Protection avancée de vos données avec des solutions de sécurité 
                réseau adaptées à vos besoins spécifiques.
              </CardDescription>
            </CardContent>
          </Card>

          {/* Service 3 */}
          <Card className="bg-gradient-to-br from-slate-800/80 to-blue-900/80 border-orange-500/30 hover:shadow-2xl hover:shadow-orange-500/20 transition-all duration-500 hover:scale-105 animate-fade-in backdrop-blur-sm group" style={{animationDelay: '0.4s'}}>
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 p-4 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full w-20 h-20 flex items-center justify-center group-hover:from-orange-500 group-hover:to-orange-600 transition-all duration-300">
                <Settings className="h-10 w-10 text-white" />
              </div>
              <CardTitle className="text-xl font-semibold text-white">
                Support & Maintenance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center text-gray-300">
                Assistance technique 24/7 et maintenance préventive pour assurer 
                la performance continue de votre réseau.
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        {/* Section supplémentaire avec connectivité */}
        <div className="bg-gradient-to-r from-slate-800/80 to-blue-900/80 backdrop-blur-sm rounded-xl shadow-2xl p-8 text-center border border-orange-500/30 animate-fade-in hover:shadow-orange-500/20 transition-all duration-500" style={{animationDelay: '0.6s'}}>
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full">
              <Wifi className="h-12 w-12 text-white" />
            </div>
          </div>
          <h3 className="text-3xl font-semibold text-white mb-6">
            Connectivité Haute Performance
          </h3>
          <p className="text-gray-300 max-w-2xl mx-auto text-lg">
            Bénéficiez d'une connectivité stable et rapide grâce à nos solutions réseau 
            de dernière génération. Notre expertise vous garantit une infrastructure 
            fiable et évolutive.
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-slate-900 to-black border-t border-orange-500/20 text-white py-12 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="mb-6 animate-fade-in">
              <img 
                src="/lovable-uploads/6d6959de-2520-47ed-9e21-f90d440b8bd1.png" 
                alt="GestBox Logo" 
                className="h-16 w-auto mx-auto mb-4"
              />
            </div>
            <p className="text-gray-400 text-lg">
              © 2024 GESTBOX. Tous droits réservés. | Services réseau professionnels
            </p>
          </div>
        </div>
      </footer>

      {/* Modal de connexion */}
      <LoginModal 
        isOpen={isLoginModalOpen} 
        onClose={() => setIsLoginModalOpen(false)}
        onAdminLogin={handleAdminLogin}
      />
    </div>
  );
};

export default Index;
