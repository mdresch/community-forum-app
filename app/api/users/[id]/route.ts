// app/api/users/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import User from '@/models/User';
import Thread from '@/models/Thread';
import Post from '@/models/Post';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectToDatabase();
    const user = await User.findById(params.id).lean();
    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    // Get threads started by the user
    const threads = await Thread.find({ author: user._id })
      .sort({ createdAt: -1 })
      .limit(10)
      .lean();

    // Get posts (replies) by the user (excluding thread starters)
    const posts = await Post.find({ author: user._id })
      .sort({ createdAt: -1 })
      .limit(10)
      .populate('thread', 'title slug category')
      .lean();

    // Recent activity: combine threads and posts, sort by date
    const recentActivity = [
      ...threads.map(t => ({
        type: 'thread',
        title: t.title,
        category: t.category,
        slug: t.slug,
        date: t.createdAt,
        id: t._id,
      })),
      ...posts.map(p => ({
        type: 'reply',
        title: p.thread?.title || '',
        category: p.thread?.category || '',
        slug: p.thread?.slug || '',
        date: p.createdAt,
        id: p._id,
      })),
    ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 10);

    return NextResponse.json({
      user: {
        id: user._id,
        username: user.username,
        name: user.name || user.username,
        avatar: user.avatar,
        email: user.email,
        joinDate: user.joinDate || user.createdAt,
        bio: user.bio,
        location: user.location,
        website: user.website,
        postCount: user.postCount,
        threadCount: user.threadCount,
        reputation: user.reputation,
        badges: user.badges || [],
      },
      threads,
      posts,
      recentActivity,
    });
  } catch (error) {
    console.error('User profile error:', error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
