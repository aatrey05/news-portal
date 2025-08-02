// export async function fetchPersonalizedNews() {
//   const apiKey = 'cca2f369fc444f208318abf928a5f9db'; // Replace with your actual API key
//   const url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=${apiKey}`;

//   const response = await fetch(url);
//   const data = await response.json();

//   if (data.status !== 'ok') {
//     throw new Error(data.message || 'Failed to fetch news');
//   }

//   // Map and normalize articles for frontend consumption
//   return data.articles.map((article: any, index: number) => ({
//     id: article.url || index.toString(), // Use the URL as id if available, else index fallback
//     title: article.title,
//     summary: article.description || '',
//     url: article.url,
//     imageUrl: article.urlToImage || '',
//     publishedAt: article.publishedAt,
//     sourceName: article.source?.name || '',
//   }));
// }


// src/api/news.ts

// Define the structure of a news article matching your API response
export interface NewsAPIArticle {
  id: string;              // Injected ID (from URL or fallback)
  url: string;
  title: string;
  description?: string;
  publishedAt: string;
  urlToImage?: string;
  source: {
    id: string | null;
    name: string;
  };
  author?: string;
}

// Optionally, define the API response shape for better typings
interface NewsAPIResponse {
  status: string;
  totalResults: number;
  articles: Omit<NewsAPIArticle, 'id'>[]; // Articles without the injected id
  message?: string;
}

/**
 * Fetch personalized news articles with pagination support.
 * Modify the URL if you add pagination parameters on backend.
 */
export async function fetchPersonalizedNews(
  page = 1,
  pageSize = 10
): Promise<{ articles: NewsAPIArticle[]; totalResults: number }> {
  const url = `http://localhost:3001/api/news?page=${page}&pageSize=${pageSize}`;

  const response = await fetch(url);
  const data: NewsAPIResponse = await response.json();

  if (data.status !== "ok" || !Array.isArray(data.articles)) {
    throw new Error(data.message || "Failed to fetch news or invalid response");
  }

  const articles = data.articles.map((article, index) => ({
    ...article,
    id: article.url || index.toString(),
  }));

  return { articles, totalResults: data.totalResults };
}


