import User from '@/models/User';
import SyntheticDataset from '@/models/SyntheticDataset';
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

    const datasets = await SyntheticDataset.find({ user: user._id });

    return NextResponse.json({ datasets });
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
