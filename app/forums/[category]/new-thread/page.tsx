"use client";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { threads } from "@/lib/api";
import { useAuth } from "@/hooks/useAuth";

export default function NewThreadPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const category = searchParams.get("category") || "";

  if (isLoading) return <div>Loading...</div>;
  if (!user) {
    return <div className="p-8 text-center">You must be signed in to post a new thread.</div>;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      await threads.create({
        title,
        content,
        category,
      });
      router.push(`/forums/${category}`);
    } catch (err: any) {
      setError(err?.message || "Failed to create thread");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-4">Create New Thread</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Title</label>
          <input
            className="w-full border rounded px-3 py-2"
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Content</label>
          <textarea
            className="w-full border rounded px-3 py-2 min-h-[120px]"
            value={content}
            onChange={e => setContent(e.target.value)}
            required
          />
        </div>
        {error && <div className="text-red-600">{error}</div>}
        <button
          type="submit"
          className="bg-primary text-white px-4 py-2 rounded disabled:opacity-50"
          disabled={submitting}
        >
          {submitting ? "Posting..." : "Post Thread"}
        </button>
      </form>
    </div>
  );
}
