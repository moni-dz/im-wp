import React, { useEffect, useState } from 'react';
import { ClientData, ContractDetails, Location, Project } from './types';
import { ArrowLeftIcon } from '@heroicons/react/solid';
import { editProject } from '@/app/lib/actions';

interface EditProjectProps {
  project: ContractDetails;
  onBack: () => void;
  onSave: (updatedProject: ContractDetails) => void;
}

const EditProject = ({ project, onBack, onSave }: EditProjectProps) => {
  const [clients, setClients] = useState<ClientData[]>([]);
  const [locations, setLocations] = useState<Location[]>([]);

  useEffect(() => {
    // Fetch clients
    fetch(`/api/v1/clients`)
      .then(response => response.json())
      .then((data: ClientData[]) => {
        setClients(data);
      });

    // Fetch locations
    fetch(`/api/v1/locations`)
      .then(response => response.json())
      .then((data: Location[]) => {
        setLocations(data);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-6xl mx-auto px-4 py-8">

        {/* Main content area */}

        <div className="bg-white rounded-lg p-6">
          <form action={editProject}>
            <div className="bg-blue-950 rounded-lg p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Left column */}
                <div className="space-y-4">
                  <div>
                    <label className="block font-geoformHeavy text-white mb-1 font-medium">project name</label>
                    <input
                      type="text"
                      name="projectName"
                      className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
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

                  <div>
                    <label className="block font-geoformHeavy text-white mb-1 font-medium">amount</label>
                    <input
                      type="text"
                      name="contractAmount"
                      className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block font-geoformHeavy text-white mb-1 font-medium">start date</label>
                    <input
                      type="text"
                      name="dateStart"
                      className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block font-geoformHeavy text-white mb-1 font-medium">estimated completion date</label>
                    <input
                      type="text"
                      name="dateEnd"
                      className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                {/* Right column */}
                <div className="space-y-4">
                  <div>
                    <label className="block font-geoformHeavy text-white mb-1 font-medium">description</label>
                    <textarea
                      name="projectDescription"
                      className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 h-40"
                    />
                  </div>

                  <div>
                    <label className="block font-geoformHeavy text-white mb-1 font-medium">client name</label>
                    <select
                      name="clientId"
                      className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {clients.map((client, index) => (
                        <option key={index} value={client.clientId}>{client.personName}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-between mt-6">
              <button
                type="button"
                onClick={onBack}
                className="px-8 py-2 font-geoformHeavy text-white bg-blue-950 font-medium rounded hover:bg-gray-100 hover:text-blue-950"
              >
                BACK
              </button>

              <button
                type="submit"
                className="px-8 py-2 font-geoformHeavy text-white bg-blue-950 font-medium rounded hover:bg-gray-100 hover:text-blue-950"
              >
                EDIT PROJECT
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProject;