import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: [true, "A post name must have a title"],
    maxlength: [50, "Title must be at max 50 characters"],
  },
  description: {
    type: String,
    trim: true,
    required: [true, "A description name must be provided"],
    maxlength: [200, "Description must be at max 200 characters"],
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  timestamp: {
    type: Date,
    default: new Date(),
  },
});

export const Post = mongoose.model("Post", PostSchema);
