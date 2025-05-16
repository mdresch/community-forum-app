"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { format } from "date-fns"
import { CalendarIcon, Plus, Trash2, BarChart3, PieChart } from "lucide-react"

export function PollCreator({ onSubmit, onCancel }) {
  const [question, setQuestion] = useState("")
  const [description, setDescription] = useState("")
  const [pollType, setPollType] = useState("single")
  const [options, setOptions] = useState(["", ""])
  const [isAnonymous, setIsAnonymous] = useState(false)
  const [hasExpiration, setHasExpiration] = useState(false)
  const [expirationDate, setExpirationDate] = useState(null)
  const [chartType, setChartType] = useState("bar")

  const handleAddOption = () => {
    setOptions([...options, ""])
  }

  const handleRemoveOption = (index) => {
    const newOptions = [...options]
    newOptions.splice(index, 1)
    setOptions(newOptions)
  }

  const handleOptionChange = (index, value) => {
    const newOptions = [...options]
    newOptions[index] = value
    setOptions(newOptions)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // Validate form
    if (!question.trim()) {
      alert("Please enter a poll question")
      return
    }

    if (options.filter((option) => option.trim()).length < 2) {
      alert("Please provide at least two valid options")
      return
    }

    // Create poll data
    const pollData = {
      question,
      description,
      pollType,
      options: options.filter((option) => option.trim()),
      isAnonymous,
      expirationDate: hasExpiration ? expirationDate : null,
      chartType,
      createdAt: new Date(),
    }

    // Submit poll data
    onSubmit(pollData)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create Poll</CardTitle>
        <CardDescription>Add a poll to your thread to gather community feedback</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="question">Poll Question</Label>
            <Input
              id="question"
              placeholder="What do you want to ask?"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description (Optional)</Label>
            <Textarea
              id="description"
              placeholder="Add more context to your question"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="min-h-[80px]"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="poll-type">Poll Type</Label>
            <Select value={pollType} onValueChange={setPollType}>
              <SelectTrigger id="poll-type">
                <SelectValue placeholder="Select poll type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="single">Single Choice</SelectItem>
                <SelectItem value="multiple">Multiple Choice</SelectItem>
                <SelectItem value="rating">Rating Scale</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Poll Options</Label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleAddOption}
                disabled={options.length >= 10}
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Option
              </Button>
            </div>

            {options.map((option, index) => (
              <div key={index} className="flex items-center gap-2">
                <Input
                  placeholder={`Option ${index + 1}`}
                  value={option}
                  onChange={(e) => handleOptionChange(index, e.target.value)}
                  required
                />
                {options.length > 2 && (
                  <Button type="button" variant="ghost" size="icon" onClick={() => handleRemoveOption(index)}>
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Remove option</span>
                  </Button>
                )}
              </div>
            ))}
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="anonymous">Anonymous Voting</Label>
                <p className="text-sm text-muted-foreground">Hide who voted for which option</p>
              </div>
              <Switch id="anonymous" checked={isAnonymous} onCheckedChange={setIsAnonymous} />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="expiration">Poll Expiration</Label>
                <p className="text-sm text-muted-foreground">Set a date when voting will close</p>
              </div>
              <Switch id="expiration" checked={hasExpiration} onCheckedChange={setHasExpiration} />
            </div>

            {hasExpiration && (
              <div className="space-y-2">
                <Label>Expiration Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left font-normal">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {expirationDate ? format(expirationDate, "PPP") : "Select date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={expirationDate}
                      onSelect={setExpirationDate}
                      initialFocus
                      disabled={(date) => date < new Date()}
                    />
                  </PopoverContent>
                </Popover>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label>Results Display</Label>
            <RadioGroup defaultValue="bar" value={chartType} onValueChange={setChartType} className="flex gap-4">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="bar" id="chart-bar" />
                <Label htmlFor="chart-bar" className="flex items-center gap-1 cursor-pointer">
                  <BarChart3 className="h-4 w-4" />
                  Bar Chart
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="pie" id="chart-pie" />
                <Label htmlFor="chart-pie" className="flex items-center gap-1 cursor-pointer">
                  <PieChart className="h-4 w-4" />
                  Pie Chart
                </Label>
              </div>
            </RadioGroup>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button onClick={handleSubmit}>Create Poll</Button>
      </CardFooter>
    </Card>
  )
}
