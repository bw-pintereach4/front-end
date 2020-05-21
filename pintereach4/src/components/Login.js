import React, { useState } from "react";
// import { axiosWithAuth } from "../util/axiosWithAuth";
import { connect } from "react-redux";
import { checkUser } from "../actions/usersLogin";

const Login = (props) => {
    const [user, setUser] = useState({
        username: "",
        password: "",
    });

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value,
        });
    };

    const submitHander = (e) => {
        e.preventDefault();
        props.checkUser(user.username, user.password);
        if (props.uname !== null) {
            console.log("success");
            props.history.push("/dashboard");
        }
    };

    console.log("props", props);

    return (
        <div className="row">
            <div className="col-md-5">
                <h1>{props.error ? props.error : ""}</h1>
                <p>Login</p>
                <form onSubmit={submitHander}>
                    <div className="form-group">
                        <input
                            type="text"
                            name="username"
                            className="form-control"
                            placeholder="username"
                            value={user.username}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            name="password"
                            className="form-control"
                            placeholder="password"
                            value={user.password}
                            onChange={handleChange}
                        />
                    </div>
                    <button type="submit" className="btn btn-dark btn-sm">
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

// hook up the connect to our store
const mapStateToProps = (state) => {
    console.log(state);
    return {
        uname: state.usersLogin.username,
        isLoading: state.usersLogin.isLoading,
        isLoaded: state.usersLogin.isLoaded,
        error: state.usersLogin.error,
    };
};

export default connect(mapStateToProps, { checkUser })(Login);
