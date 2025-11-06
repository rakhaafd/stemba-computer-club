"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, EyeOff } from "lucide-react";

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [showRegisterPassword, setShowRegisterPassword] = useState(false);

  return (
    <div className="min-h-screen bg-[#161616] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Auth Card */}
        <Card className="border-[#2A2A2A] bg-[#1E1E1E]/80 backdrop-blur-sm">
          <CardHeader className="text-center">
            <CardTitle className="font-primary text-2xl text-[#EFEEEA]">
              {isLogin ? "Welcome Back" : "Join the Club"}
            </CardTitle>
            <CardDescription className="font-secondary text-[#99a1af]">
              {isLogin 
                ? "Sign in to your account" 
                : "Create your account to get started"
              }
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            {/* Toggle Button */}
            <div className="flex mb-6 bg-[#2A2A2A] rounded-lg p-1">
              <Button
                variant={isLogin ? "default" : "ghost"}
                className={`flex-1 font-primary text-sm ${
                  isLogin 
                    ? "bg-[#EFEEEA] text-[#161616] shadow-sm hover:bg-[#EFEEEA]/90" 
                    : "text-[#99a1af] hover:text-[#EFEEEA] hover:bg-transparent"
                }`}
                onClick={() => setIsLogin(true)}
              >
                Login
              </Button>
              <Button
                variant={!isLogin ? "default" : "ghost"}
                className={`flex-1 font-primary text-sm ${
                  !isLogin 
                    ? "bg-[#EFEEEA] text-[#161616] shadow-sm hover:bg-[#EFEEEA]/90" 
                    : "text-[#99a1af] hover:text-[#EFEEEA] hover:bg-transparent"
                }`}
                onClick={() => setIsLogin(false)}
              >
                Register
              </Button>
            </div>

            {/* Login Form */}
            {isLogin ? (
              <div className="space-y-4 animate-in fade-in duration-300">
                <div className="space-y-2">
                  <Label htmlFor="loginIdentifier" className="font-secondary text-[#EFEEEA]">
                    Username or Email
                  </Label>
                  <Input
                    id="loginIdentifier"
                    type="text"
                    placeholder="Enter your username or email"
                    className="font-secondary bg-[#2A2A2A] border-[#3A3A3A] text-[#EFEEEA] placeholder:text-[#99a1af] focus:border-[#EFEEEA]"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="loginPassword" className="font-secondary text-[#EFEEEA]">
                    Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="loginPassword"
                      type={showLoginPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      className="font-secondary bg-[#2A2A2A] border-[#3A3A3A] text-[#EFEEEA] placeholder:text-[#99a1af] focus:border-[#EFEEEA] pr-10"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowLoginPassword(!showLoginPassword)}
                    >
                      {showLoginPassword ? (
                        <EyeOff className="h-4 w-4 text-[#99a1af]" />
                      ) : (
                        <Eye className="h-4 w-4 text-[#99a1af]" />
                      )}
                    </Button>
                  </div>
                </div>

                <Button className="w-full font-primary mt-6 bg-[#EFEEEA] text-[#161616] hover:bg-[#EFEEEA]/90">
                  Sign In
                </Button>

                <div className="text-center">
                  <Button variant="link" className="text-xs text-[#99a1af] font-secondary hover:text-[#EFEEEA]">
                    Forgot your password?
                  </Button>
                </div>
              </div>
            ) : (
              /* Register Form */
              <div className="space-y-4 animate-in fade-in duration-300">
                <div className="space-y-2">
                  <Label htmlFor="nama" className="font-secondary text-[#EFEEEA]">
                    Full Name
                  </Label>
                  <Input
                    id="nama"
                    type="text"
                    placeholder="Enter your full name"
                    className="font-secondary bg-[#2A2A2A] border-[#3A3A3A] text-[#EFEEEA] placeholder:text-[#99a1af] focus:border-[#EFEEEA]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="kelas" className="font-secondary text-[#EFEEEA]">
                    Class
                  </Label>
                  <Input
                    id="kelas"
                    type="text"
                    placeholder="e.g., X SIJA 1"
                    className="font-secondary bg-[#2A2A2A] border-[#3A3A3A] text-[#EFEEEA] placeholder:text-[#99a1af] focus:border-[#EFEEEA]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="font-secondary text-[#EFEEEA]">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    className="font-secondary bg-[#2A2A2A] border-[#3A3A3A] text-[#EFEEEA] placeholder:text-[#99a1af] focus:border-[#EFEEEA]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="font-secondary text-[#EFEEEA]">
                    Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showRegisterPassword ? "text" : "password"}
                      placeholder="Create a password"
                      className="font-secondary bg-[#2A2A2A] border-[#3A3A3A] text-[#EFEEEA] placeholder:text-[#99a1af] focus:border-[#EFEEEA] pr-10"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowRegisterPassword(!showRegisterPassword)}
                    >
                      {showRegisterPassword ? (
                        <EyeOff className="h-4 w-4 text-[#99a1af]" />
                      ) : (
                        <Eye className="h-4 w-4 text-[#99a1af]" />
                      )}
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="kode" className="font-secondary text-[#EFEEEA]">
                    Registration Code
                  </Label>
                  <Input
                    id="kode"
                    type="text"
                    placeholder="Enter registration code"
                    className="font-secondary bg-[#2A2A2A] border-[#3A3A3A] text-[#EFEEEA] placeholder:text-[#99a1af] focus:border-[#EFEEEA]"
                  />
                </div>

                <Button className="w-full font-primary mt-4 bg-[#EFEEEA] text-[#161616] hover:bg-[#EFEEEA]/90">
                  Create Account
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-xs text-[#99a1af] font-secondary">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <Button
              variant="link"
              className="p-0 h-auto text-xs font-secondary text-[#EFEEEA] hover:text-[#EFEEEA]/80"
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin ? "Sign up" : "Sign in"}
            </Button>
          </p>
        </div>
      </div>
    </div>
  );
}