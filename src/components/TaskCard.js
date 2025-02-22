import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const TaskCard = ({ task }) => {
  return (
    <Card style={{ marginBottom: '10px' }}>
      <CardContent>
        <Typography variant="h6">{task.title}</Typography>
        <Typography variant="body2">{task.description}</Typography>
        <Typography variant="caption">Due: {task.dueDate}</Typography>
        <Typography variant="caption" style={{ display: 'block', marginTop: '5px' }}>
          Status: {task.status}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default TaskCard;