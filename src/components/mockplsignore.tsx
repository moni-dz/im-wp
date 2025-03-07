import React, { useState } from 'react';
import { Project, TeamMember, ContractDetails } from './types';
import Documents from './Documents';
import EmployeeListEditor from './EmployeeListEditor';
import EditProject from './EditProject'; 
import { PencilIcon, ArrowLeftIcon } from '@heroicons/react/solid';

interface ProjectDetailProps {
  project: ContractDetails;
  onBack: () => void;
}

const ProjectDetail = ({ project, onBack }: ProjectDetailProps) => {
  const [showDocuments, setShowDocuments] = useState(false);
  const [showEmployeeEditor, setShowEmployeeEditor] = useState(false);
  const [showEditProject, setShowEditProject] = useState(false); 
  const [currentProject, setCurrentProject] = useState<ContractDetails>(project);
  
  const clientInfo = {
    name: currentProject.client_name || "Client Name",
    location: currentProject.location || "Location",
    startDate: currentProject.startDate || "Not specified",
    amount: "50,000",
    estimatedCompletion: currentProject.endDate || "2024-05-30"
  };
  
  // initialize team members -  mock data for now
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([
    { id: 1, name: "neuvilette", role: "project manager" },
    { id: 2, name: "wriothesley", role: "arki" }
  ]);
  
  const handleDocumentsClick = () => {
    setShowDocuments(true);
  };

  const handleBackFromDocuments = () => {
    setShowDocuments(false);
  };

  const handleEmployeeEditorClick = () => {
    setShowEmployeeEditor(true);
  };

  const handleBackFromEmployeeEditor = () => {
    setShowEmployeeEditor(false);
  };

  const handleEditProjectClick = () => {
    setShowEditProject(true);
  };

  const handleBackFromEditProject = () => {
    setShowEditProject(false);
  };

  const handleSaveProject = (updatedProject: ContractDetails) => {
    setCurrentProject(updatedProject);
    setShowEditProject(false);
  };

  const handleDeleteMember = (memberToDelete: TeamMember) => {
    setTeamMembers(teamMembers.filter(member => member.id !== memberToDelete.id));
  };

  const projectForComponents: Project = {
    id: currentProject.id || 0,
    name: currentProject.projectName || "",
    description: currentProject.description || "",
    status: (currentProject.status as 'active' | 'completed') || 'active',
    startDate: currentProject.startDate || "",
    endDate: currentProject.endDate,
    client_id: currentProject.client_id,
    teamMembers: teamMembers
  };

  if (showDocuments) {
    return <Documents project={projectForComponents} onBack={handleBackFromDocuments} />;
  }

  if (showEmployeeEditor) {
    return (
      <EmployeeListEditor 
        project={projectForComponents}
        teamMembers={teamMembers}
        onBack={handleBackFromEmployeeEditor}
        onDeleteMember={handleDeleteMember}
      />
    );
  }

  if (showEditProject) {
    return (
      <EditProject 
        project={projectForComponents}
        onBack={handleBackFromEditProject}
        onSave={(updatedProject: Project) => {
          const updatedContractDetails: ContractDetails = {
            ...currentProject,
            id: updatedProject.id,
            projectName: updatedProject.name,
            description: updatedProject.description,
            status: updatedProject.status,
            startDate: updatedProject.startDate,
            endDate: updatedProject.endDate,
            // preserve other fields from currentProject
          };
          handleSaveProject(updatedContractDetails);
        }}
      />
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">{currentProject.projectName}</h2>
        <div className="flex space-x-2">
          <button 
            className="p-1 text-blue-950 hover:text-blue-950"
            onClick={handleEditProjectClick}
          >
            <PencilIcon className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="bg-gray-100 rounded-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Client Information */}
          <div className="bg-white rounded-lg p-4 shadow">
            <h3 className="font-medium mb-2 text-blue-950">{clientInfo.name}</h3>
            <div className="text-sm space-y-1 text-blue-950">
              <p>start date: {clientInfo.startDate}</p>
              <p>location: {clientInfo.location}</p>
              <p>amount: {clientInfo.amount}</p>
              <p>estimated completion date: {clientInfo.estimatedCompletion}</p>
            </div>
          </div>

          {/* Description */}
          <div className="bg-white rounded-lg p-4 shadow">
            <h3 className="font-medium mb-2 text-blue-950">Description</h3>
            <p className="text-sm text-blue-950">{currentProject.description || "No description available"}</p>
          </div>

          {/* Team and Documents */}
          <div className="space-y-4">
            {/* Employee List */}
            <div className="bg-white rounded-lg p-4 shadow">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-bold text-blue-950">Employee list</h3>
                <button 
                  onClick={handleEmployeeEditorClick}
                  className="p-1 text-blue-950 hover:text-blue-950"
                >
                  <PencilIcon className="h-5 w-5" />
                </button>
              </div>

              <div className="space-y-2">
                {teamMembers.map((member, index) => (
                  <div key={index} className="bg-gray-100 p-2 rounded">
                    <p className="font-medium text-blue-950">{member.name}</p>
                    <p className="text-xs text-blue-950">role: {member.role}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Documents*/}
            <button 
              onClick={handleDocumentsClick}
              className="bg-blue-950 text-white rounded-lg p-4 shadow w-full text-left hover:bg-gray-100 hover:text-blue-950"
            >
              <h3 className="font-medium text-white hover:text-blue-950">Documents</h3>
            </button>

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