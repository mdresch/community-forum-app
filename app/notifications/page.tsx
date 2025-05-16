import { NotificationList } from "@/components/notifications/notification-list"
import { NotificationPreferences } from "@/components/notifications/notification-preferences"

export default function NotificationsPage() {
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Notifications</h1>
        <p className="text-muted-foreground">Stay updated with forum activity</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2">
          <NotificationList />
        </div>
        <div>
          <NotificationPreferences />
        </div>
      </div>
    </div>
  )
}
