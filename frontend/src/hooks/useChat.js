import { useCallback, useEffect, useRef } from 'react';
import { chatAPI } from '../utils/api';
import useChatStore from '../store/chatStore';

const useChat = () => {
  const { messages, isLoading, error, addMessage, setLoading, setError, clearError } = useChatStore();
  const initialMessageProcessed = useRef(false);

  const sendMessage = useCallback(
    async (userMessage) => {
      clearError();
      setLoading(true);

      try {
        // Add user message
        addMessage({
          id: Date.now().toString(),
          role: 'user',
          content: userMessage,
          timestamp: new Date(),
        });

        // Get conversation history
        const conversationHistory = messages.map(msg => ({
          role: msg.role,
          content: msg.content,
        }));

        // Send to API
        const response = await chatAPI.sendMessage(userMessage, conversationHistory);

        if (response.data.success) {
          // Add assistant message
          addMessage({
            id: (Date.now() + 1).toString(),
            role: 'assistant',
            content: response.data.message.content,
            timestamp: new Date(),
            usage: response.data.usage,
          });
        } else {
          throw new Error(response.data.error || 'Failed to get response');
        }
      } catch (err) {
        const errorMessage = err.response?.data?.error || err.message || 'An error occurred';
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    },
    [messages, addMessage, setLoading, setError, clearError]
  );

  // Handle initial message from navigation
  useEffect(() => {
    if (!initialMessageProcessed.current) {
      const initialMessage = localStorage.getItem('initialMessage');
      if (initialMessage) {
        initialMessageProcessed.current = true;
        localStorage.removeItem('initialMessage');
        // Delay to ensure component is mounted
        const timer = setTimeout(() => sendMessage(initialMessage), 100);
        return () => clearTimeout(timer);
      }
    }
  }, [sendMessage]);

  return {
    messages,
    isLoading,
    error,
    sendMessage,
    clearError,
  };
};

export default useChat;
