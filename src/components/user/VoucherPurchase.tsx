
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { ShoppingCart, CreditCard, Ticket, Clock, Calendar, CalendarDays, CalendarRange } from "lucide-react";

interface VoucherPurchaseProps {
  onVoucherValidation: (isValid: boolean) => void;
  userInfo: {
    firstName: string;
    lastName: string;
    phone: string;
    countryCode: string;
  };
}

const VoucherPurchase = ({ onVoucherValidation, userInfo }: VoucherPurchaseProps) => {
  const [selectedType, setSelectedType] = useState("");
  const [voucherCode, setVoucherCode] = useState("");
  const [purchaseData, setPurchaseData] = useState({
    type: "",
    price: 0,
    duration: ""
  });

  const voucherTypes = [
    { id: "heure", label: "Heure", price: 1000, duration: "1 heure", icon: Clock },
    { id: "jour", label: "Jour", price: 5000, duration: "1 jour", icon: Calendar },
    { id: "semaine", label: "Semaine", price: 30000, duration: "1 semaine", icon: CalendarDays },
    { id: "mois", label: "Mois", price: 90000, duration: "1 mois", icon: CalendarRange }
  ];

  const handleTypeChange = (type: string) => {
    setSelectedType(type);
    const selectedVoucher = voucherTypes.find(v => v.id === type);
    if (selectedVoucher) {
      setPurchaseData({
        type: selectedVoucher.label,
        price: selectedVoucher.price,
        duration: selectedVoucher.duration
      });
    }
  };

  const handlePurchase = () => {
    if (!selectedType) return;
    
    // Simulation d'achat réussi
    alert(`Achat réussi! Votre code voucher sera envoyé par SMS au ${userInfo.countryCode} ${userInfo.phone}`);
    
    // Générer un code voucher fictif
    const generatedCode = `GBX${Date.now().toString().slice(-6)}`;
    setVoucherCode(generatedCode);
  };

  const handleCodeValidation = () => {
    if (voucherCode.length >= 6) {
      onVoucherValidation(true);
    } else {
      alert("Code voucher invalide");
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white mb-4">Bienvenue chez GestBox</h2>
        <p className="text-gray-300 text-lg">
          Achetez votre code voucher ou accédez à votre tableau de bord
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Section Achat de Voucher */}
        <Card className="bg-gradient-to-br from-slate-800/80 to-blue-900/80 border-blue-500/30">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <ShoppingCart className="h-5 w-5" />
              Acheter un Code Voucher
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <Label className="text-gray-200">Type de Voucher</Label>
              <Select value={selectedType} onValueChange={handleTypeChange}>
                <SelectTrigger className="bg-slate-700/50 border-blue-500/30 text-white">
                  <SelectValue placeholder="Sélectionnez un type" />
                </SelectTrigger>
                <SelectContent className="bg-slate-700 border-slate-600">
                  {voucherTypes.map((type) => {
                    const IconComponent = type.icon;
                    return (
                      <SelectItem 
                        key={type.id} 
                        value={type.id}
                        className="text-white hover:bg-slate-600"
                      >
                        <div className="flex items-center gap-2">
                          <IconComponent className="h-4 w-4" />
                          <span>{type.label} - {type.price.toLocaleString()} FG</span>
                        </div>
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </div>

            {selectedType && (
              <div className="space-y-4 p-4 bg-slate-700/30 rounded-lg">
                <h4 className="text-white font-semibold">Détails de l'achat</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-300">Type:</span>
                    <span className="text-white">{purchaseData.type}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Durée:</span>
                    <span className="text-white">{purchaseData.duration}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Prix:</span>
                    <span className="text-white font-bold">{purchaseData.price.toLocaleString()} FG</span>
                  </div>
                </div>
                <Separator className="bg-blue-500/30" />
                <Button 
                  onClick={handlePurchase}
                  className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
                >
                  <CreditCard className="h-4 w-4 mr-2" />
                  Acheter Maintenant
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Section Validation de Code */}
        <Card className="bg-gradient-to-br from-slate-800/80 to-blue-900/80 border-blue-500/30">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Ticket className="h-5 w-5" />
              Valider votre Code Voucher
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <Label className="text-gray-200">Code Voucher</Label>
              <Input
                type="text"
                placeholder="Entrez votre code voucher"
                value={voucherCode}
                onChange={(e) => setVoucherCode(e.target.value)}
                className="bg-slate-700/50 border-blue-500/30 text-white placeholder-gray-400"
              />
            </div>

            <Button 
              onClick={handleCodeValidation}
              className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
              disabled={!voucherCode}
            >
              Accéder au Tableau de Bord
            </Button>

            <div className="text-center text-sm text-gray-400">
              <p>Vous avez déjà un code voucher ?</p>
              <p>Entrez-le ci-dessus pour accéder à votre tableau de bord</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default VoucherPurchase;
