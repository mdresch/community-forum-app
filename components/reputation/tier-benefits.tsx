"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  CheckCircle2,
  Lock,
  Award,
  Users,
  ShieldCheck,
  FileEdit,
  Eye,
  MessageSquare,
  Calendar,
  TrendingUp,
} from "lucide-react"

// Define tiers with their benefits
const tiers = [
  {
    level: 1,
    name: "Newcomer",
    requiredPoints: 0,
    color: "bg-zinc-200 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200",
    benefits: [
      { name: "Create threads and replies", available: true, icon: <MessageSquare className="h-4 w-4" /> },
      { name: "Vote on polls", available: true, icon: <CheckCircle2 className="h-4 w-4" /> },
      { name: "Access to public forums", available: true, icon: <Users className="h-4 w-4" /> },
    ],
  },
  {
    level: 2,
    name: "Contributor",
    requiredPoints: 100,
    color: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100",
    benefits: [
      { name: "Create polls", available: true, icon: <CheckCircle2 className="h-4 w-4" /> },
      { name: "Like/upvote content", available: true, icon: <TrendingUp className="h-4 w-4" /> },
      { name: "Participate in beta features", available: false, icon: <Eye className="h-4 w-4" /> },
    ],
  },
  {
    level: 3,
    name: "Regular",
    requiredPoints: 500,
    color: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100",
    benefits: [
      { name: "Create multiple polls per thread", available: true, icon: <CheckCircle2 className="h-4 w-4" /> },
      { name: "Downvote content", available: true, icon: <TrendingUp className="h-4 w-4" /> },
      { name: "Edit posts for longer period", available: true, icon: <FileEdit className="h-4 w-4" /> },
    ],
  },
  {
    level: 4,
    name: "Established",
    requiredPoints: 1000,
    color: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100",
    benefits: [
      { name: "Create forum events", available: true, icon: <Calendar className="h-4 w-4" /> },
      { name: "Access to specialized forums", available: true, icon: <Users className="h-4 w-4" /> },
      { name: "Feature polls on profile", available: true, icon: <Award className="h-4 w-4" /> },
    ],
  },
  {
    level: 5,
    name: "Trusted",
    requiredPoints: 2000,
    color: "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-100",
    benefits: [
      { name: "Access to exclusive lounges", available: true, icon: <Users className="h-4 w-4" /> },
      { name: "Increased vote weight (1.5x)", available: true, icon: <TrendingUp className="h-4 w-4" /> },
      { name: "Content moderation abilities", available: true, icon: <ShieldCheck className="h-4 w-4" /> },
    ],
  },
  {
    level: 6,
    name: "Expert",
    requiredPoints: 5000,
    color: "bg-sky-100 text-sky-800 dark:bg-sky-900 dark:text-sky-100",
    benefits: [
      { name: "Access to all exclusive areas", available: true, icon: <CheckCircle2 className="h-4 w-4" /> },
      { name: "Host AMAs and specials", available: true, icon: <Users className="h-4 w-4" /> },
      { name: "Increased vote weight (2x)", available: true, icon: <TrendingUp className="h-4 w-4" /> },
    ],
  },
  {
    level: 7,
    name: "Veteran",
    requiredPoints: 10000,
    color: "bg-rose-100 text-rose-800 dark:bg-rose-900 dark:text-rose-100",
    benefits: [
      { name: "Forum beta tester role", available: true, icon: <Eye className="h-4 w-4" /> },
      { name: "Advanced moderation tools", available: true, icon: <ShieldCheck className="h-4 w-4" /> },
      { name: "Custom profile flair", available: true, icon: <Award className="h-4 w-4" /> },
    ],
  },
  {
    level: 8,
    name: "Guru",
    requiredPoints: 25000,
    color: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100",
    benefits: [
      { name: "Featured on community highlights", available: true, icon: <Award className="h-4 w-4" /> },
      { name: "Direct line to admins", available: true, icon: <MessageSquare className="h-4 w-4" /> },
      { name: "Mentorship program access", available: true, icon: <Users className="h-4 w-4" /> },
    ],
  },
  {
    level: 9,
    name: "Legend",
    requiredPoints: 50000,
    color: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-100",
    benefits: [
      { name: "Input on forum roadmap", available: true, icon: <FileEdit className="h-4 w-4" /> },
      { name: "Legacy status for life", available: true, icon: <Award className="h-4 w-4" /> },
      { name: "Unlimited polls creation", available: true, icon: <CheckCircle2 className="h-4 w-4" /> },
    ],
  },
  {
    level: 10,
    name: "Moderator",
    requiredPoints: "Special",
    color: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-100",
    benefits: [
      { name: "Full moderation capabilities", available: true, icon: <ShieldCheck className="h-4 w-4" /> },
      { name: "Access to admin tools", available: true, icon: <Lock className="h-4 w-4" /> },
      { name: "Forum maintenance abilities", available: true, icon: <FileEdit className="h-4 w-4" /> },
    ],
  },
]

export function TierBenefits({ userLevel = 4, userReputation = 1876 }) {
  // Get user's current tier
  const currentTier = tiers.find((tier) => tier.level === userLevel)

  // Get next tier
  const nextTier = tiers.find((tier) => tier.level === userLevel + 1)

  // Calculate percentage to next level
  const calculateProgress = () => {
    if (!nextTier || typeof nextTier.requiredPoints !== "number") return 100

    // Previous tier required points
    const prevRequired = userLevel > 1 ? tiers.find((t) => t.level === userLevel)?.requiredPoints : 0
    if (typeof prevRequired !== "number") return 0

    // Points needed for next level
    const totalNeeded = nextTier.requiredPoints - prevRequired
    const userProgress = userReputation - prevRequired

    return Math.min(Math.round((userProgress / totalNeeded) * 100), 100)
  }

  return (
    <div className="space-y-6">
      <div className="rounded-lg border bg-card p-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h3 className="text-2xl font-bold">
                Level {userLevel}: {currentTier?.name}
              </h3>
              <p className="text-sm text-muted-foreground">
                {nextTier
                  ? `${userReputation.toLocaleString()} / ${nextTier?.requiredPoints?.toLocaleString()} reputation points`
                  : `${userReputation.toLocaleString()} reputation points`}
              </p>
            </div>
            <Badge className={currentTier?.color}>{currentTier?.name}</Badge>
          </div>

          {nextTier && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm font-medium">
                <span>Progress to {nextTier.name}</span>
                <span>{calculateProgress()}%</span>
              </div>
              <Progress value={calculateProgress()} className="h-2" />
              {typeof nextTier.requiredPoints === "number" && (
                <p className="text-xs text-muted-foreground">
                  {nextTier.requiredPoints - userReputation} more points needed to reach level {nextTier.level}
                </p>
              )}
            </div>
          )}
        </div>
      </div>

      <Tabs defaultValue="all">
        <TabsList className="mb-4">
          <TabsTrigger value="all">All Tiers</TabsTrigger>
          <TabsTrigger value="current">Current Benefits</TabsTrigger>
          <TabsTrigger value="next">Next Tier</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {tiers.map((tier) => (
              <Card
                key={tier.level}
                className={
                  tier.level === userLevel ? "border-primary" : tier.level < userLevel ? "opacity-80" : "opacity-60"
                }
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">
                      {tier.level}. {tier.name}
                    </CardTitle>
                    <Badge className={tier.color}>
                      {tier.requiredPoints === "Special" ? "Special" : `${tier.requiredPoints}+ pts`}
                    </Badge>
                  </div>
                  <CardDescription>
                    {tier.level === userLevel
                      ? "Your current tier"
                      : tier.level < userLevel
                        ? "Unlocked tier"
                        : "Locked tier"}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pb-3">
                  <ul className="space-y-2">
                    {tier.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-center gap-2 text-sm">
                        {tier.level <= userLevel ? (
                          <CheckCircle2 className="h-4 w-4 text-green-500" />
                        ) : (
                          <Lock className="h-4 w-4 text-muted-foreground" />
                        )}
                        <span className={tier.level > userLevel ? "text-muted-foreground" : ""}>{benefit.name}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="current" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Your Active Benefits at Level {userLevel}</CardTitle>
              <CardDescription>These are all the privileges you currently have access to</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {tiers
                  .filter((tier) => tier.level <= userLevel)
                  .flatMap((tier) =>
                    tier.benefits.map((benefit, index) => (
                      <li key={`${tier.level}-${index}`} className="flex items-start gap-3 rounded-md border p-3">
                        <div className="rounded-full bg-primary/10 p-1 text-primary">{benefit.icon}</div>
                        <div>
                          <div className="font-medium">{benefit.name}</div>
                          <div className="text-sm text-muted-foreground">
                            Unlocked at Level {tier.level} ({tier.name})
                          </div>
                        </div>
                      </li>
                    )),
                  )}
              </ul>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="next" className="space-y-4">
          {nextTier ? (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>
                      Next Tier: Level {nextTier.level} - {nextTier.name}
                    </CardTitle>
                    <CardDescription>Unlock these benefits by earning more reputation</CardDescription>
                  </div>
                  <Badge className={nextTier.color}>
                    {typeof nextTier.requiredPoints === "number"
                      ? `${nextTier.requiredPoints}+ pts`
                      : nextTier.requiredPoints}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm font-medium">
                      <span>Progress to {nextTier.name}</span>
                      <span>{calculateProgress()}%</span>
                    </div>
                    <Progress value={calculateProgress()} className="h-2" />
                    {typeof nextTier.requiredPoints === "number" && (
                      <p className="text-sm text-muted-foreground">
                        {nextTier.requiredPoints - userReputation} more points needed
                      </p>
                    )}
                  </div>

                  <div className="rounded-lg border bg-muted/50 p-4">
                    <h4 className="mb-2 font-medium">New Benefits You'll Unlock</h4>
                    <ul className="space-y-2">
                      {nextTier.benefits.map((benefit, index) => (
                        <li key={index} className="flex items-center gap-2 text-sm">
                          <Lock className="h-4 w-4 text-muted-foreground" />
                          <span>{benefit.name}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="border-t bg-muted/10 px-6 py-4">
                <div className="space-y-1">
                  <h4 className="text-sm font-medium">How to earn reputation points:</h4>
                  <ul className="text-xs text-muted-foreground">
                    <li>• +5 points when your post receives an upvote</li>
                    <li>• +15 points when your answer is accepted</li>
                    <li>• +25 points when your poll is featured</li>
                    <li>• +10 points when you participate regularly</li>
                    <li>• +50 points when you earn a badge</li>
                  </ul>
                </div>
              </CardFooter>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>Maximum Level Reached</CardTitle>
                <CardDescription>Congratulations! You've reached the highest user level</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center justify-center py-6 text-center">
                  <Award className="h-16 w-16 text-primary" />
                  <h3 className="mt-4 text-xl font-bold">Legend Status Achieved</h3>
                  <p className="mt-2 text-muted-foreground">
                    You've unlocked all available benefits and privileges in the community
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
