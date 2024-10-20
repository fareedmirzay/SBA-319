import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Profile',
        required: true,
    },

    message: {
        type: String,
        required: true,
    },

    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
    },
    read: {
        type: Boolean,
        default: false,
    },

    type: {
        type: String,
        enum: ["New Comment", "New Post", "Follow", "Like"],
        required: true,
    },
    created_at: {
        type: Date,
        default: Date.now()
    },
});


// Indexes
notificationSchema.index({ userId: 1 }); // Index for userId
notificationSchema.index({ postId: 1 }); // Index for postId
notificationSchema.index({ created_at: 1 }); // Index for created_at
notificationSchema.index({ read: 1 }); // Index for read


const Notification = mongoose.model('Notification', notificationSchema);  
export default Notification;