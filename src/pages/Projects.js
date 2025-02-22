import React, { useState } from 'react';
import AddProjectModal from '../components/AddProjectModal';
import BtnPrimary from '../components/BtnPrimary';
import BtnSecondary from '../components/BtnSecondary';
import EditProjectModal from '../components/EditProjectModal';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  const addProject = (project) => {
    setProjects([...projects, { ...project, id: Date.now() }]);
  };

  const updateProject = (updatedProject) => {
    setProjects(projects.map((p) => (p.id === updatedProject.id ? updatedProject : p)));
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Projects</h1>
      <BtnPrimary onClick={() => setIsAddModalOpen(true)}>Add Project</BtnPrimary>

      <AddProjectModal
        open={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        addProject={addProject}
      />

      {selectedProject && (
        <EditProjectModal
          open={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false);
            setSelectedProject(null);
          }}
          project={selectedProject}
          updateProject={updateProject}
        />
      )}

      <div style={{ marginTop: '20px' }}>
        {projects.map((project) => (
          <div
            key={project.id}
            style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}
          >
            <h3>{project.name}</h3>
            <BtnSecondary onClick={() => {
              setSelectedProject(project);
              setIsEditModalOpen(true);
            }}>
              Edit
            </BtnSecondary>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;