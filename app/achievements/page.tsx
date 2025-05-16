import { UserAchievements } from "@/components/gamification/user-achievements"
import { Leaderboard } from "@/components/gamification/leaderboard"

export default function AchievementsPage() {
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Achievements & Leaderboard</h1>
        <p className="text-muted-foreground">Track your progress and see how you rank in the community</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <UserAchievements />
        <Leaderboard />
      </div>
    </div>
  )
}
