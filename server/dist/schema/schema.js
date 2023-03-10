"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Schema = void 0;
const Post_1 = require("../models/Post");
const graphql_1 = require("graphql");
const PostType = new graphql_1.GraphQLObjectType({
    name: "Post",
    fields: () => ({
        id: { type: graphql_1.GraphQLID },
        title: { type: graphql_1.GraphQLString },
        description: { type: graphql_1.GraphQLString },
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
            },
            resolve(parent, args) {
                const post = new Post_1.Post({
                    title: args.title,
                    description: args.description,
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
    },
});
exports.Schema = new graphql_1.GraphQLSchema({
    query: RootQuery,
    mutation: mutation,
});
