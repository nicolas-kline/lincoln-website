const ideas = [
  'A support copilot that auto-drafts ticket replies with your company voice.',
  'An AI scheduler that balances team calendars and meeting priorities.',
  'A product insight bot that scans reviews and suggests top roadmap features.',
  'A sales assistant that turns call transcripts into follow-up plans instantly.'
];

const appConfig = window.NOVA_CONFIG || {};
const CONFIG_MODEL_FALLBACK = appConfig.openaiModel || 'gpt-4.1-mini';
const CONFIG_API_KEY_FALLBACK = appConfig.openaiApiKey || '';

const knowledgeBase = [
  {
    match: ['price', 'pricing', 'cost', 'plan', 'plans'],
    answer:
      'NovaAI has a Free plan for 1 workspace, a Pro plan at $29/user/month, and Enterprise custom pricing. Connect your OpenAI key for personalized answers.'
  },
  {
    match: ['deploy', 'deployment', 'github pages', 'publish', 'host'],
    answer:
      'To deploy this project automatically, use GitHub Pages with the included workflow: push to main, then check Actions > Deploy test site to GitHub Pages.'
  },
  {
    match: ['setup', 'install', 'start', 'run locally', 'localhost'],
    answer:
      'Quick setup: open index.html directly, or run `python3 -m http.server 8000` and visit http://localhost:8000.'
  },
  {
    match: ['feature', 'features', 'what can it do', 'capability'],
    answer:
      'NovaAI supports conversational assistants, workflow automation, and real-time insights from your team knowledge.'
  }
];

function getFallbackAnswer(question) {
  const normalizedQuestion = question.toLowerCase();
  const match = knowledgeBase.find((entry) =>
    entry.match.some((keyword) => normalizedQuestion.includes(keyword))
  );

  if (match) return match.answer;

  return "I don't have enough local context for that yet. Add your OpenAI API key above for high-quality answers.";
}

function extractOutputText(data) {
  if (typeof data.output_text === 'string' && data.output_text.trim()) {
    return data.output_text.trim();
  }

  if (!Array.isArray(data.output)) {
    return '';
  }

  const chunks = [];

  for (const item of data.output) {
    if (!Array.isArray(item.content)) continue;

    for (const part of item.content) {
      if (typeof part.text === 'string' && part.text.trim()) {
        chunks.push(part.text.trim());
      }
    }
  }

  return chunks.join('\n').trim();
}

async function getOpenAIAnswer(question, apiKey, model) {
  const response = await fetch('https://api.openai.com/v1/responses', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model,
      input: [
        {
          role: 'system',
          content:
            'You are NovaAI, a concise and helpful assistant for a website demo. If you are unsure, say so clearly and ask a clarifying question.'
        },
        {
          role: 'user',
          content: question
        }
      ]
    })
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`OpenAI API error ${response.status}: ${errorText}`);
  }

  const data = await response.json();
  const text = extractOutputText(data);

  if (!text) {
    throw new Error('The model returned an empty response. Try asking again or switch models.');
  }

  return text;
}

const ideaOutput = document.getElementById('ideaOutput');
const ideaBtn = document.getElementById('ideaBtn');
const demoBtn = document.getElementById('demoBtn');
const startFreeBtn = document.getElementById('startFreeBtn');
const chatSection = document.getElementById('chatbot');
const chatForm = document.getElementById('chatForm');
const chatInput = document.getElementById('chatInput');
const chatWindow = document.getElementById('chatWindow');
const apiKeyInput = document.getElementById('apiKeyInput');
const modelInput = document.getElementById('modelInput');
const saveApiBtn = document.getElementById('saveApiBtn');
const configStatus = document.getElementById('configStatus');
const year = document.getElementById('year');

function appendMessage(text, role) {
  const bubble = document.createElement('p');
  bubble.className = role;
  bubble.textContent = text;
  chatWindow.appendChild(bubble);
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

function readStoredConfig() {
  const storedApiKey = localStorage.getItem('openai_api_key');
  const storedModel = localStorage.getItem('openai_model');

  return {
    apiKey: storedApiKey !== null ? storedApiKey : CONFIG_API_KEY_FALLBACK,
    model: storedModel || CONFIG_MODEL_FALLBACK
  };
}

function updateStatus(apiKey) {
  configStatus.textContent = apiKey
    ? 'OpenAI key available. Chat uses live OpenAI responses.'
    : 'Key not set. Chat uses local fallback answers.';
}

const initialConfig = readStoredConfig();
apiKeyInput.value = initialConfig.apiKey;
modelInput.value = initialConfig.model;
updateStatus(initialConfig.apiKey);

saveApiBtn.addEventListener('click', () => {
  const apiKey = apiKeyInput.value.trim();
  const model = modelInput.value.trim() || CONFIG_MODEL_FALLBACK;

  localStorage.setItem('openai_api_key', apiKey);
  localStorage.setItem('openai_model', model);

  updateStatus(apiKey);
  appendMessage(apiKey ? 'OpenAI key saved. Ask me anything.' : 'OpenAI key removed. Using fallback answers.', 'bot');
});

ideaBtn.addEventListener('click', () => {
  const randomIdea = ideas[Math.floor(Math.random() * ideas.length)];
  ideaOutput.textContent = randomIdea;
});

demoBtn.addEventListener('click', () => {
  document.getElementById('features').scrollIntoView({ behavior: 'smooth' });
});

startFreeBtn.addEventListener('click', () => {
  chatSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  setTimeout(() => chatInput.focus(), 350);
});

chatForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const userMessage = chatInput.value.trim();
  if (!userMessage) return;

  appendMessage(userMessage, 'user');
  chatInput.value = '';

  const { apiKey, model } = readStoredConfig();

  if (!apiKey) {
    appendMessage(getFallbackAnswer(userMessage), 'bot');
    return;
  }

  appendMessage('Thinking…', 'bot loading');
  const loadingBubble = chatWindow.lastElementChild;

  try {
    const answer = await getOpenAIAnswer(userMessage, apiKey, model);
    loadingBubble.textContent = answer;
    loadingBubble.className = 'bot';
  } catch (error) {
    loadingBubble.textContent = `I couldn't reach OpenAI. ${error.message}`;
    loadingBubble.className = 'bot';
  }

  chatWindow.scrollTop = chatWindow.scrollHeight;
});

year.textContent = new Date().getFullYear();
