import Link from "next/link"
import { MessageSquare, Users, Code, Lightbulb, HelpCircle, Briefcase } from "lucide-react"

const categories = [
  {
    id: 1,
    name: "General Discussion",
    description: "Chat about anything and everything",
    icon: <MessageSquare className="h-5 w-5" />,
    threadCount: 324,
    slug: "general-discussion",
  },
  {
    id: 2,
    name: "Introductions",
    description: "Introduce yourself to the community",
    icon: <Users className="h-5 w-5" />,
    threadCount: 156,
    slug: "introductions",
  },
  {
    id: 3,
    name: "Development",
    description: "Discuss programming and development",
    icon: <Code className="h-5 w-5" />,
    threadCount: 487,
    slug: "development",
  },
  {
    id: 4,
    name: "Ideas & Feedback",
    description: "Share your ideas and give feedback",
    icon: <Lightbulb className="h-5 w-5" />,
    threadCount: 213,
    slug: "ideas-feedback",
  },
  {
    id: 5,
    name: "Help & Support",
    description: "Get help from the community",
    icon: <HelpCircle className="h-5 w-5" />,
    threadCount: 398,
    slug: "help-support",
  },
  {
    id: 6,
    name: "Jobs & Opportunities",
    description: "Find or post job opportunities",
    icon: <Briefcase className="h-5 w-5" />,
    threadCount: 92,
    slug: "jobs-opportunities",
  },
]

export function ForumCategories() {
  return (
    <div className="space-y-4">
      {categories.map((category) => (
        <Link
          key={category.id}
          href={`/forums/${category.slug}`}
          className="flex items-start gap-4 rounded-lg border p-4 transition-colors hover:bg-muted"
        >
          <div className="mt-1 rounded-md bg-primary/10 p-2 text-primary">{category.icon}</div>
          <div className="flex-1">
            <h3 className="font-semibold">{category.name}</h3>
            <p className="text-sm text-muted-foreground">{category.description}</p>
          </div>
          <div className="text-sm text-muted-foreground">{category.threadCount} threads</div>
        </Link>
      ))}
    </div>
  )
}
