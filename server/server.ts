require("dotenv").config();
import express, { Express } from "express";
import cors from "cors";
import { graphqlHTTP } from "express-graphql";
import { Schema } from "./schema/schema.js";
import { connectDB } from "./config/db";

const app: Express = express();

connectDB();

app.use(cors());

app.use(
  "/graphql",
  graphqlHTTP({
    schema: Schema,
    graphiql: process.env.NODE_ENV == "development",
  })
);

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
