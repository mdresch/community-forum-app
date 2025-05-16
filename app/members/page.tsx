import type { Metadata } from "next"
import { MembersDirectory } from "@/components/members/members-directory"

export const metadata: Metadata = {
  title: "Community Members | Forum",
  description: "Browse and connect with members of our community",
}

export default function MembersPage() {
  return (
    <div className="container py-6 md:py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Community Members</h1>
        <p className="mt-2 text-muted-foreground">Browse and connect with members of our thriving community</p>
      </div>
      <MembersDirectory />
    </div>
  )
}
