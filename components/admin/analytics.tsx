"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts"

// Mock data for charts
const activityData = [
  { name: "Jan", posts: 400, threads: 240, users: 100 },
  { name: "Feb", posts: 300, threads: 139, users: 80 },
  { name: "Mar", posts: 200, threads: 980, users: 200 },
  { name: "Apr", posts: 278, threads: 390, users: 208 },
  { name: "May", posts: 189, threads: 480, users: 250 },
  { name: "Jun", posts: 239, threads: 380, users: 210 },
  { name: "Jul", posts: 349, threads: 430, users: 180 },
]

const categoryData = [
  { name: "General", threads: 400, posts: 2400 },
  { name: "Development", threads: 300, posts: 1398 },
  { name: "Introductions", threads: 200, posts: 9800 },
  { name: "Ideas", threads: 278, posts: 3908 },
  { name: "Help", threads: 189, posts: 4800 },
  { name: "Jobs", threads: 239, posts: 3800 },
]

export function AdminAnalytics() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Forum Activity</CardTitle>
          <CardDescription>Overview of posts, threads, and user registrations</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="monthly">
            <TabsList className="mb-4">
              <TabsTrigger value="daily">Daily</TabsTrigger>
              <TabsTrigger value="weekly">Weekly</TabsTrigger>
              <TabsTrigger value="monthly">Monthly</TabsTrigger>
            </TabsList>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={activityData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="posts" stroke="#8884d8" activeDot={{ r: 8 }} />
                  <Line type="monotone" dataKey="threads" stroke="#82ca9d" />
                  <Line type="monotone" dataKey="users" stroke="#ffc658" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Tabs>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Category Activity</CardTitle>
            <CardDescription>Posts and threads by category</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={categoryData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="threads" fill="#8884d8" />
                  <Bar dataKey="posts" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>User Engagement</CardTitle>
            <CardDescription>Active users and session metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-lg border p-3">
                  <div className="text-sm font-medium text-muted-foreground">Average Session</div>
                  <div className="text-2xl font-bold">12m 24s</div>
                </div>
                <div className="rounded-lg border p-3">
                  <div className="text-sm font-medium text-muted-foreground">Bounce Rate</div>
                  <div className="text-2xl font-bold">24.8%</div>
                </div>
                <div className="rounded-lg border p-3">
                  <div className="text-sm font-medium text-muted-foreground">Daily Active Users</div>
                  <div className="text-2xl font-bold">1,247</div>
                </div>
                <div className="rounded-lg border p-3">
                  <div className="text-sm font-medium text-muted-foreground">Posts per User</div>
                  <div className="text-2xl font-bold">3.7</div>
                </div>
              </div>

              <div className="rounded-lg border p-4">
                <h4 className="mb-2 text-sm font-medium">Top Referrers</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Google</span>
                    <span className="text-sm font-medium">42%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Direct</span>
                    <span className="text-sm font-medium">28%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Twitter</span>
                    <span className="text-sm font-medium">16%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">GitHub</span>
                    <span className="text-sm font-medium">14%</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
