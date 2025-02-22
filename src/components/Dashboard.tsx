// Dashboard.tsx
'use client';
import { useState } from 'react';
import { Project, Employee } from './types';

interface DashboardProps {
  onLogout: () => void;
}

type ActiveTab = 'dashboard' | 'projects' | 'employees';

const Dashboard = ({ onLogout }: DashboardProps) => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('dashboard');
  const [projects, setProjects] = useState<Project[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);

  const renderTabButton = (tab: ActiveTab, label: string) => (
    <button
      onClick={() => setActiveTab(tab)}
      className={`px-6 py-3 rounded-lg ${
        activeTab === tab
          ? 'bg-blue-500 text-white'
          : 'bg-white text-gray-700 hover:bg-gray-50'
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold">Dashboard</h1>
            </div>
            <div className="flex items-center">
              <button
                onClick={onLogout}
                className="text-gray-600 hover:text-gray-800"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex gap-4 mb-6">
          {renderTabButton('dashboard', 'Dashboard')}
          {renderTabButton('projects', 'Projects')}
          {renderTabButton('employees', 'Employees')}
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          {activeTab === 'dashboard' && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Welcome to Dashboard</h2>
              <p className="text-gray-600">Select a section to get started.</p>
            </div>
          )}

          {activeTab === 'projects' && (
            <div>
              <div className="flex justify-between mb-6">
                <h2 className="text-xl font-semibold">Projects</h2>
                <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600">
                  Add New Project
                </button>
              </div>
              {projects.length === 0 ? (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-600">No projects found.</p>
                </div>
              ) : null}
            </div>
          )}

          {activeTab === 'employees' && (
            <div>
              <div className="flex justify-between mb-6">
                <h2 className="text-xl font-semibold">Employees</h2>
                <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600">
                  Add New Employee
                </button>
              </div>
              {employees.length === 0 ? (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-600">No employees found.</p>
                </div>
              ) : null}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;