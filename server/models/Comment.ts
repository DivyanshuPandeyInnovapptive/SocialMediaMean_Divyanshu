import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
  data: {
    type: String,
    trim: true,
    required: [true, "A comment name must have a data"],
    maxlength: [100, "Comment must be at max 100 characters"],
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
  },
  timestamp: {
    type: Date,
    default: new Date(),
  },
});

export const Comment = mongoose.model("Comment", CommentSchema);
