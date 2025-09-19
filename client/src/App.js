import React, { useState } from 'react';
import './App.css';
import Register from './components/Register';
import Login from './components/Login';

function App() {
  const [user, setUser] = useState(null); // To store the logged-in user

  // This function will be passed to the Login component
  const handleLoginSuccess = (loggedInUser) => {
    setUser(loggedInUser);
  };

  // If a user is logged in, show a welcome message
  if (user) {
    return (
      <div className="App">
        <h1>Welcome, {user.email}!</h1>
        <button onClick={() => setUser(null)}>Logout</button>
      </div>
    );
  }

  // If no user is logged in, show the forms
  return (
    <div className="App">
      <h1>Welcome to Soft Life Finances</h1>
      <Register />
      <hr />
      <Login onLoginSuccess={handleLoginSuccess} /> {/* Pass the function as a prop */}
    </div>
  );
}

export default App;