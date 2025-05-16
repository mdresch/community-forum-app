import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Award, Calendar, Trophy, Star } from "lucide-react"

interface MemberBadgesProps {
  badges: string[]
}

export function MemberBadges({ badges }: MemberBadgesProps) {
  if (!badges || badges.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-10">
          <p className="text-muted-foreground">No badges earned yet.</p>
        </CardContent>
      </Card>
    )
  }

  // Group badges by category
  const badgeCategories = {
    Participation: badges.filter((b) => b.includes("Year") || b.includes("Posts") || b.includes("Replies")),
    Achievement: badges.filter((b) => b.includes("Expert") || b.includes("Guru") || b.includes("Master")),
    Special: badges.filter((b) => b.includes("Staff") || b.includes("Founder") || b.includes("Beta")),
    Other: badges.filter(
      (b) =>
        !b.includes("Year") &&
        !b.includes("Posts") &&
        !b.includes("Replies") &&
        !b.includes("Expert") &&
        !b.includes("Guru") &&
        !b.includes("Master") &&
        !b.includes("Staff") &&
        !b.includes("Founder") &&
        !b.includes("Beta"),
    ),
  }

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium">Badges & Achievements</h3>

      {Object.entries(badgeCategories).map(
        ([category, categoryBadges]) =>
          categoryBadges.length > 0 && (
            <Card key={category}>
              <CardHeader>
                <div className="flex items-center gap-2">
                  {getBadgeCategoryIcon(category)}
                  <CardTitle className="text-base">{category} Badges</CardTitle>
                </div>
                <CardDescription>{getBadgeCategoryDescription(category)}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                  {categoryBadges.map((badge, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 rounded-lg border bg-card p-3 text-card-foreground shadow-sm"
                    >
                      <div className="rounded-full bg-primary/10 p-2">
                        <Award className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{badge}</p>
                        <p className="text-xs text-muted-foreground">Earned Jun 2023</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ),
      )}
    </div>
  )
}

function getBadgeCategoryIcon(category: string) {
  switch (category) {
    case "Participation":
      return <Calendar className="h-5 w-5 text-primary" />
    case "Achievement":
      return <Trophy className="h-5 w-5 text-primary" />
    case "Special":
      return <Star className="h-5 w-5 text-primary" />
    default:
      return <Award className="h-5 w-5 text-primary" />
  }
}

function getBadgeCategoryDescription(category: string) {
  switch (category) {
    case "Participation":
      return "Badges earned through regular participation in the community"
    case "Achievement":
      return "Badges earned by reaching significant milestones"
    case "Special":
      return "Special badges awarded for unique contributions"
    default:
      return "Other badges earned in the community"
  }
}
