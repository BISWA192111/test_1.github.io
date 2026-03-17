import React from 'react';
import { motion } from 'framer-motion';
import { Menu, X, Home, MessageSquare, BarChart3, Settings, Github } from 'lucide-react';

const Navbar = ({ onMobileMenuOpen, mobileMenuOpen }) => {
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition ${
        scrolled ? 'bg-gray-900/95 backdrop-blur border-b border-gray-800' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
              <span className="font-bold text-white text-sm">B</span>
            </div>
            <span className="text-white font-bold text-lg hidden sm:inline">BARS-AI</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <a href="/" className="text-gray-300 hover:text-white transition flex items-center gap-2">
              <Home size={18} />
              Dashboard
            </a>
            <a href="/chat" className="text-gray-300 hover:text-white transition flex items-center gap-2">
              <MessageSquare size={18} />
              Chat
            </a>
            <a href="/analytics" className="text-gray-300 hover:text-white transition flex items-center gap-2">
              <BarChart3 size={18} />
              Analytics
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={onMobileMenuOpen}
            className="md:hidden text-gray-300 hover:text-white"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-gray-900 border-b border-gray-800"
        >
          <div className="px-4 py-3 space-y-3">
            <a href="/" className="block text-gray-300 hover:text-white py-2">Dashboard</a>
            <a href="/chat" className="block text-gray-300 hover:text-white py-2">Chat</a>
            <a href="/analytics" className="block text-gray-300 hover:text-white py-2">Analytics</a>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;
