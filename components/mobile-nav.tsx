"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import { useAuth } from "@/hooks/useAuth"

export function MobileNav() {
  const [open, setOpen] = useState(false)
  const { user } = useAuth();

  return (
    <div className="md:hidden">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <SheetHeader className="mb-4">
            <SheetTitle>Community Forum</SheetTitle>
            <SheetDescription>Navigate through our community</SheetDescription>
          </SheetHeader>
          <div className="grid gap-2 py-4">
            <SheetClose asChild>
              <Link
                href="/"
                className="flex items-center rounded-md px-2 py-1 text-sm hover:bg-accent hover:text-accent-foreground"
              >
                Home
              </Link>
            </SheetClose>

            {/* Forums Section */}
            <div className="px-2 py-1 text-sm font-medium">Forums</div>
            <SheetClose asChild>
              <Link
                href="/forums"
                className="flex items-center rounded-md px-2 py-1 text-sm hover:bg-accent hover:text-accent-foreground"
              >
                All Forums
              </Link>
            </SheetClose>
            <SheetClose asChild>
              <Link
                href="/forums/general-discussion"
                className="flex items-center rounded-md px-4 py-1 text-sm hover:bg-accent hover:text-accent-foreground"
              >
                General Discussion
              </Link>
            </SheetClose>
            <SheetClose asChild>
              <Link
                href="/forums/introductions"
                className="flex items-center rounded-md px-4 py-1 text-sm hover:bg-accent hover:text-accent-foreground"
              >
                Introductions
              </Link>
            </SheetClose>
            <SheetClose asChild>
              <Link
                href="/forums/development"
                className="flex items-center rounded-md px-4 py-1 text-sm hover:bg-accent hover:text-accent-foreground"
              >
                Development
              </Link>
            </SheetClose>
            <SheetClose asChild>
              <Link
                href="/forums/ideas-feedback"
                className="flex items-center rounded-md px-4 py-1 text-sm hover:bg-accent hover:text-accent-foreground"
              >
                Ideas & Feedback
              </Link>
            </SheetClose>
            <SheetClose asChild>
              <Link
                href="/forums/help-support"
                className="flex items-center rounded-md px-4 py-1 text-sm hover:bg-accent hover:text-accent-foreground"
              >
                Help & Support
              </Link>
            </SheetClose>
            <SheetClose asChild>
              <Link
                href="/forums/jobs-opportunities"
                className="flex items-center rounded-md px-4 py-1 text-sm hover:bg-accent hover:text-accent-foreground"
              >
                Jobs & Opportunities
              </Link>
            </SheetClose>
            {/* New categories */}
            <SheetClose asChild>
              <Link
                href="/forums/bug-reports"
                className="flex items-center rounded-md px-4 py-1 text-sm hover:bg-accent hover:text-accent-foreground text-red-500"
              >
                Bug Reports
              </Link>
            </SheetClose>
            <SheetClose asChild>
              <Link
                href="/forums/showcase"
                className="flex items-center rounded-md px-4 py-1 text-sm hover:bg-accent hover:text-accent-foreground text-yellow-700"
              >
                Showcase
              </Link>
            </SheetClose>
            <SheetClose asChild>
              <Link
                href="/forums/help-needed"
                className="flex items-center rounded-md px-4 py-1 text-sm hover:bg-accent hover:text-accent-foreground text-blue-500"
              >
                Help Needed
              </Link>
            </SheetClose>

            {/* Community Section */}
            <div className="px-2 py-1 text-sm font-medium">Community</div>
            <SheetClose asChild>
              <Link
                href="/members"
                className="flex items-center rounded-md px-4 py-1 text-sm hover:bg-accent hover:text-accent-foreground"
              >
                Members Directory
              </Link>
            </SheetClose>
            <SheetClose asChild>
              <Link
                href="/achievements"
                className="flex items-center rounded-md px-4 py-1 text-sm hover:bg-accent hover:text-accent-foreground"
              >
                Achievements
              </Link>
            </SheetClose>
            <SheetClose asChild>
              <Link
                href="/profile/reputation"
                className="flex items-center rounded-md px-4 py-1 text-sm hover:bg-accent hover:text-accent-foreground"
              >
                Reputation System
              </Link>
            </SheetClose>
            <SheetClose asChild>
              <Link
                href="/profile/elite-access"
                className="flex items-center rounded-md px-4 py-1 text-sm hover:bg-accent hover:text-accent-foreground"
              >
                Elite Access
              </Link>
            </SheetClose>

            {/* Polls & Voting Section */}
            <div className="px-2 py-1 text-sm font-medium">Polls & Voting</div>
            <SheetClose asChild>
              <Link
                href="/forums/polls"
                className="flex items-center rounded-md px-4 py-1 text-sm hover:bg-accent hover:text-accent-foreground"
              >
                Browse Polls
              </Link>
            </SheetClose>
            <SheetClose asChild>
              <Link
                href="/forums/new-poll"
                className="flex items-center rounded-md px-4 py-1 text-sm hover:bg-accent hover:text-accent-foreground"
              >
                Create Poll
              </Link>
            </SheetClose>
            <SheetClose asChild>
              <Link
                href="/admin/poll-analytics"
                className="flex items-center rounded-md px-4 py-1 text-sm hover:bg-accent hover:text-accent-foreground"
              >
                Poll Analytics
              </Link>
            </SheetClose>

            {/* Other Important Links */}
            <div className="px-2 py-1 text-sm font-medium">Quick Access</div>
            <SheetClose asChild>
              <Link
                href="/search"
                className="flex items-center rounded-md px-4 py-1 text-sm hover:bg-accent hover:text-accent-foreground"
              >
                Search
              </Link>
            </SheetClose>
            <SheetClose asChild>
              <Link
                href="/notifications"
                className="flex items-center rounded-md px-4 py-1 text-sm hover:bg-accent hover:text-accent-foreground"
              >
                Notifications
              </Link>
            </SheetClose>
            <SheetClose asChild>
              <Link
                href="/bookmarks"
                className="flex items-center rounded-md px-4 py-1 text-sm hover:bg-accent hover:text-accent-foreground"
              >
                Bookmarks
              </Link>
            </SheetClose>

            {/* Account Section */}
            <div className="px-2 py-1 text-sm font-medium">Account</div>
            <SheetClose asChild>
              <Link
                href="/profile"
                className="flex items-center rounded-md px-4 py-1 text-sm hover:bg-accent hover:text-accent-foreground"
              >
                Profile
              </Link>
            </SheetClose>
            <SheetClose asChild>
              <Link
                href="/profile/settings"
                className="flex items-center rounded-md px-4 py-1 text-sm hover:bg-accent hover:text-accent-foreground"
              >
                Settings
              </Link>
            </SheetClose>

            {/* Admin menu item, only for admins */}
            {user?.role === "admin" && (
              <SheetClose asChild>
                <Link
                  href="/admin"
                  className="flex items-center rounded-md px-2 py-1 text-sm hover:bg-accent hover:text-accent-foreground font-semibold text-red-600"
                >
                  Admin
                </Link>
              </SheetClose>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}
