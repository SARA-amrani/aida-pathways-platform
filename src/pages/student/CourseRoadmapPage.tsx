
import { useParams } from "react-router-dom";
import DashboardLayout from "@/components/layout/DashboardLayout";
import CourseRoadmap from "@/components/roadmap/CourseRoadmap";

export function CourseRoadmapPage() {
  const { courseId } = useParams();
  
  return (
    <DashboardLayout userRole="student">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">{courseId?.toUpperCase()}: Learning Roadmap</h1>
        <p className="text-muted-foreground">
          Your personalized learning path based on your assessment and progress.
        </p>
      </div>
      
      <CourseRoadmap courseId={courseId || ""} />
    </DashboardLayout>
  );
}

export default CourseRoadmapPage;
