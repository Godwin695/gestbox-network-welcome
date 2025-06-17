
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Activity, Download, Upload, Clock } from "lucide-react";

interface ConsumptionData {
  id: string;
  device: string;
  phone: string;
  downloadSpeed: string;
  uploadSpeed: string;
  currentUsage: string;
  lastActivity: string;
  status: 'active' | 'idle';
}

const ConsumptionPage = () => {
  // Données d'exemple en temps réel
  const consumptionData: ConsumptionData[] = [
    {
      id: "1",
      device: "iPhone 14 Pro",
      phone: "+224 123 456 789",
      downloadSpeed: "25.4 Mbps",
      uploadSpeed: "12.8 Mbps",
      currentUsage: "2.3 GB",
      lastActivity: "Il y a 2 min",
      status: "active"
    },
    {
      id: "2",
      device: "MacBook Pro",
      phone: "+224 555 123 456",
      downloadSpeed: "45.7 Mbps",
      uploadSpeed: "18.2 Mbps",
      currentUsage: "5.7 GB",
      lastActivity: "Il y a 1 min",
      status: "active"
    },
    {
      id: "3",
      device: "Samsung Galaxy S23",
      phone: "+224 987 654 321",
      downloadSpeed: "0 Mbps",
      uploadSpeed: "0 Mbps",
      currentUsage: "0 GB",
      lastActivity: "Il y a 45 min",
      status: "idle"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Statistiques globales */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-slate-800/80 to-blue-900/80 border-orange-500/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-300 flex items-center gap-2">
              <Activity className="h-4 w-4" />
              Appareils actifs
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">2</div>
            <p className="text-xs text-gray-400">sur 3 appareils</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-slate-800/80 to-blue-900/80 border-orange-500/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-300 flex items-center gap-2">
              <Download className="h-4 w-4" />
              Vitesse moyenne DL
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">35.6</div>
            <p className="text-xs text-gray-400">Mbps</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-slate-800/80 to-blue-900/80 border-orange-500/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-300 flex items-center gap-2">
              <Upload className="h-4 w-4" />
              Vitesse moyenne UL
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">15.5</div>
            <p className="text-xs text-gray-400">Mbps</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-slate-800/80 to-blue-900/80 border-orange-500/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-300 flex items-center gap-2">
              <Activity className="h-4 w-4" />
              Consommation totale
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">8.0</div>
            <p className="text-xs text-gray-400">GB aujourd'hui</p>
          </CardContent>
        </Card>
      </div>

      {/* Tableau de consommation en temps réel */}
      <Card className="bg-gradient-to-br from-slate-800/80 to-blue-900/80 border-orange-500/30">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Consommation en Temps Réel
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-slate-700">
                <TableHead className="text-gray-300">Appareil</TableHead>
                <TableHead className="text-gray-300">Téléphone</TableHead>
                <TableHead className="text-gray-300">Vitesse DL</TableHead>
                <TableHead className="text-gray-300">Vitesse UL</TableHead>
                <TableHead className="text-gray-300">Usage actuel</TableHead>
                <TableHead className="text-gray-300">Dernière activité</TableHead>
                <TableHead className="text-gray-300">Statut</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {consumptionData.map((item) => (
                <TableRow key={item.id} className="border-slate-700">
                  <TableCell className="text-white font-medium">{item.device}</TableCell>
                  <TableCell className="text-gray-300">{item.phone}</TableCell>
                  <TableCell className="text-gray-300">{item.downloadSpeed}</TableCell>
                  <TableCell className="text-gray-300">{item.uploadSpeed}</TableCell>
                  <TableCell className="text-gray-300">{item.currentUsage}</TableCell>
                  <TableCell className="text-gray-300 flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    {item.lastActivity}
                  </TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      item.status === 'active' 
                        ? 'bg-green-500/20 text-green-400' 
                        : 'bg-gray-500/20 text-gray-400'
                    }`}>
                      {item.status === 'active' ? 'Actif' : 'Inactif'}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default ConsumptionPage;
