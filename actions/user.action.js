"use server";

const { default: User } = require("@/models/User");
const { default: dbConnect } = require("@/utils/dbConnect");


export async function createUser(user) {
    try {
        await dbConnect();
        const newUser = await User.create(user);
        return JSON.parse(JSON.stringify(newUser));
        
        

    } catch (error) {
        
    }
}
