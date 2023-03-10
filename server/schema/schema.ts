import { Post } from "../models/Post";
import { User } from "../models/User";
import { Comment } from "../models/Comment";

import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
} from "graphql";

const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    passwordConfirm: { type: GraphQLString },
  }),
});

const PostType: any = new GraphQLObjectType({
  name: "Post",
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    description: { type: GraphQLString },
    userId: {
      type: UserType,
      resolve(parent, args) {
        return User.findById(parent.userId);
      },
    },
    comments: {
      type: new GraphQLList(CommentType),
      resolve(parent, args) {
        return Comment.find({ postId: parent.id });
      },
    },
    timestamp: { type: GraphQLString },
  }),
});

const CommentType = new GraphQLObjectType({
  name: "Comment",
  fields: () => ({
    id: { type: GraphQLID },
    data: { type: GraphQLString },
    userId: {
      type: UserType,
      resolve(parent, args) {
        return User.findById(parent.userId);
      },
    },
    postId: {
      type: PostType,
      resolve(parent, args) {
        return Post.findById(parent.postId);
      },
    },
    timestamp: { type: GraphQLString },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    posts: {
      type: new GraphQLList(PostType),
      resolve(parent, args) {
        return Post.find();
      },
    },
    post: {
      type: PostType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Post.findById(args.id);
      },
    },
    postsByUser: {
      type: new GraphQLList(PostType),
      resolve(parent, args) {
        return Post.find({ userId: args.userId });
      },
    },
    users: {
      type: new GraphQLList(UserType),
      resolve(parent, args) {
        return User.find();
      },
    },
    user: {
      type: UserType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return User.findById(args.id);
      },
    },
    comments: {
      type: new GraphQLList(CommentType),
      resolve(parent, args) {
        return Comment.find();
      },
    },
    comment: {
      type: new GraphQLList(CommentType),
      resolve(parent, args) {
        return Comment.findById(args.id);
      },
    },
    commentsByPost: {
      type: new GraphQLList(CommentType),
      resolve(parent, args) {
        return Comment.find({ postId: args.postId });
      },
    },
  },
});

const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addPost: {
      type: PostType,
      args: {
        title: { type: new GraphQLNonNull(GraphQLString) },
        description: { type: new GraphQLNonNull(GraphQLString) },
        userId: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        const post = new Post({
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
        id: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        Comment.find({ postId: args.id }).then((comments) => {
          comments.forEach((comment) => {
            comment.deleteOne();
          });
        });
        return Post.findByIdAndDelete(args.id);
      },
    },
    updatePost: {
      type: PostType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        title: { type: GraphQLString },
        description: { type: GraphQLString },
      },
      resolve(parent, args) {
        return Post.findByIdAndUpdate(
          args.id,
          {
            $set: {
              title: args.title,
              description: args.description,
            },
          },
          { new: true }
        );
      },
    },
    addUser: {
      type: UserType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) },
        passwordConfirm: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(parents, args) {
        const user = new User({
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
        id: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve(parents, args) {
        Post.find({ userId: args.id }).then((posts) => {
          posts.forEach((post) => {
            post.deleteOne();
          });
        });
        Comment.find({ userId: args.id }).then((comments) => {
          comments.forEach((comment) => {
            comment.deleteOne();
          });
        });
        return User.findByIdAndDelete(args.id);
      },
    },
    updateUser: {
      type: UserType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
      },
      resolve(parents, args) {
        return User.findByIdAndUpdate(
          args.id,
          {
            $set: {
              name: args.name,
              email: args.email,
            },
          },
          { new: true }
        );
      },
    },
    updatePassword: {
      type: UserType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        password: { type: new GraphQLNonNull(GraphQLString) },
        passwordConfirm: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(parents, args) {
        return User.findById(args.id)
          .select("+password")
          .then((user) => {
            if (
              user &&
              user.correctPassword(args.passwordConfirm, user.password)
            ) {
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
        data: { type: new GraphQLNonNull(GraphQLString) },
        postId: { type: new GraphQLNonNull(GraphQLID) },
        userId: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve(parents, args) {
        const comment = new Comment({
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
        id: { type: new GraphQLNonNull(GraphQLID) },
        data: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(parents, args) {
        return Comment.findByIdAndUpdate(
          args.id,
          {
            $set: {
              data: args.data,
            },
          },
          { new: true }
        );
      },
    },
    deleteComment: {
      type: CommentType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve(parents, args) {
        return Comment.findByIdAndDelete(args.id);
      },
    },
  },
});

export const Schema = new GraphQLSchema({
  query: RootQuery,
  mutation: mutation,
});
