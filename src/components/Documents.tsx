import React, { useState } from 'react';
import { Project } from './types';
import { 
  PencilIcon, 
  TrashIcon, 
  ArrowLeftIcon,
  ArrowUpIcon
} from '@heroicons/react/solid';

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
  const [showEditPage, setShowEditPage] = useState(false);
  const [currentDocument, setCurrentDocument] = useState<DocumentItem | null>(null);
  
  // mock
  const [documents, setDocuments] = useState<DocumentItem[]>([
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
  ]);
  
  const completedDocs = documents.filter(doc => doc.status === 'completed');
  const pendingDocs = documents.filter(doc => doc.status === 'pending');
  
  const handleUploadClick = () => {
    setShowUploadPage(true);
    setShowEditPage(false);
  };
  
  const handleBackToDocuments = () => {
    setShowUploadPage(false);
    setShowEditPage(false);
  };
  
  const handleEditClick = (doc: DocumentItem) => {
    setCurrentDocument(doc);
    setShowEditPage(true);
    setShowUploadPage(false);
  };
  
  const handleDocumentUpdate = () => {
    if (currentDocument) {
      const updatedDocuments = documents.map(doc => 
        doc.id === currentDocument.id ? currentDocument : doc
      );
      setDocuments(updatedDocuments);
      setShowEditPage(false);
    }
  };

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
            
            <div className="flex flex-col">
              <div className="w-full mb-4">
                <div className="border border-gray-300 rounded-md h-32 bg-white p-4 flex items-center justify-center">
                  <p className="text-blue-950 text-sm">file overview here.</p>
                </div>
              </div>
              
              <div className="w-full">
                <button
                  className="w-full py-2 bg-white border border-gray-300 rounded-md text-blue-950 flex items-center justify-center space-x-2"
                >
                  <ArrowUpIcon className="h-5 w-5" />
                  <span>ATTACH FILE</span>
                </button>
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
        className="mt-4 px-4 py-2 bg-gray-100 rounded flex items-center space-x-1"
      >
        <ArrowLeftIcon className="h-5 w-5" />
        <span>Back to Documents</span>
      </button>
    </div>
  );

  const EditDocumentPage = () => {
    const [editedDocument, setEditedDocument] = useState<DocumentItem>(currentDocument!);
    
    const handleInputChange = (field: keyof DocumentItem, value: string) => {
      setEditedDocument(prev => ({
        ...prev,
        [field]: value
      }));
      setCurrentDocument(prev => prev ? { ...prev, [field]: value } : null);
    };
    
    const handleStatusChange = (status: 'completed' | 'pending') => {
      setEditedDocument(prev => ({
        ...prev,
        status
      }));
      setCurrentDocument(prev => prev ? { ...prev, status } : null);
    };
    
    return (
      <div className="flex flex-col h-full">
        <h2 className="text-2xl font-bold mb-6">EDIT DOCUMENT</h2>
        
        <div className="bg-white rounded-lg p-6 flex-1">
          <div className="max-w-3xl mx-auto">
            <div className="bg-gray-100 rounded-lg p-8">
              <div className="mb-4">
                <label className="block text-blue-950 text-sm font-medium mb-2">
                  document name
                </label>
                <input
                  type="text"
                  value={editedDocument.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-950"
                  placeholder="Enter document name"
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-blue-950 text-sm font-medium mb-2">
                  completion date
                </label>
                <input
                  type="date"
                  value={editedDocument.completionDate}
                  onChange={(e) => handleInputChange('completionDate', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-950"
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-blue-950 text-sm font-medium mb-2">
                  description
                </label>
                <textarea
                  value={editedDocument.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-950 h-32"
                  placeholder="Enter document description"
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-blue-950 text-sm font-medium mb-2">
                  status
                </label>
                <div className="flex space-x-4">
                  <button
                    onClick={() => handleStatusChange('completed')}
                    className={`px-4 py-2 rounded-md ${
                      editedDocument.status === 'completed' 
                        ? 'bg-blue-950 text-white' 
                        : 'bg-white text-blue-950 border border-blue-950'
                    }`}
                  >
                    Completed
                  </button>
                  <button
                    onClick={() => handleStatusChange('pending')}
                    className={`px-4 py-2 rounded-md ${
                      editedDocument.status === 'pending' 
                        ? 'bg-blue-950 text-white' 
                        : 'bg-white text-blue-950 border border-blue-950'
                    }`}
                  >
                    Pending
                  </button>
                </div>
              </div>
              
              <div className="flex flex-col">
                <div className="w-full mb-4">
                  <div className="border border-gray-300 rounded-md h-32 bg-white p-4 flex items-center justify-center">
                    <p className="text-blue-950 text-sm">file overview here.</p>
                  </div>
                </div>
                
                <div className="w-full">
                  <button
                    className="w-full py-2 bg-white border border-gray-300 rounded-md text-blue-950 flex items-center justify-center space-x-2"
                  >
                    <ArrowUpIcon className="h-5 w-5" />
                    <span>ATTACH FILE</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-6 flex justify-center">
          <button 
            onClick={handleDocumentUpdate}
            className="px-6 py-2 bg-white text-blue-950 rounded-md font-medium shadow"
          >
            UPDATE DOCUMENT
          </button>
        </div>

        <button 
          onClick={handleBackToDocuments}
          className="mt-4 px-4 py-2 bg-gray-100 rounded flex items-center space-x-1"
        >
          <ArrowLeftIcon className="h-5 w-5" />
          <span>Back to Documents</span>
        </button>
      </div>
    );
  };

  const DocumentsOverviewPage = () => (
    <div className="flex flex-col h-full bg-gray-100">
      <div className="flex justify-between items-center mb-6 ">
        <h2 className="text-2xl text-blue-950 font-bold">{project.name}</h2>
      </div>
      
      <div className="bg-white rounded-lg p-6 flex-1">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Completed Documents */}
          <div className="bg-gray-100 rounded-lg p-4">
            <h3 className=" font-bold mb-4 text-center text-blue-950">completed</h3>
            <div className="space-y-4">
              {completedDocs.map(doc => (
                <div key={doc.id} className="bg-white rounded-lg p-4 shadow">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-bold text-blue-950">{doc.name}</h4>
                      <p className="text-xs text-blue-950">completion date: {doc.completionDate}</p>
                      <p className="text-xs text-blue-950">description: {doc.description}</p>
                    </div>
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => handleEditClick(doc)}
                        className="p-1 text-blue-950 hover:text-blue-950"
                      >
                        <PencilIcon className="h-5 w-5" />
                      </button>
                      <button className="p-1 text-blue-950 hover:text-blue-950">
                        <TrashIcon className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pending Documents */}
          <div className="bg-gray-100 rounded-lg p-4">
            <h3 className="font-bold mb-4 text-blue-950 text-center">pending</h3>
            <div className="space-y-4">
              {pendingDocs.map(doc => (
                <div key={doc.id} className="bg-white rounded-lg p-4 shadow">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-bold text-blue-950">{doc.name}</h4>
                      <p className="text-xs text-blue-950">completion date: {doc.completionDate}</p>
                      <p className="text-xs text-blue-950">description: {doc.description}</p>
                    </div>
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => handleEditClick(doc)}
                        className="p-1 text-blue-950 hover:text-blue-950"
                      >
                        <PencilIcon className="h-5 w-5" />
                      </button>
                      <button className="p-1 text-blue-950 hover:text-blue-950">
                        <TrashIcon className="h-5 w-5" />
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
        className="mt-4 px-4 py-2 bg-gray-100 rounded flex items-center space-x-1"
      >
        <ArrowLeftIcon className="h-5 w-5 text-blue-950" />
        <span className="text-blue-950">Back to Project</span>
      </button>
    </div>
  );
  
  return (
    <div className="bg-gray-100 text-gray-800 min-h-screen">
      <div className="container mx-auto py-8 px-4">
        {showEditPage ? <EditDocumentPage /> : 
         (showUploadPage ? <UploadDocumentPage /> : <DocumentsOverviewPage />)}
      </div>
    </div>
  );
};

export default Documents;