
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LogOut, Monitor, Activity, Users, Settings } from "lucide-react";
import DeviceList from "./admin/DeviceList";
import ConsumptionPage from "./admin/ConsumptionPage";
import SubscriptionPage from "./admin/SubscriptionPage";
import ParametersPage from "./admin/ParametersPage";

interface AdminDashboardProps {
  onLogout: () => void;
}

const AdminDashboard = ({ onLogout }: AdminDashboardProps) => {
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

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="devices" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8 bg-slate-800/50">
            <TabsTrigger value="devices" className="flex items-center gap-2 text-white data-[state=active]:bg-orange-500">
              <Monitor className="h-4 w-4" />
              Liste des appareils
            </TabsTrigger>
            <TabsTrigger value="consumption" className="flex items-center gap-2 text-white data-[state=active]:bg-orange-500">
              <Activity className="h-4 w-4" />
              Consommation
            </TabsTrigger>
            <TabsTrigger value="subscription" className="flex items-center gap-2 text-white data-[state=active]:bg-orange-500">
              <Users className="h-4 w-4" />
              Abonnés
            </TabsTrigger>
            <TabsTrigger value="parameters" className="flex items-center gap-2 text-white data-[state=active]:bg-orange-500">
              <Settings className="h-4 w-4" />
              Paramètres
            </TabsTrigger>
          </TabsList>

          <TabsContent value="devices">
            <DeviceList />
          </TabsContent>

          <TabsContent value="consumption">
            <ConsumptionPage />
          </TabsContent>

          <TabsContent value="subscription">
            <SubscriptionPage />
          </TabsContent>

          <TabsContent value="parameters">
            <ParametersPage />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default AdminDashboard;
