import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import GnomeLibrary from 'screens/GnomeLibrary';

import './App.css';

function App() {
  return (
    <div className="bg-gray-50">
      <Router>
        <Switch>
          <Route path="/">
            <GnomeLibrary />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
