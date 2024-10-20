import mongoose from "mongoose";

const profileSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true,
    },
    bio: {
        type: String,
        minLength: 3,
        maxLength: 300,
        required: true,
    },
    profilePicture: {
        type: String,
        default: 'default-profile-pic.jpg',
    },
    website: {
        type: String,
        match: [/^https?:\/\/[^\s$.?#].[^\s]*$/, 'Please enter a valid URL'],
    },
    socialLinks: {
        facebook: {
            type: String,
            match: [/^https:\/\/facebook.com\/[A-Za-z0-9_]+$/, 'Please enter a valid Facebook URL'],
        },
        linkedIn: {
            type: String,
            match:  [/^https:\/\/www\.linkedin\.com\/in\/[A-Za-z0-9_-]+$/, 'Please enter a valid LinkedIn URL'],
        },
        twitter: {
            type: String,
            match:  [/^https:\/\/twitter.com\/[A-Za-z0-9_]+$/, 'Please enter a valid Twitter URL'],
        },
    },

    posts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
      }],
    
    created_at: {
        type: Date,
        default: Date.now()
    },
});

//indexe
profileSchema.index({ userId: 1 }); // Index for userId
profileSchema.index({ created_at: 1 }); // Index for created_at

const Profile = mongoose.model('Profile', profileSchema);
export default Profile;
