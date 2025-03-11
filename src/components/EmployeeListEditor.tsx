import React, { useState, useEffect } from 'react';
import { ContractDetails, EmployeeData, Project, TeamMember } from './types';
import { ArrowLeftIcon, TrashIcon, PencilIcon } from '@heroicons/react/solid';
import AddEmployeePage2 from './AddEmployeePage2'; 
import { updateEmployee } from '@/app/lib/actions';

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
  const [isAddEmployeePage2Open, setIsAddEmployeePage2Open] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<EmployeeData | null>(null);
  const [employees, setEmployees] = useState<EmployeeData[]>(teamMembers);

  useEffect(() => {
    setEmployees(teamMembers);
  }, [teamMembers]);

  const handleDeleteClick = (member: EmployeeData) => {
    setMemberToDelete(member);
  };

  const handleConfirmDelete = async () => {
    if (memberToDelete && onDeleteMember) {
      onDeleteMember(memberToDelete);
      
      setEmployees(employees.filter(emp => emp.employeeId !== memberToDelete.employeeId));
      
      await fetch(`/api/v1/employees?id=${memberToDelete.employeeId}`, { method: 'DELETE' });
    }
    setMemberToDelete(null);
  };

  const handleCancelDelete = () => {
    setMemberToDelete(null);
  };

  const handleAddEmployeeClick = () => {
    setIsAddEmployeePage2Open(true);
  };

  const handleEditClick = (employee: EmployeeData) => {
    setSelectedEmployee(employee);
    setIsEditModalOpen(true);
  };

  const EmployeeCard = ({ employee }: { employee: EmployeeData }) => {
    return (
      <div className="bg-gray-100 rounded-lg p-4 relative">
        <div className="absolute top-0 right-0 p-2 flex space-x-2">
          <button
            onClick={() => handleEditClick(employee)}
            className="text-blue-950 hover:text-gray-500"
          >
            <PencilIcon className="h-5 w-5" />
          </button>
          <button
            onClick={() => handleDeleteClick(employee)}
            className="text-blue-950 hover:text-gray-500"
          >
            <TrashIcon className="h-5 w-5" />
          </button>
        </div>
        <div className="pt-6">
          <h3 className="font-geoformHeavy text-blue-950 text-lg font-bold mb-3">{employee.personName}</h3>
          <p className="font-geoformItalic text-sm font-bold text-blue-950">
            Status: <span className="font-geoformItalic text-sm font-normal text-blue-950">{employee.designationRemarks}</span>
          </p>
          <p className="font-geoformItalic text-sm font-bold text-blue-950">
            Skills: <span className="font-geoformItalic text-sm font-normal text-blue-950">{employee.employeeSkills}</span>
          </p>
          <p className="font-geoformItalic text-sm font-bold text-blue-950">
            Date Contracted: <span className="font-geoformItalic text-sm font-normal text-blue-950">{employee.employeeDateContracted}</span>
          </p>
          <p className="font-geoformItalic text-sm font-bold text-blue-950">
            Role: <span className="font-geoformItalic text-sm font-normal text-blue-950">{employee.roleName}</span>
          </p>
        </div>
      </div>
    );
  };

  const EditEmployeeModal = ({ employee }: { employee: EmployeeData }) => {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white rounded-lg p-6 w-96">
          <h2 className="font-geoformHeavy text-xl text-blue-950 font-bold mb-4">Edit Employee</h2>
          <form action={async (formData) => {
            await updateEmployee(formData);

            const res = await fetch(`/api/v1/employees`);
            const data: EmployeeData[] = await res.json();
            setEmployees(data);

            setIsEditModalOpen(false);
          }}>
            {/* hidden, don't touch */}
            <input type="hidden" name="employeeId" value={employee.employeeId} />
            <input type="hidden" name="personId" value={employee.employeePersonId} />
            <input type="hidden" name="roleId" value={employee.roleId} />

            <div className="grid grid-cols-2 gap-6">
              {/* Person Name */}
              <div className="col-span-2">
                <h2 className="text-lg font-bold text-blue-950 mb-4">Person</h2>
              </div>
              <div>
                <label className="block text-blue-950 font-geoformHeavy mb-2">
                  Name
                </label>
                <input
                  type="text"
                  name="personName"
                  defaultValue={employee.personName!}
                  className="w-full bg-gray-100 rounded p-2"
                  required
                />
              </div>

              {/* Employee Fields */}
              <div className="col-span-2">
                <h2 className="text-lg font-bold text-blue-950 mb-4">Employee</h2>
              </div>
              <div>
                <label className="block text-blue-950 font-geoformHeavy mb-2">
                  Status
                </label>
                <input
                  type="text"
                  name="status"
                  defaultValue={employee.employeeStatus!}
                  className="w-full bg-gray-100 rounded p-2"
                  required
                />
              </div>
              <div>
                <label className="block text-blue-950 font-geoformHeavy mb-2">
                  Skills
                </label>
                <input
                  type="text"
                  name="skills"
                  defaultValue={employee.employeeSkills!}
                  className="w-full bg-gray-100 rounded p-2"
                  required
                />
              </div>
              <div>
                <label className="block text-blue-950 font-geoformHeavy mb-2">
                  Date Contracted
                </label>
                <input
                  type="date"
                  name="dateContracted"
                  defaultValue={employee.employeeDateContracted!}
                  className="w-full bg-gray-100 rounded p-2"
                  required
                />
              </div>

              {/* Role Fields */}
              <div className="col-span-2">
                <h2 className="text-lg font-bold text-blue-950 mb-4">Role</h2>
              </div>
              <div>
                <label className="block text-blue-950 font-geoformHeavy mb-2">
                  Role Name
                </label>
                <input
                  type="text"
                  name="roleName"
                  defaultValue={employee.roleName!}
                  className="w-full bg-gray-100 rounded p-2"
                  required
                />
              </div>
            </div>

            <div className="mt-6">
              <button
                type="submit"
                className="bg-blue-950 text-white font-geoformHeavy px-4 py-2 rounded"
              >
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  if (isAddEmployeePage2Open) {
    return (
      <AddEmployeePage2
        onBack={() => setIsAddEmployeePage2Open(false)}
        onAddEmployee={(newEmployee) => {
          setEmployees([...employees, newEmployee]);
          
          if (onAddMember) {
            onAddMember(newEmployee);
          }
          
          setIsAddEmployeePage2Open(false);
        }}
      />
    );
  }

  return (
    <div className="bg-gray-100 text-blue-950 min-h-screen">
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-3xl text-blue-950 font-geoformHeavy font-bold mb-6">Employee List: {project.projectName}</h1>

        <div className="bg-white rounded-lg p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {employees.map((employee, index) => (
              <EmployeeCard key={index} employee={employee} />
            ))}
          </div>
        </div>

        <div className="flex justify-center mb-6">
          <button 
            onClick={handleAddEmployeeClick}
            className="hover:bg-white hover:text-blue-950 hover:border-blue-950 font-geoformHeavy bg-blue-950 font-bold text-white rounded-md px-8 py-3 font-medium"
          >
            ADD EMPLOYEE
          </button>
        </div>

        <button 
          onClick={onBack} 
          className="hover:bg-white hover:text-blue-950 hover:border-blue-950 font-geoformHeavy mt-4 px-4 py-2 bg-blue-950 font-bold text-white rounded flex items-center space-x-1"
        >
          <ArrowLeftIcon className="h-5 w-5" />
          <span>Back to Project Details</span>
        </button>

        {memberToDelete && (
          <DeleteConfirmation 
            member={memberToDelete} 
            onConfirm={handleConfirmDelete} 
            onCancel={handleCancelDelete} 
          />
        )}
        
        {isEditModalOpen && selectedEmployee && (
          <EditEmployeeModal employee={selectedEmployee} />
        )}
      </div>
    </div>
  );
};

export default EmployeeListEditor;