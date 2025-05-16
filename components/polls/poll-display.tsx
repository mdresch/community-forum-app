"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Users, Clock, AlertCircle, CheckCircle2 } from "lucide-react"
import { formatDistanceToNow, isPast } from "date-fns"
import { PollResults } from "@/components/polls/poll-results"

// Mock data for a poll
const mockPoll = {
  id: "poll-1",
  question: "What's your favorite frontend framework in 2025?",
  description: "Curious to know what the community is using for their projects this year.",
  pollType: "single",
  options: [
    { id: "opt-1", text: "React" },
    { id: "opt-2", text: "Vue" },
    { id: "opt-3", text: "Angular" },
    { id: "opt-4", text: "Svelte" },
    { id: "opt-5", text: "Other" },
  ],
  isAnonymous: false,
  expirationDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 3), // 3 days from now
  chartType: "bar",
  createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
  votes: [
    {
      optionId: "opt-1",
      userId: "user-1",
      username: "alexj",
      name: "Alex Johnson",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    {
      optionId: "opt-1",
      userId: "user-2",
      username: "sarahc",
      name: "Sarah Chen",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    {
      optionId: "opt-2",
      userId: "user-3",
      username: "migueldev",
      name: "Miguel Lopez",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    {
      optionId: "opt-4",
      userId: "user-4",
      username: "emmaw",
      name: "Emma Wilson",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    {
      optionId: "opt-1",
      userId: "user-5",
      username: "davidc",
      name: "David Chen",
      avatar: "/placeholder.svg?height=32&width=32",
    },
  ],
  totalVotes: 5,
}

export function PollDisplay({
  pollId,
  currentUser = { id: "user-current", username: "janesmith", name: "Jane Smith" },
}) {
  // In a real app, you would fetch the poll data based on the pollId
  const poll = mockPoll

  const [selectedOptions, setSelectedOptions] = useState([])
  const [hasVoted, setHasVoted] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [isExpired, setIsExpired] = useState(false)

  // Check if the current user has already voted
  useEffect(() => {
    const userVote = poll.votes.find((vote) => vote.userId === currentUser.id)
    if (userVote) {
      setHasVoted(true)
      setSelectedOptions([userVote.optionId])
      setShowResults(true)
    }
  }, [poll.votes, currentUser.id])

  // Check if the poll has expired
  useEffect(() => {
    if (poll.expirationDate && isPast(new Date(poll.expirationDate))) {
      setIsExpired(true)
      setShowResults(true)
    }
  }, [poll.expirationDate])

  const handleOptionSelect = (optionId) => {
    if (poll.pollType === "single") {
      setSelectedOptions([optionId])
    } else {
      // For multiple choice polls
      if (selectedOptions.includes(optionId)) {
        setSelectedOptions(selectedOptions.filter((id) => id !== optionId))
      } else {
        setSelectedOptions([...selectedOptions, optionId])
      }
    }
  }

  const handleVote = () => {
    if (selectedOptions.length === 0) return

    // In a real app, you would send the vote to the server
    console.log("Voted for:", selectedOptions)

    setHasVoted(true)
    setShowResults(true)
  }

  const handleToggleResults = () => {
    setShowResults(!showResults)
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle>{poll.question}</CardTitle>
            {poll.description && <CardDescription className="mt-1">{poll.description}</CardDescription>}
          </div>
          <div className="flex items-center gap-1">
            {poll.isAnonymous && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Badge variant="outline" className="gap-1">
                      <Users className="h-3 w-3" />
                      Anonymous
                    </Badge>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Votes are anonymous</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}

            {poll.expirationDate && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Badge variant={isExpired ? "destructive" : "outline"} className="gap-1">
                      <Clock className="h-3 w-3" />
                      {isExpired ? "Expired" : "Expires"}{" "}
                      {formatDistanceToNow(new Date(poll.expirationDate), { addSuffix: true })}
                    </Badge>
                  </TooltipTrigger>
                  <TooltipContent>
                    {isExpired
                      ? `This poll expired on ${new Date(poll.expirationDate).toLocaleDateString()}`
                      : `Voting closes on ${new Date(poll.expirationDate).toLocaleDateString()}`}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {showResults ? (
          <PollResults poll={poll} />
        ) : (
          <div className="space-y-4">
            {poll.pollType === "single" ? (
              <RadioGroup value={selectedOptions[0]} className="space-y-3">
                {poll.options.map((option) => (
                  <div key={option.id} className="flex items-center space-x-2">
                    <RadioGroupItem
                      value={option.id}
                      id={option.id}
                      disabled={isExpired}
                      onClick={() => handleOptionSelect(option.id)}
                    />
                    <label
                      htmlFor={option.id}
                      className="flex-1 cursor-pointer rounded-md border border-transparent p-2 text-sm hover:bg-muted"
                    >
                      {option.text}
                    </label>
                  </div>
                ))}
              </RadioGroup>
            ) : (
              <div className="space-y-3">
                {poll.options.map((option) => (
                  <div key={option.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={option.id}
                      checked={selectedOptions.includes(option.id)}
                      onCheckedChange={() => handleOptionSelect(option.id)}
                      disabled={isExpired}
                    />
                    <label
                      htmlFor={option.id}
                      className="flex-1 cursor-pointer rounded-md border border-transparent p-2 text-sm hover:bg-muted"
                    >
                      {option.text}
                    </label>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </CardContent>
      <CardFooter className="flex flex-col space-y-2">
        <div className="flex w-full items-center justify-between">
          <div className="text-sm text-muted-foreground">
            {poll.totalVotes} {poll.totalVotes === 1 ? "vote" : "votes"}
          </div>

          <div className="flex gap-2">
            {!isExpired && !hasVoted && (
              <Button onClick={handleVote} disabled={selectedOptions.length === 0}>
                Vote
              </Button>
            )}

            <Button variant="outline" size="sm" onClick={handleToggleResults}>
              {showResults ? "Hide Results" : "Show Results"}
            </Button>
          </div>
        </div>

        {hasVoted && (
          <div className="flex w-full items-center justify-center rounded-md bg-muted p-2 text-sm">
            <CheckCircle2 className="mr-2 h-4 w-4 text-green-500" />
            You have voted in this poll
          </div>
        )}

        {isExpired && (
          <div className="flex w-full items-center justify-center rounded-md bg-muted p-2 text-sm">
            <AlertCircle className="mr-2 h-4 w-4 text-destructive" />
            This poll has ended
          </div>
        )}
      </CardFooter>
    </Card>
  )
}
