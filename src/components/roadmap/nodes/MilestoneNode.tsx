
import { memo } from 'react';
import { Handle, Position } from 'reactflow';
import { Trophy } from 'lucide-react';

interface MilestoneNodeProps {
  data: {
    title: string;
    description: string;
    status: 'locked' | 'available' | 'in_progress' | 'completed';
  };
  isConnectable: boolean;
}

function MilestoneNode({ data, isConnectable }: MilestoneNodeProps) {
  const statusColors = {
    locked: 'bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500',
    available: 'bg-edu-purple-100 dark:bg-edu-purple-900/30 border-edu-purple-300 dark:border-edu-purple-700',
    in_progress: 'bg-edu-purple-100 dark:bg-edu-purple-900/30 border-edu-purple-500 dark:border-edu-purple-600',
    completed: 'bg-edu-purple-100 dark:bg-edu-purple-900/30 border-green-500 dark:border-green-400'
  };

  return (
    <div className={`milestone-node ${statusColors[data.status]}`}>
      <Handle
        type="target"
        position={Position.Top}
        isConnectable={isConnectable}
      />
      <div className="flex flex-col items-center justify-center">
        <Trophy className="h-6 w-6 text-edu-purple-600 dark:text-edu-purple-400 mb-2" />
        <h3 className="font-medium text-center">{data.title}</h3>
        <p className="text-xs text-muted-foreground mt-1 text-center">{data.description}</p>
        
        <div className="mt-2 text-xs font-medium">
          {data.status === 'completed' && "Achieved"}
          {data.status === 'available' && "Ready to unlock"}
          {data.status === 'locked' && "Complete prerequisites first"}
        </div>
      </div>
      
      <Handle
        type="source"
        position={Position.Bottom}
        isConnectable={isConnectable}
      />
    </div>
  );
}

export default memo(MilestoneNode);
