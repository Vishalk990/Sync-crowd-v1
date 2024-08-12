import { getAuth } from "@clerk/nextjs/server";

import User from "@/models/User";
import dbConnect from "@/utils/dbConnect";

export async function POST(request) {
  const { userId } = getAuth(request);
  
  if (!userId) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  await dbConnect();

  try {
    const { name, email } = await request.json();

    let user = await User.findOne({ clerkId: userId });

    if (user) {
      
      user.name = name;
      user.email = email;
      await user.save();
    } else {
      // Create new user
      user = new User({
        clerkId: userId,
        name,
        email,
      });
      await user.save();
    }

    return new Response(JSON.stringify({ message: 'User saved successfully', user }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error saving user:', error);
    return new Response(JSON.stringify({ error: 'Error saving user' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}