import { v4 as uuidv4 } from 'uuid';
import openRouterService from './openRouterService.js';
import logger from '../logger.js';

const SYSTEM_PROMPT = `You are BARS-AI, an expert AI agent for BARS — Bharat Association of Road Safety Volunteers. You provide comprehensive information about road safety in India.

You have expertise in:
- Latest MoRTH road safety data and statistics
- Government schemes and policies (Cashless Treatment, iRAD, etc.)
- Vehicle safety ratings (BNCAP, Global NCAP)
- Road safety awareness and prevention
- Emergency response protocols
- State-wise road safety initiatives
- NGO programs and campaigns
- Healthcare protocols for road accidents

Key facts: 
- ~460 deaths per day on Indian roads
- 18-45 age group represents 66%+ of victims
- Speeding is the primary cause (70%+)
- 2-wheelers account for 35% of deaths
- Top-most affected states: UP, Maharashtra, TN, MP, Rajasthan

Respond authoritatively with data-driven insights. Always mention sources and statistics. Be concise but comprehensive. Respond in the same language as the user (Hindi or English).`;

class ChatService {
  async processMessage(userMessage, conversationHistory = []) {
    try {
      const conversationId = uuidv4();
      const timestamp = new Date().toISOString();

      logger.info('Processing chat message', { conversationId });

      const messages = [
        ...conversationHistory.map(msg => ({
          role: msg.role,
          content: msg.content,
        })),
        {
          role: 'user',
          content: userMessage,
        },
      ];

      const response = await openRouterService.chat(messages, SYSTEM_PROMPT);

      const result = {
        success: true,
        conversationId,
        timestamp,
        message: {
          role: 'assistant',
          content: response.content,
        },
        usage: response.usage,
        model: response.model,
      };

      logger.info('Chat message processed successfully', { conversationId });

      return result;
    } catch (error) {
      logger.error('Chat processing error:', error);
      throw {
        status: error.status || 500,
        message: error.message || 'Failed to process chat message',
      };
    }
  }

  async getStreamResponse(userMessage, conversationHistory = []) {
    try {
      const messages = [
        ...conversationHistory.map(msg => ({
          role: msg.role,
          content: msg.content,
        })),
        {
          role: 'user',
          content: userMessage,
        },
      ];

      return await openRouterService.streamChat(messages, SYSTEM_PROMPT);
    } catch (error) {
      logger.error('Stream response error:', error);
      throw error;
    }
  }

  validateMessage(message) {
    if (!message || typeof message !== 'string') {
      return { valid: false, error: 'Message must be a non-empty string' };
    }
    if (message.trim().length === 0) {
      return { valid: false, error: 'Message cannot be empty' };
    }
    if (message.length > 5000) {
      return { valid: false, error: 'Message exceeds maximum length' };
    }
    return { valid: true };
  }
}

export default new ChatService();
