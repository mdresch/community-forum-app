// app/forums/new-thread/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/useAuth";
import { useCategories } from "@/hooks/useForumData";
import { useRefreshToken } from "@/hooks/useRefreshToken";

export default function NewThreadPage() {
  const router = useRouter();
  const { user } = useAuth();
  const { categories: categoryOptions, isLoading: categoriesLoading } = useCategories();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [category, setCategory] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const { refreshTokenLoading, refreshTokenError } = useRefreshToken();

  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const handleRemoveTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      // Pre-flight: check session validity
      const token = localStorage.getItem('auth_token');
      if (!token) {
        setError('Authentication token not found. Please log in again.');
        setLoading(false);
        router.push('/auth/login');
        return;
      }

      // TODO: Implement proper session validation here. Replace the commented out code with the correct endpoint.
      // If session is invalid, set error, loading to false, remove auth_token and user from localStorage, and redirect to /auth/login

      // Proceed to post thread
      const res = await fetch(`/api/threads`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          title,
          content,
          tags,
          category,
        }),
      });
      if (!res.ok) {
        const data = await res.json();
        console.error("Error response from /api/threads:", data); // Log the error response
        if (res.status === 401) {
          setError('Session expired or invalid. Please log in again.');
          localStorage.removeItem('auth_token');
          localStorage.removeItem('user');
          router.push('/auth/login');
        } else if (res.status === 403) {
          setError('You do not have permission to create a thread.');
        }
        else {
          setError(data.message || 'Failed to create thread');
        }
        setLoading(false);
        return;
      }
      const data = await res.json();
      router.push(`/forums/${category}/${data.slug}`);
    } catch (err: any) {
      console.error("Error during thread creation:", err); // Log the error
      setError('An error occurred. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-6 max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle>Create New Thread</CardTitle>
          {category && !categoriesLoading && (
            <div className="mt-2 text-sm text-muted-foreground">
              Posting in: <span className="font-semibold">{categoryOptions.find(cat => cat.slug === category)?.name || category}</span>
            </div>
          )}
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              placeholder="Thread title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              maxLength={100}
            />
            <Textarea
              placeholder="Write your post..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              rows={8}
              maxLength={2000}
            />
            <div>
              <label className="block mb-1 font-medium">Category</label>
              {categoriesLoading ? (
                <div className="text-muted-foreground text-sm">Loading categories...</div>
              ) : (
                <select
                  className="w-full border rounded-md px-3 py-2 bg-background text-base md:text-sm"
                  value={category}
                  onChange={e => setCategory(e.target.value)}
                  required
                >
                  <option value="" disabled>Select a category</option>
                  {categoryOptions.map(cat => (
                    <option key={cat._id} value={cat.slug}>{cat.name}</option>
                  ))}
                </select>
              )}
            </div>
            <div>
              <div className="flex gap-2 mb-2">
                {tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                    {tag}
                    <button type="button" onClick={() => handleRemoveTag(tag)} className="ml-1 text-xs">×</button>
                  </Badge>
                ))}
              </div>
              <div className="flex gap-2">
                <Input
                  placeholder="Add tag"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleAddTag();
                    }
                  }}
                  maxLength={20}
                />
                <Button type="button" onClick={handleAddTag} variant="outline">
                  Add Tag
                </Button>
              </div>
            </div>
            {error && <div className="text-red-500 text-sm">{error}</div>}
            <div className="flex gap-2 justify-end">
              <Button asChild variant="ghost" type="button">
                <Link href="/forums">Cancel</Link>
              </Button>
              <Button type="submit" disabled={loading || !category}>
                {loading ? "Posting..." : "Post Thread"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
