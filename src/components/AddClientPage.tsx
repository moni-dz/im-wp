'use client';

import { useState } from 'react';

interface AddClientPageProps {
  onBackClick: () => void;
}

const AddClientPage = ({ onBackClick }: AddClientPageProps) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    remarks: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // client db
    console.log('Client added:', formData);
    onBackClick();
  };

  return (


      <div className="bg-white p-6 rounded-lg shadow-md">
        <form onSubmit={handleSubmit}>
          <div className="bg-blue-950 p-6 rounded-lg">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label htmlFor="firstName" className="block font-geoformHeavy text-sm text-white mb-1">first name</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
                
                <label htmlFor="lastName" className="block  font-geoformHeavy text-sm text-white mt-4 mb-1">last name</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label htmlFor="remarks" className="block font-geoformHeavy text-sm text-white mb-1">remarks</label>
                <textarea
                  id="remarks"
                  name="remarks"
                  value={formData.remarks}
                  onChange={handleChange}
                  rows={6}
                  className="w-full px-3 py-2 rounded border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
          
          <div className="flex justify-between mt-8">
            <button
              type="button"
              onClick={onBackClick}
              className="px-6 py-2 font-bold bg-gray-200 font-geoformHeavy rounded-md shadow-sm text-md font-medium text-gray-700 hover:bg-gray-300"
            >
              BACK
            </button>
            
            <button
              type="submit"
              className="px-6 py-2 font-bold bg-blue-950 font-geoformHeavy text-white rounded-md text-md font-medium hover:text-blue-950 hover:border hover:border-blue-950 hover:bg-white"
            >
              ADD CLIENT
            </button>
          </div>
        </form>
      </div>
  );
};

export default AddClientPage;