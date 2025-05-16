"use client"

import { useState } from "react"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Calendar, Flag, Globe, Mail, MapPin, Share2, Shield, User } from "lucide-react"
import { MemberActivityFeed } from "./member-activity-feed"
import { MemberThreads } from "./member-threads"
import { MemberBadges } from "./member-badges"
import { MemberReputation } from "./member-reputation"

interface MemberProfileProps {
  member: any // In a real app, you'd have a proper type here
}

export function MemberProfile({ member }: MemberProfileProps) {
  const [isFollowing, setIsFollowing] = useState(false)

  return (
    <div className="container py-6 md:py-10">
      <div className="grid gap-6 md:grid-cols-3">
        {/* Sidebar with member info */}
        <div className="space-y-6">
          <Card>
            <CardHeader className="relative pb-0 pt-6 text-center">
              {member.online && (
                <div className="absolute right-4 top-4">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="h-3 w-3 rounded-full bg-green-500 ring-2 ring-white" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Online Now</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              )}
              <Avatar className="mx-auto h-24 w-24 border-4 border-background">
                <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <CardTitle className="mt-4">{member.name}</CardTitle>
              <CardDescription>@{member.username}</CardDescription>
              <div className="mt-2 flex justify-center gap-2">
                <Badge variant={getRoleBadgeVariant(member.role)}>{member.role}</Badge>
                {member.verified && <Badge variant="outline">Verified</Badge>}
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">{member.bio}</p>
                </div>

                <Separator />

                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-2xl font-bold">{member.posts.toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground">Posts</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{member.reputation.toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground">Reputation</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{member.followers.toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground">Followers</p>
                  </div>
                </div>

                <Separator />

                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>Joined {member.joinDate}</span>
                  </div>
                  {member.location && (
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span>{member.location}</span>
                    </div>
                  )}
                  {member.website && (
                    <div className="flex items-center gap-2">
                      <Globe className="h-4 w-4 text-muted-foreground" />
                      <a
                        href={member.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                      >
                        {member.website.replace(/^https?:\/\//, "")}
                      </a>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-muted-foreground" />
                    <span>Trust Level: {member.trustLevel}</span>
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <p className="text-xs font-medium">Reputation Level: {member.reputationLevel}</p>
                  <div className="space-y-1">
                    <Progress value={member.reputationProgress} className="h-2" />
                    <p className="text-xs text-muted-foreground text-right">
                      {member.reputationPoints}/{member.nextLevelPoints} points to next level
                    </p>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <Button variant={isFollowing ? "outline" : "default"} onClick={() => setIsFollowing(!isFollowing)}>
                    <User className="mr-2 h-4 w-4" />
                    {isFollowing ? "Following" : "Follow"}
                  </Button>
                  <Button variant="outline">
                    <Mail className="mr-2 h-4 w-4" />
                    Message
                  </Button>
                  <div className="grid grid-cols-2 gap-2">
                    <Button variant="outline" size="sm">
                      <Share2 className="mr-2 h-4 w-4" />
                      Share
                    </Button>
                    <Button variant="outline" size="sm">
                      <Flag className="mr-2 h-4 w-4" />
                      Report
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Top Badges</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              {member.badges.slice(0, 6).map((badge: string, index: number) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {badge}
                </Badge>
              ))}
              {member.badges.length > 6 && (
                <Link href="#badges" className="text-xs text-primary hover:underline">
                  +{member.badges.length - 6} more
                </Link>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Main content area with tabs */}
        <div className="md:col-span-2">
          <Tabs defaultValue="activity" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="activity">Activity</TabsTrigger>
              <TabsTrigger value="threads">Threads</TabsTrigger>
              <TabsTrigger value="badges">Badges</TabsTrigger>
              <TabsTrigger value="reputation">Reputation</TabsTrigger>
            </TabsList>
            <TabsContent value="activity" className="mt-6">
              <MemberActivityFeed activities={member.activities} />
            </TabsContent>
            <TabsContent value="threads" className="mt-6">
              <MemberThreads threads={member.threads} />
            </TabsContent>
            <TabsContent value="badges" className="mt-6">
              <MemberBadges badges={member.badges} />
            </TabsContent>
            <TabsContent value="reputation" className="mt-6">
              <MemberReputation reputation={member.reputationHistory} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

function getRoleBadgeVariant(role: string): "default" | "secondary" | "outline" | "destructive" {
  switch (role.toLowerCase()) {
    case "admin":
      return "default"
    case "moderator":
      return "secondary"
    case "elite member":
      return "destructive"
    default:
      return "outline"
  }
}
