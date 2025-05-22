
import { useCallback, useState } from 'react';
import ReactFlow, {
  ReactFlowProvider,
  Background,
  Controls,
  MiniMap,
  Node,
  Edge,
  ConnectionLineType,
  Panel,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ZoomIn, ZoomOut, FileText, BookOpen, Trophy } from 'lucide-react';
import TopicNode from './nodes/TopicNode';
import AssessmentNode from './nodes/AssessmentNode';
import MilestoneNode from './nodes/MilestoneNode';
import CustomEdge from './edges/CustomEdge';

const nodeTypes = {
  topicNode: TopicNode,
  assessmentNode: AssessmentNode,
  milestoneNode: MilestoneNode,
};

const edgeTypes = {
  custom: CustomEdge,
};

interface CourseRoadmapProps {
  courseId: string;
}

export function CourseRoadmap({ courseId }: CourseRoadmapProps) {
  // Example nodes and edges - in a real app, these would come from the API
  const initialNodes: Node[] = [
    {
      id: 'start',
      type: 'topicNode',
      position: { x: 250, y: 0 },
      data: {
        title: 'Course Introduction',
        description: 'Overview of the course, objectives, and expectations',
        status: 'completed',
        progress: 100,
        estimatedHours: 1,
        resources: [
          { id: 'r1', type: 'pdf', title: 'Course Syllabus' },
          { id: 'r2', type: 'video', title: 'Welcome Video' }
        ]
      },
    },
    {
      id: 'assessment1',
      type: 'assessmentNode',
      position: { x: 250, y: 100 },
      data: {
        title: 'Initial Assessment',
        description: 'Evaluate your current knowledge of the subject',
        status: 'completed',
        score: 85,
      },
    },
    {
      id: 'topic1',
      type: 'topicNode',
      position: { x: 100, y: 200 },
      data: {
        title: 'Basic Concepts',
        description: 'Foundational principles and terminology',
        status: 'in_progress',
        progress: 60,
        estimatedHours: 3,
        resources: [
          { id: 'r3', type: 'pdf', title: 'Reading Material' },
          { id: 'r4', type: 'video', title: 'Lecture Video' }
        ]
      },
    },
    {
      id: 'topic2',
      type: 'topicNode',
      position: { x: 400, y: 200 },
      data: {
        title: 'Advanced Concepts',
        description: 'Deeper exploration of key principles',
        status: 'available',
        progress: 0,
        estimatedHours: 4,
        resources: [
          { id: 'r5', type: 'pdf', title: 'Advanced Reading' }
        ]
      },
    },
    {
      id: 'assessment2',
      type: 'assessmentNode',
      position: { x: 100, y: 320 },
      data: {
        title: 'Module Quiz',
        description: 'Test your understanding of basic concepts',
        status: 'available',
      },
    },
    {
      id: 'assessment3',
      type: 'assessmentNode',
      position: { x: 400, y: 320 },
      data: {
        title: 'Advanced Quiz',
        description: 'Test your understanding of advanced concepts',
        status: 'locked',
      },
    },
    {
      id: 'milestone1',
      type: 'milestoneNode',
      position: { x: 250, y: 440 },
      data: {
        title: 'Midterm Milestone',
        description: 'Comprehensive assessment of course progress',
        status: 'locked',
      },
    },
  ];

  const initialEdges: Edge[] = [
    {
      id: 'e1-2',
      source: 'start',
      target: 'assessment1',
      type: 'custom',
      animated: false,
      style: { stroke: '#3b82f6' },
    },
    {
      id: 'e2-3',
      source: 'assessment1',
      target: 'topic1',
      type: 'custom',
      animated: false,
      style: { stroke: '#3b82f6' },
    },
    {
      id: 'e2-4',
      source: 'assessment1',
      target: 'topic2',
      type: 'custom',
      animated: false,
      style: { stroke: '#3b82f6' },
    },
    {
      id: 'e3-5',
      source: 'topic1',
      target: 'assessment2',
      type: 'custom',
      animated: true,
      style: { stroke: '#8b5cf6' },
    },
    {
      id: 'e4-6',
      source: 'topic2',
      target: 'assessment3',
      type: 'custom',
      animated: false,
      style: { stroke: '#d1d5db' },
    },
    {
      id: 'e5-7',
      source: 'assessment2',
      target: 'milestone1',
      type: 'custom',
      animated: false,
      style: { stroke: '#d1d5db' },
    },
    {
      id: 'e6-7',
      source: 'assessment3',
      target: 'milestone1',
      type: 'custom',
      animated: false,
      style: { stroke: '#d1d5db' },
    },
  ];

  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);
  const [nodeToView, setNodeToView] = useState<Node | null>(null);

  const onNodeClick = useCallback((event: React.MouseEvent, node: Node) => {
    setNodeToView(node);
  }, []);

  return (
    <div className="w-full h-[calc(100vh-10rem)]">
      <Card className="w-full h-full overflow-hidden flex flex-col">
        <ReactFlowProvider>
          <div className="flex-1 relative">
            <ReactFlow
              nodes={nodes}
              edges={edges}
              nodeTypes={nodeTypes}
              edgeTypes={edgeTypes}
              onNodeClick={onNodeClick}
              connectionLineType={ConnectionLineType.SmoothStep}
              fitView
            >
              <Background />
              <Controls />
              <MiniMap
                nodeStrokeWidth={3}
                zoomable
                pannable
              />
              <Panel position="top-center" className="bg-white dark:bg-edu-dark-800 p-2 rounded-lg shadow-md border flex gap-2 items-center">
                <FileText className="h-4 w-4 text-edu-blue-500" />
                <span className="font-medium">{courseId.toUpperCase()}: Learning Roadmap</span>
              </Panel>
              <Panel position="bottom-center" className="bg-white dark:bg-edu-dark-800 p-2 rounded-lg shadow-md border mb-8 flex gap-4 items-center">
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span>Completed</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-3 h-3 rounded-full bg-edu-blue-500"></div>
                  <span>In Progress</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-3 h-3 rounded-full bg-gray-400"></div>
                  <span>Upcoming</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-3 h-3 rounded-full bg-gray-300"></div>
                  <span>Locked</span>
                </div>
              </Panel>
            </ReactFlow>
          </div>
        </ReactFlowProvider>
      </Card>
      
      {/* Node Detail Panel */}
      {nodeToView && (
        <Card className="mt-4 p-4">
          <div className="flex items-start justify-between mb-4">
            <div>
              <div className="flex items-center gap-2">
                {nodeToView.type === 'topicNode' && <BookOpen className="h-5 w-5 text-edu-blue-500" />}
                {nodeToView.type === 'assessmentNode' && <FileText className="h-5 w-5 text-edu-blue-500" />}
                {nodeToView.type === 'milestoneNode' && <Trophy className="h-5 w-5 text-edu-purple-500" />}
                <h3 className="text-lg font-medium">{nodeToView.data.title}</h3>
              </div>
              <p className="text-sm text-muted-foreground mt-1">{nodeToView.data.description}</p>
            </div>
            <Button variant="ghost" size="sm" onClick={() => setNodeToView(null)}>
              Close
            </Button>
          </div>
          
          {nodeToView.data.resources && (
            <div className="mt-4">
              <h4 className="text-sm font-medium mb-2">Resources</h4>
              <div className="space-y-2">
                {nodeToView.data.resources.map((resource: any) => (
                  <div key={resource.id} className="flex items-center gap-2 p-2 bg-muted/50 rounded-md">
                    {resource.type === 'pdf' ? (
                      <FileText className="h-4 w-4 text-red-500" />
                    ) : (
                      <BookOpen className="h-4 w-4 text-blue-500" />
                    )}
                    <span className="text-sm">{resource.title}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {nodeToView.type === 'topicNode' && (
            <div className="mt-4">
              <div className="flex justify-between mb-1 text-sm">
                <span>Progress</span>
                <span className="font-medium">{nodeToView.data.progress}%</span>
              </div>
              <div className="progress-bar">
                <div 
                  className="progress-bar-fill" 
                  style={{ "--progress-value": `${nodeToView.data.progress}%` } as React.CSSProperties} 
                />
              </div>
              <div className="mt-4 flex justify-end">
                <Button variant="default">Continue Learning</Button>
              </div>
            </div>
          )}
          
          {nodeToView.type === 'assessmentNode' && (
            <div className="mt-4">
              {nodeToView.data.status === 'completed' ? (
                <div>
                  <div className="flex justify-between mb-1 text-sm">
                    <span>Score</span>
                    <span className="font-medium">{nodeToView.data.score}%</span>
                  </div>
                  <div className="progress-bar">
                    <div 
                      className="progress-bar-fill" 
                      style={{ "--progress-value": `${nodeToView.data.score}%` } as React.CSSProperties} 
                    />
                  </div>
                  <div className="mt-4 flex justify-end">
                    <Button variant="outline">Review Results</Button>
                  </div>
                </div>
              ) : nodeToView.data.status === 'available' ? (
                <div className="mt-4 flex justify-end">
                  <Button variant="default">Start Assessment</Button>
                </div>
              ) : (
                <div className="p-3 bg-muted/50 rounded-md text-sm text-muted-foreground">
                  This assessment is locked. Complete the prerequisite topics first.
                </div>
              )}
            </div>
          )}
        </Card>
      )}
    </div>
  );
}

export default CourseRoadmap;
