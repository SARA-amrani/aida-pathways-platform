
import { memo } from 'react';
import { Handle, Position } from 'reactflow';
import { FileText } from 'lucide-react';

interface AssessmentNodeProps {
  data: {
    title: string;
    description: string;
    status: 'locked' | 'available' | 'in_progress' | 'completed';
    score?: number;
  };
  isConnectable: boolean;
}

function AssessmentNode({ data, isConnectable }: AssessmentNodeProps) {
  const statusColors = {
    locked: 'bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500',
    available: 'bg-edu-blue-100 dark:bg-edu-blue-900/30 border-edu-blue-300 dark:border-edu-blue-700',
    in_progress: 'bg-edu-blue-100 dark:bg-edu-blue-900/30 border-edu-blue-500 dark:border-edu-blue-600',
    completed: 'bg-edu-blue-100 dark:bg-edu-blue-900/30 border-green-500 dark:border-green-400'
  };

  return (
    <div className={`assessment-node ${statusColors[data.status]}`}>
      <Handle
        type="target"
        position={Position.Top}
        isConnectable={isConnectable}
      />
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-1">
            <FileText className="h-4 w-4 text-edu-blue-600 dark:text-edu-blue-400" />
            <h3 className="font-medium">{data.title}</h3>
          </div>
          <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{data.description}</p>
        </div>
      </div>
      
      {data.status === 'completed' && data.score !== undefined && (
        <div className="mt-2 text-center">
          <span className="text-xs font-medium">Score: {data.score}%</span>
          <div className="mt-1 progress-bar">
            <div 
              className="progress-bar-fill" 
              style={{ width: `${data.score}%` }} 
            />
          </div>
        </div>
      )}
      
      {data.status === 'available' && (
        <div className="mt-2 text-center">
          <span className="text-xs font-medium text-edu-blue-600 dark:text-edu-blue-400">Ready to take</span>
        </div>
      )}
      
      <Handle
        type="source"
        position={Position.Bottom}
        isConnectable={isConnectable}
      />
    </div>
  );
}

export default memo(AssessmentNode);
