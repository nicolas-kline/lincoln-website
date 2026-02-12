const ideas = [
  'A support copilot that auto-drafts ticket replies with your company voice.',
  'An AI scheduler that balances team calendars and meeting priorities.',
  'A product insight bot that scans reviews and suggests top roadmap features.',
  'A sales assistant that turns call transcripts into follow-up plans instantly.'
];

const ideaOutput = document.getElementById('ideaOutput');
const ideaBtn = document.getElementById('ideaBtn');
const demoBtn = document.getElementById('demoBtn');
const year = document.getElementById('year');

ideaBtn.addEventListener('click', () => {
  const randomIdea = ideas[Math.floor(Math.random() * ideas.length)];
  ideaOutput.textContent = randomIdea;
});

demoBtn.addEventListener('click', () => {
  document.getElementById('features').scrollIntoView({ behavior: 'smooth' });
});

year.textContent = new Date().getFullYear();
