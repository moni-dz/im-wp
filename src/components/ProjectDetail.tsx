import React, { useEffect, useState } from 'react';
import { ContractDetails, EmployeeData, Project, TeamMember } from './types';
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
  const [showEditProject, setShowEditProject] = useState(false); // New state for edit mode
  const [currentProject, setCurrentProject] = useState<ContractDetails>(project);
  const [teamMembers, setTeamMembers] = useState<EmployeeData[]>([]);

  useEffect(() => {
    // Fetch team members
    fetch(`/api/v1/employees`)
      .then(response => response.json())
      .then((data: EmployeeData[]) => {
        setTeamMembers(data);
      });
  }, []);
  
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

  // New handlers for edit project
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

  const handleDeleteMember = (memberToDelete: EmployeeData) => {
    setTeamMembers(teamMembers.filter(member => member.employeeId !== memberToDelete.employeeId));
  };

  if (showDocuments) {
    return <Documents project={currentProject} onBack={handleBackFromDocuments} />;
  }

  if (showEmployeeEditor) {
    return (
      <EmployeeListEditor 
        project={currentProject}
        teamMembers={teamMembers}
        onBack={handleBackFromEmployeeEditor}
        onDeleteMember={handleDeleteMember}
      />
    );
  }

  // SHOW edit project component when in edit mode
  if (showEditProject) {
    return (
      <EditProject 
        project={currentProject}
        onBack={handleBackFromEditProject}
        onSave={handleSaveProject}
      />
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">{currentProject.projectName}</h2>
        <div className="flex space-x-2">
          {/* Edit Icon - Now with click handler */}
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
            <h3 className="font-medium mb-2 text-blue-950">{currentProject.clientName}</h3>
            <div className="text-sm space-y-1 text-blue-950">
              <p>start date: {currentProject.dateStart}</p>
              <p>location: {`${currentProject.locationStreet} ${currentProject.locationBarangay} ${currentProject.locationCity} ${currentProject.locationProvince}`}</p>
              <p>amount: {currentProject.contractAmount}</p>
              <p>estimated completion date: {currentProject.dateEnd}</p>
            </div>
          </div>

          {/* Description */}
          <div className="bg-white rounded-lg p-4 shadow">
            <h3 className="font-medium mb-2 text-blue-950">Description</h3>
            <p className="text-sm text-blue-950">{currentProject.projectDescription}</p>
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
                {teamMembers.filter(m => m.contractId === currentProject.contractId).map((member, index) => (
                  <div key={index} className="bg-gray-100 p-2 rounded">
                    <p className="font-medium text-blue-950">{member.personName}</p>
                    <p className="text-xs text-blue-950">role: {member.roleName}</p>
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