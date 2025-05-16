"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { BookmarksList } from "./bookmarks-list"
import { PlusCircle, Search, FolderPlus } from "lucide-react"
import { CreateCollectionDialog } from "./create-collection-dialog"

// Mock data types
export type BookmarkCollection = {
  id: string
  name: string
  description?: string
  count: number
  createdAt: string
  isDefault?: boolean
}

export type Bookmark = {
  id: string
  title: string
  url: string
  excerpt: string
  type: "thread" | "post" | "poll" | "user" | "resource"
  collectionId: string
  createdAt: string
  notes?: string
  tags?: string[]
  author: {
    name: string
    username: string
    avatar: string
  }
}

export function BookmarksManager() {
  const [activeTab, setActiveTab] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [showCreateCollection, setShowCreateCollection] = useState(false)
  const [collections, setCollections] = useState<BookmarkCollection[]>([
    {
      id: "default",
      name: "Saved Items",
      description: "Default collection for all bookmarks",
      count: 12,
      createdAt: "2023-05-15T10:30:00Z",
      isDefault: true,
    },
    {
      id: "tutorials",
      name: "Tutorials",
      description: "Helpful guides and tutorials",
      count: 5,
      createdAt: "2023-06-20T14:45:00Z",
    },
    {
      id: "interesting-discussions",
      name: "Interesting Discussions",
      description: "Thought-provoking conversations",
      count: 7,
      createdAt: "2023-07-10T09:15:00Z",
    },
  ])

  const [bookmarks, setBookmarks] = useState<Bookmark[]>([
    {
      id: "bm1",
      title: "Getting Started with Next.js",
      url: "/forums/development/getting-started-nextjs",
      excerpt: "A comprehensive guide to getting started with Next.js framework",
      type: "thread",
      collectionId: "tutorials",
      createdAt: "2023-08-15T11:30:00Z",
      tags: ["nextjs", "react", "tutorial"],
      author: {
        name: "Sarah Johnson",
        username: "sarahdev",
        avatar: "/placeholder.svg?height=40&width=40",
      },
    },
    {
      id: "bm2",
      title: "The Future of AI in Web Development",
      url: "/forums/technology/future-ai-web-development",
      excerpt: "Discussion about how AI is changing the landscape of web development",
      type: "thread",
      collectionId: "interesting-discussions",
      createdAt: "2023-09-05T16:45:00Z",
      notes: "Great insights about AI tools for developers",
      tags: ["ai", "webdev", "future"],
      author: {
        name: "Michael Chen",
        username: "miketech",
        avatar: "/placeholder.svg?height=40&width=40",
      },
    },
    {
      id: "bm3",
      title: "Should we adopt TypeScript for all new projects?",
      url: "/forums/development/adopt-typescript-poll",
      excerpt: "Community poll about TypeScript adoption for new projects",
      type: "poll",
      collectionId: "default",
      createdAt: "2023-09-10T09:20:00Z",
      tags: ["typescript", "javascript", "poll"],
      author: {
        name: "Alex Rivera",
        username: "alexdev",
        avatar: "/placeholder.svg?height=40&width=40",
      },
    },
    // More mock bookmarks...
    {
      id: "bm4",
      title: "Best practices for React Server Components",
      url: "/forums/development/react-server-components-best-practices",
      excerpt: "A detailed guide on how to effectively use React Server Components",
      type: "thread",
      collectionId: "tutorials",
      createdAt: "2023-09-12T14:30:00Z",
      tags: ["react", "server-components", "nextjs"],
      author: {
        name: "Emma Wilson",
        username: "emmaw",
        avatar: "/placeholder.svg?height=40&width=40",
      },
    },
    {
      id: "bm5",
      title: "Community AMA with the Vercel Team",
      url: "/forums/events/vercel-team-ama",
      excerpt: "Ask Me Anything session with the Vercel engineering team",
      type: "thread",
      collectionId: "interesting-discussions",
      createdAt: "2023-09-15T18:00:00Z",
      notes: "Remember to ask about their new edge functions",
      tags: ["vercel", "ama", "event"],
      author: {
        name: "Official Vercel",
        username: "vercel",
        avatar: "/placeholder.svg?height=40&width=40",
      },
    },
  ])

  const [filteredBookmarks, setFilteredBookmarks] = useState<Bookmark[]>(bookmarks)

  useEffect(() => {
    let filtered = [...bookmarks]

    // Filter by collection if not "all"
    if (activeTab !== "all") {
      filtered = filtered.filter((bookmark) => bookmark.collectionId === activeTab)
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (bookmark) =>
          bookmark.title.toLowerCase().includes(query) ||
          bookmark.excerpt.toLowerCase().includes(query) ||
          bookmark.tags?.some((tag) => tag.toLowerCase().includes(query)) ||
          bookmark.notes?.toLowerCase().includes(query),
      )
    }

    setFilteredBookmarks(filtered)
  }, [activeTab, searchQuery, bookmarks])

  const handleCreateCollection = (name: string, description?: string) => {
    const newCollection: BookmarkCollection = {
      id: `col-${Date.now()}`,
      name,
      description,
      count: 0,
      createdAt: new Date().toISOString(),
    }

    setCollections([...collections, newCollection])
    setShowCreateCollection(false)
  }

  const handleDeleteBookmark = (id: string) => {
    setBookmarks(bookmarks.filter((bookmark) => bookmark.id !== id))
  }

  const handleUpdateBookmark = (updatedBookmark: Bookmark) => {
    setBookmarks(bookmarks.map((bookmark) => (bookmark.id === updatedBookmark.id ? updatedBookmark : bookmark)))
  }

  const handleMoveBookmark = (bookmarkId: string, newCollectionId: string) => {
    setBookmarks(
      bookmarks.map((bookmark) =>
        bookmark.id === bookmarkId ? { ...bookmark, collectionId: newCollectionId } : bookmark,
      ),
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search bookmarks..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <Button variant="outline" size="sm" onClick={() => setShowCreateCollection(true)}>
            <FolderPlus className="h-4 w-4 mr-2" />
            New Collection
          </Button>
          <Button size="sm">
            <PlusCircle className="h-4 w-4 mr-2" />
            Add Bookmark
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="border-b">
          <div className="overflow-x-auto">
            <TabsList className="bg-transparent h-auto p-0 w-full justify-start">
              <TabsTrigger
                value="all"
                className="data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none rounded-none border-b-2 border-transparent px-4 py-2"
              >
                All Bookmarks
              </TabsTrigger>
              {collections.map((collection) => (
                <TabsTrigger
                  key={collection.id}
                  value={collection.id}
                  className="data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none rounded-none border-b-2 border-transparent px-4 py-2"
                >
                  {collection.name}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
        </div>

        <div className="mt-6">
          <BookmarksList
            bookmarks={filteredBookmarks}
            collections={collections}
            onDelete={handleDeleteBookmark}
            onUpdate={handleUpdateBookmark}
            onMove={handleMoveBookmark}
          />
        </div>
      </Tabs>

      <CreateCollectionDialog
        open={showCreateCollection}
        onClose={() => setShowCreateCollection(false)}
        onCreate={handleCreateCollection}
      />
    </div>
  )
}
