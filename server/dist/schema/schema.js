"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Schema = void 0;
const Post_1 = require("../models/Post");
const User_1 = require("../models/User");
const Comment_1 = require("../models/Comment");
const graphql_1 = require("graphql");
const UserType = new graphql_1.GraphQLObjectType({
    name: "User",
    fields: () => ({
        id: { type: graphql_1.GraphQLID },
        name: { type: graphql_1.GraphQLString },
        email: { type: graphql_1.GraphQLString },
        password: { type: graphql_1.GraphQLString },
        passwordConfirm: { type: graphql_1.GraphQLString },
    }),
});
const PostType = new graphql_1.GraphQLObjectType({
    name: "Post",
    fields: () => ({
        id: { type: graphql_1.GraphQLID },
        title: { type: graphql_1.GraphQLString },
        description: { type: graphql_1.GraphQLString },
        userId: {
            type: UserType,
            resolve(parent, args) {
                return User_1.User.findById(parent.userId);
            },
        },
        comments: {
            type: new graphql_1.GraphQLList(CommentType),
            resolve(parent, args) {
                return Comment_1.Comment.find({ postId: parent.id });
            },
        },
        timestamp: { type: graphql_1.GraphQLString },
    }),
});
const CommentType = new graphql_1.GraphQLObjectType({
    name: "Comment",
    fields: () => ({
        id: { type: graphql_1.GraphQLID },
        data: { type: graphql_1.GraphQLString },
        userId: {
            type: UserType,
            resolve(parent, args) {
                return User_1.User.findById(parent.userId);
            },
        },
        postId: {
            type: PostType,
            resolve(parent, args) {
                return Post_1.Post.findById(parent.postId);
            },
        },
        timestamp: { type: graphql_1.GraphQLString },
    }),
});
const RootQuery = new graphql_1.GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        posts: {
            type: new graphql_1.GraphQLList(PostType),
            resolve(parent, args) {
                return Post_1.Post.find();
            },
        },
        post: {
            type: PostType,
            args: { id: { type: graphql_1.GraphQLID } },
            resolve(parent, args) {
                return Post_1.Post.findById(args.id);
            },
        },
        postsByUser: {
            type: new graphql_1.GraphQLList(PostType),
            resolve(parent, args) {
                return Post_1.Post.find({ userId: args.userId });
            },
        },
        users: {
            type: new graphql_1.GraphQLList(UserType),
            resolve(parent, args) {
                return User_1.User.find();
            },
        },
        user: {
            type: UserType,
            args: { id: { type: graphql_1.GraphQLID } },
            resolve(parent, args) {
                return User_1.User.findById(args.id);
            },
        },
        comments: {
            type: new graphql_1.GraphQLList(CommentType),
            resolve(parent, args) {
                return Comment_1.Comment.find();
            },
        },
        comment: {
            type: new graphql_1.GraphQLList(CommentType),
            resolve(parent, args) {
                return Comment_1.Comment.findById(args.id);
            },
        },
        commentsByPost: {
            type: new graphql_1.GraphQLList(CommentType),
            resolve(parent, args) {
                return Comment_1.Comment.find({ postId: args.postId });
            },
        },
    },
});
const mutation = new graphql_1.GraphQLObjectType({
    name: "Mutation",
    fields: {
        addPost: {
            type: PostType,
            args: {
                title: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
                description: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
                userId: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLID) },
            },
            resolve(parent, args) {
                const post = new Post_1.Post({
                    title: args.title,
                    description: args.description,
                    userId: args.userId,
                });
                return post.save();
            },
        },
        deletePost: {
            type: PostType,
            args: {
                id: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLID) },
            },
            resolve(parent, args) {
                Comment_1.Comment.find({ postId: args.id }).then((comments) => {
                    comments.forEach((comment) => {
                        comment.deleteOne();
                    });
                });
                return Post_1.Post.findByIdAndDelete(args.id);
            },
        },
        updatePost: {
            type: PostType,
            args: {
                id: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLID) },
                title: { type: graphql_1.GraphQLString },
                description: { type: graphql_1.GraphQLString },
            },
            resolve(parent, args) {
                return Post_1.Post.findByIdAndUpdate(args.id, {
                    $set: {
                        title: args.title,
                        description: args.description,
                    },
                }, { new: true });
            },
        },
        addUser: {
            type: UserType,
            args: {
                name: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
                email: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
                password: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
                passwordConfirm: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
            },
            resolve(parents, args) {
                const user = new User_1.User({
                    name: args.name,
                    email: args.email,
                    password: args.password,
                    passwordConfirm: args.passwordConfirm,
                });
                return user.save();
            },
        },
        deleteUser: {
            type: UserType,
            args: {
                id: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLID) },
            },
            resolve(parents, args) {
                Post_1.Post.find({ userId: args.id }).then((posts) => {
                    posts.forEach((post) => {
                        post.deleteOne();
                    });
                });
                Comment_1.Comment.find({ userId: args.id }).then((comments) => {
                    comments.forEach((comment) => {
                        comment.deleteOne();
                    });
                });
                return User_1.User.findByIdAndDelete(args.id);
            },
        },
        updateUser: {
            type: UserType,
            args: {
                id: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLID) },
                name: { type: graphql_1.GraphQLString },
                email: { type: graphql_1.GraphQLString },
            },
            resolve(parents, args) {
                return User_1.User.findByIdAndUpdate(args.id, {
                    $set: {
                        name: args.name,
                        email: args.email,
                    },
                }, { new: true });
            },
        },
        updatePassword: {
            type: UserType,
            args: {
                id: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLID) },
                password: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
                passwordConfirm: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
            },
            resolve(parents, args) {
                return User_1.User.findById(args.id)
                    .select("+password")
                    .then((user) => {
                    if (user &&
                        user.correctPassword(args.passwordConfirm, user.password)) {
                        user.password = args.password;
                        user.passwordConfirm = args.passwordConfirm;
                        return user.save();
                    }
                });
            },
        },
        addComment: {
            type: CommentType,
            args: {
                data: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
                postId: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLID) },
                userId: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLID) },
            },
            resolve(parents, args) {
                const comment = new Comment_1.Comment({
                    data: args.data,
                    userId: args.userId,
                    postId: args.postId,
                });
                return comment.save();
            },
        },
        updateComment: {
            type: CommentType,
            args: {
                id: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLID) },
                data: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
            },
            resolve(parents, args) {
                return Comment_1.Comment.findByIdAndUpdate(args.id, {
                    $set: {
                        data: args.data,
                    },
                }, { new: true });
            },
        },
        deleteComment: {
            type: CommentType,
            args: {
                id: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLID) },
            },
            resolve(parents, args) {
                return Comment_1.Comment.findByIdAndDelete(args.id);
            },
        },
    },
});
exports.Schema = new graphql_1.GraphQLSchema({
    query: RootQuery,
    mutation: mutation,
});
