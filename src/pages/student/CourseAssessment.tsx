
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/layout/DashboardLayout";
import QuizInterface from "@/components/quiz/QuizInterface";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export function CourseAssessment() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [showQuiz, setShowQuiz] = useState(false);
  
  // Example quiz questions - in a real app, these would come from the API
  const questions = [
    {
      id: "q1",
      topic: "Basic Concepts",
      difficulty: 0.3,
      type: "multiple_choice" as const,
      content: "Which of the following is a correct variable declaration in JavaScript?",
      options: [
        "var 123 = 'number';",
        "variable name = 'John';",
        "let name = 'John';",
        "const 1name = 'John';"
      ],
      correctAnswer: "let name = 'John';",
      weight: 1
    },
    {
      id: "q2",
      topic: "Data Structures",
      difficulty: 0.5,
      type: "multiple_choice" as const,
      content: "What is the time complexity of searching for an element in a sorted array using binary search?",
      options: [
        "O(1)",
        "O(log n)",
        "O(n)",
        "O(n log n)"
      ],
      correctAnswer: "O(log n)",
      weight: 1
    },
    {
      id: "q3",
      topic: "Algorithms",
      difficulty: 0.7,
      type: "multiple_choice" as const,
      content: "Which algorithm is best suited for finding the shortest path in a weighted graph?",
      options: [
        "Depth-First Search",
        "Breadth-First Search",
        "Dijkstra's Algorithm",
        "Bubble Sort"
      ],
      correctAnswer: "Dijkstra's Algorithm",
      weight: 1
    },
    {
      id: "q4",
      topic: "Programming Paradigms",
      difficulty: 0.6,
      type: "true_false" as const,
      content: "Functional programming avoids changing state and mutable data.",
      options: [
        "True",
        "False"
      ],
      correctAnswer: "True",
      weight: 1
    },
    {
      id: "q5",
      topic: "System Architecture",
      difficulty: 0.8,
      type: "multiple_choice" as const,
      content: "Which of the following is NOT a principle of microservices architecture?",
      options: [
        "Services are independently deployable",
        "Services are organized around business capabilities",
        "Services share a centralized database",
        "Services communicate over a network"
      ],
      correctAnswer: "Services share a centralized database",
      weight: 1
    }
  ];

  const handleQuizComplete = (score: number) => {
    // In a real app, we would send the score to the API
    console.log(`Quiz completed with score: ${score}`);
    
    setTimeout(() => {
      navigate(`/student/courses/${courseId}/roadmap`);
    }, 3000);
  };

  return (
    <DashboardLayout userRole="student">
      {!showQuiz ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="max-w-3xl mx-auto text-center py-10"
        >
          <h1 className="text-3xl font-bold mb-6">Initial Assessment</h1>
          <p className="text-lg mb-8">
            Welcome to {courseId?.toUpperCase()}! Before you begin, we need to assess your current knowledge level to create a personalized learning path.
          </p>
          
          <div className="bg-white dark:bg-edu-dark-800 p-6 rounded-lg border mb-8">
            <h2 className="text-xl font-semibold mb-4">Assessment Overview</h2>
            <ul className="text-left space-y-2 mb-6">
              <li className="flex items-start">
                <span className="bg-edu-blue-100 dark:bg-edu-blue-900/30 text-edu-blue-800 dark:text-edu-blue-300 w-6 h-6 rounded-full flex items-center justify-center mr-3 mt-0.5">1</span>
                <span>This assessment contains 5 questions of varying difficulty</span>
              </li>
              <li className="flex items-start">
                <span className="bg-edu-blue-100 dark:bg-edu-blue-900/30 text-edu-blue-800 dark:text-edu-blue-300 w-6 h-6 rounded-full flex items-center justify-center mr-3 mt-0.5">2</span>
                <span>Your answers will help us create a personalized learning roadmap</span>
              </li>
              <li className="flex items-start">
                <span className="bg-edu-blue-100 dark:bg-edu-blue-900/30 text-edu-blue-800 dark:text-edu-blue-300 w-6 h-6 rounded-full flex items-center justify-center mr-3 mt-0.5">3</span>
                <span>You can't fail this assessment - it's designed to help us understand your current knowledge</span>
              </li>
              <li className="flex items-start">
                <span className="bg-edu-blue-100 dark:bg-edu-blue-900/30 text-edu-blue-800 dark:text-edu-blue-300 w-6 h-6 rounded-full flex items-center justify-center mr-3 mt-0.5">4</span>
                <span>You'll see your results immediately after completion</span>
              </li>
            </ul>
            
            <Button 
              size="lg" 
              onClick={() => setShowQuiz(true)}
              className="mt-4"
            >
              Begin Assessment
            </Button>
          </div>
        </motion.div>
      ) : (
        <QuizInterface 
          courseId={courseId || ""} 
          questions={questions} 
          onComplete={handleQuizComplete} 
        />
      )}
    </DashboardLayout>
  );
}

export default CourseAssessment;
