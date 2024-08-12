
import dbConnect from '@/utils/dbConnect';
import User from '@/models/User';

export async function POST(req, res) {
  const { email } = await req.json();

  if (!email) {
    return new Response(JSON.stringify({ error: 'Email is required' }), {
      status: 400,
    });
  }

  try {
    await dbConnect();
    const user = await User.findOne({ email });

    if (user) {
      return new Response(JSON.stringify({ exists: true }), { status: 200 });
    } else {
      return new Response(JSON.stringify({ exists: false }), { status: 200 });
    }
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
    });
  }
}