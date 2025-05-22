
import { useState, useEffect } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import CourseCard from "@/components/student/CourseCard";
import { motion } from "framer-motion";

export function StudentDashboard() {
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
          progress: 65,
          nextDeadline: "Oct 25, 2023",
          hasActivity: true
        },
        {
          id: "math201",
          title: "Linear Algebra",
          code: "MATH201",
          progress: 42,
          nextDeadline: "Oct 28, 2023",
          hasActivity: false
        },
        {
          id: "phys150",
          title: "Physics I",
          code: "PHYS150",
          progress: 30,
          nextDeadline: "Oct 30, 2023",
          hasActivity: true
        },
        {
          id: "eng220",
          title: "Technical Writing",
          code: "ENG220",
          progress: 78,
          nextDeadline: "Nov 5, 2023",
          hasActivity: false
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
    <DashboardLayout userRole="student">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Student Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back! Here's an overview of your courses and progress.
        </p>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-64 bg-gray-100 dark:bg-gray-800 rounded-lg animate-pulse"></div>
          ))}
        </div>
      ) : (
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {courses.map((course: any) => (
            <motion.div key={course.id} variants={item}>
              <CourseCard {...course} />
            </motion.div>
          ))}
        </motion.div>
      )}
    </DashboardLayout>
  );
}

export default StudentDashboard;
