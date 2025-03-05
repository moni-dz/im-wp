import React, { useState } from 'react';
import { Project } from './types';
import { TrashIcon } from '@heroicons/react/solid';

interface ProjectListProps {
  projects: Project[];
  onSelectProject: (project: Project) => void;
  onDeleteProject: (projectId: number) => void;
}

const ProjectList = ({ projects, onSelectProject, onDeleteProject }: ProjectListProps) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState<Project | null>(null);

  const handleDeleteClick = (e: React.MouseEvent, project: Project) => {
    e.stopPropagation();
    setProjectToDelete(project);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (projectToDelete) {
      onDeleteProject(projectToDelete.id);
      setShowDeleteModal(false);
      setProjectToDelete(null);
    }
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
    setProjectToDelete(null);
  };

  if (projects.length === 0) {
    return (
      <div className="bg-gray-100 p-4 rounded text-center text-blue-950">
        No projects found
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {projects.map(project => (
          <div
            key={project.id}
            onClick={() => onSelectProject(project)}
            className="bg-white rounded-lg p-4 shadow cursor-pointer"
          >
            <div className="flex justify-between items-start">
              <h3 className="text-blue-950 font-bold ">{project.name}</h3>
              <div className="flex space-x-2">
                {/* Trash Icon */}
                <button
                  className="text-blue-950 hover:text-gray-500"
                  onClick={(e) => handleDeleteClick(e, project)}
                >
                  <TrashIcon className="h-5 w-5" />
                </button>
              </div>
            </div>
            
            <div className="my-2">
              <div className="bg-gray-200 rounded px-3 py-1 text-xs inline-block mb-1">
                client name
              </div>
              <div className="bg-gray-200 rounded px-3 py-1 text-xs inline-block ml-2 mb-1">
                start date
              </div>
            </div>
            
            <div className="my-2">
              <div className="bg-gray-200 rounded px-3 py-1 text-xs inline-block mb-1">
                short description
              </div>
              <div className="bg-gray-200 rounded px-3 py-1 text-xs inline-block ml-2 mb-1">
                location
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && projectToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-2xl font-bold text-blue-950 mb-4">
              Delete {projectToDelete.name}'s information?
            </h2>
            <p className="text-lg text-blue-950 mb-8">
              This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={cancelDelete}
                className="px-6 py-2 border border-gray-300 rounded-md text-lg"
              >
                Back
              </button>
              <button
                onClick={confirmDelete}
                className="px-6 py-2 bg-blue-950 text-white rounded-md text-lg"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProjectList;