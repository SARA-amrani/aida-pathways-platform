
import { useEffect, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import DashboardHeader from "./DashboardHeader";
import { motion } from "framer-motion";

interface DashboardLayoutProps {
  children: ReactNode;
  userRole: string;
}

export function DashboardLayout({ children, userRole }: DashboardLayoutProps) {
  const navigate = useNavigate();
  
  useEffect(() => {
    const storedRole = localStorage.getItem("userRole");
    if (!storedRole) {
      navigate("/");
    } else if (storedRole !== userRole) {
      navigate(`/${storedRole}/dashboard`);
    }
  }, [userRole, navigate]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-edu-dark-900">
      <DashboardHeader userRole={userRole} />
      <motion.main 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="flex-1 container mx-auto px-4 py-6"
      >
        {children}
      </motion.main>
    </div>
  );
}

export default DashboardLayout;
