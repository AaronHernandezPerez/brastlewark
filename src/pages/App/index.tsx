import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import GnomeLibrary from 'pages/GnomeLibrary';
import GnomeDetails from 'pages/GnomeDetails';

import './App.css';

function App() {
  return (
    <div className="bg-gray-50 h-full">
      <Router>
        <Switch>
          <Route exact path="/">
            <GnomeLibrary />
          </Route>
          <Route path="/gnome/:id">
            <GnomeDetails />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
