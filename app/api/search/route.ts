import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import Thread from '@/models/Thread';
import User from '@/models/User';
import { Category } from '@/models/Category';

export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();
    const url = new URL(request.url);
    const q = url.searchParams.get('q')?.trim();
    if (!q) {
      return NextResponse.json({ threads: [] });
    }
    // Simple search: title, author username, or category name
    const threads = await Thread.find({
      $or: [
        { title: { $regex: q, $options: 'i' } },
      ],
    })
      .populate({
        path: 'author',
        model: User,
        select: 'username avatar',
      })
      .populate({
        path: 'category',
        model: Category,
        select: 'name slug',
      })
      .sort({ lastActivity: -1 })
      .limit(20)
      .lean();
    return NextResponse.json({ threads });
  } catch (error) {
    console.error('Search API error:', error);
    return NextResponse.json({ message: 'Search failed' }, { status: 500 });
  }
}
