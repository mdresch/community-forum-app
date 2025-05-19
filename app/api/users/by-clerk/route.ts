import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import User from '@/models/User';

export async function GET(
  request: NextRequest,
  { params }: { params: { clerkId: string } }
) {
  try {
    await connectToDatabase();
    
    const { clerkId } = params;
    if (!clerkId) {
      return NextResponse.json(
        { message: 'Clerk ID is required' },
        { status: 400 }
      );
    }

    console.log(`[API] Looking up user by Clerk ID: ${clerkId}`);
    
    const user = await User.findOne({ clerkId }).select('-password');
    
    if (!user) {
      console.log(`[API] No user found with Clerk ID: ${clerkId}`);
      return NextResponse.json(null);
    }
    
    console.log(`[API] Found user with Clerk ID: ${clerkId}`, { 
      id: user._id,
      username: user.username
    });
    
    return NextResponse.json(user);
  } catch (error) {
    console.error('[API] Error fetching user by Clerk ID:', error);
    return NextResponse.json(
      { message: 'Failed to fetch user' },
      { status: 500 }
    );
  }
}
