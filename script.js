const ideas = [
  'A support copilot that auto-drafts ticket replies with your company voice.',
  'An AI scheduler that balances team calendars and meeting priorities.',
  'A product insight bot that scans reviews and suggests top roadmap features.',
  'A sales assistant that turns call transcripts into follow-up plans instantly.'
];

const knowledgeBase = [
  {
    match: ['price', 'pricing', 'cost', 'plan', 'plans'],
    answer:
      'NovaAI has a Free plan for 1 workspace, a Pro plan at $29/user/month, and Enterprise custom pricing. If you share team size, I can suggest the best plan.'
  },
  {
    match: ['deploy', 'deployment', 'github pages', 'publish', 'host'],
    answer:
      'To deploy this project automatically, use GitHub Pages with the included workflow: push to main, then check Actions > Deploy test site to GitHub Pages.'
  },
  {
    match: ['chatbot', 'bot', 'assistant', 'chat'],
    answer:
      'This demo chatbot uses in-browser logic. For real AI answers, connect the form to an LLM API (OpenAI/Anthropic) and pass your site context as system instructions.'
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

function getChatbotAnswer(question) {
  const normalizedQuestion = question.toLowerCase();

  const match = knowledgeBase.find((entry) =>
    entry.match.some((keyword) => normalizedQuestion.includes(keyword))
  );

  if (match) {
    return match.answer;
  }

  return "I don't have enough context to answer that accurately yet. Ask about pricing, deployment, setup, chatbot, or features.";
}

const ideaOutput = document.getElementById('ideaOutput');
const ideaBtn = document.getElementById('ideaBtn');
const demoBtn = document.getElementById('demoBtn');
const startFreeBtn = document.getElementById('startFreeBtn');
const chatSection = document.getElementById('chatbot');
const chatForm = document.getElementById('chatForm');
const chatInput = document.getElementById('chatInput');
const chatWindow = document.getElementById('chatWindow');
const year = document.getElementById('year');

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

chatForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const userMessage = chatInput.value.trim();

  if (!userMessage) return;

  const userBubble = document.createElement('p');
  userBubble.className = 'user';
  userBubble.textContent = userMessage;
  chatWindow.appendChild(userBubble);

  const botBubble = document.createElement('p');
  botBubble.className = 'bot';
  botBubble.textContent = getChatbotAnswer(userMessage);
  chatWindow.appendChild(botBubble);

  chatInput.value = '';
  chatWindow.scrollTop = chatWindow.scrollHeight;
});

year.textContent = new Date().getFullYear();
