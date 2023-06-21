const express = require("express");
const blogs = require("./routes/blogs");
const db = require("./connection");
const {
  createAuthorValidationRules,
  createBlogValidationRules,
  createCommentValidationRules,
  validate,
} = require("./validate");
require("dotenv").config();

const app = express();

app.use(express.json());
//database
db.connect();
app.use("/blogs", blogs);
app.get("/", (req, res) => {
  res.send({ message: "hello" });
  console.log({
    message: "some visited our page",
    ipaddre: req.ip,
  });
});

app.post(
  "/create/author",
  createAuthorValidationRules,
  validate,
  async (req, res) => {
    const author = req.body;
    try {
      const userExist = await db.authorExists(author);
      if (userExist) {
        return res.status(400).json({
          error: "The user already exist",
        });
      }
      await db.addAuthour(author)
      return res.status(200).json(author);
    } catch (error) {
      if (error.message === "Email already exists") {
        console.log(error.message);
        return res.status(400).json({
          error: error.message,
        });
      }
      
      console.log("Error creating author:", error);
      return res.status(500).json({ error: "Internal server error" });
    }

    //check if user already exists
    //if exists return an error
    // else add
  }
);

// add a new blog


app.listen(process.env.PORT, () => {
  console.log(`http://localhost:${process.env.PORT}`);
});
