
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Eye, EyeOff, Lock, Mail, Shield, User, Phone } from "lucide-react";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginModal = ({ isOpen, onClose }: LoginModalProps) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    phone: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(`${isAdmin ? 'Admin' : 'User'} login:`, formData);
    onClose();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleModeSwitch = () => {
    setIsAdmin(!isAdmin);
    setFormData({ email: "", password: "", firstName: "", lastName: "", phone: "" });
    setShowPassword(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md w-full p-0 border-none bg-transparent overflow-hidden">
        <div className="relative bg-gradient-to-br from-slate-900 to-blue-900 rounded-2xl shadow-2xl overflow-hidden">
          {/* Background decoratif */}
          <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-blue-600/20"></div>
          
          {/* Animated background shape */}
          <div className={`absolute inset-0 transform transition-transform duration-700 ease-in-out ${
            isAdmin ? 'translate-x-0' : 'translate-x-full'
          }`}>
            <div className="w-full h-full bg-gradient-to-br from-orange-500/20 to-orange-600/30 rounded-2xl"></div>
          </div>

          {/* Header avec switch */}
          <div className="relative z-10 p-8 text-center">
            <div className="flex items-center justify-center mb-6">
              <div className={`p-4 rounded-full transition-all duration-500 ${
                isAdmin 
                  ? 'bg-gradient-to-br from-orange-500 to-orange-600' 
                  : 'bg-gradient-to-br from-blue-500 to-blue-600'
              }`}>
                {isAdmin ? (
                  <Shield className="h-8 w-8 text-white" />
                ) : (
                  <User className="h-8 w-8 text-white" />
                )}
              </div>
            </div>

            <h2 className="text-2xl font-bold text-white mb-2 transition-all duration-300">
              Connexion{" "}
              <span className={`block transition-all duration-300 ${
                isAdmin 
                  ? 'bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent'
                  : 'bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent'
              }`}>
                {isAdmin ? 'Administrateur' : 'Utilisateur'}
              </span>
            </h2>

            <p className="text-gray-300 mb-6">
              {isAdmin ? 'Accès réservé aux administrateurs' : 'Accès client GESTBOX'}
            </p>

            {/* Switch pour basculer entre Admin et User */}
            <div className="flex items-center justify-center space-x-4 mb-8">
              <span className={`text-sm font-medium transition-colors duration-300 ${
                !isAdmin ? 'text-blue-400' : 'text-gray-400'
              }`}>
                Utilisateur
              </span>
              <Switch
                checked={isAdmin}
                onCheckedChange={handleModeSwitch}
                className={`transition-colors duration-300 ${
                  isAdmin 
                    ? 'data-[state=checked]:bg-orange-500' 
                    : 'data-[state=checked]:bg-blue-500'
                }`}
              />
              <span className={`text-sm font-medium transition-colors duration-300 ${
                isAdmin ? 'text-orange-400' : 'text-gray-400'
              }`}>
                Admin
              </span>
            </div>
          </div>

          {/* Formulaire */}
          <div className="relative z-10 px-8 pb-8">
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Champs spécifiques aux clients */}
              {!isAdmin && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName" className="text-sm font-medium text-gray-200">
                        Prénom
                      </Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-blue-400" />
                        <Input
                          id="firstName"
                          name="firstName"
                          type="text"
                          placeholder="Prénom"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          className="pl-10 h-10 bg-slate-700/50 text-white placeholder-gray-400 border-blue-500/30 focus:border-blue-500 focus:ring-blue-500/20"
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="lastName" className="text-sm font-medium text-gray-200">
                        Nom
                      </Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-blue-400" />
                        <Input
                          id="lastName"
                          name="lastName"
                          type="text"
                          placeholder="Nom"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          className="pl-10 h-10 bg-slate-700/50 text-white placeholder-gray-400 border-blue-500/30 focus:border-blue-500 focus:ring-blue-500/20"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-sm font-medium text-gray-200">
                      Numéro de téléphone
                    </Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-blue-400" />
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        placeholder="06 12 34 56 78"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="pl-10 h-10 bg-slate-700/50 text-white placeholder-gray-400 border-blue-500/30 focus:border-blue-500 focus:ring-blue-500/20"
                        required
                      />
                    </div>
                  </div>
                </>
              )}

              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-gray-200">
                  {isAdmin ? 'Email Administrateur' : 'Email'}
                </Label>
                <div className="relative">
                  <Mail className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 transition-colors duration-300 ${
                    isAdmin ? 'text-orange-400' : 'text-blue-400'
                  }`} />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder={isAdmin ? "admin@gestbox.com" : "email@exemple.com"}
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`pl-10 h-10 bg-slate-700/50 text-white placeholder-gray-400 transition-all duration-300 ${
                      isAdmin 
                        ? 'border-orange-500/30 focus:border-orange-500 focus:ring-orange-500/20' 
                        : 'border-blue-500/30 focus:border-blue-500 focus:ring-blue-500/20'
                    }`}
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium text-gray-200">
                  Mot de passe
                </Label>
                <div className="relative">
                  <Lock className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 transition-colors duration-300 ${
                    isAdmin ? 'text-orange-400' : 'text-blue-400'
                  }`} />
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleInputChange}
                    className={`pl-10 pr-10 h-10 bg-slate-700/50 text-white placeholder-gray-400 transition-all duration-300 ${
                      isAdmin 
                        ? 'border-orange-500/30 focus:border-orange-500 focus:ring-orange-500/20' 
                        : 'border-blue-500/30 focus:border-blue-500 focus:ring-blue-500/20'
                    }`}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className={`absolute right-3 top-1/2 transform -translate-y-1/2 transition-colors duration-300 ${
                      isAdmin 
                        ? 'text-orange-400 hover:text-orange-300' 
                        : 'text-blue-400 hover:text-blue-300'
                    }`}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
              
              <Button 
                type="submit" 
                className={`w-full h-10 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 ${
                  isAdmin 
                    ? 'bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700' 
                    : 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700'
                }`}
              >
                {isAdmin ? 'Connexion Admin' : 'Connexion Client'}
              </Button>
            </form>
          </div>

          {/* Logo GESTBOX en bas */}
          <div className="relative z-10 pb-6 text-center">
            <img 
              src="/lovable-uploads/6d6959de-2520-47ed-9e21-f90d440b8bd1.png" 
              alt="GestBox Logo" 
              className="h-8 w-auto mx-auto opacity-70"
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal;
