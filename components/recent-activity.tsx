import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { formatDistanceToNow } from "date-fns"

const recentActivity = [
  {
    id: 1,
    type: "post",
    content: "Just shared my experience with the new framework...",
    author: {
      name: "Taylor Swift",
      avatar: "/placeholder.svg?height=40&width=40",
      username: "tswift",
    },
    thread: {
      title: "New Framework Discussion",
      slug: "new-framework-discussion",
    },
    category: "development",
    timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
  },
  {
    id: 2,
    type: "reply",
    content: "I completely agree with your assessment of...",
    author: {
      name: "John Doe",
      avatar: "/placeholder.svg?height=40&width=40",
      username: "johnd",
    },
    thread: {
      title: "Community Guidelines Feedback",
      slug: "community-guidelines-feedback",
    },
    category: "ideas-feedback",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
  },
  {
    id: 3,
    type: "thread",
    content: "Started a new discussion about job opportunities...",
    author: {
      name: "Emma Wilson",
      avatar: "/placeholder.svg?height=40&width=40",
      username: "emmaw",
    },
    thread: {
      title: "Remote Job Opportunities 2025",
      slug: "remote-job-opportunities-2025",
    },
    category: "jobs-opportunities",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5), // 5 hours ago
  },
]

export function RecentActivity() {
  return (
    <div className="space-y-4">
      {recentActivity.map((activity) => (
        <div key={activity.id} className="rounded-lg border p-3">
          <div className="flex items-center gap-2">
            <Avatar className="h-6 w-6">
              <AvatarImage src={activity.author.avatar || "/placeholder.svg"} alt={activity.author.name} />
              <AvatarFallback>{activity.author.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <span className="text-sm font-medium">{activity.author.name}</span>
            <span className="text-xs text-muted-foreground">
              {activity.type === "post" && "posted in"}
              {activity.type === "reply" && "replied to"}
              {activity.type === "thread" && "created"}
            </span>
          </div>
          <Link
            href={`/forums/${activity.category}/${activity.thread.slug}`}
            className="mt-1 block text-sm font-medium hover:underline"
          >
            {activity.thread.title}
          </Link>
          <p className="mt-1 text-xs text-muted-foreground line-clamp-1">{activity.content}</p>
          <div className="mt-2 text-xs text-muted-foreground">
            {formatDistanceToNow(activity.timestamp, { addSuffix: true })}
          </div>
        </div>
      ))}
    </div>
  )
}
