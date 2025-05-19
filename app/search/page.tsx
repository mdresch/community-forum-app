"use client";
import React, { useState } from "react";
import Link from "next/link";

interface Thread {
  _id: string;
  title: string;
  slug: string;
  author: {
    username: string;
    avatar?: string;
  };
  category: string | { name: string; slug: string };
  createdAt: string;
  lastActivity: string;
  viewCount: number;
  replyCount: number;
}

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Thread[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searched, setSearched] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSearched(true);
    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
      if (!res.ok) {
        throw new Error("Failed to fetch search results");
      }
      const data = await res.json();
      setResults(data.threads || []);
    } catch (err: any) {
      setError(err.message || "Unknown error");
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="max-w-2xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6">Search</h1>
      <form className="mb-8" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search threads, posts, or members..."
          className="w-full border rounded px-4 py-2 focus:outline-none focus:ring"
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
        <button
          type="submit"
          className="mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          disabled={loading || !query.trim()}
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </form>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      {searched && !loading && results.length === 0 && !error && (
        <div className="text-gray-500">No results found.</div>
      )}
      {results.length > 0 && (
        <div className="space-y-4">
          {results.map(thread => (
            <div key={thread._id} className="border rounded p-4 hover:bg-gray-50">
              <Link href={`/forums/${typeof thread.category === 'object' && thread.category !== null ? (thread.category as any).slug : 'general'}/${thread.slug}`} className="text-lg font-semibold hover:underline">
                {thread.title}
              </Link>
              <div className="text-sm text-gray-500 mt-1">
                by {thread.author.username} • {new Date(thread.createdAt).toLocaleDateString()} • {thread.replyCount} replies
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
