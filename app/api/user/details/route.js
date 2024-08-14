import User from "@/models/User";
import dbConnect from "@/utils/dbConnect";
import { NextResponse } from "next/server";
import { auth } from '@clerk/nextjs/server';

export async function GET(request) {
    const {userId, getToken} = auth();
  
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

  await dbConnect();

  try {
    const user = await User.findOne({ clerkId: userId });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ 
      credits: user.credits,
      membershipType: user.membershipType
    }, { status: 200 });
  } catch (error) {
    console.error('Error fetching user details:', error);
    return NextResponse.json({ error: 'Error fetching user details' }, { status: 500 });
  }
}