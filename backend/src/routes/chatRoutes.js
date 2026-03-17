import express from 'express';
import { sendMessage, streamMessage } from '../controllers/chatController.js';

const router = express.Router();

// POST /api/chat/message - Send a message and get response
router.post('/message', sendMessage);

// POST /api/chat/stream - Stream response
router.post('/stream', streamMessage);

export default router;
