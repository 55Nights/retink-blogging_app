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
    // this.db.createCollection("blogs", {
    //   validator: {
    //     $jsonSchema: {
    //       bsonType: "object",
    //       required: [
    //         "title",
    //         "content",
    //         "author",
    //       ],
    //       properties: {
    //         title: { bsonType: "string" },
    //         content: { bsonType: "string" },
    //         author: { bsonType: "string" },
    //         coAuthor: { bsonType: ["string", "null"] },
    //         comments: {
    //           bsonType: "array",
    //           items: {
    //             bsonType: "object",
    //             required: ["name", "comment"],
    //             properties: {
    //               name: { bsonType: "string" },
    //               comment: { bsonType: "string" },
    //             },
    //           },
    //         },
    //         like: { bsonType: "int", minimum: 0 },
    //         views: { bsonType: "int", minimum: 0 },
    //       },
    //     },
    //   },
    // });
    // this.db.createCollection("authors", {
    //   validator: {
    //     $jsonSchema: {
    //       bsonType: "object",
    //       required: ["fullname", "email"],
    //       properties: {
    //         fullname: { bsonType: "string" },
    //         email: {
    //           bsonType: "string",
    //           description: "Unique email address",
    //           unique: true,
    //         },
    //       },
    //     },
    //   },
    // });
  }
  async connect() {
    try {
      await this.client.connect();
      console.log("Connected to MongoDB successfully");
      this.db = this.client.db(this.dbName);
    } catch (error) {
      console.log("Error connecting to MongoDB:", error);
    }
  }
  async addAuthour(author) {
    try {
        const collection = this.db.collection("authors");
        const userExist = await collection.findOne(author);
        if (userExist) {
            console.log("user Exists")
        }
        else {
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
module.exports = new myDataBase();
