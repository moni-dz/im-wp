import React from 'react';
import { Project } from './types';
import { PencilIcon, TrashIcon } from '@heroicons/react/solid';

interface ProjectListProps {
  projects: Project[];
  onSelectProject: (project: Project) => void;
}

const ProjectList = ({ projects, onSelectProject }: ProjectListProps) => {
  if (projects.length === 0) {
    return (
      <div className="bg-gray-100 p-4 rounded text-center text-blue-950">
        No projects found
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {projects.map(project => (
        <div 
          key={project.id}
          onClick={() => onSelectProject(project)}
          className="bg-white rounded-lg p-4 shadow cursor-pointer"
        >
          <div className="flex justify-between items-start">
            <h3 className="font-medium">{project.name}</h3>
            <div className="flex space-x-2">
              {/* Pencil Icon */}
              <button 
                className="text-blue-950 hover:text-blue-950"
                onClick={(e) => {
                  e.stopPropagation();
                  // edit functionality here
                }}
              >
                <PencilIcon className="h-5 w-5" />
              </button>
              
              {/* Trash Icon */}
              <button 
                className="text-blue-950 hover:text-blue-950"
                onClick={(e) => {
                  e.stopPropagation();
                  // delete functionality herezzzzzz
                }}
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
  );
};

export default ProjectList;
