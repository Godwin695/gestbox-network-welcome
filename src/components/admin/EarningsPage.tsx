
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DollarSign, TrendingUp, Calendar, CreditCard, Banknote } from "lucide-react";

interface EarningDetail {
  id: string;
  date: string;
  device: string;
  phone: string;
  subscriptionType: string;
  amount: number;
  currency: string;
  paymentMethod: string;
  status: 'paid' | 'pending' | 'failed';
}

const EarningsPage = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('total');

  const earningsData: EarningDetail[] = [
    {
      id: "1",
      date: "17/06/2024",
      device: "iPhone 14 Pro",
      phone: "+224 123 456 789",
      subscriptionType: "Mensuel",
      amount: 25000,
      currency: "GNF",
      paymentMethod: "Orange Money",
      status: "paid"
    },
    {
      id: "2",
      date: "16/06/2024",
      device: "MacBook Pro", 
      phone: "+224 555 123 456",
      subscriptionType: "Hebdomadaire",
      amount: 8000,
      currency: "GNF",
      paymentMethod: "MTN Money",
      status: "paid"
    },
    {
      id: "3",
      date: "15/06/2024",
      device: "Samsung Galaxy S23",
      phone: "+224 987 654 321",
      subscriptionType: "Journalier",
      amount: 2000,
      currency: "GNF",
      paymentMethod: "Moov Money",
      status: "pending"
    },
    {
      id: "4",
      date: "14/06/2024",
      device: "iPad Air",
      phone: "+224 111 222 333",
      subscriptionType: "Mensuel",
      amount: 25000,
      currency: "GNF",
      paymentMethod: "Orange Money",
      status: "paid"
    },
    {
      id: "5",
      date: "13/06/2024",
      device: "Huawei P50",
      phone: "+224 444 555 666",
      subscriptionType: "Hebdomadaire",
      amount: 8000,
      currency: "GNF",
      paymentMethod: "MTN Money",
      status: "failed"
    }
  ];

  // Données simulées pour différentes périodes
  const earningsByPeriod = {
    journalier: 2000,
    hebdomadaire: 16000,
    mensuel: 50000,
    annuel: 600000,
    total: 668000
  };

  const totalEarnings = earningsData
    .filter(item => item.status === 'paid')
    .reduce((sum, item) => sum + item.amount, 0);

  const pendingEarnings = earningsData
    .filter(item => item.status === 'pending')
    .reduce((sum, item) => sum + item.amount, 0);

  const failedEarnings = earningsData
    .filter(item => item.status === 'failed')
    .reduce((sum, item) => sum + item.amount, 0);

  const totalTransactions = earningsData.length;

  const formatAmount = (amount: number, currency: string = 'GNF') => {
    return `${amount.toLocaleString()} ${currency}`;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'bg-green-500/20 text-green-400';
      case 'pending': return 'bg-yellow-500/20 text-yellow-400';
      case 'failed': return 'bg-red-500/20 text-red-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'paid': return 'Payé';
      case 'pending': return 'En attente';
      case 'failed': return 'Échoué';
      default: return status;
    }
  };

  const getPeriodLabel = (period: string) => {
    switch (period) {
      case 'journalier': return 'Revenus Journaliers';
      case 'hebdomadaire': return 'Revenus Hebdomadaires';
      case 'mensuel': return 'Revenus Mensuels';
      case 'annuel': return 'Revenus Annuels';
      case 'total': return 'Revenus Totaux';
      default: return 'Revenus Totaux';
    }
  };

  return (
    <div className="space-y-6">
      {/* Sélecteur de période */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Revenus et Gains</h2>
        <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
          <SelectTrigger className="w-[200px] bg-slate-700 border-slate-600 text-white">
            <SelectValue placeholder="Sélectionner une période" />
          </SelectTrigger>
          <SelectContent className="bg-slate-700 border-slate-600">
            <SelectItem value="journalier">Journalier</SelectItem>
            <SelectItem value="hebdomadaire">Hebdomadaire</SelectItem>
            <SelectItem value="mensuel">Mensuel</SelectItem>
            <SelectItem value="annuel">Annuel</SelectItem>
            <SelectItem value="total">Total</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Statistiques des revenus par période */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card className="bg-gradient-to-br from-slate-800/80 to-blue-900/80 border-orange-500/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-300 flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Journalier
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold text-white">{formatAmount(earningsByPeriod.journalier)}</div>
            <p className="text-xs text-gray-400">aujourd'hui</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-slate-800/80 to-blue-900/80 border-orange-500/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-300 flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Hebdomadaire
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold text-white">{formatAmount(earningsByPeriod.hebdomadaire)}</div>
            <p className="text-xs text-gray-400">cette semaine</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-slate-800/80 to-blue-900/80 border-orange-500/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-300 flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Mensuel
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold text-white">{formatAmount(earningsByPeriod.mensuel)}</div>
            <p className="text-xs text-gray-400">ce mois-ci</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-slate-800/80 to-blue-900/80 border-orange-500/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-300 flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Annuel
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold text-white">{formatAmount(earningsByPeriod.annuel)}</div>
            <p className="text-xs text-gray-400">cette année</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-slate-800/80 to-green-900/80 border-orange-500/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-300 flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              Total
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold text-green-400">{formatAmount(earningsByPeriod.total)}</div>
            <p className="text-xs text-gray-400">depuis le début</p>
          </CardContent>
        </Card>
      </div>

      {/* Statistiques détaillées */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-slate-800/80 to-blue-900/80 border-orange-500/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-300 flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              {getPeriodLabel(selectedPeriod)}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-400">{formatAmount(earningsByPeriod[selectedPeriod as keyof typeof earningsByPeriod])}</div>
            <p className="text-xs text-gray-400">paiements confirmés</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-slate-800/80 to-blue-900/80 border-orange-500/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-300 flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              En Attente
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-400">{formatAmount(pendingEarnings)}</div>
            <p className="text-xs text-gray-400">à confirmer</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-slate-800/80 to-blue-900/80 border-orange-500/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-300 flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Échoués
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-400">{formatAmount(failedEarnings)}</div>
            <p className="text-xs text-gray-400">paiements échoués</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-slate-800/80 to-blue-900/80 border-orange-500/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-300 flex items-center gap-2">
              <CreditCard className="h-4 w-4" />
              Transactions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{totalTransactions}</div>
            <p className="text-xs text-gray-400">ce mois-ci</p>
          </CardContent>
        </Card>
      </div>

      {/* Répartition par méthode de paiement */}
      <Card className="bg-gradient-to-br from-slate-800/80 to-blue-900/80 border-orange-500/30">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Banknote className="h-5 w-5" />
            Répartition par Méthode de Paiement (en Francs Guinéens)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-slate-700/50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-300">Orange Money</span>
                <span className="text-orange-400 font-bold">50,000 GNF</span>
              </div>
              <div className="w-full bg-slate-600 rounded-full h-2">
                <div className="bg-orange-400 h-2 rounded-full" style={{width: '60%'}}></div>
              </div>
            </div>
            <div className="p-4 bg-slate-700/50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-300">MTN Money</span>
                <span className="text-yellow-400 font-bold">16,000 GNF</span>
              </div>
              <div className="w-full bg-slate-600 rounded-full h-2">
                <div className="bg-yellow-400 h-2 rounded-full" style={{width: '25%'}}></div>
              </div>
            </div>
            <div className="p-4 bg-slate-700/50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-300">Moov Money</span>
                <span className="text-blue-400 font-bold">2,000 GNF</span>
              </div>
              <div className="w-full bg-slate-600 rounded-full h-2">
                <div className="bg-blue-400 h-2 rounded-full" style={{width: '15%'}}></div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tableau détaillé des revenus */}
      <Card className="bg-gradient-to-br from-slate-800/80 to-blue-900/80 border-orange-500/30">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <DollarSign className="h-5 w-5" />
            Historique Détaillé des Revenus
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-slate-700">
                <TableHead className="text-gray-300">Date</TableHead>
                <TableHead className="text-gray-300">Appareil</TableHead>
                <TableHead className="text-gray-300">Téléphone</TableHead>
                <TableHead className="text-gray-300">Type Abonnement</TableHead>
                <TableHead className="text-gray-300">Montant (GNF)</TableHead>
                <TableHead className="text-gray-300">Méthode</TableHead>
                <TableHead className="text-gray-300">Statut</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {earningsData.map((item) => (
                <TableRow key={item.id} className="border-slate-700">
                  <TableCell className="text-gray-300">{item.date}</TableCell>
                  <TableCell className="text-white font-medium">{item.device}</TableCell>
                  <TableCell className="text-gray-300">{item.phone}</TableCell>
                  <TableCell className="text-gray-300">{item.subscriptionType}</TableCell>
                  <TableCell className="text-white font-medium">
                    {formatAmount(item.amount, item.currency)}
                  </TableCell>
                  <TableCell className="text-gray-300">{item.paymentMethod}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(item.status)}`}>
                      {getStatusText(item.status)}
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

export default EarningsPage;
