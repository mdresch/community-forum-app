import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import ForumCategories from "@/components/forum-categories"
import { TrendingThreads } from "@/components/trending-threads"
import { RecentActivity } from "@/components/recent-activity"

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-6">
      <section className="mb-10 text-center">
        <h1 className="mb-4 text-4xl font-bold tracking-tight">Welcome to Community Forum</h1>
        <p className="mx-auto mb-6 max-w-2xl text-muted-foreground">
          Join our community to discuss topics, share ideas, and connect with like-minded people.
        </p>
        <div className="flex justify-center gap-4">
          <Button asChild size="lg">
            <Link href="/forums">Browse Forums</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/auth/register">Join Community</Link>
          </Button>
        </div>
      </section>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Forum Categories</CardTitle>
            <CardDescription>Browse through our various discussion categories</CardDescription>
          </CardHeader>
          <CardContent>
            <ForumCategories />
          </CardContent>
          <CardFooter>
            <Button asChild variant="outline" className="w-full">
              <Link href="/forums">View All Forums</Link>
            </Button>
          </CardFooter>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Trending Discussions</CardTitle>
              <CardDescription>Popular topics this week</CardDescription>
            </CardHeader>
            <CardContent>
              <TrendingThreads />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest posts from the community</CardDescription>
            </CardHeader>
            <CardContent>
              <RecentActivity />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
