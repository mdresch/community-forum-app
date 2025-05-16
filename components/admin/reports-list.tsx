"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { formatDistanceToNow } from "date-fns"

// Mock reports data
const reports = [
  {
    id: 1,
    type: "Post",
    reason: "Inappropriate content",
    status: "Pending",
    priority: "High",
    reporter: {
      name: "Alex Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
      username: "alexj",
    },
    reported: {
      name: "Michael Jordan",
      avatar: "/placeholder.svg?height=40&width=40",
      username: "mjordan",
    },
    content: "This post contains offensive language and personal attacks that violate community guidelines.",
    contentPreview:
      "I can't believe you would say something so [redacted]. You're a complete [redacted] and should be banned from this forum.",
    timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    url: "/forums/general-discussion/post-123",
  },
  {
    id: 2,
    type: "Thread",
    reason: "Spam",
    status: "Pending",
    priority: "Medium",
    reporter: {
      name: "Sarah Chen",
      avatar: "/placeholder.svg?height=40&width=40",
      username: "sarahc",
    },
    reported: {
      name: "Emma Wilson",
      avatar: "/placeholder.svg?height=40&width=40",
      username: "emmaw",
    },
    content: "This thread appears to be promotional content disguised as a discussion.",
    contentPreview:
      "Check out this amazing product that will change your life! [link removed] Use my code for 20% off!",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    url: "/forums/general-discussion/thread-456",
  },
  {
    id: 3,
    type: "User",
    reason: "Harassment",
    status: "Resolved",
    priority: "High",
    reporter: {
      name: "Jane Smith",
      avatar: "/placeholder.svg?height=40&width=40",
      username: "janesmith",
    },
    reported: {
      name: "Michael Jordan",
      avatar: "/placeholder.svg?height=40&width=40",
      username: "mjordan",
    },
    content: "This user has been sending threatening private messages and following me across threads.",
    contentPreview: "Multiple instances of targeted harassment across 5 different threads.",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    url: "/profile/mjordan",
  },
  {
    id: 4,
    type: "Post",
    reason: "Copyright violation",
    status: "Pending",
    priority: "Low",
    reporter: {
      name: "Emma Wilson",
      avatar: "/placeholder.svg?height=40&width=40",
      username: "emmaw",
    },
    reported: {
      name: "Sarah Chen",
      avatar: "/placeholder.svg?height=40&width=40",
      username: "sarahc",
    },
    content: "This post contains copyrighted material without proper attribution or permission.",
    contentPreview: "Here's the full text of the article from [website]: [content removed]",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5), // 5 hours ago
    url: "/forums/development/post-789",
  },
]

export function AdminReportsList() {
  const [selectedReport, setSelectedReport] = useState(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleViewReport = (report) => {
    setSelectedReport(report)
    setIsDialogOpen(true)
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Reported Content</CardTitle>
          <CardDescription>Review and moderate reported content</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="pending">
            <TabsList className="mb-4">
              <TabsTrigger value="pending">
                Pending ({reports.filter((r) => r.status === "Pending").length})
              </TabsTrigger>
              <TabsTrigger value="resolved">Resolved</TabsTrigger>
              <TabsTrigger value="all">All Reports</TabsTrigger>
            </TabsList>

            <TabsContent value="pending">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Type</TableHead>
                      <TableHead>Reason</TableHead>
                      <TableHead>Reported User</TableHead>
                      <TableHead>Reporter</TableHead>
                      <TableHead>Time</TableHead>
                      <TableHead>Priority</TableHead>
                      <TableHead className="w-[100px]">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {reports
                      .filter((report) => report.status === "Pending")
                      .map((report) => (
                        <TableRow key={report.id}>
                          <TableCell>
                            <Badge variant="outline">{report.type}</Badge>
                          </TableCell>
                          <TableCell>{report.reason}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Avatar className="h-6 w-6">
                                <AvatarImage
                                  src={report.reported.avatar || "/placeholder.svg"}
                                  alt={report.reported.name}
                                />
                                <AvatarFallback>{report.reported.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <span className="text-sm">@{report.reported.username}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Avatar className="h-6 w-6">
                                <AvatarImage
                                  src={report.reporter.avatar || "/placeholder.svg"}
                                  alt={report.reporter.name}
                                />
                                <AvatarFallback>{report.reporter.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <span className="text-sm">@{report.reporter.username}</span>
                            </div>
                          </TableCell>
                          <TableCell>{formatDistanceToNow(report.timestamp, { addSuffix: true })}</TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                report.priority === "High"
                                  ? "destructive"
                                  : report.priority === "Medium"
                                    ? "default"
                                    : "outline"
                              }
                            >
                              {report.priority}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Button size="sm" onClick={() => handleViewReport(report)}>
                              Review
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            <TabsContent value="resolved">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Type</TableHead>
                      <TableHead>Reason</TableHead>
                      <TableHead>Reported User</TableHead>
                      <TableHead>Reporter</TableHead>
                      <TableHead>Time</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="w-[100px]">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {reports
                      .filter((report) => report.status === "Resolved")
                      .map((report) => (
                        <TableRow key={report.id}>
                          <TableCell>
                            <Badge variant="outline">{report.type}</Badge>
                          </TableCell>
                          <TableCell>{report.reason}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Avatar className="h-6 w-6">
                                <AvatarImage
                                  src={report.reported.avatar || "/placeholder.svg"}
                                  alt={report.reported.name}
                                />
                                <AvatarFallback>{report.reported.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <span className="text-sm">@{report.reported.username}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Avatar className="h-6 w-6">
                                <AvatarImage
                                  src={report.reporter.avatar || "/placeholder.svg"}
                                  alt={report.reporter.name}
                                />
                                <AvatarFallback>{report.reporter.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <span className="text-sm">@{report.reporter.username}</span>
                            </div>
                          </TableCell>
                          <TableCell>{formatDistanceToNow(report.timestamp, { addSuffix: true })}</TableCell>
                          <TableCell>
                            <Badge variant="outline" className="bg-green-50 text-green-700">
                              {report.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Button size="sm" variant="outline" onClick={() => handleViewReport(report)}>
                              View
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            <TabsContent value="all">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Type</TableHead>
                      <TableHead>Reason</TableHead>
                      <TableHead>Reported User</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Time</TableHead>
                      <TableHead className="w-[100px]">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {reports.map((report) => (
                      <TableRow key={report.id}>
                        <TableCell>
                          <Badge variant="outline">{report.type}</Badge>
                        </TableCell>
                        <TableCell>{report.reason}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Avatar className="h-6 w-6">
                              <AvatarImage
                                src={report.reported.avatar || "/placeholder.svg"}
                                alt={report.reported.name}
                              />
                              <AvatarFallback>{report.reported.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <span className="text-sm">@{report.reported.username}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={report.status === "Resolved" ? "bg-green-50 text-green-700" : ""}
                          >
                            {report.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{formatDistanceToNow(report.timestamp, { addSuffix: true })}</TableCell>
                        <TableCell>
                          <Button
                            size="sm"
                            variant={report.status === "Pending" ? "default" : "outline"}
                            onClick={() => handleViewReport(report)}
                          >
                            {report.status === "Pending" ? "Review" : "View"}
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {selectedReport && (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>Report #{selectedReport.id}</DialogTitle>
              <DialogDescription>
                {selectedReport.type} reported {formatDistanceToNow(selectedReport.timestamp, { addSuffix: true })}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              <div className="grid gap-2">
                <div className="font-medium">Report Details</div>
                <div className="rounded-lg border p-4">
                  <div className="mb-2 grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-sm font-medium text-muted-foreground">Type:</span>{" "}
                      <Badge variant="outline">{selectedReport.type}</Badge>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-muted-foreground">Reason:</span> {selectedReport.reason}
                    </div>
                    <div>
                      <span className="text-sm font-medium text-muted-foreground">Status:</span>{" "}
                      <Badge
                        variant="outline"
                        className={selectedReport.status === "Resolved" ? "bg-green-50 text-green-700" : ""}
                      >
                        {selectedReport.status}
                      </Badge>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-muted-foreground">Priority:</span>{" "}
                      <Badge
                        variant={
                          selectedReport.priority === "High"
                            ? "destructive"
                            : selectedReport.priority === "Medium"
                              ? "default"
                              : "outline"
                        }
                      >
                        {selectedReport.priority}
                      </Badge>
                    </div>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-muted-foreground">Report Message:</span>
                    <p className="mt-1 rounded-md bg-muted p-2 text-sm">{selectedReport.content}</p>
                  </div>
                </div>
              </div>

              <div className="grid gap-2">
                <div className="font-medium">Reported Content</div>
                <div className="rounded-lg border p-4">
                  <div className="mb-2 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage
                          src={selectedReport.reported.avatar || "/placeholder.svg"}
                          alt={selectedReport.reported.name}
                        />
                        <AvatarFallback>{selectedReport.reported.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{selectedReport.reported.name}</div>
                        <div className="text-xs text-muted-foreground">@{selectedReport.reported.username}</div>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" asChild>
                      <a href={selectedReport.url} target="_blank" rel="noopener noreferrer">
                        View Original
                      </a>
                    </Button>
                  </div>
                  <div className="rounded-md bg-muted p-3 text-sm">{selectedReport.contentPreview}</div>
                </div>
              </div>

              <div className="grid gap-2">
                <div className="font-medium">Reporter</div>
                <div className="rounded-lg border p-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage
                        src={selectedReport.reporter.avatar || "/placeholder.svg"}
                        alt={selectedReport.reporter.name}
                      />
                      <AvatarFallback>{selectedReport.reporter.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{selectedReport.reporter.name}</div>
                      <div className="text-sm text-muted-foreground">@{selectedReport.reporter.username}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <DialogFooter className="gap-2 sm:justify-between">
              {selectedReport.status === "Pending" ? (
                <>
                  <div className="flex gap-2">
                    <Button variant="destructive">Delete Content</Button>
                    <Button variant="outline">Warn User</Button>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline">Dismiss Report</Button>
                    <Button>Mark as Resolved</Button>
                  </div>
                </>
              ) : (
                <div className="flex gap-2 sm:ml-auto">
                  <Button variant="outline">Reopen Report</Button>
                  <Button>Close</Button>
                </div>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </>
  )
}
