import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import Thread from '@/models/Thread';
import User from '@/models/User';
import { Category } from '@/models/Category'

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    await connectToDatabase();
    const { slug } = await params;

    // Find thread by slug and populate the author field
    const thread = await Thread.findOne({ slug })
      .populate({
        path: 'author',
        model: User,
        select: '_id username avatar bio joinDate'
      })
      .populate({
        path: 'category',
        model: Category,
        select: '_id name slug'
      });

    if (!thread) {
      return NextResponse.json(
        { message: 'Thread not found' },
        { status: 404 }
      );
    }

    // Convert to plain object to add category name
    const threadData = thread.toObject();
    
    // Increment view count
    await Thread.findByIdAndUpdate(thread._id, { $inc: { viewCount: 1 } });

    return NextResponse.json(threadData);
  } catch (error) {
    console.error('Error fetching thread by slug:', error);
    return NextResponse.json(
      { message: 'Error fetching thread' },
      { status: 500 }
    );
  }
}
