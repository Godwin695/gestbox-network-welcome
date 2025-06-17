
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { TrendingUp, Download, Upload, Calendar, BarChart3 } from "lucide-react";

interface ConsumptionDetail {
  id: string;
  date: string;
  device: string;
  phone: string;
  downloadUsage: string;
  uploadUsage: string;
  totalUsage: string;
  duration: string;
}

const TotalConsumptionPage = () => {
  const consumptionData: ConsumptionDetail[] = [
    {
      id: "1",
      date: "17/06/2024",
      device: "iPhone 14 Pro",
      phone: "+224 123 456 789",
      downloadUsage: "2.3 GB",
      uploadUsage: "0.5 GB",
      totalUsage: "2.8 GB",
      duration: "4h 30min"
    },
    {
      id: "2",
      date: "17/06/2024",
      device: "MacBook Pro",
      phone: "+224 555 123 456",
      downloadUsage: "5.7 GB",
      uploadUsage: "1.2 GB",
      totalUsage: "6.9 GB",
      duration: "8h 15min"
    },
    {
      id: "3",
      date: "16/06/2024",
      device: "Samsung Galaxy S23",
      phone: "+224 987 654 321",
      downloadUsage: "1.8 GB",
      uploadUsage: "0.3 GB",
      totalUsage: "2.1 GB",
      duration: "3h 45min"
    },
    {
      id: "4",
      date: "16/06/2024",
      device: "iPad Air",
      phone: "+224 111 222 333",
      downloadUsage: "3.2 GB",
      uploadUsage: "0.8 GB",
      totalUsage: "4.0 GB",
      duration: "6h 20min"
    },
    {
      id: "5",
      date: "15/06/2024",
      device: "Huawei P50",
      phone: "+224 444 555 666",
      downloadUsage: "1.5 GB",
      uploadUsage: "0.2 GB",
      totalUsage: "1.7 GB",
      duration: "2h 45min"
    }
  ];

  const totalDownload = consumptionData.reduce((sum, item) => {
    const download = parseFloat(item.downloadUsage.replace(' GB', ''));
    return sum + download;
  }, 0);

  const totalUpload = consumptionData.reduce((sum, item) => {
    const upload = parseFloat(item.uploadUsage.replace(' GB', ''));
    return sum + upload;
  }, 0);

  const grandTotal = totalDownload + totalUpload;

  const totalDuration = consumptionData.reduce((sum, item) => {
    const parts = item.duration.split(' ');
    const hours = parseInt(parts[0].replace('h', ''));
    const minutes = parseInt(parts[1].replace('min', ''));
    return sum + (hours * 60) + minutes;
  }, 0);

  const totalHours = Math.floor(totalDuration / 60);
  const totalMinutes = totalDuration % 60;

  return (
    <div className="space-y-6">
      {/* Statistiques globales de consommation */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-slate-800/80 to-blue-900/80 border-orange-500/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-300 flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Consommation Totale
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{grandTotal.toFixed(1)} GB</div>
            <p className="text-xs text-gray-400">tous appareils confondus</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-slate-800/80 to-blue-900/80 border-orange-500/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-300 flex items-center gap-2">
              <Download className="h-4 w-4" />
              Total Téléchargement
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-400">{totalDownload.toFixed(1)} GB</div>
            <p className="text-xs text-gray-400">données téléchargées</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-slate-800/80 to-blue-900/80 border-orange-500/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-300 flex items-center gap-2">
              <Upload className="h-4 w-4" />
              Total Upload
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-400">{totalUpload.toFixed(1)} GB</div>
            <p className="text-xs text-gray-400">données envoyées</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-slate-800/80 to-blue-900/80 border-orange-500/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-300 flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Temps Total
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-400">{totalHours}h {totalMinutes}min</div>
            <p className="text-xs text-gray-400">temps d'utilisation</p>
          </CardContent>
        </Card>
      </div>

      {/* Graphique de consommation par jour (simulation) */}
      <Card className="bg-gradient-to-br from-slate-800/80 to-blue-900/80 border-orange-500/30">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Évolution de la Consommation
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-4 bg-slate-700/50 rounded-lg">
              <span className="text-gray-300">17/06/2024</span>
              <div className="flex items-center gap-4">
                <span className="text-blue-400">9.7 GB</span>
                <div className="w-32 bg-slate-600 rounded-full h-2">
                  <div className="bg-blue-400 h-2 rounded-full" style={{width: '80%'}}></div>
                </div>
              </div>
            </div>
            <div className="flex justify-between items-center p-4 bg-slate-700/50 rounded-lg">
              <span className="text-gray-300">16/06/2024</span>
              <div className="flex items-center gap-4">
                <span className="text-blue-400">6.1 GB</span>
                <div className="w-32 bg-slate-600 rounded-full h-2">
                  <div className="bg-blue-400 h-2 rounded-full" style={{width: '50%'}}></div>
                </div>
              </div>
            </div>
            <div className="flex justify-between items-center p-4 bg-slate-700/50 rounded-lg">
              <span className="text-gray-300">15/06/2024</span>
              <div className="flex items-center gap-4">
                <span className="text-blue-400">1.7 GB</span>
                <div className="w-32 bg-slate-600 rounded-full h-2">
                  <div className="bg-blue-400 h-2 rounded-full" style={{width: '14%'}}></div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tableau détaillé de consommation */}
      <Card className="bg-gradient-to-br from-slate-800/80 to-blue-900/80 border-orange-500/30">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Détails de Consommation par Appareil
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-slate-700">
                <TableHead className="text-gray-300">Date</TableHead>
                <TableHead className="text-gray-300">Appareil</TableHead>
                <TableHead className="text-gray-300">Téléphone</TableHead>
                <TableHead className="text-gray-300">Téléchargement</TableHead>
                <TableHead className="text-gray-300">Upload</TableHead>
                <TableHead className="text-gray-300">Total</TableHead>
                <TableHead className="text-gray-300">Durée</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {consumptionData.map((item) => (
                <TableRow key={item.id} className="border-slate-700">
                  <TableCell className="text-gray-300">{item.date}</TableCell>
                  <TableCell className="text-white font-medium">{item.device}</TableCell>
                  <TableCell className="text-gray-300">{item.phone}</TableCell>
                  <TableCell className="text-blue-400">{item.downloadUsage}</TableCell>
                  <TableCell className="text-green-400">{item.uploadUsage}</TableCell>
                  <TableCell className="text-white font-medium">{item.totalUsage}</TableCell>
                  <TableCell className="text-gray-300">{item.duration}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default TotalConsumptionPage;
