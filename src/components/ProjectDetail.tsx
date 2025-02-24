// will edit inline to direct import pero sunod na kay katugon
import React from 'react';
import { Project } from './types';

interface ProjectDetailProps {
  project: Project;
  onBack: () => void;
}

const ProjectDetail = ({ project, onBack }: ProjectDetailProps) => {
  // mock data for display purposes lng
  const clientInfo = {
    name: "Client Name",
    location: "Location",
    startDate: project.startDate,
    amount: "50,000",
    estimatedCompletion: "2024-05-30"
  };
  
  const teamMembers = [
    { name: "neuvilette", role: "project manager" },
    { name: "wriothesley", role: "arki" }
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">{project.name}</h2>
        <div className="flex space-x-2">
          {/* Edit Icon */}
          <button className="p-1 text-gray-500 hover:text-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
            </svg>
          </button>
          
          {/* Delete Icon */}
          <button className="p-1 text-gray-500 hover:text-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>

      <div className="bg-gray-100 rounded-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Client Information */}
          <div className="bg-white rounded-lg p-4 shadow">
            <h3 className="font-medium mb-2">{clientInfo.name}</h3>
            <div className="text-sm space-y-1">
              <p>start date: {clientInfo.startDate}</p>
              <p>location: {clientInfo.location}</p>
              <p>amount: {clientInfo.amount}</p>
              <p>estimated completion date: {clientInfo.estimatedCompletion}</p>
            </div>
          </div>

          {/* Description */}
          <div className="bg-white rounded-lg p-4 shadow">
            <h3 className="font-medium mb-2">description</h3>
            <p className="text-sm">{project.description}</p>
          </div>

          {/* Team and Documents */}
          <div className="space-y-4">
            {/* Employee List */}
            <div className="bg-white rounded-lg p-4 shadow">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-medium">employee list</h3>
                <button className="p-1 text-gray-500 hover:text-gray-700">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                  </svg>
                </button>
              </div>

              <div className="space-y-2">
                {teamMembers.map((member, index) => (
                  <div key={index} className="bg-gray-100 p-2 rounded">
                    <p className="font-medium">{member.name}</p>
                    <p className="text-xs text-gray-500">role: {member.role}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Documents */}
            <div className="bg-white rounded-lg p-4 shadow">
              <h3 className="font-medium">documents</h3>
            </div>

            {/* Notes */}
            <div className="bg-white rounded-lg p-4 shadow">
              <h3 className="font-medium">notes</h3>
            </div>
          </div>
        </div>
      </div>

      <button 
        onClick={onBack}
        className="mt-4 px-4 py-2 bg-gray-200 rounded flex items-center space-x-1"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
        </svg>
        <span>Back to Projects</span>
      </button>
    </div>
  );
};

export default ProjectDetail;
