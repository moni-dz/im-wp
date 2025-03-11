import React, { useState } from 'react';
import { ContractDetails, EmployeeData, Project, TeamMember } from './types';
import { ArrowLeftIcon, TrashIcon } from '@heroicons/react/solid';
import AddEmployeePage from './AddEmployeePage'; 

interface DeleteConfirmationProps {
  member: EmployeeData;
  onConfirm: () => void;
  onCancel: () => void;
}

const DeleteConfirmation: React.FC<DeleteConfirmationProps> = ({ member, onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <h3 className="font-geoformItalic text-lg font-medium mb-4 text-blue-950">Delete {member.personName}'s information?</h3>
        <p className="font-geoformHeavy mb-6 text-blue-950">This action cannot be undone.</p>
        <div className="flex justify-end space-x-3">
          <button onClick={onCancel} className="px-4 py-2 font-geoformHeavy border bg-blue-950 text-white rounded-md hover:bg-white hover:text-blue-950 hover:border-blue-950">
            Back
          </button>
          <button onClick={onConfirm} className="px-4 py-2 font-geoformHeavy border bg-blue-950 text-white rounded-md hover:bg-white hover:text-blue-950 hover:border-blue-950">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

interface EmployeeListEditorProps {
  project: ContractDetails;
  teamMembers: EmployeeData[];
  onBack: () => void;
  onDeleteMember?: (member: EmployeeData) => void;
  onAddMember?: (member: EmployeeData) => void;
}

const EmployeeListEditor: React.FC<EmployeeListEditorProps> = ({
  project,
  teamMembers,
  onBack,
  onDeleteMember,
  onAddMember
}) => {
  const [memberToDelete, setMemberToDelete] = useState<EmployeeData | null>(null);
  const [showAddEmployeePage, setShowAddEmployeePage] = useState(false);

  const handleDeleteClick = (member: EmployeeData) => {
    setMemberToDelete(member);
  };

  const handleConfirmDelete = async () => {
    if (memberToDelete && onDeleteMember) {
      onDeleteMember(memberToDelete);

    }

    fetch

    setMemberToDelete(null);
  };

  const handleCancelDelete = () => {
    setMemberToDelete(null);
  };

  const handleAddEmployee = (employeeData: any) => {
    if (onAddMember) {
      onAddMember(employeeData);
    }
    setShowAddEmployeePage(false);
  };

  if (showAddEmployeePage) {
    return <AddEmployeePage onBack={() => setShowAddEmployeePage(false)} onAddEmployee={handleAddEmployee} />;
  }

  return (
    <div className="bg-gray-100 text-blue-950 min-h-screen">
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-3xl text-blue-950 font-geoformHeavy font-bold mb-6">Employee List: {project.projectName}</h1>

        <div className="bg-white rounded-lg p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-gray-100 rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-geoformHeavy font-medium">{member.personName}</h3>
                    <p className="text-blue-950 font-geoformItalic text-sm mt-2">remarks</p>
                  </div>
                  <button onClick={() => handleDeleteClick(member)} className="p-1 text-blue-950 hover:text-gray-700">
                    <TrashIcon className="h-5 w-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center mb-6">
          <button onClick={() => setShowAddEmployeePage(true)} className="hover:bg-white hover:text-blue-950 hover:border-blue-950 font-geoformHeavy bg-blue-950 font-bold text-white rounded-md px-8 py-3 font-medium">
            ADD EMPLOYEE
          </button>
        </div>

        <button onClick={onBack} className="hover:bg-white hover:text-blue-950 hover:border-blue-950 font-geoformHeavy mt-4 px-4 py-2 bg-blue-950 font-bold text-white rounded flex items-center space-x-1">
          <ArrowLeftIcon className="h-5 w-5" />
          <span>Back to Project Details</span>
        </button>

        {memberToDelete && <DeleteConfirmation member={memberToDelete} onConfirm={handleConfirmDelete} onCancel={handleCancelDelete} />}
      </div>
    </div>
  );
};

export default EmployeeListEditor;
