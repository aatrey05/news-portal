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


// Define a type matching your news article structure
export interface NewsAPIArticle {
  id: string;               // Add this line
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

export async function fetchPersonalizedNews(): Promise<NewsAPIArticle[]> {
  const response = await fetch("http://localhost:3001/api/news");
  const data = await response.json();

  if (data.status !== "ok" || !Array.isArray(data.articles)) {
    throw new Error(data.message || "Failed to fetch news or invalid response");
  }

  // Map and add 'id' based on 'url' or fallback to index string
  return data.articles.map((article: Omit<NewsAPIArticle, 'id'>, index: number) => ({
    ...article,
    id: article.url || index.toString(),   // Inject id here
  }));
}

