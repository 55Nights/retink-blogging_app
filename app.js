const express = require("express");
const blogs = require("./routes/blogs");
const db = require("./connection");
require("dotenv").config();

const app = express();
const PORT = 8080;

app.use(express.json());
//database

db.connect();

try {
  const auth = {
    fullname: "Ju we",
    email: "jj@gmail.com",
  };
  db.addAuthour(auth);
} catch (error) {

  console.error(error);
}
app.use("/blogs", blogs);
app.get("/", (req, res) => {
  res.send({ message: "hello" });
  console.log({
    message: "some visited our page",
    ipaddre: req.ip,
  });
});

app.post("/auth/signin", (req, res) => {
  res.json(req.body);
});

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
