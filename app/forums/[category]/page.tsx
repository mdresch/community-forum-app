import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { MessageSquare, ThumbsUp, Eye } from "lucide-react"
import { notFound } from "next/navigation";

export default async function CategoryPage({ params }: { params: { category: string } }) {
  const { category } = await params;
  // Fetch category and threads from the API
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const res = await fetch(`${baseUrl}/api/categories/${category}`, {
    cache: "no-store"
  });
  if (!res.ok) {
    notFound();
  }
  const data = await res.json();
  const categoryData = data.category;
  const threads = data.threads;

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
            {threads.map((thread: any) => (
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
                      {thread.tags.map((tag: string) => (
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
                      <span>{thread.likes ? thread.likes.length : 0}</span>
                    </div>
                  </div>
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={thread.author?.avatar || "/placeholder.svg"} alt={thread.author?.name || "User"} />
                      <AvatarFallback>
                        {thread.author?.name ? thread.author.name.charAt(0) : 'U'}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-xs">
                      Started by <span className="font-medium">{thread.author?.name || "Unknown"}</span>
                    </span>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    Last activity: {new Date(thread.lastActivity).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
