const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const knex = require("knex");
const register = require("./controllers/register");
const signin = require("./controllers/signin");
const profile = require("./controllers/profile");
// const image = require("./controllers/image");
const image = require("./controllers/imageGPRC");

// const db = knex({
//   client: "pg",
//   connection: {
//     connectionString: process.env.DATABASE_URL,
//     ssl: true,
//   },
// });

const db = knex({
  client: "pg",
  connection: {
    host: "dpg-cdpc7cun6mpuqrunjkgg-a",
    user: "smartbrain",
    password: "NcMRM0Zhr0pVPVwfA1CjAFQxxB3EIYqa",
    database: "smartbrain",
  },
});

const app = express();
//app.use(express.urlencoded({ extended: false }));
app.use(express.json()); //<-- this is necessary when sending json post data
app.use(cors());

//DATABASE
app.get("/", (req, res) => {
  // res.send(database.users);
  res.send(res);
});

app.post("/signin", (req, res) => {
  signin.handleSignin(req, res, db, bcrypt);
});

app.post("/register", (req, res) => {
  register.handleRegister(req, res, db, bcrypt);
});

app.get("/profile/:id", (req, res) => {
  profile.handleProfileGet(req, res, db);
});

app.put("/image", (req, res) => {
  image.handleImage(req, res, db);
});

app.post("/imageurl", (req, res) => {
  image.handleApiCall(req, res);
});

const PORT = 3000;
app.listen(process.env.PORT || 3000, () => {
  console.log(`server running on port ${process.env.PORT}`);
});
