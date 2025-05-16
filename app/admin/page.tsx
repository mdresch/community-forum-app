import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AdminUsersList } from "@/components/admin/users-list"
import { AdminReportsList } from "@/components/admin/reports-list"
import { AdminContentList } from "@/components/admin/content-list"
import { AdminAnalytics } from "@/components/admin/analytics"

export default function AdminDashboard() {
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage your community forum</p>
        </div>
        <div className="flex gap-2">
          <Button asChild variant="outline">
            <Link href="/">View Forum</Link>
          </Button>
          <Button>
            <Link href="/admin/settings">Settings</Link>
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,853</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500">+12%</span> from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Active Threads</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,247</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500">+8%</span> from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">New Posts Today</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">342</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500">+23%</span> from yesterday
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Pending Reports</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              18 <Badge className="ml-2">5 urgent</Badge>
            </div>
            <p className="text-xs text-muted-foreground">12 new since last login</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="mt-6">
        <TabsList className="mb-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>
        <TabsContent value="overview">
          <AdminAnalytics />
        </TabsContent>
        <TabsContent value="users">
          <AdminUsersList />
        </TabsContent>
        <TabsContent value="content">
          <AdminContentList />
        </TabsContent>
        <TabsContent value="reports">
          <AdminReportsList />
        </TabsContent>
      </Tabs>
    </div>
  )
}
