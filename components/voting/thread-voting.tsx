"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { ThumbsUp, ThumbsDown, Award } from "lucide-react"

export function ThreadVoting({
  threadId,
  initialVotes = { upvotes: 24, downvotes: 3 },
  initialUserVote = null, // 'up', 'down', or null
  isFeatured = false,
  onFeature = () => {},
  showDownvote = true,
  vertical = false,
  size = "default", // 'default', 'sm', or 'lg'
}) {
  const [votes, setVotes] = useState(initialVotes)
  const [userVote, setUserVote] = useState(initialUserVote)

  const handleVote = (voteType) => {
    // If user clicks the same vote type again, remove their vote
    if (userVote === voteType) {
      setUserVote(null)

      if (voteType === "up") {
        setVotes({ ...votes, upvotes: votes.upvotes - 1 })
      } else {
        setVotes({ ...votes, downvotes: votes.downvotes - 1 })
      }
    }
    // If user is changing their vote
    else if (userVote !== null) {
      setUserVote(voteType)

      if (voteType === "up") {
        setVotes({
          upvotes: votes.upvotes + 1,
          downvotes: votes.downvotes - 1,
        })
      } else {
        setVotes({
          upvotes: votes.upvotes - 1,
          downvotes: votes.downvotes + 1,
        })
      }
    }
    // If user is voting for the first time
    else {
      setUserVote(voteType)

      if (voteType === "up") {
        setVotes({ ...votes, upvotes: votes.upvotes + 1 })
      } else {
        setVotes({ ...votes, downvotes: votes.downvotes + 1 })
      }
    }

    // In a real app, you would send the vote to the server
    console.log(`Voted ${voteType} for thread ${threadId}`)
  }

  const getButtonSize = () => {
    switch (size) {
      case "sm":
        return "h-8 w-8"
      case "lg":
        return "h-12 w-12"
      default:
        return "h-10 w-10"
    }
  }

  const getIconSize = () => {
    switch (size) {
      case "sm":
        return "h-4 w-4"
      case "lg":
        return "h-6 w-6"
      default:
        return "h-5 w-5"
    }
  }

  const getScoreSize = () => {
    switch (size) {
      case "sm":
        return "text-sm"
      case "lg":
        return "text-xl"
      default:
        return "text-base"
    }
  }

  return (
    <div className={`flex ${vertical ? "flex-col" : "flex-row"} items-center gap-1`}>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className={`${getButtonSize()} ${userVote === "up" ? "text-green-500" : ""}`}
              onClick={() => handleVote("up")}
            >
              <ThumbsUp className={getIconSize()} />
              <span className="sr-only">Upvote</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Upvote</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <div className={`font-medium ${getScoreSize()}`}>{votes.upvotes - votes.downvotes}</div>

      {showDownvote && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className={`${getButtonSize()} ${userVote === "down" ? "text-red-500" : ""}`}
                onClick={() => handleVote("down")}
              >
                <ThumbsDown className={getIconSize()} />
                <span className="sr-only">Downvote</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Downvote</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}

      {onFeature && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className={`${getButtonSize()} ${isFeatured ? "text-yellow-500" : ""}`}
                onClick={onFeature}
              >
                <Award className={getIconSize()} />
                <span className="sr-only">Feature</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{isFeatured ? "Featured Answer" : "Feature Answer"}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </div>
  )
}
