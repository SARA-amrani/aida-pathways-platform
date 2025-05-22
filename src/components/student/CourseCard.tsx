
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowRight, BookOpen, Calendar } from "lucide-react";
import { motion } from "framer-motion";

interface CourseCardProps {
  id: string;
  title: string;
  code: string;
  progress: number;
  nextDeadline: string;
  hasActivity: boolean;
}

export function CourseCard({ id, title, code, progress, nextDeadline, hasActivity }: CourseCardProps) {
  const navigate = useNavigate();
  
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <Card className={`overflow-hidden ${hasActivity ? 'border-l-4 border-l-edu-blue-500' : ''}`}>
        <CardHeader className="pb-2">
          <CardTitle className="flex items-start justify-between">
            <div>
              <span className="text-sm font-semibold text-edu-purple-500 dark:text-edu-purple-400 block">{code}</span>
              <span className="text-lg">{title}</span>
            </div>
            <BookOpen className="h-5 w-5 text-edu-blue-500" />
          </CardTitle>
        </CardHeader>
        <CardContent className="pb-2">
          <div className="mb-4">
            <div className="flex justify-between mb-1 text-sm">
              <span>Progress</span>
              <span className="font-medium">{progress}%</span>
            </div>
            <div className="progress-bar">
              <div 
                className="progress-bar-fill" 
                style={{ "--progress-value": `${progress}%` } as React.CSSProperties} 
              />
            </div>
          </div>
          
          <div className="flex items-center text-sm text-muted-foreground mt-4">
            <Calendar className="mr-2 h-4 w-4" />
            <span>Next deadline: {nextDeadline}</span>
          </div>
        </CardContent>
        <CardFooter>
          <Button 
            className="w-full" 
            onClick={() => navigate(`/student/courses/${id}`)}
            variant="default"
          >
            Continue Learning
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}

export default CourseCard;
