
import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { CheckCircle2, XCircle } from "lucide-react";

const ProfileForm = () => {
  const { user, updateProfile, updatePassword, googleConnected, connectGoogle } = useAuth();
  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [isProfileSaving, setIsProfileSaving] = useState(false);
  
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isPasswordSaving, setIsPasswordSaving] = useState(false);
  const [passwordError, setPasswordError] = useState("");

  // Update form fields when user data changes
  useEffect(() => {
    if (user) {
      setFirstName(user.firstName || "");
      setLastName(user.lastName || "");
    }
  }, [user]);
  
  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProfileSaving(true);
    
    try {
      await updateProfile(firstName, lastName);
    } finally {
      setIsProfileSaving(false);
    }
  };
  
  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError("");
    
    if (newPassword !== confirmPassword) {
      setPasswordError("As senhas não coincidem");
      return;
    }
    
    if (newPassword.length < 6) {
      setPasswordError("A senha deve ter pelo menos 6 caracteres");
      return;
    }
    
    setIsPasswordSaving(true);
    
    try {
      await updatePassword(newPassword);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } finally {
      setIsPasswordSaving(false);
    }
  };
  
  const handleConnectGoogle = () => {
    connectGoogle();
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Dados Pessoais</CardTitle>
        <CardDescription>
          Atualize suas informações pessoais e senha
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="profile">
          <TabsList className="mb-4">
            <TabsTrigger value="profile">Perfil</TabsTrigger>
            <TabsTrigger value="password">Senha</TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile">
            <form onSubmit={handleProfileSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">Nome</Label>
                  <Input
                    id="firstName"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="Digite seu nome"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="lastName">Sobrenome</Label>
                  <Input
                    id="lastName"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Digite seu sobrenome"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  value={user?.email || ""}
                  disabled
                  className="bg-gray-50"
                />
                <p className="text-xs text-gray-500">
                  O email não pode ser alterado.
                </p>
              </div>
              
              <div className="mt-6 border border-gray-200 rounded-md p-4">
                <h3 className="text-base font-medium mb-3">Integrações</h3>
                
                <div className="flex items-center justify-between p-3 bg-gray-50 border border-gray-200 rounded-md">
                  <div className="flex items-center gap-2">
                    {googleConnected ? (
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-500" />
                    )}
                    <span className="font-medium">
                      Conta Google
                    </span>
                  </div>
                  <div>
                    {googleConnected ? (
                      <span className="text-sm text-green-600 font-medium">Conectada</span>
                    ) : (
                      <Button 
                        type="button" 
                        onClick={handleConnectGoogle}
                        variant="outline" 
                        size="sm"
                      >
                        Conectar
                      </Button>
                    )}
                  </div>
                </div>
              </div>
              
              <Button type="submit" className="mt-4" disabled={isProfileSaving}>
                {isProfileSaving ? "Salvando..." : "Salvar alterações"}
              </Button>
            </form>
          </TabsContent>
          
          <TabsContent value="password">
            <form onSubmit={handlePasswordSubmit}>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="current-password">Senha atual</Label>
                  <Input
                    id="current-password"
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder="Digite sua senha atual"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="new-password">Nova senha</Label>
                  <Input
                    id="new-password"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Digite sua nova senha"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirmar senha</Label>
                  <Input
                    id="confirm-password"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirme sua nova senha"
                  />
                </div>
                
                {passwordError && (
                  <p className="text-sm text-red-500">{passwordError}</p>
                )}
                
                <Button type="submit" disabled={isPasswordSaving}>
                  {isPasswordSaving ? "Alterando..." : "Alterar senha"}
                </Button>
              </div>
            </form>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ProfileForm;
