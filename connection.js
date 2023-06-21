require("dotenv").config();
const { MongoClient } = require("mongodb");
const uri = process.env.MONGO_URI;
const dbName = process.env.DB_NAME;
console.log("-----------------------");
class myDataBase {
  constructor() {
    this.url = uri;
    this.dbName = dbName;
    this.client = new MongoClient(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    this.db = this.client.db(this.dbName);
    this.createValidators();
  }
  // connect to the database
  async connect() {
    try {
      await this.client.connect();
      console.log("Connected to MongoDB successfully");
      this.db = this.client.db(this.dbName);
    } catch (error) {
      console.log("Error connecting to MongoDB:", error);
    }
  }
  // create collection blog
  async createValidators() {
    const collections = await this.db.listCollections().toArray();
    const collectionNames = collections.map((c) => c.name);

    if (!collectionNames.includes("blogs")) {
      console.log("creating blogs");
      await this.db.createCollection("blogs", blogValidator);
    } else {
      console.log("blogs exists no need to panic");
    }

    if (!collectionNames.includes("authors")) {
      console.log("creating authors");
      await this.db.createCollection("authors", authorsValidator);
      await this.db
        .collection("authors")
        .createIndex({ email: 1 }, { unique: true });
    } else {
      console.log("authors exists no need to panic");
    }
  }
  async addAuthour(author) {
    try {
      const collection = this.db.collection("authors");
      await collection.insertOne(author);
      console.log("Author added successfully");
    } catch (error) {
      if (error.code === 11000) {
        // Unique key constraint violation (email already exists)
        throw new Error("Email already exists");
      } else {
        console.log("Error adding author:", error);
        throw new Error("Failed to add author");
      }
    }
  }
  async authorExists(author) {
    try {
      const collection = this.db.collection("authors");
      const userExist = await collection.findOne(author);
      if (userExist) {
        console.log("user Exists");
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.log("Error find author:", error);
      throw error;
    }
  }
  // insert a new blog
  async insertBlog(blog) {
    try {
      const collection = this.db.collection("blogs");
      const { title, content, author, coAuthor } = blog;
      if (!this.searchAuthorByName(author)) {
        console.log("Author Does not  exist");
        throw new Error("Author Does not  exist");
      }
      const blogExists = await collection.findOne({
        title: blog.title,
        author: blog.author,
      });

      if (blogExists) {
        throw new Error("Blog already exists");
      }
      const coAuthorExists = await this.authorExists(coAuthor);
      const coAuthorId =
        coAuthorExists && coAuthor !== author ? coAuthor : null;

      await collection.insertOne({
        title,
        content,
        author,
        coAuthor: coAuthorId,
        likes: 0,
        views: 0,
        comments: [],
      });

      console.log("Blog inserted successfully");
    } catch (error) {
      console.log("Error inserting blog:", error);
      throw error;
    }
  }

  // check if a blog exists
  async blogExists(blog) {
    try {
      const collection = db.collection("blogs");
      const blog = await collection.findOne({ blog });
      return true; // Return true if blog exists, false otherwise
    } catch (error) {
      console.log("Error checking if blog exists:", error);
      throw error;
    }
  }
  // insert comments
  async checkAndInsertComments(commentInfo) {
    try {
      console.log(commentInfo);
      const collection = this.db.collection("blogs");
      const blog = await collection.findOne({
        title: commentInfo.title,
        author: commentInfo.author,
      });
      console.log(blog);

      if (blog) {
        if (!blog.comments) {
          blog.comments = []; // Initialize comments array if it doesn't exist
        }
        const comment = {
          name: commentInfo.comment.name,
          comment: commentInfo.comment.comment,
        };
        await collection.updateOne(
          { _id: blog._id },
          {
            $push: {
              comments: {
                $each: [comment],
              },
            },
          }
        );
        console.log("Comments inserted successfully");
        return true;
      } else {
        console.log("Blog not found");
        throw new Error("Blog not found");
      }
    } catch (error) {
      console.log("Error checking and inserting comments:", error);
      throw error;
    }
  }
  // update blogs
  async updateLikes({ author, title }) {
    try {
      const collection = this.db.collection("blogs");
      const blog = await collection.findOne({ author, title });
      if (!blog) {
        console.log("Blog not found");
        return;
      }

      const updatedLikes = blog.likes + 1;

      await collection.updateOne(
        { author, title },
        { $set: { likes: updatedLikes } }
      );

      console.log("Likes updated successfully");
    } catch (error) {
      console.log("Error updating likes:", error);
    }
  }
  //update views
  async updateViews({ author, title }) {
    try {
      const collection = this.db.collection("blogs");
      const blog = await collection.findOne({ author, title });
      if (!blog) {
        console.log("Blog not found");
        return;
      }

      const updatedViews = blog.views + 1;

      await collection.updateOne(
        { author, title },
        { $set: { views: updatedViews } }
      );

      console.log("Views updated successfully");
    } catch (error) {
      console.log("Error updating views:", error);
    }
  }

  // get one blog
  async getBlog({ author, title }) {
    try {
      const collection = this.db.collection("blogs");
      const blog = await collection.findOne({ author, title });
      if (!blog) {
        console.log("Blog not found");
        return [];
      }
      else {
        return blog;
      }
    } catch (error) {
      console.log("Error updating likes:", error);
    }
  }

  //get all blogs

  async getBlogs() {
    try {
      const collection = this.db.collection("blogs");
      const blogs = await collection.find().toArray();
      console.log(blogs);
      return blogs;
    } catch (error) {
      console.log("Error retrieving blogs:", error);
      return [];
    }
  }

  // check if author exists
  async searchAuthorByName(name) {
    const collection = this.db.collection("authors");
    const query = { name: name }; // Assuming 'name' is the field to search for

    const matchingAuthor = await collection.findOne(query);
    return !!matchingAuthor;
  }
}

const blogValidator = {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["title", "content", "author"],
      properties: {
        title: { bsonType: "string" },
        content: { bsonType: "string" },
        author: { bsonType: "string" },
        coAuthor: { bsonType: ["string", "null"] },
        comments: {
          bsonType: "array",
          items: {
            bsonType: "object",
            required: ["name", "comment"],
            properties: {
              name: { bsonType: "string" },
              comment: { bsonType: "string" },
            },
          },
        },
        like: {
          bsonType: "int",
          minimum: 0,
        },
        views: { bsonType: "int", minimum: 0 },
      },
    },
  },
};

const authorsValidator = {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["fullname", "email"],
      properties: {
        fullname: {
          bsonType: "string",
          description: "Full name of the author",
          pattern: "^[a-zA-Z ]*$", // Only allow alphabets and spaces
        },
        email: {
          bsonType: "string",
          description: "Unique email address",
          pattern: "^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-.]+$", // Email pattern validation
        },
      },
    },
  },
};
module.exports = new myDataBase();
