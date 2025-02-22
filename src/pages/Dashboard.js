import React, { useState } from 'react';
import ProjectBoard from '../components/ProjectBoard';
import AddTaskModal from '../components/AddTaskModal';
import BtnPrimary from '../components/BtnPrimary';

const Dashboard = () => {
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Task 1', description: 'Do something', dueDate: '2023-10-15', status: 'To Do' },
    { id: 2, title: 'Task 2', description: 'Do something else', dueDate: '2023-10-16', status: 'In Progress' },
    { id: 3, title: 'Task 3', description: 'Finish this', dueDate: '2023-10-17', status: 'Done' },
  ]);

  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);

  const addTask = (newTask) => {
    setTasks([...tasks, { ...newTask, id: Date.now() }]);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Dashboard</h1>
      <BtnPrimary onClick={() => setIsAddTaskModalOpen(true)}>Add Task</BtnPrimary>

      <AddTaskModal
        open={isAddTaskModalOpen}
        onClose={() => setIsAddTaskModalOpen(false)}
        addTask={addTask}
      />

      <ProjectBoard tasks={tasks} setTasks={setTasks} />
    </div>
  );
};

export default Dashboard;