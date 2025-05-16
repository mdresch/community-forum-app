import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageSquare, ThumbsUp, Eye } from "lucide-react"
import Link from "next/link"

interface Thread {
  id: string
  title: string
  excerpt: string
  category: string
  categorySlug: string
  timestamp: string
  replies: number
  views: number
  likes: number
  isPinned?: boolean
  isLocked?: boolean
  slug: string
}

interface MemberThreadsProps {
  threads: Thread[]
}

export function MemberThreads({ threads }: MemberThreadsProps) {
  if (!threads || threads.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-10">
          <p className="text-muted-foreground">No threads created yet.</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Threads Started</h3>

      {threads.map((thread) => (
        <Card key={thread.id}>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <Link href={`/forums/${thread.categorySlug}/${thread.slug}`} className="hover:underline">
                <CardTitle className="text-base">{thread.title}</CardTitle>
              </Link>
              <Link href={`/forums/${thread.categorySlug}`}>
                <Badge variant="outline">{thread.category}</Badge>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <p className="line-clamp-2 text-sm text-muted-foreground">{thread.excerpt}</p>
          </CardContent>
          <CardFooter className="border-t bg-muted/50 px-4 py-2 text-xs text-muted-foreground">
            <div className="flex w-full items-center justify-between">
              <span>{thread.timestamp}</span>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <MessageSquare className="h-3 w-3" />
                  <span>{thread.replies}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Eye className="h-3 w-3" />
                  <span>{thread.views}</span>
                </div>
                <div className="flex items-center gap-1">
                  <ThumbsUp className="h-3 w-3" />
                  <span>{thread.likes}</span>
                </div>
              </div>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
