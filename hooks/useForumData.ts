"use client";

import { useState, useEffect, ReactNode } from 'react';
import { categories, threads, posts } from '@/lib/api';

// Types for our forum data
export interface Category {
  threadCount: ReactNode;
  _id: string;
  name: string;
  description: string;
  slug: string;
  icon?: string;
}

export interface Thread {
  _id: string;
  title: string;
  slug: string;
  author: {
    _id: string;
    username: string;
    avatar?: string;
  };
  category: string | Category;
  createdAt: string;
  lastActivity: string;
  viewCount: number;
  replyCount: number;
}

export interface Post {
  _id: string;
  content: string;
  author: {
    _id: string;
    username: string;
    avatar?: string;
  };
  thread: string;
  createdAt: string;
  updatedAt: string;
  isEdited: boolean;
  likes: string[];
}

// Hook for fetching categories
export function useCategories() {
  const [data, setData] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const result = await categories.getAll() as Category[];
        setData(result);
        setError(null);
      } catch (err) {
        console.error('Error fetching categories:', err);
        setError(err instanceof Error ? err : new Error('Failed to fetch categories'));
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  return { categories: data, isLoading, error };
}

// Hook for fetching threads
export function useThreads(categoryId?: string) {
  const [data, setData] = useState<Thread[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const result = await threads.getAll(categoryId) as Thread[];
        setData(result);
        setError(null);
      } catch (err) {
        console.error('Error fetching threads:', err);
        setError(err instanceof Error ? err : new Error('Failed to fetch threads'));
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [categoryId]);

  return { threads: data, isLoading, error };
}

// Hook for fetching a single thread with its posts
export function useThread(threadId: string) {
  const [thread, setThread] = useState<Thread | null>(null);
  const [threadPosts, setThreadPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const [threadData, postsData] = await Promise.all([
          threads.getById(threadId) as Promise<Thread>,
          posts.getByThread(threadId) as Promise<Post[]>
        ]);
        setThread(threadData);
        setThreadPosts(postsData);
        setError(null);
      } catch (err) {
        console.error('Error fetching thread:', err);
        setError(err instanceof Error ? err : new Error('Failed to fetch thread'));
      } finally {
        setIsLoading(false);
      }
    }

    if (threadId) {
      fetchData();
    }
  }, [threadId]);

  return { thread, posts: threadPosts, isLoading, error };
}

// Hook for fetching trending threads
export function useTrendingThreads(limit: number = 5) {
  const [data, setData] = useState<Thread[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        // Use the dedicated trending threads endpoint
        const result = await threads.getTrending(limit) as Thread[];
        setData(result);
        setError(null);
      } catch (err) {
        console.error('Error fetching trending threads:', err);
        setError(err instanceof Error ? err : new Error('Failed to fetch trending threads'));
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [limit]);

  return { threads: data, isLoading, error };
}
