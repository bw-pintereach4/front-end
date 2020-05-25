import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Grid, Divider, List } from "semantic-ui-react";

import { getCategories } from "../actions/articles";

const Sidebar = (props) => {
    const user = localStorage.getItem("user");
    const [categories, setCategories] = useState();

    useEffect(() => {
        props.getCategories();
    }, []);

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
                {/* <List.Item icon="star" content={<a href="#git">Favorites</a>} /> */}
                <List.Item
                    icon="heartbeat"
                    content={<a href="/articles/category/1">Health</a>}
                />
                <List.Item
                    icon="write"
                    content={<a href="/articles/category/2">Educational</a>}
                />
                <List.Item
                    icon="futbol"
                    content={<a href="/articles/category/3">Sports</a>}
                />
                <List.Item
                    icon="fork"
                    content={<a href="/articles/category/4">Technology</a>}
                />
                <List.Item
                    icon="find"
                    content={<a href="/articles/category/5">History</a>}
                />
            </List>
            <Divider hidden />
            <p>&copy; All rights reserved.</p>
        </Grid.Column>
    );
};

// hook up the connect to our store
const mapStateToProps = (state) => {
    console.log("sidebar state", state);
    return {
        isLoading: state.articles.isLoading,
        isLoaded: state.articles.isLoaded,
        categories: state.articles.categories,
        message: state.articles.message,
    };
};

export default connect(mapStateToProps, { getCategories })(Sidebar);
