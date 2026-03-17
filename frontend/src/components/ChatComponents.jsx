import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Zap, Shield, TrendingUp } from 'lucide-react';

const MessageBubble = ({ message, isUser }) => {
  const containerVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={`flex ${isUser ? 'justify-end' : 'justify-start'} gap-3`}
    >
      <div
        className={`max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-2xl px-4 py-3 rounded-xl ${
          isUser
            ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-br-none shadow-md'
            : 'bg-gray-800 text-gray-100 rounded-tl-none border border-gray-700 shadow-sm'
        }`}
      >
        <p className="text-sm md:text-base leading-relaxed break-words whitespace-pre-wrap">
          {message.content}
        </p>
        {message.usage && !isUser && (
          <div className="text-xs mt-2 opacity-70 flex items-center gap-1">
            <Zap size={12} className="inline" />
            {message.usage.totalTokens} tokens
          </div>
        )}
      </div>
    </motion.div>
  );
};

const MessageInput = ({ onSend, isLoading, disabled }) => {
  const [input, setInput] = React.useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() && !isLoading && !disabled) {
      onSend(input);
      setInput('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="flex gap-3">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          disabled={isLoading || disabled}
          placeholder="Ask about road safety, vehicle ratings, government schemes..."
          className="flex-1 bg-gray-700 border border-gray-600 text-white rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 disabled:opacity-50 placeholder-gray-400 transition text-sm md:text-base"
        />
        <motion.button
          type="submit"
          disabled={isLoading || !input.trim() || disabled}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:opacity-50 disabled:cursor-not-allowed text-white px-4 md:px-6 py-3 rounded-lg font-medium transition flex items-center gap-2 flex-shrink-0"
        >
          {isLoading ? (
            <Zap size={18} className="animate-spin" />
          ) : (
            <Send size={18} />
          )}
          <span className="hidden sm:inline">Send</span>
        </motion.button>
      </div>
    </form>
  );
};

const StatCard = ({ icon: Icon, label, value, trend, trendColor = 'text-blue-400' }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -2 }}
      className="bg-gradient-to-br from-gray-800 to-gray-850 border border-gray-700 rounded-lg p-4 md:p-6 hover:border-blue-600 transition shadow-md"
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <span className="text-gray-400 text-xs md:text-sm font-medium uppercase tracking-wider">{label}</span>
          <p className="text-2xl md:text-3xl font-bold text-white mt-2">
            {value}
          </p>
        </div>
        <div className="bg-blue-600/10 p-2 rounded-lg">
          <Icon className="text-blue-400" size={20} />
        </div>
      </div>
      {trend && (
        <p className={`text-xs md:text-sm ${trendColor}`}>
          {trend}
        </p>
      )}
    </motion.div>
  );
};

export { MessageBubble, MessageInput, StatCard };
