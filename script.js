const emojiButtons = document.querySelectorAll('.emoji');
const moodText = document.getElementById('selectedMoodText');
const noteInput = document.getElementById('note');

let selectedMood = 6;  // Default to Neutral (6)

emojiButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    emojiButtons.forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
    selectedMood = parseInt(btn.dataset.mood);
    moodText.textContent = `Selected mood: ${btn.textContent} (${selectedMood})`;
  });
});

function saveEntry() {
  const note = noteInput.value;
  const date = new Date().toISOString().split('T')[0];

  const entry = { date, mood: selectedMood, note };

  let logs = JSON.parse(localStorage.getItem('mindmate_logs')) || [];
  logs.push(entry);
  localStorage.setItem('mindmate_logs', JSON.stringify(logs));

  alert("Mood & journal saved!");
  noteInput.value = "";
}
