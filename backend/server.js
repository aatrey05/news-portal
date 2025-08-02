// const express = require('express');
// const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
// const cors = require('cors');
// const app = express();

// const NEWS_API_KEY = '4a8ed10b846a425687683bee33acdcfd';

// app.use(cors());

// // Helper function to get date string for 30 days ago (format: YYYY-MM-DD)
// function getDate30DaysAgo() {
//   const d = new Date();
//   d.setDate(d.getDate() - 30);
//   return d.toISOString().split('T')[0];
// }



// backend/server.js

const express = require('express');
const cors = require('cors');

// Use node-fetch polyfill for fetch in Node < v18
// If you use Node v18+, you can omit this and use global fetch
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

// Your NewsAPI key (replace with your actual key)
const NEWS_API_KEY = '4a8ed10b846a425687683bee33acdcfd';

// Helper to get date 30 days ago in YYYY-MM-DD format
function getDate30DaysAgo() {
  const now = new Date();
  now.setDate(now.getDate() - 30);
  return now.toISOString().split('T')[0];
}

const app = express();
app.use(cors());

app.get('/api/news', async (req, res) => {
  try {
    // Default pagination values
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;
    const fromDate = getDate30DaysAgo();

    // Construct the NewsAPI URL with query, date range, sorting, paging
    const url = `https://newsapi.org/v2/everything?q=news&from=${fromDate}&sortBy=popularity` +
      `&apiKey=${NEWS_API_KEY}&page=${page}&pageSize=${pageSize}`;

    // Fetch data from NewsAPI
    const response = await fetch(url);
    const data = await response.json();

    // You can transform data here if needed, or send directly
    res.json(data);
  } catch (err) {
    console.error('Error fetching news:', err);
    res.status(500).json({ error: 'Failed to fetch news', details: err.message });
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
