const request = require("supertest");
const app = require("./app");

describe("Blog API", () => {
  // Test GET /blogs
  describe("GET /blogs", () => {
    it("should return all blogs", async () => {
      const response = await request(app).get("/blogs");
      expect(response.status).toBe(200);
      expect(response.body).toHaveLength(2); // Adjust the expected length based on your test data
    });
  });

  // Test POST /blogs/create
  describe("POST /blogs/create", () => {
    it("should create a new blog", async () => {
      const newBlog = {
        title: "Test Blog",
        author: "John Doe",
        content: "This is a test blog.",
      };

      const response = await request(app).post("/blogs/create").send(newBlog);
      expect(response.status).toBe(200);
      expect(response.body).toMatchObject(newBlog);
    });

    it("should return an error for invalid blog data", async () => {
      const invalidBlog = {
        author: "John Doe",
        content: "This is a test blog.",
      };

      const response = await request(app)
        .post("/blogs/create")
        .send(invalidBlog);
      expect(response.status).toBe(500);
      expect(response.body).toHaveProperty("error");
    });
  });

  // Test GET /blogs/blog/comments
  describe("GET /blogs/blog/comments", () => {
    it("should get comments of a specific blog", async () => {
      const response = await request(app).get("/blogs/blog/comments");
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("comments");
    });
  });

  // ... Add more tests for other API endpoints

  // Test DELETE /blogs/:id/delete
  describe("DELETE /blogs/delete", () => {
    it("should delete a specific blog", async () => {
      const response = await request(app).delete("/blogs/1/delete");
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("views", 0);
    });
  });
});
