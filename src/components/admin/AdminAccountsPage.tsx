
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { UserPlus, Edit, Trash2, Users, Eye, EyeOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AdminAccount {
  id: string;
  username: string;
  email: string;
  role: string;
  createdAt: string;
  lastLogin: string;
  status: 'active' | 'inactive';
}

const AdminAccountsPage = () => {
  const { toast } = useToast();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState<AdminAccount | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'admin'
  });

  const [adminAccounts, setAdminAccounts] = useState<AdminAccount[]>([
    {
      id: "1",
      username: "admin_principal",
      email: "admin@gestbox.com",
      role: "Super Admin",
      createdAt: "01/01/2024",
      lastLogin: "Aujourd'hui à 14:30",
      status: "active"
    },
    {
      id: "2",
      username: "admin_support",
      email: "support@gestbox.com",
      role: "Admin",
      createdAt: "15/01/2024",
      lastLogin: "Hier à 16:45",
      status: "active"
    }
  ]);

  const handleCreateAdmin = () => {
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Erreur",
        description: "Les mots de passe ne correspondent pas.",
        variant: "destructive",
      });
      return;
    }

    const newAdmin: AdminAccount = {
      id: Date.now().toString(),
      username: formData.username,
      email: formData.email,
      role: formData.role,
      createdAt: new Date().toLocaleDateString('fr-FR'),
      lastLogin: "Jamais",
      status: "active"
    };

    setAdminAccounts([...adminAccounts, newAdmin]);
    setIsCreateModalOpen(false);
    setFormData({ username: '', email: '', password: '', confirmPassword: '', role: 'admin' });
    
    toast({
      title: "Compte créé",
      description: "Le compte administrateur a été créé avec succès.",
    });
  };

  const handleEditAdmin = () => {
    if (!selectedAdmin) return;

    const updatedAccounts = adminAccounts.map(admin =>
      admin.id === selectedAdmin.id
        ? { ...admin, username: formData.username, email: formData.email, role: formData.role }
        : admin
    );

    setAdminAccounts(updatedAccounts);
    setIsEditModalOpen(false);
    setSelectedAdmin(null);
    setFormData({ username: '', email: '', password: '', confirmPassword: '', role: 'admin' });
    
    toast({
      title: "Compte modifié",
      description: "Le compte administrateur a été modifié avec succès.",
    });
  };

  const handleDeleteAdmin = (adminId: string) => {
    setAdminAccounts(adminAccounts.filter(admin => admin.id !== adminId));
    toast({
      title: "Compte supprimé",
      description: "Le compte administrateur a été supprimé.",
    });
  };

  const openEditModal = (admin: AdminAccount) => {
    setSelectedAdmin(admin);
    setFormData({
      username: admin.username,
      email: admin.email,
      password: '',
      confirmPassword: '',
      role: admin.role
    });
    setIsEditModalOpen(true);
  };

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-br from-slate-800/80 to-blue-900/80 border-orange-500/30">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-white flex items-center gap-2">
            <Users className="h-5 w-5" />
            Gestion des Comptes Administrateurs
          </CardTitle>
          <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white">
                <UserPlus className="h-4 w-4 mr-2" />
                Ajouter Admin
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-gradient-to-br from-slate-800 to-blue-900 border-orange-500/30 text-white">
              <DialogHeader>
                <DialogTitle className="text-orange-400">Créer un compte administrateur</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="username" className="text-gray-300">Nom d'utilisateur</Label>
                  <Input
                    id="username"
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    className="bg-slate-700/50 text-white border-blue-500/30"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-300">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="bg-slate-700/50 text-white border-blue-500/30"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-gray-300">Mot de passe</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      className="bg-slate-700/50 text-white border-blue-500/30 pr-10"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-gray-400" />
                      ) : (
                        <Eye className="h-4 w-4 text-gray-400" />
                      )}
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-gray-300">Confirmer mot de passe</Label>
                  <Input
                    id="confirmPassword"
                    type={showPassword ? "text" : "password"}
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    className="bg-slate-700/50 text-white border-blue-500/30"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role" className="text-gray-300">Rôle</Label>
                  <select
                    id="role"
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="w-full h-10 px-3 py-2 bg-slate-700/50 text-white border border-blue-500/30 rounded-md"
                  >
                    <option value="admin">Admin</option>
                    <option value="super_admin">Super Admin</option>
                    <option value="moderator">Modérateur</option>
                  </select>
                </div>
                <Button
                  onClick={handleCreateAdmin}
                  className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700"
                >
                  Créer le compte
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-slate-700">
                <TableHead className="text-gray-300">Nom d'utilisateur</TableHead>
                <TableHead className="text-gray-300">Email</TableHead>
                <TableHead className="text-gray-300">Rôle</TableHead>
                <TableHead className="text-gray-300">Créé le</TableHead>
                <TableHead className="text-gray-300">Dernière connexion</TableHead>
                <TableHead className="text-gray-300">Statut</TableHead>
                <TableHead className="text-gray-300">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {adminAccounts.map((admin) => (
                <TableRow key={admin.id} className="border-slate-700">
                  <TableCell className="text-white font-medium">{admin.username}</TableCell>
                  <TableCell className="text-gray-300">{admin.email}</TableCell>
                  <TableCell className="text-gray-300">{admin.role}</TableCell>
                  <TableCell className="text-gray-300">{admin.createdAt}</TableCell>
                  <TableCell className="text-gray-300">{admin.lastLogin}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      admin.status === 'active' 
                        ? 'bg-green-500/20 text-green-400' 
                        : 'bg-red-500/20 text-red-400'
                    }`}>
                      {admin.status === 'active' ? 'Actif' : 'Inactif'}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => openEditModal(admin)}
                        className="border-blue-500/30 text-blue-400 hover:bg-blue-500/10"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDeleteAdmin(admin.id)}
                        className="border-red-500/30 text-red-400 hover:bg-red-500/10"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Modal de modification */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="bg-gradient-to-br from-slate-800 to-blue-900 border-orange-500/30 text-white">
          <DialogHeader>
            <DialogTitle className="text-orange-400">Modifier le compte administrateur</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="edit-username" className="text-gray-300">Nom d'utilisateur</Label>
              <Input
                id="edit-username"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                className="bg-slate-700/50 text-white border-blue-500/30"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-email" className="text-gray-300">Email</Label>
              <Input
                id="edit-email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="bg-slate-700/50 text-white border-blue-500/30"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-role" className="text-gray-300">Rôle</Label>
              <select
                id="edit-role"
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                className="w-full h-10 px-3 py-2 bg-slate-700/50 text-white border border-blue-500/30 rounded-md"
              >
                <option value="admin">Admin</option>
                <option value="super_admin">Super Admin</option>
                <option value="moderator">Modérateur</option>
              </select>
            </div>
            <Button
              onClick={handleEditAdmin}
              className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700"
            >
              Modifier le compte
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminAccountsPage;
