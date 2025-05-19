import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import User from '@/models/User';

export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();
    
    const { id, username, email, avatar } = await request.json();
    
    if (!id) {
      return NextResponse.json(
        { message: 'Clerk ID is required' },
        { status: 400 }
      );
    }

    console.log(`[API] Creating/updating user from Clerk ID: ${id}`, {
      username,
      email,
    });
      // Check if a user with this Clerk ID already exists
    let user = await User.findOne({ clerkId: id }).select('-password');
    
    // If no user with this Clerk ID, check if a user with the same email exists
    if (!user && email) {
      const existingUserWithEmail = await User.findOne({ email }).select('-password');
      
      if (existingUserWithEmail) {
        // Update the existing user with the Clerk ID
        user = existingUserWithEmail;
        user.clerkId = id;
        if (avatar) user.avatar = avatar;
        
        await user.save();
        console.log(`[API] Linked existing user by email to Clerk ID: ${id}`, {
          id: user._id,
          username: user.username,
          email
        });
      }
    }
    
    // If still no user found, create a new one
    if (!user) {
      try {
        // Generate a unique username if needed
        let finalUsername = username || email?.split('@')[0] || `user_${Math.random().toString(36).slice(2, 10)}`;
        
        // Check if username exists and make it unique if needed
        const existingUsername = await User.findOne({ username: finalUsername });
        if (existingUsername) {
          finalUsername = `${finalUsername}_${Math.random().toString(36).slice(2, 5)}`;
        }
        
        user = await User.create({
          clerkId: id,
          username: finalUsername,
          email,
          avatar,
          role: 'user',
          joinedAt: new Date(),
          // Set a placeholder password for Clerk users
          password: Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2),
        });
        console.log(`[API] Created new user with Clerk ID: ${id}`, { 
          id: user._id,
          username: user.username 
        });
      } catch (err) {
        console.error(`[API] Error creating user with Clerk ID: ${id}`, err);
        throw err;
      }
    } else {
      // Update existing user with any new information
      user.username = username || user.username;
      user.email = email || user.email;
      if (avatar) user.avatar = avatar;
      
      await user.save();
      console.log(`[API] Updated existing user with Clerk ID: ${id}`, { 
        id: user._id,
        username: user.username 
      });
    }
    
    // Return the user without the password field
    return NextResponse.json(user);
  } catch (error) {
    console.error('Error creating/updating user from Clerk:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { message: 'Failed to create/update user', error: errorMessage },
      { status: 500 }
    );
  }
}