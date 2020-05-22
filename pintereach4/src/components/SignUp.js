import React, { useState, useEffect } from "react";
// import { axiosWithAuth } from "../util/axiosWithAuth";
// import { connect } from "react-redux";
// import { checkUser } from "../actions/usersLogin";
import { Button, Form, Icon } from "semantic-ui-react";
import * as yup from "yup";

const SignUp = (props) => {
    const [user, setUser] = useState({
        firstname: "",
        lastname: "",
        email: "",
        username: "",
        password: "",
        confirm_password: "",
    });

    const [errors, setErrors] = useState({
        firstname: "",
        lastname: "",
        email: "",
        username: "",
        password: "",
        confirm_password: "",
    });

    const [buttonState, setButtonState] = useState();

    const formSchema = yup.object().shape({
        firstname: yup.string().required("First Name is a required field"),
        lastname: yup.string().required("Last Name is a required field"),
        email: yup
            .string()
            .email("Needs email format")
            .required("Email is a required field"),
        username: yup.string().required("Username is a required field"),
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
        console.log("user", user);
    };

    return (
        <div className="form-wrapper">
            {props.errors ? props.errors : null}
            <Icon circular inverted color="red" name="linkify" />
            <h1>Pintereach</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group widths="equal">
                    {errors.firstname ? (
                        <p className="error">{errors.firstname}</p>
                    ) : null}
                    <Form.Input
                        type="text"
                        name="firstname"
                        className="form-control"
                        placeholder="First Name"
                        value={user.firstname}
                        onChange={handleChange}
                        required
                    />
                    <Form.Input
                        type="text"
                        name="lastname"
                        className="form-control"
                        placeholder="Last Name"
                        value={user.lastname}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                <Form.Field>
                    {/* {errors.password ? (
                        <p className="error">{errors.password}</p>
                    ) : null} */}
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
                    {/* {errors.password ? (
                        <p className="error">{errors.password}</p>
                    ) : null} */}
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
                        <p className="error">{errors.password}</p>
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
        </div>
    );
};

export default SignUp;
