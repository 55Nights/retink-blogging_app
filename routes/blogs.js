const express = require("express");
const router = express.Router();
const {
  createBlogValidationRules,
  createCommentValidationRules,
  validate,
} = require("../validate");
const blogs = [{ id: 0 }, { id: 0 }, { id: 0 }, { id: 0 }];
// This will return all the blogs
router.get("/", (req, res) => {
  res.json(blogs);
});

//This endpoint allows us to create a new blog
router.post("/create", createBlogValidationRules, validate, (req, res) => {
  res.json(req.body);
});

// comment endpoints
//Get comments of a  blog with id "x"
router.get("/:id/comments", (req, res) => {
  res.json(blogs[req.params.id]);
  console.log(req.params.id);
});

// Post a comment for blog with id "x"
router.post("/:id/comments", (req, res) => {
  const blog = blogs[req.params.id];
  blog["comments"] = [];
  blog.comments = req.body;
  res.json(blog);
  console.log(req.params.id);
});

// Get the likes of a blog
router.get("/:id/likes", (req, res) => {
  const blog = blogs[req.params.id];
  blog["likes"] = 0;
  blog.likes = blog.likes += 1;
  res.json(blog);
  console.log(req.params.id);
});
//This endpoint allows one to like a blog
router.post("/:id/likes", (req, res) => {
  const blog = blogs[req.params.id];
  blog["likes"] = 0;
  blog.likes = blog.likes += 1;
  res.json(blog);
  console.log(req.params.id);
});

//Get views of a blog
router.get("/:id/views", (req, res) => {
  const blog = blogs[req.params.id];
  blog["views"] = 0;
  blog.views = blog.views += 1;
  res.json(blog);
  console.log(req.params.id);
});

router.post("/:id/views", (req, res) => {
  const blog = blogs[req.params.id];
  blog["views"] = 0;
  blog.views = blog.views += 1;
  res.json(blog);
  console.log(req.params.id);
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
