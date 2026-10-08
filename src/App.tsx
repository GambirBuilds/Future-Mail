import React from 'react';
import { FutureMailProvider, useFutureMail } from './context/FutureMailContext';
import { SpaceCanvas } from './components/background/SpaceCanvas';
import { DesktopSidebar } from './components/navigation/DesktopSidebar';
import { MobileNavbar } from './components/navigation/MobileNavbar';
import { TopBar } from './components/navigation/TopBar';
import { LandingPage } from './pages/LandingPage';
import { DashboardPage } from './pages/DashboardPage';
import { ComposePage } from './pages/ComposePage';
import { VaultPage } from './pages/VaultPage';
import { TimelinePage } from './pages/TimelinePage';
import { ArrivedInboxPage } from './pages/ArrivedInboxPage';
import { TemplatesPage } from './pages/TemplatesPage';
import { ProfilePage } from './pages/ProfilePage';
import { SettingsPage } from './pages/SettingsPage';
import { OrionAssistantModal } from './components/orion/OrionAssistantModal';

const MainAppContent: React.FC = () => {
  const { activeTab } = useFutureMail();

  const renderActivePage = () => {
    switch (activeTab) {
      case 'landing':
        return <LandingPage />;
      case 'dashboard':
        return <DashboardPage />;
      case 'compose':
        return <ComposePage />;
      case 'vault':
        return <VaultPage />;
      case 'timeline':
        return <TimelinePage />;
      case 'arrived':
        return <ArrivedInboxPage />;
      case 'templates':
        return <TemplatesPage />;
      case 'profile':
        return <ProfilePage />;
      case 'settings':
        return <SettingsPage />;
      default:
        return <DashboardPage />;
    }
  };

  return (
    <div className="min-h-screen bg-[#050711] text-[#EAF2FF] relative selection:bg-[#8B5CF6]/30 selection:text-[#2FFFD2]">
      {/* Living Digital Universe Background */}
      <SpaceCanvas />

      {/* Floating Glass Desktop Sidebar */}
      <DesktopSidebar />

      {/* Main Content Viewport Area */}
      <div className="lg:pl-76 min-h-screen flex flex-col relative z-10">
        <div className="max-w-6xl w-full mx-auto px-4 sm:px-8 py-4 flex-1 flex flex-col">
          {/* Top Bar Navigation */}
          <TopBar />

          {/* Page Stage */}
          <main className="flex-1 animate-fade-in pb-20 lg:pb-8">
            {renderActivePage()}
          </main>
        </div>
      </div>

      {/* Mobile Floating Bottom Bar */}
      <MobileNavbar />

      {/* Global Orion Assistant Modal Triggerable from Anywhere */}
      <OrionAssistantModal />
    </div>
  );
};

export default function App() {
  return (
    <FutureMailProvider>
      <MainAppContent />
    </FutureMailProvider>
  );
}
