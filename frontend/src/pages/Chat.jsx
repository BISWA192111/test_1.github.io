import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import toast, { Toaster } from 'react-hot-toast';
import { MessageBubble, MessageInput } from '../components/ChatComponents';
import useChat from '../hooks/useChat';
import { Shield, MessageCircle, Zap } from 'lucide-react';

const ChatPage = () => {
  const { messages, isLoading, error, sendMessage } = useChat();
  const messagesContainerRef = useRef(null);

  const scrollToBottom = () => {
    requestAnimationFrame(() => {
      if (messagesContainerRef.current) {
        const scrollElement = messagesContainerRef.current;
        scrollElement.scrollTop = scrollElement.scrollHeight;
      }
    });
  };

  useEffect(() => {
    const timer = setTimeout(scrollToBottom, 100);
    return () => clearTimeout(timer);
  }, [messages, isLoading]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const suggestedQuestions = [
    'What are the latest road safety statistics?',
    'Tell me about BNCAP vehicle ratings',
    'What is the government cashless treatment scheme?',
    'How can I practice safe driving?'
  ];

  const handleSuggestedQuestion = (question) => {
    sendMessage(question);
  };

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-gray-900">
      <Toaster position="top-right" />

      {/* Header */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-gradient-to-r from-gray-800 to-gray-900 border-b border-gray-700 p-4 md:p-6 flex-shrink-0"
      >
        <div className="flex items-center gap-3 mb-2">
          <div className="bg-blue-600 p-2 rounded-lg">
            <Shield className="text-white" size={24} />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-white">BARS-AI Assistant</h1>
            <p className="text-gray-400 text-xs md:text-sm">
              Road Safety Intelligence | Powered by NVIDIA Llama-3.1-Nemotron
            </p>
          </div>
        </div>
      </motion.div>

      {/* Messages Container */}
      <div 
        ref={messagesContainerRef}
        className="flex-1 overflow-y-auto bg-gray-900 px-4 md:px-6 pt-6"
      >
        {messages.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex-1 flex flex-col items-center justify-center min-h-full"
          >
              <div className="text-center max-w-2xl">
                <div className="bg-blue-600/20 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <MessageCircle className="text-blue-400" size={48} />
                </div>
                <h2 className="text-3xl font-bold text-white mb-2">Start a Conversation</h2>
                <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                  Ask me anything about road safety in India. I can help with statistics, government schemes, vehicle safety standards, and more.
                </p>

                {/* Suggested Questions */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {suggestedQuestions.map((question, idx) => (
                    <motion.button
                      key={idx}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleSuggestedQuestion(question)}
                      className="bg-gray-800 hover:bg-gray-700 border border-gray-700 hover:border-blue-500 text-white text-sm p-3 rounded-lg transition text-left"
                    >
                      <Zap className="inline mr-2 text-blue-400" size={14} />
                      {question}
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.div>
          ) : (
            <div className="space-y-4 pb-6">
              {messages.map((message) => (
                <MessageBubble
                  key={message.id}
                  message={message}
                  isUser={message.role === 'user'}
                />
              ))}
              {isLoading && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="bg-gray-800 text-gray-100 px-5 py-4 rounded-xl rounded-tl-none border border-gray-700">
                    <div className="flex gap-2">
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.15s' }}></div>
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }}></div>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          )}
      </div>

      {/* Input Section */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-gray-800 border-t border-gray-700 p-4 md:p-6 flex-shrink-0"
      >
        <MessageInput
          onSend={sendMessage}
          isLoading={isLoading}
          disabled={isLoading}
        />
        <p className="text-xs text-gray-500 mt-3">
          Press Enter to send. This is powered by NVIDIA Nemotron 3 Super model.
        </p>
      </motion.div>
    </div>
  );
};

export default ChatPage;
