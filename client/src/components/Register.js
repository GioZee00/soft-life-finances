import React, { useState } from 'react';
import axios from 'axios'; // Import axios

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState(''); // To display success/error messages

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Send a POST request to our backend's /register endpoint
      const response = await axios.post('/register', { email, password });
      setMessage(response.data.message); // Set success message from server
    } catch (error) {
      // Set error message from server
      setMessage(error.response.data.error || 'Registration failed.');
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Register</button>
      </form>
      {message && <p>{message}</p>} {/* Display the message */}
    </div>
  );
}

export default Register;