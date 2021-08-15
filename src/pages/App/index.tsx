import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import GnomeLibrary from 'pages/GnomeLibrary';
import GnomeDetails from 'pages/GnomeDetails';
import GnomeProvider from 'context/GnomeContext';
import ScrollToTop from 'components/ScrollToTop';

function App() {
  return (
    <div className="bg-gray-50 h-full">
      <Router>
        <ScrollToTop />
        <Switch>
          <GnomeProvider>
            <Route exact path="/">
              <GnomeLibrary />
            </Route>
            <Route path="/gnome/:id">
              <GnomeDetails />
            </Route>
          </GnomeProvider>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
