'use client';

import { useState } from 'react';
import { TrashIcon } from '@heroicons/react/solid';

interface ClientOverviewPageProps {
  onAddClientClick: () => void;
}

const ClientOverviewPage = ({ onAddClientClick }: ClientOverviewPageProps) => {
  // sample client data
  const [clients] = useState([
    { id: 1, name: 'client name', projects: ['Project A', 'Project B'] },
    { id: 2, name: 'client name', projects: ['Project C'] },
    { id: 3, name: 'client name', projects: ['Project D', 'Project E', 'Project F'] },
    { id: 4, name: 'client name', projects: ['Project G'] },
    { id: 5, name: 'client name', projects: ['Project H', 'Project I'] },
    { id: 6, name: 'client name', projects: ['Project J'] },
  ]);
  
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
  const handleConfirmDelete = () => {
    console.log(`Deleting project ${projectToDelete?.projectName}`);
    handleCloseModal();
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl text-blue-950 font-geoformHeavy font-bold mb-6">Client Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {clients.map((client) => (
          <div key={client.id} className="bg-white rounded-lg shadow p-4">
            <div className="flex justify-between items-center mb-2">
              <h2 className="font-geoformHeavy text-lg text-blue-950 font-bold">{client.name}</h2>
              <button className="ml-2 text-blue-950 hover:text-gray-500" onClick={() => handleDeleteClick(client.id, client.projects[0])}>
                <TrashIcon className="w-6 h-6" />
              </button>
            </div>
            <p className="font-geoformHeavy text-md text-blue-950 mb-2 font-semibold">Associated Projects:</p>
            <ul className="font-geoformItalic list-disc list-inside pl-2 text-sm text-blue-950">
              {client.projects.map((project, index) => (
                <li key={index} className="flex justify-between items-center py-1">
                  <span>{project}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      
      <div className="mt-6">
        <button 
          onClick={onAddClientClick}
          className="bg-blue-950 font-geoformHeavy font-bold rounded-lg text-white hover:text-blue-950 hover:bg-white font-medium py-2 px-4 rounded"
        >
          ADD CLIENT
        </button>
      </div>
      
      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="mb-6">
              <h2 className="font-geoformHeavy text-2xl font-bold text-blue-950">
                Delete project {projectToDelete?.projectName}'s information?
              </h2>
              <p className="font-geoformItalic text-blue-950 mt-2">This action cannot be undone.</p>
            </div>
            
            <div className="flex justify-end space-x-3">
              <button
                onClick={handleCloseModal}
                className="font-geoformHeavy text-blue-950 px-6 border border-blue-950 py-2 rounded hover:bg-white hover:text-blue-950 font-medium"
              >
                Back
              </button>
              <button
                onClick={handleConfirmDelete}
                className="font-geoformHeavy bg-blue-950 text-white px-6 py-2 rounded hover:bg-white hover:text-blue-950 hover:border-blue-950"
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