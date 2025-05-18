# Comments (/api/comments)

* POST /api/posts/:postId/comments: Add a comment to a specific post (requires authentication).
  * Body: { content }
* GET /api/posts/:postId/comments: Get all comments for a specific post.
* (TODO: Endpoints for updating/deleting comments)
