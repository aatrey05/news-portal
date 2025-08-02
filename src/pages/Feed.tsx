// import ArticleCard from "../components/ArticleCard";
// import { useState, useEffect } from "react";

// type Article = {
//   id: string;
//   title: string;
//   summary: string;
//   publishedAt?: string;
// };

// // Mock data
// const mockArticles: Article[] = [
//   {
//     id: "1",
//     title: "AI Revolutionizes Healthcare",
//     summary:
//       "New AI models are demonstrating extraordinary accuracy in medical diagnosis.",
//     publishedAt: "2025-07-29",
//   },
//   {
//     id: "2",
//     title: "Climate Change Agreements Updated",
//     summary: "Global leaders update policies to reflect new climate targets.",
//     publishedAt: "2025-07-30",
//   },
//   {
//     id: "3",
//     title: "Quantum Computing Breakthrough",
//     summary: "Scientists create scalable quantum memory devices.",
//     publishedAt: "2025-08-01",
//   },
// ];

// export default function Feed() {
//   const [articles, setArticles] = useState<Article[]>([]);

//   // Mimic fetching data from backend
//   useEffect(() => {
//     // Simulate async call
//     setTimeout(() => setArticles(mockArticles), 500);
//   }, []);

//   if (articles.length === 0) {
//     return <div className="p-8 text-center">Loading articles...</div>;
//   }

//   return (
//     <main className="p-8 space-y-4">
//       <h1 className="text-2xl font-bold mb-4">Your Personalized News Feed</h1>
//       <div className="grid gap-4">
//         {articles.map((article) => (
//           <ArticleCard key={article.id} article={article} />
//         ))}
//       </div>
//     </main>
//   );
// }


// src/pages/Feed.tsx

import { useEffect, useState } from "react";
import { fetchPersonalizedNews } from "../api/news";
import type { NewsAPIArticle } from "../api/news";
import ArticleCard from "../components/ArticleCard";

const PAGE_SIZE = 10;

export default function Feed() {
  const [articles, setArticles] = useState<NewsAPIArticle[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load first page on component mount
  useEffect(() => {
    loadArticles(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function loadArticles(page: number) {
    setLoading(true);
    setError(null);
    try {
      const { articles: newArticles, totalResults } = await fetchPersonalizedNews(page, PAGE_SIZE);
      if (page === 1) {
        setArticles(newArticles);
      } else {
        setArticles((prev) => [...prev, ...newArticles]);
      }
      setTotalResults(totalResults);
      setCurrentPage(page);
    } catch (err: any) {
      setError(err.message || "Error fetching articles");
    } finally {
      setLoading(false);
    }
  }

  function handleLoadMore() {
    loadArticles(currentPage + 1);
  }

  const hasMore = totalResults === null || articles.length < totalResults;

  if (loading && articles.length === 0) {
    return <div className="p-8 text-center">Loading articles...</div>;
  }

  if (error) {
    return <div className="p-8 text-center text-red-500">Error: {error}</div>;
  }

  return (
    <main className="p-8 space-y-6">
      <h1 className="text-3xl font-bold mb-6">Your Personalized News Feed</h1>

      <div className="grid gap-6">
        {articles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>

      {loading && articles.length > 0 && (
        <div className="text-center mt-4">Loading more articles...</div>
      )}

      {!loading && hasMore && (
        <div className="text-center mt-6">
          <button className="btn btn-primary" onClick={handleLoadMore}>
            Load More
          </button>
        </div>
      )}

      {!loading && !hasMore && (
        <div className="text-center mt-6 text-gray-600">No more articles to load.</div>
      )}
    </main>
  );
}
