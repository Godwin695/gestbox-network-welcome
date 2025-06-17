
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LogOut, Monitor, Activity, Users, Settings, Ticket, Smartphone, TrendingUp, DollarSign } from "lucide-react";
import DeviceList from "./admin/DeviceList";
import ConsumptionPage from "./admin/ConsumptionPage";
import SubscriptionPage from "./admin/SubscriptionPage";
import ParametersPage from "./admin/ParametersPage";
import VoucherCodePage from "./admin/VoucherCodePage";
import TotalDevicesPage from "./admin/TotalDevicesPage";
import TotalConsumptionPage from "./admin/TotalConsumptionPage";
import EarningsPage from "./admin/EarningsPage";

interface AdminDashboardProps {
  onLogout: () => void;
}

const AdminDashboard = ({ onLogout }: AdminDashboardProps) => {
  const [selectedView, setSelectedView] = useState<'main' | 'total-devices' | 'total-consumption' | 'earnings'>('main');

  // Si une vue spécifique est sélectionnée, l'afficher en plein écran
  if (selectedView !== 'main') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
        {/* Header avec bouton retour */}
        <header className="bg-gradient-to-r from-slate-900 to-blue-900 shadow-xl border-b border-orange-500/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center">
                <img 
                  src="/lovable-uploads/6d6959de-2520-47ed-9e21-f90d440b8bd1.png" 
                  alt="GestBox Logo" 
                  className="h-12 w-auto"
                />
                <h1 className="ml-4 text-xl font-bold text-white">
                  {selectedView === 'total-devices' && 'Total Appareils'}
                  {selectedView === 'total-consumption' && 'Total Consommation'}
                  {selectedView === 'earnings' && 'Montant Gagné'}
                </h1>
              </div>
              
              <div className="flex items-center gap-4">
                <Button 
                  variant="outline"
                  onClick={() => setSelectedView('main')}
                  className="border-orange-500/30 text-orange-400 hover:bg-orange-500/10"
                >
                  Retour
                </Button>
                <Button 
                  variant="outline"
                  onClick={onLogout}
                  className="border-orange-500/30 text-orange-400 hover:bg-orange-500/10"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Déconnexion
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* Contenu en plein écran */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {selectedView === 'total-devices' && <TotalDevicesPage />}
          {selectedView === 'total-consumption' && <TotalConsumptionPage />}
          {selectedView === 'earnings' && <EarningsPage />}
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      {/* Header */}
      <header className="bg-gradient-to-r from-slate-900 to-blue-900 shadow-xl border-b border-orange-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <img 
                src="/lovable-uploads/6d6959de-2520-47ed-9e21-f90d440b8bd1.png" 
                alt="GestBox Logo" 
                className="h-12 w-auto"
              />
              <h1 className="ml-4 text-xl font-bold text-white">Tableau de Bord Admin</h1>
            </div>
            
            <Button 
              variant="outline"
              onClick={onLogout}
              className="border-orange-500/30 text-orange-400 hover:bg-orange-500/10"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Déconnexion
            </Button>
          </div>
        </div>
      </header>

      {/* Boutons de statistiques en haut au centre */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card 
            className="bg-gradient-to-br from-slate-800/80 to-blue-900/80 border-orange-500/30 hover:shadow-xl hover:shadow-orange-500/20 transition-all duration-300 cursor-pointer"
            onClick={() => setSelectedView('total-devices')}
          >
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-300 flex items-center gap-2">
                <Smartphone className="h-4 w-4" />
                Total Appareils
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">25</div>
              <p className="text-xs text-gray-400">appareils connectés</p>
            </CardContent>
          </Card>

          <Card 
            className="bg-gradient-to-br from-slate-800/80 to-blue-900/80 border-orange-500/30 hover:shadow-xl hover:shadow-orange-500/20 transition-all duration-300 cursor-pointer"
            onClick={() => setSelectedView('total-consumption')}
          >
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-300 flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                Total Consommation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">1.2TB</div>
              <p className="text-xs text-gray-400">ce mois-ci</p>
            </CardContent>
          </Card>

          <Card 
            className="bg-gradient-to-br from-slate-800/80 to-blue-900/80 border-orange-500/30 hover:shadow-xl hover:shadow-orange-500/20 transition-all duration-300 cursor-pointer"
            onClick={() => setSelectedView('earnings')}
          >
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-300 flex items-center gap-2">
                <DollarSign className="h-4 w-4" />
                Montant Gagné
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">€1,250</div>
              <p className="text-xs text-gray-400">ce mois-ci</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Main Content avec navigation à gauche */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div className="flex gap-6">
          {/* Navigation à gauche */}
          <div className="w-64 flex-shrink-0">
            <Tabs defaultValue="devices" className="w-full" orientation="vertical">
              <TabsList className="flex flex-col h-auto w-full bg-slate-800/50 p-2">
                <TabsTrigger value="devices" className="w-full justify-start text-white data-[state=active]:bg-orange-500 mb-2">
                  <Monitor className="h-4 w-4 mr-2" />
                  Liste des appareils
                </TabsTrigger>
                <TabsTrigger value="consumption" className="w-full justify-start text-white data-[state=active]:bg-orange-500 mb-2">
                  <Activity className="h-4 w-4 mr-2" />
                  Consommation
                </TabsTrigger>
                <TabsTrigger value="subscription" className="w-full justify-start text-white data-[state=active]:bg-orange-500 mb-2">
                  <Users className="h-4 w-4 mr-2" />
                  Abonnés
                </TabsTrigger>
                <TabsTrigger value="voucher" className="w-full justify-start text-white data-[state=active]:bg-orange-500 mb-2">
                  <Ticket className="h-4 w-4 mr-2" />
                  Code voucher
                </TabsTrigger>
                <TabsTrigger value="parameters" className="w-full justify-start text-white data-[state=active]:bg-orange-500">
                  <Settings className="h-4 w-4 mr-2" />
                  Paramètres
                </TabsTrigger>
              </TabsList>

              {/* Contenu à droite */}
              <div className="flex-1 ml-6">
                <TabsContent value="devices">
                  <DeviceList />
                </TabsContent>

                <TabsContent value="consumption">
                  <ConsumptionPage />
                </TabsContent>

                <TabsContent value="subscription">
                  <SubscriptionPage />
                </TabsContent>

                <TabsContent value="voucher">
                  <VoucherCodePage />
                </TabsContent>

                <TabsContent value="parameters">
                  <ParametersPage />
                </TabsContent>
              </div>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
