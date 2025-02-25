// will edit inline to direct import pero sunod na kay katugon

import React, { useState } from 'react';
import { Project } from './types';

interface DocumentsProps {
  project: Project;
  onBack: () => void;
}

interface DocumentItem {
  id: string;
  name: string;
  completionDate: string;
  description: string;
  status: 'completed' | 'pending';
}

const Documents = ({ project, onBack }: DocumentsProps) => {
  const [showUploadPage, setShowUploadPage] = useState(false);
  
  // mock
  const documents: DocumentItem[] = [
    {
      id: '1',
      name: 'building permit',
      completionDate: '2024-03-15',
      description: 'government approval',
      status: 'completed'
    },
    {
      id: '2',
      name: 'dhsahajfahfh',
      completionDate: '2024-04-20',
      description: 'contract',
      status: 'pending'
    }
  ];
  
  const completedDocs = documents.filter(doc => doc.status === 'completed');
  const pendingDocs = documents.filter(doc => doc.status === 'pending');
  
  const handleUploadClick = () => {
    setShowUploadPage(true);
  };
  
  const handleBackToDocuments = () => {
    setShowUploadPage(false);
  };
  
  const DocumentsOverviewPage = () => (
    <div className="flex flex-col h-full bg-blue-950">
      <div className="flex justify-between items-center mb-6 ">
        <h2 className="text-2xl font-bold">{project.name}</h2>
        <button className="bg-white rounded-full p-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        </button>
      </div>
      
      <div className="bg-white rounded-lg p-6 flex-1">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Completed Documents */}
          <div className="bg-gray-100 rounded-lg p-4">
            <h3 className="font-medium mb-4 text-center text-blue-950">completed</h3>
            <div className="space-y-4">
              {completedDocs.map(doc => (
                <div key={doc.id} className="bg-white rounded-lg p-4 shadow">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium">{doc.name}</h4>
                      <p className="text-xs text-gray-500">completion date: {doc.completionDate}</p>
                      <p className="text-xs text-gray-500">description: {doc.description}</p>
                    </div>
                    <div className="flex space-x-2">
                      <button className="p-1 text-gray-500 hover:text-blue-950">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                        </svg>
                      </button>
                      <button className="p-1 text-gray-500 hover:text-blue-950">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pending Documents */}
          <div className="bg-gray-100 rounded-lg p-4">
            <h3 className="font-medium mb-4 text-blue-950 text-center">pending</h3>
            <div className="space-y-4">
              {pendingDocs.map(doc => (
                <div key={doc.id} className="bg-white rounded-lg p-4 shadow">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium">{doc.name}</h4>
                      <p className="text-xs text-gray-500">completion date: {doc.completionDate}</p>
                      <p className="text-xs text-gray-500">description: {doc.description}</p>
                    </div>
                    <div className="flex space-x-2">
                      <button className="p-1 text-gray-500 hover:text-blue-950">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                        </svg>
                      </button>
                      <button className="p-1 text-gray-500 hover:text-blue-950">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-6 flex justify-center">
        <button 
          onClick={handleUploadClick}
          className="px-6 py-2 bg-white text-blue-950 rounded-md font-medium shadow"
        >
          UPLOAD DOCUMENT
        </button>
      </div>

      <button 
        onClick={onBack}
        className="mt-4 px-4 py-2 bg-gray-200 rounded flex items-center space-x-1"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
        </svg>
        <span>Back to Project</span>
      </button>
    </div>
  );
  
  const UploadDocumentPage = () => (
    <div className="flex flex-col h-full">
      <h2 className="text-2xl font-bold mb-6">UPLOAD DOCUMENT</h2>
      
      <div className="bg-white rounded-lg p-6 flex-1">
        <div className="max-w-3xl mx-auto">
          <div className="bg-gray-100 rounded-lg p-8">
            <div className="mb-4">
              <label className="block text-blue-950 text-sm font-medium mb-2">
                document name
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-950"
                placeholder="Enter document name"
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-blue-950 text-sm font-medium mb-2">
                description
              </label>
              <textarea
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-950 h-32"
                placeholder="Enter document description"
              />
            </div>
            
            <div className="flex flex-col md:flex-row md:space-x-4">
              <div className="w-full md:w-1/2">
                <button
                  className="w-full py-2 bg-white border border-gray-300 rounded-md text-blue-950 flex items-center justify-center space-x-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                  <span>ATTACH FILE</span>
                </button>
              </div>
              
              <div className="w-full md:w-1/2 mt-4 md:mt-0">
                <div className="border border-gray-300 rounded-md h-full bg-white p-4 flex items-center justify-center">
                  <p className="text-gray-500 text-sm">file overview here.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-6 flex justify-center">
        <button 
          className="px-6 py-2 bg-white text-blue-950 rounded-md font-medium shadow"
        >
          UPLOAD DOCUMENT
        </button>
      </div>

      <button 
        onClick={handleBackToDocuments}
        className="mt-4 px-4 py-2 bg-gray-200 rounded flex items-center space-x-1"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
        </svg>
        <span>Back to Documents</span>
      </button>
    </div>
  );
  
  return (
    <div className="bg-blue-950 text-white min-h-screen">
      <div className="container mx-auto py-8 px-4">
        <div className="text-sm breadcrumbs text-right mb-4">
          <ul className="flex space-x-2">
            <li>projects</li>
            <li>/</li>
            <li>project details</li>
            <li>/</li>
            <li>documents</li>
            {showUploadPage && (
              <>
                <li>/</li>
                <li>upload</li>
              </>
            )}
          </ul>
        </div>
        
        {showUploadPage ? <UploadDocumentPage /> : <DocumentsOverviewPage />}
      </div>
    </div>
  );
};

export default Documents;