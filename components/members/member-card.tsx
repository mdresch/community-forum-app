import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Award, Calendar, MapPin, MessageSquare, User } from "lucide-react"

interface MemberCardProps {
  member: {
    id: number
    name: string
    username: string
    avatar: string
    role: string
    joinDate: string
    reputation: number
    posts: number
    badges: string[]
    online: boolean
    bio: string
    location: string
    website: string
    lastActive: string
  }
}

export function MemberCard({ member }: MemberCardProps) {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="relative p-0">
        <div className="absolute right-2 top-2 z-10">
          {member.online && (
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
          )}
        </div>
        <div className="bg-gradient-to-b from-primary/20 to-muted/20 p-6 text-center">
          <Avatar className="mx-auto h-20 w-20 border-4 border-background">
            <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
            <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <h3 className="mt-2 text-lg font-semibold">{member.name}</h3>
          <p className="text-sm text-muted-foreground">@{member.username}</p>
          <div className="mt-2">
            <Badge variant={getRoleBadgeVariant(member.role)}>{member.role}</Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="mb-4 flex flex-wrap gap-1">
          {member.badges.slice(0, 3).map((badge, index) => (
            <Badge key={index} variant="outline" className="text-xs">
              {badge}
            </Badge>
          ))}
          {member.badges.length > 3 && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Badge variant="outline" className="text-xs">
                    +{member.badges.length - 3} more
                  </Badge>
                </TooltipTrigger>
                <TooltipContent>
                  <div className="space-y-1">
                    {member.badges.slice(3).map((badge, index) => (
                      <p key={index}>{badge}</p>
                    ))}
                  </div>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>

        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2">
            <Award className="h-4 w-4 text-muted-foreground" />
            <span>
              <strong>{member.reputation.toLocaleString()}</strong> reputation
            </span>
          </div>
          <div className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
            <span>
              <strong>{member.posts.toLocaleString()}</strong> posts
            </span>
          </div>
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
        </div>

        <div className="mt-4">
          <p className="line-clamp-3 text-sm text-muted-foreground">{member.bio}</p>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between border-t bg-muted/50 p-4">
        <div className="text-xs text-muted-foreground">Active: {member.lastActive}</div>
        <Link href={`/members/${member.username}`}>
          <Button size="sm" variant="outline">
            <User className="mr-2 h-3 w-3" />
            Profile
          </Button>
        </Link>
      </CardFooter>
    </Card>
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
