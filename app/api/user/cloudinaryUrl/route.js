import User from '@/models/User';
import dbConnect from '@/utils/dbConnect';
import { NextResponse } from 'next/server';


export async function GET(request) {
  try {
    await dbConnect();
    const clerkId = request.headers.get('x-clerk-user-id');

    if (!clerkId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await User.findOne({ clerkId });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ cloudinaryUrls: user.cloudinaryUrls });
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}