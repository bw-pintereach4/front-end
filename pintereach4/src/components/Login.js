import React, { useState, useEffect } from "react";
// import { axiosWithAuth } from "../util/axiosWithAuth";
import { connect } from "react-redux";
import { checkUser } from "../actions/usersLogin";
import * as yup from "yup";

const Login = (props) => {
    const [user, setUser] = useState({
        username: "",
        password: "",
    });
    const [errors, setErrors] = useState({
        username: "",
        password: "",
    });
    const [buttonState, setButtonState] = useState();

    const formSchema = yup.object().shape({
        username: yup.string().required("Name is a required field"),
        password: yup
            .string()
            .required("Password is a required field")
            .min(5, "Passwords must be at least 6 characters long."),
    });

    const handleChange = (e) => {
        e.persist();

        yup.reach(formSchema, e.target.name)
            .validate(e.target.value)
            .then((valid) => {
                setErrors({
                    ...errors,
                    [e.target.name]: "",
                });
            })
            .catch((err) => {
                setErrors({
                    ...errors,
                    [e.target.name]: err.errors[0],
                });
            });

        setUser({
            ...user,
            [e.target.name]: e.target.value,
        });
    };

    useEffect(() => {
        formSchema.isValid(user).then((valid) => {
            console.log("valid", valid);
            setButtonState(!valid);
        });
    }, [user, formSchema]);

    const submitHandler = (e) => {
        e.preventDefault();
        props.checkUser(user.username, user.password);
        props.history.push("/dashboard");
    };

    console.log(props);

    return (
        <div className="row">
            <div className="col-md-5">
                {props.errors ? props.errors : null}
                <p>Login</p>
                <form onSubmit={submitHandler}>
                    <div className="form-group">
                        {errors.username ? (
                            <p className="error">{errors.username}</p>
                        ) : null}
                        <input
                            type="text"
                            name="username"
                            className="form-control"
                            placeholder="username"
                            value={user.username}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        {errors.password ? (
                            <p className="error">{errors.password}</p>
                        ) : null}
                        <input
                            type="password"
                            name="password"
                            className="form-control"
                            placeholder="password"
                            value={user.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="btn btn-dark btn-sm"
                        disabled={buttonState}
                    >
                        Logins
                    </button>
                </form>
            </div>
        </div>
    );
};

// hook up the connect to our store
const mapStateToProps = (state) => {
    //console.log(state);
    return {
        uname: state.usersLogin.username,
        isLoading: state.usersLogin.isLoading,
        isLoaded: state.usersLogin.isLoaded,
        error: state.usersLogin.error,
    };
};

export default connect(mapStateToProps, { checkUser })(Login);
