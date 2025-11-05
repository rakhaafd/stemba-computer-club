import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, EyeOff } from "lucide-react";

export default function Auth() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen bg-[#161616] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Admin Auth Card */}
        <Card className="border-[#2A2A2A] bg-[#1E1E1E]/80 backdrop-blur-sm">
          <CardHeader className="text-center">
            <CardTitle className="font-primary text-2xl text-[#EFEEEA]">
              Admin Access
            </CardTitle>
            <CardDescription className="font-secondary text-[#99a1af]">
              Sign in to access admin dashboard
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <div className="space-y-4 animate-in fade-in duration-300">
              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="adminEmail" className="font-secondary text-[#EFEEEA]">
                  Admin Email
                </Label>
                <Input
                  id="adminEmail"
                  type="email"
                  placeholder="Enter admin email"
                  className="font-secondary bg-[#2A2A2A] border-[#3A3A3A] text-[#EFEEEA] placeholder:text-[#99a1af] focus:border-[#EFEEEA]"
                />
              </div>
              
              {/* Password Field */}
              <div className="space-y-2">
                <Label htmlFor="adminPassword" className="font-secondary text-[#EFEEEA]">
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="adminPassword"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter admin password"
                    className="font-secondary bg-[#2A2A2A] border-[#3A3A3A] text-[#EFEEEA] placeholder:text-[#99a1af] focus:border-[#EFEEEA] pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-[#99a1af]" />
                    ) : (
                      <Eye className="h-4 w-4 text-[#99a1af]" />
                    )}
                  </Button>
                </div>
              </div>

              {/* Login Button */}
              <Button className="w-full font-primary mt-6 bg-[#EFEEEA] text-[#161616] hover:bg-[#EFEEEA]/90">
                Sign In as Admin
              </Button>

              {/* Security Notice */}
              <div className="text-center mt-4">
                <p className="text-xs text-[#99a1af] font-secondary">
                  Restricted access. Authorized personnel only.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-xs text-[#99a1af] font-secondary">
            Return to {' '}
            <Button
              variant="link"
              className="p-0 h-auto text-xs font-secondary text-[#EFEEEA] hover:text-[#EFEEEA]/80"
              onClick={() => window.location.href = '/'}
            >
              member login
            </Button>
          </p>
        </div>
      </div>
    </div>
  );
}