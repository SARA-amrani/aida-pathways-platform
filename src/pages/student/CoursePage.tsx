
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, FileText, Play } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";

export function CoursePage() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [hasInitialAssessment, setHasInitialAssessment] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);
  const [courseData, setCourseData] = useState<any>(null);
  
  useEffect(() => {
    // Simulate API call to fetch course data
    setTimeout(() => {
      setCourseData({
        title: courseId === "cs101" 
          ? "Introduction to Programming" 
          : courseId === "math201"
          ? "Linear Algebra"
          : "Physics I",
        code: courseId?.toUpperCase() || "",
        instructor: "Dr. Sarah Miller",
        description: "Learn the fundamentals of programming with this comprehensive course designed for beginners. You'll master basic programming concepts, problem-solving techniques, and develop your first applications.",
        progress: 65,
        nextDeadline: "Oct 25, 2023",
        recentTopics: [
          { id: "t1", title: "Variables and Data Types", progress: 100 },
          { id: "t2", title: "Control Flow Statements", progress: 75 },
          { id: "t3", title: "Functions and Methods", progress: 30 },
        ],
        upcomingAssessments: [
          { id: "a1", title: "Module 2 Quiz", date: "Oct 25, 2023" },
          { id: "a2", title: "Programming Assignment 1", date: "Oct 30, 2023" },
        ]
      });
      
      // Check if student has taken initial assessment
      setHasInitialAssessment(false);
    }, 1000);
  }, [courseId]);
  
  const handleStartAssessment = () => {
    navigate(`/student/courses/${courseId}/assessment`);
  };
  
  const handleViewRoadmap = () => {
    navigate(`/student/courses/${courseId}/roadmap`);
  };

  if (!courseData) {
    return (
      <DashboardLayout userRole="student">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-4"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3 mb-8"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-64 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
            ))}
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout userRole="student">
      {!hasInitialAssessment && showWelcome ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-3xl mx-auto text-center py-6"
        >
          <h1 className="text-3xl font-bold mb-2">{courseData.title}</h1>
          <p className="text-lg text-muted-foreground mb-8">{courseData.code}</p>
          
          <Card className="border-2 mb-8">
            <CardHeader>
              <CardTitle>Welcome to {courseData.code}!</CardTitle>
              <CardDescription>
                We're excited to have you on this learning journey.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-left">
              <p className="mb-6">
                {courseData.description}
              </p>
              <div className="bg-muted p-4 rounded-lg mb-6">
                <h3 className="font-semibold mb-2">Before you begin:</h3>
                <p className="mb-4">
                  To create your personalized learning roadmap, we need to assess your current knowledge level.
                  This initial assessment will help us tailor the course content to your specific needs.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="text-edu-blue-500 mr-2">•</span>
                    The assessment will take approximately 10-15 minutes
                  </li>
                  <li className="flex items-start">
                    <span className="text-edu-blue-500 mr-2">•</span>
                    You can't fail - it's designed to understand your current knowledge
                  </li>
                  <li className="flex items-start">
                    <span className="text-edu-blue-500 mr-2">•</span>
                    Your results will be used to generate a personalized learning path
                  </li>
                </ul>
              </div>
              
              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setShowWelcome(false)}>
                  Skip for now
                </Button>
                <Button onClick={handleStartAssessment}>
                  Start Assessment
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ) : (
        <>
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-3xl font-bold mb-1">{courseData.title}</h1>
              <p className="text-muted-foreground">
                {courseData.code} • Instructor: {courseData.instructor}
              </p>
            </div>
            {!hasInitialAssessment && (
              <Button onClick={handleStartAssessment}>
                Take Initial Assessment
              </Button>
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Course Progress</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <div className="flex justify-between mb-1">
                      <span>Overall Progress</span>
                      <span className="font-medium">{courseData.progress}%</span>
                    </div>
                    <div className="progress-bar">
                      <div 
                        className="progress-bar-fill" 
                        style={{ "--progress-value": `${courseData.progress}%` } as React.CSSProperties} 
                      />
                    </div>
                  </div>
                  
                  <h3 className="font-medium mt-6 mb-3">Recent Topics</h3>
                  <div className="space-y-3">
                    {courseData.recentTopics.map((topic: any) => (
                      <div key={topic.id} className="bg-muted/50 p-3 rounded-md">
                        <div className="flex justify-between mb-1">
                          <span>{topic.title}</span>
                          <span className="font-medium">{topic.progress}%</span>
                        </div>
                        <div className="progress-bar">
                          <div 
                            className="progress-bar-fill" 
                            style={{ "--progress-value": `${topic.progress}%` } as React.CSSProperties} 
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-6 flex justify-end">
                    <Button onClick={handleViewRoadmap}>
                      View Learning Roadmap
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div>
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle className="text-lg">Upcoming Deadlines</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {courseData.upcomingAssessments.map((assessment: any) => (
                      <div key={assessment.id} className="flex items-start">
                        <div className="bg-edu-blue-100 dark:bg-edu-blue-900/30 p-2 rounded mr-3">
                          <FileText className="h-5 w-5 text-edu-blue-500" />
                        </div>
                        <div>
                          <p className="font-medium">{assessment.title}</p>
                          <p className="text-sm text-muted-foreground">Due: {assessment.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full justify-start" onClick={handleViewRoadmap}>
                      <BookOpen className="mr-2 h-4 w-4" />
                      Continue Learning
                    </Button>
                    
                    <Button variant="outline" className="w-full justify-start">
                      <Play className="mr-2 h-4 w-4" />
                      Watch Lecture Videos
                    </Button>
                    
                    <Button variant="outline" className="w-full justify-start">
                      <FileText className="mr-2 h-4 w-4" />
                      Practice Exercises
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </>
      )}
    </DashboardLayout>
  );
}

export default CoursePage;
