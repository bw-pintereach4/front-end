import React from "react";
import "./App.css";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Login from "./components/Login";
import Dashboard from "./components/Dashboard";

function App() {
    return (
        <Router>
            <div className="container">
                <div className="App">
                    <Switch>
                        <Route exact path="/" component={Login} />
                        <Route path="/login" render={() => <Login />} />
                        <Route
                            exact
                            path="/dashboard"
                            render={(props) => <Dashboard {...props} />}
                        />
                    </Switch>
                </div>
            </div>
        </Router>
    );
}

export default App;
