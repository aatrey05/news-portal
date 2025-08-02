// If using Node.js v18+ with ESM support, rename file to .mjs and use top-level await instead.

const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args)); // Polyfill for CommonJS

const NEWS_API_KEY = 'cca2f369fc444f208318abf928a5f9db'; // Your API key
const url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${NEWS_API_KEY}`;



(async () => {
  try {
    const response = await fetch(url);
    const data = await response.json();

    console.log('Raw API data:', JSON.stringify(data, null, 2));

    if (Array.isArray(data.articles)) {
      data.articles.slice(0, 3).forEach((article, i) => {
        console.log(`Article ${i + 1}: ${article.title}`);
      });
    } else {
      console.log('No articles field found!');
    }
  } catch (err) {
    console.error('API fetch error:', err);
  }
})();
