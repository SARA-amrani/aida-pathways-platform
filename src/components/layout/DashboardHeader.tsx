
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bell, Book, Calendar, LogOut, Moon, Settings, Sun, User } from "lucide-react";
import { useTheme } from "@/hooks/ThemeContext";

interface DashboardHeaderProps {
  userRole: string;
}

export function DashboardHeader({ userRole }: DashboardHeaderProps) {
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  
  useEffect(() => {
    // Simulate fetching user data
    setUserName(userRole === "student" ? "Alex Johnson" : "Dr. Sarah Miller");
  }, [userRole]);
  
  const handleLogout = () => {
    localStorage.removeItem("userRole");
    navigate("/");
  };

  const handleThemeToggle = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const userInitials = userName
    .split(" ")
    .map((name) => name[0])
    .join("");

  return (
    <header className="border-b sticky top-0 z-10 bg-background/80 backdrop-blur-md">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-bold text-edu-blue-600 dark:text-edu-blue-400">
            EduNexus
          </h1>
          {userRole === "student" ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="ml-2">
                  <Book className="h-4 w-4 mr-2" />
                  My Courses
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Select Course</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate("/student/courses/cs101")}>
                  CS101: Introduction to Programming
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/student/courses/math201")}>
                  MATH201: Linear Algebra
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/student/courses/phys150")}>
                  PHYS150: Physics I
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="ml-2">
                  <Book className="h-4 w-4 mr-2" />
                  My Courses
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Manage Course</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate("/professor/courses/cs101/manage")}>
                  CS101: Introduction to Programming
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/professor/courses/ai310/manage")}>
                  AI310: Machine Learning Fundamentals
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
        
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" onClick={handleThemeToggle}>
            {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
          
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
          </Button>
          
          <Button variant="ghost" size="icon">
            <Calendar className="h-5 w-5" />
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                <Avatar>
                  <AvatarImage src="" alt={userName} />
                  <AvatarFallback className="bg-edu-purple-100 text-edu-purple-800 dark:bg-edu-purple-900 dark:text-edu-purple-200">
                    {userInitials}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>{userName}</DropdownMenuLabel>
              <DropdownMenuLabel className="text-xs text-muted-foreground">{userRole}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => navigate(`/${userRole}/profile`)}>
                <User className="mr-2 h-4 w-4" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}

export default DashboardHeader;
