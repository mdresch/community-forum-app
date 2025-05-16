"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MoreHorizontal, Search } from "lucide-react"
import { formatDistanceToNow } from "date-fns"

// Mock content data
const threads = [
  {
    id: 1,
    title: "Best practices for React in 2025",
    category: "Development",
    author: {
      name: "Jane Smith",
      avatar: "/placeholder.svg?height=40&width=40",
      username: "janesmith",
    },
    status: "Published",
    featured: true,
    pinned: true,
    replies: 42,
    views: 876,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3), // 3 days ago
    lastActivity: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    slug: "best-practices-react-2025",
  },
  {
    id: 2,
    title: "Introducing myself: New developer from Toronto",
    category: "Introductions",
    author: {
      name: "Sarah Chen",
      avatar: "/placeholder.svg?height=40&width=40",
      username: "sarahc",
    },
    status: "Published",
    featured: false,
    pinned: false,
    replies: 28,
    views: 432,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5), // 5 days ago
    lastActivity: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    slug: "new-developer-toronto",
  },
  {
    id: 3,
    title: "Feature request: Dark mode for the forum",
    category: "Ideas & Feedback",
    author: {
      name: "Miguel Lopez",
      avatar: "/placeholder.svg?height=40&width=40",
      username: "migueldev",
    },
    status: "Published",
    featured: true,
    pinned: false,
    replies: 35,
    views: 521,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7), // 7 days ago
    lastActivity: new Date(Date.now() - 1000 * 60 * 60 * 12), // 12 hours ago
    slug: "feature-request-dark-mode",
  },
  {
    id: 4,
    title: "How to optimize database queries for large datasets?",
    category: "Development",
    author: {
      name: "David Chen",
      avatar: "/placeholder.svg?height=40&width=40",
      username: "davidc",
    },
    status: "Published",
    featured: false,
    pinned: false,
    replies: 18,
    views: 432,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10), // 10 days ago
    lastActivity: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 days ago
    slug: "optimize-database-queries-large-datasets",
  },
  {
    id: 5,
    title: "Inappropriate content - under review",
    category: "General Discussion",
    author: {
      name: "Michael Jordan",
      avatar: "/placeholder.svg?height=40&width=40",
      username: "mjordan",
    },
    status: "Hidden",
    featured: false,
    pinned: false,
    replies: 5,
    views: 87,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    lastActivity: new Date(Date.now() - 1000 * 60 * 60 * 12), // 12 hours ago
    slug: "inappropriate-content-review",
  },
]

const posts = [
  {
    id: 1,
    content: "Great post! I'd add that using TypeScript has become almost standard for React projects now...",
    thread: "Best practices for React in 2025",
    author: {
      name: "Alex Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
      username: "alexj",
    },
    status: "Published",
    likes: 28,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2 - 1000 * 60 * 30), // 2 days and 30 minutes ago
    threadSlug: "best-practices-react-2025",
  },
  {
    id: 2,
    content: "I completely agree with your points, especially about functional components and hooks...",
    thread: "Best practices for React in 2025",
    author: {
      name: "Sarah Chen",
      avatar: "/placeholder.svg?height=40&width=40",
      username: "sarahc",
    },
    status: "Published",
    likes: 19,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 - 1000 * 60 * 45), // 1 day and 45 minutes ago
    threadSlug: "best-practices-react-2025",
  },
  {
    id: 3,
    content: "Welcome to the community! I'm also based in Toronto and would be happy to connect...",
    thread: "Introducing myself: New developer from Toronto",
    author: {
      name: "Jane Smith",
      avatar: "/placeholder.svg?height=40&width=40",
      username: "janesmith",
    },
    status: "Published",
    likes: 14,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 12), // 12 hours ago
    threadSlug: "new-developer-toronto",
  },
  {
    id: 4,
    content: "This post contains offensive language and personal attacks [content removed by moderator]",
    thread: "Inappropriate content - under review",
    author: {
      name: "Michael Jordan",
      avatar: "/placeholder.svg?height=40&width=40",
      username: "mjordan",
    },
    status: "Hidden",
    likes: 0,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 12), // 12 hours ago
    threadSlug: "inappropriate-content-review",
  },
]

export function AdminContentList() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("threads")

  const filteredThreads = threads.filter(
    (thread) =>
      thread.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      thread.author.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      thread.category.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const filteredPosts = posts.filter(
    (post) =>
      post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.author.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.thread.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Content Management</CardTitle>
            <CardDescription>Manage threads, posts, and other content</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search content..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">Filter</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Filter by</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>All Content</DropdownMenuItem>
              <DropdownMenuItem>Published</DropdownMenuItem>
              <DropdownMenuItem>Hidden</DropdownMenuItem>
              <DropdownMenuItem>Featured</DropdownMenuItem>
              <DropdownMenuItem>Pinned</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <Tabs defaultValue="threads" onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="threads">Threads</TabsTrigger>
            <TabsTrigger value="posts">Posts</TabsTrigger>
          </TabsList>

          <TabsContent value="threads">
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Author</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Activity</TableHead>
                    <TableHead>Stats</TableHead>
                    <TableHead className="w-[80px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredThreads.map((thread) => (
                    <TableRow key={thread.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{thread.title}</div>
                          <div className="flex gap-1 text-xs text-muted-foreground">
                            {thread.pinned && <Badge variant="outline">Pinned</Badge>}
                            {thread.featured && <Badge variant="outline">Featured</Badge>}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{thread.category}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-6 w-6">
                            <AvatarImage src={thread.author.avatar || "/placeholder.svg"} alt={thread.author.name} />
                            <AvatarFallback>{thread.author.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <span className="text-sm">@{thread.author.username}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={thread.status === "Published" ? "outline" : "secondary"}
                          className={
                            thread.status === "Published"
                              ? "bg-green-50 text-green-700"
                              : "bg-yellow-50 text-yellow-700"
                          }
                        >
                          {thread.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div>Created: {formatDistanceToNow(thread.createdAt, { addSuffix: true })}</div>
                          <div className="text-xs text-muted-foreground">
                            Last activity: {formatDistanceToNow(thread.lastActivity, { addSuffix: true })}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div>{thread.replies} replies</div>
                          <div className="text-xs text-muted-foreground">{thread.views} views</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Actions</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>View Thread</DropdownMenuItem>
                            <DropdownMenuItem>Edit Thread</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            {thread.pinned ? (
                              <DropdownMenuItem>Unpin Thread</DropdownMenuItem>
                            ) : (
                              <DropdownMenuItem>Pin Thread</DropdownMenuItem>
                            )}
                            {thread.featured ? (
                              <DropdownMenuItem>Remove from Featured</DropdownMenuItem>
                            ) : (
                              <DropdownMenuItem>Mark as Featured</DropdownMenuItem>
                            )}
                            <DropdownMenuSeparator />
                            {thread.status === "Published" ? (
                              <DropdownMenuItem>Hide Thread</DropdownMenuItem>
                            ) : (
                              <DropdownMenuItem>Publish Thread</DropdownMenuItem>
                            )}
                            <DropdownMenuItem className="text-destructive">Delete Thread</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          <TabsContent value="posts">
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[40%]">Content</TableHead>
                    <TableHead>Thread</TableHead>
                    <TableHead>Author</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Posted</TableHead>
                    <TableHead className="w-[80px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPosts.map((post) => (
                    <TableRow key={post.id}>
                      <TableCell>
                        <div className="line-clamp-2 text-sm">{post.content}</div>
                      </TableCell>
                      <TableCell>
                        <div className="line-clamp-1 text-sm">{post.thread}</div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-6 w-6">
                            <AvatarImage src={post.author.avatar || "/placeholder.svg"} alt={post.author.name} />
                            <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <span className="text-sm">@{post.author.username}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={post.status === "Published" ? "outline" : "secondary"}
                          className={
                            post.status === "Published" ? "bg-green-50 text-green-700" : "bg-yellow-50 text-yellow-700"
                          }
                        >
                          {post.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{formatDistanceToNow(post.createdAt, { addSuffix: true })}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Actions</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>View Post</DropdownMenuItem>
                            <DropdownMenuItem>Edit Post</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            {post.status === "Published" ? (
                              <DropdownMenuItem>Hide Post</DropdownMenuItem>
                            ) : (
                              <DropdownMenuItem>Publish Post</DropdownMenuItem>
                            )}
                            <DropdownMenuItem className="text-destructive">Delete Post</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
