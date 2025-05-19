// Example handler
import User from '@/models/User';

export async function POST(req) {
  const { id, username, email, avatar } = await req.json();
  let user = await User.findOne({ clerkId: id });
  if (!user) {
    user = await User.create({
      clerkId: id, // <-- Save Clerk user id
      username,
      email,
      avatar,
    });
  }
  return Response.json(user);
}