
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { ShoppingCart, CreditCard, Ticket, Clock, Calendar, CalendarDays, CalendarRange, Phone, Wallet, DollarSign } from "lucide-react";

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
  const [duration, setDuration] = useState(1);
  const [selectedPayment, setSelectedPayment] = useState("");
  const [voucherCode, setVoucherCode] = useState("");
  const [purchaseData, setPurchaseData] = useState({
    type: "",
    price: 0,
    totalPrice: 0,
    duration: ""
  });

  const voucherTypes = [
    { id: "heure", label: "Heure", basePrice: 1000, unit: "heure(s)", icon: Clock },
    { id: "jour", label: "Jour", basePrice: 5000, unit: "jour(s)", icon: Calendar },
    { id: "semaine", label: "Semaine", basePrice: 30000, unit: "semaine(s)", icon: CalendarDays },
    { id: "mois", label: "Mois", basePrice: 90000, unit: "mois", icon: CalendarRange }
  ];

  const paymentMethods = [
    { id: "orange", label: "Orange Money", icon: Phone },
    { id: "mtn", label: "MTN Mobile Money", icon: Phone },
    { id: "moov", label: "Moov Money", icon: Phone },
    { id: "visa", label: "Visa Card", icon: CreditCard },
    { id: "mastercard", label: "MasterCard", icon: CreditCard }
  ];

  const handleTypeChange = (type: string) => {
    setSelectedType(type);
    const selectedVoucher = voucherTypes.find(v => v.id === type);
    if (selectedVoucher) {
      const totalPrice = selectedVoucher.basePrice * duration;
      setPurchaseData({
        type: selectedVoucher.label,
        price: selectedVoucher.basePrice,
        totalPrice: totalPrice,
        duration: `${duration} ${selectedVoucher.unit}`
      });
    }
  };

  const handleDurationChange = (newDuration: number) => {
    setDuration(newDuration);
    if (selectedType) {
      const selectedVoucher = voucherTypes.find(v => v.id === selectedType);
      if (selectedVoucher) {
        const totalPrice = selectedVoucher.basePrice * newDuration;
        setPurchaseData(prev => ({
          ...prev,
          totalPrice: totalPrice,
          duration: `${newDuration} ${selectedVoucher.unit}`
        }));
      }
    }
  };

  const handlePurchase = () => {
    if (!selectedType || !selectedPayment) {
      alert("Veuillez sélectionner un type de voucher et un moyen de paiement");
      return;
    }
    
    // Simulation d'achat réussi
    alert(`Achat réussi! Votre code voucher sera envoyé par SMS au ${userInfo.countryCode} ${userInfo.phone}\nMoyen de paiement: ${paymentMethods.find(p => p.id === selectedPayment)?.label}`);
    
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
        <h2 className="text-4xl font-bold text-white mb-4">Bienvenue chez GestBox</h2>
        <p className="text-gray-300 text-lg">
          Achetez votre code voucher ou accédez à votre tableau de bord
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Section Achat de Voucher */}
        <Card className="bg-gradient-to-br from-slate-800/90 to-blue-900/90 border-blue-500/40 shadow-2xl">
          <CardHeader className="border-b border-blue-500/30">
            <CardTitle className="text-white flex items-center gap-3 text-xl">
              <ShoppingCart className="h-6 w-6 text-blue-400" />
              Acheter un Code Voucher
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 p-6">
            <div className="space-y-4">
              <Label className="text-gray-200 text-sm font-medium">Type de Voucher</Label>
              <Select value={selectedType} onValueChange={handleTypeChange}>
                <SelectTrigger className="bg-slate-700/50 border-blue-500/30 text-white h-12">
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
                        <div className="flex items-center gap-3">
                          <IconComponent className="h-4 w-4 text-blue-400" />
                          <span>{type.label} - {type.basePrice.toLocaleString()} FG</span>
                        </div>
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </div>

            {selectedType && (
              <>
                <div className="space-y-4">
                  <Label className="text-gray-200 text-sm font-medium">
                    Durée ({voucherTypes.find(v => v.id === selectedType)?.unit})
                  </Label>
                  <Input
                    type="number"
                    min="1"
                    max="30"
                    value={duration}
                    onChange={(e) => handleDurationChange(Number(e.target.value))}
                    className="bg-slate-700/50 border-blue-500/30 text-white h-12"
                  />
                </div>

                <div className="space-y-4">
                  <Label className="text-gray-200 text-sm font-medium">Moyen de Paiement</Label>
                  <Select value={selectedPayment} onValueChange={setSelectedPayment}>
                    <SelectTrigger className="bg-slate-700/50 border-blue-500/30 text-white h-12">
                      <SelectValue placeholder="Sélectionnez un moyen de paiement" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-700 border-slate-600">
                      {paymentMethods.map((method) => {
                        const IconComponent = method.icon;
                        return (
                          <SelectItem 
                            key={method.id} 
                            value={method.id}
                            className="text-white hover:bg-slate-600"
                          >
                            <div className="flex items-center gap-3">
                              <IconComponent className="h-4 w-4 text-green-400" />
                              <span>{method.label}</span>
                            </div>
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-4 p-6 bg-gradient-to-r from-slate-700/40 to-blue-800/40 rounded-lg border border-blue-500/30">
                  <h4 className="text-white font-semibold text-lg flex items-center gap-2">
                    <DollarSign className="h-5 w-5 text-green-400" />
                    Détails de l'achat
                  </h4>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Type:</span>
                      <span className="text-white font-medium">{purchaseData.type}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Durée:</span>
                      <span className="text-white font-medium">{purchaseData.duration}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Prix unitaire:</span>
                      <span className="text-white font-medium">{purchaseData.price.toLocaleString()} FG</span>
                    </div>
                    <Separator className="bg-blue-500/30" />
                    <div className="flex justify-between items-center text-lg">
                      <span className="text-gray-300">Total:</span>
                      <span className="text-green-400 font-bold">{purchaseData.totalPrice.toLocaleString()} FG</span>
                    </div>
                  </div>
                  <Button 
                    onClick={handlePurchase}
                    className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 h-12 text-lg"
                  >
                    <Wallet className="h-5 w-5 mr-2" />
                    Acheter Maintenant
                  </Button>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Section Validation de Code */}
        <Card className="bg-gradient-to-br from-slate-800/90 to-blue-900/90 border-blue-500/40 shadow-2xl">
          <CardHeader className="border-b border-blue-500/30">
            <CardTitle className="text-white flex items-center gap-3 text-xl">
              <Ticket className="h-6 w-6 text-green-400" />
              Valider votre Code Voucher
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 p-6">
            <div className="space-y-4">
              <Label className="text-gray-200 text-sm font-medium">Code Voucher</Label>
              <Input
                type="text"
                placeholder="Entrez votre code voucher"
                value={voucherCode}
                onChange={(e) => setVoucherCode(e.target.value)}
                className="bg-slate-700/50 border-blue-500/30 text-white placeholder-gray-400 h-12 text-lg"
              />
            </div>

            <Button 
              onClick={handleCodeValidation}
              className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 h-12 text-lg"
              disabled={!voucherCode}
            >
              <Ticket className="h-5 w-5 mr-2" />
              Accéder au Tableau de Bord
            </Button>

            <div className="text-center text-sm text-gray-400 p-4 bg-slate-700/30 rounded-lg">
              <p className="font-medium mb-2">Vous avez déjà un code voucher ?</p>
              <p>Entrez-le ci-dessus pour accéder à votre tableau de bord personnalisé</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default VoucherPurchase;
