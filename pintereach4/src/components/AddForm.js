import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { postArticle } from "../actions/articles";
import {
    Container,
    Grid,
    Form,
    Button,
    Dropdown,
    Message,
} from "semantic-ui-react";
import * as yup from "yup";
import Sidebar from "./Sidebar";

const categories = [
    // axios get key will be the category id
    { key: "uncategorized", text: "Uncategorized", value: 0 },
    { key: "health", text: "Health", value: 1 },
    { key: "educational", text: "Educational", value: 2 },
    { key: "sports", text: "Sports", value: 3 },
    { key: "technology", text: "Technology", value: 4 },
    { key: "history", text: "History", value: 5 },
    // { key: "favorites", text: "Favorites", value: "favorites" },
];

const AddForm = (props) => {
    //const user = localStorage.getItem("user");
    const [buttonState, setButtonState] = useState();
    const [formState, setFormState] = useState({
        url: "",
        title: "",
        publisher: "",
        description: "",
        categories: [0],
    });

    const [errors, setErrors] = useState({
        url: "",
        title: "",
        publisher: "",
        description: "",
        categories: "",
    });

    const formSchema = yup.object().shape({
        url: yup.string().required("URL is a required field"),
        title: yup.string().required("Title is a required field"),
        publisher: yup.string().required("Author is a required field"),
        description: yup.string(),
        categories: yup.array().required("Categories is a required field"),
    });

    const [errorState, setErrorState] = useState({
        url: "",
        title: "",
        publisher: "",
        description: "",
        categories: "",
    });

    useEffect(() => {
        formSchema.isValid(formState).then((valid) => {
            setButtonState(!valid);
        });
    }, [formState, formSchema]);

    const inputChange = (e) => {
        console.log("change");
        e.persist();

        yup.reach(formSchema, e.target.name)
            .validate(e.target.value)
            .then((valid) => {
                setErrorState({
                    ...errorState,
                    [e.target.name]: "",
                });
            })
            .catch((err) => {
                setErrorState({
                    ...errorState,
                    [e.target.name]: err.errors[0],
                });
            });

        setFormState({
            ...formState,
            [e.target.name]: e.target.value,
        });
    };

    const submitForm = (e) => {
        e.preventDefault();
        //console.log(formState);
        props.postArticle(formState);
        setFormState({
            url: "",
            title: "",
            publisher: "",
            description: "",
            categories: [],
        });
    };

    return (
        <Container className="dashboard">
            <Grid columns={2} divided>
                <Grid.Row>
                    <Sidebar />
                    <Grid.Column width={10}>
                        <Grid columns={4} className="articles-form">
                            {props.message ? (
                                <Message size="tiny" color="red" compact>
                                    {props.message}
                                </Message>
                            ) : null}
                            <p className="form-heading">Add Article</p>
                            <Form onSubmit={submitForm}>
                                <Form.Field>
                                    {errorState.title ? (
                                        <p className="error">
                                            <i
                                                aria-hidden="true"
                                                className="small red cancel icon"
                                            ></i>
                                            {errorState.title}
                                        </p>
                                    ) : null}
                                    <Form.Input
                                        label="Title"
                                        type="text"
                                        id="title"
                                        name="title"
                                        placeholder="Title of the article"
                                        onChange={inputChange}
                                        value={formState.title}
                                    />
                                </Form.Field>
                                <Form.Field>
                                    {errorState.url ? (
                                        <p className="error">
                                            <i
                                                aria-hidden="true"
                                                className="small red cancel icon"
                                            ></i>
                                            {errorState.url}
                                        </p>
                                    ) : null}
                                    <Form.Input
                                        label="Url"
                                        placeholder="https://"
                                        type="text"
                                        id="url"
                                        name="url"
                                        onChange={inputChange}
                                        value={formState.url}
                                    />
                                </Form.Field>

                                <Form.Field>
                                    {errorState.publisher ? (
                                        <p className="error">
                                            <i
                                                aria-hidden="true"
                                                className="small red cancel icon"
                                            ></i>
                                            {errorState.publisher}
                                        </p>
                                    ) : null}
                                    <Form.Input
                                        label="Publisher"
                                        type="text"
                                        id="publisher"
                                        name="publisher"
                                        placeholder="Publisher"
                                        onChange={inputChange}
                                        value={formState.publisher}
                                    />
                                </Form.Field>
                                <Form.Field>
                                    {errorState.categories ? (
                                        <p className="error">
                                            <i
                                                aria-hidden="true"
                                                className="small red cancel icon"
                                            ></i>
                                            {errorState.categories}
                                        </p>
                                    ) : null}
                                    <label htmlFor="categories">
                                        Categories
                                    </label>
                                    <Dropdown
                                        placeholder="Categories"
                                        fluid
                                        multiple
                                        selection
                                        onChange={(e, data) => {
                                            //console.log(data.value);
                                            setFormState({
                                                ...formState,
                                                categories: data.value,
                                            });
                                        }}
                                        value={formState.categories}
                                        options={categories}
                                    />
                                </Form.Field>
                                <Form.Field>
                                    <Form.TextArea
                                        label="Description"
                                        id="description"
                                        name="description"
                                        placeholder="Description"
                                        onChange={inputChange}
                                        value={formState.description}
                                    />
                                </Form.Field>
                                <Button type="submit" disabled={buttonState}>
                                    Submit
                                </Button>
                            </Form>
                        </Grid>
                        <pre>{JSON.stringify(formState, null, 2)}</pre>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Container>
    );
};

// hook up the connect to our store
const mapStateToProps = (state) => {
    console.log("article state", state);
    return {
        isLoading: state.articles.isLoading,
        isLoaded: state.articles.isLoaded,
        message: state.articles.message,
    };
};

export default connect(mapStateToProps, { postArticle })(AddForm);
