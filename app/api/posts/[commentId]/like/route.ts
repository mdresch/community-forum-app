import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import Post from '@/models/Post';
import { currentUser } from "@clerk/nextjs/server";
import User from '@/models/User';

export async function POST(request: NextRequest, context: { params: { commentId: string } }) {
  try {
    // Fix: Await params if needed (App Router best practice)
    const { commentId } = await context.params;
    const user = await currentUser();
    if (!user) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }
    await connectToDatabase();
    const dbUser = await User.findOne({ clerkId: user.id });
    if (!dbUser) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }
    const comment = await Post.findById(commentId);
    if (!comment) {
      return NextResponse.json({ message: 'Comment not found' }, { status: 404 });
    }
    if (!comment.likes.includes(dbUser._id)) {
      comment.likes.push(dbUser._id);
      await comment.save();
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ message: 'Failed to like comment', error: (error as Error).message }, { status: 500 });
  }
}