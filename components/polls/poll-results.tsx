"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PieChart, BarChart3, Users } from "lucide-react"
import { Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip } from "recharts"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts"

export function PollResults({ poll }) {
  const [viewMode, setViewMode] = useState("chart")

  // Calculate vote percentages and prepare data for charts
  const results = poll.options.map((option) => {
    const optionVotes = poll.votes.filter((vote) => vote.optionId === option.id).length
    const percentage = poll.totalVotes > 0 ? (optionVotes / poll.totalVotes) * 100 : 0

    return {
      id: option.id,
      text: option.text,
      votes: optionVotes,
      percentage: percentage,
      voters: poll.isAnonymous
        ? []
        : poll.votes
            .filter((vote) => vote.optionId === option.id)
            .map((vote) => ({
              id: vote.userId,
              name: vote.name,
              username: vote.username,
              avatar: vote.avatar,
            })),
    }
  })

  // Sort results by votes (descending)
  results.sort((a, b) => b.votes - a.votes)

  // Prepare data for recharts
  const chartData = results.map((result) => ({
    name: result.text,
    votes: result.votes,
    percentage: result.percentage,
  }))

  // Colors for pie chart
  const COLORS = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#8884d8",
    "#82ca9d",
    "#ffc658",
    "#8dd1e1",
    "#a4de6c",
    "#d0ed57",
  ]

  return (
    <div className="space-y-4">
      <Tabs defaultValue="chart" onValueChange={setViewMode}>
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="chart" className="flex items-center gap-1">
              {poll.chartType === "bar" ? <BarChart3 className="h-4 w-4" /> : <PieChart className="h-4 w-4" />}
              Chart
            </TabsTrigger>
            <TabsTrigger value="list" className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              List
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="chart" className="pt-4">
          <div className="h-[300px] w-full">
            {poll.chartType === "bar" ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip
                    formatter={(value, name) => [
                      name === "votes" ? `${value} votes` : `${value.toFixed(1)}%`,
                      name === "votes" ? "Votes" : "Percentage",
                    ]}
                  />
                  <Legend />
                  <Bar dataKey="votes" fill="#8884d8" name="Votes" />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="votes"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <RechartsTooltip
                    formatter={(value, name) => [
                      `${value} votes (${((value / poll.totalVotes) * 100).toFixed(1)}%)`,
                      "Votes",
                    ]}
                  />
                </PieChart>
              </ResponsiveContainer>
            )}
          </div>
        </TabsContent>

        <TabsContent value="list" className="space-y-4 pt-4">
          {results.map((result) => (
            <div key={result.id} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="font-medium">{result.text}</div>
                <div className="text-sm">
                  {result.votes} {result.votes === 1 ? "vote" : "votes"} ({result.percentage.toFixed(1)}%)
                </div>
              </div>
              <Progress value={result.percentage} className="h-2" />

              {!poll.isAnonymous && result.voters.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {result.voters.map((voter) => (
                    <div key={voter.id} className="flex items-center gap-1 rounded-full bg-muted px-2 py-1 text-xs">
                      <Avatar className="h-4 w-4">
                        <AvatarImage src={voter.avatar || "/placeholder.svg"} alt={voter.name} />
                        <AvatarFallback>{voter.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <span>{voter.name}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  )
}
