"use client"

import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Bell } from "lucide-react"

export function UserNav() {
  // In a real app, this would come from your authentication system
  const user = {
    name: "Jane Smith",
    email: "jane.smith@example.com",
    image: "/placeholder.svg?height=32&width=32",
  }

  return (
    <div className="flex items-center gap-4">
      <Button variant="ghost" size="icon" asChild>
        <Link href="/notifications">
          <Bell className="h-5 w-5" />
          <span className="sr-only">Notifications</span>
          <span className="absolute right-1 top-1 flex h-2 w-2 rounded-full bg-primary"></span>
        </Link>
      </Button>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-8 w-8 rounded-full">
            <Avatar className="h-8 w-8">
              <AvatarImage src={user.image || "/placeholder.svg"} alt={user.name} />
              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">{user.name}</p>
              <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem asChild>
              <Link href="/profile">
                Profile
                <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/forums/new-thread">
                New Thread
                <DropdownMenuShortcut>⌘N</DropdownMenuShortcut>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/forums/new-poll">
                Create Poll
                <DropdownMenuShortcut>⌘P</DropdownMenuShortcut>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/profile/bookmarks">
                Bookmarks
                <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/profile/reputation">
                Reputation
                <DropdownMenuShortcut>⌘R</DropdownMenuShortcut>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/profile/elite-access">
                Elite Access
                <DropdownMenuShortcut>⌘E</DropdownMenuShortcut>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/notifications">
                Notifications
                <DropdownMenuShortcut>⌘M</DropdownMenuShortcut>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/profile/settings">
                Settings
                <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
              </Link>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            Logout
            <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
