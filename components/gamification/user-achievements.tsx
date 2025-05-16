"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Award, MessageSquare, ThumbsUp, Users, Zap, BookOpen, Trophy } from "lucide-react"

// Mock achievements data
const achievements = [
  {
    id: 1,
    name: "First Post",
    description: "Create your first thread in the forum",
    icon: <MessageSquare className="h-5 w-5" />,
    earned: true,
    date: "Jan 15, 2022",
    category: "participation",
    points: 10,
  },
  {
    id: 2,
    name: "Conversation Starter",
    description: "Start 5 discussions that receive at least 3 replies",
    icon: <Users className="h-5 w-5" />,
    earned: true,
    date: "Mar 22, 2022",
    category: "participation",
    points: 25,
  },
  {
    id: 3,
    name: "Popular Thread",
    description: "Have a thread with more than 50 replies",
    icon: <Zap className="h-5 w-5" />,
    earned: false,
    progress: 68, // 68%
    category: "participation",
    points: 50,
  },
  {
    id: 4,
    name: "Helpful Answer",
    description: "Receive 10 likes on a single reply",
    icon: <ThumbsUp className="h-5 w-5" />,
    earned: true,
    date: "Apr 10, 2022",
    category: "quality",
    points: 30,
  },
  {
    id: 5,
    name: "Knowledge Seeker",
    description: "Read 50 threads",
    icon: <BookOpen className="h-5 w-5" />,
    earned: false,
    progress: 42, // 42%
    category: "engagement",
    points: 20,
  },
  {
    id: 6,
    name: "Dedicated Member",
    description: "Visit the forum for 30 consecutive days",
    icon: <Award className="h-5 w-5" />,
    earned: false,
    progress: 23, // 23%
    category: "engagement",
    points: 100,
  },
]

export function UserAchievements() {
  const [activeTab, setActiveTab] = useState("all")

  const earnedAchievements = achievements.filter((achievement) => achievement.earned)
  const inProgressAchievements = achievements.filter((achievement) => !achievement.earned)
  const totalPoints = earnedAchievements.reduce((sum, achievement) => sum + achievement.points, 0)

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Achievements & Badges</CardTitle>
            <CardDescription>Track your progress and earn rewards</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-yellow-500" />
            <span className="text-xl font-bold">{totalPoints}</span>
            <span className="text-sm text-muted-foreground">points</span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="all" onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="earned">Earned ({earnedAchievements.length})</TabsTrigger>
            <TabsTrigger value="progress">In Progress ({inProgressAchievements.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            {achievements.map((achievement) => (
              <AchievementItem key={achievement.id} achievement={achievement} />
            ))}
          </TabsContent>

          <TabsContent value="earned" className="space-y-4">
            {earnedAchievements.map((achievement) => (
              <AchievementItem key={achievement.id} achievement={achievement} />
            ))}
          </TabsContent>

          <TabsContent value="progress" className="space-y-4">
            {inProgressAchievements.map((achievement) => (
              <AchievementItem key={achievement.id} achievement={achievement} />
            ))}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

function AchievementItem({ achievement }) {
  return (
    <div className="rounded-lg border p-4">
      <div className="flex items-start gap-4">
        <div
          className={`rounded-full p-2 ${achievement.earned ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"}`}
        >
          {achievement.icon}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h3 className="font-medium">{achievement.name}</h3>
            {achievement.earned && (
              <Badge variant="outline" className="bg-green-50 text-green-700">
                Earned
              </Badge>
            )}
          </div>
          <p className="text-sm text-muted-foreground">{achievement.description}</p>
          {achievement.earned ? (
            <p className="mt-2 text-xs text-muted-foreground">
              Earned on {achievement.date} • {achievement.points} points
            </p>
          ) : (
            <div className="mt-2 space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span>{achievement.progress}% complete</span>
                <span>{achievement.points} points</span>
              </div>
              <Progress value={achievement.progress} className="h-2" />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
