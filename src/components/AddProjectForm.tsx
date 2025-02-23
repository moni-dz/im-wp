import { Project } from './types';
import { useState } from 'react';

interface AddProjectFormProps {
  onSubmit: (project: Omit<Project, 'id'>) => void;
  onCancel: () => void;
}

const AddProjectForm = ({ onSubmit, onCancel }: AddProjectFormProps) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    startDate: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      status: 'active',
      progress: 0
    });
  };

  return (
    <div className="bg-white rounded-lg p-6 w-full max-w-md">
      <h3 className="text-xl font-semibold mb-4">Add New Project</h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Project Name
          </label>
          <input
            type="text"
            required
            className="w-full p-2 border rounded-lg"
            value={formData.name}
            onChange={e => setFormData({ ...formData, name: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            required
            className="w-full p-2 border rounded-lg"
            rows={3}
            value={formData.description}
            onChange={e => setFormData({ ...formData, description: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Start Date
          </label>
          <input
            type="date"
            required
            className="w-full p-2 border rounded-lg"
            value={formData.startDate}
            onChange={e => setFormData({ ...formData, startDate: e.target.value })}
          />
        </div>

        <div className="flex justify-end space-x-3 pt-4">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-gray-600 hover:text-gray-800"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800"
          >
            Create Project
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProjectForm;