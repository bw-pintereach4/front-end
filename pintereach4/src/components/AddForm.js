import React, { useState, useEffect } from "react";
import {
    Container,
    Grid,
    Divider,
    List,
    Form,
    Button,
    Dropdown,
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

export default function AddForm(props) {
    const user = localStorage.getItem("user");
    const [buttonState, setButtonState] = useState();
    const [formState, setFormState] = useState({
        url: "",
        title: "",
        author: "",
        description: "",
        categories: ["uncategorized"],
    });

    const [errors, setErrors] = useState({
        url: "",
        title: "",
        author: "",
        description: "",
        categories: "",
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
        console.log(formState);
        //props.addArticle(formState);
        // setFormState({
        //     url: "",
        //     title: "",
        //     author: "",
        //     categories: [],
        //     description: "",
        // });

        // Axios.post("https://reqres.in/api/users", formState) //change to real url later
        //     .then((response) => console.log(response))
        //     .catch((err) => console.log(err));
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
}
