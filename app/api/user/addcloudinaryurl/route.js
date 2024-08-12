// app/api/user/addcloudinaryurl/route.js
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import User from '@/model/User';
import { getAuth } from '@clerk/nextjs/server';

export async function POST(req) {
  try {
    const { userId } = getAuth(req);

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { cloudinaryUrl } = body;

    if (!cloudinaryUrl) {
      return NextResponse.json({ error: 'Cloudinary URL is required' }, { status: 400 });
    }

    await dbConnect();

    const user = await User.findOne({ clerkId: userId });
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Check if the URL already exists in the array
    if (!user.cloudinaryUrls.includes(cloudinaryUrl)) {
      user.cloudinaryUrls.push(cloudinaryUrl);
      await user.save();
    }

    return NextResponse.json({ message: 'Cloudinary URL added successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error adding Cloudinary URL:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
