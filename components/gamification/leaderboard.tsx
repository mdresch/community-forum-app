"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Trophy, Medal, Award } from "lucide-react"

// Mock leaderboard data
const leaderboardData = {
  weekly: [
    {
      rank: 1,
      user: {
        name: "Jane Smith",
        username: "janesmith",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      points: 320,
      posts: 12,
      likes: 48,
      badge: "gold",
    },
    {
      rank: 2,
      user: {
        name: "Alex Johnson",
        username: "alexj",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      points: 285,
      posts: 8,
      likes: 37,
      badge: "silver",
    },
    {
      rank: 3,
      user: {
        name: "Sarah Chen",
        username: "sarahc",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      points: 240,
      posts: 15,
      likes: 22,
      badge: "bronze",
    },
    {
      rank: 4,
      user: {
        name: "Miguel Lopez",
        username: "migueldev",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      points: 210,
      posts: 7,
      likes: 31,
    },
    {
      rank: 5,
      user: {
        name: "Emma Wilson",
        username: "emmaw",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      points: 185,
      posts: 9,
      likes: 19,
    },
  ],
  monthly: [
    {
      rank: 1,
      user: {
        name: "Sarah Chen",
        username: "sarahc",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      points: 1240,
      posts: 52,
      likes: 187,
      badge: "gold",
    },
    {
      rank: 2,
      user: {
        name: "Jane Smith",
        username: "janesmith",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      points: 980,
      posts: 43,
      likes: 156,
      badge: "silver",
    },
    {
      rank: 3,
      user: {
        name: "David Chen",
        username: "davidc",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      points: 875,
      posts: 38,
      likes: 129,
      badge: "bronze",
    },
    {
      rank: 4,
      user: {
        name: "Alex Johnson",
        username: "alexj",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      points: 720,
      posts: 31,
      likes: 98,
    },
    {
      rank: 5,
      user: {
        name: "Emma Wilson",
        username: "emmaw",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      points: 650,
      posts: 28,
      likes: 87,
    },
  ],
  allTime: [
    {
      rank: 1,
      user: {
        name: "Jane Smith",
        username: "janesmith",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      points: 12540,
      posts: 487,
      likes: 2156,
      badge: "gold",
    },
    {
      rank: 2,
      user: {
        name: "Sarah Chen",
        username: "sarahc",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      points: 9870,
      posts: 342,
      likes: 1543,
      badge: "silver",
    },
    {
      rank: 3,
      user: {
        name: "David Chen",
        username: "davidc",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      points: 8450,
      posts: 298,
      likes: 1287,
      badge: "bronze",
    },
    {
      rank: 4,
      user: {
        name: "Miguel Lopez",
        username: "migueldev",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      points: 7320,
      posts: 276,
      likes: 1098,
    },
    {
      rank: 5,
      user: {
        name: "Alex Johnson",
        username: "alexj",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      points: 6540,
      posts: 231,
      likes: 987,
    },
  ],
}

export function Leaderboard() {
  const [activeTab, setActiveTab] = useState("weekly")

  const getRankBadge = (rank) => {
    switch (rank) {
      case 1:
        return <Trophy className="h-5 w-5 text-yellow-500" />
      case 2:
        return <Medal className="h-5 w-5 text-gray-400" />
      case 3:
        return <Award className="h-5 w-5 text-amber-700" />
      default:
        return <span className="flex h-5 w-5 items-center justify-center font-medium">{rank}</span>
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Leaderboard</CardTitle>
        <CardDescription>Top contributors in the community</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="weekly" onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="weekly">This Week</TabsTrigger>
            <TabsTrigger value="monthly">This Month</TabsTrigger>
            <TabsTrigger value="allTime">All Time</TabsTrigger>
          </TabsList>

          {["weekly", "monthly", "allTime"].map((period) => (
            <TabsContent key={period} value={period} className="space-y-4">
              {leaderboardData[period].map((entry) => (
                <div key={entry.rank} className="flex items-center gap-4 rounded-lg border p-4">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
                    {getRankBadge(entry.rank)}
                  </div>
                  <div className="flex flex-1 items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={entry.user.avatar || "/placeholder.svg"} alt={entry.user.name} />
                      <AvatarFallback>{entry.user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{entry.user.name}</div>
                      <div className="text-xs text-muted-foreground">@{entry.user.username}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold">{entry.points}</div>
                    <div className="text-xs text-muted-foreground">points</div>
                  </div>
                  <div className="text-right">
                    <div>{entry.posts}</div>
                    <div className="text-xs text-muted-foreground">posts</div>
                  </div>
                  <div className="text-right">
                    <div>{entry.likes}</div>
                    <div className="text-xs text-muted-foreground">likes</div>
                  </div>
                </div>
              ))}
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  )
}
