// will edit inline to direct import pero sunod na kay katugon
import React from 'react';
import { Project } from './types';

interface ProjectListProps {
  projects: Project[];
  onSelectProject: (project: Project) => void;
}

const ProjectList = ({ projects, onSelectProject }: ProjectListProps) => {
  if (projects.length === 0) {
    return (
      <div className="bg-gray-100 p-4 rounded text-center text-gray-500">
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
                className="text-gray-500 hover:text-gray-700"
                onClick={(e) => {
                  e.stopPropagation();
                  // edit functionality here
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                </svg>
              </button>
              
              {/* Trash Icon */}
              <button 
                className="text-gray-500 hover:text-gray-700"
                onClick={(e) => {
                  e.stopPropagation();
                  // delete functionality herezzzzzz
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
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
