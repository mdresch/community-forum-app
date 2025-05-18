"use client";

import React from "react";
import Link from "next/link"
import { useTrendingThreads } from "@/hooks/useForumData"
import { formatDistanceToNow } from "date-fns"

// Fallback threads for when API fails or is loading
const fallbackThreads = [
  {
    _id: "1",
    title: "Welcome to our community forum!",
    slug: "welcome-to-our-community-forum",
    author: {
      _id: "1",
      username: "admin",
    },
    category: "general", // Add category property to match Thread interface
    createdAt: new Date().toISOString(),
    lastActivity: new Date().toISOString(),
    viewCount: 120,
    replyCount: 8,
  },
  {
    _id: "2",
    title: "Introduce yourself here",
    slug: "introduce-yourself-here",
    author: {
      _id: "2",
      username: "moderator",
    },
    category: "introductions", // Add category property to match Thread interface
    createdAt: new Date().toISOString(),
    lastActivity: new Date().toISOString(),
    viewCount: 85,
    replyCount: 42,
  },
]

export function TrendingThreads({ limit = 5 }: { limit?: number } = {}) {
  const { threads, isLoading, error } = useTrendingThreads(limit);
  
  // Use fallback data if loading or error occurred
  const displayThreads = isLoading || error ? fallbackThreads : threads;
  
  if (error) {
    console.error('Error loading trending threads:', error);
  }
  
  return (
    <div className="space-y-4">
      {isLoading && (
        <div className="animate-pulse space-y-3">
          {[...Array(limit)].map((_, i) => (
            <div key={i} className="rounded-md border p-3">
              <div className="h-4 w-3/4 bg-muted rounded"></div>
              <div className="mt-2 flex items-center justify-between">
                <div className="h-3 w-1/3 bg-muted rounded"></div>
                <div className="h-3 w-16 bg-muted rounded"></div>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {!isLoading && displayThreads.length === 0 && (
        <div className="text-sm text-muted-foreground text-center py-3">
          No trending discussions found.
        </div>
      )}
      
      {displayThreads.map((thread) => (
        <Link
          key={thread._id}
          href={`/forums/${typeof thread.category === 'object' && thread.category !== null ? (thread.category as any).slug : 'general'}/${thread.slug}`}
          className="block rounded-md border p-3 hover:bg-muted transition-colors"
        >
          <h3 className="font-medium truncate">{thread.title}</h3>
          <div className="mt-1 flex items-center justify-between text-xs text-muted-foreground">
            <span>
              by {thread.author.username}, {formatDistanceToNow(new Date(thread.lastActivity), { addSuffix: true })}
            </span>
            <span>{thread.replyCount} {thread.replyCount === 1 ? 'reply' : 'replies'}</span>
          </div>
        </Link>
      ))}
    </div>
  )
}