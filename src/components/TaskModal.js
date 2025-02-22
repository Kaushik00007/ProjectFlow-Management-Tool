import React from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

const TaskModal = ({ open, onClose, task }) => {
  if (!task) return null; // Return null if task is null

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
        }}
      >
        <h2>{task.title}</h2>
        <p>{task.description}</p>
        <p>Due Date: {task.dueDate}</p>
        <p>Status: {task.status}</p>
      </Box>
    </Modal>
  );
};

export default TaskModal;