"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Post = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const PostSchema = new mongoose_1.default.Schema({
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
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "Comment",
        },
    ],
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
    },
    timestamp: {
        type: Date,
        default: new Date(),
    },
});
exports.Post = mongoose_1.default.model("Post", PostSchema);
