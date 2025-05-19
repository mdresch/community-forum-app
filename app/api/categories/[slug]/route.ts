import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import { Category } from '@/models/Category';
import Thread from '@/models/Thread';
import User from '@/models/User';
import Post from '@/models/Post';

// GET /api/categories/[slug]
export async function GET(request: Request, context: { params: { slug: string } }) {
  const { params } = context;
  const { slug } = await params;
  try {
    await connectToDatabase();

    // Find the category by slug
    const category = await Category.findOne({ slug });
    if (!category) {
      return NextResponse.json({ error: 'Category not found' }, { status: 404 });
    }

    // Find threads for this category, populate author
    const threads = await Thread.find({ category: category._id })
      .populate('author', 'name avatar username')
      .sort({ isPinned: -1, createdAt: -1 });

    // Format threads for the frontend
    const formattedThreads = await Promise.all(threads.map(async thread => {
      // Count replies (posts) for this thread
      const replies = await Post.countDocuments({ thread: thread._id });
      return {
        id: thread._id,
        title: thread.title,
        content: thread.content,
        author: thread.author,
        isPinned: thread.isPinned,
        isLocked: thread.isLocked,
        replies,
        views: thread.viewCount || 0,
        likes: thread.likes ? thread.likes.length : 0,
        lastActivity: thread.updatedAt || thread.createdAt,
        tags: thread.tags || [],
        slug: thread.slug,
      };
    }));

    return NextResponse.json({
      category: {
        _id: category._id,
        name: category.name,
        description: category.description,
        slug: category.slug,
      },
      threads: formattedThreads,
    });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
