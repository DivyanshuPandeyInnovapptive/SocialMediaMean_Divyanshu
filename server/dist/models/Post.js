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
});
exports.Post = mongoose_1.default.model("Post", PostSchema);
/*

# add post
# mutation {
#   addPost(title: "Post 1", description: "Description of post 1") {
#     id,
#     title,
#     description
#   }
# }

# get all posts
{
  posts {
    id,
    title,
    description
  }
}

# get post by id
# {
#   post(id: "640b13e61430a48282b41dea") {
#     id,
#     title,
#     description
#   }
# }

# update post
# mutation {
#   updatePost(id: "640b13e61430a48282b41dea", description: "Description Of Post 1") {
#     id,
#     title,
#     description
#   }
# }

# deletet post
# mutation {
#   deletePost(id: "640b14c01430a48282b41df0") {
#     id,
#   }
# }

*/
