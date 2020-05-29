import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { checkUser } from "../actions/usersLogin";
import { Container, Button, Form, Message } from "semantic-ui-react";
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
        password: yup.string().required("Password is a required field"),
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
        props.checkUser(user, props);
        setUser({
            username: "",
            password: "",
        });
    };

    return (
        <Container>
            <div className="form-wrapper">
                <i
                    aria-hidden="true"
                    className="brown linkify circular inverted icon"
                ></i>
                <h1>
                    <a
                        href="https://bw-pintereach.netlify.app/"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Pintereach
                    </a>
                </h1>
                <Form onSubmit={submitHandler}>
                    {props.message ? (
                        <Message size="tiny" color="red" compact>
                            {props.message}
                        </Message>
                    ) : null}
                    <Form.Field>
                        {errors.username ? (
                            <p className="error">
                                <i
                                    aria-hidden="true"
                                    className="small red cancel icon"
                                ></i>
                                {errors.username}
                            </p>
                        ) : null}
                        <Form.Input
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
                            <p className="error">
                                <i
                                    aria-hidden="true"
                                    className="small red cancel icon"
                                ></i>
                                {errors.password}
                            </p>
                        ) : null}
                        <Form.Input
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
                <p className="signUp-text">
                    Not a member? <a href="/signup">Sign up..</a>
                </p>
            </div>
        </Container>
    );
};

// hook up the connect to our store
const mapStateToProps = (state) => {
    //console.log("login state", state);
    return {
        user: state.usersLogin.user,
        isLoading: state.usersLogin.isLoading,
        isLoaded: state.usersLogin.isLoaded,
        message: state.usersLogin.message,
    };
};

export default connect(mapStateToProps, { checkUser })(Login);
