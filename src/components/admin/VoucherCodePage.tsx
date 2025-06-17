
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Ticket, Plus, Eye, Clock, Calendar, Timer } from "lucide-react";
import { useForm } from "react-hook-form";

interface VoucherCode {
  id: string;
  code: string;
  type: 'heure' | 'jour' | 'semaine' | 'mois';
  dateCreation: string;
  heureCreation: string;
  dureeAutorisee: string;
  statut: 'actif' | 'utilise' | 'expire';
}

const VoucherCodePage = () => {
  const [voucherCodes, setVoucherCodes] = useState<VoucherCode[]>([
    {
      id: "1",
      code: "HOUR-2024-001",
      type: "heure",
      dateCreation: "17/06/2024",
      heureCreation: "14:30",
      dureeAutorisee: "1 heure",
      statut: "actif"
    },
    {
      id: "2",
      code: "DAY-2024-002",
      type: "jour",
      dateCreation: "16/06/2024",
      heureCreation: "09:15",
      dureeAutorisee: "24 heures",
      statut: "utilise"
    },
    {
      id: "3",
      code: "WEEK-2024-003",
      type: "semaine",
      dateCreation: "15/06/2024",
      heureCreation: "11:45",
      dureeAutorisee: "7 jours",
      statut: "actif"
    }
  ]);

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedVoucher, setSelectedVoucher] = useState<VoucherCode | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  const form = useForm();

  const generateVoucherCode = (type: string) => {
    const prefix = type.toUpperCase().slice(0, 4);
    const date = new Date();
    const year = date.getFullYear();
    const randomNum = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `${prefix}-${year}-${randomNum}`;
  };

  const getDureeByType = (type: string) => {
    switch (type) {
      case 'heure': return '1 heure';
      case 'jour': return '24 heures';
      case 'semaine': return '7 jours';
      case 'mois': return '30 jours';
      default: return '1 heure';
    }
  };

  const handleCreateVoucher = (data: any) => {
    const now = new Date();
    const newVoucher: VoucherCode = {
      id: (voucherCodes.length + 1).toString(),
      code: generateVoucherCode(data.type),
      type: data.type,
      dateCreation: now.toLocaleDateString('fr-FR'),
      heureCreation: now.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
      dureeAutorisee: getDureeByType(data.type),
      statut: 'actif'
    };

    setVoucherCodes([...voucherCodes, newVoucher]);
    setIsCreateModalOpen(false);
    form.reset();
  };

  const handleViewDetails = (voucher: VoucherCode) => {
    setSelectedVoucher(voucher);
    setIsDetailModalOpen(true);
  };

  const getStatusColor = (statut: string) => {
    switch (statut) {
      case 'actif': return 'bg-green-500/20 text-green-400';
      case 'utilise': return 'bg-blue-500/20 text-blue-400';
      case 'expire': return 'bg-red-500/20 text-red-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'heure': return <Clock className="h-4 w-4" />;
      case 'jour': return <Calendar className="h-4 w-4" />;
      case 'semaine': return <Timer className="h-4 w-4" />;
      case 'mois': return <Calendar className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* En-tête avec bouton de création */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Gestion des Codes Voucher</h2>
        <Button
          onClick={() => setIsCreateModalOpen(true)}
          className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white"
        >
          <Plus className="h-4 w-4 mr-2" />
          Créer un code voucher
        </Button>
      </div>

      {/* Statistiques des vouchers */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-slate-800/80 to-blue-900/80 border-orange-500/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-300 flex items-center gap-2">
              <Ticket className="h-4 w-4" />
              Total vouchers
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{voucherCodes.length}</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-slate-800/80 to-blue-900/80 border-orange-500/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">Actifs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-400">
              {voucherCodes.filter(v => v.statut === 'actif').length}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-slate-800/80 to-blue-900/80 border-orange-500/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">Utilisés</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-400">
              {voucherCodes.filter(v => v.statut === 'utilise').length}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-slate-800/80 to-blue-900/80 border-orange-500/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">Expirés</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-400">
              {voucherCodes.filter(v => v.statut === 'expire').length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tableau des codes voucher */}
      <Card className="bg-gradient-to-br from-slate-800/80 to-blue-900/80 border-orange-500/30">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Ticket className="h-5 w-5" />
            Liste des Codes Voucher
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-slate-700">
                <TableHead className="text-gray-300">Code</TableHead>
                <TableHead className="text-gray-300">Type</TableHead>
                <TableHead className="text-gray-300">Date création</TableHead>
                <TableHead className="text-gray-300">Heure création</TableHead>
                <TableHead className="text-gray-300">Durée autorisée</TableHead>
                <TableHead className="text-gray-300">Statut</TableHead>
                <TableHead className="text-gray-300">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {voucherCodes.map((voucher) => (
                <TableRow key={voucher.id} className="border-slate-700">
                  <TableCell className="text-white font-medium">{voucher.code}</TableCell>
                  <TableCell className="text-gray-300">
                    <div className="flex items-center gap-2">
                      {getTypeIcon(voucher.type)}
                      {voucher.type}
                    </div>
                  </TableCell>
                  <TableCell className="text-gray-300">{voucher.dateCreation}</TableCell>
                  <TableCell className="text-gray-300">{voucher.heureCreation}</TableCell>
                  <TableCell className="text-gray-300">{voucher.dureeAutorisee}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(voucher.statut)}`}>
                      {voucher.statut}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleViewDetails(voucher)}
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

      {/* Modal de création */}
      <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
        <DialogContent className="bg-gradient-to-br from-slate-800 to-blue-900 border-orange-500/30 text-white">
          <DialogHeader>
            <DialogTitle className="text-orange-400">Créer un nouveau code voucher</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleCreateVoucher)} className="space-y-4">
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-300">Type de voucher</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                          <SelectValue placeholder="Sélectionner un type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-slate-700 border-slate-600">
                        <SelectItem value="heure">Heure (1h)</SelectItem>
                        <SelectItem value="jour">Jour (24h)</SelectItem>
                        <SelectItem value="semaine">Semaine (7j)</SelectItem>
                        <SelectItem value="mois">Mois (30j)</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-end gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="border-slate-600 text-gray-300"
                >
                  Annuler
                </Button>
                <Button
                  type="submit"
                  className="bg-orange-500 hover:bg-orange-600 text-white"
                >
                  Créer le voucher
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Modal des détails */}
      <Dialog open={isDetailModalOpen} onOpenChange={setIsDetailModalOpen}>
        <DialogContent className="bg-gradient-to-br from-slate-800 to-blue-900 border-orange-500/30 text-white">
          <DialogHeader>
            <DialogTitle className="text-orange-400">Détails du code voucher</DialogTitle>
          </DialogHeader>
          {selectedVoucher && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-300">Code</label>
                  <p className="text-white font-mono">{selectedVoucher.code}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-300">Type</label>
                  <p className="text-white">{selectedVoucher.type}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-300">Date de création</label>
                  <p className="text-white">{selectedVoucher.dateCreation}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-300">Heure de création</label>
                  <p className="text-white">{selectedVoucher.heureCreation}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-300">Durée autorisée</label>
                  <p className="text-white">{selectedVoucher.dureeAutorisee}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-300">Statut</label>
                  <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(selectedVoucher.statut)}`}>
                    {selectedVoucher.statut}
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

export default VoucherCodePage;
