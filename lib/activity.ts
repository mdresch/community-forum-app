// lib/activity.ts
export interface Activity {
  id: string;  // Changed to string since MongoDB uses string IDs
  user: string;
  action: string;
  thread: string;
  threadSlug: string;
  time: string;  // Store as ISO string in database
}

export interface ActivityResponse {
  activities: Activity[];
  total: number;
  page: number;
  limit: number;
}