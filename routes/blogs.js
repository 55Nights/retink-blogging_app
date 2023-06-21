const express = require("express");
const router = express.Router();
const db = require("../connection");

const {
  createBlogValidationRules,
  createCommentValidationRules,
  validate,
} = require("../validate");

db.connect();
// This will return all the blogs
router.get("/", async (req, res) => {
  const blogs = await db.getBlogs();
  res.json(blogs);
});

//This endpoint allows us to create a new blog
router.post(
  "/create",
  createBlogValidationRules,
  validate,
  async (req, res) => {
    try {
      const blog = req.body;
      console.log(blog);
      await db.insertBlog(blog);
      res.status(200).json(blog);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }
);

// comment endpoints
//Get comments of a  blog with id "x"
router.get("/blog/comments", async (req, res) => {
  const blog = await db.getBlog(req.body);
  let comments = {
    title: blog.title,
    author: blog.author,
    comments: blog.comments,
  };
  res.json(comments);
});

// Post a comment for blog with id "x"
router.post("/blog/comments", async (req, res) => {
  const commentInfo = req.body;
  try {
    await db.checkAndInsertComments(commentInfo);
    return res.status(200).json(commentInfo);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// Get the likes of a blog
router.get("/blog/likes", async (req, res) => {
  const blog = await db.getBlog(req.body);
  let comments = {
    title: blog.title,
    author: blog.author,
    likes: blog.likes,
  };
  res.json(comments);
});
//This endpoint allows one to like a blog
router.post("/blog/likes", async (req, res) => {
  try {
    await db.updateLikes(req.body);
    return res.status(200).json(req.body);
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
});

//Get views of a blog
router.get("/blog/views", async(req, res) => {
  const blog = await db.getBlog(req.body);
  let comments = {
    title: blog.title,
    author: blog.author,
    views: blog.views,
  };
  res.json(comments);
});

router.post("/blog/views", async (req, res) => {
  try {
    await db.updateViews(req.body);
    return res.status(200).json(req.body);
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
});

//delete
router.delete("/:id/delete", (req, res) => {
  const blog = blogs[req.params.id];
  blog["views"] = 0;
  blog.views = blog.views += 1;
  res.json(blog);
  console.log(req.params.id);
});

module.exports = router;
