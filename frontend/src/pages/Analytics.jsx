import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart3, TrendingUp, Calendar, ArrowUp, ArrowDown } from 'lucide-react';
import { LineChartComponent, BarChartComponent, PieChartComponent } from '../components/Charts';

const Analytics = () => {
  const [dateRange, setDateRange] = useState('month');

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1 },
    }),
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8 pb-8"
    >
      {/* Header Section */}
      <motion.div 
        className="flex flex-col md:flex-row md:items-center md:justify-between gap-6"
      >
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">Analytics Dashboard</h1>
          <p className="text-gray-400 text-lg">Comprehensive road safety metrics and trends</p>
        </div>
        
        {/* Date Range Selector */}
        <div className="flex gap-2 bg-gray-800 p-1 rounded-lg">
          {['week', 'month', 'year'].map((range) => (
            <motion.button
              key={range}
              onClick={() => setDateRange(range)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-4 py-2 rounded-md font-medium transition ${
                dateRange === range
                  ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg'
                  : 'text-gray-300 hover:text-white hover:bg-gray-700'
              }`}
            >
              {range.charAt(0).toUpperCase() + range.slice(1)}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          {
            icon: TrendingUp,
            label: 'Total Incidents',
            value: '13,800',
            trend: '↑ 12%',
            trendColor: 'text-red-400',
            bgColor: 'from-red-600/10 to-red-600/5',
            iconColor: 'text-red-400'
          },
          {
            icon: BarChart3,
            label: 'Prevention Rate',
            value: '78.5%',
            trend: '↑ 3%',
            trendColor: 'text-green-400',
            bgColor: 'from-green-600/10 to-green-600/5',
            iconColor: 'text-green-400'
          },
          {
            icon: Calendar,
            label: 'Avg Response Time',
            value: '4.2 min',
            trend: '↓ 1.2 min',
            trendColor: 'text-blue-400',
            bgColor: 'from-blue-600/10 to-blue-600/5',
            iconColor: 'text-blue-400'
          },
        ].map((kpi, idx) => (
          <motion.div
            key={idx}
            custom={idx}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            whileHover={{ scale: 1.02, y: -4 }}
            className={`bg-gradient-to-br ${kpi.bgColor} border border-gray-700 rounded-lg p-6 hover:border-gray-600 transition`}
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <span className="text-gray-400 text-sm font-medium uppercase tracking-wider">{kpi.label}</span>
                <p className="text-3xl font-bold text-white mt-2">{kpi.value}</p>
              </div>
              <kpi.icon className={`${kpi.iconColor}`} size={24} />
            </div>
            <div className={`text-sm font-medium flex items-center gap-1 ${kpi.trendColor}`}>
              {kpi.trend.includes('↑') ? <ArrowUp size={14} /> : <ArrowDown size={14} />}
              from last month
            </div>
          </motion.div>
        ))}
      </div>

      {/* Detailed Insights */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-gradient-to-r from-gray-800 to-gray-900 border border-gray-700 rounded-lg p-6"
      >
        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="w-1 h-6 bg-blue-500 rounded"></span>
          Key Insights
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <p className="text-gray-300">• Peak incident hours are between 8-10 AM and 5-7 PM during weekdays</p>
          <p className="text-gray-300">• 2-wheeler accidents account for 35% of all road incidents</p>
          <p className="text-gray-300">• Northern states show highest prevention rate improvements</p>
          <p className="text-gray-300">• Real-time alerts reduce response time by 40% on average</p>
        </div>
      </motion.div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <LineChartComponent />
        </motion.div>
        <motion.div
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <PieChartComponent />
        </motion.div>
      </div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <BarChartComponent />
      </motion.div>

      {/* Additional Stats Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4"
      >
        {[
          { label: 'States Covered', value: '28', unit: '' },
          { label: 'Active Volunteers', value: '5.2K', unit: '' },
          { label: 'Lives Saved', value: '1.2K', unit: 'this month' },
          { label: 'Avg Rating', value: '4.8', unit: '/5.0' },
        ].map((stat, idx) => (
          <motion.div
            key={idx}
            whileHover={{ scale: 1.02 }}
            className="bg-gray-800/50 border border-gray-700 rounded-lg p-4 text-center"
          >
            <p className="text-2xl font-bold text-white">{stat.value}</p>
            <p className="text-gray-400 text-sm">{stat.label}</p>
            {stat.unit && <p className="text-xs text-gray-500">{stat.unit}</p>}
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default Analytics;
