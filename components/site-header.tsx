"use client";
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { MainNav } from "@/components/main-nav"
import { MobileNav } from "@/components/mobile-nav"
import { UserNav } from "@/components/user-nav"
import { ThemeToggle } from "@/components/theme-toggle"
import { SignedIn, SignedOut, UserButton, SignInButton, SignUpButton } from '@clerk/nextjs'

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <span className="text-xl font-bold">Community Forum</span>
        </Link>
        <MainNav />
        <MobileNav />
        <div className="ml-auto flex items-center space-x-4">
          <ThemeToggle />
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
          <SignedOut>
            <SignInButton mode="modal">
              <Button asChild variant="ghost" size="sm">
                <span>Sign in</span>
              </Button>
            </SignInButton>
            <SignUpButton mode="modal">
              <Button asChild size="sm">
                <span>Sign up</span>
              </Button>
            </SignUpButton>
          </SignedOut>
        </div>
      </div>
    </header>
  )
}
