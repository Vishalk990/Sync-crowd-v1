import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request) {
  try {
    const body = await request.json();
    const { public_id } = body;

    if (!public_id) {
      return NextResponse.json({ success: false, message: 'Missing public_id' }, { status: 400 });
    }

    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader.destroy(public_id,  (error, result) => {
        if (error) reject(error);
        else resolve(result);
      });
    });

    return NextResponse.json({ success: true, result });
  } catch (error) {
    console.error('Error deleting file:', error);
    return NextResponse.json({ success: false, message: 'Error deleting file' }, { status: 500 });
  }
}