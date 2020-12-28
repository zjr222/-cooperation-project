import './App.css';
import Rating  from './components/Rating'
function App() {
  return (
    <div className="App">
      <h1>Movie Club</h1>
      <Rating score={6.6} />
    </div>
  );
}

export default App;
