import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import User from '@/models/User';
import Post from '@/models/Post';

export async function GET(req: NextRequest) {
  try {
    await connectToDatabase();
    // Get all users
    const users = await User.find({}, {
      _id: 1,
      name: 1,
      username: 1,
      email: 1,
      avatar: 1,
      role: 1,
      isActive: 1,
      joinDate: 1,
      lastActive: 1
    }).lean();

    // Get post counts for each user
    const posts = await Post.aggregate([
      { $group: { _id: "$author", count: { $sum: 1 } } }
    ]);
    const postMap = Object.fromEntries(posts.map(p => [String(p._id), p.count]));

    const result = users.map(user => ({
      id: user._id,
      name: user.name,
      username: user.username,
      email: user.email,
      avatar: user.avatar,
      role: user.role,
      status: user.isActive ? "Active" : "Suspended",
      joinDate: user.joinDate,
      lastActive: user.lastActive,
      posts: postMap[String(user._id)] || 0
    }));

    return NextResponse.json(result);
  } catch (error) {
    console.error('Admin user list error:', error);
    return NextResponse.json({ message: 'Failed to fetch users' }, { status: 500 });
  }
}
