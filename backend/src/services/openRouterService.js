import axios from 'axios';
import config from '../config.js';
import logger from '../logger.js';

class OpenRouterService {
  constructor() {
    this.client = axios.create({
      baseURL: config.openrouter.baseUrl,
      headers: {
        'Authorization': `Bearer ${config.openrouter.apiKey}`,
        'HTTP-Referer': config.frontendUrl,
        'X-Title': 'BARS-AI',
        'Content-Type': 'application/json',
      },
    });
  }

  async chat(messages, systemPrompt) {
    try {
      const payload = {
        model: config.openrouter.model,
        messages: [
          {
            role: 'system',
            content: systemPrompt,
          },
          ...messages,
        ],
        temperature: config.openrouter.temperature,
        max_tokens: config.openrouter.maxTokens,
        top_p: 0.95,
        frequency_penalty: 0.5,
        presence_penalty: 0.3,
      };

      logger.info('Calling OpenRouter API', { model: config.openrouter.model });

      const response = await this.client.post('/chat/completions', payload);

      const content = response.data.choices[0].message.content;
      const usage = response.data.usage;

      logger.info('OpenRouter response received', { usage });

      return {
        success: true,
        content,
        usage: {
          promptTokens: usage.prompt_tokens,
          completionTokens: usage.completion_tokens,
          totalTokens: usage.total_tokens,
        },
        model: config.openrouter.model,
      };
    } catch (error) {
      logger.error('OpenRouter API Error:', error.response?.data || error.message);
      
      throw {
        status: error.response?.status || 500,
        message: error.response?.data?.error?.message || 'Failed to get response from AI',
        error: error.response?.data || error.message,
      };
    }
  }

  async streamChat(messages, systemPrompt) {
    try {
      const payload = {
        model: config.openrouter.model,
        messages: [
          {
            role: 'system',
            content: systemPrompt,
          },
          ...messages,
        ],
        temperature: config.openrouter.temperature,
        max_tokens: config.openrouter.maxTokens,
        stream: true,
      };

      logger.info('Starting OpenRouter stream', { model: config.openrouter.model });

      const response = await this.client.post('/chat/completions', payload, {
        responseType: 'stream',
      });

      return response.data;
    } catch (error) {
      logger.error('OpenRouter Stream Error:', error.message);
      throw {
        status: error.response?.status || 500,
        message: 'Failed to start AI stream',
        error: error.message,
      };
    }
  }
}

export default new OpenRouterService();
