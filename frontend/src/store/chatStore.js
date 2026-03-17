import { create } from 'zustand';

const useChatStore = create((set) => ({
  messages: [],
  isLoading: false,
  error: null,
  conversationId: null,

  addMessage: (message) =>
    set((state) => ({
      messages: [...state.messages, message],
    })),

  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),
  clearMessages: () => set({ messages: [], error: null }),

  clearError: () => set({ error: null }),
}));

export default useChatStore;
