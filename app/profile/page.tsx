"use client"

import { useState } from "react"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { MessageSquare, Settings, User, FileText, Bell, BookOpen } from "lucide-react"

// Mock user data - would come from a database in a real app
const userData = {
  id: 1,
  username: "janesmith",
  name: "Jane Smith",
  avatar: "/placeholder.svg?height=100&width=100",
  email: "jane.smith@example.com",
  joinDate: new Date(2022, 5, 15),
  bio: "Full-stack developer passionate about React, Next.js, and building great user experiences. I love sharing knowledge and learning from the community.",
  location: "San Francisco, CA",
  website: "https://janesmith.dev",
  postCount: 253,
  threadCount: 42,
  reputation: 1876,
  badges: [
    { id: 1, name: "Helpful", count: 15, variant: "default" },
    { id: 2, name: "Great Answer", count: 8, variant: "secondary" },
    { id: 3, name: "First Post", count: 1, variant: "outline" },
  ],
}

// Mock activity data
const recentActivity = [
  {
    id: 1,
    type: "thread",
    title: "Best practices for React in 2025",
    category: "development",
    slug: "best-practices-react-2025",
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3), // 3 days ago
  },
  {
    id: 2,
    type: "reply",
    title: "How to optimize database queries for large datasets?",
    category: "development",
    slug: "optimize-database-queries-large-datasets",
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5), // 5 days ago
  },
  {
    id: 3,
    type: "reply",
    title: "Introducing myself: New developer from Toronto",
    category: "introductions",
    slug: "new-developer-toronto",
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7), // 7 days ago
  },
]

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-8 grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-1">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center text-center">
              <Avatar className="h-24 w-24">
                <AvatarImage src={userData.avatar || "/placeholder.svg"} alt={userData.name} />
                <AvatarFallback>{userData.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <h2 className="mt-4 text-2xl font-bold">{userData.name}</h2>
              <p className="text-muted-foreground">@{userData.username}</p>
              <div className="mt-2 flex flex-wrap justify-center gap-2">
                {userData.badges.map((badge) => (
                  <Badge key={badge.id} variant={badge.variant} className="px-2 py-1">
                    {badge.name} {badge.count > 1 && `× ${badge.count}`}
                  </Badge>
                ))}
              </div>
              <p className="mt-4 text-sm">{userData.bio}</p>
              <div className="mt-6 grid w-full grid-cols-3 gap-2 text-center">
                <div className="rounded-lg bg-muted p-2">
                  <p className="text-xl font-bold">{userData.postCount}</p>
                  <p className="text-xs text-muted-foreground">Posts</p>
                </div>
                <div className="rounded-lg bg-muted p-2">
                  <p className="text-xl font-bold">{userData.threadCount}</p>
                  <p className="text-xs text-muted-foreground">Threads</p>
                </div>
                <div className="rounded-lg bg-muted p-2">
                  <p className="text-xl font-bold">{userData.reputation}</p>
                  <p className="text-xs text-muted-foreground">Reputation</p>
                </div>
              </div>
              <div className="mt-6 w-full">
                <Button asChild variant="outline" className="w-full">
                  <Link href="/profile/edit">
                    <Settings className="mr-2 h-4 w-4" />
                    Edit Profile
                  </Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="md:col-span-2">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="mb-4 grid w-full grid-cols-4">
              <TabsTrigger value="overview">
                <User className="mr-2 h-4 w-4" />
                <span className="hidden sm:inline">Overview</span>
              </TabsTrigger>
              <TabsTrigger value="posts">
                <MessageSquare className="mr-2 h-4 w-4" />
                <span className="hidden sm:inline">Posts</span>
              </TabsTrigger>
              <TabsTrigger value="activity">
                <Bell className="mr-2 h-4 w-4" />
                <span className="hidden sm:inline">Activity</span>
              </TabsTrigger>
              <TabsTrigger value="bookmarks">
                <BookOpen className="mr-2 h-4 w-4" />
                <span className="hidden sm:inline">Bookmarks</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Overview</CardTitle>
                  <CardDescription>View your profile information and recent activity</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">About</h3>
                    <div className="grid gap-2">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">Joined:</span>
                        <span>{userData.joinDate.toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">Location:</span>
                        <span>{userData.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">Website:</span>
                        <a
                          href={userData.website}
                          className="text-primary hover:underline"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {userData.website}
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Recent Activity</h3>
                    <div className="space-y-3">
                      {recentActivity.map((activity) => (
                        <Link
                          key={activity.id}
                          href={`/forums/${activity.category}/${activity.slug}`}
                          className="block rounded-lg border p-3 transition-colors hover:bg-muted"
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium">{activity.title}</p>
                              <p className="text-sm text-muted-foreground">
                                {activity.type === "thread" ? "Created thread" : "Replied to thread"}
                              </p>
                            </div>
                            <p className="text-xs text-muted-foreground">{activity.date.toLocaleDateString()}</p>
                          </div>
                        </Link>
                      ))}
                    </div>
                    <Button asChild variant="outline" className="w-full">
                      <Link href="/profile/activity">View All Activity</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="posts">
              <Card>
                <CardHeader>
                  <CardTitle>Your Posts</CardTitle>
                  <CardDescription>View all your threads and replies</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="rounded-lg border p-4">
                      <h3 className="font-medium">Best practices for React in 2025</h3>
                      <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                        I've been working with React for a few years now and wanted to share some best practices I've
                        learned along the way...
                      </p>
                      <div className="mt-2 flex items-center justify-between">
                        <Badge>Thread</Badge>
                        <p className="text-xs text-muted-foreground">3 days ago</p>
                      </div>
                    </div>
                    <div className="rounded-lg border p-4">
                      <h3 className="font-medium">Re: How to optimize database queries for large datasets?</h3>
                      <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                        I've found that using proper indexing and query optimization techniques can make a huge
                        difference when dealing with large datasets...
                      </p>
                      <div className="mt-2 flex items-center justify-between">
                        <Badge variant="secondary">Reply</Badge>
                        <p className="text-xs text-muted-foreground">5 days ago</p>
                      </div>
                    </div>
                    <div className="rounded-lg border p-4">
                      <h3 className="font-medium">Re: Introducing myself: New developer from Toronto</h3>
                      <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                        Welcome to the community! I'm also based in the Bay Area and would be happy to connect and share
                        resources...
                      </p>
                      <div className="mt-2 flex items-center justify-between">
                        <Badge variant="secondary">Reply</Badge>
                        <p className="text-xs text-muted-foreground">7 days ago</p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 flex justify-center">
                    <Button variant="outline">Load More</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="activity">
              <Card>
                <CardHeader>
                  <CardTitle>Activity Feed</CardTitle>
                  <CardDescription>Your recent activity on the forum</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3 rounded-lg border p-3">
                      <FileText className="mt-0.5 h-5 w-5 text-muted-foreground" />
                      <div>
                        <p>
                          You created a new thread:{" "}
                          <Link href="#" className="font-medium hover:underline">
                            Best practices for React in 2025
                          </Link>
                        </p>
                        <p className="text-xs text-muted-foreground">3 days ago</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 rounded-lg border p-3">
                      <MessageSquare className="mt-0.5 h-5 w-5 text-muted-foreground" />
                      <div>
                        <p>
                          You replied to:{" "}
                          <Link href="#" className="font-medium hover:underline">
                            How to optimize database queries for large datasets?
                          </Link>
                        </p>
                        <p className="text-xs text-muted-foreground">5 days ago</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 rounded-lg border p-3">
                      <MessageSquare className="mt-0.5 h-5 w-5 text-muted-foreground" />
                      <div>
                        <p>
                          You replied to:{" "}
                          <Link href="#" className="font-medium hover:underline">
                            Introducing myself: New developer from Toronto
                          </Link>
                        </p>
                        <p className="text-xs text-muted-foreground">7 days ago</p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 flex justify-center">
                    <Button variant="outline">Load More</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="bookmarks">
              <Card>
                <CardHeader>
                  <CardTitle>Bookmarked Threads</CardTitle>
                  <CardDescription>Threads you've saved for later</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="rounded-lg border p-4">
                      <h3 className="font-medium">Microservices vs Monolith: Which approach is better for startups?</h3>
                      <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                        I'm planning the architecture for a new startup and wondering which approach to take...
                      </p>
                      <div className="mt-2 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-5 w-5">
                            <AvatarFallback>SR</AvatarFallback>
                          </Avatar>
                          <span className="text-xs text-muted-foreground">Sophia Rodriguez</span>
                        </div>
                        <p className="text-xs text-muted-foreground">1 day ago</p>
                      </div>
                    </div>
                    <div className="rounded-lg border p-4">
                      <h3 className="font-medium">The future of AI in web development</h3>
                      <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                        With the rapid advancement of AI tools, how do you think web development will change in the next
                        5 years?
                      </p>
                      <div className="mt-2 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-5 w-5">
                            <AvatarFallback>MJ</AvatarFallback>
                          </Avatar>
                          <span className="text-xs text-muted-foreground">Michael Jordan</span>
                        </div>
                        <p className="text-xs text-muted-foreground">3 days ago</p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 flex justify-center">
                    <Button variant="outline">Load More</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
