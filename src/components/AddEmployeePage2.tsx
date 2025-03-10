// this is for EMPLOYEE OVERVIEW PAGE - ADD EMPLOYEE

import { addEmployee } from '@/app/lib/actions';
import React, { useState } from 'react';

interface AddEmployeePage2Props {
  onBack: () => void;
  onAddEmployee: (employee: any) => void;
}

const AddEmployeePage2: React.FC<AddEmployeePage2Props> = ({ onBack, onAddEmployee }) => {
  return (
    <div className="flex-grow p-8 bg-gray-100 rounded-sm">
      <h1 className="text-3xl font-bold mb-8 font-geoformHeavy text-blue-950">Add Employee</h1>

      <div className="bg-white rounded-lg p-8">
        <form action={addEmployee}>
          <div className="grid grid-cols-2 gap-6">
            {/* Person: Name */}
            <div>
              <label className="block text-blue-950 font-geoformHeavy mb-2">Name</label>
              <input
                type="text"
                name="name"
                className="w-full bg-gray-100 rounded p-2"
                required
              />
            </div>
            {/* Person: Gender */}
            <div>
              <label className="block text-blue-950 font-geoformHeavy mb-2">Gender</label>
              <select
                name="gender"
                className="w-full bg-gray-100 rounded p-2"
                required
              >
                <option value="">Select</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            {/* Person: Email */}
            <div>
              <label className="block text-blue-950 font-geoformHeavy mb-2">Email</label>
              <input
                type="email"
                name="email"
                className="w-full bg-gray-100 rounded p-2"
                required
              />
            </div>
            {/* Person: Contact Number */}
            <div>
              <label className="block text-blue-950 font-geoformHeavy mb-2">Contact Number</label>
              <input
                type="text"
                name="contactNumber"
                className="w-full bg-gray-100 rounded p-2"
                required
              />
            </div>
            {/* Location: Street */}
            <div>
              <label className="block text-blue-950 font-geoformHeavy mb-2">Street</label>
              <input
                type="text"
                name="street"
                className="w-full bg-gray-100 rounded p-2"
                required
              />
            </div>
            {/* Location: Barangay */}
            <div>
              <label className="block text-blue-950 font-geoformHeavy mb-2">Barangay</label>
              <input
                type="text"
                name="barangay"
                className="w-full bg-gray-100 rounded p-2"
                required
              />
            </div>
            {/* Location: City */}
            <div>
              <label className="block text-blue-950 font-geoformHeavy mb-2">City</label>
              <input
                type="text"
                name="city"
                className="w-full bg-gray-100 rounded p-2"
                required
              />
            </div>
            {/* Location: Province */}
            <div>
              <label className="block text-blue-950 font-geoformHeavy mb-2">Province</label>
              <input
                type="text"
                name="province"
                className="w-full bg-gray-100 rounded p-2"
                required
              />
            </div>
            {/* Employee: Status */}
            <div>
              <label className="block text-blue-950 font-geoformHeavy mb-2">Status</label>
              <input
                type="text"
                name="status"
                className="w-full bg-gray-100 rounded p-2"
                required
              />
            </div>
            {/* Employee: Skills */}
            <div>
              <label className="block text-blue-950 font-geoformHeavy mb-2">Skills</label>
              <input
                type="text"
                name="skills"
                className="w-full bg-gray-100 rounded p-2"
                required
              />
            </div>
            {/* Employee: Date Contracted */}
            <div>
              <label className="block text-blue-950 font-geoformHeavy mb-2">Date Contracted</label>
              <input
                type="date"
                name="dateContracted"
                className="w-full bg-gray-100 rounded p-2"
                required
              />
            </div>
            {/* Role: Role Name */}
            <div>
              <label className="block text-blue-950 font-geoformHeavy mb-2">Role</label>
              <input
                type="text"
                name="role"
                className="w-full bg-gray-100 rounded p-2"
                required
              />
            </div>
            {/* EmployeeDesignation: Remarks */}
            <div>
              <label className="block text-blue-950 font-geoformHeavy mb-2">Remarks</label>
              <input
                type="text"
                name="remarks"
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
            type="submit"
            className="bg-blue-950 text-white font-geoformHeavy px-6 py-2 rounded hover:bg-white hover:text-blue-950 hover:border hover:border-blue-950"
          >
            ADD EMPLOYEE
          </button>
        </div>
        </form>
      </div>
    </div>
  );
};

export default AddEmployeePage2;
