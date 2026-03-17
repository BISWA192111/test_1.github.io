import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Shield, TrendingUp, Users, AlertCircle, ChevronRight, Zap, Activity } from 'lucide-react';
import { StatCard } from '../components/ChatComponents';
import { LineChartComponent, BarChartComponent, PieChartComponent } from '../components/Charts';

const Dashboard = () => {
  const [stats] = useState({
    dailyIncidents: 460,
    activeAlerts: 24,
    safetyRating: 3.8,
    preventedAccidents: 156,
  });

  const goToPath = (path) => {
    window.location.href = path;
  };

  const handleNavigateToChat = (message) => {
    localStorage.setItem('initialMessage', message);
    goToPath('/chat');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8 pb-8"
    >
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 via-blue-700 to-cyan-600 p-8 md:p-12">
        <div className="relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Road Safety Intelligence
          </h1>
          <p className="text-lg text-blue-100 max-w-2xl mb-6 leading-relaxed">
            Real-time insights and AI-powered guidance to make Indian roads safer for everyone.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => goToPath('/chat')}
            className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition flex items-center gap-2"
          >
            <Zap size={20} />
            Ask BARS-AI Now
          </motion.button>
        </div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -mr-48 -mt-48"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-white/5 rounded-full -ml-40 -mb-40"></div>
      </section>

      {/* Stats Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={AlertCircle}
          label="Daily Incidents"
          value={`${stats.dailyIncidents}+`}
          trend="↑ 8% this week"
          trendColor="text-red-400"
        />
        <StatCard
          icon={Zap}
          label="Active Alerts"
          value={stats.activeAlerts}
          trend="Real-time updates"
          trendColor="text-yellow-400"
        />
        <StatCard
          icon={Shield}
          label="Safety Rating"
          value={stats.safetyRating}
          trend="↑ 0.3 pts"
          trendColor="text-green-400"
        />
        <StatCard
          icon={Users}
          label="Prevented Today"
          value={stats.preventedAccidents}
          trend="↑ 12% vs last week"
          trendColor="text-blue-400"
        />
      </section>

      {/* Charts Section */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <LineChartComponent />
        </motion.div>
        <motion.div
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <PieChartComponent />
        </motion.div>
      </section>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <BarChartComponent />
      </motion.div>

      {/* Quick Actions */}
      <section>
        <h2 className="text-2xl font-bold text-white mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <motion.button
            whileHover={{ scale: 1.02, y: -4 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleNavigateToChat('Tell me about BNCAP vehicle safety ratings')}
            className="bg-gradient-to-br from-gray-800 to-gray-850 border border-gray-700 hover:border-blue-500 rounded-lg p-6 text-left group transition transform"
          >
            <div className="flex items-start justify-between">
              <div>
                <div className="bg-blue-600/10 p-3 rounded-lg group-hover:bg-blue-600/20 transition">
                  <Shield className="text-blue-400 group-hover:text-blue-300" size={24} />
                </div>
                <h3 className="text-white font-semibold mt-4 group-hover:text-blue-300 transition">Vehicle Safety Standards</h3>
                <p className="text-gray-400 text-sm mt-2">Learn about BNCAP ratings and safety features</p>
              </div>
              <ChevronRight className="text-gray-600 group-hover:text-blue-400 transition" size={20} />
            </div>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02, y: -4 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleNavigateToChat('What government schemes exist for road safety?')}
            className="bg-gradient-to-br from-gray-800 to-gray-850 border border-gray-700 hover:border-green-500 rounded-lg p-6 text-left group transition transform"
          >
            <div className="flex items-start justify-between">
              <div>
                <div className="bg-green-600/10 p-3 rounded-lg group-hover:bg-green-600/20 transition">
                  <TrendingUp className="text-green-400 group-hover:text-green-300" size={24} />
                </div>
                <h3 className="text-white font-semibold mt-4 group-hover:text-green-300 transition">Prevention Programs</h3>
                <p className="text-gray-400 text-sm mt-2">Government schemes and initiatives</p>
              </div>
              <ChevronRight className="text-gray-600 group-hover:text-green-400 transition" size={20} />
            </div>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02, y: -4 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleNavigateToChat('What are the best practices for safe driving?')}
            className="bg-gradient-to-br from-gray-800 to-gray-850 border border-gray-700 hover:border-purple-500 rounded-lg p-6 text-left group transition transform"
          >
            <div className="flex items-start justify-between">
              <div>
                <div className="bg-purple-600/10 p-3 rounded-lg group-hover:bg-purple-600/20 transition">
                  <Users className="text-purple-400 group-hover:text-purple-300" size={24} />
                </div>
                <h3 className="text-white font-semibold mt-4 group-hover:text-purple-300 transition">Safety Tips</h3>
                <p className="text-gray-400 text-sm mt-2">Best practices and awareness campaigns</p>
              </div>
              <ChevronRight className="text-gray-600 group-hover:text-purple-400 transition" size={20} />
            </div>
          </motion.button>
        </div>
      </section>
    </motion.div>
  );
};

export default Dashboard;
