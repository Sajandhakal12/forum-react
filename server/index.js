const express = require("express");
const app = express();
// for parsing the body of http request to use the body elements in server
const bodyParser = require("body-parser");
// for utilities for working with file and directory paths in computer.
const path = require("path");
const env = require("dotenv").config();
const cors = require("cors");
//const mysql = require('mysql')
//import routes
const authRoute = require("./Routes/auth/auth");

//middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());
//routes middleware
app.use("/api/user", authRoute);
app.use("/api/category", require("./Routes/forum/catagory"));
app.use("/api/forum", require("./Routes/forum/forum"));
app.use("/api/thread", require("./Routes/forum/thread"));
app.use("/api/post", require("./Routes/forum/post"));

app.listen(5000, () => console.log("Server is up and running"));
