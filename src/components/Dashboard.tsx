'use client';

import { useState } from 'react';
import ProjectsPage from './ProjectsPage';

interface DashboardProps {
  onLogout: () => void;
}

type ActiveTab = 'dashboard' | 'projects' | 'employees' | 'clients' | 'calendar';

const Dashboard = ({ onLogout }: DashboardProps) => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('dashboard');

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
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-blue-900 p-6 flex flex-col">
        <div className="mb-12">
          <h1 className="text-3xl font-bold text-white">LOGO</h1>
        </div>
        
        <div className="flex flex-col space-y-2 flex-grow">
          {renderSidebarButton('dashboard', 'Dashboard')}
          {renderSidebarButton('projects', 'Projects')}
          {renderSidebarButton('employees', 'Employees')}
          {renderSidebarButton('clients', 'Clients')}
          {renderSidebarButton('calendar', 'Calendar')}
        </div>
        
        <button
          onClick={onLogout}
          className="w-full px-6 py-3 text-left text-white hover:bg-blue-800 rounded-lg mt-auto"
        >
          Log out
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-grow p-8" style={{ overscrollBehaviorX: 'auto' }}>
        <div className="h-full w-full bg-white rounded-lg shadow-lg p-6">
          {activeTab === 'projects' ? (
            <ProjectsPage />
          ) : (
            <div className="h-full flex items-center justify-center text-gray-500">
              Select an option from the sidebar to view content
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
