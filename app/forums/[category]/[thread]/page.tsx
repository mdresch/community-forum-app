"use client"

import React, { useState } from "react"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { ThumbsUp, MessageSquare, Flag, Share2, Bookmark, MoreHorizontal } from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import { useThreadDetails, getFallbackThreadData, getFallbackPosts } from "@/hooks/useThreadDetails"
import { useAuth } from "@/hooks/useAuth"
import { ThreadVoting } from "@/components/voting/thread-voting"
import { posts as apiPosts } from '@/lib/api'; // Import the posts API functions

// Loading skeleton component for thread content
const ThreadSkeleton = () => (
  <div className="space-y-4">
    <div className="flex items-start gap-4">
      <Skeleton className="h-10 w-10 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
    <div className="space-y-2">
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-3/4" />
    </div>
  </div>
)

export default function ThreadPage({ params }: { params: Promise<{ category: string; thread: string }> }) {
  const { category, thread: threadSlug } = React.use(params);
  const { thread: threadData, posts, isLoading, error, refetch } = useThreadDetails(threadSlug) // Get refetch from the hook
  const { user } = useAuth()
  const [newComment, setNewComment] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  
  // Use the real data or fallback data if loading or error occurred
  // Using non-null assertion for threadData since we always provide a fallback
  const thread = (isLoading || error || !threadData) ? getFallbackThreadData() : threadData
  const comments = isLoading || error ? getFallbackPosts() : posts

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!user) { // Add this check
      setSubmitError("You must be logged in to post a comment.");
      return;
    }

    if (!newComment.trim()) {
      setSubmitError("Comment cannot be empty.");
      return;
    }
    if (!threadData?._id) { // Use threadData._id for the thread ID
        setSubmitError("Thread ID is missing. Cannot post comment.");
        return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      await apiPosts.create({
        content: newComment,
        thread: threadData._id, // Use threadData._id
        // parentPost: parentId, // Add this if replying to a specific comment
      });
      setNewComment(''); // Clear the textarea
      refetch(); // Refetch comments after successful post
    } catch (err: any) { // Fix type error here
      console.error("Failed to post comment:", err);
      setSubmitError(err.message || 'Failed to post comment. Please ensure you are logged in and try again.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-4">
        <Link
          href={`/forums/${category}`}
          className="mb-2 inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-1 h-4 w-4"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
          Back to {category.replace(/-/g, " ")}
        </Link>
        {isLoading ? (
          <Skeleton className="h-10 w-3/4" />
        ) : (
          <>
            <h1 className="text-3xl font-bold tracking-tight">{thread.title}</h1>
            <div className="mt-2 flex flex-wrap gap-2">
              {thread.tags && thread.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs font-normal">
                  {tag}
                </Badge>
              ))}
            </div>
          </>
        )}
      </div>

      <div className="mb-8 grid gap-6">
        <Card>
          {isLoading ? (
            <CardContent className="p-6">
              <ThreadSkeleton />
            </CardContent>
          ) : (
            <>
              <CardHeader className="flex flex-row items-start gap-4 space-y-0 pb-2">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={thread.author.avatar || "/placeholder.svg"} alt={thread.author.username} />
                  <AvatarFallback>{thread.author.username.charAt(0).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold">{thread.author.username}</p>
                      <p className="text-xs text-muted-foreground">
                        Joined {new Date(thread.author.joinDate).toLocaleDateString()}
                      </p>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Posted {formatDistanceToNow(new Date(thread.createdAt), { addSuffix: true })}
                      {thread.lastActivity && new Date(thread.lastActivity) > new Date(thread.createdAt) &&
                        ` • Last activity ${formatDistanceToNow(new Date(thread.lastActivity), { addSuffix: true })}`}
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: thread.content }} />
              </CardContent>
              <CardFooter className="flex items-center justify-between border-t px-6 py-3">
                <div className="flex items-center gap-4">
                  <ThreadVoting
                    threadId={thread._id}
                    initialVotes={{ upvotes: typeof thread.replyCount === 'number' ? thread.replyCount : 0, downvotes: 0 }}
                    showDownvote={false}
                    size="sm"
                  />
                  <div className="flex items-center gap-1">
                    <MessageSquare className="h-4 w-4" />
                    <span>{comments.length}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A2 2 0 0020 6.382V5a2 2 0 00-2-2H6a2 2 0 00-2 2v1.382a2 2 0 00.447 1.342L9 10m6 0v10m0 0H9m6 0a2 2 0 002-2v-8a2 2 0 00-2-2H9a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                    <span>{thread.viewCount ?? 0}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon">
                    <Bookmark className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Share2 className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Flag className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </CardFooter>
            </>
          )}
        </Card>

        <div className="space-y-4">
          <h2 className="mb-4 text-2xl font-bold tracking-tight">Comments ({comments.length})</h2>

          {isLoading ? (
            <div className="space-y-6">
              <Card>
                <CardContent className="p-6">
                  <ThreadSkeleton />
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <ThreadSkeleton />
                </CardContent>
              </Card>
            </div>
          ) : (
            comments.map((comment) => (
              <Card key={comment._id}>
                <CardHeader className="flex flex-row items-start gap-4 space-y-0 pb-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={comment.author.avatar || "/placeholder.svg"} alt={comment.author.username} />
                    <AvatarFallback>{comment.author.username.charAt(0).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="font-semibold">{comment.author.username}</p>
                      <p className="text-xs text-muted-foreground">
                        {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: comment.content }} />
                </CardContent>
                <CardFooter className="flex items-center justify-between border-t px-6 py-3">
                  <div className="flex items-center gap-4">
                    <Button variant="ghost" size="sm" className="flex items-center gap-1">
                      <ThumbsUp className="h-4 w-4" />
                      <span>{comment.likes ? comment.likes.length : 0}</span>
                    </Button>
                  </div>
                  <div>
                    <Button variant="ghost" size="sm">
                      Reply
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))
          )}
        </div>

        {!thread.isLocked && (
          <Card>
            <CardHeader>
              <h3 className="text-lg font-medium">Leave a Comment</h3>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmitComment}>
                <div className="mb-4">
                  <Textarea
                    placeholder="Write your comment here..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className="min-h-32"
                    required
                    disabled={!user || isSubmitting}
                  />
                  {!user && (
                    <p className="mt-2 text-sm text-muted-foreground">
                      Please <Link href="/auth/login" className="text-primary hover:underline">sign in</Link> to leave a comment.
                    </p>
                  )}
                </div>
                <Button type="submit" disabled={!user || isSubmitting || !newComment.trim()}>
                  {isSubmitting ? 'Submitting...' : 'Post Comment'}
                </Button>
                {submitError && <p className="mt-2 text-sm text-red-600">{submitError}</p>}
              </form>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
