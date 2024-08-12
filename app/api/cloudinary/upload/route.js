import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');

    if (!file) {
      return NextResponse.json(
        { success: false, message: 'No file uploaded' },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Generate a unique public ID for the file
    const uniquePublicId = `csv_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;

    const result = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { 
            resource_type: 'raw',
            public_id: uniquePublicId,
            format: 'csv', // Explicitly set the format to CSV
            use_filename: true,
          },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      uploadStream.end(buffer);
    });

    console.log("Successfully Uploaded : ", result.secure_url);

    return NextResponse.json(
      { success: true, result: result },
      { status: 200 }
    );
  } catch (error) {
    console.error('Upload to Cloudinary failed:', error);
    return NextResponse.json(
      { success: false, message: 'Upload failed' },
      { status: 500 }
    );
  }
}