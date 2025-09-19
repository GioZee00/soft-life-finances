import './App.css';
import Register from './components/Register'; // Import the new component

function App() {
  return (
    <div className="App">
      <h1>Welcome to Soft Life Finances</h1>
      <Register /> {/* Display the Register component */}
    </div>
  );
}

export default App;