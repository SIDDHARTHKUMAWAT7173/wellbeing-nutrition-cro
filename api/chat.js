/**
 * Vercel Serverless Function: /api/chat
 * Handles conversational queries for Wellbeing Nutrition Korean Marine Collagen Peptides
 * Powered by Google Gemini Developer API (Free Tier)
 */

// In-memory rate limiting (per serverless instance)
const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 25;

function isRateLimited(clientIp) {
  const now = Date.now();
  const clientData = rateLimitMap.get(clientIp);

  if (!clientData || now - clientData.startTime > RATE_LIMIT_WINDOW_MS) {
    rateLimitMap.set(clientIp, { count: 1, startTime: now });
    return false;
  }

  if (clientData.count >= MAX_REQUESTS_PER_WINDOW) {
    return true;
  }

  clientData.count += 1;
  return false;
}

// Clean up stale rate limit entries every 5 minutes
setInterval(() => {
  const now = Date.now();
  for (const [ip, data] of rateLimitMap.entries()) {
    if (now - data.startTime > RATE_LIMIT_WINDOW_MS * 5) {
      rateLimitMap.delete(ip);
    }
  }
}, 5 * 60 * 1000).unref?.();

// Accurate Product Knowledge Base & Persona
const SYSTEM_PROMPT = `You are "Wellbeing Expert", an intelligent, warm, and factual AI product consultant for Wellbeing Nutrition's Korean Marine Collagen Peptides.

YOUR KNOWLEDGE BASE (STRICT SOURCE OF TRUTH):
1. Product Name & Identity:
   - Pure Korean Marine Collagen Peptides | Unflavored | Combat Signs of Ageing
   - Form: Hydrolyzed powder, unflavored, odorless, heat-stable.
   - Sourcing: 100% pure marine collagen extracted from wild-caught deep-sea fish in Korea.
   - Manufacturer/Marketer: Nutritionalab Pvt. Ltd., Mumbai, Maharashtra. FSSAI Lic. No. 10019022009134. Manufactured in a US FDA registered, GMP certified facility.
   - Net Quantity & Servings: 200g jar containing 25 servings (8g per scoop). Shelf life: 36 months from manufacturing.

2. Science & Composition:
   - Bioactive Peptides: Contains Type 1 (90%) and Type 3 (10%) hydrolyzed collagen peptides. Type 1 restores skin firmness, structure, and hydration; Type 3 maintains elasticity and connective tissue integrity.
   - Ultra-Low Molecular Weight: Under 1000 Daltons (<1000 Da) for rapid, superior bioavailability (absorbed up to 1.5x faster than bovine or porcine collagen).
   - Ingredients: 100% Pure Korean Marine Collagen Peptides (sole ingredient). Zero added sugar, zero fats, zero fillers, zero preservatives, zero artificial flavors or colors.

3. Key Benefits:
   - Clinically supported 35% wrinkle reduction.
   - Restores skin elasticity, firmness, and deep dermal hydration.
   - Enhances hair growth, thickness, and shine by stimulating keratin production; helps reduce hair thinning.
   - Strengthens brittle nails and supports healthy nail growth.
   - Supports joint flexibility, tendon elasticity, and gut-friendly cellular repair.
   - Encourages tissue regeneration and helps fade acne scars and post-blemish texture.

4. Pack Sizes & Pricing (MRP inclusive of all taxes):
   - Pack of 1 (200g, 25 servings): ₹1,745 (Compare MRP: ₹1,799 — Save 3%)
   - Pack of 2 (400g, 50 servings): ₹3,418 (Compare MRP: ₹3,598 — Save 5%)
   - Pack of 3 (600g, 75 servings): ₹5,019 (Compare MRP: ₹5,397 — Save 7%) — Highly recommended for completing the optimal 12-week clinical routine.
   - Pack of 4 (800g, 100 servings): ₹6,476 (Compare MRP: ₹7,196 — Save 10%) — Maximum volume savings.

5. Directions & Usage:
   - Serving Size: 1 scoop (8g) per day.
   - How to mix: Dissolves seamlessly in any hot or cold liquid (coffee, tea, smoothies, water, juice, oatmeal, yogurt, or soups). Because it is hydrolyzed, it does not gel or clump.
   - Best Time: Anytime daily, but mid-morning or evening is ideal. Pairing with Vitamin C (or citrus/amla) further accelerates collagen synthesis.
   - Timeline for Results: Noticeable improvements in skin hydration and texture typically appear in 4 to 8 weeks. Maximum cellular density, fine line reduction, and joint/hair benefits develop over 8 to 12 weeks of consistent daily use.

6. Dietary, Purity & Safety Standards:
   - Dietary Status: 100% Pescatarian. NOT vegetarian or vegan (since it comes from deep-sea fish). Naturally Gluten-Free, Dairy-Free, Non-GMO, Hormone-Free, Sugar-Free.
   - Weight Management: Will NOT cause weight gain. Pure protein (low calorie), 0g sugar, 0g fat.
   - Quality & Lab Testing: Tested and certified pathogen-free (Microbial testing for E. coli, Salmonella); screened for heavy metals (Lead, Mercury, Arsenic, Cadmium strictly below undetectable/safe baseline); 100% free from pesticides and solvent residue.

7. Customer Guarantees & Shipping:
   - Free shipping across India.
   - Cash on Delivery (COD) available.
   - 7-Day Replacement Guarantee.
   - Customer Rating: 4.74 out of 5 stars based on 545+ verified customer reviews (74% 5-star, 26% 4-star).

STRICT RULES & CONSTRAINTS:
- NEVER invent or exaggerate ingredients, dosages, certifications, laboratory results, or clinical trials.
- Never promise medical cures or diagnose health conditions.
- For queries involving pregnancy, lactation, prescription medication interactions, or specific medical conditions, provide cautious general information and always advise consulting a qualified doctor or healthcare professional.
- You do NOT have direct access to live individual user orders, shipping tracking, or account databases. If asked to look up a personal order number or track delivery, politely clarify that you are a product specialist AI and advise reaching out to Wellbeing Nutrition customer support.
- Keep your answers concise, clear, and easy to read on mobile screens (use bullet points or short paragraphs where appropriate).`;

module.exports = async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed. Use POST.' });
  }

  // Rate Limiting Check
  const clientIp = req.headers['x-forwarded-for']?.split(',')[0]?.trim() || req.socket?.remoteAddress || '127.0.0.1';
  if (isRateLimited(clientIp)) {
    return res.status(429).json({
      error: 'You are sending messages too quickly. Please wait a moment before trying again.',
      code: 'RATE_LIMIT_EXCEEDED'
    });
  }

  // Verify Google Gemini API key
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey.trim() === '' || apiKey === 'your-gemini-api-key-here') {
    return res.status(503).json({
      error: 'Google Gemini API key is not configured on the server. Please add GEMINI_API_KEY to your Vercel project environment variables.',
      code: 'MISSING_API_KEY'
    });
  }

  // Parse and validate request body
  let body = req.body;
  if (typeof body === 'string') {
    try {
      body = JSON.parse(body);
    } catch (e) {
      return res.status(400).json({ error: 'Invalid JSON payload in request body.' });
    }
  }

  const userMessage = body?.message?.trim();
  if (!userMessage) {
    return res.status(400).json({ error: 'Message content is required.' });
  }

  if (userMessage.length > 2000) {
    return res.status(400).json({ error: 'Message exceeds maximum length of 2000 characters.' });
  }

  // Build valid multi-turn contents array for Google Gemini API
  // Incoming history items: { role: 'user' | 'assistant', content: string }
  // Gemini expects roles: 'user' and 'model'
  const incomingHistory = Array.isArray(body?.history) ? body.history : [];
  const safeHistory = incomingHistory
    .slice(-10)
    .filter(item => item && typeof item === 'object' && (item.role === 'user' || item.role === 'assistant') && typeof item.content === 'string')
    .map(item => ({
      role: item.role === 'assistant' ? 'model' : 'user',
      content: item.content.slice(0, 2000)
    }));

  const contents = [];
  for (const item of safeHistory) {
    // Gemini multi-turn conversation must begin with a user turn
    if (contents.length === 0 && item.role === 'model') continue;

    // Merge consecutive turns with the same role to maintain valid alternation
    if (contents.length > 0 && contents[contents.length - 1].role === item.role) {
      contents[contents.length - 1].parts[0].text += '\n' + item.content;
    } else {
      contents.push({
        role: item.role,
        parts: [{ text: item.content }]
      });
    }
  }

  // Add the current user turn
  if (contents.length > 0 && contents[contents.length - 1].role === 'user') {
    contents[contents.length - 1].parts[0].text += '\n' + userMessage;
  } else {
    contents.push({
      role: 'user',
      parts: [{ text: userMessage }]
    });
  }

  // Candidate models: default to gemini-3.8-flash, with automatic fallbacks if 404 is returned
  const configuredModel = process.env.GEMINI_MODEL?.trim();
  const candidateModels = configuredModel
    ? [configuredModel]
    : ['gemini-3.8-flash', 'gemini-3.6-flash', 'gemini-3.5-flash-lite', 'gemini-2.0-flash'];

  const geminiPayload = {
    system_instruction: {
      parts: [{ text: SYSTEM_PROMPT }]
    },
    contents: contents,
    generationConfig: {
      temperature: 0.5,
      maxOutputTokens: 600
    }
  };

  let lastError = null;
  let successfulReply = null;
  let usedModel = null;

  for (const model of candidateModels) {
    const geminiEndpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 20000); // 20s timeout per attempt

    try {
      const geminiResponse = await fetch(geminiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-goog-api-key': apiKey.trim()
        },
        body: JSON.stringify(geminiPayload),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (geminiResponse.ok) {
        const data = await geminiResponse.json();
        const candidate = data.candidates?.[0];
        const reply = candidate?.content?.parts?.map(p => p.text).filter(Boolean).join('\n')?.trim();

        if (reply) {
          successfulReply = reply;
          usedModel = model;
          break;
        } else if (candidate?.finishReason === 'SAFETY') {
          successfulReply = 'I apologize, but I cannot fulfill that request due to content safety guidelines. Please ask another question about our Korean Marine Collagen Peptides.';
          usedModel = model;
          break;
        }
      } else {
        const errorData = await geminiResponse.json().catch(() => ({}));
        const apiMessage = errorData.error?.message || 'Failed to generate response from Gemini API.';
        lastError = {
          status: geminiResponse.status,
          message: apiMessage,
          code: errorData.error?.status || 'GEMINI_API_ERROR'
        };

        // If the model was not found (404), continue to the next candidate model
        if (geminiResponse.status === 404 && candidateModels.length > 1) {
          console.warn(`Gemini model '${model}' returned 404 (${apiMessage}). Retrying with next model...`);
          continue;
        }

        // For auth (400 key error, 401, 403) or rate limit (429), break immediately
        break;
      }
    } catch (err) {
      clearTimeout(timeoutId);
      if (err.name === 'AbortError') {
        lastError = { status: 504, message: 'Request timed out waiting for Google Gemini response.', code: 'GATEWAY_TIMEOUT' };
      } else {
        lastError = { status: 500, message: err.message, code: 'NETWORK_ERROR' };
      }
      break;
    }
  }

  // If a response was generated, return success
  if (successfulReply) {
    return res.status(200).json({
      reply: successfulReply,
      model: usedModel
    });
  }

  // Handle mapped error responses — ALWAYS return 502/401/429, NEVER return 404 from /api/chat!
  if (lastError) {
    const statusCode = lastError.status;
    const apiMessage = lastError.message;

    if (statusCode === 400 && apiMessage.toLowerCase().includes('api key')) {
      return res.status(401).json({
        error: 'The provided Google Gemini API key is invalid. Please check your GEMINI_API_KEY in Vercel.',
        code: 'INVALID_API_KEY'
      });
    }

    if (statusCode === 401 || statusCode === 403) {
      return res.status(403).json({
        error: 'Access denied by Google Gemini API. Please verify your GEMINI_API_KEY permissions.',
        code: 'PERMISSION_DENIED'
      });
    }

    if (statusCode === 429) {
      return res.status(429).json({
        error: 'Google Gemini free-tier rate limit or quota exceeded. Please wait a moment before trying again.',
        code: 'GEMINI_QUOTA_EXCEEDED'
      });
    }

    if (statusCode === 404) {
      return res.status(502).json({
        error: `Gemini model was not found: ${apiMessage}`,
        code: 'MODEL_NOT_FOUND'
      });
    }

    if (statusCode === 504) {
      return res.status(504).json({
        error: 'Request timed out waiting for Google Gemini response. Please try again.',
        code: 'GATEWAY_TIMEOUT'
      });
    }

    return res.status(502).json({
      error: apiMessage,
      code: lastError.code || 'GEMINI_API_ERROR'
    });
  }

  return res.status(502).json({
    error: 'Received empty response from Gemini AI. Please try again.',
    code: 'EMPTY_AI_RESPONSE'
  });
};
