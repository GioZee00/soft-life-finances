// 1. Import the Express library
const express = require('express');

// 2. Create an instance of the Express app
const app = express();

// 3. Define the port number our server will run on
const PORT = 3001;

// 4. Create a "route" to handle incoming requests
app.get('/', (req, res) => {
  res.send('Welcome to the Soft Life Finances API!');
});

// 5. Start the server and listen for connections on the port
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
