"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { MoreHorizontal, Search, UserPlus } from "lucide-react"

// Mock user data
const users = [
  {
    id: 1,
    name: "Jane Smith",
    username: "janesmith",
    email: "jane.smith@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
    role: "Admin",
    status: "Active",
    joinDate: "Jan 15, 2022",
    lastActive: "Today",
    posts: 253,
  },
  {
    id: 2,
    name: "Alex Johnson",
    username: "alexj",
    email: "alex.johnson@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
    role: "Moderator",
    status: "Active",
    joinDate: "Mar 10, 2023",
    lastActive: "Yesterday",
    posts: 87,
  },
  {
    id: 3,
    name: "Sarah Chen",
    username: "sarahc",
    email: "sarah.chen@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
    role: "Member",
    status: "Active",
    joinDate: "Sep 5, 2021",
    lastActive: "2 days ago",
    posts: 342,
  },
  {
    id: 4,
    name: "Michael Jordan",
    username: "mjordan",
    email: "michael.jordan@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
    role: "Member",
    status: "Suspended",
    joinDate: "Apr 23, 2023",
    lastActive: "30 days ago",
    posts: 28,
  },
  {
    id: 5,
    name: "Emma Wilson",
    username: "emmaw",
    email: "emma.wilson@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
    role: "Member",
    status: "Active",
    joinDate: "Jul 12, 2022",
    lastActive: "Today",
    posts: 156,
  },
]

export function AdminUsersList() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Users</CardTitle>
            <CardDescription>Manage user accounts and permissions</CardDescription>
          </div>
          <Button>
            <UserPlus className="mr-2 h-4 w-4" />
            Add User
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search users..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">Filter</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Filter by</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>All Users</DropdownMenuItem>
              <DropdownMenuItem>Admins</DropdownMenuItem>
              <DropdownMenuItem>Moderators</DropdownMenuItem>
              <DropdownMenuItem>Active Users</DropdownMenuItem>
              <DropdownMenuItem>Suspended Users</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Joined</TableHead>
                <TableHead>Last Active</TableHead>
                <TableHead>Posts</TableHead>
                <TableHead className="w-[80px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{user.name}</div>
                        <div className="text-xs text-muted-foreground">@{user.username}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={user.role === "Admin" ? "default" : user.role === "Moderator" ? "secondary" : "outline"}
                    >
                      {user.role}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={user.status === "Active" ? "outline" : "destructive"}
                      className={user.status === "Active" ? "bg-green-50 text-green-700" : ""}
                    >
                      {user.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{user.joinDate}</TableCell>
                  <TableCell>{user.lastActive}</TableCell>
                  <TableCell>{user.posts}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Actions</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View Profile</DropdownMenuItem>
                        <DropdownMenuItem>Edit User</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Change Role</DropdownMenuItem>
                        {user.status === "Active" ? (
                          <DropdownMenuItem className="text-destructive">Suspend User</DropdownMenuItem>
                        ) : (
                          <DropdownMenuItem>Activate User</DropdownMenuItem>
                        )}
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive">Delete Account</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
