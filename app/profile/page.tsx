"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { MessageSquare, Settings, User, FileText, Bell, BookOpen } from "lucide-react"
import { users } from "@/lib/api"
import { useAuth } from "@/hooks/useAuth"

export default function ProfilePage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProfile() {
      if (!user) return;
      setLoading(true);
      setError(null);
      try {
        const data = await users.getProfile(user.id);
        setProfile(data);
      } catch (err: any) {
        setError(err.message || "Failed to load profile");
      } finally {
        setLoading(false);
      }
    }
    fetchProfile();
  }, [user]);

  if (!user) {
    return <div className="container mx-auto px-4 py-6">Please log in to view your profile.</div>;
  }
  if (loading) {
    return <div className="container mx-auto px-4 py-6">Loading profile...</div>;
  }
  if (error) {
    return <div className="container mx-auto px-4 py-6 text-red-500">{error}</div>;
  }
  if (!profile) {
    return null;
  }
  const userData = profile.user;
  const joinDate = userData.joinDate instanceof Date
    ? userData.joinDate
    : new Date(userData.joinDate);
  const recentActivity = profile.recentActivity || [];
  const threads = profile.threads || [];
  const posts = profile.posts || [];

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
                {userData.badges.map((badge: { id: string; name: string; variant?: "default" | "secondary" | "outline" | "destructive" | null; count?: number }) => (
                  <Badge key={badge.id} variant={badge.variant ?? undefined} className="px-2 py-1">
                    {badge.name} {badge.count && badge.count > 1 && `× ${badge.count}`}
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
                        <span>{new Date(userData.joinDate).toLocaleDateString()}</span>
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
                      {recentActivity.map((activity: { id: string; category: string; slug: string; title: string; type: string; date: string | Date }) => (
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
                            <p className="text-xs text-muted-foreground">{new Date(activity.date).toLocaleDateString()}</p>
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
                    {threads.map((thread: { id: string; title: string; content: string; createdAt: string | Date }) => (
                      <div key={thread.id} className="rounded-lg border p-4">
                        <h3 className="font-medium">{thread.title}</h3>
                        <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                          {thread.content}
                        </p>
                        <div className="mt-2 flex items-center justify-between">
                          <Badge>Thread</Badge>
                          <p className="text-xs text-muted-foreground">{new Date(thread.createdAt).toLocaleDateString()}</p>
                        </div>
                      </div>
                    ))}
                    {posts.map((post: { id: string; threadTitle: string; content: string; createdAt: string | Date }) => (
                      <div key={post.id} className="rounded-lg border p-4">
                        <h3 className="font-medium">Re: {post.threadTitle}</h3>
                        <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                          {post.content}
                        </p>
                        <div className="mt-2 flex items-center justify-between">
                          <Badge variant="secondary">Reply</Badge>
                          <p className="text-xs text-muted-foreground">{new Date(post.createdAt).toLocaleDateString()}</p>
                        </div>
                      </div>
                    ))}
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
                    {recentActivity.map((activity: { id: string; category: string; slug: string; title: string; type: string; date: string | Date }) => (
                      <div key={activity.id} className="flex items-start gap-3 rounded-lg border p-3">
                        <FileText className="mt-0.5 h-5 w-5 text-muted-foreground" />
                        <div>
                          <p>
                            {activity.type === "thread" ? "You created a new thread: " : "You replied to: "}
                            <Link href={`/forums/${activity.category}/${activity.slug}`} className="font-medium hover:underline">
                              {activity.title}
                            </Link>
                          </p>
                          <p className="text-xs text-muted-foreground">{new Date(activity.date).toLocaleDateString()}</p>
                        </div>
                      </div>
                    ))}
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
