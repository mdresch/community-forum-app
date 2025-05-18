"use client";

import React from "react";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { useRecentActivity } from "@/hooks/useRecentActivity";

export function RecentActivity() {
  const { activities, loading, error } = useRecentActivity();

  // Loading state with skeleton UI
  if (loading) {
    return (
      <div className="space-y-4 animate-pulse">
        <div className="text-sm">
          <div className="h-4 w-32 bg-muted rounded" />
          <div className="mt-1 h-4 w-24 bg-muted rounded" />
        </div>
        <div className="text-sm">
          <div className="h-4 w-32 bg-muted rounded" />
          <div className="mt-1 h-4 w-24 bg-muted rounded" />
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="text-sm text-destructive">
        <div className="font-medium">Error loading activities</div>
        <div className="text-sm">{error}</div>
      </div>
    );
  }

  // Success state with actual data
  return (
    <div className="space-y-4">
      {activities.map((activity) => (
        <div key={activity.id} className="text-sm">
          <span className="font-medium">{activity.user}</span>{" "}
          <span className="text-muted-foreground">{activity.action}</span>{" "}
          <Link href={`/forums/thread/${activity.threadSlug}`} className="font-medium hover:underline">
            {activity.thread}
          </Link>
          <div className="mt-1 text-xs text-muted-foreground">
            {formatDistanceToNow(new Date(activity.time), { addSuffix: true })}
          </div>
        </div>
      ))}
    </div>
  );
}