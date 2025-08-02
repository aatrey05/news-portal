const express = require('express');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const cors = require('cors');
const app = express();

const NEWS_API_KEY = '4a8ed10b846a425687683bee33acdcfd';

app.use(cors());

// Helper function to get date string for 30 days ago (format: YYYY-MM-DD)
function getDate30DaysAgo() {
  const d = new Date();
  d.setDate(d.getDate() - 30);
  return d.toISOString().split('T')[0];
}

app.get('/api/news', async (req, res) => {
  try {
    const fromDate = getDate30DaysAgo();
    // Fetch all news articles from last 30 days, sorted by relevancy/popularity
    //const url = `https://newsapi.org/v2/everything?q=news&from=${fromDate}&sortBy=popularity&apiKey=${NEWS_API_KEY}`;
    const url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${NEWS_API_KEY}`;

    const response = await fetch(url);
    const data = await response.json();

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch news', details: err.message });
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
