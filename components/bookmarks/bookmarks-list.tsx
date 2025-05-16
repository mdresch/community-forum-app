"use client"

import { useState } from "react"
import type { Bookmark, BookmarkCollection } from "./bookmarks-manager"
import { BookmarkItem } from "./bookmark-item"
import { EmptyState } from "../ui/empty-state"
import { BookmarkIcon } from "lucide-react"

interface BookmarksListProps {
  bookmarks: Bookmark[]
  collections: BookmarkCollection[]
  onDelete: (id: string) => void
  onUpdate: (bookmark: Bookmark) => void
  onMove: (bookmarkId: string, collectionId: string) => void
}

export function BookmarksList({ bookmarks, collections, onDelete, onUpdate, onMove }: BookmarksListProps) {
  const [selectedBookmarks, setSelectedBookmarks] = useState<string[]>([])

  const toggleSelection = (id: string) => {
    setSelectedBookmarks((prev) => (prev.includes(id) ? prev.filter((bookmarkId) => bookmarkId !== id) : [...prev, id]))
  }

  const handleSelectAll = () => {
    if (selectedBookmarks.length === bookmarks.length) {
      setSelectedBookmarks([])
    } else {
      setSelectedBookmarks(bookmarks.map((bookmark) => bookmark.id))
    }
  }

  if (bookmarks.length === 0) {
    return (
      <EmptyState
        icon={<BookmarkIcon className="h-12 w-12" />}
        title="No bookmarks found"
        description="You haven't saved any bookmarks yet, or none match your current filters."
        action={{
          label: "Browse Forums",
          href: "/forums",
        }}
      />
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="select-all"
            className="rounded border-gray-300"
            checked={selectedBookmarks.length === bookmarks.length && bookmarks.length > 0}
            onChange={handleSelectAll}
          />
          <label htmlFor="select-all" className="text-muted-foreground">
            {selectedBookmarks.length > 0 ? `${selectedBookmarks.length} selected` : "Select all"}
          </label>
        </div>
        {selectedBookmarks.length > 0 && (
          <div className="flex gap-4">
            <button className="text-sm text-muted-foreground hover:text-foreground">Move to...</button>
            <button className="text-sm text-red-500 hover:text-red-600">Delete</button>
          </div>
        )}
      </div>

      <div className="divide-y">
        {bookmarks.map((bookmark) => (
          <BookmarkItem
            key={bookmark.id}
            bookmark={bookmark}
            collections={collections}
            isSelected={selectedBookmarks.includes(bookmark.id)}
            onToggleSelect={() => toggleSelection(bookmark.id)}
            onDelete={() => onDelete(bookmark.id)}
            onUpdate={onUpdate}
            onMove={onMove}
          />
        ))}
      </div>
    </div>
  )
}
