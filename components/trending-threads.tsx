import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MessageSquare, ThumbsUp } from "lucide-react"

const trendingThreads = [
  {
    id: 1,
    title: "What's your favorite development stack in 2025?",
    author: {
      name: "Alex Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
      username: "alexj",
    },
    replies: 42,
    likes: 87,
    category: "development",
    slug: "favorite-development-stack-2025",
  },
  {
    id: 2,
    title: "Introducing myself: New developer from Toronto",
    author: {
      name: "Sarah Chen",
      avatar: "/placeholder.svg?height=40&width=40",
      username: "sarahc",
    },
    replies: 28,
    likes: 53,
    category: "introductions",
    slug: "new-developer-toronto",
  },
  {
    id: 3,
    title: "Feature request: Dark mode for the forum",
    author: {
      name: "Miguel Lopez",
      avatar: "/placeholder.svg?height=40&width=40",
      username: "migueldev",
    },
    replies: 35,
    likes: 92,
    category: "ideas-feedback",
    slug: "feature-request-dark-mode",
  },
]

export function TrendingThreads() {
  return (
    <div className="space-y-4">
      {trendingThreads.map((thread) => (
        <Link
          key={thread.id}
          href={`/forums/${thread.category}/${thread.slug}`}
          className="block rounded-lg border p-3 transition-colors hover:bg-muted"
        >
          <h4 className="font-medium line-clamp-2">{thread.title}</h4>
          <div className="mt-2 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Avatar className="h-6 w-6">
                <AvatarImage src={thread.author.avatar || "/placeholder.svg"} alt={thread.author.name} />
                <AvatarFallback>{thread.author.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <span className="text-xs text-muted-foreground">{thread.author.name}</span>
            </div>
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <MessageSquare className="h-3.5 w-3.5" />
                <span>{thread.replies}</span>
              </div>
              <div className="flex items-center gap-1">
                <ThumbsUp className="h-3.5 w-3.5" />
                <span>{thread.likes}</span>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}
