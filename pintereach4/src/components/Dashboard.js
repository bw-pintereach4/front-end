import React from "react";
import {
    Container,
    Grid,
    Divider,
    List,
    Card,
    Button,
} from "semantic-ui-react";
import Sidebar from "./Sidebar";

const Dashboard = () => {
    return (
        <Container className="dashboard">
            <Grid columns={2} divided>
                <Grid.Row>
                    <Sidebar />
                    <Grid.Column width={13}>
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
                                                <i class="circular inverted edit outline icon"></i>
                                            </a>
                                            <a href="/delete">
                                                <i class="circular inverted trash alternate  icon"></i>
                                            </a>
                                        </div>
                                    </Card>
                                </Grid.Column>
                                <Grid.Column>
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
                                                <i class="circular inverted edit outline icon"></i>
                                            </a>
                                            <a href="/delete">
                                                <i class="circular inverted trash alternate  icon"></i>
                                            </a>
                                        </div>
                                    </Card>
                                </Grid.Column>
                                <Grid.Column>
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
                                                <i class="circular inverted edit outline icon"></i>
                                            </a>
                                            <a href="/delete">
                                                <i class="circular inverted trash alternate  icon"></i>
                                            </a>
                                        </div>
                                    </Card>
                                </Grid.Column>
                                <Grid.Column>
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
                                                <i class="circular inverted edit outline icon"></i>
                                            </a>
                                            <a href="/delete">
                                                <i class="circular inverted trash alternate  icon"></i>
                                            </a>
                                        </div>
                                    </Card>
                                </Grid.Column>
                                <Grid.Column>
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
                                                <i class="circular inverted edit outline icon"></i>
                                            </a>
                                            <a href="/delete">
                                                <i class="circular inverted trash alternate  icon"></i>
                                            </a>
                                        </div>
                                    </Card>
                                </Grid.Column>
                                <Grid.Column>
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
                                                <i class="circular inverted edit outline icon"></i>
                                            </a>
                                            <a href="/delete">
                                                <i class="circular inverted trash alternate  icon"></i>
                                            </a>
                                        </div>
                                    </Card>
                                </Grid.Column>
                                <Grid.Column>
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
                                                <i class="circular inverted edit outline icon"></i>
                                            </a>
                                            <a href="/delete">
                                                <i class="circular inverted trash alternate  icon"></i>
                                            </a>
                                        </div>
                                    </Card>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Container>
    );
};

export default Dashboard;
