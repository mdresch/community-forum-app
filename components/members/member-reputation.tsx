import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ThumbsUp, ThumbsDown, Award, MessageSquare, Star } from "lucide-react"

interface ReputationEvent {
  id: string
  type: "post" | "received_like" | "given_like" | "badge" | "thread" | "poll" | "downvote"
  points: number
  source: string
  timestamp: string
  description: string
}

interface MemberReputationProps {
  reputation: {
    events: ReputationEvent[]
    stats: {
      total: number
      thisMonth: number
      thisWeek: number
      distribution: {
        posts: number
        likes: number
        badges: number
        other: number
      }
    }
  }
}

export function MemberReputation({ reputation }: MemberReputationProps) {
  if (!reputation || !reputation.events || reputation.events.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-10">
          <p className="text-muted-foreground">No reputation history to display.</p>
        </CardContent>
      </Card>
    )
  }

  const { events, stats } = reputation

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium">Reputation History</h3>

      {/* Reputation Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Reputation</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">All time</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">This Month</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.thisMonth.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Last 30 days</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">This Week</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.thisWeek.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Last 7 days</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Next Level</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,200</div>
            <p className="text-xs text-muted-foreground">Points needed</p>
          </CardContent>
        </Card>
      </div>

      {/* Reputation Distribution */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Reputation Sources</CardTitle>
          <CardDescription>Where reputation points come from</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4 text-primary" />
                <span className="text-sm">Posts & Threads</span>
              </div>
              <span className="text-sm font-medium">{stats.distribution.posts}%</span>
            </div>
            <Progress value={stats.distribution.posts} className="h-2" />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ThumbsUp className="h-4 w-4 text-primary" />
                <span className="text-sm">Likes & Upvotes</span>
              </div>
              <span className="text-sm font-medium">{stats.distribution.likes}%</span>
            </div>
            <Progress value={stats.distribution.likes} className="h-2" />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Award className="h-4 w-4 text-primary" />
                <span className="text-sm">Badges & Achievements</span>
              </div>
              <span className="text-sm font-medium">{stats.distribution.badges}%</span>
            </div>
            <Progress value={stats.distribution.badges} className="h-2" />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Star className="h-4 w-4 text-primary" />
                <span className="text-sm">Other Sources</span>
              </div>
              <span className="text-sm font-medium">{stats.distribution.other}%</span>
            </div>
            <Progress value={stats.distribution.other} className="h-2" />
          </div>
        </CardContent>
      </Card>

      {/* Reputation History */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Reputation History</CardTitle>
          <CardDescription>Recent reputation changes</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="positive">Positive</TabsTrigger>
              <TabsTrigger value="negative">Negative</TabsTrigger>
              <TabsTrigger value="badges">Badges</TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="mt-4 space-y-4">
              {events.map((event) => (
                <ReputationEventItem key={event.id} event={event} />
              ))}
            </TabsContent>
            <TabsContent value="positive" className="mt-4 space-y-4">
              {events
                .filter((event) => event.points > 0)
                .map((event) => (
                  <ReputationEventItem key={event.id} event={event} />
                ))}
            </TabsContent>
            <TabsContent value="negative" className="mt-4 space-y-4">
              {events
                .filter((event) => event.points < 0)
                .map((event) => (
                  <ReputationEventItem key={event.id} event={event} />
                ))}
            </TabsContent>
            <TabsContent value="badges" className="mt-4 space-y-4">
              {events
                .filter((event) => event.type === "badge")
                .map((event) => (
                  <ReputationEventItem key={event.id} event={event} />
                ))}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

function ReputationEventItem({ event }: { event: ReputationEvent }) {
  return (
    <div className="flex items-center justify-between rounded-lg border bg-card p-4 text-card-foreground shadow-sm">
      <div className="flex items-center gap-3">
        <div className={`rounded-full p-2 ${event.points >= 0 ? "bg-green-100" : "bg-red-100"}`}>
          {getReputationEventIcon(event.type, event.points)}
        </div>
        <div>
          <p className="font-medium">{event.description}</p>
          <p className="text-xs text-muted-foreground">
            {event.timestamp} • {event.source}
          </p>
        </div>
      </div>
      <div className={`font-bold ${event.points >= 0 ? "text-green-600" : "text-red-600"}`}>
        {event.points > 0 ? `+${event.points}` : event.points}
      </div>
    </div>
  )
}

function getReputationEventIcon(type: string, points: number) {
  if (points < 0) {
    return <ThumbsDown className="h-4 w-4 text-red-600" />
  }

  switch (type) {
    case "post":
    case "thread":
      return <MessageSquare className="h-4 w-4 text-green-600" />
    case "received_like":
    case "given_like":
      return <ThumbsUp className="h-4 w-4 text-green-600" />
    case "badge":
      return <Award className="h-4 w-4 text-green-600" />
    default:
      return <Star className="h-4 w-4 text-green-600" />
  }
}
