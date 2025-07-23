import './App.css';
import AddPlace from './AddPlace';
import PlacesPage from './PlacesPage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/Addplaces" element={<AddPlace  />} />
          <Route path="/" element={<PlacesPage  />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

  
