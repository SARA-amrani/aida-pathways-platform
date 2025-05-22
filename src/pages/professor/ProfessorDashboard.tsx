
import { useState, useEffect } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import CourseManagementCard from "@/components/professor/CourseManagementCard";
import { motion } from "framer-motion";

export function ProfessorDashboard() {
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API call to fetch courses
    setTimeout(() => {
      setCourses([
        {
          id: "cs101",
          title: "Introduction to Programming",
          code: "CS101",
          totalStudents: 45,
          activeStudents: 40,
          averageScore: 78
        },
        {
          id: "ai310",
          title: "Machine Learning Fundamentals",
          code: "AI310",
          totalStudents: 32,
          activeStudents: 28,
          averageScore: 81
        },
        {
          id: "cs415",
          title: "Advanced Algorithms",
          code: "CS415",
          totalStudents: 25,
          activeStudents: 20,
          averageScore: 72
        }
      ]);
      setIsLoading(false);
    }, 1000);
  }, []);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <DashboardLayout userRole="professor">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Professor Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back! Here's an overview of your courses and student progress.
        </p>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-64 bg-gray-100 dark:bg-gray-800 rounded-lg animate-pulse"></div>
          ))}
        </div>
      ) : (
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {courses.map((course: any) => (
            <motion.div key={course.id} variants={item}>
              <CourseManagementCard {...course} />
            </motion.div>
          ))}
        </motion.div>
      )}
    </DashboardLayout>
  );
}

export default ProfessorDashboard;
