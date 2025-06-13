
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Eye, EyeOff, Lock, Mail, Shield, User } from "lucide-react";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginModal = ({ isOpen, onClose }: LoginModalProps) => {
  const [showPasswordAdmin, setShowPasswordAdmin] = useState(false);
  const [showPasswordUser, setShowPasswordUser] = useState(false);
  const [adminFormData, setAdminFormData] = useState({
    email: "",
    password: ""
  });
  const [userFormData, setUserFormData] = useState({
    email: "",
    password: ""
  });

  const handleAdminSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Admin login:", adminFormData);
    onClose();
  };

  const handleUserSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("User login:", userFormData);
    onClose();
  };

  const handleAdminInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAdminFormData({
      ...adminFormData,
      [e.target.name]: e.target.value
    });
  };

  const handleUserInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserFormData({
      ...userFormData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl w-full h-[80vh] p-0 border-orange-500/30 bg-gradient-to-br from-slate-900 to-blue-900 overflow-hidden">
        <div className="flex h-full">
          {/* Section Admin - Côté gauche */}
          <div className="flex-1 bg-gradient-to-br from-slate-800 to-blue-900 p-8 flex flex-col justify-center relative">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-blue-600/20"></div>
            <div className="relative z-10">
              <div className="text-center mb-8">
                <div className="mx-auto mb-4 p-4 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full w-20 h-20 flex items-center justify-center">
                  <Shield className="h-10 w-10 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-white mb-2">
                  Connexion
                  <span className="block bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
                    Administrateur
                  </span>
                </h2>
                <p className="text-gray-300">Accès réservé aux administrateurs</p>
              </div>

              <form onSubmit={handleAdminSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="admin-email" className="text-sm font-medium text-gray-200">
                    Email Administrateur
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-orange-400 h-5 w-5" />
                    <Input
                      id="admin-email"
                      name="email"
                      type="email"
                      placeholder="admin@gestbox.com"
                      value={adminFormData.email}
                      onChange={handleAdminInputChange}
                      className="pl-12 h-12 bg-slate-700/50 border-orange-500/30 text-white placeholder-gray-400 focus:border-orange-500 focus:ring-orange-500/20"
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="admin-password" className="text-sm font-medium text-gray-200">
                    Mot de passe
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-orange-400 h-5 w-5" />
                    <Input
                      id="admin-password"
                      name="password"
                      type={showPasswordAdmin ? "text" : "password"}
                      placeholder="••••••••"
                      value={adminFormData.password}
                      onChange={handleAdminInputChange}
                      className="pl-12 pr-12 h-12 bg-slate-700/50 border-orange-500/30 text-white placeholder-gray-400 focus:border-orange-500 focus:ring-orange-500/20"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPasswordAdmin(!showPasswordAdmin)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-orange-400 hover:text-orange-300"
                    >
                      {showPasswordAdmin ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full h-12 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Connexion Admin
                </Button>
              </form>
            </div>
          </div>

          {/* Séparateur central */}
          <div className="w-1 bg-gradient-to-b from-orange-500/50 via-orange-400 to-orange-500/50"></div>

          {/* Section Utilisateur - Côté droit */}
          <div className="flex-1 bg-gradient-to-br from-blue-900 to-slate-800 p-8 flex flex-col justify-center relative">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-orange-500/10"></div>
            <div className="relative z-10">
              <div className="text-center mb-8">
                <div className="mx-auto mb-4 p-4 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full w-20 h-20 flex items-center justify-center">
                  <User className="h-10 w-10 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-white mb-2">
                  Connexion
                  <span className="block bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                    Utilisateur
                  </span>
                </h2>
                <p className="text-gray-300">Accès client GESTBOX</p>
              </div>

              <form onSubmit={handleUserSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="user-email" className="text-sm font-medium text-gray-200">
                    Email Client
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400 h-5 w-5" />
                    <Input
                      id="user-email"
                      name="email"
                      type="email"
                      placeholder="client@exemple.com"
                      value={userFormData.email}
                      onChange={handleUserInputChange}
                      className="pl-12 h-12 bg-slate-700/50 border-blue-500/30 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500/20"
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="user-password" className="text-sm font-medium text-gray-200">
                    Mot de passe
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400 h-5 w-5" />
                    <Input
                      id="user-password"
                      name="password"
                      type={showPasswordUser ? "text" : "password"}
                      placeholder="••••••••"
                      value={userFormData.password}
                      onChange={handleUserInputChange}
                      className="pl-12 pr-12 h-12 bg-slate-700/50 border-blue-500/30 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500/20"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPasswordUser(!showPasswordUser)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-400 hover:text-blue-300"
                    >
                      {showPasswordUser ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full h-12 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Connexion Client
                </Button>
              </form>
            </div>
          </div>
        </div>

        {/* Logo GESTBOX en bas au centre */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2">
          <img 
            src="/lovable-uploads/6d6959de-2520-47ed-9e21-f90d440b8bd1.png" 
            alt="GestBox Logo" 
            className="h-8 w-auto opacity-70"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal;
