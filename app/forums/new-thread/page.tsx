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
import { threads as threadsApi, ApiError } from "@/lib/api";

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

  // No longer needed with Clerk authentication

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
      // Check for user authentication
      if (!user) {
        setError('You must be logged in to create a thread.');
        setLoading(false);
        router.push('/auth/login');
        return;
      }
        console.log("Creating thread with user:", user);
      
      // For debugging: get the Clerk token directly to see if it's available
      try {
        const { getToken } = await import('@clerk/nextjs');
        const token = await getToken();
        console.log("Clerk token available:", !!token);
      } catch (e) {
        console.error("Error getting Clerk token:", e);
      }
        console.log("Submitting thread with category:", category, 
        categoryOptions?.find(cat => cat.slug === category));
      
      // Proceed to post thread using the API module
      const data = await threadsApi.create({
        title,
        content,
        tags,
        category, // This should be the category slug
      });
      
      console.log("Thread created successfully:", data);
      
      // If successful, navigate to the new thread
      router.push(`/forums/${category}/${data.slug}`);} catch (err: any) {
      console.error("Error during thread creation:", err); // Log the error
      
      // Extract more meaningful error message if available
      let errorMsg = 'An error occurred. Please try again.';
      if (err instanceof ApiError) {
        errorMsg = `Error ${err.status}: ${err.message}`;
        console.log("API error details:", err);
      } else if (err && err.message) {
        errorMsg = err.message;
      }
      
      setError(errorMsg);
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
