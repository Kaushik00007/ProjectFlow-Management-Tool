const express = require('express');
const Task = require('../models/Task');
const router = express.Router();

// Creating a task
router.post('/', async (req, res) => {
  const { title, description, dueDate, status, userId } = req.body;
  try {
    const task = new Task({ title, description, dueDate, status, userId });
    await task.save();
    res.status(201).json(task);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;