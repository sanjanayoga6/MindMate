const logs = JSON.parse(localStorage.getItem('mindmate_logs')) || [];
const journalEntries = document.getElementById('journalEntries');

// Display recent mood and journal entries
logs.forEach(entry => {
  const entryDiv = document.createElement('div');
  entryDiv.classList.add('journal-entry');
  entryDiv.innerHTML = `
    <p><strong>${entry.date}</strong></p>
    <p>Mood: ${getEmojiForMood(entry.mood)}</p>
    <p><strong>Journal:</strong> ${entry.note}</p>
    <hr />
  `;
  journalEntries.appendChild(entryDiv);
});

// Helper function to get emoji based on mood score
function getEmojiForMood(mood) {
  if (mood >= 8) return '😄';
  if (mood >= 6) return '🙂';
  if (mood >= 4) return '😐';
  if (mood >= 2) return '😟';
  return '😢';
}

// Prepare data for the mood graph
const labels = logs.map(entry => entry.date);
const data = logs.map(entry => entry.mood);

// Create the chart
const ctx = document.getElementById('moodChart').getContext('2d');
const moodChart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: labels, // Dates of mood entries
    datasets: [{
      label: 'Mood Trend',
      data: data, // Mood scores
      borderColor: 'rgba(0, 123, 255, 0.6)',
      backgroundColor: 'rgba(0, 123, 255, 0.2)',
      borderWidth: 2,
      fill: true,
    }]
  },
  options: {
    responsive: true,
    scales: {
      x: {
        title: {
          display: true,
          text: 'Date'
        }
      },
      y: {
        title: {
          display: true,
          text: 'Mood Score'
        },
        min: 0,
        max: 10,
      }
    }
  }
});
