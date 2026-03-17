import React, { useState } from 'react';
import Dashboard from './pages/Dashboard';
import Chat from './pages/Chat';
import Analytics from './pages/Analytics';
import Navbar from './components/Navbar';

const App = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('dashboard');

  const handleNavigation = (page) => {
    setCurrentPage(page);
    setMobileMenuOpen(false);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'chat':
        return <Chat />;
      case 'analytics':
        return <Analytics />;
      default:
        return <Dashboard />;
    }
  };

  // For router in production
  const isChat = window.location.pathname === '/chat';
  const isAnalytics = window.location.pathname === '/analytics';

  const displayPage = isChat ? <Chat /> : isAnalytics ? <Analytics /> : <Dashboard />;

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <Navbar 
        onMobileMenuOpen={() => setMobileMenuOpen(!mobileMenuOpen)} 
        mobileMenuOpen={mobileMenuOpen}
      />

      {isChat ? (
        <main className="pt-16">
          {displayPage}
        </main>
      ) : (
        <>
          <main className="pt-20 pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {displayPage}
            </div>
          </main>

          {/* Footer */}
          <footer className="bg-gray-800 border-t border-gray-700 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                <div>
                  <h4 className="font-semibold text-white mb-3">About BARS-AI</h4>
                  <p className="text-gray-400 text-sm">
                    Intelligent road safety assistance for India's future.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-3">Quick Links</h4>
                  <ul className="space-y-2 text-sm text-gray-400">
                    <li><a href="/" className="hover:text-white transition">Dashboard</a></li>
                    <li><a href="/chat" className="hover:text-white transition">Chat Support</a></li>
                    <li><a href="/analytics" className="hover:text-white transition">Analytics</a></li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-3">Connect</h4>
                  <ul className="space-y-2 text-sm text-gray-400">
                    <li><a href="#" className="hover:text-white transition">GitHub</a></li>
                    <li><a href="#" className="hover:text-white transition">Twitter</a></li>
                    <li><a href="#" className="hover:text-white transition">Email</a></li>
                  </ul>
                </div>
              </div>
              <div className="border-t border-gray-700 pt-6 text-center text-gray-400 text-sm">
                <p>&copy; 2024 BARS-AI. All rights reserved. | Built for Road Safety</p>
              </div>
            </div>
          </footer>
        </>
      )}
    </div>
  );
};

export default App;
