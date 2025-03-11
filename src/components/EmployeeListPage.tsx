import React, { useEffect, useState } from 'react';
import { PencilIcon, TrashIcon } from '@heroicons/react/solid';
import AddEmployeePage2 from './AddEmployeePage2';
import { EmployeeData } from './types';
import { updateEmployee } from '@/app/lib/actions';

const EmployeeListPage = () => {
  const [employees, setEmployees] = useState<EmployeeData[]>([]);

  useEffect(() => {
    fetch(`/api/v1/employees`)
      .then(response => response.json())
      .then((data: EmployeeData[]) => {
        setEmployees(data);
      });
  }, []);

  const [selectedEmployee, setSelectedEmployee] = useState<EmployeeData | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isAddEmployeePage2Open, setIsAddEmployeePage2Open] = useState(false);

  const handleEditClick = (employee: EmployeeData) => {
    setSelectedEmployee(employee);
    setIsEditModalOpen(true);
  };

  const handleDeleteClick = (employee: EmployeeData) => {
    setSelectedEmployee(employee);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (selectedEmployee) {
      setEmployees(employees.filter(emp => emp.employeeId !== selectedEmployee.employeeId));
      await fetch(`/api/v1/employees?id=${selectedEmployee.employeeId}`, { method: 'DELETE' });
      setIsDeleteModalOpen(false);
    }
  };

  const handleAddEmployeeClick = () => {
    setIsAddEmployeePage2Open(true);
  };

  const EmployeeCard = ({ employee }: { employee: EmployeeData }) => {
    return (
      <div className="bg-white shadow-md rounded-lg p-4 relative">
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
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
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

  const DeleteConfirmationModal = () => {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
        <div className="bg-white rounded-lg p-6 w-96">
          <h2 className="font-geoformHeavy text-xl text-blue-950 font-bold mb-4">Delete project 1 name's information?</h2>
          <p className="font-geoformItalic mb-4 text-blue-950">This action cannot be undone.</p>
          <div className="flex justify-end space-x-2">
            <button
              onClick={() => setIsDeleteModalOpen(false)}
              className="font-geoformHeavy bg-white text-blue-950 border border-blue-950 hover:bg-blue-950 hover:text-white px-4 py-2 rounded"
            >
              Back
            </button>
            <form action={handleConfirmDelete}>
              <button
                type="submit"
                className="font-geoformHeavy bg-blue-950 text-white font-bold border hover:bg-white hover:text-blue-950 hover:border-blue-950 px-4 py-2 rounded"
              >
                Delete
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      {!isAddEmployeePage2Open && (
        <div className="container mx-auto p-4">
          <div className="flex justify-between items-center mb-4">
            <h1 className="font-geoformHeavy text-3xl font-bold text-blue-950">Employee Overview</h1>
            <button
              onClick={handleAddEmployeeClick}
              className="font-geoformHeavy bg-blue-950 font-bold text-white px-4 py-2 rounded"
            >
              ADD EMPLOYEE
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {employees.map((employee) => (
              <EmployeeCard key={employee.employeeId} employee={employee} />
            ))}
          </div>

          {isEditModalOpen && <EditEmployeeModal employee={selectedEmployee!} />}
          {isDeleteModalOpen && <DeleteConfirmationModal />}
        </div>
      )}

      {isAddEmployeePage2Open && (
        <AddEmployeePage2
          onBack={() => setIsAddEmployeePage2Open(false)}
          onAddEmployee={(newEmployee) => {
            setEmployees([...employees, newEmployee]);
            setIsAddEmployeePage2Open(false);
          }}
        />
      )}
    </div>
  );
};

export default EmployeeListPage;