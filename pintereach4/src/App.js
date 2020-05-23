import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Dashboard from "./components/Dashboard";
import AddForm from "./components/AddForm";
import EditForm from "./components/EditForm";
// import PrivateRoute from "./components/PrivateRoute";

function App() {
    return (
        <Router>
            <div className="App">
                <Switch>
                    <Route exact path="/" component={Login} />
                    <Route
                        path="/login"
                        render={(props) => <Login {...props} />}
                    />
                    <Route
                        path="/signup"
                        render={(props) => <SignUp {...props} />}
                    />
                    <Route
                        path="/logout"
                        render={(props) => <Login {...props} />}
                    />
                    <Route exact path="/dashboard" component={Dashboard} />
                    <Route exact path="/add-article" component={AddForm} />
                    <Route exact path="/edit-article" component={EditForm} />
                </Switch>
            </div>
        </Router>
    );
}

export default App;
