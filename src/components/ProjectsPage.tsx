'use client';

import React, { useState, useEffect } from 'react';
import { Project, ContractDetails } from './types';
import ProjectList from './ProjectList';
import ProjectDetail from './ProjectDetail';
import AddProjectForm from './AddProjectForm';
import { deleteContract } from '@/app/lib/actions';

const ProjectsPage = () => {
  const [selectedProject, setSelectedProject] = useState<ContractDetails | null>(null);
  const [isAddingProject, setIsAddingProject] = useState(false);
  const [projects, setProjects] = useState<ContractDetails[]>([]);

  useEffect(() => {
    fetch('/api/v1/contracts')
      .then(res => res.json())
      .then((data: ContractDetails[]) => {
        setProjects(data);
      });
  }, []);

  const handleSelectProject = (project: ContractDetails) => {
    setSelectedProject(project);
  };

  const onDeleteProject = async (project: ContractDetails) => {
    setProjects(projects.filter(p => p.contractId !== project.contractId));
    await deleteContract(project.contractId);
  };

  const handleBackToProjects = () => {
    setSelectedProject(null);
  };

  if (selectedProject) {
    return <ProjectDetail project={selectedProject} onBack={handleBackToProjects} />;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-8">
        <h2 className="font-geoformHeavy text-3xl font-bold text-blue-950">Projects</h2>
        <button 
          onClick={() => setIsAddingProject(true)}
          className="bg-blue-950 font-geoformHeavy rounded-lg  font-bold text-white px-4 py-2 border hover:border-blue-950 hover:bg-white hover:text-blue-950 "
        >
          ADD PROJECT
        </button>
      </div>

      {/* Add Project Modal */}
      {isAddingProject && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <AddProjectForm onCancel={() => setIsAddingProject(false)} />
        </div>
      )}

      <div className="space-y-8">
        <div>
          <h3 className="text-2xl font-geoformHeavy text-blue-950 font-bold mb-4">Active</h3>
          <ProjectList 
            projects={projects.filter(p => p.status.toLowerCase() === 'active')}
            onSelectProject={handleSelectProject}
            onDeleteProject={onDeleteProject}
          />
        </div>

        <div>
          <h3 className="text-2xl font-geoformHeavy text-blue-950 font-bold mb-4">Completed</h3>
          <ProjectList 
            projects={projects.filter(p => p.status === 'completed')}
            onSelectProject={handleSelectProject}
            onDeleteProject={onDeleteProject}
          />
        </div>
      </div>
    </div>
  );
};

export default ProjectsPage;