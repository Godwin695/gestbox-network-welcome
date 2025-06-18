
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Ticket, Copy, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface VoucherCode {
  id: string;
  code: string;
  type: string;
  duration: string;
  phoneNumber: string;
  createdAt: string;
  expiresAt: string;
  isUsed: boolean;
  usedAt?: string;
}

const VoucherCodePage = () => {
  const { toast } = useToast();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    type: 'hours',
    duration: '1',
    phoneNumber: '',
    expirationDays: '30'
  });

  const [voucherCodes, setVoucherCodes] = useState<VoucherCode[]>([
    {
      id: "1",
      code: "HOUR24-ABC123",
      type: "Heures",
      duration: "24h",
      phoneNumber: "+224 123 456 789",
      createdAt: "01/01/2024",
      expiresAt: "31/01/2024",
      isUsed: false
    },
    {
      id: "2",
      code: "DATA5GB-XYZ789",
      type: "Data",
      duration: "5 GB",
      phoneNumber: "+224 987 654 321",
      createdAt: "02/01/2024",
      expiresAt: "01/02/2024",
      isUsed: true,
      usedAt: "15/01/2024"
    }
  ]);

  const generateVoucherCode = () => {
    const prefix = formData.type === 'hours' ? 'HOUR' : 
                   formData.type === 'data' ? 'DATA' : 
                   formData.type === 'days' ? 'DAYS' : 'UNLIM';
    const random = Math.random().toString(36).substring(2, 8).toUpperCase();
    return `${prefix}${formData.duration}-${random}`;
  };

  const handleCreateVoucher = () => {
    if (!formData.phoneNumber.trim()) {
      toast({
        title: "Erreur",
        description: "Le numéro de téléphone est requis.",
        variant: "destructive",
      });
      return;
    }

    const newVoucher: VoucherCode = {
      id: Date.now().toString(),
      code: generateVoucherCode(),
      type: formData.type === 'hours' ? 'Heures' : 
            formData.type === 'data' ? 'Data' : 
            formData.type === 'days' ? 'Jours' : 'Illimité',
      duration: formData.type === 'hours' ? `${formData.duration}h` :
                formData.type === 'data' ? `${formData.duration} GB` :
                formData.type === 'days' ? `${formData.duration} jours` : 'Illimité',
      phoneNumber: formData.phoneNumber,
      createdAt: new Date().toLocaleDateString('fr-FR'),
      expiresAt: new Date(Date.now() + parseInt(formData.expirationDays) * 24 * 60 * 60 * 1000).toLocaleDateString('fr-FR'),
      isUsed: false
    };

    setVoucherCodes([newVoucher, ...voucherCodes]);
    setIsCreateModalOpen(false);
    setFormData({ type: 'hours', duration: '1', phoneNumber: '', expirationDays: '30' });
    
    toast({
      title: "Code voucher créé",
      description: `Le code ${newVoucher.code} a été créé avec succès.`,
    });
  };

  const copyToClipboard = async (code: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedCode(code);
      setTimeout(() => setCopiedCode(null), 2000);
      toast({
        title: "Code copié",
        description: "Le code voucher a été copié dans le presse-papiers.",
      });
    } catch (err) {
      toast({
        title: "Erreur",
        description: "Impossible de copier le code.",
        variant: "destructive",
      });
    }
  };

  const getDurationLabel = (type: string) => {
    switch (type) {
      case 'hours':
        return 'Nombre d\'heures';
      case 'data':
        return 'Quantité de data (GB)';
      case 'days':
        return 'Nombre de jours';
      case 'unlimited':
        return 'Durée (non applicable)';
      default:
        return 'Durée';
    }
  };

  const shouldShowDurationField = (type: string) => {
    return type !== 'unlimited';
  };

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-br from-slate-800/80 to-blue-900/80 border-orange-500/30">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-white flex items-center gap-2">
            <Ticket className="h-5 w-5" />
            Gestion des Codes Voucher
          </CardTitle>
          <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white">
                <Plus className="h-4 w-4 mr-2" />
                Créer Code
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-gradient-to-br from-slate-800 to-blue-900 border-orange-500/30 text-white">
              <DialogHeader>
                <DialogTitle className="text-orange-400">Créer un nouveau code voucher</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="phoneNumber" className="text-gray-300">Numéro de téléphone du client *</Label>
                  <Input
                    id="phoneNumber"
                    type="tel"
                    placeholder="+224 XXX XXX XXX"
                    value={formData.phoneNumber}
                    onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                    className="bg-slate-700/50 text-white border-blue-500/30"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="type" className="text-gray-300">Type de voucher</Label>
                  <select
                    id="type"
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="w-full h-10 px-3 py-2 bg-slate-700/50 text-white border border-blue-500/30 rounded-md"
                  >
                    <option value="hours">Heures</option>
                    <option value="data">Data (GB)</option>
                    <option value="days">Jours</option>
                    <option value="unlimited">Illimité</option>
                  </select>
                </div>

                {shouldShowDurationField(formData.type) && (
                  <div className="space-y-2">
                    <Label htmlFor="duration" className="text-gray-300">
                      {getDurationLabel(formData.type)}
                    </Label>
                    <Input
                      id="duration"
                      type="number"
                      min="1"
                      value={formData.duration}
                      onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                      className="bg-slate-700/50 text-white border-blue-500/30"
                    />
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="expirationDays" className="text-gray-300">Expire dans (jours)</Label>
                  <Input
                    id="expirationDays"
                    type="number"
                    min="1"
                    value={formData.expirationDays}
                    onChange={(e) => setFormData({ ...formData, expirationDays: e.target.value })}
                    className="bg-slate-700/50 text-white border-blue-500/30"
                  />
                </div>

                <Button
                  onClick={handleCreateVoucher}
                  className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700"
                >
                  Générer le Code
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-slate-700">
                <TableHead className="text-gray-300">Code</TableHead>
                <TableHead className="text-gray-300">Type</TableHead>
                <TableHead className="text-gray-300">Durée</TableHead>
                <TableHead className="text-gray-300">Téléphone</TableHead>
                <TableHead className="text-gray-300">Créé le</TableHead>
                <TableHead className="text-gray-300">Expire le</TableHead>
                <TableHead className="text-gray-300">Statut</TableHead>
                <TableHead className="text-gray-300">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {voucherCodes.map((voucher) => (
                <TableRow key={voucher.id} className="border-slate-700">
                  <TableCell className="text-white font-mono font-medium">{voucher.code}</TableCell>
                  <TableCell className="text-gray-300">{voucher.type}</TableCell>
                  <TableCell className="text-gray-300">{voucher.duration}</TableCell>
                  <TableCell className="text-gray-300">{voucher.phoneNumber}</TableCell>
                  <TableCell className="text-gray-300">{voucher.createdAt}</TableCell>
                  <TableCell className="text-gray-300">{voucher.expiresAt}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      voucher.isUsed 
                        ? 'bg-red-500/20 text-red-400' 
                        : 'bg-green-500/20 text-green-400'
                    }`}>
                      {voucher.isUsed ? 'Utilisé' : 'Disponible'}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => copyToClipboard(voucher.code)}
                      className="border-orange-500/30 text-orange-400 hover:bg-orange-500/10"
                    >
                      {copiedCode === voucher.code ? (
                        <Check className="h-4 w-4" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
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

export default VoucherCodePage;
