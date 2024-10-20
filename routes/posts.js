import express from "express";
import Post from "../model/posts.js"
import Profile from "../model/profile.js";
import Notification  from "../model/notification.js";

const router = new express.Router()

//get all posts
router.get('/', async (req, res) => {
    try {
        const posts = await Post.find();
        res.json(posts)
    } catch (e) {
        console.error(e) 
    }
});

//get by ID
router.get("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ error: "Post not found" });
        }
        res.send(post);
    } catch (error) {
        res.status(500).json({ error: "Server Error" });
    }
});

//creating a POST that ties all of them together

router.post("/", async (req, res) => {
    try {
        const post = new Post(req.body);
        await post.save();

        // Update the profile to include  new post
        await Profile.findByIdAndUpdate(post.author, {$push: { posts: post.id }});

        //creating a notification for author, or and their followers

        const notification = new Notification({
            userId: post.author,
            message: `You created a new post titled: ${post.title}`,
            type: 'New Post',
        });

        await notification.save();

        res.status(201).json(post);
    } catch (e) {
        res.status(400).json({ error: error.message });
    }
});


router.post('/:postId/comment', async (req, res) => {
    try {
      const post = await Post.findById(req.params.postId);
      const comment = req.body.comment;
  
      // Create a notification for the post's author
      const notification = new Notification({
        userId: post.author,  // Notify the author
        message: `Someone commented on your post "${post.title}": ${comment}`,
        type: 'New Comment',
        postId: post._id,  // Associate the notification with the post
      });
  
      await notification.save();
      res.status(201).json({ message: 'Comment added and notification sent.' });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

//===================Fetching Data with Relationships==================================================


//using .populate() to bring in related documents. For example, fetching posts and include the author’s profile
router.get('/posts', async (req, res) => {
    const posts = await Post.find().populate('author');  // Populate the author (Profile) field
    res.send(posts);
  });

//fetching notifications with post information
// router.get('/notifications/:userId', async (req, res) => {
//     const notifications = await Notification.find({ userId: req.params.userId })
//       .populate('postId');  // Populate the related post
//     res.send(notifications);
//   });


router.get('/notifications/:userId', async (req, res) => {
    const { userId } = req.params;
    const limit = parseInt(req.query.limit) || 10;  // limit to 10 notifications by default
    const page = parseInt(req.query.page) || 1;  // pagination
    
    try {
      const notifications = await Notification.find({ userId })
        .populate('postId')
        .limit(limit)
        .skip((page - 1) * limit);  // pagination logic
      res.json(notifications);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  });


//===================Fetching Data with Relationships==================================================
//update or patch a Post by IF
router.put("/:id", async (req, res) => {
    try {
        const updatePost = await Post.findByIdAndUpdate(req.params.id, req.body, {new: true})
        res.send(updatePost)
    } catch (error) {
        console.log(error); 
    }
});

//Delete Post by ID 
router.delete("/:id", async (req, res) => {
    try {
        const deletePost = await Post.findByIdAndDelete(req.params.id);

        // Delete associated notifications
        await Notification.deleteMany({ postId: req.params.id });

        res.send({
            deletePost: deletePost,
            message: "Post has been Deleted"
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});






export default router;