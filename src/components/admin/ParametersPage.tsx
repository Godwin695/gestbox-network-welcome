import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Settings, Wifi, Shield, Database, Bell, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import AdminAccountsPage from "./AdminAccountsPage";

const ParametersPage = () => {
  const { toast } = useToast();
  const [settings, setSettings] = useState({
    // Paramètres réseau
    maxBandwidth: "100",
    autoReconnect: true,
    connectionTimeout: "30",
    
    // Paramètres de sécurité
    enableFirewall: true,
    enableVPN: false,
    passwordPolicy: "strong",
    
    // Paramètres de base de données
    backupFrequency: "daily",
    dataRetention: "90",
    
    // Notifications
    emailNotifications: true,
    smsNotifications: false,
    alertThreshold: "80"
  });

  const handleSettingChange = (key: string, value: string | boolean) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSaveSettings = () => {
    console.log("Saving settings:", settings);
    toast({
      title: "Paramètres sauvegardés",
      description: "Les paramètres ont été mis à jour avec succès.",
    });
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="system" className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-slate-800/50">
          <TabsTrigger value="system" className="text-white data-[state=active]:bg-orange-500">
            Paramètres Système
          </TabsTrigger>
          <TabsTrigger value="accounts" className="text-white data-[state=active]:bg-orange-500">
            Comptes Administrateurs
          </TabsTrigger>
        </TabsList>

        <TabsContent value="system" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Paramètres réseau */}
            <Card className="bg-gradient-to-br from-slate-800/80 to-blue-900/80 border-orange-500/30">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Wifi className="h-5 w-5" />
                  Paramètres Réseau
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="maxBandwidth" className="text-gray-300">
                    Bande passante maximale (Mbps)
                  </Label>
                  <Input
                    id="maxBandwidth"
                    type="number"
                    value={settings.maxBandwidth}
                    onChange={(e) => handleSettingChange("maxBandwidth", e.target.value)}
                    className="bg-slate-700/50 text-white border-blue-500/30"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="autoReconnect" className="text-gray-300">
                    Reconnexion automatique
                  </Label>
                  <Switch
                    id="autoReconnect"
                    checked={settings.autoReconnect}
                    onCheckedChange={(checked) => handleSettingChange("autoReconnect", checked)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="connectionTimeout" className="text-gray-300">
                    Timeout de connexion (secondes)
                  </Label>
                  <Input
                    id="connectionTimeout"
                    type="number"
                    value={settings.connectionTimeout}
                    onChange={(e) => handleSettingChange("connectionTimeout", e.target.value)}
                    className="bg-slate-700/50 text-white border-blue-500/30"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Paramètres de sécurité */}
            <Card className="bg-gradient-to-br from-slate-800/80 to-blue-900/80 border-orange-500/30">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Paramètres de Sécurité
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="enableFirewall" className="text-gray-300">
                    Activer le pare-feu
                  </Label>
                  <Switch
                    id="enableFirewall"
                    checked={settings.enableFirewall}
                    onCheckedChange={(checked) => handleSettingChange("enableFirewall", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="enableVPN" className="text-gray-300">
                    Activer le VPN
                  </Label>
                  <Switch
                    id="enableVPN"
                    checked={settings.enableVPN}
                    onCheckedChange={(checked) => handleSettingChange("enableVPN", checked)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="passwordPolicy" className="text-gray-300">
                    Politique de mot de passe
                  </Label>
                  <select
                    id="passwordPolicy"
                    value={settings.passwordPolicy}
                    onChange={(e) => handleSettingChange("passwordPolicy", e.target.value)}
                    className="w-full h-10 px-3 py-2 bg-slate-700/50 text-white border border-blue-500/30 rounded-md"
                  >
                    <option value="weak">Faible</option>
                    <option value="medium">Moyenne</option>
                    <option value="strong">Forte</option>
                  </select>
                </div>
              </CardContent>
            </Card>

            {/* Paramètres de base de données */}
            <Card className="bg-gradient-to-br from-slate-800/80 to-blue-900/80 border-orange-500/30">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Database className="h-5 w-5" />
                  Base de Données
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="backupFrequency" className="text-gray-300">
                    Fréquence de sauvegarde
                  </Label>
                  <select
                    id="backupFrequency"
                    value={settings.backupFrequency}
                    onChange={(e) => handleSettingChange("backupFrequency", e.target.value)}
                    className="w-full h-10 px-3 py-2 bg-slate-700/50 text-white border border-blue-500/30 rounded-md"
                  >
                    <option value="hourly">Toutes les heures</option>
                    <option value="daily">Quotidienne</option>
                    <option value="weekly">Hebdomadaire</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dataRetention" className="text-gray-300">
                    Rétention des données (jours)
                  </Label>
                  <Input
                    id="dataRetention"
                    type="number"
                    value={settings.dataRetention}
                    onChange={(e) => handleSettingChange("dataRetention", e.target.value)}
                    className="bg-slate-700/50 text-white border-blue-500/30"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Paramètres de notifications */}
            <Card className="bg-gradient-to-br from-slate-800/80 to-blue-900/80 border-orange-500/30">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Notifications
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="emailNotifications" className="text-gray-300">
                    Notifications par email
                  </Label>
                  <Switch
                    id="emailNotifications"
                    checked={settings.emailNotifications}
                    onCheckedChange={(checked) => handleSettingChange("emailNotifications", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="smsNotifications" className="text-gray-300">
                    Notifications par SMS
                  </Label>
                  <Switch
                    id="smsNotifications"
                    checked={settings.smsNotifications}
                    onCheckedChange={(checked) => handleSettingChange("smsNotifications", checked)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="alertThreshold" className="text-gray-300">
                    Seuil d'alerte utilisation (%)
                  </Label>
                  <Input
                    id="alertThreshold"
                    type="number"
                    min="0"
                    max="100"
                    value={settings.alertThreshold}
                    onChange={(e) => handleSettingChange("alertThreshold", e.target.value)}
                    className="bg-slate-700/50 text-white border-blue-500/30"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Bouton de sauvegarde */}
          <div className="flex justify-end">
            <Button
              onClick={handleSaveSettings}
              className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white"
            >
              <Settings className="h-4 w-4 mr-2" />
              Sauvegarder les Paramètres
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="accounts">
          <AdminAccountsPage />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ParametersPage;
