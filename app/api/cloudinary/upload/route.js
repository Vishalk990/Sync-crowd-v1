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

    const originalFilename = file.name;
    
    const filenameWithoutExtension = originalFilename.replace(/\.[^/.]+$/, "").replace(/\s+/g, '_');
    

    const uniquePublicId = `csv_${Date.now()}_${filenameWithoutExtension}`;

    const result = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { 
          resource_type: 'raw',
          public_id: uniquePublicId,
          format: 'csv',
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
