import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { MessageSquare, ThumbsUp, Eye } from "lucide-react"

// This would normally come from a database
const getCategoryData = (slug: string) => {
  const categories = {
    "general-discussion": {
      name: "General Discussion",
      description: "Chat about anything and everything",
    },
    development: {
      name: "Development",
      description: "Discuss programming and development",
    },
    introductions: {
      name: "Introductions",
      description: "Introduce yourself to the community",
    },
    "ideas-feedback": {
      name: "Ideas & Feedback",
      description: "Share your ideas and give feedback",
    },
    "help-support": {
      name: "Help & Support",
      description: "Get help from the community",
    },
    "jobs-opportunities": {
      name: "Jobs & Opportunities",
      description: "Find or post job opportunities",
    },
  }

  return categories[slug] || { name: "Forum Category", description: "Discussion category" }
}

// This would normally come from a database
const getThreads = (category: string) => {
  return [
    {
      id: 1,
      title: "Welcome to the Development forum!",
      content: "This is a place to discuss all things related to programming and development...",
      author: {
        name: "Admin",
        avatar: "/placeholder.svg?height=40&width=40",
        username: "admin",
      },
      isPinned: true,
      isLocked: false,
      replies: 24,
      views: 1253,
      likes: 87,
      lastActivity: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
      tags: ["announcement", "welcome"],
      slug: "welcome-development-forum",
    },
    {
      id: 2,
      title: "Best practices for React in 2025",
      content: "I've been working with React for a few years now and wanted to share some best practices...",
      author: {
        name: "Jane Smith",
        avatar: "/placeholder.svg?height=40&width=40",
        username: "janesmith",
      },
      isPinned: false,
      isLocked: false,
      replies: 42,
      views: 876,
      likes: 65,
      lastActivity: new Date(Date.now() - 1000 * 60 * 60 * 5), // 5 hours ago
      tags: ["react", "frontend", "best-practices"],
      slug: "best-practices-react-2025",
    },
    {
      id: 3,
      title: "How to optimize database queries for large datasets?",
      content: "I'm working on a project with millions of records and need advice on optimizing queries...",
      author: {
        name: "David Chen",
        avatar: "/placeholder.svg?height=40&width=40",
        username: "davidc",
      },
      isPinned: false,
      isLocked: false,
      replies: 18,
      views: 432,
      likes: 29,
      lastActivity: new Date(Date.now() - 1000 * 60 * 60 * 12), // 12 hours ago
      tags: ["database", "optimization", "performance"],
      slug: "optimize-database-queries-large-datasets",
    },
    {
      id: 4,
      title: "Microservices vs Monolith: Which approach is better for startups?",
      content: "I'm planning the architecture for a new startup and wondering which approach to take...",
      author: {
        name: "Sophia Rodriguez",
        avatar: "/placeholder.svg?height=40&width=40",
        username: "sophiar",
      },
      isPinned: false,
      isLocked: false,
      replies: 56,
      views: 921,
      likes: 73,
      lastActivity: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
      tags: ["architecture", "microservices", "monolith", "startups"],
      slug: "microservices-vs-monolith-startups",
    },
  ]
}

export default async function CategoryPage({ params }: { params: { category: string } }) {
  const { category } = await params;
  const categoryData = await getCategoryData(category);
  const threads = await getThreads(category);

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{categoryData.name}</h1>
          <p className="text-muted-foreground">{categoryData.description}</p>
        </div>
        <Button asChild>
          <Link href={`/forums/${category}/new-thread`}>Create Thread</Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Discussions</CardTitle>
          <CardDescription>Browse through threads in this category</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {threads.map((thread) => (
              <div
                key={thread.id}
                className={`rounded-lg border p-4 transition-colors hover:bg-muted ${
                  thread.isPinned ? "border-primary/50 bg-primary/5" : ""
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      {thread.isPinned && (
                        <Badge variant="outline" className="text-xs font-normal">
                          Pinned
                        </Badge>
                      )}
                      {thread.isLocked && (
                        <Badge variant="outline" className="text-xs font-normal">
                          Locked
                        </Badge>
                      )}
                      {thread.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs font-normal">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <Link
                      href={`/forums/${category}/${thread.slug}`}
                      className="block font-medium hover:underline"
                    >
                      {thread.title}
                    </Link>
                    <p className="text-sm text-muted-foreground line-clamp-1">{thread.content}</p>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <MessageSquare className="h-4 w-4" />
                      <span>{thread.replies}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Eye className="h-4 w-4" />
                      <span>{thread.views}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <ThumbsUp className="h-4 w-4" />
                      <span>{thread.likes}</span>
                    </div>
                  </div>
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={thread.author.avatar || "/placeholder.svg"} alt={thread.author.name} />
                      <AvatarFallback>{thread.author.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span className="text-xs">
                      Started by <span className="font-medium">{thread.author.name}</span>
                    </span>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    Last activity: {thread.lastActivity.toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
