'use client';

import { useState } from 'react';
import ProjectsPage from './ProjectsPage';
import EmployeeListPage from './EmployeeListPage';
import ClientOverviewPage from './ClientOverviewPage';
import AddClientPage from './AddClientPage';
import CalendarPage from './Calendar';

interface DashboardProps {
  onLogout: () => void;
}

type ActiveTab = 'projects' | 'employees' | 'clients' | 'calendar' | 'add-client';

const Dashboard = ({ onLogout }: DashboardProps) => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('projects');

  const renderSidebarButton = (tab: ActiveTab, label: string) => (
    <button
      onClick={() => setActiveTab(tab)}
      className={`w-full px-6 py-3 text-left rounded-lg transition-colors ${
        activeTab === tab || (activeTab === 'add-client' && tab === 'clients')
          ? 'bg-white text-blue-950 shadow-md'
          : 'text-white hover:bg-blue-950'
      }`}
    >
      {label}
    </button>
  );

  const handleAddClient = () => {
    setActiveTab('add-client');
  };

  const renderActiveContent = () => {
    switch (activeTab) {
      case 'projects':
        return <ProjectsPage />;
      case 'employees':
        return <EmployeeListPage projectName="project name" />;
      case 'clients':
        return <ClientOverviewPage onAddClientClick={handleAddClient} />;
      case 'calendar':
        return <CalendarPage />;
      case 'add-client':
        return <AddClientPage onBackClick={() => setActiveTab('clients')} />;
      default:
        return (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-500 text-lg">
              Select an option from the sidebar to view content
            </p>
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen bg-blue-950">
      {/* Sidebar */}
      <div className="w-64 p-4 flex flex-col">
        <div className="mb-8 px-6 py-4">
          <div className="text-white">
            <img // logo needs to be imported - placeholder only kapoy pa ahahahahahahhahaa
              src="/logo.png"
              alt="LML Engineering Solutions"
              className="w-32"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.onerror = null;
                target.src = '';
                target.alt = 'LML ENGINEERING SOLUTIONS';
                target.className = 'font-bold text-lg';
              }}
            />
          </div>
        </div>
        <div className="space-y-2 flex-grow">
          {renderSidebarButton('projects', 'Projects')}
          {renderSidebarButton('employees', 'Employees')}
          {renderSidebarButton('clients', 'Clients')}
          {renderSidebarButton('calendar', 'Calendar')}
        </div>
        <button
          onClick={onLogout}
          className="w-full px-6 py-3 mt-auto text-left text-white hover:bg-blue-950 rounded-lg transition-colors"
        >
          Log out
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-grow p-8 bg-gray-100 overflow-auto">
        {renderActiveContent()}
      </div>
    </div>
  );
};

export default Dashboard;