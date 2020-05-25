import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Articles from "./components/Articles";
import ArticlesByCategory from "./components/ArticlesByCategory";
import AddForm from "./components/AddForm";
import EditForm from "./components/EditForm";
import PrivateRoute from "./components/PrivateRoute";

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
                    <PrivateRoute exact path="/articles" component={Articles} />
                    <PrivateRoute
                        exact
                        path="/articles/category/:id"
                        component={ArticlesByCategory}
                    />
                    <PrivateRoute
                        exact
                        path="/add-article"
                        component={AddForm}
                    />
                    <PrivateRoute
                        exact
                        path="/edit-article/:id"
                        component={EditForm}
                    />
                </Switch>
            </div>
        </Router>
    );
}

export default App;
