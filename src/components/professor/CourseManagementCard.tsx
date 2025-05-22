
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Users, BarChart, FileText } from "lucide-react";
import { motion } from "framer-motion";

interface CourseManagementCardProps {
  id: string;
  title: string;
  code: string;
  totalStudents: number;
  activeStudents: number;
  averageScore: number;
}

export function CourseManagementCard({ 
  id, 
  title, 
  code, 
  totalStudents, 
  activeStudents, 
  averageScore 
}: CourseManagementCardProps) {
  const navigate = useNavigate();
  
  const activityRate = Math.round((activeStudents / totalStudents) * 100);
  
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="flex items-start justify-between">
            <div>
              <span className="text-sm font-semibold text-edu-purple-500 dark:text-edu-purple-400 block">{code}</span>
              <span className="text-lg">{title}</span>
            </div>
            <FileText className="h-5 w-5 text-edu-blue-500" />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 my-2">
            <div className="flex flex-col">
              <span className="text-sm text-muted-foreground">Students</span>
              <div className="flex items-center">
                <Users className="h-4 w-4 mr-2 text-edu-blue-500" />
                <span className="font-semibold">{totalStudents}</span>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-muted-foreground">Active Rate</span>
              <div className="flex items-center">
                <BarChart className="h-4 w-4 mr-2 text-edu-purple-500" />
                <span className="font-semibold">{activityRate}%</span>
              </div>
            </div>
          </div>
          
          <div className="mt-4">
            <div className="flex justify-between mb-1 text-sm">
              <span>Average Score</span>
              <span className="font-medium">{averageScore}%</span>
            </div>
            <div className="progress-bar">
              <div 
                className="progress-bar-fill" 
                style={{ "--progress-value": `${averageScore}%` } as React.CSSProperties} 
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button 
            variant="outline" 
            onClick={() => navigate(`/professor/courses/${id}/students`)}
          >
            <Users className="mr-2 h-4 w-4" />
            Students
          </Button>
          <Button 
            variant="default" 
            onClick={() => navigate(`/professor/courses/${id}/manage`)}
          >
            Manage Course
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}

export default CourseManagementCard;
