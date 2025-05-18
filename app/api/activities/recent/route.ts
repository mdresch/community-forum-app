// app/api/activities/recent/route.ts
import { NextResponse } from "next/server";
import Thread from "@/models/Thread";
import User from "@/models/User";
import { Activity } from "@/lib/activity";
import { connectToDatabase } from "@/lib/db";

export async function GET() {
  try {
    await connectToDatabase();
    
    const activities = await Thread.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "author",
          foreignField: "_id",
          as: "author"
        }
      },
      {
        $unwind: "$author"
      },
      {
        $project: {
          id: "$_id",
          user: "$author.username",
          action: { $cond: [{ $eq: ["$type", "thread"] }, "created", "replied to"] },
          thread: "$title",
          threadSlug: "$slug",
          time: { $dateToString: { format: "%Y-%m-%dT%H:%M:%S.%LZ", date: "$createdAt" } },
          _id: 0
        }
      },
      {
        $sort: { time: -1 }
      },
      {
        $limit: 10
      }
    ]);

    return NextResponse.json(activities as Activity[]);
  } catch (error) {
    console.error("Error fetching recent activities:", error);
    return NextResponse.json(
      { error: "Failed to fetch recent activities" },
      { status: 500 }
    );
  }
}