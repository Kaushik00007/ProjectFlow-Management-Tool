import React, { useState, useEffect } from 'react';
import { fetchTasks, createTask, updateTask, deleteTask } from '../services/taskService';
import AddTaskModal from '../components/AddTaskModal';
import BtnPrimary from '../components/BtnPrimary';
import TaskModal from '../components/TaskModal';

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  // Fetch tasks from the backend on component mount
  useEffect(() => {
    const loadTasks = async () => {
      try {
        const tasks = await fetchTasks();
        setTasks(tasks);
      } catch (err) {
        console.error('Failed to fetch tasks:', err.message);
      }
    };
    loadTasks();
  }, []);

  // Add a new task
  const addTask = async (task) => {
    try {
      const newTask = await createTask(task);
      setTasks([...tasks, newTask]);
      setIsAddModalOpen(false); // Close the modal after adding
    } catch (err) {
      console.error('Failed to add task:', err.message);
    }
  };

  // Update an existing task
  const updateTaskHandler = async (updatedTask) => {
    try {
      const updated = await updateTask(updatedTask._id, updatedTask);
      setTasks(tasks.map((task) => (task._id === updated._id ? updated : task)));
      setIsTaskModalOpen(false); // Close the modal after updating
      setSelectedTask(null); // Clear the selected task
    } catch (err) {
      console.error('Failed to update task:', err.message);
    }
  };

  // Delete a task
  const deleteTaskHandler = async (taskId) => {
    try {
      await deleteTask(taskId);
      setTasks(tasks.filter((task) => task._id !== taskId));
      setIsTaskModalOpen(false); // Close the modal after deleting
      setSelectedTask(null); // Clear the selected task
    } catch (err) {
      console.error('Failed to delete task:', err.message);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Tasks</h1>
      <BtnPrimary onClick={() => setIsAddModalOpen(true)}>Add Task</BtnPrimary>

      {/* Add Task Modal */}
      <AddTaskModal
        open={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        addTask={addTask}
      />

      {/* Task Details/Edit Modal */}
      {selectedTask && (
        <TaskModal
          open={isTaskModalOpen}
          onClose={() => {
            setIsTaskModalOpen(false);
            setSelectedTask(null);
          }}
          task={selectedTask}
          onUpdate={updateTaskHandler}
          onDelete={deleteTaskHandler}
        />
      )}

      {/* Task List */}
      <div style={{ marginTop: '20px' }}>
        {tasks.map((task) => (
          <div
            key={task._id}
            style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px', cursor: 'pointer' }}
            onClick={() => {
              setSelectedTask(task);
              setIsTaskModalOpen(true);
            }}
          >
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <p>Due: {new Date(task.dueDate).toLocaleDateString()}</p>
            <p>Status: {task.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tasks;