import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { registerUser } from "../actions/usersRegister";
import { Container, Button, Form, Message } from "semantic-ui-react";
import * as yup from "yup";

const SignUp = (props) => {
    const [user, setUser] = useState({
        first_name: "",
        last_name: "",
        email: "",
        username: "",
        password: "",
    });

    const [errors, setErrors] = useState({
        first_name: "",
        last_name: "",
        email: "",
        username: "",
        password: "",
    });

    const [buttonState, setButtonState] = useState();

    const formSchema = yup.object().shape({
        first_name: yup.string().required("First Name is a required field"),
        last_name: yup.string().required("Last Name is a required field"),
        email: yup
            .string()
            .email("Needs email format")
            .required("Email is a required field"),
        username: yup.string().required("Username is a required field"),
        password: yup
            .string()
            .required("Password is a required field")
            .min(6, "Passwords must be at least 6 characters long."),
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
        props.registerUser(user);
        setUser({
            first_name: "",
            last_name: "",
            email: "",
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
                        <Message size="tiny" color="green" compact>
                            {props.message}
                        </Message>
                    ) : null}
                    {errors.first_name ? (
                        <p className="error">
                            <i
                                aria-hidden="true"
                                className="small red cancel icon"
                            ></i>
                            {errors.first_name}
                        </p>
                    ) : null}
                    {errors.last_name ? (
                        <p className="error">
                            <i
                                aria-hidden="true"
                                className="small red cancel icon"
                            ></i>
                            {errors.last_name}
                        </p>
                    ) : null}
                    <Form.Group widths="equal">
                        <Form.Input
                            type="text"
                            name="first_name"
                            className="form-control"
                            placeholder="First Name"
                            value={user.first_name}
                            onChange={handleChange}
                            required
                        />
                        <Form.Input
                            type="text"
                            name="last_name"
                            className="form-control"
                            placeholder="Last Name"
                            value={user.last_name}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Form.Field>
                        {errors.email ? (
                            <p className="error">
                                <i
                                    aria-hidden="true"
                                    className="small red cancel icon"
                                ></i>
                                {errors.email}
                            </p>
                        ) : null}
                        <Form.Input
                            type="email"
                            name="email"
                            className="form-control"
                            placeholder="Email Address"
                            value={user.email}
                            onChange={handleChange}
                            required
                        />
                    </Form.Field>
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
                        Signup
                    </Button>
                </Form>
                <p className="signUp-text">
                    Already a member? <a href="/login">Login..</a>
                </p>
            </div>
        </Container>
    );
};

// hook up the connect to our store
const mapStateToProps = (state) => {
    //console.log("sign up state", state);
    return {
        isLoading: state.usersRegister.isLoading,
        isLoaded: state.usersRegister.isLoaded,
        message: state.usersRegister.message,
    };
};

export default connect(mapStateToProps, { registerUser })(SignUp);
