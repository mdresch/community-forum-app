"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function NotificationPreferences() {
  const [preferences, setPreferences] = useState({
    replies: true,
    mentions: true,
    likes: true,
    follows: true,
    directMessages: true,
    systemNotifications: true,
    emailNotifications: true,
    emailDigest: "daily",
  })

  const handleToggleChange = (key) => {
    setPreferences((prev) => ({
      ...prev,
      [key]: !prev[key],
    }))
  }

  const handleSelectChange = (key, value) => {
    setPreferences((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Notification Settings</CardTitle>
        <CardDescription>Customize how you receive notifications</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-sm font-medium">In-App Notifications</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label htmlFor="replies" className="flex flex-col space-y-1">
                <span>Replies to your posts</span>
                <span className="font-normal text-xs text-muted-foreground">
                  When someone replies to your threads or comments
                </span>
              </Label>
              <Switch
                id="replies"
                checked={preferences.replies}
                onCheckedChange={() => handleToggleChange("replies")}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="mentions" className="flex flex-col space-y-1">
                <span>Mentions</span>
                <span className="font-normal text-xs text-muted-foreground">When someone mentions you in a post</span>
              </Label>
              <Switch
                id="mentions"
                checked={preferences.mentions}
                onCheckedChange={() => handleToggleChange("mentions")}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="likes" className="flex flex-col space-y-1">
                <span>Likes</span>
                <span className="font-normal text-xs text-muted-foreground">When someone likes your posts</span>
              </Label>
              <Switch id="likes" checked={preferences.likes} onCheckedChange={() => handleToggleChange("likes")} />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="follows" className="flex flex-col space-y-1">
                <span>Follows</span>
                <span className="font-normal text-xs text-muted-foreground">When someone follows you</span>
              </Label>
              <Switch
                id="follows"
                checked={preferences.follows}
                onCheckedChange={() => handleToggleChange("follows")}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="directMessages" className="flex flex-col space-y-1">
                <span>Direct messages</span>
                <span className="font-normal text-xs text-muted-foreground">When you receive a direct message</span>
              </Label>
              <Switch
                id="directMessages"
                checked={preferences.directMessages}
                onCheckedChange={() => handleToggleChange("directMessages")}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="systemNotifications" className="flex flex-col space-y-1">
                <span>System notifications</span>
                <span className="font-normal text-xs text-muted-foreground">Important updates about the forum</span>
              </Label>
              <Switch
                id="systemNotifications"
                checked={preferences.systemNotifications}
                onCheckedChange={() => handleToggleChange("systemNotifications")}
              />
            </div>
          </div>
        </div>

        <Separator />

        <div className="space-y-4">
          <h3 className="text-sm font-medium">Email Notifications</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label htmlFor="emailNotifications" className="flex flex-col space-y-1">
                <span>Email notifications</span>
                <span className="font-normal text-xs text-muted-foreground">Receive notifications via email</span>
              </Label>
              <Switch
                id="emailNotifications"
                checked={preferences.emailNotifications}
                onCheckedChange={() => handleToggleChange("emailNotifications")}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="emailDigest">Email digest frequency</Label>
              <Select
                value={preferences.emailDigest}
                onValueChange={(value) => handleSelectChange("emailDigest", value)}
                disabled={!preferences.emailNotifications}
              >
                <SelectTrigger id="emailDigest">
                  <SelectValue placeholder="Select frequency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="realtime">Real-time</SelectItem>
                  <SelectItem value="daily">Daily digest</SelectItem>
                  <SelectItem value="weekly">Weekly digest</SelectItem>
                  <SelectItem value="never">Never</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <Button className="w-full">Save Preferences</Button>
      </CardContent>
    </Card>
  )
}
