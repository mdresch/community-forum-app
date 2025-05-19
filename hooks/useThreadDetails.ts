"use client";

import { useState, useEffect } from 'react';
import { apiRequest } from '@/lib/api';
import { Thread, Post } from '@/hooks/useForumData';

interface ThreadDetails extends Thread {
  content: string;
  tags: string[];
  isLocked?: boolean;
  author: {
    _id: string;
    username: string;
    avatar?: string;
    bio?: string;
    joinDate: string;
  }
}

interface PostDetails extends Post {
  author: {
    _id: string;
    username: string;
    avatar?: string;
    joinDate: string;
  }
}

interface UseThreadDetailsResult {
  thread: ThreadDetails | null;
  posts: PostDetails[];
  isLoading: boolean;
  error: Error | null;
  refetch: () => Promise<void>; // Add refetch function to the result interface
}

export function useThreadDetails(slug: string): UseThreadDetailsResult {
  const [thread, setThread] = useState<ThreadDetails | null>(null);
  const [posts, setPosts] = useState<PostDetails[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  async function fetchThreadDetails() { // Make this function accessible outside useEffect
    try {
      setIsLoading(true);

      // Fetch thread by slug
      const threadData = await apiRequest<ThreadDetails>(`threads/by-slug/${slug}`);
      setThread(threadData);

      // Fetch posts for the thread
      const postsData = await apiRequest<PostDetails[]>(`posts?thread=${threadData._id}`);
      setPosts(postsData);

      setError(null);
    } catch (err: any) {
      console.error('Error fetching thread details:', err);
      setError(err instanceof Error ? err : new Error('Failed to fetch thread details'));
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (slug) {
      fetchThreadDetails();
    }
  }, [slug]);

  return { thread, posts, isLoading, error, refetch: fetchThreadDetails }; // Return fetchThreadDetails as refetch
}

// Fallback data for when API fails or during development
export const getFallbackThreadData = (): ThreadDetails => {
  return {
    _id: '1',
    title: "Best practices for React in 2025",
    slug: "best-practices-for-react-in-2025",
    content: `
      <p>I've been working with React for a few years now and wanted to share some best practices I've learned along the way.</p>
      
      <h3>1. Use Functional Components with Hooks</h3>
      <p>Class components are mostly obsolete now. Functional components with hooks are more concise and easier to understand.</p>
      
      <h3>2. Implement Code Splitting</h3>
      <p>Use React.lazy() and Suspense to split your code and improve loading times.</p>
      
      <h3>3. State Management</h3>
      <p>For simpler apps, Context API and useReducer can be sufficient. For complex state, consider libraries like Redux Toolkit or Zustand.</p>
      
      <h3>4. Performance Optimization</h3>
      <p>Use React.memo, useMemo, and useCallback to prevent unnecessary re-renders.</p>
      
      <p>What are your thoughts? Any other best practices you'd recommend?</p>
    `,
    author: {
      _id: '1',
      username: "janesmith",
      avatar: "/placeholder.svg?height=40&width=40",
      joinDate: new Date(2022, 5, 15).toISOString(),
    },
    category: "development",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(),
    lastActivity: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
    tags: ["react", "frontend", "best-practices"],
    viewCount: 876,
    replyCount: 3,
    isLocked: false
  } as ThreadDetails;
};

export const getFallbackPosts = () => {
  return [
    {
      _id: '1',
      content: `
        <p>Great post! I'd add that using TypeScript has become almost standard for React projects now. The type safety and improved developer experience are invaluable.</p>
        <p>Also, for styling, I've found that Tailwind CSS or styled-components are excellent choices depending on the project requirements.</p>
      `,
      author: {
        _id: '2',
        username: "alexj",
        avatar: "/placeholder.svg?height=40&width=40",
        joinDate: new Date(2023, 2, 10).toISOString(),
      },
      thread: '1',
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2 - 1000 * 60 * 30).toISOString(),
      updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2 - 1000 * 60 * 30).toISOString(),
      likes: ['2', '3'],
      isEdited: false,
    },
    {
      _id: '2',
      content: `
        <p>I completely agree with your points, especially about functional components and hooks. They've made my code so much cleaner.</p>
        <p>One thing I'd add is the importance of writing good tests. React Testing Library has been a game-changer for me in writing meaningful tests that focus on user behavior rather than implementation details.</p>
      `,
      author: {
        _id: '3',
        username: "sarahc",
        avatar: "/placeholder.svg?height=40&width=40",
        joinDate: new Date(2021, 8, 5).toISOString(),
      },
      thread: '1',
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 - 1000 * 60 * 45).toISOString(),
      updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 - 1000 * 60 * 45).toISOString(),
      likes: ['1'],
      isEdited: false,
    },
  ] as PostDetails[];
};
