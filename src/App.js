import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Chat from "./components/Chat";
import Login from "./components/Login";
import { AuthProvider } from "./context/AuthContext.js";

const App = () => {
  return (
    <div>
      <Router>
        <AuthProvider>
          <Switch>
            <Route path="/" component={Login} exact></Route>
            <Route path="/chat" component={Chat}></Route>
          </Switch>
        </AuthProvider>
      </Router>
    </div>
  );
};

export default App;
