import React from "react";
import { Container, Grid, Divider, List, Button } from "semantic-ui-react";

const Dashboard = () => {
    let user = localStorage.getItem("user");

    return (
        <Container className="dashboard">
            <Grid columns={2} divided>
                <Grid.Row>
                    <Grid.Column width={3}>
                        <div className="branding">
                            <h1>Pintereach</h1>
                            <p>
                                <i>Keep your research in reach</i>
                            </p>
                        </div>
                        <Divider hidden />
                        <p>
                            Welcome {user},{" "}
                            <a
                                href="/"
                                onClick={() => {
                                    localStorage.removeItem("token");
                                }}
                            >
                                Logout
                            </a>
                        </p>
                        <Divider hidden />
                        <Button negative>Add New Article</Button>
                        <Divider hidden />
                        <List className="categories">
                            <List.Item icon="marker" content="Favorites" />
                            <List.Item icon="users" content="Health" />
                            <List.Item icon="marker" content="Educational" />
                            <List.Item
                                icon="mail"
                                content={
                                    <a href="mailto:jack@semantic-ui.com">
                                        Sports
                                    </a>
                                }
                            />
                            <List.Item
                                icon="linkify"
                                content={
                                    <a href="http://www.semantic-ui.com">
                                        Technology
                                    </a>
                                }
                            />
                            <List.Item
                                icon="linkify"
                                content={
                                    <a href="http://www.semantic-ui.com">
                                        History
                                    </a>
                                }
                            />
                        </List>
                        <Divider hidden />
                        <p>&copy; All rights reserved.</p>
                    </Grid.Column>
                    <Grid.Column width={13}>
                        <Grid columns={4} className="articles">
                            <Grid.Row>
                                <Grid.Column>1</Grid.Column>
                                <Grid.Column>2</Grid.Column>
                                <Grid.Column>3</Grid.Column>
                                <Grid.Column>4</Grid.Column>
                                <Grid.Column>5</Grid.Column>
                                <Grid.Column>6</Grid.Column>
                                <Grid.Column>7</Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Container>
    );
};

export default Dashboard;
