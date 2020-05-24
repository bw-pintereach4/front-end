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
                        localStorage.removeItem("user");
                    }}
                >
                    Logout
                </a>
            </p>
            <Divider hidden />
            <a className="ui brown button" href="/add-article">
                Add New Article
            </a>
            <Divider hidden />
            <List className="categories">
                <List.Item
                    icon="tag"
                    content={<a href="/articles">All Articles</a>}
                />
                <List.Item icon="star" content={<a href="#git">Favorites</a>} />
                <List.Item
                    icon="heartbeat"
                    content={<a href="#git">Health</a>}
                />
                <List.Item
                    icon="write"
                    content={<a href="#git">Educational</a>}
                />
                <List.Item icon="futbol" content={<a href="#git">Sports</a>} />
                <List.Item
                    icon="fork"
                    content={<a href="#git">Technology</a>}
                />
                <List.Item icon="find" content={<a href="#git">History</a>} />
            </List>
            <Divider hidden />
            <p>&copy; All rights reserved.</p>
        </Grid.Column>
    );
};

export default Sidebar;
