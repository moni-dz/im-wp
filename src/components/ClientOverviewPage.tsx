'use client';

import { useEffect, useState } from 'react';
import { TrashIcon } from '@heroicons/react/solid';
import { ClientData, ContractDetails } from './types';

interface ClientOverviewPageProps {
  onAddClientClick: () => void;
}

const ClientOverviewPage = ({ onAddClientClick }: ClientOverviewPageProps) => {
  // sample client data
  const [clients, setClients] = useState<ClientData[]>([]);
  const [projects, setProjects] = useState<ContractDetails[]>([]);

  useEffect(() => {
    // Fetch clients
    fetch(`/api/v1/clients`)
      .then(response => response.json())
      .then((data: ClientData[]) => {
        setClients(data);
      });

    fetch(`/api/v1/contracts`)
      .then(response => response.json())
      .then((data: ContractDetails[]) => {
        setProjects(data);
      });
  }, []);


  //  for delete modal
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState<{ clientId: number, projectName: string } | null>(null);

  //  to handle delete click
  const handleDeleteClick = (clientId: number, projectName: string) => {
    setProjectToDelete({ clientId, projectName });
    setShowDeleteModal(true);
  };

  //  to close modal
  const handleCloseModal = () => {
    setShowDeleteModal(false);
    setProjectToDelete(null);
  };

  //  to confirm delete
  const handleConfirmDelete = async () => {
    console.log(`Deleting project ${projectToDelete?.projectName}`);
    setClients(clients.filter(client => client.clientId !== projectToDelete?.clientId));
    await fetch(`/api/v1/clients?id=${projectToDelete?.clientId}`, { method: 'DELETE' });
    handleCloseModal();
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl text-blue-950 font-geoformHeavy font-bold">Client Overview</h1>
        <button
          onClick={onAddClientClick}
          className="bg-blue-950 font-geoformHeavy font-bold rounded-lg  text-white border hover:border-blue-950 hover:text-blue-950 hover:bg-white py-2 px-4 rounded"        >
          ADD CLIENT
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {clients.map((client) => {
          const projectIds = JSON.parse(client.projectIds || '[]');
          const clientProjects = projects.filter(project => projectIds.includes(project.projectId));

          return (
            <div key={client.clientId} className="bg-white rounded-lg  shadow p-4">
              <div className="flex justify-between items-center mb-2">
                <h2 className="font-geoformHeavy text-lg text-blue-950 font-bold">{client.personName}</h2>
                <button className="ml-2 text-blue-950 hover:text-gray-500" onClick={() => handleDeleteClick(client.clientId, projectIds[0])}>
                  <TrashIcon className="w-6 h-6" />
                </button>
              </div>
              <p className="font-geoformHeavy text-md text-blue-950 mb-2 font-semibold">Associated Projects:</p>
              <ul className="font-geoformItalic list-disc list-inside pl-2 text-sm text-blue-950">
                {clientProjects.map((project) => (
                  <li key={project.projectId} className="flex justify-between items-center py-1">
                    <span>{project.projectName}</span>
                  </li>
                ))}
              </ul>
            </div>
          )
        })}
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg  p-6 max-w-md w-full mx-4">
            <div className="mb-6">
              <h2 className="font-geoformHeavy text-2xl font-bold text-blue-950">
                Delete project {projectToDelete?.projectName}'s information?
              </h2>
              <p className="font-geoformItalic text-blue-950 mt-2">This action cannot be undone.</p>
            </div>

            <div className="flex justify-end space-x-3">
              <button
                onClick={handleCloseModal}
                className="font-geoformHeavy text-blue-950 px-6 border border-blue-950 py-2 rounded-lg  hover:bg-blue-950 hover:text-white font-medium"
              >
                Back
              </button>
              <button
                onClick={handleConfirmDelete}
                className="font-geoformHeavy bg-blue-950 rounded-lg  text-white px-6 py-2  hover:bg-white border hover:border-blue-950 hover:text-blue-950"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClientOverviewPage;