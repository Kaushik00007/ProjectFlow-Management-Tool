import axios from 'axios';

const API_URL = 'http://localhost:5000/api/tasks';

// Create a task
export const createTask = async (taskData) => {
  const token = localStorage.getItem('token');
  const response = await axios.post(API_URL, taskData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// Fetch all tasks
export const fetchTasks = async () => {
  const token = localStorage.getItem('token');
  const response = await axios.get(API_URL, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// Update a task
export const updateTask = async (taskId, updatedData) => {
  const token = localStorage.getItem('token');
  const response = await axios.put(`${API_URL}/${taskId}`, updatedData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// Delete a task
export const deleteTask = async (taskId) => {
  const token = localStorage.getItem('token');
  const response = await axios.delete(`${API_URL}/${taskId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};