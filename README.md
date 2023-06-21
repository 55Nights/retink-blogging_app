name: Express Blogging App

description: This is an Express.js application for a blogging platform.

features:
  - Create authors
  - Create blogs
  - Add comments to blogs
  - Get blog comments
  - Add likes to blogs
  - Get blog likes
  - Get blog views
  - Update blog views
  - Delete a blog

prerequisites:
  - Node.js installed
  - MongoDB installed or a MongoDB connection string

getting_started:
  - Clone the repository:
    ```
    git clone https://github.com/your-username/express-blogging-app.git
    ```

  - Install dependencies:
    ```
    cd express-blogging-app
    npm install
    ```

  - Set up environment variables:
    - Create a `.env` file in the root directory of the project.
    - Add the following variables to the `.env` file:
      ```
      PORT=3000
      MONGODB_URI=your-mongodb-connection-string
      ```

  - Run the application:
    ```
    npm start
    ```

  - Open your web browser and visit `http://localhost:3000` to access the application.

api_routes:
  - GET /blogs - Get all blogs
  - POST /blogs/create - Create a new blog
  - GET /blogs/blog/comments - Get comments of a specific blog
  - POST /blogs/blog/comments - Post a comment for a specific blog
  - GET /blogs/blog/likes - Get likes of a specific blog
  - POST /blogs/blog/likes - Like a specific blog
  - GET /blogs/blog/views - Get views of a specific blog
  - POST /blogs/blog/views - Update views of a specific blog

### Interacting with the API

To interact with the API and test the endpoints, you can use Postman, a popular API development and testing tool. Follow the steps below to get started:

1. Download and install Postman from the official website: [https://www.postman.com/downloads/](https://www.postman.com/downloads/).

2. Launch Postman and create a new request by clicking on the "New" button.

3. Select the HTTP method (e.g., GET, POST, DELETE) for the desired API endpoint.

4. Enter the URL of the live site where the API is hosted. `https://retink-bloggingapp.55nights.repl.co/`.

5. If the endpoint requires any parameters or a request body, provide them in the appropriate sections of the Postman interface.

6. Click the "Send" button to send the request to the API and view the response.

7. Review the response in the "Response" section of Postman to see the data returned by the API.

Please note that the API endpoints you can interact with are as follows:

- **GET /blogs** - Get all blogs
- **POST /blogs/create** - Create a new blog
- **GET /blogs/blog/comments** - Get comments of a specific blog
- **POST /blogs/blog/comments** - Post a comment for a specific blog
- **GET /blogs/blog/likes** - Get likes of a specific blog
- **POST /blogs/blog/likes** - Like a specific blog
- **GET /blogs/blog/views** - Get views of a specific blog
- **POST /blogs/blog/views** - Update views of a specific blog
- **DELETE /blogs/:id/delete** - Delete a specific blog

Feel free to explore and test these endpoints using Postman to interact with the API.

If you have any questions or encounter any issues, please let us know.

Happy testing!


validation: The application uses validation middleware to validate the request data. Validation rules can be found in the `validate.js` file.

database: The application uses MongoDB as the database. The database connection is established in the `connection.js` file. Make sure to provide the correct MongoDB connection string in the `.env` file.

error_handling: Errors are handled in the application using try-catch blocks. Specific error messages are returned in the response, along with appropriate HTTP status codes.

contributing: Contributions are welcome! If you find any issues or have suggestions for improvements, feel free to open an issue or submit a pull request.

license: This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more information.
