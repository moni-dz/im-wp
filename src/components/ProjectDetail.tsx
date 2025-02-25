import React, { useState } from 'react';
import { Project } from './types';
import Documents from './Documents';
import { PencilIcon, TrashIcon, ArrowLeftIcon } from '@heroicons/react/solid';

interface ProjectDetailProps {
  project: Project;
  onBack: () => void;
}

const ProjectDetail = ({ project, onBack }: ProjectDetailProps) => {
  const [showDocuments, setShowDocuments] = useState(false);
  
  // mock data for display purposes
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

  const handleDocumentsClick = () => {
    setShowDocuments(true);
  };

  const handleBackFromDocuments = () => {
    setShowDocuments(false);
  };

  if (showDocuments) {
    return <Documents project={project} onBack={handleBackFromDocuments} />;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">{project.name}</h2>
        <div className="flex space-x-2">
          {/* Edit Icon */}
          <button className="p-1 text-gray-500 hover:text-gray-700">
            <PencilIcon className="h-5 w-5" />
          </button>
          
          {/* Delete Icon */}
          <button className="p-1 text-gray-500 hover:text-gray-700">
            <TrashIcon className="h-5 w-5" />
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
                  <PencilIcon className="h-5 w-5" />
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

            {/* Documents - Now a clickable button */}
            <button 
              onClick={handleDocumentsClick}
              className="bg-white rounded-lg p-4 shadow w-full text-left hover:bg-gray-50"
            >
              <h3 className="font-medium">documents</h3>
            </button>

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
        <ArrowLeftIcon className="h-5 w-5" />
        <span>Back to Projects</span>
      </button>
    </div>
  );
};

export default ProjectDetail;