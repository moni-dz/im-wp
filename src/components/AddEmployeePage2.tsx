// this is for EMPLOYEE OVERVIEW PAGE - ADD EMPLOYEE

import React, { useState } from 'react'; 

interface AddEmployeePage2Props {
  onBack: () => void;
  onAddEmployee: (employee: any) => void;
}

const AddEmployeePage2: React.FC<AddEmployeePage2Props> = ({ onBack, onAddEmployee }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
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

  const handleSubmit = () => {
    if (formData.firstName && formData.lastName) {
      const newEmployee = {
        id: Date.now().toString(),
        name: `${formData.firstName} ${formData.lastName}`,
        ...formData
      };
      onAddEmployee(newEmployee);
    }
  };

  return (
    <div className="flex-grow p-8 bg-gray-100 rounded-sm">
      <h1 className="text-3xl font-bold mb-8 font-geoformHeavy text-blue-950">Add Employee</h1>

      <div className="bg-white rounded-lg p-8">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-blue-950 font-geoformHeavy mb-2">first name</label>
            <input 
              type="text" 
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              className="w-full bg-gray-100 rounded p-2" 
            />
          </div>
          <div>
            <label className="block text-blue-950 font-geoformHeavy mb-2">skills</label>
            <input 
              type="text" 
              name="skills"
              value={formData.skills}
              onChange={handleInputChange}
              className="w-full bg-gray-100 rounded p-2" 
            />
          </div>
          <div>
            <label className="block text-blue-950 mb-2 font-geoformHeavy">last name</label>
            <input 
              type="text" 
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              className="w-full bg-gray-100 rounded p-2" 
            />
          </div>
          <div>
            <label className="block font-geoformHeavy text-blue-950 mb-2">role</label>
            <input 
              type="text" 
              name="role"
              value={formData.role}
              onChange={handleInputChange}
              className="w-full bg-gray-100 rounded p-2" 
            />
          </div>
          <div>
            <label className="block font-geoformHeavy text-blue-950 mb-2">status</label>
            <input 
              type="text" 
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              className="w-full bg-gray-100 rounded p-2" 
            />
          </div>
          <div>
            <label className="block font-geoformHeavy text-blue-950 mb-2">date contracted</label>
            <input 
              type="text" 
              name="dateContracted"
              value={formData.dateContracted}
              onChange={handleInputChange}
              className="w-full bg-gray-100 rounded p-2" 
            />
          </div>
        </div>

        <div className="flex justify-end space-x-4 mt-8">
          <button 
            onClick={onBack}
            className="bg-white text-blue-950 font-geoformHeavy border border-blue-950 px-6 py-2 rounded hover:bg-blue-950 hover:text-white"
          >
            BACK
          </button>
          <button 
            onClick={handleSubmit}
            className="bg-blue-950 text-white font-geoformHeavy px-6 py-2 rounded hover:bg-white hover:text-blue-950 hover:border hover:border-blue-950"
          >
            ADD EMPLOYEE
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddEmployeePage2;
