import React, { useEffect, useState } from 'react';
import { ClientData, ContractDetails, Project } from './types';
import { ArrowLeftIcon } from '@heroicons/react/solid';
import { editProject } from '@/app/lib/actions';

interface EditProjectProps {
  project: ContractDetails;
  onBack: () => void;
  onSave: (updatedProject: ContractDetails) => void;
}

const EditProject = ({ project, onBack, onSave }: EditProjectProps) => {
  const [clients, setClients] = useState<ClientData[]>([]);

  useEffect(() => {
    // Fetch clients
    fetch(`/api/v1/clients`)
      .then(response => response.json())
      .then((data: ClientData[]) => {
        setClients(data);
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
                    
                    <div>
                      <label className="block font-geoformHeavy text-white mb-1 font-medium">location</label>
                      <input
                        type="text"
                        name="location"
                        className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                      <input
                        type="text"
                        name="clientName"
                        className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
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