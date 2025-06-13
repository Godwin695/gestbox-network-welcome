
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Network, Shield, Settings, Wifi } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <div className="bg-blue-600 text-white px-3 py-2 rounded-lg font-bold text-xl">
                GESTBOX
              </div>
            </div>
            
            {/* Bouton de connexion */}
            <Button className="bg-blue-600 hover:bg-blue-700">
              Connexion
            </Button>
          </div>
        </div>
      </header>

      {/* Section principale */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Message de bienvenue */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Bienvenue chez GESTBOX
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Votre partenaire de confiance pour tous vos besoins en services réseau. 
            Nous offrons des solutions innovantes et fiables pour optimiser votre infrastructure réseau.
          </p>
        </div>

        {/* Blocs de services */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {/* Service 1 */}
          <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 p-3 bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center">
                <Network className="h-8 w-8 text-blue-600" />
              </div>
              <CardTitle className="text-xl font-semibold text-gray-900">
                Infrastructure Réseau
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center text-gray-600">
                Conception, installation et maintenance de votre infrastructure réseau 
                pour une connectivité optimale et sécurisée.
              </CardDescription>
            </CardContent>
          </Card>

          {/* Service 2 */}
          <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 p-3 bg-green-100 rounded-full w-16 h-16 flex items-center justify-center">
                <Shield className="h-8 w-8 text-green-600" />
              </div>
              <CardTitle className="text-xl font-semibold text-gray-900">
                Sécurité Réseau
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center text-gray-600">
                Protection avancée de vos données avec des solutions de sécurité 
                réseau adaptées à vos besoins spécifiques.
              </CardDescription>
            </CardContent>
          </Card>

          {/* Service 3 */}
          <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 p-3 bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center">
                <Settings className="h-8 w-8 text-purple-600" />
              </div>
              <CardTitle className="text-xl font-semibold text-gray-900">
                Support & Maintenance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center text-gray-600">
                Assistance technique 24/7 et maintenance préventive pour assurer 
                la performance continue de votre réseau.
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        {/* Section supplémentaire avec connectivité */}
        <div className="bg-white rounded-lg shadow-sm p-8 text-center">
          <div className="flex justify-center mb-4">
            <Wifi className="h-12 w-12 text-blue-600" />
          </div>
          <h3 className="text-2xl font-semibold text-gray-900 mb-4">
            Connectivité Haute Performance
          </h3>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Bénéficiez d'une connectivité stable et rapide grâce à nos solutions réseau 
            de dernière génération. Notre expertise vous garantit une infrastructure 
            fiable et évolutive.
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="mb-4">
              <div className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg font-bold text-lg">
                GESTBOX
              </div>
            </div>
            <p className="text-gray-400">
              © 2024 GESTBOX. Tous droits réservés. | Services réseau professionnels
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
