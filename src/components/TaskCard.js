import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import DragHandleIcon from '@mui/icons-material/DragHandle'; // Add a drag handle icon

const TaskCard = ({ task }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: task._id }); // Use task._id

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    cursor: 'grab', // Change cursor to indicate draggable area
  };

  return (
    <div ref={setNodeRef} style={style}>
      <Card style={{ marginBottom: '10px', position: 'relative' }}>
        <CardContent>
          {/* Drag Handle */}
          <div
            {...attributes}
            {...listeners}
            style={{
              position: 'absolute',
              top: '10px',
              right: '10px',
              cursor: 'grab',
            }}
          >
            <DragHandleIcon />
          </div>

          {/* Task Details */}
          <Typography variant="h6">{task.title}</Typography>
          <Typography variant="body2">{task.description}</Typography>
          <Typography variant="caption">Due: {new Date(task.dueDate).toLocaleDateString()}</Typography>
          <Typography variant="caption" style={{ display: 'block', marginTop: '5px' }}>
            Status: {task.status}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default TaskCard;