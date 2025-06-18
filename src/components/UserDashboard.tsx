
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LogOut, ArrowLeft } from "lucide-react";
import VoucherPurchase from "./user/VoucherPurchase";
import UserConsumptionDashboard from "./user/UserConsumptionDashboard";

interface UserDashboardProps {
  onLogout: () => void;
  userInfo: {
    firstName: string;
    lastName: string;
    phone: string;
    countryCode: string;
  };
}

const UserDashboard = ({ onLogout, userInfo }: UserDashboardProps) => {
  const [activeView, setActiveView] = useState<'purchase' | 'dashboard'>('purchase');
  const [hasValidVoucher, setHasValidVoucher] = useState(false);

  const handleVoucherValidation = (isValid: boolean) => {
    setHasValidVoucher(isValid);
    if (isValid) {
      setActiveView('dashboard');
    }
  };

  const merchantCode = "GESTBOX2024";

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      {/* Header */}
      <header className="bg-gradient-to-r from-slate-900 to-blue-900 shadow-xl border-b border-blue-500/20">
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
                <p className="text-sm text-blue-400">Espace Client</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-white font-medium">
                  {userInfo.firstName} {userInfo.lastName}
                </p>
                <p className="text-blue-400 text-sm">
                  {userInfo.countryCode} {userInfo.phone}
                </p>
              </div>
              
              {activeView === 'dashboard' && (
                <Button 
                  variant="outline"
                  onClick={() => setActiveView('purchase')}
                  className="border-blue-500/30 text-blue-400 hover:bg-blue-500/10"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Retour
                </Button>
              )}
              
              <Button 
                variant="outline"
                onClick={onLogout}
                className="border-blue-500/30 text-blue-400 hover:bg-blue-500/10"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Déconnexion
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Code Marchand Display */}
      <div className="bg-gradient-to-r from-blue-900 to-slate-900 py-4 border-b border-blue-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-blue-400 text-sm mb-2">Code Marchand GESTBOX</p>
            <div className="inline-block bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-2 rounded-lg font-bold text-lg tracking-wider">
              {merchantCode}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeView === 'purchase' ? (
          <VoucherPurchase 
            onVoucherValidation={handleVoucherValidation}
            userInfo={userInfo}
          />
        ) : (
          <UserConsumptionDashboard 
            userInfo={userInfo}
            hasValidVoucher={hasValidVoucher}
          />
        )}
      </main>
    </div>
  );
};

export default UserDashboard;
