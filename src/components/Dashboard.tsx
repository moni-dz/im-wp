'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import ProjectsPage from './ProjectsPage';
import EmployeeListPage from './EmployeeListPage';
import ClientOverviewPage from './ClientOverviewPage';
import AddClientPage from './AddClientPage';
import CalendarPage from './Calendar';
import Image from 'next/image';
import logo from '../logo.png';
import WelcomeModal from './WelcomeModal';
import LogoutModal from './LogoutModal';

interface DashboardProps {
  onLogout?: () => void; 
}

type ActiveTab = 'projects' | 'employees' | 'clients' | 'calendar' | 'add-client';

const Dashboard = ({ onLogout }: DashboardProps = {}) => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<ActiveTab>('projects');
  const [showWelcomeModal, setShowWelcomeModal] = useState(true);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  
  const renderSidebarButton = (tab: ActiveTab, label: string) => (
    <button
      onClick={() => setActiveTab(tab)}
      className={`w-full px-6 py-3 text-left rounded-lg transition-colors hover:bg-white hover:text-blue-950 ${
        activeTab === tab || (activeTab === 'add-client' && tab === 'clients')
          ? 'bg-white text-blue-950 shadow-md font-geoformHeavy'
          : 'text-white font-geoformHeavy hover:bg-blue-950'
      }`}
    >
      {label}
    </button>
  );

  const handleAddClient = () => {
    setActiveTab('add-client');
  };
  
  const handleLogoutClick = (e: React.FormEvent) => {
    e.preventDefault(); 
    setShowLogoutModal(true);
  };
  
  const handleLogoutConfirm = () => {
    if (onLogout) {
      onLogout();
    } else {
      router.push('/');
      
    }
  };

  const renderActiveContent = () => {
    switch (activeTab) {
      case 'projects':
        return <ProjectsPage />;
      case 'employees':
        return <EmployeeListPage />;
      case 'clients':
        return <ClientOverviewPage onAddClientClick={handleAddClient} />;
      case 'calendar':
        return <CalendarPage />;
      case 'add-client':
        return <AddClientPage onBackClick={() => setActiveTab('clients')} />;
      default:
        return (
          <div className="flex items-center justify-center h-full">
            <p className="font-geoformHeavy text-blue-50 text-lg">
              Select an option from the sidebar to view content
            </p>
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen bg-blue-950">
      {/* Welcome Modal */}
      {showWelcomeModal && (
        <WelcomeModal onClose={() => setShowWelcomeModal(false)} />
      )}
      
      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <LogoutModal 
          onConfirm={handleLogoutConfirm}
          onCancel={() => setShowLogoutModal(false)} 
        />
      )}
      
      {/* Sidebar */}
      <div className="w-64 p-4 flex flex-col">
        <div className="mb-8 px-6 py-4">
          <div className="text-white">
            <Image
              src={logo}
              alt="LML Engineering Solutions"
              className="w-32"
              width={128}
              height={40}
              priority
            />
          </div>
        </div>
        <div className="space-y-2 flex-grow">
          {renderSidebarButton('projects', 'Projects')}
          {renderSidebarButton('employees', 'Employees')}
          {renderSidebarButton('clients', 'Clients')}
          {renderSidebarButton('calendar', 'Calendar')}
        </div>
        <form onSubmit={handleLogoutClick}>
          <button
            type="submit"
            className="w-full px-6 py-3 mt-auto text-center text-white border border-white hover:bg-white hover:text-blue-950 rounded-lg transition-colors font-geoformHeavy"
          >
            Log out
          </button>
        </form>
      </div>
      
      {/* Main Content */}
      <div className="flex-grow p-8 bg-gray-100 overflow-auto">
        {renderActiveContent()}
      </div>
    </div>
  );
};

export default Dashboard;