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
    { key: "uncategorized", text: "Uncategorized", value: "uncategorized" },
    { key: "health", text: "Health", value: "health" },
    { key: "educational", text: "Educational", value: "educational" },
    { key: "sports", text: "Sports", value: "sports" },
    { key: "technology", text: "Technology", value: "technology" },
    { key: "history", text: "History", value: "history" },
    { key: "favorites", text: "Favorites", value: "favorites" },
];

const AddForm = (props) => {
    //const user = localStorage.getItem("user");
    const [buttonState, setButtonState] = useState();
    const [formState, setFormState] = useState({
        url: "",
        title: "",
        publisher: "",
        description: "",
        //categories: ["uncategorized"],
    });

    const [errors, setErrors] = useState({
        url: "",
        title: "",
        publisher: "",
        description: "",
        //categories: "",
    });

    const formSchema = yup.object().shape({
        url: yup.string().required("URL is a required field"),
        title: yup.string().required("Title is a required field"),
        publisher: yup.string().required("Author is a required field"),
        description: yup.string(),
        //categories: yup.array().required("Categories is a required field"),
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
            //categories: [],
            description: "",
        });
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
                                {props.message ? (
                                    <Message size="tiny" color="red" compact>
                                        {props.message}
                                    </Message>
                                ) : null}
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
                                    {errorState.publisher ? (
                                        <p className="error">
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
                                {/* <Form.Field>
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
                                </Form.Field> */}
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
    console.log("article state", state);
    return {
        isLoading: state.articles.isLoading,
        isLoaded: state.articles.isLoaded,
        message: state.articles.message,
    };
};

export default connect(mapStateToProps, { postArticle })(AddForm);
