import React, { useState } from 'react';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { SortableContext, arrayMove, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import TaskCard from './TaskCard';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

const Column = ({ id, title, tasks, setTasks }) => {
  return (
    <div style={{ flex: 1, padding: 10, border: '1px solid #ccc', minHeight: 200 }}>
      <h2>{title}</h2>
      <SortableContext items={tasks.map(task => task.id)}>
        {tasks.map((task, index) => (
          <DraggableTask key={task.id} task={task} index={index} setTasks={setTasks} />
        ))}
      </SortableContext>
    </div>
  );
};

const DraggableTask = ({ task, index, setTasks }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: task.id });

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
        padding: 10,
        margin: '5px 0',
        border: '1px solid gray',
        backgroundColor: 'white',
        cursor: 'grab',
      }}
    >
      <TaskCard task={task} />
    </div>
  );
};

const ProjectBoard = ({ tasks, setTasks }) => {
  const [columns, setColumns] = useState([
    { id: 'todo', title: 'To Do' },
    { id: 'in-progress', title: 'In Progress' },
    { id: 'done', title: 'Done' },
  ]);
  const [isAddColumnModalOpen, setIsAddColumnModalOpen] = useState(false);
  const [newColumnName, setNewColumnName] = useState('');

  const onDragEnd = (event) => {
    const { active, over } = event;
    if (!over) return;

    setTasks((prevTasks) => {
      const oldIndex = prevTasks.findIndex(task => task.id === active.id);
      const newIndex = prevTasks.findIndex(task => task.id === over.id);
      return arrayMove(prevTasks, oldIndex, newIndex);
    });
  };

  const addColumn = () => {
    if (!newColumnName.trim()) return;
    setColumns([...columns, { id: newColumnName.toLowerCase().replace(/\s+/g, '-'), title: newColumnName }]);
    setNewColumnName('');
    setIsAddColumnModalOpen(false);
  };

  return (
    <div>
      <Button onClick={() => setIsAddColumnModalOpen(true)}>Add Column</Button>

      <Dialog open={isAddColumnModalOpen} onClose={() => setIsAddColumnModalOpen(false)}>
        <DialogTitle>Add New Column</DialogTitle>
        <DialogContent>
          <TextField
            label="Column Name"
            fullWidth
            value={newColumnName}
            onChange={(e) => setNewColumnName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsAddColumnModalOpen(false)}>Cancel</Button>
          <Button onClick={addColumn}>Add</Button>
        </DialogActions>
      </Dialog>

      <DndContext collisionDetection={closestCenter} onDragEnd={onDragEnd}>
        <div style={{ display: 'flex', gap: '20px' }}>
          {columns.map((column) => (
            <Column
              key={column.id}
              id={column.id}
              title={column.title}
              tasks={tasks.filter(task => task.status === column.id)}
              setTasks={setTasks}
            />
          ))}
        </div>
      </DndContext>
    </div>
  );
};

export default ProjectBoard;
