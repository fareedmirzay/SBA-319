import express from "express";
import Notification from "../model/notification.js";


const router = new express.Router()


//GET all notification
router.get('/', async (req, res) => {
    try {
        const notification = await Notification.find();
        res.json(notification)
    } catch (e) {
        console.log(e);
    }
});


//GET a single notification
router.get('/:id', async (req, res) => {
    try {
        const notification = await Notification.findById(req.params.id);
        res.json(notification)
    } catch (e) {
        console.log(e);
    }
});


//creating a notification || CREATE - POST
router.post('/', async (req, res) => {
    try {
      const { userId, message, postId, type } = req.body;
      const newNotification = new Notification({ userId, message, postId, type });
      await newNotification.save();
      res.status(201).json(newNotification);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });
  

// READ - GET all notifications for a user
router.get('/user/:userId', async (req, res) => {
    try {
      const { userId } = req.params;
      const notifications = await Notification.find({ userId }).populate('userId').populate('postId');
      res.status(200).json(notifications);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });
  

  
  // UPDATE or PATCH 
router.patch('/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const updatedNotification = await Notification.findByIdAndUpdate(id, req.body, { new: true });
      if (!updatedNotification) {
        return res.status(404).json({ error: 'Notification not found' });
      }
      res.status(200).json(updatedNotification);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });
  
  // DELETE 
router.delete('/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const deletedNotification = await Notification.findByIdAndDelete(id);
      if (!deletedNotification) {
        return res.status(404).json({ error: 'Notification not found' });
      }
      res.status(200).json({ message: 'Notification deleted successfully' });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });


export default router;