
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  Activity, 
  Wifi, 
  Clock, 
  Calendar, 
  TrendingUp, 
  Download, 
  Upload,
  Smartphone,
  Signal,
  User,
  Shield
} from "lucide-react";

interface UserConsumptionDashboardProps {
  userInfo: {
    firstName: string;
    lastName: string;
    phone: string;
    countryCode: string;
  };
  hasValidVoucher: boolean;
}

const UserConsumptionDashboard = ({ userInfo, hasValidVoucher }: UserConsumptionDashboardProps) => {
  const [currentData] = useState({
    remainingTime: "23h 45min",
    dataUsed: 2.3,
    dataLimit: 5.0,
    connectionStatus: "Connecté",
    lastConnection: "Aujourd'hui à 14:30",
    downloadSpeed: "15.2 Mbps",
    uploadSpeed: "8.7 Mbps",
    devicesConnected: 1,
    voucherType: "Jour",
    expirationDate: "25/12/2024"
  });

  const usagePercentage = (currentData.dataUsed / currentData.dataLimit) * 100;

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-4xl font-bold text-white mb-4">Tableau de Bord Client</h2>
        <p className="text-gray-300 text-lg">
          Bienvenue {userInfo.firstName} {userInfo.lastName}
        </p>
      </div>

      {/* Statistiques principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-slate-800/90 to-blue-900/90 border-blue-500/40 shadow-xl hover:shadow-2xl transition-all duration-300">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-300 flex items-center gap-2">
              <Clock className="h-4 w-4 text-blue-400" />
              Temps Restant
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-white">{currentData.remainingTime}</div>
            <p className="text-xs text-gray-400 mt-1">sur votre forfait</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-slate-800/90 to-blue-900/90 border-blue-500/40 shadow-xl hover:shadow-2xl transition-all duration-300">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-300 flex items-center gap-2">
              <Activity className="h-4 w-4 text-green-400" />
              Données Utilisées
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-white">
              {currentData.dataUsed}GB
            </div>
            <p className="text-xs text-gray-400 mt-1">sur {currentData.dataLimit}GB</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-slate-800/90 to-blue-900/90 border-blue-500/40 shadow-xl hover:shadow-2xl transition-all duration-300">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-300 flex items-center gap-2">
              <Wifi className="h-4 w-4 text-orange-400" />
              Statut
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Badge className="bg-green-500/20 text-green-300 border-green-500/30">
                {currentData.connectionStatus}
              </Badge>
            </div>
            <p className="text-xs text-gray-400 mt-2">{currentData.lastConnection}</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-slate-800/90 to-blue-900/90 border-blue-500/40 shadow-xl hover:shadow-2xl transition-all duration-300">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-300 flex items-center gap-2">
              <Smartphone className="h-4 w-4 text-purple-400" />
              Appareils
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-white">{currentData.devicesConnected}</div>
            <p className="text-xs text-gray-400 mt-1">appareil connecté</p>
          </CardContent>
        </Card>
      </div>

      {/* Graphiques de consommation et vitesse */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="bg-gradient-to-br from-slate-800/90 to-blue-900/90 border-blue-500/40 shadow-xl">
          <CardHeader className="border-b border-blue-500/30">
            <CardTitle className="text-white flex items-center gap-3 text-xl">
              <TrendingUp className="h-6 w-6 text-green-400" />
              Utilisation des Données
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 p-6">
            <div className="space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-300">Utilisé</span>
                <span className="text-white font-medium">{currentData.dataUsed}GB / {currentData.dataLimit}GB</span>
              </div>
              <Progress value={usagePercentage} className="h-3" />
              <div className="text-right text-sm text-gray-400">
                {usagePercentage.toFixed(1)}% utilisé
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-slate-800/90 to-blue-900/90 border-blue-500/40 shadow-xl">
          <CardHeader className="border-b border-blue-500/30">
            <CardTitle className="text-white flex items-center gap-3 text-xl">
              <Signal className="h-6 w-6 text-blue-400" />
              Vitesse de Connexion
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 p-6">
            <div className="grid grid-cols-2 gap-6">
              <div className="text-center">
                <Download className="h-10 w-10 text-blue-400 mx-auto mb-3" />
                <div className="text-xl font-bold text-white">{currentData.downloadSpeed}</div>
                <div className="text-xs text-gray-400">Téléchargement</div>
              </div>
              <div className="text-center">
                <Upload className="h-10 w-10 text-green-400 mx-auto mb-3" />
                <div className="text-xl font-bold text-white">{currentData.uploadSpeed}</div>
                <div className="text-xs text-gray-400">Upload</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Informations du compte et du voucher */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Informations du compte */}
        <Card className="bg-gradient-to-br from-slate-800/90 to-blue-900/90 border-blue-500/40 shadow-xl">
          <CardHeader className="border-b border-blue-500/30">
            <CardTitle className="text-white flex items-center gap-3 text-xl">
              <User className="h-6 w-6 text-orange-400" />
              Informations du Compte
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-2">
                <div className="text-sm text-gray-300">Nom complet</div>
                <div className="text-white font-medium text-lg">{userInfo.firstName} {userInfo.lastName}</div>
              </div>
              <div className="space-y-2">
                <div className="text-sm text-gray-300">Numéro de téléphone</div>
                <div className="text-white font-medium text-lg">{userInfo.countryCode} {userInfo.phone}</div>
              </div>
              <div className="space-y-2">
                <div className="text-sm text-gray-300">Statut du compte</div>
                <Badge className="bg-green-500/20 text-green-300 border-green-500/30">
                  Actif
                </Badge>
              </div>
              <div className="space-y-2">
                <div className="text-sm text-gray-300">Dernière connexion</div>
                <div className="text-white font-medium">{currentData.lastConnection}</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Informations du voucher */}
        <Card className="bg-gradient-to-br from-slate-800/90 to-blue-900/90 border-blue-500/40 shadow-xl">
          <CardHeader className="border-b border-blue-500/30">
            <CardTitle className="text-white flex items-center gap-3 text-xl">
              <Shield className="h-6 w-6 text-green-400" />
              Informations Voucher
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-2">
                <div className="text-sm text-gray-300">Type de voucher</div>
                <div className="text-white font-medium text-lg">{currentData.voucherType}</div>
              </div>
              <div className="space-y-2">
                <div className="text-sm text-gray-300">Date d'expiration</div>
                <div className="text-white font-medium text-lg">{currentData.expirationDate}</div>
              </div>
              <div className="space-y-2">
                <div className="text-sm text-gray-300">Statut du voucher</div>
                <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30">
                  Actif
                </Badge>
              </div>
              <div className="space-y-2">
                <div className="text-sm text-gray-300">Temps restant</div>
                <div className="text-green-400 font-bold text-lg">{currentData.remainingTime}</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UserConsumptionDashboard;
