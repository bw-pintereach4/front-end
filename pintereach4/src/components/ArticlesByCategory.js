import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Container, Grid, Card, Message } from "semantic-ui-react";
import Sidebar from "./Sidebar";

import { getArticlesById } from "../actions/articles";
import { deleteArticle } from "../actions/articles";

const ArticlesByCategory = (props) => {
    useEffect(() => {
        props.getArticlesById(props.match.params.id);
    }, [props.match.params.id]);

    return (
        <Container className="dashboard">
            <Grid columns={2} divided>
                <Grid.Row>
                    <Sidebar />
                    <Grid.Column width={13}>
                        <Grid columns={4} className="articles">
                            <Grid.Row>
                                {props.isLoaded ? (
                                    props.articles.map((article, index) => {
                                        return (
                                            <Grid.Column
                                                className="article"
                                                key={index}
                                            >
                                                <Card>
                                                    <Card.Content
                                                        href={article.url}
                                                        target="_blank"
                                                        header={article.name}
                                                        meta={article.publisher}
                                                        description={article.description.substr(
                                                            0,
                                                            35
                                                        )}
                                                    />
                                                    <div className="card-buttons">
                                                        <a
                                                            type="button"
                                                            href={`/edit-article/${article.id}`}
                                                        >
                                                            <i
                                                                aria-hidden="true"
                                                                className="brown edit circular inverted icon"
                                                            ></i>
                                                        </a>
                                                        <a
                                                            href="#"
                                                            onClick={() => {
                                                                props.deleteArticle(
                                                                    article.id
                                                                );
                                                            }}
                                                        >
                                                            <i
                                                                aria-hidden="true"
                                                                className="brown trash circular inverted icon"
                                                            ></i>
                                                        </a>
                                                    </div>
                                                </Card>
                                            </Grid.Column>
                                        );
                                    })
                                ) : (
                                    <Message size="tiny" color="red">
                                        No articles related to this category..
                                    </Message>
                                )}
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
        message: state.articles.message,
    };
};

export default connect(mapStateToProps, {
    getArticlesById,
    deleteArticle,
})(ArticlesByCategory);
