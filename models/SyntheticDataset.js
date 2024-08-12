import mongoose from 'mongoose';

const syntheticDatasetSchema = new mongoose.Schema({
    user: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    cloudinaryUrl: { 
        type: String,
        required: true
    },
    createdAt: { 
        type: Date,
        default: Date.now
    },
});

export default mongoose.models.SyntheticDataset || mongoose.model('SyntheticDataset', syntheticDatasetSchema);