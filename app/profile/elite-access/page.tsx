import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TierBenefits } from "@/components/reputation/tier-benefits"
import { EliteDiscussions } from "@/components/elite/elite-discussions"
import { Badge } from "@/components/ui/badge"
import { Trophy, Star, Users, Shield } from "lucide-react"

export default function EliteAccessPage() {
  // In a real app, this would be fetched from the server
  const userData = {
    name: "Jane Smith",
    username: "janesmith",
    level: 6,
    reputation: 5210,
    nextLevel: {
      name: "Veteran",
      requiredPoints: 10000,
    },
    badgeCount: 15,
    memberSince: "Jan 15, 2022",
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Elite Access & Privileges</h1>
        <p className="text-muted-foreground">Access exclusive content and features based on your reputation level</p>
      </div>

      <div className="mb-6 grid gap-6 md:grid-cols-4">
        <Card className="md:col-span-1">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Your Reputation</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-yellow-500" />
              <span className="text-2xl font-bold">{userData.reputation.toLocaleString()}</span>
            </div>
            <p className="text-xs text-muted-foreground">
              Level {userData.level} • {userData.nextLevel.name} at {userData.nextLevel.requiredPoints.toLocaleString()}
            </p>
          </CardContent>
        </Card>

        <Card className="md:col-span-1">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Badges Earned</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Star className="h-5 w-5 text-amber-500" />
              <span className="text-2xl font-bold">{userData.badgeCount}</span>
            </div>
            <p className="text-xs text-muted-foreground">Across multiple categories</p>
          </CardContent>
        </Card>

        <Card className="md:col-span-1">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Exclusive Areas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              <span className="text-2xl font-bold">{userData.level - 4}</span>
            </div>
            <p className="text-xs text-muted-foreground">Special forums unlocked</p>
          </CardContent>
        </Card>

        <Card className="md:col-span-1">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Special Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              <Badge className="bg-sky-100 text-sky-800 dark:bg-sky-900 dark:text-sky-100">Expert Member</Badge>
            </div>
            <p className="text-xs text-muted-foreground">Member since {userData.memberSince}</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="privileges">
        <TabsList className="mb-4">
          <TabsTrigger value="privileges">Reputation Tiers</TabsTrigger>
          <TabsTrigger value="exclusive">Elite Discussions</TabsTrigger>
        </TabsList>

        <TabsContent value="privileges" className="space-y-6">
          <TierBenefits userLevel={userData.level} userReputation={userData.reputation} />
        </TabsContent>

        <TabsContent value="exclusive" className="space-y-6">
          <EliteDiscussions userLevel={userData.level} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
