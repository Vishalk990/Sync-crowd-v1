import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    clerkId: { 
        type: String, 
        unique: true, 
        required: true 
    },
    name: { 
        type: String, 
        required: true 
    },
    email: { 
        type: String, 
        required: true, 
        unique: true 
    },
    cloudinaryUrls: [{ 
        type: String
    }],
    membershipType: {
        type: String,
        enum: ['free', 'pro', 'scaler'],
        default: 'free'
    },
    credits: {
        type: Number,
        default: 5  
    },
    purchaseHistory: [{
        productId: String,
        purchaseDate: Date,
        amount: Number
    }],
    joinedAt: { 
        type: Date, 
        default: Date.now 
    },
});

export default mongoose.models.User || mongoose.model('User', userSchema);