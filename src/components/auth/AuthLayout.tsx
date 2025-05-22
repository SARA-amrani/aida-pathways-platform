
import { ReactNode } from "react";
import { motion } from "framer-motion";

interface AuthLayoutProps {
  children: ReactNode;
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-edu-blue-50 to-edu-purple-50 dark:from-edu-dark-900 dark:to-edu-purple-900/30 flex flex-col justify-center items-center p-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="text-4xl font-bold text-edu-blue-600 dark:text-edu-blue-400 mb-2 text-center">EduNexus</h1>
        <p className="text-edu-dark-600 dark:text-edu-dark-300 text-center">
          AI-Driven Academic Success Platform
        </p>
      </motion.div>
      {children}
    </div>
  );
}

export default AuthLayout;
