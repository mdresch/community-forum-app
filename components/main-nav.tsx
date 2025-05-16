"use client"

import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import {
  MessageSquare,
  Users,
  Lightbulb,
  HelpCircle,
  Briefcase,
  Search,
  BarChart,
  Award,
  Bell,
  Shield,
  PieChart,
  Bookmark,
} from "lucide-react"

export function MainNav() {
  const pathname = usePathname()

  return (
    <div className="mr-4 hidden md:flex">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <Link href="/" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>Home</NavigationMenuLink>
            </Link>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuTrigger>Forums</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                <li className="row-span-3">
                  <NavigationMenuLink asChild>
                    <a
                      className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                      href="/forums"
                    >
                      <MessageSquare className="h-6 w-6" />
                      <div className="mb-2 mt-4 text-lg font-medium">Forums</div>
                      <p className="text-sm leading-tight text-muted-foreground">
                        Browse all forum categories and join the discussions
                      </p>
                    </a>
                  </NavigationMenuLink>
                </li>
                <ForumCategoryLink
                  href="/forums/general-discussion"
                  title="General Discussion"
                  icon={<MessageSquare className="h-4 w-4" />}
                />
                <ForumCategoryLink
                  href="/forums/introductions"
                  title="Introductions"
                  icon={<Users className="h-4 w-4" />}
                />
                <ForumCategoryLink
                  href="/forums/development"
                  title="Development"
                  icon={<MessageSquare className="h-4 w-4" />}
                />
                <ForumCategoryLink
                  href="/forums/ideas-feedback"
                  title="Ideas & Feedback"
                  icon={<Lightbulb className="h-4 w-4" />}
                />
                <ForumCategoryLink
                  href="/forums/help-support"
                  title="Help & Support"
                  icon={<HelpCircle className="h-4 w-4" />}
                />
                <ForumCategoryLink
                  href="/forums/jobs-opportunities"
                  title="Jobs & Opportunities"
                  icon={<Briefcase className="h-4 w-4" />}
                />
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuTrigger>Community</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                <li className="row-span-3">
                  <NavigationMenuLink asChild>
                    <a
                      className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                      href="/members"
                    >
                      <Users className="h-6 w-6" />
                      <div className="mb-2 mt-4 text-lg font-medium">Community</div>
                      <p className="text-sm leading-tight text-muted-foreground">
                        Connect with other members and explore community features
                      </p>
                    </a>
                  </NavigationMenuLink>
                </li>
                <ForumCategoryLink href="/members" title="Members Directory" icon={<Users className="h-4 w-4" />} />
                <ForumCategoryLink href="/achievements" title="Achievements" icon={<Award className="h-4 w-4" />} />
                <ForumCategoryLink
                  href="/profile/reputation"
                  title="Reputation System"
                  icon={<Award className="h-4 w-4" />}
                />
                <ForumCategoryLink
                  href="/profile/elite-access"
                  title="Elite Access"
                  icon={<Shield className="h-4 w-4" />}
                />
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuTrigger>Polls & Voting</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                <ForumCategoryLink href="/forums/polls" title="Browse Polls" icon={<PieChart className="h-4 w-4" />} />
                <ForumCategoryLink
                  href="/forums/new-poll"
                  title="Create Poll"
                  icon={<PieChart className="h-4 w-4" />}
                />
                <ForumCategoryLink
                  href="/admin/poll-analytics"
                  title="Poll Analytics"
                  icon={<BarChart className="h-4 w-4" />}
                />
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <Link href="/search" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                <Search className="mr-2 h-4 w-4" />
                Search
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <Link href="/notifications" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                <Bell className="mr-2 h-4 w-4" />
                Notifications
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <Link href="/bookmarks" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                <Bookmark className="mr-2 h-4 w-4" />
                Bookmarks
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  )
}

interface ForumCategoryLinkProps {
  href: string
  title: string
  icon: React.ReactNode
}

function ForumCategoryLink({ href, title, icon }: ForumCategoryLinkProps) {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          href={href}
          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
        >
          <div className="flex items-center gap-2">
            {icon}
            <div className="text-sm font-medium leading-none">{title}</div>
          </div>
        </a>
      </NavigationMenuLink>
    </li>
  )
}
