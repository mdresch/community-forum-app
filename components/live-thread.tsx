"use client"

import { useState, useEffect, useRef } from "react"
import { useSocket, useSocketEvent } from "@/lib/socket"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { formatDistanceToNow } from "date-fns"
import { Send, Wifi, WifiOff } from "lucide-react"

type Comment = {
  id: string
  content: string
  author: {
    name: string
    avatar: string
    username: string
  }
  createdAt: Date
  likes: number
}

type LiveThreadProps = {
  threadId: string
  initialComments: Comment[]
}

export function LiveThread({ threadId, initialComments = [] }: LiveThreadProps) {
  const [comments, setComments] = useState<Comment[]>(initialComments)
  const [newComment, setNewComment] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [activeUsers, setActiveUsers] = useState(1)
  const commentsEndRef = useRef<HTMLDivElement>(null)
  const { isConnected } = useSocket()

  // Scroll to bottom when new comments are added
  useEffect(() => {
    commentsEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [comments])

  // Listen for new comments
  useSocketEvent<Comment>("new_comment", (comment) => {
    setComments((prev) => [...prev, { ...comment, createdAt: new Date(comment.createdAt) }])
  })

  // Listen for active users count
  useSocketEvent<number>("active_users", (count) => {
    setActiveUsers(count)
  })

  const handleSubmitComment = (e) => {
    e.preventDefault()
    if (!newComment.trim() || isSubmitting) return

    setIsSubmitting(true)

    // In a real app, this would be a server action or API call
    // that would then trigger the socket event
    const comment = {
      id: Date.now().toString(),
      content: newComment,
      author: {
        name: "Jane Smith", // This would come from the authenticated user
        avatar: "/placeholder.svg?height=40&width=40",
        username: "janesmith",
      },
      createdAt: new Date(),
      likes: 0,
    }

    // Simulate network delay
    setTimeout(() => {
      setComments((prev) => [...prev, comment])
      setNewComment("")
      setIsSubmitting(false)
    }, 500)
  }

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between border-b p-3">
        <h3 className="font-medium">Live Discussion</h3>
        <div className="flex items-center gap-2">
          {isConnected ? (
            <>
              <Wifi className="h-4 w-4 text-green-500" />
              <span className="text-xs text-muted-foreground">{activeUsers} active</span>
            </>
          ) : (
            <>
              <WifiOff className="h-4 w-4 text-red-500" />
              <span className="text-xs text-muted-foreground">Reconnecting...</span>
            </>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-4">
          {comments.map((comment) => (
            <div key={comment.id} className="flex gap-3">
              <Avatar className="h-8 w-8">
                <AvatarImage src={comment.author.avatar || "/placeholder.svg"} alt={comment.author.name} />
                <AvatarFallback>{comment.author.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium">{comment.author.name}</span>
                  <span className="text-xs text-muted-foreground">
                    {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
                  </span>
                </div>
                <p className="mt-1 text-sm">{comment.content}</p>
              </div>
            </div>
          ))}
          <div ref={commentsEndRef} />
        </div>
      </div>

      <div className="border-t p-3">
        <form onSubmit={handleSubmitComment} className="flex gap-2">
          <Textarea
            placeholder="Write a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="min-h-[60px] flex-1 resize-none"
          />
          <Button type="submit" size="icon" disabled={!newComment.trim() || isSubmitting}>
            <Send className="h-4 w-4" />
            <span className="sr-only">Send</span>
          </Button>
        </form>
        <div className="mt-2 flex items-center justify-between">
          <div className="text-xs text-muted-foreground">
            {isConnected ? (
              <span className="flex items-center gap-1">
                <Badge variant="outline" className="bg-green-50 text-green-700 px-1">
                  Live
                </Badge>
                Comments appear in real-time
              </span>
            ) : (
              <span className="flex items-center gap-1">
                <Badge variant="outline" className="bg-yellow-50 text-yellow-700 px-1">
                  Offline
                </Badge>
                Reconnecting to live chat...
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
