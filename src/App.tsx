
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/hooks/ThemeContext";

// Pages
import LoginPage from "./pages/LoginPage";
import StudentDashboard from "./pages/student/StudentDashboard";
import ProfessorDashboard from "./pages/professor/ProfessorDashboard";
import CoursePage from "./pages/student/CoursePage";
import CourseAssessment from "./pages/student/CourseAssessment";
import CourseRoadmapPage from "./pages/student/CourseRoadmapPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="light">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Auth Routes */}
            <Route path="/" element={<LoginPage />} />
            
            {/* Student Routes */}
            <Route path="/student/dashboard" element={<StudentDashboard />} />
            <Route path="/student/courses/:courseId" element={<CoursePage />} />
            <Route path="/student/courses/:courseId/assessment" element={<CourseAssessment />} />
            <Route path="/student/courses/:courseId/roadmap" element={<CourseRoadmapPage />} />
            
            {/* Professor Routes */}
            <Route path="/professor/dashboard" element={<ProfessorDashboard />} />
            
            {/* Catch-all Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
