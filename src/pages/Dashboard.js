import React, { useState } from 'react';
import ProjectBoard from '../components/ProjectBoard';
import AddTaskModal from '../components/AddTaskModal';
import BtnPrimary from '../components/BtnPrimary';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';

const Dashboard = () => {
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Task 1', description: 'Do something', dueDate: '2023-10-15', status: 'To Do' },
    { id: 2, title: 'Task 2', description: 'Do something else', dueDate: '2023-10-16', status: 'In Progress' },
    { id: 3, title: 'Task 3', description: 'Finish this', dueDate: '2023-10-17', status: 'Done' },
  ]);
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);
  const [filter, setFilter] = useState('all');

  const filteredTasks = tasks.filter(task => {
    if (filter === 'completed') return task.status === 'Done';
    if (filter === 'pending') return task.status !== 'Done';
    return true; // Show all tasks
  });

  const addTask = (newTask) => {
    setTasks([...tasks, { ...newTask, id: Date.now() }]);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Dashboard</h1>
      <BtnPrimary onClick={() => setIsAddTaskModalOpen(true)}>Add Task</BtnPrimary>

      <FormControl fullWidth style={{ marginTop: '20px' }}>
        <InputLabel>Filter</InputLabel>
        <Select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          label="Filter"
        >
          <MenuItem value="all">All</MenuItem>
          <MenuItem value="completed">Completed</MenuItem>
          <MenuItem value="pending">Pending</MenuItem>
        </Select>
      </FormControl>

      <AddTaskModal
        open={isAddTaskModalOpen}
        onClose={() => setIsAddTaskModalOpen(false)}
        addTask={addTask}
      />

      <ProjectBoard tasks={filteredTasks} setTasks={setTasks} />
    </div>
  );
};

export default Dashboard;