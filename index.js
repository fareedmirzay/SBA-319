import express from "express";
import mongoose from "mongoose";
import postsRouter from "./routes/posts.js"
import profileRouter from "./routes/profile.js"
import notificationRouter from "./routes/notification.js"
import cors from "cors";
import morgan from 'morgan';
import helmet from 'helmet';
import dotenv from 'dotenv'; 


dotenv.config();

try {
    await mongoose.connect(process.env.MONGODB_URI);
} catch (e) {
    console.error(e)
}

const app = express();
const PORT = process.env.PORT;


//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));


app.use("/posts", postsRouter)
app.use("/profile", profileRouter)
app.use("/notification", notificationRouter)

app.get("/", (req, res) => {
  res.json({ msg: "Welcome to my Social Media API!" });
});

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));

