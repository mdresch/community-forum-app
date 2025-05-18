import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import Thread from '@/models/Thread';
import User from '@/models/User';
import { Category } from '@/models/Category'

export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();
    
    // Get optional limit parameter from URL query
    const url = new URL(request.url);
    const limit = parseInt(url.searchParams.get('limit') || '5');
    
    // Find threads sorted by a combination of view count and recent activity
    // This creates a 'trending' effect by promoting both popular and recently active threads
    const threads = await Thread.find({})
      .populate({
        path: 'author',
        model: User,
        select: '_id username avatar'
      })
      .populate({
        path: 'category',
        model: Category,
        select: '_id name slug'
      })
      .sort({ viewCount: -1, lastActivity: -1 }) // Sort by view count (desc) and then by most recent activity
      .limit(limit);
    
    return NextResponse.json(threads);
  } catch (error) {
    console.error('Error fetching trending threads:', error);
    return NextResponse.json(
      { message: 'Failed to fetch trending threads' },
      { status: 500 }
    );
  }
}
