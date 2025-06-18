import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LogOut, Monitor, Activity, Users, Settings, Ticket, Smartphone, TrendingUp, DollarSign, LayoutDashboard, UserCheck } from "lucide-react";
import { 
  Sidebar, 
  SidebarContent, 
  SidebarGroup, 
  SidebarGroupContent, 
  SidebarGroupLabel, 
  SidebarMenu, 
  SidebarMenuButton, 
  SidebarMenuItem, 
  SidebarProvider,
  SidebarTrigger,
  SidebarHeader,
  SidebarFooter
} from "@/components/ui/sidebar";
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
  const [activeTab, setActiveTab] = useState('dashboard');

  const navigationItems = [
    { id: 'dashboard', label: 'Tableau de bord', icon: LayoutDashboard },
    { id: 'devices', label: 'Appareils', icon: Monitor },
    { id: 'consumption', label: 'Consommation', icon: Activity },
    { id: 'subscription', label: 'Abonnés', icon: Users },
    { id: 'voucher', label: 'Code voucher', icon: Ticket },
    { id: 'parameters', label: 'Paramètres', icon: Settings },
  ];

  // Si une vue spécifique est sélectionnée, l'afficher en plein écran
  if (selectedView !== 'main') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
        {/* Header avec bouton retour */}
        <header className="bg-gradient-to-r from-slate-900 to-blue-900 shadow-xl border-b border-orange-500/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-20">
              <div className="flex items-center space-x-4">
                <img 
                  src="/lovable-uploads/6d6959de-2520-47ed-9e21-f90d440b8bd1.png" 
                  alt="GestBox Logo" 
                  className="h-20 w-auto"
                />
                <div className="flex flex-col">
                  <h1 className="text-3xl font-bold text-black">GestBox</h1>
                  <p className="text-sm text-orange-400">
                    {selectedView === 'total-devices' && 'Total Appareils'}
                    {selectedView === 'total-consumption' && 'Total Consommation'}
                    {selectedView === 'earnings' && 'Montant Gagné'}
                  </p>
                </div>
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

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {selectedView === 'total-devices' && <TotalDevicesPage />}
          {selectedView === 'total-consumption' && <TotalConsumptionPage />}
          {selectedView === 'earnings' && <EarningsPage />}
        </main>
      </div>
    );
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="space-y-6">
            {/* Boutons de statistiques en haut au centre */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                  <div className="text-2xl font-bold text-white">1,250 GNF</div>
                  <p className="text-xs text-gray-400">ce mois-ci</p>
                </CardContent>
              </Card>
            </div>
            <div className="text-white text-center text-lg">
              Sélectionnez un élément dans le menu pour commencer
            </div>
          </div>
        );
      case 'devices':
        return <DeviceList />;
      case 'consumption':
        return <ConsumptionPage />;
      case 'subscription':
        return <SubscriptionPage />;
      case 'voucher':
        return <VoucherCodePage />;
      case 'parameters':
        return <ParametersPage />;
      default:
        return null;
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
        <Sidebar className="border-orange-500/20">
          <SidebarHeader className="p-6 border-b border-orange-500/20">
            <div className="flex items-center space-x-4">
              <img 
                src="/lovable-uploads/6d6959de-2520-47ed-9e21-f90d440b8bd1.png" 
                alt="GestBox Logo" 
                className="h-16 w-auto"
              />
              <div className="flex flex-col">
                <span className="text-black font-bold text-2xl">GestBox</span>
                <span className="text-orange-400 text-sm">Administration</span>
              </div>
            </div>
          </SidebarHeader>

          <SidebarContent className="bg-slate-800/50">
            <SidebarGroup>
              <SidebarGroupLabel className="text-gray-300 text-xs uppercase tracking-wider">
                Navigation
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {navigationItems.map((item) => (
                    <SidebarMenuItem key={item.id}>
                      <SidebarMenuButton
                        onClick={() => setActiveTab(item.id)}
                        isActive={activeTab === item.id}
                        className="text-white hover:bg-orange-500/20 data-[active=true]:bg-orange-500 data-[active=true]:text-white"
                      >
                        <item.icon className="h-4 w-4" />
                        <span>{item.label}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>

          <SidebarFooter className="p-4">
            <Button 
              variant="outline"
              onClick={onLogout}
              className="w-full border-orange-500/30 text-orange-400 hover:bg-orange-500/10"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Déconnexion
            </Button>
          </SidebarFooter>
        </Sidebar>

        <main className="flex-1 flex flex-col">
          <header className="bg-gradient-to-r from-slate-900 to-blue-900 shadow-xl border-b border-orange-500/20 p-4">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="text-white hover:bg-orange-500/20" />
              <div className="flex items-center space-x-4">
                <h1 className="text-xl font-bold text-white">
                  Tableau de Bord Administrateur
                </h1>
                <span className="text-orange-400 text-sm">- GestBox</span>
              </div>
            </div>
          </header>

          <div className="flex-1 p-6">
            {renderContent()}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default AdminDashboard;
