import React from "react";

export interface ArticleProps {
  article: {
    id: string;
    url: string;
    title: string;
    description?: string;
    urlToImage?: string;
    publishedAt: string;
    source: {
      id: string | null;
      name: string;
    };
    author?: string;
  };
}

export default function ArticleCard({ article }: ArticleProps) {
  return (
    <div className="card bg-base-100 shadow-lg rounded-lg overflow-hidden">
      {article.urlToImage && (
        <img
          src={article.urlToImage}
          alt={article.title}
          className="w-full h-48 object-cover"
        />
      )}
      <div className="card-body p-4">
        <h2 className="card-title">
          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            {article.title}
          </a>
        </h2>
        <p className="text-gray-700 mt-2">{article.description}</p>
        <div className="mt-4 flex justify-between text-xs text-gray-500">
          <span>{article.source.name}</span>
          <span>
            {new Date(article.publishedAt).toLocaleDateString(undefined, {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </span>
        </div>
      </div>
    </div>
  );
}
