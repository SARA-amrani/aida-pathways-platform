
import { memo } from 'react';
import { Handle, Position } from 'reactflow';
import { BookOpen } from 'lucide-react';

interface TopicNodeProps {
  data: {
    title: string;
    description: string;
    status: 'locked' | 'available' | 'in_progress' | 'completed';
    progress: number;
    estimatedHours: number;
    resources: Array<{ id: string; type: string; title: string }>;
  };
  isConnectable: boolean;
}

function TopicNode({ data, isConnectable }: TopicNodeProps) {
  const statusColors = {
    locked: 'bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500',
    available: 'bg-white dark:bg-edu-dark-800 border-edu-blue-200 dark:border-edu-dark-600',
    in_progress: 'bg-white dark:bg-edu-dark-800 border-edu-blue-500 dark:border-edu-blue-600',
    completed: 'bg-white dark:bg-edu-dark-800 border-green-500 dark:border-green-400'
  };

  return (
    <div className={`topic-node ${statusColors[data.status]}`}>
      <Handle
        type="target"
        position={Position.Top}
        isConnectable={isConnectable}
      />
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-medium">{data.title}</h3>
          <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{data.description}</p>
        </div>
        {data.status !== 'locked' && (
          <BookOpen className="h-4 w-4 text-edu-blue-500 mt-1 ml-2 flex-shrink-0" />
        )}
      </div>
      
      {data.status !== 'locked' && (
        <>
          <div className="mt-2 flex items-center justify-between text-xs">
            <span>{data.estimatedHours}h</span>
            <span>{data.progress}% complete</span>
          </div>
          <div className="mt-1 progress-bar">
            <div 
              className="progress-bar-fill" 
              style={{ width: `${data.progress}%` }} 
            />
          </div>
          
          {data.resources && data.resources.length > 0 && (
            <div className="mt-2 flex gap-1">
              {data.resources.map((resource) => (
                <div 
                  key={resource.id} 
                  className="w-2 h-2 rounded-full bg-edu-blue-300 dark:bg-edu-blue-600"
                  title={resource.title}
                />
              ))}
            </div>
          )}
        </>
      )}
      
      <Handle
        type="source"
        position={Position.Bottom}
        isConnectable={isConnectable}
      />
    </div>
  );
}

export default memo(TopicNode);
