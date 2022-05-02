const express = require("express");
const colors = require("colors");
const cors = require('cors')
const dotenv = require("dotenv").config();
const port = process.env.PORT || 5000;
const connectDb = require("./config/db");
const Auth = require("./routes/auth");
const User = require("./routes/users");
const Post = require("./routes/post");
const { errorHandler } = require("./middlewares/errorMiddleware");
const emailApi = require('./routes/emailApi')

connectDb();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors())

// routes
app.use("/api/auth", Auth);
app.use("/api/user", User);
app.use("/api/email", emailApi);
app.use("/api/post", Post);
app.get("/", (req, res) => res.send("Please set to production"));

app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));
