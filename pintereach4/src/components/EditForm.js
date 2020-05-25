import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Container, Grid, Form, Button, Dropdown } from "semantic-ui-react";
import * as yup from "yup";
import { getArticles } from "../actions/articles";
import Sidebar from "./Sidebar";

const categories = [
    { key: "uncategorized", text: "Uncategorized", value: 0 },
    { key: "health", text: "Health", value: 1 },
    { key: "educational", text: "Educational", value: 2 },
    { key: "sports", text: "Sports", value: 3 },
    { key: "technology", text: "Technology", value: 4 },
    { key: "history", text: "History", value: 5 },
];

const EditForm = (props) => {
    const [buttonState, setButtonState] = useState();
    const [formState, setFormState] = useState({
        url: "",
        title: "",
        author: "",
        description: "",
        categories: [0],
    });

    const formSchema = yup.object().shape({
        url: yup.string().required("URL is a required field"),
        title: yup.string().required("Title is a required field"),
        author: yup.string().required("Author is a required field"),
        description: yup.string(),
        categories: yup.array().required("Categories is a required field"),
    });

    const [errorState, setErrorState] = useState({
        url: "",
        title: "",
        author: "",
        description: "",
        categories: [],
    });

    useEffect(() => {
        formSchema.isValid(formState).then((valid) => {
            setButtonState(!valid);
        });
    }, [formState, formSchema]);

    const inputChange = (e) => {
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
        console.log(formState);
        //props.addArticle(formState);
        // setFormState({
        //     url: "",
        //     title: "",
        //     author: "",
        //     categories: [],
        //     description: "",
        // });
    };

    return (
        <Container className="dashboard">
            <Grid columns={2} divided>
                <Grid.Row>
                    <Sidebar />
                    <Grid.Column width={10}>
                        <Grid columns={4} className="articles-form">
                            <p className="form-heading">Add Article</p>
                            <Form onSubmit={submitForm}>
                                <Form.Field>
                                    {errorState.url ? (
                                        <p className="error">
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
                                    {errorState.title ? (
                                        <p className="error">
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
                                    {errorState.author ? (
                                        <p className="error">
                                            {errorState.author}
                                        </p>
                                    ) : null}
                                    <Form.Input
                                        label="Author"
                                        type="text"
                                        id="author"
                                        name="author"
                                        placeholder="Author"
                                        onChange={inputChange}
                                        value={formState.author}
                                    />
                                </Form.Field>
                                <Form.Field>
                                    {errorState.categories ? (
                                        <p className="error">
                                            {errorState.categories}
                                        </p>
                                    ) : null}
                                    <label htmlFor="categories">
                                        Categories
                                    </label>
                                    <Dropdown
                                        placeholder="Skills"
                                        fluid
                                        multiple
                                        selection
                                        onChange={(e, data) => {
                                            console.log(data.value);
                                            setFormState({
                                                categories: data.value,
                                            });
                                        }}
                                        value={formState.categories}
                                        options={categories}
                                    />
                                </Form.Field>
                                <Form.Field>
                                    {errorState.description ? (
                                        <p className="error">
                                            {errorState.description}
                                        </p>
                                    ) : null}
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
    //console.log("article state", state);
    return {
        isLoading: state.articles.isLoading,
        isLoaded: state.articles.isLoaded,
        articles: state.articles.articles,
        message: state.articles.message,
    };
};

export default connect(mapStateToProps, { getArticles })(EditForm);
