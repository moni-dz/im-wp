'use client';

import { useState } from 'react';
import { Project } from './types';
import ProjectList from './ProjectList';
import AddProjectForm from './AddProjectForm';

const ProjectsPage = () => {
  const [isAddingProject, setIsAddingProject] = useState(false);
  const [projects, setProjects] = useState<Project[]>([
    {
      id: 1,
      name: "building 1",
      description: "renovation",
      status: "active",
      startDate: "2024-02-01",
      progress: 65
    },
    {
      id: 2,
      name: "building 2",
      description: "new building",
      status: "completed",
      startDate: "2023-12-01",
      endDate: "2024-01-30",
      progress: 100
    }
  ]);

  const handleAddProject = (newProject: Omit<Project, 'id'>) => {
    const project = {
      ...newProject,
      id: projects.length + 1,
      progress: 0,
      status: 'active' as const
    };
    setProjects([...projects, project]);
    setIsAddingProject(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Projects</h2>
        <button
          onClick={() => setIsAddingProject(true)}
          className="bg-blue-900 text-white px-4 py-2 rounded-lg hover:bg-blue-800"
        >
          Add New Project
        </button>
      </div>

      {isAddingProject && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <AddProjectForm
            onSubmit={handleAddProject}
            onCancel={() => setIsAddingProject(false)}
          />
        </div>
      )}

      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-medium mb-4">Active Projects</h3>
          <ProjectList
            projects={projects.filter(p => p.status === 'active')}
          />
        </div>

        <div>
          <h3 className="text-xl font-medium mb-4">Completed Projects</h3>
          <ProjectList
            projects={projects.filter(p => p.status === 'completed')}
          />
        </div>
      </div>
    </div>
  );
};

export default ProjectsPage;