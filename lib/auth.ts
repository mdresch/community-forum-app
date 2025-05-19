import jwt from 'jsonwebtoken';
import { NextApiRequest } from 'next';
import { NextRequest } from 'next/server';
import { IUser } from '@/models/User';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '30d';

export function generateToken(user: IUser) {
  return jwt.sign(
    {
      id: user._id,
      email: user.email,
      username: user.username,
      role: user.role,
    },
    JWT_SECRET,
    {
      expiresIn: JWT_EXPIRES_IN,
    }
  );
}

export function verifyToken(token: string) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
}

export async function getUserFromRequest(req: NextApiRequest | NextRequest) {
  try {
    // For Clerk authentication
    if (req.headers.has('clerk-auth-token')) {
      try {
        // Import the Clerk auth helpers
        const { getAuth } = await import('@clerk/nextjs/server');
        
        // For App Router requests
        if (req instanceof NextRequest) {
          const { userId } = getAuth(req);
          if (!userId) {
            return null;
          }
          
          // Find the user in our database by clerkId
          const { default: User } = await import('@/models/User');
          const mongoUser = await User.findOne({ clerkId: userId });
          
          if (!mongoUser) {
            console.warn(`User with Clerk ID ${userId} not found in MongoDB`);
            return null;
          }
          
          return {
            id: mongoUser._id,
            username: mongoUser.username,
            email: mongoUser.email,
            role: mongoUser.role,
          };
        }
      } catch (e) {
        console.error('Error verifying Clerk auth:', e);
        return null;
      }
    }
    
    // Legacy JWT authentication
    let token: string | undefined;
    
    if (req instanceof NextRequest) {
      // App Router
      token = req.headers.get('authorization')?.split(' ')[1];
    } else {
      // Pages Router
      token = req.headers.authorization?.split(' ')[1];
    }
    
    if (!token) {
      return null;
    }
    
    // Verify token
    const decoded = verifyToken(token);
    
    if (!decoded) {
      return null;
    }
    
    return decoded;
  } catch (error) {
    console.error('Auth error:', error);
    return null;
  }
}