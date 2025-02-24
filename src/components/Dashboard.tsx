'use client';

import { useState } from 'react';
import ProjectsPage from './ProjectsPage';

interface DashboardProps {
  onLogout: () => void;
}

type ActiveTab = 'projects' | 'employees' | 'clients' | 'calendar';

const Dashboard = ({ onLogout }: DashboardProps) => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('projects');

  const renderSidebarButton = (tab: ActiveTab, label: string) => (
    <button
      onClick={() => setActiveTab(tab)}
      className={`w-full px-6 py-3 text-left rounded-lg transition-colors ${
        activeTab === tab
          ? 'bg-white text-blue-900 shadow-md'
          : 'text-white hover:bg-blue-800'
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="flex h-screen bg-blue-900">
      {/* Sidebar */}
      <div className="w-64 p-4 flex flex-col">
        <div className="mb-8 px-6 py-4">
          <h1 className="text-white text-xl font-bold">LOGO</h1>
        </div>
        <div className="space-y-2 flex-grow">
          {renderSidebarButton('projects', 'Projects')}
          {renderSidebarButton('employees', 'Employees')}
          {renderSidebarButton('clients', 'Clients')}
          {renderSidebarButton('calendar', 'Calendar')}
        </div>
        <button
          onClick={onLogout}
          className="w-full px-6 py-3 mt-auto text-left text-white hover:bg-blue-800 rounded-lg transition-colors"
        >
          Log out
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-grow p-8 bg-gray-100 overflow-auto">
        {activeTab === 'projects' ? (
          <ProjectsPage />
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-500 text-lg">
              Select an option from the sidebar to view content
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;