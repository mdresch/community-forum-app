"use client"

import { useState } from "react"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { ThumbsUp, MessageSquare, Flag, Share2, Bookmark, MoreHorizontal, PlusCircle } from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import { ThreadVoting } from "@/components/voting/thread-voting"
import { UserReputation } from "@/components/voting/user-reputation"
import { PollDisplay } from "@/components/polls/poll-display"

// This is an enhanced version of the existing thread page with voting mechanisms added
export default function ThreadPage({ params }: { params: { category: string; thread: string } }) {
  const [newComment, setNewComment] = useState("")

  const handleSubmitComment = (e) => {
    e.preventDefault()
    // In a real app, this would send the comment to the server
    alert(`Comment submitted: ${newComment}`)
    setNewComment("")
  }

  // Mock thread data
  const thread = {
    id: 1,
    title: "Best practices for React in 2025",
    author: {
      name: "Jane Smith",
      avatar: "/placeholder.svg?height=40&width=40",
      username: "janesmith",
      joinDate: new Date(2022, 5, 15),
      postCount: 253,
    },
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
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3), // 3 days ago
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 days ago
    tags: ["react", "frontend", "best-practices"],
    likes: 65,
    views: 876,
    isLocked: false,
    isPinned: false,
    hasPoll: true,
  }

  // Mock comments data
  const comments = [
    {
      id: 1,
      author: {
        name: "Alex Johnson",
        avatar: "/placeholder.svg?height=40&width=40",
        username: "alexj",
        joinDate: new Date(2023, 2, 10),
        postCount: 87,
      },
      content: `
        <p>Great post! I'd add that using TypeScript has become almost standard for React projects now. The type safety and improved developer experience are invaluable.</p>
        <p>Also, for styling, I've found that Tailwind CSS or styled-components are excellent choices depending on the project requirements.</p>
      `,
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2 - 1000 * 60 * 30), // 2 days and 30 minutes ago
      likes: 28,
      isFeatured: true,
    },
    {
      id: 2,
      author: {
        name: "Sarah Chen",
        avatar: "/placeholder.svg?height=40&width=40",
        username: "sarahc",
        joinDate: new Date(2021, 8, 5),
        postCount: 342,
      },
      content: `
        <p>I completely agree with your points, especially about functional components and hooks. They've made my code so much cleaner.</p>
        <p>One thing I'd add is the importance of writing good tests. React Testing Library has been a game-changer for me in writing meaningful tests that focus on user behavior rather than implementation details.</p>
      `,
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 - 1000 * 60 * 45), // 1 day and 45 minutes ago
      likes: 19,
      isFeatured: false,
    },
    {
      id: 3,
      author: {
        name: "Jane Smith",
        avatar: "/placeholder.svg?height=40&width=40",
        username: "janesmith",
        joinDate: new Date(2022, 5, 15),
        postCount: 253,
      },
      content: `
        <p>@alexj and @sarahc - Thanks for your additions! Completely agree about TypeScript and testing. I should have included those in my original post.</p>
        <p>TypeScript has saved me countless hours of debugging, and good tests definitely help maintain confidence when refactoring or adding new features.</p>
      `,
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 12), // 12 hours ago
      likes: 14,
      isFeatured: false,
    },
  ]

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-4">
        <Link
          href={`/forums/${params.category}`}
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
          Back to {params.category.replace(/-/g, " ")}
        </Link>
        <h1 className="text-3xl font-bold tracking-tight">{thread.title}</h1>
        <div className="mt-2 flex flex-wrap gap-2">
          {thread.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs font-normal">
              {tag}
            </Badge>
          ))}
        </div>
      </div>

      <div className="mb-8 grid gap-6 md:grid-cols-4">
        <div className="md:col-span-3 space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-start gap-4 space-y-0 pb-2">
              <div className="flex flex-col items-center gap-2">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={thread.author.avatar || "/placeholder.svg"} alt={thread.author.name} />
                  <AvatarFallback>{thread.author.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <ThreadVoting
                  threadId={thread.id}
                  initialVotes={{ upvotes: thread.likes, downvotes: 0 }}
                  vertical={true}
                />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold">{thread.author.name}</p>
                    <p className="text-xs text-muted-foreground">
                      Joined {thread.author.joinDate.toLocaleDateString()} • {thread.author.postCount} posts
                    </p>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Posted {formatDistanceToNow(thread.createdAt, { addSuffix: true })}
                    {thread.updatedAt > thread.createdAt &&
                      ` • Edited ${formatDistanceToNow(thread.updatedAt, { addSuffix: true })}`}
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: thread.content }} />
            </CardContent>
            <CardFooter className="flex items-center justify-between border-t px-6 py-3">
              <div className="flex items-center gap-4">
                <Button variant="ghost" size="sm" className="flex items-center gap-1">
                  <MessageSquare className="h-4 w-4" />
                  <span>{comments.length}</span>
                </Button>
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
          </Card>

          {thread.hasPoll && <PollDisplay pollId="thread-poll" />}

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Replies ({comments.length})</h2>
              <Button asChild variant="outline">
                <Link href={`/forums/${params.category}/${params.thread}/poll`}>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Add Poll
                </Link>
              </Button>
            </div>

            {comments.map((comment) => (
              <Card
                key={comment.id}
                id={`comment-${comment.id}`}
                className={comment.isFeatured ? "border-yellow-300 bg-yellow-50/50 dark:bg-yellow-950/10" : ""}
              >
                <CardHeader className="flex flex-row items-start gap-4 space-y-0 pb-2">
                  <div className="flex flex-col items-center gap-2">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={comment.author.avatar || "/placeholder.svg"} alt={comment.author.name} />
                      <AvatarFallback>{comment.author.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <ThreadVoting
                      threadId={`comment-${comment.id}`}
                      initialVotes={{ upvotes: comment.likes, downvotes: 0 }}
                      vertical={true}
                      isFeatured={comment.isFeatured}
                      onFeature={() => console.log(`Feature comment ${comment.id}`)}
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-semibold">{comment.author.name}</p>
                          {comment.isFeatured && (
                            <Badge
                              variant="outline"
                              className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                            >
                              Featured Answer
                            </Badge>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Joined {comment.author.joinDate.toLocaleDateString()} • {comment.author.postCount} posts
                        </p>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {formatDistanceToNow(comment.createdAt, { addSuffix: true })}
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: comment.content }} />
                </CardContent>
                <CardFooter className="flex items-center justify-between border-t px-6 py-3">
                  <div></div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm">
                      Reply
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Flag className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>

          {!thread.isLocked && (
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold">Leave a Reply</h3>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmitComment}>
                  <Textarea
                    placeholder="Write your reply here..."
                    className="mb-4 min-h-[120px]"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    required
                  />
                  <Button type="submit">Post Reply</Button>
                </form>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold">Thread Author</h3>
            </CardHeader>
            <CardContent>
              <UserReputation
                user={{
                  name: thread.author.name,
                  username: thread.author.username,
                  avatar: thread.author.avatar,
                  reputation: 1876,
                  level: 4,
                  nextLevelAt: 2000,
                  badges: [
                    { id: 1, name: "Helpful", count: 15, variant: "default", icon: <ThumbsUp className="h-3 w-3" /> },
                    {
                      id: 2,
                      name: "Great Answer",
                      count: 8,
                      variant: "secondary",
                      icon: <MessageSquare className="h-3 w-3" />,
                    },
                  ],
                  rank: 12,
                  joinDate: thread.author.joinDate.toLocaleDateString(),
                }}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold">Thread Stats</h3>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Views</span>
                  <span>{thread.views}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Replies</span>
                  <span>{comments.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Upvotes</span>
                  <span>{thread.likes}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Created</span>
                  <span>{thread.createdAt.toLocaleDateString()}</span>
                </div>
                {thread.updatedAt > thread.createdAt && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Last Updated</span>
                    <span>{thread.updatedAt.toLocaleDateString()}</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold">Similar Threads</h3>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Link href="#" className="block text-sm hover:underline">
                  React Performance Optimization Techniques
                </Link>
                <Link href="#" className="block text-sm hover:underline">
                  State Management in React: Context API vs Redux
                </Link>
                <Link href="#" className="block text-sm hover:underline">
                  TypeScript with React: Best Practices
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
