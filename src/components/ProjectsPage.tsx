'use client';

import React, { useState } from 'react';
import { Project } from './types';
import ProjectList from './ProjectList';
import ProjectDetail from './ProjectDetail';
import AddProjectForm from './AddProjectForm';

const ProjectsPage = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isAddingProject, setIsAddingProject] = useState(false);
  const [projects, setProjects] = useState<Project[]>([
    {
      id: 1,
      name: "project 1 name",
      description: "renovation of office building",
      status: "active",
      startDate: "2024-02-15",
      progress: 45
    },
    {
      id: 2,
      name: "project 2 name",
      description: "construction project",
      status: "active",
      startDate: "2024-01-10",
      progress: 30
    },
    {
      id: 3,
      name: "project 3 name",
      description: "design project",
      status: "completed",
      startDate: "2023-11-05",
      endDate: "2024-01-20",
      progress: 100
    },
    {
      id: 4,
      name: "project 4 name",
      description: "landscape design",
      status: "completed",
      startDate: "2023-10-15",
      endDate: "2023-12-30",
      progress: 100
    }
  ]);

  const handleSelectProject = (project: Project) => {
    setSelectedProject(project);
  };

  const handleBackToProjects = () => {
    setSelectedProject(null);
  };

  const handleAddProject = (projectData: Omit<Project, 'id' | 'progress'>) => {
    const newProject = {
      ...projectData,
      id: projects.length + 1,
      progress: 0
    };
    
    setProjects([...projects, newProject]);
    setIsAddingProject(false);
  };

  if (selectedProject) {
    return <ProjectDetail project={selectedProject} onBack={handleBackToProjects} />;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-xl">Projects</h2>
        <button 
          onClick={() => setIsAddingProject(true)}
          className="bg-blue-950 text-white px-4 py-2 rounded"
        >
          ADD PROJECT
        </button>
      </div>

      {/* Add Project Modal */}
      {isAddingProject && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <AddProjectForm
            onSubmit={handleAddProject}
            onCancel={() => setIsAddingProject(false)}
          />
        </div>
      )}

      <div className="space-y-8">
        <div>
          <h3 className="text-xl mb-4">active</h3>
          <ProjectList 
            projects={projects.filter(p => p.status === 'active')}
            onSelectProject={handleSelectProject}
          />
        </div>

        <div>
          <h3 className="text-xl mb-4">completed</h3>
          <ProjectList 
            projects={projects.filter(p => p.status === 'completed')}
            onSelectProject={handleSelectProject}
          />
        </div>
      </div>
    </div>
  );
};

export default ProjectsPage;