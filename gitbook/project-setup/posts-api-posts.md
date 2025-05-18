# Posts (/api/posts)

* POST /api/posts: Create a new post (requires authentication).
  * Body: { title, content, (optional) tags }
* GET /api/posts: Get all posts.
* GET /api/posts/:id: Get a single post by ID.
* PUT /api/posts/:id: Update a post by ID (requires authentication, user must be author).
  * Body: { title, content, (optional) tags }
* DELETE /api/posts/:id: Delete a post by ID (requires authentication, user must be author).
