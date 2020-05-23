import React from "react";
import { Grid, Divider, List } from "semantic-ui-react";

const Sidebar = (props) => {
    const user = localStorage.getItem("user");

    return (
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
            <a className="ui negative button" href="/add-article">
                Add New Article
            </a>
            <Divider hidden />
            <List className="categories">
                <List.Item
                    icon="tag"
                    content={<a href="/dashboard">All Articles</a>}
                />
                <List.Item icon="star" content={<a href="#">Favorites</a>} />
                <List.Item icon="heartbeat" content={<a href="#">Health</a>} />
                <List.Item icon="write" content={<a href="#">Educational</a>} />
                <List.Item icon="futbol" content={<a href="#">Sports</a>} />
                <List.Item icon="fork" content={<a href="#">Technology</a>} />
                <List.Item icon="find" content={<a href="#">History</a>} />
            </List>
            <Divider hidden />
            <p>&copy; All rights reserved.</p>
        </Grid.Column>
    );
};

export default Sidebar;
