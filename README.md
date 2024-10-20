# Social Media API

This is a simple social media API built using Node.js, Express, and MongoDB. The API supports functionalities for posts, user profiles, and notifications.

## Table of Contents
- [Features](#features)
- [Installation](#installation)
- [API Endpoints](#api-endpoints)
- [Models](#models)
- [Middleware](#middleware)


## Features
- Create, read, update, and delete posts.
- User profiles with bios, profile pictures, and social links.
- Notifications for activities such as new posts and comments.
- Data relationships between users, posts, and notifications.

### ########################### API Endpoints ###############################################3
###### Posts
GET /posts - Get all posts
GET /posts/:id - Get a post by ID
POST /posts - Create a new post
PUT /posts/:id - Update a post by ID
DELETE /posts/:id - Delete a post by ID
###### Profiles
GET /profile - Get all profiles
GET /profile/:id - Get a profile by ID
POST /profile - Create a new user profile
PATCH /profile/:id - Update a profile by ID
###### Notifications
GET /notification - Get all notifications
GET /notification/:id - Get a notification by ID
POST /notification - Create a new notification
PATCH /notification/:id - Update a notification by ID
DELETE /notification/:id - Delete a notification by ID
Models
###### Post
title: String (required)
body: String (required)
author: Reference to Profile (required)
created_at: Date (default: current date)
topic: String (default: "Express") 
###### Profile
userId: Reference to User (required, unique)
bio: String (required)
profilePicture: String (default: 'default-profile-pic.jpg')
website: String (valid URL)
socialLinks: Object (Facebook, LinkedIn, Twitter)
posts: Array of references to Post
created_at: Date (default: current date)
###### Notification
userId: Reference to Profile (required)
message: String (required)
postId: Reference to Post
read: Boolean (default: false)
type: String (enum: "New Comment", "New Post", "Follow", "Like")
created_at: Date (default: current date)
###### Middleware
CORS: Allows cross-origin requests.
Helmet: Secures HTTP headers.
Morgan: HTTP request logger.
