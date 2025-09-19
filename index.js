// 1. Import Dependencies
const express = require('express');
const supabase = require('./supabaseClient'); // Import our supabase connection
const bcrypt = require('bcryptjs');

// 2. Create an instance of the Express app
const app = express();
app.use(express.json()); // Middleware to parse JSON bodies

// 3. Define the port number
const PORT = 3001;

// 4. Create API routes
app.get('/', (req, res) => {
  res.send('Welcome to the Soft Life Finances API!');
});

// -- USER REGISTRATION ENDPOINT --
app.post('/register', async (req, res) => {
  const { email, password } = req.body;

  // Basic validation
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required.' });
  }

  try {
    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Insert user into the database
    const { data, error } = await supabase
      .from('users')
      .insert([{ email, password: hashedPassword }])
      .select();

    if (error) {
      console.error('Supabase error:', error);
      return res.status(500).json({ error: 'Could not create user.' });
    }

    res.status(201).json({ message: 'User created successfully.', user: data[0] });
  } catch (err) {
    console.error('Server error:', err);
    res.status(500).json({ error: 'An unexpected error occurred.' });
  }
});

// -- USER LOGIN ENDPOINT --
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required.' });
  }

  try {
    // Find the user by email
    const { data: users, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email);

    if (error || users.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials.' });
    }

    const user = users[0];

    // Compare the provided password with the stored hash
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid credentials.' });
    }

    res.status(200).json({ message: 'Login successful.', user: { id: user.id, email: user.email } });
  } catch (err) {
    console.error('Server error:', err);
    res.status(500).json({ error: 'An unexpected error occurred.' });
  }
});

// 5. Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});