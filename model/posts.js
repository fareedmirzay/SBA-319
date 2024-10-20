import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 50,
  },
  body: {
    type: String,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'profile',
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now()
  },
  topic: {
    type: String,
    enum: ["JavaScript", "Python", "React", "Express"],
    default: "Express"
  },
});


//INDEX
postSchema.index({ title: 1 }); // Index for the title field
postSchema.index({ author: 1 }); // Index for author field
postSchema.index({ topic: 1 }); // Index for topic field

// create a new Post model
const Post = mongoose.model('Post', postSchema);
export default Post;