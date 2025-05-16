"use client"

import { useState } from "react"
import Link from "next/link"
import { formatDistanceToNow } from "date-fns"
import type { Bookmark, BookmarkCollection } from "./bookmarks-manager"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  MoreVertical,
  Pencil,
  Trash2,
  FolderOpen,
  MessageSquare,
  BarChart,
  User,
  FileText,
  ExternalLink,
  Save,
} from "lucide-react"

interface BookmarkItemProps {
  bookmark: Bookmark
  collections: BookmarkCollection[]
  isSelected: boolean
  onToggleSelect: () => void
  onDelete: () => void
  onUpdate: (bookmark: Bookmark) => void
  onMove: (bookmarkId: string, collectionId: string) => void
}

export function BookmarkItem({
  bookmark,
  collections,
  isSelected,
  onToggleSelect,
  onDelete,
  onUpdate,
  onMove,
}: BookmarkItemProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [notes, setNotes] = useState(bookmark.notes || "")
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "thread":
        return <MessageSquare className="h-4 w-4" />
      case "poll":
        return <BarChart className="h-4 w-4" />
      case "user":
        return <User className="h-4 w-4" />
      default:
        return <FileText className="h-4 w-4" />
    }
  }

  const handleSaveNotes = () => {
    onUpdate({
      ...bookmark,
      notes,
    })
    setIsEditing(false)
  }

  const currentCollection = collections.find((c) => c.id === bookmark.collectionId)

  return (
    <div className="py-4">
      <div className="flex items-start gap-3">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={onToggleSelect}
          className="mt-1.5 rounded border-gray-300"
        />

        <div className="flex-1 space-y-2">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground">{getTypeIcon(bookmark.type)}</span>
                <Link href={bookmark.url} className="text-lg font-medium hover:underline">
                  {bookmark.title}
                </Link>
              </div>

              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-1.5">
                  <Avatar className="h-5 w-5">
                    <AvatarImage src={bookmark.author.avatar || "/placeholder.svg"} alt={bookmark.author.name} />
                    <AvatarFallback>{bookmark.author.name[0]}</AvatarFallback>
                  </Avatar>
                  <span>{bookmark.author.name}</span>
                </div>
                <span>•</span>
                <span>Saved {formatDistanceToNow(new Date(bookmark.createdAt), { addSuffix: true })}</span>
                {currentCollection && (
                  <>
                    <span>•</span>
                    <div className="flex items-center gap-1">
                      <FolderOpen className="h-3.5 w-3.5" />
                      <span>{currentCollection.name}</span>
                    </div>
                  </>
                )}
              </div>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <MoreVertical className="h-4 w-4" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setIsEditing(!isEditing)}>
                  <Pencil className="mr-2 h-4 w-4" />
                  {isEditing ? "Cancel editing" : "Edit notes"}
                </DropdownMenuItem>

                <DropdownMenuItem asChild>
                  <Link href={bookmark.url} target="_blank">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Open in new tab
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenu>
                  <DropdownMenuTrigger className="flex w-full items-center px-2 py-1.5 text-sm">
                    <FolderOpen className="mr-2 h-4 w-4" />
                    Move to collection
                  </DropdownMenuTrigger>
                  <DropdownMenuContent side="right">
                    {collections.map((collection) => (
                      <DropdownMenuItem
                        key={collection.id}
                        disabled={collection.id === bookmark.collectionId}
                        onClick={() => onMove(bookmark.id, collection.id)}
                      >
                        {collection.name}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>

                <DropdownMenuSeparator />

                <DropdownMenuItem className="text-red-600" onClick={() => setShowDeleteDialog(true)}>
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete bookmark
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <p className="text-sm text-muted-foreground">{bookmark.excerpt}</p>

          {isEditing ? (
            <div className="space-y-2">
              <Textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Add notes about this bookmark..."
                className="min-h-[100px]"
              />
              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setNotes(bookmark.notes || "")
                    setIsEditing(false)
                  }}
                >
                  Cancel
                </Button>
                <Button size="sm" onClick={handleSaveNotes}>
                  <Save className="mr-2 h-4 w-4" />
                  Save Notes
                </Button>
              </div>
            </div>
          ) : bookmark.notes ? (
            <div className="rounded-md bg-muted p-3 text-sm">
              <p className="italic text-muted-foreground">{bookmark.notes}</p>
            </div>
          ) : null}

          {bookmark.tags && bookmark.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {bookmark.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </div>
      </div>

      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Bookmark</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this bookmark? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                onDelete()
                setShowDeleteDialog(false)
              }}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
