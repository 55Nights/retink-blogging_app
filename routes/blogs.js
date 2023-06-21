const express = require("express");
const router = express.Router();

const blogs = [
  {
    title: "Introduction to JavaScript",
    content:
      "In this blog post, we will explore the basics of JavaScript programming language...",
    author: "John Doe",
  },
  {
    title: "Deep Dive into React Hooks",
    content:
      "React hooks have revolutionized the way we write functional components...",
    author: "Jane Smith",
  },
  {
    title: "Getting Started with Node.js",
    content:
      "Node.js is a powerful JavaScript runtime that allows us to build scalable...",
    author: "Alex Johnson",
  },
];
// This will return all the blogs
router.get("/", (req, res) => {
  res.json(blogs);
});

//This endpoint allows us to create a new blog
router.post("/create", (req, res) => {
  res.json(req.body);
});

// comment endpoints
//Get comments of a  blog with id "x"
router.get("/comments/blog/:id", (req, res) => {
  res.json(blogs[req.params.id]);
  console.log(req.params.id);
});

// Post a comment for blog with id "x"
router.post("/comments/blog/:id", (req, res) => {
  const blog = blogs[req.params.id];
  blog["comments"] = [];
  blog.comments = req.body;
  res.json(blog);
  console.log(req.params.id);
});

// Get the likes of a blog
router.get("/likes/:id", (req, res) => {
  const blog = blogs[req.params.id];
  blog["likes"] = 0;
  blog.likes = blog.likes += 1;
  res.json(blog);
  console.log(req.params.id);
});
//This endpoint allows one to like a blog
router.post("/likes/:id", (req, res) => {
  const blog = blogs[req.params.id];
  blog["likes"] = 0;
  blog.likes = blog.likes += 1;
  res.json(blog);
  console.log(req.params.id);
});

//Get views of a blog
router.get("/views/:id", (req, res) => {
  const blog = blogs[req.params.id];
  blog["views"] = 0;
  blog.views = blog.views += 1;
  res.json(blog);
  console.log(req.params.id);
});

router.post("/views/:id", (req, res) => {
  const blog = blogs[req.params.id];
  blog["views"] = 0;
  blog.views = blog.views += 1;
  res.json(blog);
  console.log(req.params.id);
});

//delete
router.delete("/delete/blog/:id", (req, res) => {
  const blog = blogs[req.params.id];
  blog["views"] = 0;
  blog.views = blog.views += 1;
  res.json(blog);
  console.log(req.params.id);
});

module.exports = router;
