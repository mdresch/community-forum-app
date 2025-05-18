# Running Tests

The project currently does not have a dedicated test suite set up (e.g., Jest, Mocha, Chai for backend; React Testing Library, Jest for frontend).

To add testing:

* **Backend:** npm install --save-dev jest supertest mongodb-memory-server
  * Add a test script to server/package.json: "test": "jest"
  * Create \*.test.js files in a \_\_tests\_\_ directory.
* **Frontend:** Vite projects using React typically come with Vitest or Jest support.
  * Add a test script to client/package.json: "test": "vitest" or "test": "react-scripts test" (if CRA-based, but it's Vite).
  * Create \*.test.jsx or \*.spec.jsx files alongside components or in a \_\_tests\_\_ directory.

To run tests (once configured):

```
# For server tests (from server/ directory)
npm test

# For client tests (from client/ directory)
npm test
```
