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


import { useEffect, useState } from "react";
import { fetchPersonalizedNews } from "../api/news";
import ArticleCard from "../components/ArticleCard";
import type { NewsAPIArticle } from "../api/news";

export default function Feed() {
  const [articles, setArticles] = useState<NewsAPIArticle[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPersonalizedNews()
      .then((data) => {
        setArticles(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="p-8 text-center">Loading articles...</div>;
  if (error) return <div className="p-8 text-center text-red-500">Error: {error}</div>;

  return (
    <main className="p-8 space-y-6">
      <h1 className="text-3xl font-bold mb-6">Your Personalized News Feed</h1>
      <div className="grid gap-6">
        {articles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </main>
  );
}
