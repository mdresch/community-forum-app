import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { UserReputation } from "@/components/voting/user-reputation"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { ThumbsUp, MessageSquare, Award, Trophy, Star, Shield, Zap, TrendingUp, Users } from "lucide-react"

export default function ReputationPage() {
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Reputation & Badges</h1>
        <p className="text-muted-foreground">Track your contributions and achievements in the community</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2">
          <Tabs defaultValue="overview">
            <TabsList className="mb-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="badges">Badges</TabsTrigger>
              <TabsTrigger value="history">History</TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              <Card>
                <CardHeader>
                  <CardTitle>Reputation Overview</CardTitle>
                  <CardDescription>Your reputation reflects your contributions to the community</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Trophy className="h-5 w-5 text-yellow-500" />
                      <span className="text-2xl font-bold">1,876</span>
                      <span className="text-sm text-muted-foreground">reputation points</span>
                    </div>
                    <Badge variant="outline" className="gap-1">
                      <TrendingUp className="h-3 w-3 text-green-500" />
                      +124 this month
                    </Badge>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Level 4: Established</span>
                      <span>1,876 / 2,000</span>
                    </div>
                    <Progress value={93.8} className="h-2" />
                    <p className="text-xs text-muted-foreground">124 more points until Level 5: Trusted</p>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="rounded-lg border p-4">
                      <div className="mb-2 flex items-center gap-2">
                        <ThumbsUp className="h-5 w-5 text-primary" />
                        <h3 className="font-medium">Upvotes Received</h3>
                      </div>
                      <div className="text-2xl font-bold">342</div>
                      <p className="text-sm text-muted-foreground">+5 reputation per upvote</p>
                    </div>

                    <div className="rounded-lg border p-4">
                      <div className="mb-2 flex items-center gap-2">
                        <MessageSquare className="h-5 w-5 text-primary" />
                        <h3 className="font-medium">Accepted Answers</h3>
                      </div>
                      <div className="text-2xl font-bold">28</div>
                      <p className="text-sm text-muted-foreground">+15 reputation per accepted answer</p>
                    </div>

                    <div className="rounded-lg border p-4">
                      <div className="mb-2 flex items-center gap-2">
                        <Award className="h-5 w-5 text-primary" />
                        <h3 className="font-medium">Badges Earned</h3>
                      </div>
                      <div className="text-2xl font-bold">15</div>
                      <p className="text-sm text-muted-foreground">Various reputation bonuses for achievements</p>
                    </div>

                    <div className="rounded-lg border p-4">
                      <div className="mb-2 flex items-center gap-2">
                        <Star className="h-5 w-5 text-primary" />
                        <h3 className="font-medium">Featured Content</h3>
                      </div>
                      <div className="text-2xl font-bold">7</div>
                      <p className="text-sm text-muted-foreground">+25 reputation per featured post</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="badges">
              <Card>
                <CardHeader>
                  <CardTitle>Your Badges</CardTitle>
                  <CardDescription>Badges are awarded for specific achievements and contributions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="font-medium">Participation Badges</h3>
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="flex items-start gap-3 rounded-lg border p-3">
                          <div className="rounded-full bg-primary/10 p-2 text-primary">
                            <MessageSquare className="h-5 w-5" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="font-medium">First Post</h4>
                              <Badge variant="outline">×1</Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">Created your first thread in the forum</p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3 rounded-lg border p-3">
                          <div className="rounded-full bg-primary/10 p-2 text-primary">
                            <Users className="h-5 w-5" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="font-medium">Conversation Starter</h4>
                              <Badge variant="outline">×5</Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">Started 5 discussions with 3+ replies</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="font-medium">Quality Badges</h3>
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="flex items-start gap-3 rounded-lg border p-3">
                          <div className="rounded-full bg-primary/10 p-2 text-primary">
                            <ThumbsUp className="h-5 w-5" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="font-medium">Helpful</h4>
                              <Badge variant="outline">×15</Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">Received 10+ upvotes on a post</p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3 rounded-lg border p-3">
                          <div className="rounded-full bg-primary/10 p-2 text-primary">
                            <Star className="h-5 w-5" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="font-medium">Great Answer</h4>
                              <Badge variant="outline">×8</Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">Answer selected as the best solution</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="font-medium">Special Badges</h3>
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="flex items-start gap-3 rounded-lg border p-3">
                          <div className="rounded-full bg-primary/10 p-2 text-primary">
                            <Shield className="h-5 w-5" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="font-medium">Moderator</h4>
                              <Badge variant="outline">×1</Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">Helps maintain community standards</p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3 rounded-lg border p-3 bg-muted/40">
                          <div className="rounded-full bg-muted p-2 text-muted-foreground">
                            <Zap className="h-5 w-5" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="font-medium text-muted-foreground">Veteran</h4>
                              <Badge variant="outline">Locked</Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">Active member for 2+ years</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="history">
              <Card>
                <CardHeader>
                  <CardTitle>Reputation History</CardTitle>
                  <CardDescription>Recent reputation changes and activities</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="rounded-lg border p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <ThumbsUp className="h-5 w-5 text-green-500" />
                          <div>
                            <p className="font-medium">+15 reputation</p>
                            <p className="text-sm text-muted-foreground">
                              Your answer was accepted on "Best practices for React in 2025"
                            </p>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">2 days ago</p>
                      </div>
                    </div>

                    <div className="rounded-lg border p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <ThumbsUp className="h-5 w-5 text-green-500" />
                          <div>
                            <p className="font-medium">+25 reputation</p>
                            <p className="text-sm text-muted-foreground">
                              5 upvotes on your thread "Microservices vs Monolith"
                            </p>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">3 days ago</p>
                      </div>
                    </div>

                    <div className="rounded-lg border p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Award className="h-5 w-5 text-green-500" />
                          <div>
                            <p className="font-medium">+50 reputation</p>
                            <p className="text-sm text-muted-foreground">Earned "Great Answer" badge</p>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">1 week ago</p>
                      </div>
                    </div>

                    <div className="rounded-lg border p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Star className="h-5 w-5 text-green-500" />
                          <div>
                            <p className="font-medium">+25 reputation</p>
                            <p className="text-sm text-muted-foreground">
                              Your answer was featured on "TypeScript best practices"
                            </p>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">2 weeks ago</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Your Profile</CardTitle>
            </CardHeader>
            <CardContent>
              <UserReputation />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Leaderboard Position</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Trophy className="h-5 w-5 text-yellow-500" />
                    <span className="font-medium">Rank #12</span>
                  </div>
                  <Badge variant="outline">Top 5%</Badge>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Progress to next rank</span>
                    <span>1,876 / 2,100</span>
                  </div>
                  <Progress value={89.3} className="h-2" />
                  <p className="text-xs text-muted-foreground">224 more points to reach rank #11</p>
                </div>

                <div className="rounded-lg border p-3">
                  <h4 className="mb-2 text-sm font-medium">Nearby Users</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span>#10 David Chen</span>
                      <span>2,150 pts</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>#11 Miguel Lopez</span>
                      <span>2,100 pts</span>
                    </div>
                    <div className="flex items-center justify-between font-medium text-primary">
                      <span>#12 You</span>
                      <span>1,876 pts</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>#13 Emma Wilson</span>
                      <span>1,820 pts</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
