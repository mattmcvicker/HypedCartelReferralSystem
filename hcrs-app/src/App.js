import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import HomePage from "./TABS/HomePage";
import MemInfoPage from "./TABS/MemInfoPage"
import ReferralCode from "./TABS/ReferralCode"
import CreateCycle from "./TABS/CreateCycle"
import login from "./login"
import {AuthContext} from './context';
// export const AuthContext = React.createContext(null);

function App() {

  const [isLoggedIn, setLoggedIn] = React.useState(false);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setLoggedIn }}>
      <Router>
        <Switch>
          <Route exact path="/" component={login} />
          <Route exact path="/home" component={HomePage} />
          {/* if currentUrl == "/about", render <AboutPage> */}
          <Route path="/memberinfo" component={MemInfoPage} />
          <Route path="/referralcode" component={ReferralCode} />
          <Route path="/createcycle" component={CreateCycle} />
        </Switch>
        {/* if currentUrl == "/home", render <HomePage> */}
      </Router>
    </AuthContext.Provider>
  );
}
export default App;
