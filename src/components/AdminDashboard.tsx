
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Smartphone, 
  Ticket, 
  BarChart3, 
  CreditCard, 
  Settings,
  Users,
  Activity,
  DollarSign
} from "lucide-react";

const AdminDashboard = () => {
  const dashboardItems = [
    {
      title: "Liste des appareils",
      icon: Smartphone,
      description: "Gestion des appareils connectés",
      count: "124",
      color: "bg-blue-500"
    },
    {
      title: "Code Voucher",
      icon: Ticket,
      description: "Gestion des codes de recharge",
      count: "89",
      color: "bg-green-500"
    },
    {
      title: "Consommation",
      icon: BarChart3,
      description: "Suivi de la consommation",
      count: "2.5 GB",
      color: "bg-orange-500"
    },
    {
      title: "Abonnement",
      icon: CreditCard,
      description: "Gestion des abonnements",
      count: "156",
      color: "bg-purple-500"
    },
    {
      title: "Paramètres",
      icon: Settings,
      description: "Configuration système",
      count: "",
      color: "bg-gray-500"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-blue-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">
                Tableau de Bord Administrateur
              </h1>
              <p className="text-gray-300">
                Bienvenue sur votre interface d'administration GESTBOX
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <img 
                src="/lovable-uploads/6d6959de-2520-47ed-9e21-f90d440b8bd1.png" 
                alt="GestBox Logo" 
                className="h-10 w-auto"
              />
            </div>
          </div>
        </div>

        {/* Stats rapides */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Utilisateurs actifs</p>
                  <p className="text-2xl font-bold text-white">1,234</p>
                </div>
                <Users className="h-8 w-8 text-blue-400" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Activité réseau</p>
                  <p className="text-2xl font-bold text-white">98.5%</p>
                </div>
                <Activity className="h-8 w-8 text-green-400" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Revenus du mois</p>
                  <p className="text-2xl font-bold text-white">€12,450</p>
                </div>
                <DollarSign className="h-8 w-8 text-orange-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Modules principaux */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dashboardItems.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <Card 
                key={index}
                className="bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-all duration-300 cursor-pointer group hover:scale-105"
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className={`p-3 rounded-lg ${item.color}`}>
                      <IconComponent className="h-6 w-6 text-white" />
                    </div>
                    {item.count && (
                      <span className="text-2xl font-bold text-white">
                        {item.count}
                      </span>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <CardTitle className="text-white text-lg mb-2 group-hover:text-orange-400 transition-colors">
                    {item.title}
                  </CardTitle>
                  <p className="text-gray-400 text-sm">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
