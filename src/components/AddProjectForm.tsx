'use client';

import React, { useState } from 'react';
import { Project } from './types';
import { addProject } from '@/app/lib/actions';

interface AddProjectFormProps {
  onCancel: () => void;
}

const AddProjectForm = ({ onCancel }: AddProjectFormProps) => {
  return (

    <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
      <h2 className="text-xl font-geoformHeavy text-blue-950 font-semibold mb-4">Add New Project</h2>

      <form action={addProject} method="post">
        <div className="grid grid-cols-2 gap-6">
          {/* Contract Information */}
          <div className="col-span-2">
            <h2 className="text-lg font-bold text-blue-950 mb-4">Contract Information</h2>
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
            <h2 className="text-lg font-bold text-blue-950 mb-4">
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
            <h2 className="text-lg font-bold text-blue-950 mb-4">
              Client Information
            </h2>
          </div>
          <div>
            <label className="block text-blue-950 font-geoformHeavy mb-2">
              Client First Name
            </label>
            <input
              type="text"
              name="clientFirstName"
              className="w-full bg-gray-100 rounded p-2"
              required
            />
          </div>
          <div>
            <label className="block text-blue-950 font-geoformHeavy mb-2">
              Client Last Name
            </label>
            <input
              type="text"
              name="clientLastName"
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

          {/* Location Information */}
          <div className="col-span-2">
            <h2 className="text-lg font-bold text-blue-950 mb-4">
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

          {/* Engineer Information */}
          <div className="col-span-2">
            <h2 className="text-lg font-bold text-blue-950 mb-4">
              Engineer Information
            </h2>
          </div>
          <div className="col-span-2">
            <label className="block text-blue-950 font-geoformHeavy mb-2">
              Assigned Engineer Email
            </label>
            <input
              type="email"
              name="engineerEmail"
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
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProjectForm;
