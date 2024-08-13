import { auth } from '@clerk/nextjs/server';
import User from "@/models/User";
import SyntheticDataset from "@/models/SyntheticDataset";
import dbConnect from "@/utils/dbConnect";
import { NextResponse } from "next/server";

export async function POST(request) {
  const {userId, getToken} = auth();
  
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  await dbConnect();

  try {
    const { cloudinaryUrl, filename } = await request.json();

    const user = await User.findOne({ clerkId: userId });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const syntheticDataset = new SyntheticDataset({
      user: user._id,
      filename,
      cloudinaryUrl,
    });

    await syntheticDataset.save();

    return NextResponse.json({ message: 'Synthetic dataset saved successfully', syntheticDataset }, { status: 200 });
  } catch (error) {
    console.error('Error saving synthetic dataset:', error);
    return NextResponse.json({ error: 'Error saving synthetic dataset' }, { status: 500 });
  }
}