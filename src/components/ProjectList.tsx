import React, { useState } from 'react';
import { ContractDetails, Project } from './types';
import { TrashIcon } from '@heroicons/react/solid';

interface ProjectListProps {
  projects: ContractDetails[];
  onSelectProject: (project: ContractDetails) => void;
  onDeleteProject: (project: ContractDetails) => void;
}

const ProjectList = ({ projects, onSelectProject, onDeleteProject }: ProjectListProps) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState<ContractDetails | null>(null);

  const handleDeleteClick = (e: React.MouseEvent, project: ContractDetails) => {
    e.stopPropagation();
    setProjectToDelete(project);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (projectToDelete !== null) {
      onDeleteProject(projectToDelete);
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
      <div className="font-geoformHeavy bg-gray-100 p-4 rounded-lg  text-center text-blue-950">
        No projects found
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {projects.map(project => (
          <div
            key={project.contractId}
            onClick={() => onSelectProject(project)}
            className="bg-white rounded-lg   p-4 shadow cursor-pointer"
          >
            <div className="flex justify-between items-start">
              <h3 className="font-geoformHeavytext-blue-950 font-bold ">{project.projectName}</h3>
              <div className="flex space-x-2">
                {/* Trash Icon */}
                <button
                  className="font-geoformHeavy text-blue-950 hover:text-gray-100"
                  onClick={(e) => handleDeleteClick(e, project)}
                >
                  <TrashIcon className="h-5 w-5" />
                </button>
              </div>
            </div>
            
            <div className="my-2">
              <div className="font-geoformItalic bg-white border border-blue-950 rounded-lg  px-3 py-1 text-xs inline-block mb-1">
                client name
              </div>
              <div className="font-geoformItalic bg-white border border-blue-950 rounded-lg  px-3 py-1 text-xs inline-block ml-2 mb-1">
                start date
              </div>
            </div>
            
            <div className="my-2">
              <div className="font-geoformItalic bg-white border border-blue-950 rounded-lg  px-3 py-1 text-xs inline-block mb-1">
                short description
              </div>
              <div className="font-geoformItalic bg-white border border-blue-950 rounded-lg  px-3 py-1 text-xs inline-block ml-2 mb-1">
                location
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && projectToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg   shadow-lg max-w-md w-full">
            <h2 className="font-geoformHeavy text-2xl font-bold text-blue-950 mb-4">
              Delete {projectToDelete.projectName}'s information?
            </h2>
            <p className="font-geoformItalic text-lg text-blue-950 mb-8">
              This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={cancelDelete}
                className="font-geoformHeavy px-6 py-2 border border-gray-300 rounded-lg   text-lg"
              >
                Back
              </button>
              <button
                onClick={confirmDelete}
                className="font-geoformHeavy px-6 py-2 bg-blue-950 text-white rounded-lg   text-lg"
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