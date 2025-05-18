# Database Schema

Mongoose models define the structure of the data in MongoDB.

#### User (server/models/User.js)

* username: String, required, unique
* email: String, required, unique
* password: String, required (hashed)
* createdAt: Date, default: Date.now

#### Post (server/models/Post.js)

* user: ObjectId, ref: 'User', required (author)
* title: String, required
* content: String, required
* tags: \[String] (optional)
* comments: \[ObjectId], ref: 'Comment' (array of comment IDs)
* createdAt: Date, default: Date.now
* updatedAt: Date, default: Date.now

#### Comment (server/models/Comment.js)

* user: ObjectId, ref: 'User', required (commenter)
* post: ObjectId, ref: 'Post', required (post commented on)
* content: String, required
* createdAt: Date, default: Date.now
