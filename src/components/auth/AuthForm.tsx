
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "@/components/ui/sonner";
import { motion } from "framer-motion";

export function AuthForm() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (role: string, e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      localStorage.setItem("userRole", role);
      
      if (role === "student") {
        toast.success("Logged in as student");
        navigate("/student/dashboard");
      } else {
        toast.success("Logged in as professor");
        navigate("/professor/dashboard");
      }
    }, 1500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md mx-auto"
    >
      <Card className="border-2">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">EduNexus</CardTitle>
          <CardDescription className="text-center">
            Sign in to your account to continue
          </CardDescription>
        </CardHeader>
        <Tabs defaultValue="student" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="student">Student</TabsTrigger>
            <TabsTrigger value="professor">Professor</TabsTrigger>
          </TabsList>
          <TabsContent value="student">
            <form onSubmit={(e) => handleLogin("student", e)}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="student-email">Email</Label>
                  <Input id="student-email" type="email" placeholder="student@university.edu" required />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="student-password">Password</Label>
                    <a href="#" className="text-xs text-edu-blue-500 hover:underline">
                      Forgot password?
                    </a>
                  </div>
                  <Input id="student-password" type="password" required />
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="student-remember" />
                  <label
                    htmlFor="student-remember"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Remember me
                  </label>
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Signing in..." : "Sign in"}
                </Button>
              </CardFooter>
            </form>
          </TabsContent>
          <TabsContent value="professor">
            <form onSubmit={(e) => handleLogin("professor", e)}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="professor-email">Email</Label>
                  <Input id="professor-email" type="email" placeholder="professor@university.edu" required />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="professor-password">Password</Label>
                    <a href="#" className="text-xs text-edu-blue-500 hover:underline">
                      Forgot password?
                    </a>
                  </div>
                  <Input id="professor-password" type="password" required />
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="professor-remember" />
                  <label
                    htmlFor="professor-remember"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Remember me
                  </label>
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Signing in..." : "Sign in"}
                </Button>
              </CardFooter>
            </form>
          </TabsContent>
        </Tabs>
      </Card>
    </motion.div>
  );
}

export default AuthForm;
