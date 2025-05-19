import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import Thread from '@/models/Thread';
import User from '@/models/User';
import { Category } from '@/models/Category'
import Post from '@/models/Post';

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

    // Count replies (posts) for this thread
    const replies = await Post.countDocuments({ thread: thread._id });
    // Add likes count
    const likes = thread.likes ? thread.likes.length : 0;
    // Add view count
    const views = thread.viewCount || 0;
    // Add replyCount (for compatibility)
    const replyCount = replies;
    // Add to threadData
    const threadData = {
      ...thread.toObject(),
      replies,
      replyCount,
      likes,
      views,
    };
    
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
