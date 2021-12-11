import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AddUser from '../AddUser/AddUser';
import DataVisual from '../DataVisual/DataVisual';
import ListingUser from '../ListingUser/ListingUser';
import './app.css'

function App() {
  return (
    <div className="mainApp">
     <Router>
        <Routes>
          <Route path="/" exact element={ <AddUser />} ></Route>
          <Route path="/list" exact element={ <ListingUser />} ></Route>
          <Route path="/graph" exact element={ <DataVisual />} ></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
