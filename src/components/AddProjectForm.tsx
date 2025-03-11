'use client';

import React from 'react';
import { addProject } from '@/app/lib/actions';

interface AddProjectFormProps {
  onCancel: () => void;
}

const AddProjectForm = ({ onCancel }: AddProjectFormProps) => {
  return (
    <div className="bg-white rounded-lg shadow-lg max-w-md w-full max-h-[90vh] flex flex-col">
      <div className="p-6 border-b">
        <h2 className="text-xl font-geoformHeavy text-blue-950 font-semibold">Add New Project</h2>
      </div>
      
      <div className="overflow-y-auto p-6 flex-grow">
        <form action={addProject}>
          <div className="grid grid-cols-2 gap-6">
            {/* Contract Information */}
            <div className="col-span-2">
              <h2 className="text-lg font-geoformHeavy font-bold text-blue-950 mb-4">Contract Information</h2>
            </div>
            <div>
              <label className="block text-blue-950 font-geoformHeavy mb-2">
                Contract Amount
              </label>
              <input
                type="number"
                name="contractAmount"
                className="w-full bg-gray-100 rounded p-2"
                required
              />
            </div>
            <div>
              <label className="block text-blue-950 font-geoformHeavy mb-2">
                Contract Date
              </label>
              <input
                type="date"
                name="contractDate"
                className="w-full bg-gray-100 rounded p-2"
                required
              />
            </div>
            <div>
              <label className="block text-blue-950 font-geoformHeavy mb-2">
                Start Date
              </label>
              <input
                type="date"
                name="startDate"
                className="w-full bg-gray-100 rounded p-2"
                required
              />
            </div>
            <div>
              <label className="block text-blue-950 font-geoformHeavy mb-2">
                End Date
              </label>
              <input
                type="date"
                name="endDate"
                className="w-full bg-gray-100 rounded p-2"
                required
              />
            </div>
            <div>
              <label className="block text-blue-950 font-geoformHeavy mb-2">
                Status
              </label>
              <select
                name="status"
                className="w-full bg-gray-100 rounded p-2"
                required
              >
                <option value="">Select</option>
                <option value="Active">Active</option>
                <option value="Pending">Pending</option>
                <option value="Closed">Closed</option>
              </select>
            </div>
            <div className="col-span-2">
              <label className="block text-blue-950 font-geoformHeavy mb-2">
                Remarks
              </label>
              <textarea
                name="remarks"
                className="w-full bg-gray-100 rounded p-2"
              ></textarea>
            </div>

            {/* Project Information */}
            <div className="col-span-2">
              <h2 className="text-lg font-geoformHeavy font-bold text-blue-950 mb-4">
                Project Information
              </h2>
            </div>
            <div>
              <label className="block text-blue-950 font-geoformHeavy mb-2">
                Project Name
              </label>
              <input
                type="text"
                name="projectName"
                className="w-full bg-gray-100 rounded p-2"
                required
              />
            </div>
            <div className="col-span-1">
              <label className="block text-blue-950 font-geoformHeavy mb-2">
                Project Description
              </label>
              <textarea
                name="projectDescription"
                className="w-full bg-gray-100 rounded p-2"
                required
              ></textarea>
            </div>

            {/* Client Information */}
            <div className="col-span-2">
              <h2 className="text-lg font-geoformHeavy font-bold text-blue-950 mb-4">
                Client Information
              </h2>
            </div>
            <div>
              <label className="block text-blue-950 font-geoformHeavy mb-2">
                Client Name
              </label>
              <input
                type="text"
                name="clientName"
                className="w-full bg-gray-100 rounded p-2"
                required
              />
            </div>
            <div>
              <label className="block text-blue-950 font-geoformHeavy mb-2">
                Client Email
              </label>
              <input
                type="email"
                name="clientEmail"
                className="w-full bg-gray-100 rounded p-2"
                required
              />
            </div>
            <div>
              <label className="block text-blue-950 font-geoformHeavy mb-2">
                Client Contact Number
              </label>
              <input
                type="text"
                name="clientContactNumber"
                className="w-full bg-gray-100 rounded p-2"
                required
              />
            </div>
            <div>
              <label className="block text-blue-950 font-geoformHeavy mb-2">
                Client Gender
              </label>
              <select
                name="clientGender"
                className="w-full bg-gray-100 rounded p-2"
                required
              >
                <option value="">Select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>

            {/* Location Information */}
            <div className="col-span-2">
              <h2 className="text-lg font-geoformHeavy font-bold text-blue-950 mb-4">
                Location Information
              </h2>
            </div>
            <div>
              <label className="block text-blue-950 font-geoformHeavy mb-2">
                Street
              </label>
              <input
                type="text"
                name="street"
                className="w-full bg-gray-100 rounded p-2"
                required
              />
            </div>
            <div>
              <label className="block text-blue-950 font-geoformHeavy mb-2">
                Barangay
              </label>
              <input
                type="text"
                name="barangay"
                className="w-full bg-gray-100 rounded p-2"
                required
              />
            </div>
            <div>
              <label className="block text-blue-950 font-geoformHeavy mb-2">
                City
              </label>
              <input
                type="text"
                name="city"
                className="w-full bg-gray-100 rounded p-2"
                required
              />
            </div>
            <div>
              <label className="block text-blue-950 font-geoformHeavy mb-2">
                Province
              </label>
              <input
                type="text"
                name="province"
                className="w-full bg-gray-100 rounded p-2"
                required
              />
            </div>
          </div>
        </form>
      </div>
      
      <div className="p-4 border-t flex justify-end gap-4 mt-auto">
        <button
          onClick={onCancel}
          className="px-4 py-2 rounded border border-gray-300"
        >
          Cancel
        </button>
        <button
          type="submit"
          form="projectForm"
          className="bg-blue-950 text-white font-geoformHeavy px-4 py-2 rounded"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default AddProjectForm;