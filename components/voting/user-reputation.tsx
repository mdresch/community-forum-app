"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Trophy, Award, Star, Shield, Zap } from "lucide-react"

export function UserReputation({
  user = {
    name: "Jane Smith",
    username: "janesmith",
    avatar: "/placeholder.svg?height=40&width=40",
    reputation: 1876,
    level: 4,
    nextLevelAt: 2000,
    badges: [
      { id: 1, name: "Helpful", count: 15, variant: "default", icon: <Award className="h-3 w-3" /> },
      { id: 2, name: "Great Answer", count: 8, variant: "secondary", icon: <Star className="h-3 w-3" /> },
      { id: 3, name: "Moderator", count: 1, variant: "outline", icon: <Shield className="h-3 w-3" /> },
    ],
    rank: 12,
    joinDate: "Jan 15, 2022",
  },
}) {
  // Calculate progress to next level
  const levelProgress = ((user.reputation - (user.level * 500 - 500)) / 500) * 100

  // Get level title
  const getLevelTitle = (level) => {
    const titles = {
      1: "Newcomer",
      2: "Contributor",
      3: "Regular",
      4: "Established",
      5: "Trusted",
      6: "Expert",
      7: "Veteran",
      8: "Guru",
      9: "Legend",
      10: "Moderator",
    }
    return titles[level] || "Member"
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <Avatar className="h-10 w-10">
          <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <div className="font-medium">{user.name}</div>
          <div className="text-sm text-muted-foreground">@{user.username}</div>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <Trophy className="h-4 w-4 text-yellow-500" />
            <span className="font-medium">{user.reputation} Reputation</span>
          </div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Badge variant="outline" className="gap-1">
                  <Zap className="h-3 w-3" />
                  Rank #{user.rank}
                </Badge>
              </TooltipTrigger>
              <TooltipContent>
                <p>Community rank based on reputation</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        <div className="space-y-1">
          <div className="flex items-center justify-between text-sm">
            <span>
              Level {user.level}: {getLevelTitle(user.level)}
            </span>
            <span>
              {user.reputation} / {user.nextLevelAt}
            </span>
          </div>
          <Progress value={levelProgress} className="h-2" />
        </div>
      </div>

      <div className="space-y-2">
        <h4 className="text-sm font-medium">Badges</h4>
        <div className="flex flex-wrap gap-2">
          {user.badges.map((badge) => (
            <TooltipProvider key={badge.id}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Badge variant={badge.variant} className="gap-1">
                    {badge.icon}
                    {badge.name} {badge.count > 1 && `× ${badge.count}`}
                  </Badge>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{getBadgeDescription(badge.name)}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))}
        </div>
      </div>
    </div>
  )
}

function getBadgeDescription(badgeName) {
  const descriptions = {
    Helpful: "Provided helpful answers to community questions",
    "Great Answer": "Posted answers that received significant upvotes",
    Moderator: "Helps maintain community standards and quality",
    "First Post": "Made their first post in the community",
    "Popular Thread": "Started a discussion with high engagement",
    "Dedicated Member": "Consistently active in the community",
  }

  return descriptions[badgeName] || "A recognition of contribution to the community"
}
