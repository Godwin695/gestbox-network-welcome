
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Smartphone, Wifi, WifiOff, Activity, Clock } from "lucide-react";

interface DeviceDetail {
  id: string;
  name: string;
  brand: string;
  phone: string;
  status: 'connected' | 'disconnected';
  lastConnection: string;
  totalUsage: string;
  connectionTime: string;
  location: string;
}

const TotalDevicesPage = () => {
  const devices: DeviceDetail[] = [
    {
      id: "1",
      name: "iPhone 14 Pro",
      brand: "Apple",
      phone: "+224 123 456 789",
      status: "connected",
      lastConnection: "Maintenant",
      totalUsage: "15.2 GB",
      connectionTime: "142h 30min",
      location: "Conakry"
    },
    {
      id: "2",
      name: "Samsung Galaxy S23",
      brand: "Samsung",
      phone: "+224 987 654 321",
      status: "disconnected",
      lastConnection: "Il y a 2h",
      totalUsage: "8.7 GB",
      connectionTime: "89h 15min",
      location: "Kankan"
    },
    {
      id: "3",
      name: "MacBook Pro",
      brand: "Apple",
      phone: "+224 555 123 456",
      status: "connected",
      lastConnection: "Maintenant",
      totalUsage: "45.8 GB",
      connectionTime: "256h 45min",
      location: "Labé"
    },
    {
      id: "4",
      name: "iPad Air",
      brand: "Apple",
      phone: "+224 111 222 333",
      status: "connected",
      lastConnection: "Maintenant",
      totalUsage: "12.3 GB",
      connectionTime: "78h 20min",
      location: "Mamou"
    },
    {
      id: "5",
      name: "Huawei P50",
      brand: "Huawei",
      phone: "+224 444 555 666",
      status: "disconnected",
      lastConnection: "Il y a 1h",
      totalUsage: "6.9 GB",
      connectionTime: "45h 10min",
      location: "Faranah"
    }
  ];

  const connectedDevices = devices.filter(d => d.status === 'connected').length;
  const disconnectedDevices = devices.filter(d => d.status === 'disconnected').length;
  const totalUsage = devices.reduce((sum, device) => {
    const usage = parseFloat(device.totalUsage.replace(' GB', ''));
    return sum + usage;
  }, 0);

  return (
    <div className="space-y-6">
      {/* Statistiques globales */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-slate-800/80 to-blue-900/80 border-orange-500/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-300 flex items-center gap-2">
              <Smartphone className="h-4 w-4" />
              Total Appareils
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{devices.length}</div>
            <p className="text-xs text-gray-400">appareils enregistrés</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-slate-800/80 to-blue-900/80 border-orange-500/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-300 flex items-center gap-2">
              <Wifi className="h-4 w-4" />
              Connectés
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-400">{connectedDevices}</div>
            <p className="text-xs text-gray-400">en ligne maintenant</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-slate-800/80 to-blue-900/80 border-orange-500/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-300 flex items-center gap-2">
              <WifiOff className="h-4 w-4" />
              Déconnectés
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-400">{disconnectedDevices}</div>
            <p className="text-xs text-gray-400">hors ligne</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-slate-800/80 to-blue-900/80 border-orange-500/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-300 flex items-center gap-2">
              <Activity className="h-4 w-4" />
              Usage Total
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{totalUsage.toFixed(1)} GB</div>
            <p className="text-xs text-gray-400">consommation totale</p>
          </CardContent>
        </Card>
      </div>

      {/* Tableau détaillé des appareils */}
      <Card className="bg-gradient-to-br from-slate-800/80 to-blue-900/80 border-orange-500/30">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Smartphone className="h-5 w-5" />
            Détails de Tous les Appareils
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-slate-700">
                <TableHead className="text-gray-300">Appareil</TableHead>
                <TableHead className="text-gray-300">Marque</TableHead>
                <TableHead className="text-gray-300">Téléphone</TableHead>
                <TableHead className="text-gray-300">Statut</TableHead>
                <TableHead className="text-gray-300">Dernière connexion</TableHead>
                <TableHead className="text-gray-300">Usage total</TableHead>
                <TableHead className="text-gray-300">Temps de connexion</TableHead>
                <TableHead className="text-gray-300">Localisation</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {devices.map((device) => (
                <TableRow key={device.id} className="border-slate-700">
                  <TableCell className="text-white font-medium">{device.name}</TableCell>
                  <TableCell className="text-gray-300">{device.brand}</TableCell>
                  <TableCell className="text-gray-300">{device.phone}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {device.status === 'connected' ? (
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
                  <TableCell className="text-gray-300 flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    {device.lastConnection}
                  </TableCell>
                  <TableCell className="text-gray-300">{device.totalUsage}</TableCell>
                  <TableCell className="text-gray-300">{device.connectionTime}</TableCell>
                  <TableCell className="text-gray-300">{device.location}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default TotalDevicesPage;
