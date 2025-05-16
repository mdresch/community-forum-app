"use client"

import { useState } from "react"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { formatDistanceToNow } from "date-fns"
import { MessageSquare, Heart, AtSign, Bell, BellOff, Settings, Trash2 } from "lucide-react"

// Mock notification data
const notifications = [
  {
    id: 1,
    type: "reply",
    read: false,
    user: {
      name: "Alex Johnson",
      username: "alexj",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    content: "replied to your thread",
    thread: {
      title: "Best practices for React in 2025",
      slug: "best-practices-react-2025",
      category: "development",
    },
    timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
  },
  {
    id: 2,
    type: "like",
    read: false,
    user: {
      name: "Sarah Chen",
      username: "sarahc",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    content: "liked your post",
    thread: {
      title: "How to optimize database queries for large datasets?",
      slug: "optimize-database-queries-large-datasets",
      category: "development",
    },
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
  },
  {
    id: 3,
    type: "mention",
    read: true,
    user: {
      name: "Miguel Lopez",
      username: "migueldev",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    content: "mentioned you in a post",
    thread: {
      title: "Feature request: Dark mode for the forum",
      slug: "feature-request-dark-mode",
      category: "ideas-feedback",
    },
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5), // 5 hours ago
  },
  {
    id: 4,
    type: "system",
    read: true,
    content: "Your thread was pinned by a moderator",
    thread: {
      title: "Best practices for React in 2025",
      slug: "best-practices-react-2025",
      category: "development",
    },
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
  },
  {
    id: 5,
    type: "reply",
    read: true,
    user: {
      name: "Emma Wilson",
      username: "emmaw",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    content: "replied to your thread",
    thread: {
      title: "Introducing myself: New developer from Toronto",
      slug: "new-developer-toronto",
      category: "introductions",
    },
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 days ago
  },
]

export function NotificationList() {
  const [activeTab, setActiveTab] = useState("all")

  const unreadCount = notifications.filter((notification) => !notification.read).length

  const getNotificationIcon = (type) => {
    switch (type) {
      case "reply":
        return <MessageSquare className="h-4 w-4 text-blue-500" />
      case "like":
        return <Heart className="h-4 w-4 text-red-500" />
      case "mention":
        return <AtSign className="h-4 w-4 text-green-500" />
      case "system":
        return <Bell className="h-4 w-4 text-purple-500" />
      default:
        return <Bell className="h-4 w-4" />
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Notifications</CardTitle>
            <CardDescription>Stay updated with forum activity</CardDescription>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="icon">
              <Settings className="h-4 w-4" />
              <span className="sr-only">Notification Settings</span>
            </Button>
            <Button variant="outline" size="icon">
              <BellOff className="h-4 w-4" />
              <span className="sr-only">Mark All as Read</span>
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="all" onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="all">
              All
              {unreadCount > 0 && (
                <Badge className="ml-2 bg-primary px-1 text-xs" variant="default">
                  {unreadCount}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="unread">Unread</TabsTrigger>
            <TabsTrigger value="mentions">Mentions</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            {notifications.map((notification) => (
              <NotificationItem key={notification.id} notification={notification} />
            ))}
          </TabsContent>

          <TabsContent value="unread" className="space-y-4">
            {notifications
              .filter((notification) => !notification.read)
              .map((notification) => (
                <NotificationItem key={notification.id} notification={notification} />
              ))}
          </TabsContent>

          <TabsContent value="mentions" className="space-y-4">
            {notifications
              .filter((notification) => notification.type === "mention")
              .map((notification) => (
                <NotificationItem key={notification.id} notification={notification} />
              ))}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

function NotificationItem({ notification }) {
  const getNotificationIcon = (type) => {
    switch (type) {
      case "reply":
        return <MessageSquare className="h-4 w-4 text-blue-500" />
      case "like":
        return <Heart className="h-4 w-4 text-red-500" />
      case "mention":
        return <AtSign className="h-4 w-4 text-green-500" />
      case "system":
        return <Bell className="h-4 w-4 text-purple-500" />
      default:
        return <Bell className="h-4 w-4" />
    }
  }

  return (
    <div
      className={`relative rounded-lg border p-4 transition-colors hover:bg-muted ${
        !notification.read ? "border-primary/50 bg-primary/5" : ""
      }`}
    >
      <div className="absolute right-4 top-4 flex gap-2">
        {!notification.read && <Badge variant="outline">New</Badge>}
        <Button variant="ghost" size="icon" className="h-6 w-6">
          <Trash2 className="h-4 w-4" />
          <span className="sr-only">Delete</span>
        </Button>
      </div>
      <div className="flex gap-4">
        <div className="mt-1 flex h-8 w-8 items-center justify-center rounded-full bg-muted">
          {notification.user ? (
            <Avatar className="h-8 w-8">
              <AvatarImage src={notification.user.avatar || "/placeholder.svg"} alt={notification.user.name} />
              <AvatarFallback>{notification.user.name.charAt(0)}</AvatarFallback>
            </Avatar>
          ) : (
            getNotificationIcon(notification.type)
          )}
        </div>
        <div className="flex-1">
          <div className="pr-16">
            {notification.user ? (
              <span>
                <span className="font-medium">{notification.user.name}</span> {notification.content}
              </span>
            ) : (
              <span>{notification.content}</span>
            )}
          </div>
          <div className="mt-1">
            <Link
              href={`/forums/${notification.thread.category}/${notification.thread.slug}`}
              className="text-sm font-medium text-primary hover:underline"
            >
              {notification.thread.title}
            </Link>
          </div>
          <div className="mt-2 text-xs text-muted-foreground">
            {formatDistanceToNow(notification.timestamp, { addSuffix: true })}
          </div>
        </div>
      </div>
    </div>
  )
}
