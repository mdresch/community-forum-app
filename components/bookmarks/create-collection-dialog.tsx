"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface CreateCollectionDialogProps {
  open: boolean
  onClose: () => void
  onCreate: (name: string, description?: string) => void
}

export function CreateCollectionDialog({ open, onClose, onCreate }: CreateCollectionDialogProps) {
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!name.trim()) {
      setError("Collection name is required")
      return
    }

    onCreate(name.trim(), description.trim() || undefined)
    setName("")
    setDescription("")
    setError("")
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        if (!isOpen) onClose()
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Collection</DialogTitle>
          <DialogDescription>Create a new collection to organize your bookmarks</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium">
              Collection Name <span className="text-red-500">*</span>
            </label>
            <Input
              id="name"
              value={name}
              onChange={(e) => {
                setName(e.target.value)
                setError("")
              }}
              placeholder="e.g., Tutorials, Important Threads"
            />
            {error && <p className="text-sm text-red-500">{error}</p>}
          </div>

          <div className="space-y-2">
            <label htmlFor="description" className="text-sm font-medium">
              Description (optional)
            </label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="What kind of content will you save here?"
              rows={3}
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Create Collection</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
