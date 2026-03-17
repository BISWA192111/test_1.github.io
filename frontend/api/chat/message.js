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

function validateMessage(message) {
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

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      error: 'Method not allowed',
    });
  }

  try {
    const openRouterApiKey = process.env.OPENROUTER_API_KEY;
    const model = process.env.OPENROUTER_MODEL || 'nvidia/Llama-3.1-Nemotron-70B-Instruct';

    if (!openRouterApiKey) {
      return res.status(500).json({
        success: false,
        error: 'OPENROUTER_API_KEY is not configured on Vercel',
      });
    }

    // Parse body - Vercel passes body as string or Buffer
    let body;
    if (typeof req.body === 'string') {
      body = JSON.parse(req.body);
    } else if (req.body instanceof Buffer) {
      body = JSON.parse(req.body.toString());
    } else {
      body = req.body || {};
    }

    const { message, conversationHistory = [] } = body;
    const validation = validateMessage(message);

    if (!validation.valid) {
      return res.status(400).json({
        success: false,
        error: validation.error,
      });
    }

    const messages = [
      {
        role: 'system',
        content: SYSTEM_PROMPT,
      },
      ...conversationHistory.map((msg) => ({
        role: msg.role,
        content: msg.content,
      })),
      {
        role: 'user',
        content: message,
      },
    ];

    const openRouterResponse = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${openRouterApiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'https://vercel.com',
        'X-Title': 'BARS-AI',
      },
      body: JSON.stringify({
        model,
        messages,
        temperature: 0.7,
        max_tokens: 2000,
        top_p: 0.95,
        frequency_penalty: 0.5,
        presence_penalty: 0.3,
      }),
    });

    const data = await openRouterResponse.json();

    if (!openRouterResponse.ok) {
      return res.status(openRouterResponse.status).json({
        success: false,
        error: data?.error?.message || 'Failed to get response from AI',
        details: data,
      });
    }

    const content = data?.choices?.[0]?.message?.content || 'No response generated.';
    const usage = data?.usage || {};

    return res.status(200).json({
      success: true,
      conversationId: crypto.randomUUID(),
      timestamp: new Date().toISOString(),
      message: {
        role: 'assistant',
        content,
      },
      usage: {
        promptTokens: usage.prompt_tokens || 0,
        completionTokens: usage.completion_tokens || 0,
        totalTokens: usage.total_tokens || 0,
      },
      model,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error?.message || 'Internal server error',
    });
  }
};
