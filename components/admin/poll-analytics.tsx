"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Area,
  AreaChart,
  ComposedChart,
} from "recharts"
import { CalendarIcon, Download, Filter } from "lucide-react"
import { format, subDays } from "date-fns"

// Mock data for analytics
const generateTimeSeriesData = (days: number) => {
  return Array(days)
    .fill(0)
    .map((_, i) => {
      const date = subDays(new Date(), days - i - 1)
      return {
        date: format(date, "MMM dd"),
        votes: Math.floor(Math.random() * 100) + 20,
        uniqueParticipants: Math.floor(Math.random() * 50) + 10,
        avgTimeToVote: Math.floor(Math.random() * 60) + 30, // seconds
      }
    })
}

const pollPerformanceData = [
  {
    id: 1,
    title: "What's your favorite frontend framework in 2025?",
    category: "Development",
    votes: 487,
    engagement: 89, // percentage
    uniqueParticipants: 452,
    createdAt: "2025-05-01",
    author: "Jane Smith",
  },
  {
    id: 2,
    title: "Which database do you prefer for high-traffic applications?",
    category: "Development",
    votes: 342,
    engagement: 76,
    uniqueParticipants: 312,
    createdAt: "2025-04-28",
    author: "Alex Johnson",
  },
  {
    id: 3,
    title: "What new feature would you like to see in our forum?",
    category: "Ideas & Feedback",
    votes: 563,
    engagement: 92,
    uniqueParticipants: 521,
    createdAt: "2025-04-25",
    author: "Admin",
  },
  {
    id: 4,
    title: "How often do you contribute to open source projects?",
    category: "General Discussion",
    votes: 289,
    engagement: 67,
    uniqueParticipants: 257,
    createdAt: "2025-04-20",
    author: "Sarah Chen",
  },
  {
    id: 5,
    title: "What's your preferred work environment?",
    category: "Jobs & Opportunities",
    votes: 412,
    engagement: 83,
    uniqueParticipants: 387,
    createdAt: "2025-04-15",
    author: "Miguel Lopez",
  },
]

const demographicData = [
  { name: "New Members", value: 25 },
  { name: "Regular Members", value: 40 },
  { name: "Active Contributors", value: 20 },
  { name: "Moderators", value: 10 },
  { name: "Admins", value: 5 },
]

const locationData = [
  { name: "North America", value: 45 },
  { name: "Europe", value: 30 },
  { name: "Asia", value: 15 },
  { name: "Other", value: 10 },
]

const timeOfDayData = [
  { name: "Morning (6-12)", votes: 120 },
  { name: "Afternoon (12-18)", votes: 240 },
  { name: "Evening (18-24)", votes: 180 },
  { name: "Night (0-6)", votes: 60 },
]

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8", "#82ca9d"]

export function PollAnalytics() {
  const [dateRange, setDateRange] = useState({
    from: subDays(new Date(), 30),
    to: new Date(),
  })
  const [selectedPoll, setSelectedPoll] = useState("all")
  const [chartType, setChartType] = useState("participation")

  // Generate time series data for the last 30 days
  const timeSeriesData = generateTimeSeriesData(30)

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Poll Analytics</h2>
          <p className="text-muted-foreground">Comprehensive insights into poll performance and user engagement</p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="justify-start gap-1 text-left font-normal">
                <CalendarIcon className="h-4 w-4" />
                <span>
                  {format(dateRange.from, "LLL dd, y")} - {format(dateRange.to, "LLL dd, y")}
                </span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="end">
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={dateRange.from}
                selected={{ from: dateRange.from, to: dateRange.to }}
                onSelect={(range) => range && setDateRange({ from: range.from, to: range.to || range.from })}
                numberOfMonths={2}
              />
            </PopoverContent>
          </Popover>

          <Button variant="outline" size="icon">
            <Download className="h-4 w-4" />
            <span className="sr-only">Download data</span>
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Polls</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">48</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500">+12%</span> from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Votes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12,487</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500">+18%</span> from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Avg. Participation Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">76%</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500">+5%</span> from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Avg. Time to Vote</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">42s</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-red-500">+8s</span> from last month
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-7">
        <div className="space-y-6 md:col-span-5">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Voting Trends</CardTitle>
                  <CardDescription>Historical data showing voting patterns over time</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Select value={chartType} onValueChange={setChartType}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select chart" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="participation">Participation</SelectItem>
                      <SelectItem value="timeToVote">Response Time</SelectItem>
                      <SelectItem value="combined">Combined Metrics</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-[350px]">
                {chartType === "participation" && (
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={timeSeriesData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorVotes" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                          <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="colorParticipants" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                          <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <XAxis dataKey="date" />
                      <YAxis />
                      <CartesianGrid strokeDasharray="3 3" />
                      <Tooltip />
                      <Legend />
                      <Area
                        type="monotone"
                        dataKey="votes"
                        stroke="#8884d8"
                        fillOpacity={1}
                        fill="url(#colorVotes)"
                        name="Total Votes"
                      />
                      <Area
                        type="monotone"
                        dataKey="uniqueParticipants"
                        stroke="#82ca9d"
                        fillOpacity={1}
                        fill="url(#colorParticipants)"
                        name="Unique Participants"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                )}

                {chartType === "timeToVote" && (
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={timeSeriesData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="avgTimeToVote"
                        stroke="#ff7300"
                        name="Avg. Response Time (seconds)"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                )}

                {chartType === "combined" && (
                  <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart data={timeSeriesData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis yAxisId="left" />
                      <YAxis yAxisId="right" orientation="right" />
                      <Tooltip />
                      <Legend />
                      <Bar yAxisId="left" dataKey="votes" fill="#8884d8" name="Total Votes" barSize={20} stackId="a" />
                      <Line
                        yAxisId="right"
                        type="monotone"
                        dataKey="avgTimeToVote"
                        stroke="#ff7300"
                        name="Avg. Response Time (seconds)"
                      />
                    </ComposedChart>
                  </ResponsiveContainer>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
                <div>
                  <CardTitle>Top Performing Polls</CardTitle>
                  <CardDescription>Polls with the highest engagement and participation</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Input placeholder="Search polls..." className="w-[150px] sm:w-[250px]" />
                  <Button variant="outline" size="icon">
                    <Filter className="h-4 w-4" />
                    <span className="sr-only">Filter</span>
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pollPerformanceData.map((poll) => (
                  <div key={poll.id} className="rounded-lg border p-4">
                    <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-start">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium line-clamp-1">{poll.title}</h3>
                          <Badge variant="outline">{poll.category}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Created by {poll.author} on {format(new Date(poll.createdAt), "PP")}
                        </p>
                      </div>
                      <div className="flex items-center gap-4 text-sm">
                        <div className="flex flex-col items-center">
                          <span className="font-semibold">{poll.votes}</span>
                          <span className="text-xs text-muted-foreground">Votes</span>
                        </div>
                        <div className="flex flex-col items-center">
                          <span className="font-semibold">{poll.uniqueParticipants}</span>
                          <span className="text-xs text-muted-foreground">Participants</span>
                        </div>
                        <div className="flex flex-col items-center">
                          <span className="font-semibold">{poll.engagement}%</span>
                          <span className="text-xs text-muted-foreground">Engagement</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6 md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Voter Demographics</CardTitle>
              <CardDescription>Participation by user groups</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={demographicData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {demographicData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value, name) => [`${value}%`, name]} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Geographic Distribution</CardTitle>
              <CardDescription>Votes by location</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={locationData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {locationData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value, name) => [`${value}%`, name]} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Time of Day Analysis</CardTitle>
              <CardDescription>When users are most active</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={timeOfDayData}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 0,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="votes" fill="#8884d8" name="Votes" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
