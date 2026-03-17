import React from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const accidentData = [
  { month: 'Jan', accidents: 120, severity: 45 },
  { month: 'Feb', accidents: 115, severity: 42 },
  { month: 'Mar', accidents: 130, severity: 48 },
  { month: 'Apr', accidents: 125, severity: 46 },
  { month: 'May', accidents: 140, severity: 52 },
  { month: 'Jun', accidents: 135, severity: 50 },
];

const causeData = [
  { name: 'Speeding', value: 35 },
  { name: 'Rash Driving', value: 25 },
  { name: 'Signal Violation', value: 20 },
  { name: 'Drunk Driving', value: 12 },
  { name: 'Others', value: 8 },
];

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

const LineChartComponent = () => (
  <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
    <h3 className="text-white font-semibold mb-4">Monthly Trends</h3>
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={accidentData}>
        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
        <XAxis stroke="#9ca3af" />
        <YAxis stroke="#9ca3af" />
        <Tooltip 
          contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: '8px' }}
          labelStyle={{ color: '#fff' }}
        />
        <Legend />
        <Line type="monotone" dataKey="accidents" stroke="#3b82f6" strokeWidth={2} />
        <Line type="monotone" dataKey="severity" stroke="#ef4444" strokeWidth={2} />
      </LineChart>
    </ResponsiveContainer>
  </div>
);

const BarChartComponent = () => (
  <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
    <h3 className="text-white font-semibold mb-4">Trends Comparison</h3>
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={accidentData}>
        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
        <XAxis stroke="#9ca3af" />
        <YAxis stroke="#9ca3af" />
        <Tooltip 
          contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: '8px' }}
          labelStyle={{ color: '#fff' }}
        />
        <Legend />
        <Bar dataKey="accidents" fill="#3b82f6" />
        <Bar dataKey="severity" fill="#ef4444" />
      </BarChart>
    </ResponsiveContainer>
  </div>
);

const PieChartComponent = () => (
  <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
    <h3 className="text-white font-semibold mb-4">Accident Causes</h3>
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={causeData}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={({ name, value }) => `${name}: ${value}%`}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {causeData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: '8px' }} />
      </PieChart>
    </ResponsiveContainer>
  </div>
);

export { LineChartComponent, BarChartComponent, PieChartComponent };
