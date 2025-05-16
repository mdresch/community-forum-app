import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageSquare, ThumbsUp, Award, PenTool, VoteIcon as Poll } from "lucide-react"
import Link from "next/link"

interface Activity {
  id: string
  type: "post" | "like" | "badge" | "thread" | "poll"
  title: string
  content?: string
  timestamp: string
  link: string
  category?: string
}

interface MemberActivityFeedProps {
  activities: Activity[]
}

export function MemberActivityFeed({ activities }: MemberActivityFeedProps) {
  if (!activities || activities.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-10">
          <p className="text-muted-foreground">No recent activity to display.</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Recent Activity</h3>

      {activities.map((activity) => (
        <Card key={activity.id} className="overflow-hidden">
          <CardHeader className="flex flex-row items-center gap-4 pb-2">
            <div className="rounded-full bg-primary/10 p-2">{getActivityIcon(activity.type)}</div>
            <div className="flex-1">
              <CardTitle className="text-base">{getActivityTitle(activity)}</CardTitle>
              <CardDescription>{activity.timestamp}</CardDescription>
            </div>
          </CardHeader>
          {activity.content && (
            <CardContent>
              <p className="line-clamp-2 text-sm text-muted-foreground">{activity.content}</p>
              <Link href={activity.link} className="mt-2 text-xs text-primary hover:underline">
                View {activity.type}
              </Link>
            </CardContent>
          )}
        </Card>
      ))}
    </div>
  )
}

function getActivityIcon(type: string) {
  switch (type) {
    case "post":
      return <MessageSquare className="h-4 w-4 text-primary" />
    case "like":
      return <ThumbsUp className="h-4 w-4 text-primary" />
    case "badge":
      return <Award className="h-4 w-4 text-primary" />
    case "thread":
      return <PenTool className="h-4 w-4 text-primary" />
    case "poll":
      return <Poll className="h-4 w-4 text-primary" />
    default:
      return <MessageSquare className="h-4 w-4 text-primary" />
  }
}

function getActivityTitle(activity: Activity) {
  switch (activity.type) {
    case "post":
      return `Replied to "${activity.title}"`
    case "like":
      return `Liked "${activity.title}"`
    case "badge":
      return `Earned badge: ${activity.title}`
    case "thread":
      return `Created thread: "${activity.title}"`
    case "poll":
      return `Created poll: "${activity.title}"`
    default:
      return activity.title
  }
}
