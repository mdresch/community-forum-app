"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { PollCreator } from "@/components/polls/poll-creator"
import { PollDisplay } from "@/components/polls/poll-display"

export default function CreatePollPage({ params }) {
  const [pollCreated, setPollCreated] = useState(false)
  const [pollData, setPollData] = useState(null)

  const handleCreatePoll = (data) => {
    // In a real app, you would send the poll data to the server
    console.log("Poll created:", data)
    setPollData(data)
    setPollCreated(true)
  }

  const handleCancel = () => {
    // Navigate back to the thread
    window.history.back()
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-4">
        <Link
          href={`/forums/${params.category}/${params.thread}`}
          className="mb-2 inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-1 h-4 w-4"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
          Back to thread
        </Link>
        <h1 className="text-3xl font-bold tracking-tight">{pollCreated ? "Poll Created" : "Create Poll"}</h1>
        <p className="text-muted-foreground">
          {pollCreated ? "Your poll has been added to the thread" : "Add a poll to gather feedback from the community"}
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="md:col-span-2">
          {pollCreated ? (
            <div className="space-y-6">
              <PollDisplay pollId="new-poll" />

              <div className="flex justify-center">
                <Button asChild>
                  <Link href={`/forums/${params.category}/${params.thread}`}>Return to Thread</Link>
                </Button>
              </div>
            </div>
          ) : (
            <PollCreator onSubmit={handleCreatePoll} onCancel={handleCancel} />
          )}
        </div>
      </div>
    </div>
  )
}
