"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const express_graphql_1 = require("express-graphql");
const schema_js_1 = require("./schema/schema.js");
const db_1 = require("./config/db");
const app = (0, express_1.default)();
(0, db_1.connectDB)();
app.use((0, cors_1.default)());
app.use("/graphql", (0, express_graphql_1.graphqlHTTP)({
    schema: schema_js_1.Schema,
    graphiql: process.env.NODE_ENV == "development",
}));
const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});
