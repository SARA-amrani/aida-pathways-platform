
import { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface QuizQuestion {
  id: string;
  topic: string;
  difficulty: number;
  type: 'multiple_choice' | 'true_false';
  content: string;
  options: string[];
  correctAnswer: string;
  weight: number;
}

interface QuizInterfaceProps {
  courseId: string;
  questions: QuizQuestion[];
  onComplete: (score: number) => void;
  timeLimit?: number;
}

export function QuizInterface({ 
  courseId, 
  questions, 
  onComplete,
  timeLimit = 0
}: QuizInterfaceProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(timeLimit);

  const currentQuestion = questions[currentQuestionIndex];
  const totalQuestions = questions.length;
  const isLastQuestion = currentQuestionIndex === totalQuestions - 1;

  const handleSelectAnswer = (questionId: string, answer: string) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questionId]: answer
    });
  };

  const handleNextQuestion = () => {
    if (isLastQuestion) {
      calculateScore();
      setShowResults(true);
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const calculateScore = () => {
    const score = questions.reduce((total, question) => {
      const isCorrect = selectedAnswers[question.id] === question.correctAnswer;
      return total + (isCorrect ? question.weight : 0);
    }, 0);
    
    const percentage = Math.round((score / questions.reduce((sum, q) => sum + q.weight, 0)) * 100);
    setQuizScore(percentage);
    onComplete(percentage);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <Card className="border-2">
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            <span>Initial Assessment Quiz</span>
            <span className="text-sm font-normal bg-edu-blue-100 dark:bg-edu-blue-900/30 text-edu-blue-800 dark:text-edu-blue-300 px-3 py-1 rounded-full">
              Question {currentQuestionIndex + 1} of {totalQuestions}
            </span>
          </CardTitle>
        </CardHeader>
        
        <CardContent>
          <AnimatePresence mode="wait">
            {!showResults ? (
              <motion.div
                key={`question-${currentQuestionIndex}`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="mb-6">
                  <p className="text-sm text-muted-foreground mb-1">
                    Topic: {currentQuestion.topic}
                  </p>
                  <p className="text-lg font-medium mb-4">{currentQuestion.content}</p>
                  
                  <div className="space-y-3 mt-6">
                    {currentQuestion.options.map((option, index) => (
                      <div
                        key={index}
                        className={`quiz-option ${
                          selectedAnswers[currentQuestion.id] === option ? "selected" : ""
                        }`}
                        onClick={() => handleSelectAnswer(currentQuestion.id, option)}
                      >
                        {option}
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="results"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="text-center py-8"
              >
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-edu-blue-100 dark:bg-edu-blue-900/30 mb-4">
                  {quizScore >= 70 ? (
                    <CheckCircle2 className="h-10 w-10 text-green-500" />
                  ) : (
                    <AlertCircle className="h-10 w-10 text-yellow-500" />
                  )}
                </div>
                <h3 className="text-2xl font-bold mb-2">Assessment Complete!</h3>
                <p className="text-muted-foreground mb-4">
                  Your initial assessment score is:
                </p>
                <div className="text-4xl font-bold text-edu-blue-600 dark:text-edu-blue-400 mb-6">
                  {quizScore}%
                </div>
                <p className="text-sm text-muted-foreground max-w-md mx-auto mb-6">
                  Based on your performance, we'll generate a personalized learning roadmap to help
                  you succeed in this course.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>

        <CardFooter className="flex justify-between">
          <Button
            variant="outline"
            onClick={() => setCurrentQuestionIndex(Math.max(0, currentQuestionIndex - 1))}
            disabled={currentQuestionIndex === 0 || showResults}
          >
            Previous
          </Button>
          
          <Button
            variant="default"
            onClick={handleNextQuestion}
            disabled={!selectedAnswers[currentQuestion?.id] && !showResults}
          >
            {showResults ? "View Roadmap" : isLastQuestion ? "Finish Quiz" : "Next Question"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default QuizInterface;
