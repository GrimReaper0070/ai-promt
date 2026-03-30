export const categories = [
  {
    id: 'image',
    name: 'Image Generation',
    icon: '🖼️',
    description: 'Create prompts for AI image generators'
  },
  {
    id: 'text',
    name: 'Text/Chat',
    icon: '💬',
    description: 'Generate prompts for text-based AI'
  },
  {
    id: 'code',
    name: 'Code Generation',
    icon: '💻',
    description: 'Create prompts for coding assistants'
  },
  {
    id: 'creative',
    name: 'Creative Writing',
    icon: '✍️',
    description: 'Generate prompts for creative content'
  },
  {
    id: 'ai-generated',
    name: 'AI-Generated',
    icon: '🤖',
    description: 'Let AI create prompts from your description'
  }
];

export const imageStyles = [
  { id: 'realistic', name: 'Realistic', description: 'Photorealistic imagery' },
  { id: 'artistic', name: 'Artistic', description: 'Painterly, artistic style' },
  { id: 'anime', name: 'Anime', description: 'Japanese animation style' },
  { id: 'cartoon', name: 'Cartoon', description: 'Animated cartoon style' },
  { id: '3d', name: '3D Render', description: '3D rendered graphics' },
  { id: 'watercolor', name: 'Watercolor', description: 'Soft watercolor painting' },
  { id: 'oil-painting', name: 'Oil Painting', description: 'Classic oil painting' },
  { id: 'sketch', name: 'Sketch', description: 'Pencil or ink sketch' },
  { id: 'digital-art', name: 'Digital Art', description: 'Modern digital artwork' },
  { id: 'pixel-art', name: 'Pixel Art', description: 'Retro pixel graphics' }
];

export const moods = [
  { id: 'happy', name: 'Happy', emoji: '😊' },
  { id: 'sad', name: 'Sad', emoji: '😢' },
  { id: 'mysterious', name: 'Mysterious', emoji: '🔮' },
  { id: 'dramatic', name: 'Dramatic', emoji: '🎭' },
  { id: 'peaceful', name: 'Peaceful', emoji: '🕊️' },
  { id: 'energetic', name: 'Energetic', emoji: '⚡' },
  { id: 'romantic', name: 'Romantic', emoji: '💕' },
  { id: 'dark', name: 'Dark', emoji: '🌑' },
  { id: 'whimsical', name: 'Whimsical', emoji: '🎪' },
  { id: 'epic', name: 'Epic', emoji: '⚔️' }
];

export const lightingOptions = [
  { id: 'natural', name: 'Natural Light' },
  { id: 'golden-hour', name: 'Golden Hour' },
  { id: 'studio', name: 'Studio Lighting' },
  { id: 'dramatic', name: 'Dramatic Lighting' },
  { id: 'soft', name: 'Soft Light' },
  { id: 'neon', name: 'Neon Lights' },
  { id: 'candlelight', name: 'Candlelight' },
  { id: 'moonlight', name: 'Moonlight' },
  { id: 'backlit', name: 'Backlit' },
  { id: 'rim-light', name: 'Rim Light' }
];

export const detailLevels = [
  { id: 'minimal', name: 'Minimal', description: 'Simple, clean' },
  { id: 'basic', name: 'Basic', description: 'Standard details' },
  { id: 'detailed', name: 'Detailed', description: 'Rich details' },
  { id: 'ultra', name: 'Ultra Detailed', description: 'Maximum detail' }
];

export const textTones = [
  { id: 'professional', name: 'Professional' },
  { id: 'casual', name: 'Casual' },
  { id: 'formal', name: 'Formal' },
  { id: 'friendly', name: 'Friendly' },
  { id: 'authoritative', name: 'Authoritative' },
  { id: 'persuasive', name: 'Persuasive' },
  { id: 'informative', name: 'Informative' },
  { id: 'enthusiastic', name: 'Enthusiastic' }
];

export const codeLanguages = [
  { id: 'javascript', name: 'JavaScript' },
  { id: 'python', name: 'Python' },
  { id: 'typescript', name: 'TypeScript' },
  { id: 'java', name: 'Java' },
  { id: 'csharp', name: 'C#' },
  { id: 'cpp', name: 'C++' },
  { id: 'go', name: 'Go' },
  { id: 'rust', name: 'Rust' },
  { id: 'php', name: 'PHP' },
  { id: 'ruby', name: 'Ruby' },
  { id: 'swift', name: 'Swift' },
  { id: 'kotlin', name: 'Kotlin' }
];

export const codeTaskTypes = [
  { id: 'function', name: 'Write Function' },
  { id: 'class', name: 'Create Class' },
  { id: 'api', name: 'API Endpoint' },
  { id: 'component', name: 'UI Component' },
  { id: 'algorithm', name: 'Algorithm' },
  { id: 'debug', name: 'Debug Code' },
  { id: 'refactor', name: 'Refactor Code' },
  { id: 'test', name: 'Write Tests' },
  { id: 'documentation', name: 'Documentation' },
  { id: 'review', name: 'Code Review' }
];

export const writingGenres = [
  { id: 'fantasy', name: 'Fantasy' },
  { id: 'sci-fi', name: 'Science Fiction' },
  { id: 'romance', name: 'Romance' },
  { id: 'mystery', name: 'Mystery' },
  { id: 'horror', name: 'Horror' },
  { id: 'thriller', name: 'Thriller' },
  { id: 'adventure', name: 'Adventure' },
  { id: 'drama', name: 'Drama' },
  { id: 'comedy', name: 'Comedy' },
  { id: 'historical', name: 'Historical' }
];

export const writingFormats = [
  { id: 'story', name: 'Short Story' },
  { id: 'novel', name: 'Novel Chapter' },
  { id: 'poem', name: 'Poem' },
  { id: 'essay', name: 'Essay' },
  { id: 'dialogue', name: 'Dialogue' },
  { id: 'monologue', name: 'Monologue' },
  { id: 'script', name: 'Script' },
  { id: 'blog', name: 'Blog Post' },
  { id: 'email', name: 'Email' },
  { id: 'letter', name: 'Letter' }
];

export const subjects = [
  { id: 'portrait', name: 'Portrait' },
  { id: 'landscape', name: 'Landscape' },
  { id: 'cityscape', name: 'Cityscape' },
  { id: 'nature', name: 'Nature' },
  { id: 'animals', name: 'Animals' },
  { id: 'fantasy', name: 'Fantasy' },
  { id: 'sci-fi', name: 'Science Fiction' },
  { id: 'architecture', name: 'Architecture' },
  { id: 'food', name: 'Food' },
  { id: 'fashion', name: 'Fashion' },
  { id: 'abstract', name: 'Abstract' },
  { id: 'still-life', name: 'Still Life' }
];

export const negativePromptSuggestions = [
  'blurry',
  'low quality',
  'distorted',
  'ugly',
  'deformed',
  'bad anatomy',
  'bad proportions',
  'extra limbs',
  'missing fingers',
  'watermark',
  'text',
  'logo',
  'signature',
  'cropped',
  'out of frame',
  'worst quality',
  'low resolution'
];

export const targetPlatforms = [
  { id: 'midjourney', name: 'Midjourney', icon: '🎨' },
  { id: 'dalle', name: 'DALL-E', icon: '🖼️' },
  { id: 'stable-diffusion', name: 'Stable Diffusion', icon: '⚡' },
  { id: 'chatgpt', name: 'ChatGPT', icon: '💬' },
  { id: 'claude', name: 'Claude', icon: '🤖' },
  { id: 'general', name: 'General (Any AI)', icon: '✨' }
];
