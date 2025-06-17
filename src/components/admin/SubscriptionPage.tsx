
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Users, Wifi, WifiOff, Calendar, CheckCircle, XCircle } from "lucide-react";

interface Subscription {
  id: string;
  device: string;
  phone: string;
  isConnected: boolean;
  subscriptionType: string;
  startDate: string;
  endDate: string;
  status: 'active' | 'expired' | 'suspended';
  dataLimit: string;
  dataUsed: string;
}

const SubscriptionPage = () => {
  // Données d'exemple
  const subscriptions: Subscription[] = [
    {
      id: "1",
      device: "iPhone 14 Pro",
      phone: "+224 123 456 789",
      isConnected: true,
      subscriptionType: "Premium",
      startDate: "01/01/2024",
      endDate: "01/01/2025",
      status: "active",
      dataLimit: "50 GB",
      dataUsed: "15.2 GB"
    },
    {
      id: "2",
      device: "Samsung Galaxy S23",
      phone: "+224 987 654 321",
      isConnected: false,
      subscriptionType: "Standard",
      startDate: "15/02/2024",
      endDate: "15/02/2025",
      status: "active",
      dataLimit: "25 GB",
      dataUsed: "8.7 GB"
    },
    {
      id: "3",
      device: "MacBook Pro",
      phone: "+224 555 123 456",
      isConnected: true,
      subscriptionType: "Entreprise",
      startDate: "10/03/2024",
      endDate: "10/03/2025",
      status: "active",
      dataLimit: "100 GB",
      dataUsed: "45.8 GB"
    },
    {
      id: "4",
      device: "iPad Air",
      phone: "+224 777 888 999",
      isConnected: false,
      subscriptionType: "Standard",
      startDate: "20/01/2024",
      endDate: "20/01/2025",
      status: "suspended",
      dataLimit: "25 GB",
      dataUsed: "25 GB"
    }
  ];

  const connectedDevices = subscriptions.filter(sub => sub.isConnected);
  const disconnectedDevices = subscriptions.filter(sub => !sub.isConnected);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-500/20 text-green-400';
      case 'expired':
        return 'bg-red-500/20 text-red-400';
      case 'suspended':
        return 'bg-yellow-500/20 text-yellow-400';
      default:
        return 'bg-gray-500/20 text-gray-400';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active':
        return 'Actif';
      case 'expired':
        return 'Expiré';
      case 'suspended':
        return 'Suspendu';
      default:
        return 'Inconnu';
    }
  };

  return (
    <div className="space-y-6">
      {/* Statistiques des abonnements */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-slate-800/80 to-blue-900/80 border-orange-500/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-300 flex items-center gap-2">
              <Users className="h-4 w-4" />
              Total Abonnés
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{subscriptions.length}</div>
            <p className="text-xs text-gray-400">appareils enregistrés</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-slate-800/80 to-blue-900/80 border-green-500/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-300 flex items-center gap-2">
              <Wifi className="h-4 w-4" />
              Connectés
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-400">{connectedDevices.length}</div>
            <p className="text-xs text-gray-400">appareils actifs</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-slate-800/80 to-blue-900/80 border-red-500/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-300 flex items-center gap-2">
              <WifiOff className="h-4 w-4" />
              Déconnectés
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-400">{disconnectedDevices.length}</div>
            <p className="text-xs text-gray-400">appareils inactifs</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-slate-800/80 to-blue-900/80 border-orange-500/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-300 flex items-center gap-2">
              <CheckCircle className="h-4 w-4" />
              Abonnements Actifs
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              {subscriptions.filter(sub => sub.status === 'active').length}
            </div>
            <p className="text-xs text-gray-400">sur {subscriptions.length} total</p>
          </CardContent>
        </Card>
      </div>

      {/* Liste complète des abonnements */}
      <Card className="bg-gradient-to-br from-slate-800/80 to-blue-900/80 border-orange-500/30">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Users className="h-5 w-5" />
            Tous les Abonnements
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-slate-700">
                <TableHead className="text-gray-300">Appareil</TableHead>
                <TableHead className="text-gray-300">Téléphone</TableHead>
                <TableHead className="text-gray-300">Connexion</TableHead>
                <TableHead className="text-gray-300">Type</TableHead>
                <TableHead className="text-gray-300">Période</TableHead>
                <TableHead className="text-gray-300">Utilisation</TableHead>
                <TableHead className="text-gray-300">Statut</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {subscriptions.map((sub) => (
                <TableRow key={sub.id} className="border-slate-700">
                  <TableCell className="text-white font-medium">{sub.device}</TableCell>
                  <TableCell className="text-gray-300">{sub.phone}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {sub.isConnected ? (
                        <>
                          <Wifi className="h-4 w-4 text-green-400" />
                          <span className="text-green-400">Connecté</span>
                        </>
                      ) : (
                        <>
                          <WifiOff className="h-4 w-4 text-red-400" />
                          <span className="text-red-400">Déconnecté</span>
                        </>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-gray-300">{sub.subscriptionType}</TableCell>
                  <TableCell className="text-gray-300">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>{sub.startDate} - {sub.endDate}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-gray-300">
                    {sub.dataUsed} / {sub.dataLimit}
                  </TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(sub.status)}`}>
                      {getStatusText(sub.status)}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Section différenciant connectés et déconnectés */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Appareils connectés */}
        <Card className="bg-gradient-to-br from-slate-800/80 to-green-900/20 border-green-500/30">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Wifi className="h-5 w-5 text-green-400" />
              Appareils Connectés ({connectedDevices.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {connectedDevices.map((device) => (
                <div key={device.id} className="p-3 bg-green-500/10 rounded-lg border border-green-500/20">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-white font-medium">{device.device}</p>
                      <p className="text-gray-300 text-sm">{device.phone}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-green-400 text-sm">{device.subscriptionType}</p>
                      <p className="text-gray-400 text-xs">{device.dataUsed} utilisés</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Appareils déconnectés */}
        <Card className="bg-gradient-to-br from-slate-800/80 to-red-900/20 border-red-500/30">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <WifiOff className="h-5 w-5 text-red-400" />
              Appareils Déconnectés ({disconnectedDevices.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {disconnectedDevices.map((device) => (
                <div key={device.id} className="p-3 bg-red-500/10 rounded-lg border border-red-500/20">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-white font-medium">{device.device}</p>
                      <p className="text-gray-300 text-sm">{device.phone}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-red-400 text-sm">{device.subscriptionType}</p>
                      <p className="text-gray-400 text-xs">
                        {device.status === 'suspended' ? 'Suspendu' : 'Inactif'}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SubscriptionPage;
