import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { getArticles } from "../actions/articles";
import { Container, Grid, Card } from "semantic-ui-react";
import Sidebar from "./Sidebar";

const Articles = (props) => {
    //const [articles, setArticles] = useState();

    useEffect(() => {
        // Update the document title using the browser API
        props.getArticles();
    }, []);

    console.log("..", props.articles);

    return (
        <Container className="dashboard">
            <Grid columns={2} divided>
                <Grid.Row>
                    <Sidebar />
                    <Grid.Column width={13}>
                        {props.isLoaded ? <h1>Loaded</h1> : <h1>Loading</h1>}
                        <Grid columns={4} className="articles">
                            <Grid.Row>
                                <Grid.Column className="article">
                                    <Card>
                                        <Card.Content
                                            href="https://google.com"
                                            target="_blank"
                                            header="The Last Dance"
                                            meta="John Doe"
                                            description="Elliot is a music producer living in Chicago."
                                        />
                                        <div className="card-buttons">
                                            <a href="/edit-article">
                                                <i
                                                    aria-hidden="true"
                                                    className="brown edit circular inverted icon"
                                                ></i>
                                            </a>
                                            <a href="/delete">
                                                <i
                                                    aria-hidden="true"
                                                    className="brown trash circular inverted icon"
                                                ></i>
                                            </a>
                                        </div>
                                    </Card>
                                </Grid.Column>
                                <Grid.Column></Grid.Column>
                                <Grid.Column></Grid.Column>
                                <Grid.Column></Grid.Column>
                                <Grid.Column></Grid.Column>
                                <Grid.Column></Grid.Column>
                                <Grid.Column></Grid.Column>
                            </Grid.Row>
                        </Grid>
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
        articles: state.articles.articles,
    };
};

export default connect(mapStateToProps, { getArticles })(Articles);
