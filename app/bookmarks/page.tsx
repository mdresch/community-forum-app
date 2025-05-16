import type { Metadata } from "next"
import { BookmarksManager } from "@/components/bookmarks/bookmarks-manager"

export const metadata: Metadata = {
  title: "Manage Bookmarks",
  description: "Organize and manage your saved content from across the forum.",
}

export default function BookmarksPage() {
  return (
    <div className="container py-6 md:py-10">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Bookmarks</h1>
        <p className="text-muted-foreground mt-2">Organize and manage your saved content from across the forum</p>
      </div>
      <BookmarksManager />
    </div>
  )
}
