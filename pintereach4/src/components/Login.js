import React, { useState, useEffect } from "react";
// import { axiosWithAuth } from "../util/axiosWithAuth";
import { connect } from "react-redux";
import { checkUser } from "../actions/usersLogin";
import { Button, Form, Icon } from "semantic-ui-react";
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
            setButtonState(!valid);
        });
    }, [user, formSchema]);

    const submitHandler = (e) => {
        e.preventDefault();
        props.checkUser(user.username, user.password);
        props.history.push("/dashboard");
    };

    return (
        <div className="login">
            {props.errors ? props.errors : null}
            <Icon circular inverted color="teal" name="linkify" />
            <h1>Pintereach</h1>
            <Form onSubmit={submitHandler}>
                <Form.Field>
                    {errors.username ? (
                        <p className="error">{errors.username}</p>
                    ) : null}
                    <input
                        type="text"
                        name="username"
                        className="form-control"
                        placeholder="Username"
                        value={user.username}
                        onChange={handleChange}
                        required
                    />
                </Form.Field>
                <Form.Field>
                    {errors.password ? (
                        <p className="error">{errors.password}</p>
                    ) : null}
                    <input
                        type="password"
                        name="password"
                        className="form-control"
                        placeholder="Password"
                        value={user.password}
                        onChange={handleChange}
                        required
                    />
                </Form.Field>
                <Button type="submit" disabled={buttonState}>
                    Login
                </Button>
            </Form>
            <p>
                {" "}
                <a href="#">Sign up here..</a>
            </p>
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