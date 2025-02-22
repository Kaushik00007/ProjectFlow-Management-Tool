import React, { useState } from 'react';
import AddTaskModal from '../components/AddTaskModal';
import BtnPrimary from '../components/BtnPrimary';
import TaskModal from '../components/TaskModal';

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const addTask = (task) => {
    setTasks([...tasks, { ...task, id: Date.now() }]);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Tasks</h1>
      <BtnPrimary onClick={() => setIsAddModalOpen(true)}>Add Task</BtnPrimary>

      <AddTaskModal
        open={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        addTask={addTask}
      />

      {selectedTask && (
        <TaskModal
          open={isTaskModalOpen}
          onClose={() => {
            setIsTaskModalOpen(false);
            setSelectedTask(null);
          }}
          task={selectedTask}
        />
      )}

      <div style={{ marginTop: '20px' }}>
        {tasks.map((task) => (
          <div
            key={task.id}
            style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}
            onClick={() => {
              setSelectedTask(task);
              setIsTaskModalOpen(true);
            }}
          >
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <p>Due: {task.dueDate}</p>
            <p>Status: {task.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tasks;