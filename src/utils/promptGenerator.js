export const generateImagePrompt = (options) => {
  const {
    subject,
    style,
    mood,
    lighting,
    detailLevel,
    customDescription,
    negativePrompt
  } = options;

  const parts = [];

  // Main subject
  if (customDescription) {
    parts.push(customDescription);
  } else if (subject) {
    parts.push(`A ${subject}`);
  }

  // Style
  if (style) {
    const styleDescriptions = {
      'realistic': 'photorealistic, highly detailed, professional photography',
      'artistic': 'artistic painting, painterly style, expressive brushstrokes',
      'anime': 'anime style, Japanese animation, vibrant colors',
      'cartoon': 'cartoon style, animated, colorful and playful',
      '3d': '3D rendered, octane render, ray tracing, hyperrealistic',
      'watercolor': 'watercolor painting, soft edges, translucent layers',
      'oil-painting': 'oil painting, rich textures, classical technique',
      'sketch': 'detailed sketch, pencil drawing, fine linework',
      'digital-art': 'digital art, concept art, modern illustration',
      'pixel-art': 'pixel art, retro style, 8-bit aesthetic'
    };
    parts.push(styleDescriptions[style] || style);
  }

  // Mood
  if (mood) {
    const moodDescriptions = {
      'happy': 'bright, cheerful, uplifting atmosphere',
      'sad': 'melancholic, somber, emotional',
      'mysterious': 'enigmatic, mysterious, intriguing',
      'dramatic': 'dramatic, intense, powerful',
      'peaceful': 'serene, tranquil, calming',
      'energetic': 'dynamic, energetic, vibrant',
      'romantic': 'romantic, soft, dreamy',
      'dark': 'dark, moody, atmospheric',
      'whimsical': 'whimsical, playful, fantastical',
      'epic': 'epic, grand, majestic'
    };
    parts.push(moodDescriptions[mood] || mood);
  }

  // Lighting
  if (lighting) {
    const lightingDescriptions = {
      'natural': 'natural lighting',
      'golden-hour': 'golden hour lighting, warm sunset glow',
      'studio': 'professional studio lighting',
      'dramatic': 'dramatic lighting, strong shadows',
      'soft': 'soft diffused lighting',
      'neon': 'neon lights, cyberpunk glow',
      'candlelight': 'warm candlelight',
      'moonlight': 'moonlit, ethereal glow',
      'backlit': 'backlit, rim lighting',
      'rim-light': 'rim light, edge lighting'
    };
    parts.push(lightingDescriptions[lighting] || lighting);
  }

  // Detail level
  if (detailLevel) {
    const detailDescriptions = {
      'minimal': 'minimalist, clean, simple',
      'basic': 'standard quality',
      'detailed': 'highly detailed, intricate',
      'ultra': 'ultra detailed, 8K resolution, masterpiece, best quality'
    };
    parts.push(detailDescriptions[detailLevel] || detailLevel);
  }

  const prompt = parts.join(', ');

  return {
    prompt: prompt || 'A beautiful image',
    negativePrompt: negativePrompt || ''
  };
};

export const generateTextPrompt = (options) => {
  const {
    task,
    tone,
    context,
    length,
    format,
    additionalInstructions
  } = options;

  const parts = [];

  parts.push('You are a helpful AI assistant.');

  if (tone) {
    const toneDescriptions = {
      'professional': 'Maintain a professional and formal tone.',
      'casual': 'Use a casual, conversational tone.',
      'formal': 'Write in a formal, academic style.',
      'friendly': 'Be warm, friendly, and approachable.',
      'authoritative': 'Speak with authority and expertise.',
      'persuasive': 'Be persuasive and compelling.',
      'informative': 'Be informative and educational.',
      'enthusiastic': 'Show enthusiasm and energy.'
    };
    parts.push(toneDescriptions[tone] || '');
  }

  if (task) {
    parts.push(`Task: ${task}`);
  }

  if (context) {
    parts.push(`Context: ${context}`);
  }

  if (format) {
    parts.push(`Format: Provide the response as a ${format}.`);
  }

  if (length) {
    const lengthDescriptions = {
      'brief': 'Keep the response brief and concise.',
      'medium': 'Provide a moderately detailed response.',
      'detailed': 'Give a comprehensive and detailed response.',
      'extensive': 'Provide an extensive, thorough response.'
    };
    parts.push(lengthDescriptions[length] || '');
  }

  if (additionalInstructions) {
    parts.push(`Additional instructions: ${additionalInstructions}`);
  }

  return {
    prompt: parts.filter(Boolean).join('\n\n')
  };
};

export const generateCodePrompt = (options) => {
  const {
    language,
    taskType,
    description,
    requirements,
    includeComments,
    includeTests
  } = options;

  const parts = [];

  parts.push(`You are an expert ${language} developer.`);

  if (taskType) {
    const taskDescriptions = {
      'function': `Write a ${language} function`,
      'class': `Create a ${language} class`,
      'api': `Design an API endpoint`,
      'component': `Build a UI component`,
      'algorithm': `Implement an algorithm`,
      'debug': `Debug and fix the following code`,
      'refactor': `Refactor the following code for better`,
      'test': `Write unit tests for`,
      'documentation': `Write documentation for`,
      'review': `Review the following code and provide feedback`
    };
    parts.push(taskDescriptions[taskType] || `Write ${language} code`);
  }

  if (description) {
    parts.push(`\nDescription: ${description}`);
  }

  if (requirements) {
    parts.push(`\nRequirements:\n${requirements}`);
  }

  if (includeComments) {
    parts.push('\nPlease include clear, helpful comments explaining the code.');
  }

  if (includeTests) {
    parts.push('\nAlso provide unit tests for the code.');
  }

  parts.push('\nPlease provide clean, efficient, and well-structured code.');

  return {
    prompt: parts.join('\n')
  };
};

export const generateCreativePrompt = (options) => {
  const {
    genre,
    format,
    theme,
    characters,
    setting,
    length,
    additionalElements
  } = options;

  const parts = [];

  if (format) {
    const formatDescriptions = {
      'story': 'Write a short story',
      'novel': 'Write a chapter for a novel',
      'poem': 'Write a poem',
      'essay': 'Write an essay',
      'dialogue': 'Write a dialogue',
      'monologue': 'Write a monologue',
      'script': 'Write a script',
      'blog': 'Write a blog post',
      'email': 'Write an email',
      'letter': 'Write a letter'
    };
    parts.push(formatDescriptions[format] || `Write ${format}`);
  }

  if (genre) {
    parts.push(`in the ${genre} genre`);
  }

  if (theme) {
    parts.push(`\nTheme: ${theme}`);
  }

  if (setting) {
    parts.push(`\nSetting: ${setting}`);
  }

  if (characters) {
    parts.push(`\nCharacters: ${characters}`);
  }

  if (length) {
    const lengthDescriptions = {
      'short': 'Keep it brief (100-300 words)',
      'medium': 'Medium length (300-800 words)',
      'long': 'Longer piece (800-1500 words)',
      'extended': 'Extended length (1500+ words)'
    };
    parts.push(`\nLength: ${lengthDescriptions[length] || length}`);
  }

  if (additionalElements) {
    parts.push(`\nAdditional elements: ${additionalElements}`);
  }

  return {
    prompt: parts.filter(Boolean).join('\n')
  };
};

export const generatePrompt = (category, options) => {
  switch (category) {
    case 'image':
      return generateImagePrompt(options);
    case 'text':
      return generateTextPrompt(options);
    case 'code':
      return generateCodePrompt(options);
    case 'creative':
      return generateCreativePrompt(options);
    default:
      return { prompt: '' };
  }
};

export const generateRandomPrompt = () => {
  const categories = ['image', 'text', 'code', 'creative'];
  const randomCategory = categories[Math.floor(Math.random() * categories.length)];

  const randomOptions = {
    image: () => {
      const subjects = ['portrait', 'landscape', 'cityscape', 'nature', 'animals', 'fantasy creature'];
      const styles = ['realistic', 'artistic', 'anime', '3d', 'watercolor', 'digital-art'];
      const moods = ['happy', 'mysterious', 'dramatic', 'peaceful', 'dark', 'epic'];
      const lighting = ['golden-hour', 'dramatic', 'neon', 'moonlight', 'studio'];

      return {
        subject: subjects[Math.floor(Math.random() * subjects.length)],
        style: styles[Math.floor(Math.random() * styles.length)],
        mood: moods[Math.floor(Math.random() * moods.length)],
        lighting: lighting[Math.floor(Math.random() * lighting.length)],
        detailLevel: 'detailed'
      };
    },
    text: () => {
      const tasks = [
        'Explain a complex topic in simple terms',
        'Write a persuasive argument',
        'Create a summary',
        'Provide recommendations',
        'Analyze a situation'
      ];
      const tones = ['professional', 'casual', 'friendly', 'informative'];

      return {
        task: tasks[Math.floor(Math.random() * tasks.length)],
        tone: tones[Math.floor(Math.random() * tones.length)]
      };
    },
    code: () => {
      const languages = ['javascript', 'python', 'typescript', 'java'];
      const tasks = ['function', 'class', 'api', 'algorithm', 'component'];

      return {
        language: languages[Math.floor(Math.random() * languages.length)],
        taskType: tasks[Math.floor(Math.random() * tasks.length)],
        description: 'Implement a useful feature'
      };
    },
    creative: () => {
      const genres = ['fantasy', 'sci-fi', 'mystery', 'romance', 'adventure'];
      const formats = ['story', 'poem', 'dialogue', 'monologue'];

      return {
        genre: genres[Math.floor(Math.random() * genres.length)],
        format: formats[Math.floor(Math.random() * formats.length)],
        theme: 'An unexpected journey'
      };
    }
  };

  const options = randomOptions[randomCategory]();
  return {
    category: randomCategory,
    ...generatePrompt(randomCategory, options)
  };
};