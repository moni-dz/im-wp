import React, { useEffect, useState } from 'react';
import { ContractDetails, Document, Project } from './types';
import {
  PencilIcon,
  TrashIcon,
  ArrowLeftIcon,
  ArrowUpIcon
} from '@heroicons/react/solid';
import { updateDocument } from '@/app/lib/actions';

interface DocumentsProps {
  project: ContractDetails;
  onBack: () => void;
}

const Documents = ({ project, onBack }: DocumentsProps) => {
  const [showUploadPage, setShowUploadPage] = useState(false);
  const [showEditPage, setShowEditPage] = useState(false);
  const [currentDocument, setCurrentDocument] = useState<Document | null>(null);

  // mock
  const [documents, setDocuments] = useState<Document[]>([]);

  useEffect(() => {
    // Fetch documents
    fetch(`/api/v1/documents`)
      .then(response => response.json())
      .then((data: Document[]) => {
        setDocuments(data);
      });
  }
    , []);

  const completedDocs = documents.filter(doc => doc.completed);
  const pendingDocs = documents.filter(doc => !doc.completed);

  const handleUploadClick = () => {
    setShowUploadPage(true);
    setShowEditPage(false);
  };

  const handleBackToDocuments = () => {
    setShowUploadPage(false);
    setShowEditPage(false);
  };

  const handleEditClick = (doc: Document) => {
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
      <h2 className="text-2x font-geoformHeavy font-bold mb-6">UPLOAD DOCUMENT</h2>

      <div className="bg-white rounded-lg  p-6 flex-1 ">
        <div className="max-w-3xl mx-auto">
          <div className="bg-gray-100 rounded-lg  p-8">
            <div className="mb-4">
              <label className="block font-geoformHeavy text-blue-950 text-sm font-medium mb-2">
                document name
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg  focus:outline-none focus:ring-2 focus:ring-blue-950"
                placeholder="Enter document name"
              />
            </div>

            <div className="mb-4">
              <label className="block font-geoformHeavy text-blue-950 text-sm font-medium mb-2">
                description
              </label>
              <textarea
                className="w-full px-3 py-2 border border-gray-300 rounded-lg  focus:outline-none focus:ring-2 focus:ring-blue-950 h-32"
                placeholder="Enter document description"
              />
            </div>

            <div className="flex flex-col">
              <div className="w-full mb-4">
                <div className="border border-gray-300 rounded-lg  h-32 bg-white p-4 flex items-center justify-center">
                  <p className="text-blue-950 font-geoformHeavy text-sm">file overview here.</p>
                </div>
              </div>

              <div className="w-full">
                <button
                  className="w-full py-2 font-geoformHeavy bg-blue-950 text-white hover:bg-white hover:text-blue-950 border border-blue-950 rounded-lg   flex items-center justify-center space-x-2"
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
          className="px-6 py-2 font-geoformHeavy bg-blue-950 text-white hover:bg-white hover:text-blue-950 border hover:border-blue-950 rounded-lg  font-medium shadow"
        >
          UPLOAD DOCUMENT
        </button>
      </div>

      <button
        onClick={handleBackToDocuments}
        className="mt-4 px-4 py-2 bg-gray-100 font-geoformHeavy rounded-lg flex items-center space-x-1"
      >
        <ArrowLeftIcon className="h-5 w-5" />
        <span>Back to Documents</span>
      </button>
    </div>
  );

  const EditDocumentPage = () => {
    const [editedDocument, setEditedDocument] = useState<Document>(currentDocument!);

    const handleStatusChange = (status: 'completed' | 'pending') => {
      setEditedDocument(prev => ({
        ...prev,
        status
      }));
      setCurrentDocument(prev => prev ? { ...prev, status } : null);
    };

    return (
      <div className="flex flex-col h-full">
        <h2 className="text-2xl font-geoformHeavy font-bold mb-6">EDIT DOCUMENT</h2>

        <div className="bg-white rounded-lg  p-6 flex-1">
          <div className="max-w-3xl mx-auto">
            <div className="bg-gray-100 rounded-lg  p-8">
              <form action={updateDocument}>
                <div className="mb-4">
                  <label className="block text-blue-950 font-geoformHeavy text-sm font-medium mb-2">
                    document name
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={editedDocument.title}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg  focus:outline-none focus:ring-2 focus:ring-blue-950"
                    placeholder="Enter document name"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-font-geoformHeavy blue-950 text-sm font-medium mb-2">
                    completion date
                  </label>
                  <input
                    type="checkbox"
                    name="completed"
                    value={editedDocument.completed ? "on" : "off"}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg  focus:outline-none focus:ring-2 focus:ring-blue-950"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-blue-950 font-geoformHeavy text-sm font-medium mb-2">
                    description
                  </label>
                  <textarea
                    value={editedDocument.description!}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg  focus:outline-none focus:ring-2 focus:ring-blue-950 h-32"
                    placeholder="Enter document description"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-blue-950 font-geoformHeavy text-sm font-medium mb-2">
                    status
                  </label>
                  <div className="flex space-x-4">
                    <button
                      onClick={() => handleStatusChange('completed')}
                      className={`px-4 py-2 rounded-lg  ${editedDocument.completed
                          ? 'bg-blue-950 text-white'
                          : 'bg-white text-blue-950 font-geoformHeavy border border-blue-950'
                        }`}
                    >
                      Completed
                    </button>
                    <button
                      onClick={() => handleStatusChange('pending')}
                      className={`px-4 py-2 rounded-lg  ${!editedDocument.completed
                          ? 'bg-blue-950 text-white'
                          : 'bg-white text-blue-950 font-geoformHeavy border border-blue-950'
                        }`}
                    >
                      Pending
                    </button>
                  </div>
                </div>

                <div className="flex flex-col">
                  <div className="w-full mb-4">
                    <div className="border border-gray-300 rounded-lg  h-32 bg-white p-4 flex items-center justify-center">
                      <p className="text-blue-950 font-geoformHeavy text-sm">file overview here.</p>
                    </div>
                  </div>

                  <div className="w-full">
                    <button
                      className="w-full py-2 bg-white border border-gray-300 rounded-lg  text-blue-950 flex items-center justify-center space-x-2"
                    >
                      <ArrowUpIcon className="h-5 w-5" />
                      <span>ATTACH FILE</span>
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-center">
          <button
            onClick={handleDocumentUpdate}
            className="px-6 py-2  bg-blue-950 text-white hover:bg-white hover:text-blue-950 border hover:border-blue-950 rounded-lg  font-geoformHeavy font-medium shadow"
          >
            UPDATE DOCUMENT
          </button>
        </div>

        <button
          onClick={handleBackToDocuments}
          className="mt-4 px-4 py-2 bg-gray-100 font-geoformHeavy rounded-lg flex items-center space-x-1"
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
        <h2 className="text-2xl font-geoformHeavy text-blue-950 font-bold">{project.projectName}</h2>
      </div>

      <div className="bg-white rounded-lg  p-6 flex-1">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Completed Documents */}
          <div className="bg-gray-100 rounded-lg  p-4">
            <h3 className=" font-bold mb-4 font-geoformHeavy text-center text-blue-950">completed</h3>
            <div className="space-y-4">
              {completedDocs.map(doc => (
                <div key={doc.id} className="bg-white rounded-lg  p-4 shadow">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-bold text-blue-950">{doc.title}</h4>
                      <p className="text-xs font-geoformItalic text-blue-950">completed: {doc.completed}</p>
                      <p className="text-xs font-geoformItalic text-blue-950">description: {doc.description}</p>
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
          <div className="bg-gray-100 rounded-lg  p-4">
            <h3 className="font-bold mb-4 font-geoformHeavy text-blue-950 text-center">pending</h3>
            <div className="space-y-4">
              {pendingDocs.map(doc => (
                <div key={doc.id} className="bg-white rounded-lg  p-4 shadow">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-bold font-geoformItalic text-blue-950">{doc.title}</h4>
                      <p className="text-xs font-geoformItalic text-blue-950">completed: {doc.completed}</p>
                      <p className="text-xs font-geoformItalic text-blue-950">description: {doc.description}</p>
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
          className="px-6 py-2 bg-white font-geoformHeavy text-blue-950 rounded-lg  font-medium shadow"
        >
          UPLOAD DOCUMENT
        </button>
      </div>

      <button
        onClick={onBack}
        className="mt-4 px-4 py-2 bg-gray-100 rounded-lg flex items-center space-x-1"
      >
        <ArrowLeftIcon className="h-5 w-5 text-blue-950" />
        <span className="text-blue-950 font-geoformHeavy">Back to Project</span>
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