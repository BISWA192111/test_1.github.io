import chatService from '../services/chatService.js';
import logger from '../logger.js';

export const sendMessage = async (req, res) => {
  try {
    const { message, conversationHistory } = req.body;

    // Validate input
    const validation = chatService.validateMessage(message);
    if (!validation.valid) {
      return res.status(400).json({
        success: false,
        error: validation.error,
      });
    }

    // Process message
    const result = await chatService.processMessage(
      message,
      conversationHistory || []
    );

    res.status(200).json(result);
  } catch (error) {
    logger.error('Chat controller error:', error);
    
    const status = error.status || 500;
    const message = error.message || 'Internal server error';
    
    res.status(status).json({
      success: false,
      error: message,
    });
  }
};

export const streamMessage = async (req, res) => {
  try {
    const { message, conversationHistory } = req.body;

    // Validate input
    const validation = chatService.validateMessage(message);
    if (!validation.valid) {
      return res.status(400).json({
        success: false,
        error: validation.error,
      });
    }

    // Setup SSE headers
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    // Get stream
    const stream = await chatService.getStreamResponse(
      message,
      conversationHistory || []
    );

    let buffer = '';

    stream.on('data', (chunk) => {
      const lines = (buffer + chunk.toString()).split('\n');
      buffer = lines[lines.length - 1];

      for (let i = 0; i < lines.length - 1; i++) {
        const line = lines[i];
        if (line.startsWith('data: ')) {
          try {
            const data = JSON.parse(line.slice(6));
            const content = data?.choices?.[0]?.delta?.content;
            if (content) {
              res.write(`data: ${JSON.stringify({ content })}\n\n`);
            }
          } catch (e) {
            // Skip invalid JSON
          }
        }
      }
    });

    stream.on('end', () => {
      res.write('data: [DONE]\n\n');
      res.end();
    });

    stream.on('error', (error) => {
      logger.error('Stream error:', error);
      res.write('data: [ERROR]\n\n');
      res.end();
    });
  } catch (error) {
    logger.error('Stream controller error:', error);
    
    res.setHeader('Content-Type', 'application/json');
    const status = error.status || 500;
    const message = error.message || 'Internal server error';
    
    res.status(status).json({
      success: false,
      error: message,
    });
  }
};
