import dbConnect from "@/lib/dbConnect";

export async function GET(request) {
  try {
    // Connect to the database
    const mongoose = await dbConnect();

    // Get the users collection
    const usersCollection = mongoose.connection.db.collection("users");

    // Fetch all users
    const users = await usersCollection.find({}).toArray();

    // Console log the users
    console.log("Users:", users);

    // Return the users as a response
    return Response.json({ success: true, users }, { status: 200 });
  } catch (error) {
    console.error("Error fetching users:", error);
    return Response.json(
      { success: false, message: "Error fetching users" },
      { status: 500 }
    );
  }
}