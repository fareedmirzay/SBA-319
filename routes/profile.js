import express from "express";
import Profile from '../model/profile.js'

const router = new express.Router()


//GET ALL PROFILES
router.get("/", async (req, res) => {
    try {
        const profile = await Profile.find();
        res.json(profile)
    } catch (e) {
        console.log(e);
    }
});



//create a new user
router.post("/", async (req, res) => {
    try {
      const profile = await Profile.create(req.body);
      res.status(201).send(profile);
    } catch (error) {
      if (error.name === 'ValidationError') {
        res.status(400).json({ message: error.message });
      } else {
        res.status(500).json({ message: "Server Error" });
      }
    }
  });

//Get PROFILE BY ID
router.get("/:id", async (req, res) => {
    try {
        const profile = await Profile.findById(req.params.id)
        res.send(profile)
    } catch (error) {
        console.log(error);
    }
});


// router.patch('/:id', async (req, res) => {
//     try {
//       const { id } = req.params;
//       const updatedProfile = await Profile.findByIdAndUpdate(id, req.body, { new: true });
//       if (!updatedProfile) {
//         return res.status(404).json({ error: 'Notification not found' });
//       }
//       res.status(200).json(updatedProfile);
//     } catch (error) {
//       res.status(400).json({ error: error.message });
//     }
//   })


router.patch('/profile/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const updatedData = req.body;
  
      const updatedProfile = await Profile.findByIdAndUpdate(id, updatedData, { new: true });
  
      if (!updatedProfile) {
        return res.status(404).json({ error: 'Profile not found' });
      }
  
      res.json(updatedProfile);
    } catch (err) {
      res.status(500).json({ error: 'Server error' });
    }
  });


router.patch('/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const updatedData = req.body;
  
      const updatedProfile = await Profile.findByIdAndUpdate(id, updatedData, { new: true });
  
      if (!updatedProfile) {
        return res.status(404).json({ error: 'Profile not found' });
      }
  
      res.json(updatedProfile);
    } catch (err) {
      res.status(500).json({ error: 'Server error' });
    }
  });



// DELETE a profile by ID
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        // Find and delete the profile
        const deletedProfile = await Profile.findByIdAndDelete(id);

        if (!deletedProfile) {
            return res.status(404).json({ error: 'Profile not found' });
        }

        // delete related data, posts associated with the profile
        await Post.deleteMany({ author: id });

        res.status(200).json({ message: 'Profile deleted successfully', deletedProfile });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

export default router;
