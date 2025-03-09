import React, { useEffect, useState } from 'react';
import { PencilIcon, TrashIcon } from '@heroicons/react/solid';
import AddEmployeePage2 from './AddEmployeePage2';
import { EmployeeData } from './types';

interface Employee {
  id: string;
  name: string;
  status: string;
  skills: string;
  dateContracted: string;
  role: string;
}

interface EmployeeListPageProps {
  projectName: string;
}

const EmployeeListPage = (props: EmployeeListPageProps) => {
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

  const handleConfirmDelete = () => {
    if (selectedEmployee) {
      setEmployees(employees.filter(emp => emp.id !== selectedEmployee.id));
      setIsDeleteModalOpen(false);
    }
  };

  const handleUpdateEmployee = (updatedEmployee: EmployeeData) => {
    setEmployees(employees.map(emp =>
      emp.id === updatedEmployee.id ? updatedEmployee : emp
    ));
    setIsEditModalOpen(false);
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

  const EditEmployeeModal = () => {
    const [formData, setFormData] = useState<EmployeeData>(selectedEmployee || {
      id: '',
      name: '',
      status: '',
      skills: '',
      dateContracted: '',
      role: ''
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
        <div className="bg-white rounded-lg p-6 w-96">
          <h2 className="font-geoformHeavy text-xl text-blue-950 font-bold mb-4">Edit Employee</h2>
          <form onSubmit={(e) => {
            e.preventDefault();
            handleUpdateEmployee(formData);
          }}>
            <div className="mb-4">
              <label className="font-geoformHeavy text-blue-950 font-md block mb-2">First Name</label>
              <input
                type="text"
                name="firstName"
                value={formData.name.split(' ')[0]}
                onChange={handleInputChange}
                className="w-full border rounded p-2"
              />
            </div>
            <div className="mb-4">
              <label className="font-geoformHeavy text-blue-950 block mb-2">Last Name</label>
              <input
                type="text"
                name="lastName"
                value={formData.name.split(' ')[1]}
                onChange={handleInputChange}
                className="w-full border rounded p-2"
              />
            </div>
            <div className="mb-4">
              <label className="font-geoformHeavy text-blue-950 block font-md  mb-2">Status</label>
              <input
                type="text"
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                className="w-full border rounded p-2"
              />
            </div>
            <div className="mb-4">
              <label className="font-geoformHeavy block text-blue-950 font-md mb-2">Skills</label>
              <input
                type="text"
                name="skills"
                value={formData.skills}
                onChange={handleInputChange}
                className="w-full border rounded p-2"
              />
            </div>
            <div className="mb-4">
              <label className="font-geoformHeavy block text-blue-950 font-md mb-2">Date Contracted</label>
              <input
                type="text"
                name="dateContracted"
                value={formData.dateContracted}
                onChange={handleInputChange}
                className="w-full border rounded p-2"
              />
            </div>
            <div className="mb-4">
              <label className="font-geoformHeavy text-blue-950 block font-md text-blue-950 mb-2">Role</label>
              <input
                type="text"
                name="role"
                value={formData.role}
                onChange={handleInputChange}
                className="w-full border rounded p-2"
              />
            </div>
            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={() => setIsEditModalOpen(false)}
                className="font-geoformHeavy bg-white border border-blue-950 font-bold text-blue-950 hover:bg-blue-950 hover:text-white px-4 py-2 rounded"
              >
                Back
              </button>
              <button
                type="submit"
                className="font-geoformHeavy bg-blue-950 text-white border hover:border-blue-950 font-bold hover:bg-white hover:text-blue-950  px-4 py-2 rounded"
              >
                Edit Employee
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
            <button
              onClick={handleConfirmDelete}
              className="font-geoformHeavy bg-blue-950 text-white font-bold border hover:bg-white hover:text-blue-950 hover:border-blue-950 px-4 py-2 rounded"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      {!isAddEmployeePage2Open && (
        <div className="container mx-auto p-4">
          <h1 className="font-geoformHeavy text-3xl font-bold mb-4 text-blue-950">Employee Overview</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {employees.map((employee) => (
              <EmployeeCard key={employee.employeeId} employee={employee} />
            ))}
          </div>
          <div className="mt-4">
            <button
              onClick={handleAddEmployeeClick}
              className="font-geoformHeavy bg-blue-950 font-bold text-white px-4 py-2 rounded"
            >
              ADD EMPLOYEE
            </button>
          </div>

          {isEditModalOpen && <EditEmployeeModal />}
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