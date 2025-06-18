
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Eye, Smartphone, Wifi, WifiOff, Power } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Device {
  id: string;
  name: string;
  brand: string;
  phone: string;
  status: 'connected' | 'disconnected';
  subscriptionStart: string;
  subscriptionEnd: string;
  totalConsumption: string;
  connectionTime: string;
  isActive: boolean;
}

const DeviceList = () => {
  const { toast } = useToast();
  const [selectedDevice, setSelectedDevice] = useState<Device | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  // Données d'exemple
  const [devices, setDevices] = useState<Device[]>([
    {
      id: "1",
      name: "iPhone 14 Pro",
      brand: "Apple",
      phone: "+224 123 456 789",
      status: "connected",
      subscriptionStart: "01/01/2024",
      subscriptionEnd: "01/01/2025",
      totalConsumption: "15.2 GB",
      connectionTime: "142h 30min",
      isActive: true
    },
    {
      id: "2",
      name: "Samsung Galaxy S23",
      brand: "Samsung",
      phone: "+224 987 654 321",
      status: "disconnected",
      subscriptionStart: "15/02/2024",
      subscriptionEnd: "15/02/2025",
      totalConsumption: "8.7 GB",
      connectionTime: "89h 15min",
      isActive: true
    },
    {
      id: "3",
      name: "MacBook Pro",
      brand: "Apple",
      phone: "+224 555 123 456",
      status: "connected",
      subscriptionStart: "10/03/2024",
      subscriptionEnd: "10/03/2025",
      totalConsumption: "45.8 GB",
      connectionTime: "256h 45min",
      isActive: false
    }
  ]);

  const handleViewDetails = (device: Device) => {
    setSelectedDevice(device);
    setIsDetailModalOpen(true);
  };

  const handleToggleDevice = (deviceId: string, isActive: boolean) => {
    setDevices(devices.map(device => 
      device.id === deviceId 
        ? { ...device, isActive: isActive }
        : device
    ));
    
    toast({
      title: isActive ? "Appareil activé" : "Appareil désactivé",
      description: `L'appareil a été ${isActive ? 'activé' : 'désactivé'} avec succès.`,
    });
  };

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-br from-slate-800/80 to-blue-900/80 border-orange-500/30">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Smartphone className="h-5 w-5" />
            Liste des Appareils
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
                <TableHead className="text-gray-300">État</TableHead>
                <TableHead className="text-gray-300">Actions</TableHead>
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
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Power className={`h-4 w-4 ${device.isActive ? 'text-green-400' : 'text-red-400'}`} />
                      <Switch
                        checked={device.isActive}
                        onCheckedChange={(checked) => handleToggleDevice(device.id, checked)}
                        className="data-[state=checked]:bg-green-600"
                      />
                      <span className={`text-sm ${device.isActive ? 'text-green-400' : 'text-red-400'}`}>
                        {device.isActive ? 'Actif' : 'Inactif'}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleViewDetails(device)}
                      className="border-orange-500/30 text-orange-400 hover:bg-orange-500/10"
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      Détails
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Modal des détails de l'appareil */}
      <Dialog open={isDetailModalOpen} onOpenChange={setIsDetailModalOpen}>
        <DialogContent className="bg-gradient-to-br from-slate-800 to-blue-900 border-orange-500/30 text-white">
          <DialogHeader>
            <DialogTitle className="text-orange-400">
              Détails de l'appareil
            </DialogTitle>
          </DialogHeader>
          {selectedDevice && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-300">Marque</label>
                  <p className="text-white">{selectedDevice.brand}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-300">Nom</label>
                  <p className="text-white">{selectedDevice.name}</p>
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-300">Numéro de téléphone</label>
                <p className="text-white">{selectedDevice.phone}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-300">Début d'abonnement</label>
                  <p className="text-white">{selectedDevice.subscriptionStart}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-300">Fin d'abonnement</label>
                  <p className="text-white">{selectedDevice.subscriptionEnd}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-300">Consommation totale</label>
                  <p className="text-white">{selectedDevice.totalConsumption}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-300">Temps de connexion</label>
                  <p className="text-white">{selectedDevice.connectionTime}</p>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-300">État de l'appareil</label>
                <div className="flex items-center gap-2 mt-1">
                  <Power className={`h-4 w-4 ${selectedDevice.isActive ? 'text-green-400' : 'text-red-400'}`} />
                  <span className={selectedDevice.isActive ? 'text-green-400' : 'text-red-400'}>
                    {selectedDevice.isActive ? 'Actif' : 'Inactif'}
                  </span>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DeviceList;
