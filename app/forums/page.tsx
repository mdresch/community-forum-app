import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ForumCategories from "@/components/forum-categories"
import { TrendingThreads } from "@/components/trending-threads"

export default function ForumsPage() {
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Forums</h1>
          <p className="text-muted-foreground">Browse and participate in community discussions</p>
        </div>
        <Button asChild>
          <Link href="/forums/new-thread">Create Thread</Link>
        </Button>
      </div>

      <Tabs defaultValue="categories" className="mb-8">
        <TabsList className="mb-4">
          <TabsTrigger value="categories">Categories</TabsTrigger>
          <TabsTrigger value="trending">Trending</TabsTrigger>
          <TabsTrigger value="recent">Recent</TabsTrigger>
        </TabsList>
        <TabsContent value="categories">
          <Card>
            <CardHeader>
              <CardTitle>Forum Categories</CardTitle>
              <CardDescription>Browse through our various discussion categories</CardDescription>
            </CardHeader>
            <CardContent>
              <ForumCategories />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="trending">
          <Card>
            <CardHeader>
              <CardTitle>Trending Discussions</CardTitle>
              <CardDescription>Popular topics this week</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-2">
              <TrendingThreads />
              <TrendingThreads />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="recent">
          <Card>
            <CardHeader>
              <CardTitle>Recent Discussions</CardTitle>
              <CardDescription>Latest topics from the community</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-2">
              <TrendingThreads />
              <TrendingThreads />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="rounded-lg border bg-muted/40 p-4 text-center">
        <h3 className="mb-2 text-lg font-medium">Can't find what you're looking for?</h3>
        <p className="mb-4 text-muted-foreground">Start a new discussion or search for existing threads</p>
        <div className="flex justify-center gap-4">
          <Button asChild>
            <Link href="/forums/new-thread">Create Thread</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/search">Search Forums</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
