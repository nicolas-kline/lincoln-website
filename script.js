const ideas = [
  'A support copilot that auto-drafts ticket replies with your company voice.',
  'An AI scheduler that balances team calendars and meeting priorities.',
  'A product insight bot that scans reviews and suggests top roadmap features.',
  'A sales assistant that turns call transcripts into follow-up plans instantly.'
];

const chatbotReplies = [
  'Great question! NovaAI can launch a team chatbot in minutes.',
  'You can start with a free trial and upgrade when your team is ready.',
  'NovaAI connects with your docs so answers stay accurate.',
  'Try asking: "How do I automate support tickets?"'
];

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
  botBubble.textContent = chatbotReplies[Math.floor(Math.random() * chatbotReplies.length)];
  chatWindow.appendChild(botBubble);

  chatInput.value = '';
  chatWindow.scrollTop = chatWindow.scrollHeight;
});

year.textContent = new Date().getFullYear();
