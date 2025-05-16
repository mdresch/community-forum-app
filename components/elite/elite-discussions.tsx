"use client"

import { useState } from "react"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Calendar,
  MessageSquare,
  Users,
  Star,
  Lock,
  Shield,
  Clock,
  Filter,
  MoreHorizontal,
  PlusCircle,
  Crown,
  ChevronDown,
} from "lucide-react"
import { formatDistanceToNow } from "date-fns"

// Mock data for elite discussions
const eliteDiscussions = [
  {
    id: 1,
    title: "Future of Web Development: 2026 and Beyond",
    author: {
      name: "Jane Smith",
      avatar: "/placeholder.svg?height=40&width=40",
      reputation: 12540,
      level: 8,
    },
    category: "Expert Roundtable",
    replies: 42,
    views: 128,
    lastActivity: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    tags: ["future", "webdev", "trends"],
    tier: "expert", // requires level 6+
    isAMA: false,
    isPinned: true,
    slug: "future-web-development-2026",
  },
  {
    id: 2,
    title: "AMA with David Miller, CTO at TechForward Inc.",
    author: {
      name: "Admin",
      avatar: "/placeholder.svg?height=40&width=40",
      reputation: 35000,
      level: 10,
    },
    category: "AMA Session",
    replies: 86,
    views: 312,
    lastActivity: new Date(Date.now() - 1000 * 60 * 60 * 3), // 3 hours ago
    tags: ["ama", "career", "leadership"],
    tier: "trusted", // requires level 5+
    isAMA: true,
    isPinned: true,
    slug: "ama-david-miller-cto",
  },
  {
    id: 3,
    title: "Early Beta Access: New Forum Features Discussion",
    author: {
      name: "Sarah Chen",
      avatar: "/placeholder.svg?height=40&width=40",
      reputation: 8970,
      level: 7,
    },
    category: "Beta Testing",
    replies: 29,
    views: 98,
    lastActivity: new Date(Date.now() - 1000 * 60 * 60 * 12), // 12 hours ago
    tags: ["beta", "feedback", "features"],
    tier: "veteran", // requires level 7+
    isAMA: false,
    isPinned: false,
    slug: "beta-access-new-forum-features",
  },
  {
    id: 4,
    title: "Community Roadmap Planning Session for Q3 2025",
    author: {
      name: "Alex Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
      reputation: 25640,
      level: 9,
    },
    category: "Planning",
    replies: 37,
    views: 145,
    lastActivity: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    tags: ["roadmap", "planning", "community"],
    tier: "legend", // requires level 9+
    isAMA: false,
    isPinned: true,
    slug: "community-roadmap-q3-2025",
  },
  {
    id: 5,
    title: "Mentor-Mentee Matching Program Discussion",
    author: {
      name: "Emma Wilson",
      avatar: "/placeholder.svg?height=40&width=40",
      reputation: 17820,
      level: 8,
    },
    category: "Mentorship",
    replies: 24,
    views: 87,
    lastActivity: new Date(Date.now() - 1000 * 60 * 60 * 36), // 36 hours ago
    tags: ["mentorship", "career", "learning"],
    tier: "guru", // requires level 8+
    isAMA: false,
    isPinned: false,
    slug: "mentor-mentee-matching-program",
  },
]

// Upcoming AMAs and special events
const upcomingEvents = [
  {
    id: 1,
    title: "AMA with Maria Garcia, AI Researcher at OpenAI",
    date: new Date(Date.now() + 1000 * 60 * 60 * 24 * 3), // 3 days from now
    description:
      "Join us for an exclusive AMA session with Maria Garcia, discussing the latest developments in AI research and applications.",
    tier: "trusted", // requires level 5+
    host: {
      name: "Maria Garcia",
      avatar: "/placeholder.svg?height=40&width=40",
      title: "AI Researcher, OpenAI",
    },
  },
  {
    id: 2,
    title: "Product Feedback Session: New Editor Features",
    date: new Date(Date.now() + 1000 * 60 * 60 * 24 * 5), // 5 days from now
    description:
      "Get early access to our upcoming editor features and provide direct feedback to the development team.",
    tier: "veteran", // requires level 7+
    host: {
      name: "Dev Team",
      avatar: "/placeholder.svg?height=40&width=40",
      title: "Product Development",
    },
  },
  {
    id: 3,
    title: "Community Strategy Workshop",
    date: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7), // 7 days from now
    description:
      "Help shape the future of our community in this collaborative workshop with admins and community leaders.",
    tier: "legend", // requires level 9+
    host: {
      name: "Admin Team",
      avatar: "/placeholder.svg?height=40&width=40",
      title: "Community Leadership",
    },
  },
]

export function EliteDiscussions({ userLevel = 6 }) {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [newDiscussionTitle, setNewDiscussionTitle] = useState("")
  const [newDiscussionContent, setNewDiscussionContent] = useState("")
  const [selectedTier, setSelectedTier] = useState("expert")

  // Filter discussions based on user's level
  const accessibleDiscussions = eliteDiscussions.filter((discussion) => {
    const tierLevels = {
      trusted: 5,
      expert: 6,
      veteran: 7,
      guru: 8,
      legend: 9,
      moderator: 10,
    }
    return userLevel >= tierLevels[discussion.tier]
  })

  // Filter upcoming events based on user's level
  const accessibleEvents = upcomingEvents.filter((event) => {
    const tierLevels = {
      trusted: 5,
      expert: 6,
      veteran: 7,
      guru: 8,
      legend: 9,
      moderator: 10,
    }
    return userLevel >= tierLevels[event.tier]
  })

  const handleCreateDiscussion = (e) => {
    e.preventDefault()
    // In a real app, this would send the discussion data to the server
    console.log({
      title: newDiscussionTitle,
      content: newDiscussionContent,
      tier: selectedTier,
    })
    setIsCreateDialogOpen(false)
    setNewDiscussionTitle("")
    setNewDiscussionContent("")
  }

  const getTierBadgeColor = (tier) => {
    const tierColors = {
      trusted: "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-100",
      expert: "bg-sky-100 text-sky-800 dark:bg-sky-900 dark:text-sky-100",
      veteran: "bg-rose-100 text-rose-800 dark:bg-rose-900 dark:text-rose-100",
      guru: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100",
      legend: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-100",
      moderator: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-100",
    }
    return tierColors[tier] || "bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-100"
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Elite Discussion Areas</h1>
          <p className="text-muted-foreground">Exclusive spaces for high-reputation community members</p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              New Discussion
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[625px]">
            <DialogHeader>
              <DialogTitle>Create Elite Discussion</DialogTitle>
              <DialogDescription>
                Start a new discussion in one of the exclusive areas based on your reputation level
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleCreateDiscussion}>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <label htmlFor="title" className="text-sm font-medium">
                    Discussion Title
                  </label>
                  <Input
                    id="title"
                    placeholder="Enter a clear, specific title for your discussion"
                    value={newDiscussionTitle}
                    onChange={(e) => setNewDiscussionTitle(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="content" className="text-sm font-medium">
                    Initial Post
                  </label>
                  <Textarea
                    id="content"
                    placeholder="Share your thoughts, questions, or insights..."
                    className="min-h-[150px]"
                    value={newDiscussionContent}
                    onChange={(e) => setNewDiscussionContent(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="tier" className="text-sm font-medium">
                    Access Level
                  </label>
                  <select
                    id="tier"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    value={selectedTier}
                    onChange={(e) => setSelectedTier(e.target.value)}
                  >
                    {userLevel >= 5 && <option value="trusted">Trusted Members (Level 5+)</option>}
                    {userLevel >= 6 && <option value="expert">Expert Members (Level 6+)</option>}
                    {userLevel >= 7 && <option value="veteran">Veteran Members (Level 7+)</option>}
                    {userLevel >= 8 && <option value="guru">Guru Members (Level 8+)</option>}
                    {userLevel >= 9 && <option value="legend">Legend Members (Level 9+)</option>}
                    {userLevel >= 10 && <option value="moderator">Moderators Only (Level 10)</option>}
                  </select>
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Create Discussion</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Crown className="h-5 w-5 text-yellow-500" />
              <CardTitle>Your Elite Access</CardTitle>
            </div>
            <Badge variant="outline" className="px-2 py-1">
              Level {userLevel}
            </Badge>
          </div>
          <CardDescription>You have access to the following exclusive areas based on your reputation</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {userLevel >= 5 && (
              <div className="flex items-start gap-3 rounded-lg border p-3">
                <div className={`rounded-full p-1.5 ${getTierBadgeColor("trusted")}`}>
                  <Lock className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="font-medium">Trusted Lounge</h3>
                  <p className="text-xs text-muted-foreground">For Level 5+ members</p>
                </div>
              </div>
            )}
            {userLevel >= 6 && (
              <div className="flex items-start gap-3 rounded-lg border p-3">
                <div className={`rounded-full p-1.5 ${getTierBadgeColor("expert")}`}>
                  <MessageSquare className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="font-medium">Expert Roundtables</h3>
                  <p className="text-xs text-muted-foreground">For Level 6+ members</p>
                </div>
              </div>
            )}
            {userLevel >= 7 && (
              <div className="flex items-start gap-3 rounded-lg border p-3">
                <div className={`rounded-full p-1.5 ${getTierBadgeColor("veteran")}`}>
                  <Star className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="font-medium">Beta Testing Group</h3>
                  <p className="text-xs text-muted-foreground">For Level 7+ members</p>
                </div>
              </div>
            )}
            {userLevel >= 8 && (
              <div className="flex items-start gap-3 rounded-lg border p-3">
                <div className={`rounded-full p-1.5 ${getTierBadgeColor("guru")}`}>
                  <Users className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="font-medium">Mentorship Circle</h3>
                  <p className="text-xs text-muted-foreground">For Level 8+ members</p>
                </div>
              </div>
            )}
            {userLevel >= 9 && (
              <div className="flex items-start gap-3 rounded-lg border p-3">
                <div className={`rounded-full p-1.5 ${getTierBadgeColor("legend")}`}>
                  <Calendar className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="font-medium">Planning Committee</h3>
                  <p className="text-xs text-muted-foreground">For Level 9+ members</p>
                </div>
              </div>
            )}
            {userLevel >= 10 && (
              <div className="flex items-start gap-3 rounded-lg border p-3">
                <div className={`rounded-full p-1.5 ${getTierBadgeColor("moderator")}`}>
                  <Shield className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="font-medium">Moderators' Area</h3>
                  <p className="text-xs text-muted-foreground">For Level 10 members</p>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="discussions">
        <TabsList className="mb-4">
          <TabsTrigger value="discussions">Discussions</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming Events</TabsTrigger>
        </TabsList>

        <TabsContent value="discussions">
          <Card>
            <CardHeader>
              <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
                <CardTitle>Elite Discussions</CardTitle>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Filter className="mr-2 h-4 w-4" />
                    Filter
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm">
                        Sort By <ChevronDown className="ml-2 h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Most Recent</DropdownMenuItem>
                      <DropdownMenuItem>Most Active</DropdownMenuItem>
                      <DropdownMenuItem>Most Viewed</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {accessibleDiscussions.length > 0 ? (
                  accessibleDiscussions.map((discussion) => (
                    <div
                      key={discussion.id}
                      className={`rounded-lg border p-4 transition-colors hover:bg-muted ${
                        discussion.isPinned ? "border-primary/50 bg-primary/5" : ""
                      }`}
                    >
                      <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-start">
                        <div className="space-y-1">
                          <div className="flex flex-wrap items-center gap-2">
                            {discussion.isPinned && (
                              <Badge variant="outline" className="text-xs font-normal">
                                Pinned
                              </Badge>
                            )}
                            {discussion.isAMA && (
                              <Badge variant="secondary" className="text-xs font-normal">
                                AMA
                              </Badge>
                            )}
                            <Badge className={getTierBadgeColor(discussion.tier)}>
                              {discussion.tier.charAt(0).toUpperCase() + discussion.tier.slice(1)}
                            </Badge>
                            <Badge variant="outline">{discussion.category}</Badge>
                          </div>
                          <Link
                            href={`/elite-discussions/${discussion.slug}`}
                            className="block font-medium hover:underline"
                          >
                            {discussion.title}
                          </Link>
                          <div className="flex items-center gap-2 text-sm">
                            <Avatar className="h-5 w-5">
                              <AvatarImage
                                src={discussion.author.avatar || "/placeholder.svg"}
                                alt={discussion.author.name}
                              />
                              <AvatarFallback>{discussion.author.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <span>
                              {discussion.author.name} · Level {discussion.author.level}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <MessageSquare className="h-4 w-4" />
                            <span>{discussion.replies}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="h-4 w-4" />
                            <span>{discussion.views}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            <span>{formatDistanceToNow(discussion.lastActivity, { addSuffix: true })}</span>
                          </div>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">More</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem>Bookmark</DropdownMenuItem>
                              <DropdownMenuItem>Share</DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem>Report</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="flex flex-col items-center justify-center rounded-lg border bg-muted/50 p-8 text-center">
                    <Lock className="h-12 w-12 text-muted-foreground" />
                    <h3 className="mt-4 text-lg font-medium">No Accessible Discussions</h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Earn more reputation to unlock elite discussion areas
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
            {accessibleDiscussions.length > 0 && (
              <CardFooter className="flex justify-center border-t px-6 py-4">
                <Button variant="outline">Load More</Button>
              </CardFooter>
            )}
          </Card>
        </TabsContent>

        <TabsContent value="upcoming">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming AMAs & Special Events</CardTitle>
              <CardDescription>Exclusive events for high-reputation community members</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {accessibleEvents.length > 0 ? (
                  accessibleEvents.map((event) => (
                    <div key={event.id} className="rounded-lg border p-4">
                      <div className="flex flex-col justify-between gap-4 sm:flex-row">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <Badge className={getTierBadgeColor(event.tier)}>
                              {event.tier.charAt(0).toUpperCase() + event.tier.slice(1)}+
                            </Badge>
                            <Badge variant="outline">
                              <Calendar className="mr-1 h-3 w-3" />
                              {event.date.toLocaleDateString(undefined, {
                                weekday: "long",
                                month: "short",
                                day: "numeric",
                              })}
                            </Badge>
                            <Badge variant="outline">
                              <Clock className="mr-1 h-3 w-3" />
                              {event.date.toLocaleTimeString(undefined, {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </Badge>
                          </div>
                          <h3 className="font-medium">{event.title}</h3>
                          <p className="text-sm text-muted-foreground">{event.description}</p>
                        </div>

                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={event.host.avatar || "/placeholder.svg"} alt={event.host.name} />
                            <AvatarFallback>{event.host.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{event.host.name}</div>
                            <div className="text-xs text-muted-foreground">{event.host.title}</div>
                          </div>
                        </div>
                      </div>
                      <div className="mt-4 flex justify-end">
                        <Button>RSVP to Event</Button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="flex flex-col items-center justify-center rounded-lg border bg-muted/50 p-8 text-center">
                    <Calendar className="h-12 w-12 text-muted-foreground" />
                    <h3 className="mt-4 text-lg font-medium">No Upcoming Events</h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Earn more reputation to access exclusive community events
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
