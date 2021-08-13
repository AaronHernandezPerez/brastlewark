import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import GnomeLibrary from 'screens/GnomeLibrary';

import './App.css';

function App() {
  return (
    <div className="App">
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
