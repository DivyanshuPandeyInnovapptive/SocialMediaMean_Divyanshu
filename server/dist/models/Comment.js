"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Comment = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const CommentSchema = new mongoose_1.default.Schema({
    data: {
        type: String,
        trim: true,
        required: [true, "A comment name must have a data"],
        maxlength: [100, "Comment must be at max 100 characters"],
    },
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
    },
    postId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Post",
    },
    timestamp: {
        type: Date,
        default: new Date(),
    },
});
exports.Comment = mongoose_1.default.model("Comment", CommentSchema);
