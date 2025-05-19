"use client"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AdminUsersList } from "@/components/admin/users-list"
import { AdminReportsList } from "@/components/admin/reports-list"
import { AdminContentList } from "@/components/admin/content-list"
import { AdminAnalytics } from "@/components/admin/analytics"
import { useEffect, useState } from "react"

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    users: 0,
    threads: 0,
    postsToday: 0,
    pendingReports: 0,
    urgentReports: 0,
  })

  useEffect(() => {
    async function fetchStats() {
      const [usersRes, threadsRes, postsRes, reportsRes] = await Promise.all([
        fetch("/api/users/admin-list"),
        fetch("/api/threads"),
        fetch("/api/posts?today=1"),
        fetch("/api/reports?status=Pending"),
      ])
      const users = await usersRes.json()
      const threads = await threadsRes.json()
      const posts = await postsRes.json()
      const reports = await reportsRes.json()
      setStats({
        users: users.length,
        threads: threads.length,
        postsToday: posts.length,
        pendingReports: reports.length,
        urgentReports: reports.filter((r: any) => r.priority === "High").length,
      })
    }
    fetchStats()
  }, [])

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
            <div className="text-2xl font-bold">{stats.users}</div>
            <p className="text-xs text-muted-foreground">
              {/* You can add growth % here if you have the data */}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Active Threads</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.threads}</div>
            <p className="text-xs text-muted-foreground"></p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">New Posts Today</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.postsToday}</div>
            <p className="text-xs text-muted-foreground"></p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Pending Reports</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {stats.pendingReports} <Badge className="ml-2">{stats.urgentReports} urgent</Badge>
            </div>
            <p className="text-xs text-muted-foreground"></p>
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
