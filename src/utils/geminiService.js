const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent';

export const enhancePrompt = async (originalPrompt, category) => {
  if (!GEMINI_API_KEY) {
    throw new Error('Gemini API key not configured. Please add VITE_GEMINI_API_KEY to your .env.local file.');
  }

  const categoryContext = {
    image: 'This is an image generation prompt for AI tools like Midjourney, DALL-E, or Stable Diffusion.',
    text: 'This is a text/chat prompt for AI assistants like ChatGPT or Claude.',
    code: 'This is a code generation prompt for coding assistants.',
    creative: 'This is a creative writing prompt.'
  };

  const systemPrompt = `You are an expert prompt engineer. Your task is to enhance and improve the following ${category} prompt while maintaining its core intent.

${categoryContext[category] || ''}

Guidelines:
- Make the prompt more specific and detailed
- Improve clarity and reduce ambiguity
- Add relevant technical terms or artistic styles where appropriate
- Keep the enhanced prompt concise but comprehensive
- Maintain the original intent and requirements
- Return ONLY the enhanced prompt, no explanations

Original prompt to enhance:
"${originalPrompt}"

Enhanced prompt:`;

  try {
    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: systemPrompt
          }]
        }],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        }
      })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error?.message || 'Failed to enhance prompt');
    }

    const data = await response.json();
    const enhancedText = data.candidates?.[0]?.content?.parts?.[0]?.text;
    
    if (!enhancedText) {
      throw new Error('No response from Gemini API');
    }

    return enhancedText.trim();
  } catch (error) {
    console.error('Gemini API Error:', error);
    throw error;
  }
};

export const generatePromptFromDescription = async (description, targetPlatform) => {
  if (!GEMINI_API_KEY) {
    throw new Error('Gemini API key not configured. Please add VITE_GEMINI_API_KEY to your .env.local file.');
  }

  const platformGuidelines = {
    'midjourney': 'Optimize for Midjourney with style parameters, aspect ratios, and artistic keywords.',
    'dalle': 'Optimize for DALL-E with clear, descriptive language.',
    'stable-diffusion': 'Optimize for Stable Diffusion with specific model-friendly terms.',
    'chatgpt': 'Structure as a clear instruction for ChatGPT with context and format requirements.',
    'claude': 'Structure for Claude with detailed context and expected output format.',
    'general': 'Create a versatile prompt that works across multiple AI platforms.'
  };

  const systemPrompt = `You are an expert AI prompt engineer. Create a detailed, optimized prompt based on the user's description.

Target Platform: ${targetPlatform}
${platformGuidelines[targetPlatform] || platformGuidelines['general']}

User's Description:
"${description}"

Requirements:
1. Be specific and detailed
2. Use industry-standard terminology
3. Include relevant parameters and settings
4. Make it ready to use immediately
5. Return ONLY the prompt, no explanations

Generated prompt:`;

  try {
    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: systemPrompt
          }]
        }],
        generationConfig: {
          temperature: 0.8,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        }
      })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error?.message || 'Failed to generate prompt');
    }

    const data = await response.json();
    const generatedText = data.candidates?.[0]?.content?.parts?.[0]?.text;
    
    if (!generatedText) {
      throw new Error('No response from Gemini API');
    }

    return generatedText.trim();
  } catch (error) {
    console.error('Gemini API Error:', error);
    throw error;
  }
};

export const isGeminiConfigured = () => {
  return !!GEMINI_API_KEY;
};