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
      const userExist = await collection.findOne(author);
      if (userExist) {
        console.log("user Exists");
      } else {
        await collection.insertOne(author);
        console.log("Author added successfully");
      }
    } catch (error) {
      console.log("Error adding author:", error);
      throw error;
    }
  }
  async getBlogs() {
    // try {
    //     const collection = this.db.collection("blogs");
    // }
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
        like: { bsonType: "int", minimum: 0 },
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
