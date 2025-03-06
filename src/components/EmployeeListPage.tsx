import React, { useState } from 'react';
import { PencilIcon, TrashIcon } from '@heroicons/react/solid';
import AddEmployeePage2 from './AddEmployeePage2';

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
  const [employees, setEmployees] = useState<Employee[]>([
    { id: '1', name: 'first name, last name', status: 'ha', skills: 'a', dateContracted: 'x', role: 's' },
    { id: '2', name: 'first name, last name', status: 'td', skills: 'a', dateContracted: 'x', role: 's' },
    { id: '3', name: 'first name, last name', status: 'og', skills: 'a', dateContracted: 'x', role: 's' },
    { id: '4', name: 'first name, last name', status: 'am', skills: 'a', dateContracted: 'x', role: 's' },
    { id: '5', name: 'first name, last name', status: 'en', skills: 'a', dateContracted: 'x', role: 's' },
    { id: '6', name: 'first name, last name', status: 'z', skills: 'af', dateContracted: 'x', role: 's' },
  ]);

  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isAddEmployeePage2Open, setIsAddEmployeePage2Open] = useState(false);

  const handleEditClick = (employee: Employee) => {
    setSelectedEmployee(employee);
    setIsEditModalOpen(true);
  };

  const handleDeleteClick = (employee: Employee) => {
    setSelectedEmployee(employee);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (selectedEmployee) {
      setEmployees(employees.filter(emp => emp.id !== selectedEmployee.id));
      setIsDeleteModalOpen(false);
    }
  };

  const handleUpdateEmployee = (updatedEmployee: Employee) => {
    setEmployees(employees.map(emp => 
      emp.id === updatedEmployee.id ? updatedEmployee : emp
    ));
    setIsEditModalOpen(false);
  };

  const handleAddEmployeeClick = () => {
    setIsAddEmployeePage2Open(true);
  };

  const EmployeeCard = ({ employee }: { employee: Employee }) => {
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
          <h3 className="text-blue-950 text-lg font-bold mb-3">{employee.name}</h3>
          <p className="text-sm font-bold text-blue-950">
            Status: <span className="text-sm font-normal text-blue-950">{employee.status}</span>
          </p>
          <p className="text-sm font-bold text-blue-950">
            Skills: <span className="text-sm font-normal text-blue-950">{employee.skills}</span>
          </p>
          <p className="text-sm font-bold text-blue-950">
            Date Contracted: <span className="text-sm font-normal text-blue-950">{employee.dateContracted}</span>
          </p>
          <p className="text-sm font-bold text-blue-950">
            Role: <span className="text-sm font-normal text-blue-950">{employee.role}</span>
          </p>
        </div>
      </div>
    );
  };

  const EditEmployeeModal = () => {
    const [formData, setFormData] = useState<Employee>(selectedEmployee || {
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
          <h2 className="text-xl text-blue-950 font-bold mb-4">Edit Employee</h2>
          <form onSubmit={(e) => {
            e.preventDefault();
            handleUpdateEmployee(formData);
          }}>
            <div className="mb-4">
              <label className="text-blue-950 font-md block mb-2">First Name</label>
              <input 
                type="text" 
                name="firstName" 
                value={formData.name.split(' ')[0]} 
                onChange={handleInputChange}
                className="w-full border rounded p-2" 
              />
            </div>
            <div className="mb-4">
              <label className="text-blue-950 block mb-2">Last Name</label>
              <input 
                type="text" 
                name="lastName" 
                value={formData.name.split(' ')[1]} 
                onChange={handleInputChange}
                className="w-full border rounded p-2" 
              />
            </div>
            <div className="mb-4">
              <label className="text-blue-950 block font-md  mb-2">Status</label>
              <input 
                type="text" 
                name="status" 
                value={formData.status} 
                onChange={handleInputChange}
                className="w-full border rounded p-2" 
              />
            </div>
            <div className="mb-4">
              <label className="block text-blue-950 font-md mb-2">Skills</label>
              <input 
                type="text" 
                name="skills" 
                value={formData.skills} 
                onChange={handleInputChange}
                className="w-full border rounded p-2" 
              />
            </div>
            <div className="mb-4">
              <label className="block text-blue-950 font-md mb-2">Date Contracted</label>
              <input 
                type="text" 
                name="dateContracted" 
                value={formData.dateContracted} 
                onChange={handleInputChange}
                className="w-full border rounded p-2" 
              />
            </div>
            <div className="mb-4">
              <label className="text-blue-950 block font-md text-blue-950 mb-2">Role</label>
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
                className="bg-white border border-blue-950 font-bold text-blue-950 hover:bg-blue-950 hover:text-white px-4 py-2 rounded"
              >
                Back
              </button>
              <button 
                type="submit"
                className="bg-blue-950 text-white border hover:border-blue-950 font-bold hover:bg-white hover:text-blue-950  px-4 py-2 rounded"
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
          <h2 className="text-xl text-blue-950 font-bold mb-4">Delete project 1 name's information?</h2>
          <p className="mb-4 text-blue-950">This action cannot be undone.</p>
          <div className="flex justify-end space-x-2">
            <button 
              onClick={() => setIsDeleteModalOpen(false)}
              className="bg-white text-blue-950 border border-blue-950 hover:bg-blue-950 hover:text-white px-4 py-2 rounded"
            >
              Back
            </button>
            <button 
              onClick={handleConfirmDelete}
              className="bg-blue-950 text-white font-bold border hover:bg-white hover:text-blue-950 hover:border-blue-950 px-4 py-2 rounded"
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
          <h1 className="text-3xl font-bold mb-4 text-blue-950">Employee Overview</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {employees.map((employee) => (
              <EmployeeCard key={employee.id} employee={employee} />
            ))}
          </div>
          <div className="mt-4">
            <button 
              onClick={handleAddEmployeeClick}
              className="bg-blue-950 font-bold text-white px-4 py-2 rounded"
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